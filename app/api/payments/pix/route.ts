import { createPixCharge } from "@/lib/payments/xpayments";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  document: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const input = requestSchema.parse(await request.json());
    const charge = await createPixCharge({
      ...input,
      amountCents: 6700,
      externalId: `wkt_${randomUUID()}`,
    });
    return NextResponse.json(charge);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PIX error" },
      { status: 400 }
    );
  }
}
