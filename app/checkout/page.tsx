import Link from "next/link";
import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="checkoutPage">
      <header className="checkoutHeader">
        <Link className="brand brandStack" href="/"><span>OPERAÇÃO</span><b>WKT</b></Link>
        <Link className="loginLink" href="/login">Já sou aluno</Link>
      </header>
      <div className="checkoutStepper" aria-label="Etapas da compra">
        <span className="active"><b>1</b> Pagamento</span><i/><span><b>2</b> Acesso</span><i/><span><b>3</b> Comece hoje</span>
      </div>
      <div className="checkoutWrap">
        <section className="checkoutOffer">
          <span className="eyebrow">ESCOLHA SEU ACESSO</span>
          <h1>Escolha sua missão.</h1>
          <div className="planGrid">
            <article className="planCard activePlan">
              <span className="planBadge">Mais popular</span><small>OPERAÇÃO 21</small><h2>21 treinos guiados</h2>
              <div className="planPrice">R$ <b>67</b><sup>,00</sup></div>
              <ul><li>✓ 21 treinos em vídeo</li><li>✓ Acesso imediato</li><li>✓ Área do aluno</li><li>✓ Progresso por missão</li></ul>
              <span className="planSelected">SELECIONADO</span>
            </article>
            <article className="planCard futurePlan">
              <span className="planBadge mutedBadge">Em breve</span><small>OPERAÇÃO 12 SEMANAS</small><h2>Jornada completa</h2>
              <div className="planPrice faded">R$ <b>97</b><sup>,00</sup></div>
              <ul><li>✓ Agenda de 12 semanas</li><li>✓ Check-ins de progresso</li><li>✓ Conquistas e desafios</li><li>✓ Bônus exclusivos</li></ul>
              <span className="planDisabled">EM BREVE</span>
            </article>
          </div>
          <div className="secureNote">✓ Ambiente seguro • PIX processado via XPayments</div>
        </section>
        <section className="checkoutPayment">
          <div className="paymentTitle"><span>FORMA DE PAGAMENTO</span><b>PIX</b></div>
          <CheckoutForm />
        </section>
      </div>
    </main>
  );
}
