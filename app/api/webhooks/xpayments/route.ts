import { NextResponse } from "next/server";

// Provider-specific signature and payload mapping will be finalized
// once the S2S account documentation/credentials are available.
export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  console.log("xpayments_webhook", payload);
  return NextResponse.json({ received: true });
}
