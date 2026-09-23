"use client";

import { useState } from "react";

type Pix = { paymentId: string; status: string; copyPaste: string; qrCodeImage?: string };

export function CheckoutForm() {
  const [pix, setPix] = useState<Pix | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/payments/pix", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        document: form.get("document"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Não foi possível gerar o PIX.");
      setLoading(false);
      return;
    }
    setPix(data);
    setLoading(false);
  }

  async function copy() {
    if (pix?.copyPaste) await navigator.clipboard.writeText(pix.copyPaste);
  }

  return (
    <section className="payCard">
      {!pix ? (
        <form className="form" onSubmit={submit}>
          <h2>Pagamento via PIX</h2>
          <label>Nome<input name="name" required placeholder="Seu nome"/></label>
          <label>E-mail<input name="email" type="email" required placeholder="voce@email.com"/></label>
          <label>CPF/CNPJ<input name="document" inputMode="numeric" required placeholder="Somente números"/></label>
          {error && <div className="error">{error}</div>}
          <button className="button full" disabled={loading}>{loading ? "Gerando PIX..." : "Gerar PIX • R$ 67"}</button>
          <small>O checkout está em modo mock até ligarmos as credenciais S2S da XPayments.</small>
        </form>
      ) : (
        <div className="pixBox">
          <span className="pill">PIX GERADO</span>
          <h2>Escaneie ou copie o código</h2>
          {pix.qrCodeImage && <img src={pix.qrCodeImage} alt="QR Code PIX"/>}
          <textarea readOnly value={pix.copyPaste}/>
          <button className="button full" onClick={copy}>Copiar PIX</button>
          <small>ID: {pix.paymentId} • status: {pix.status}</small>
        </div>
      )}
    </section>
  );
}
