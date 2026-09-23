import { z } from "zod";

export const pixInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  document: z.string().min(11).max(14),
  amountCents: z.number().int().positive(),
  externalId: z.string().min(6),
});

export type PixInput = z.infer<typeof pixInputSchema>;

export type PixCharge = {
  paymentId: string;
  reference: string;
  status: string;
  copyPaste: string;
  qrCodeImage?: string;
};

const OFFICIAL_PIX_CHARGE_URL =
  "https://api.xpayments.digital/api/v1/payments/charge";

export async function createPixCharge(input: PixInput): Promise<PixCharge> {
  const parsed = pixInputSchema.parse(input);

  if ((process.env.XPAYMENTS_MODE || "mock") !== "live") {
    return {
      paymentId: `mock_${parsed.externalId}`,
      reference: parsed.externalId,
      status: "pending",
      copyPaste:
        "00020101021226890014BR.GOV.BCB.PIX2567PIX-MOCK-WKT-MILITAR-NAO-PAGAR520400005303986540567.005802BR5909WKT MOCK6007GOIANIA62070503***6304ABCD",
    };
  }

  const apiKey = process.env.XPAYMENTS_API_KEY;
  if (!apiKey) {
    throw new Error("XPAYMENTS_API_KEY is required when XPAYMENTS_MODE=live.");
  }

  const endpoint =
    process.env.XPAYMENTS_CHARGE_URL || OFFICIAL_PIX_CHARGE_URL;

  const body = {
    amount: parsed.amountCents,
    currency: "BRL",
    payment_method_types: ["pix"],
    reference: parsed.externalId,
    customer: {
      name: parsed.name,
      document: parsed.document.replace(/\D/g, ""),
    },
    metadata: {
      order_id: parsed.externalId,
      description: "Operação WKT - Acesso 21",
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    const code =
      data?.error?.code ||
      data?.error?.message ||
      data?.message ||
      `HTTP_${response.status}`;
    throw new Error(`XPayments PIX create failed: ${String(code)}`);
  }

  const transactionId = data?.transactionId;
  const reference = data?.reference || parsed.externalId;
  const status = data?.status || "pending";
  const action = data?.action || {};
  const copyPaste = action?.copyPaste || action?.pixString || "";
  const qrCodeImage =
    action?.qrCodeBase64 || action?.qrCode || action?.qrCodeUrl || undefined;

  if (!transactionId || !copyPaste) {
    throw new Error("XPayments returned an incomplete PIX action.");
  }

  return {
    paymentId: String(transactionId),
    reference: String(reference),
    status: String(status),
    copyPaste: String(copyPaste),
    qrCodeImage: qrCodeImage ? String(qrCodeImage) : undefined,
  };
}
