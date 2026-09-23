import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ensurePaymentSchema, getDb } from "@/lib/db";
import { entitlements, orders } from "@/lib/db/schema";

const webhookSchema = z.object({
  event: z.string(),
  transaction_id: z.string().min(1),
  reference: z.string().min(1),
  amount: z.coerce.number().positive(),
  currency: z.string(),
  status: z.string(),
  method: z.string(),
  timestamp: z.string().optional(),
});

export async function POST(request: Request) {
  const db = getDb();
  if (!db) {
    console.error("xpayments_webhook_database_missing");
    return NextResponse.json({ received: false }, { status: 503 });
  }

  try {
    await ensurePaymentSchema();
  } catch (error) {
    console.error("xpayments_webhook_schema_error", error);
    return NextResponse.json({ received: false }, { status: 503 });
  }

  const parsed = webhookSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    console.warn("xpayments_webhook_invalid_payload", parsed.error.flatten());
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const payload = parsed.data;

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.externalId, payload.reference))
    .limit(1);

  if (!order) {
    console.warn("xpayments_webhook_unknown_reference", payload.reference);
    return NextResponse.json({ received: false }, { status: 404 });
  }

  if (payload.currency !== "BRL" || payload.method !== "pix") {
    console.warn("xpayments_webhook_payment_type_mismatch", {
      reference: payload.reference,
      currency: payload.currency,
      method: payload.method,
    });
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (
    order.providerPaymentId &&
    order.providerPaymentId !== payload.transaction_id
  ) {
    console.error("xpayments_webhook_transaction_mismatch", payload.reference);
    return NextResponse.json({ received: false }, { status: 409 });
  }

  const webhookAmountCents = Math.round(payload.amount * 100);
  if (webhookAmountCents !== order.amountCents) {
    console.error("xpayments_webhook_amount_mismatch", {
      reference: payload.reference,
      expected: order.amountCents,
      received: webhookAmountCents,
    });
    return NextResponse.json({ received: false }, { status: 409 });
  }

  const isSucceeded =
    payload.event === "payment_intent.succeeded" &&
    payload.status === "succeeded";

  if (!isSucceeded) {
    await db
      .update(orders)
      .set({ status: payload.status })
      .where(eq(orders.externalId, payload.reference));

    return NextResponse.json({
      received: true,
      processed: false,
      status: payload.status,
    });
  }

  if (order.status === "succeeded") {
    return NextResponse.json({
      received: true,
      processed: true,
      duplicate: true,
    });
  }

  const now = new Date();

  await db
    .update(orders)
    .set({
      status: "succeeded",
      providerPaymentId: payload.transaction_id,
      paidAt: now,
    })
    .where(eq(orders.externalId, payload.reference));

  const [existing] = await db
    .select()
    .from(entitlements)
    .where(
      and(
        eq(entitlements.userEmail, order.userEmail),
        eq(entitlements.product, "wkt-militar")
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(entitlements)
      .set({
        active: true,
        startsAt: existing.startsAt || now,
        expiresAt: null,
      })
      .where(eq(entitlements.id, existing.id));
  } else {
    await db.insert(entitlements).values({
      userEmail: order.userEmail,
      product: "wkt-militar",
      active: true,
      startsAt: now,
      expiresAt: null,
    });
  }

  console.info("xpayments_payment_succeeded", {
    reference: payload.reference,
    transactionId: payload.transaction_id,
  });

  return NextResponse.json({
    received: true,
    processed: true,
  });
}
