import { z } from "zod";

export const pixInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  document: z.string().min(11).max(18).optional(),
  amountCents: z.number().int().positive(),
  externalId: z.string().min(6),
});

export type PixInput = z.infer<typeof pixInputSchema>;

export type PixCharge = {
  paymentId: string;
  status: string;
  copyPaste: string;
  qrCodeImage?: string;
  raw?: unknown;
};

function pick(obj: any, paths: string[]) {
  for (const path of paths) {
    const value = path.split(".").reduce((acc, key) => acc?.[key], obj);
    if (value !== undefined && value !== null && value !== "") return value;
  }
}

export async function createPixCharge(input: PixInput): Promise<PixCharge> {
  const parsed = pixInputSchema.parse(input);

  if ((process.env.XPAYMENTS_MODE || "mock") !== "live") {
    return {
      paymentId: `mock_${parsed.externalId}`,
      status: "pending",
      copyPaste: "00020101021226890014BR.GOV.BCB.PIX2567PIX-MOCK-WKT-MILITAR-NAO-PAGAR520400005303986540567.005802BR5909WKT MOCK6007GOIANIA62070503***6304ABCD",
    };
  }

  const endpoint = process.env.XPAYMENTS_PIX_ENDPOINT;
  const apiKey = process.env.XPAYMENTS_API_KEY;
  if (!endpoint || !apiKey) {
    throw new Error("XPayments live mode requires XPAYMENTS_PIX_ENDPOINT and XPAYMENTS_API_KEY.");
  }

  const authHeader = process.env.XPAYMENTS_AUTH_HEADER || "Authorization";
  const authPrefix = process.env.XPAYMENTS_AUTH_PREFIX ?? "Bearer ";

  // IMPORTANT: provider-specific field names stay isolated here.
  // Confirm this mapping against the XPayments S2S PIX documentation before enabling live mode.
  const body = {
    amount: parsed.amountCents / 100,
    external_id: parsed.externalId,
    description: "Operação WKT",
    payer: {
      name: parsed.name,
      email: parsed.email,
      document: parsed.document,
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [authHeader]: `${authPrefix}${apiKey}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`XPayments PIX error ${response.status}: ${JSON.stringify(data)}`);
  }

  return {
    paymentId: String(pick(data, ["id", "payment_id", "transaction_id", "data.id"]) || parsed.externalId),
    status: String(pick(data, ["status", "data.status"]) || "pending"),
    copyPaste: String(
      pick(data, [
        "copy_paste",
        "pix_copy_paste",
        "qr_code",
        "qrcode",
        "data.copy_paste",
        "data.pix_copy_paste",
        "data.qr_code",
      ]) || ""
    ),
    qrCodeImage: pick(data, ["qr_code_base64", "qrcode_base64", "qr_code_image", "data.qr_code_base64"]),
    raw: data,
  };
}
