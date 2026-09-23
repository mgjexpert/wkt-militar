import { NextResponse } from "next/server";

import { getDatabaseEnvSource } from "@/lib/db";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL),
      databaseConfigured: Boolean(getDatabaseEnvSource()),
      databaseEnvSource: getDatabaseEnvSource(),
      xpaymentsMode: process.env.XPAYMENTS_MODE || "mock",
      xpaymentsApiKeyConfigured: Boolean(process.env.XPAYMENTS_API_KEY),
      xpaymentsChargeUrlConfigured: Boolean(process.env.XPAYMENTS_CHARGE_URL),
      webhookSecretConfigured: Boolean(process.env.XPAYMENTS_WEBHOOK_SECRET),
      webhookSignatureVerification: false,
      priceCents: Number.parseInt(process.env.WKT_PRICE_CENTS || "6700", 10),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
