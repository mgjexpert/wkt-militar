import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/lib/db";
import { orders, users } from "@/lib/db/schema";
import { createPixCharge } from "@/lib/payments/xpayments";

const requestSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  document: z.string().min(11),
});

function configuredPriceCents() {
  const value = Number.parseInt(process.env.WKT_PRICE_CENTS || "6700", 10);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error("Invalid WKT_PRICE_CENTS.");
  }
  return value;
}

export async function POST(request: Request) {
  const db = getDb();
  let reference: string | null = null;

  try {
    const input = requestSchema.parse(await request.json());
    const document = input.document.replace(/\D/g, "");

    if (![11, 14].includes(document.length)) {
      return NextResponse.json(
        { error: "Informe um CPF ou CNPJ válido em formato numérico." },
        { status: 400 }
      );
    }

    const live = (process.env.XPAYMENTS_MODE || "mock") === "live";
    if (live && !db) {
      return NextResponse.json(
        { error: "Checkout temporariamente indisponível: banco de dados não configurado." },
        { status: 503 }
      );
    }

    const amountCents = configuredPriceCents();
    reference = `WKT-BR-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

    if (db) {
      await db
        .insert(users)
        .values({ email: input.email.toLowerCase(), name: input.name })
        .onConflictDoNothing({ target: users.email });

      await db.insert(orders).values({
        externalId: reference,
        userEmail: input.email.toLowerCase(),
        provider: "xpayments",
        amountCents,
        status: "creating",
      });
    }

    const charge = await createPixCharge({
      name: input.name,
      email: input.email.toLowerCase(),
      document,
      amountCents,
      externalId: reference,
    });

    if (db) {
      await db
        .update(orders)
        .set({
          providerPaymentId: charge.paymentId,
          status: charge.status,
        })
        .where(eq(orders.externalId, reference));
    }

    return NextResponse.json(charge);
  } catch (error) {
    console.error("pix_create_error", error);

    if (db && reference) {
      await db
        .update(orders)
        .set({ status: "create_failed" })
        .where(eq(orders.externalId, reference))
        .catch(() => undefined);
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PIX_CREATE_FAILED" },
      { status: 400 }
    );
  }
}
