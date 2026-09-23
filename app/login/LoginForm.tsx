"use client";

import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/session/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), code: form.get("code") }),
    });
    if (!response.ok) {
      setError("E-mail ou código inválido.");
      setLoading(false);
      return;
    }
    location.href = "/app";
  }

  return (
    <form onSubmit={submit} className="form">
      <label>E-mail<input name="email" type="email" required placeholder="voce@email.com"/></label>
      <label>Código de acesso<input name="code" required placeholder="Código do MVP"/></label>
      {error && <div className="error">{error}</div>}
      <button className="button full" disabled={loading}>{loading ? "Entrando..." : "Entrar →"}</button>
    </form>
  );
}
