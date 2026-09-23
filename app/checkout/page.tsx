import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="checkoutPage">
      <div className="checkoutHeader"><a className="brand" href="/">OPERAÇÃO <b>WKT</b></a><span>Checkout seguro</span></div>
      <div className="checkoutGrid">
        <section className="checkoutOffer">
          <span className="pill">ACESSO FUNDADOR • MVP</span>
          <h1>Comece sua missão.</h1>
          <p>21 treinos guiados, área do aluno e progresso por missão.</p>
          <ul><li>✓ 21 sessões em vídeo</li><li>✓ Acesso web/PWA</li><li>✓ Treine no seu ritmo</li><li>✓ Atualizações do MVP</li></ul>
          <div className="price"><small>acesso por</small><b>R$ 67,00</b></div>
        </section>
        <CheckoutForm />
      </div>
    </main>
  );
}
