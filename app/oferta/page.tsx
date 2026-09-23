import type { Metadata } from "next";
import Link from "next/link";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import { OfferCta } from "./OfferCta";
import styles from "./oferta.module.css";

export const metadata: Metadata = {
  title: "Operação WKT | 21 treinos guiados",
  description: "Dê play, acompanhe o instrutor e complete uma missão por vez. Conheça a Operação WKT.",
};

const heroImage = driveThumbnailUrl(workouts[0].driveFileId, 1600);
const missionImage = driveThumbnailUrl(workouts[6].driveFileId, 1200);

const faq = [
  ["Preciso de academia?", "Não. A proposta é acompanhar o treino guiado onde você estiver. Algumas sessões podem ser adaptadas ao espaço e aos equipamentos que você tem disponíveis."],
  ["Como recebo o acesso?", "Após a confirmação do pagamento, o acesso é liberado para a área do aluno vinculada ao seu e-mail."],
  ["É um curso com aulas teóricas?", "Não. O foco é execução. Você abre a missão, dá play e acompanha o treino junto com o instrutor."],
  ["Quantos treinos existem?", "O programa atual reúne 21 sessões guiadas organizadas por missões Alpha, Bravo, Charlie, Delta e Echo."],
  ["Consigo usar no celular?", "Sim. A plataforma foi pensada para celular e também pode ser usada em tablet ou computador."],
  ["Como funciona o pagamento?", "O checkout utiliza PIX. O código é gerado na hora e o acesso é liberado após a confirmação do pagamento."],
];

export default function OfertaPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/"><span>OPERAÇÃO</span><b>WKT</b></Link>
        <Link className={styles.login} href="/login">Já sou aluno</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>21 TREINOS GUIADOS • ACESSO ONLINE</span>
          <h1>Você dá o play.<br/>O treino mostra<br/><em>o que fazer.</em></h1>
          <p className={styles.lead}>Pare de perder tempo escolhendo exercícios. Abra a missão do dia, acompanhe o instrutor e complete a sessão do início ao fim.</p>

          <div className={styles.valueLine}>
            <span>✓ 21 sessões completas</span>
            <span>✓ Área do aluno</span>
            <span>✓ Acesso pelo celular</span>
          </div>

          <OfferCta className={styles.primaryCta}>COMEÇAR AGORA POR R$ 67 <span>→</span></OfferCta>
          <small className={styles.micro}>Pagamento via PIX • acesso digital após confirmação</small>
        </div>

        <div className={styles.heroVisual} style={{backgroundImage:`url("${heroImage}")`}}>
          <div className={styles.heroShade}/>
          <div className={styles.heroTag}><span>MISSÃO 01</span><b>ALPHA</b></div>
          <div className={styles.heroQuote}>NÃO É PARA ASSISTIR.<br/><strong>É PARA FAZER JUNTO.</strong></div>
        </div>
      </section>

      <section className={styles.trustBar}>
        <div><b>21</b><span>treinos guiados</span></div>
        <div><b>5</b><span>tipos de missão</span></div>
        <div><b>1</b><span>objetivo: consistência</span></div>
      </section>

      <section className={styles.problem}>
        <span className={styles.sectionKicker}>UMA EXPERIÊNCIA MAIS SIMPLES</span>
        <h2>Você não precisa montar o treino.<br/>Só precisa <em>começar.</em></h2>
        <p>O WKT foi pensado para reduzir a fricção entre “quero treinar” e “estou treinando”. Em vez de navegar por dezenas de aulas, você recebe uma missão clara e acompanha a sessão em tempo real.</p>

        <div className={styles.steps}>
          <article><span>01</span><b>Abra a missão</b><p>Entre na plataforma e veja qual treino executar.</p></article>
          <article><span>02</span><b>Dê play</b><p>Coloque o vídeo em destaque e acompanhe o instrutor.</p></article>
          <article><span>03</span><b>Complete</b><p>Finalize a sessão e avance para a próxima missão.</p></article>
        </div>
      </section>

      <section className={styles.demo}>
        <div className={styles.demoMedia} style={{backgroundImage:`url("${missionImage}")`}}>
          <div className={styles.demoShade}/>
          <div className={styles.playerChrome}>
            <span>MISSÃO 07 • ALPHA</span>
            <button type="button" aria-label="Exemplo visual do player">▶</button>
            <small>TREINO GUIADO • FAÇA JUNTO</small>
          </div>
        </div>
        <div className={styles.demoCopy}>
          <span className={styles.sectionKicker}>O VÍDEO É O TREINO</span>
          <h2>Sem ficar pausando para descobrir o próximo exercício.</h2>
          <p>A sessão foi gravada para o aluno acompanhar. Isso muda a experiência: menos teoria, menos distração e mais execução.</p>
          <ul>
            <li><span>✓</span> Sessão conduzida do início ao fim</li>
            <li><span>✓</span> Identidade por missões Alpha, Bravo, Charlie, Delta e Echo</li>
            <li><span>✓</span> Plataforma pensada para uso rápido no celular</li>
          </ul>
          <OfferCta className={styles.secondaryCta}>QUERO ENTRAR NA OPERAÇÃO →</OfferCta>
        </div>
      </section>

      <section className={styles.missions}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionKicker}>O QUE VOCÊ RECEBE</span>
          <h2>21 missões.<br/>Um único acesso.</h2>
        </div>
        <div className={styles.missionTypes}>
          <article><small>ALPHA</small><b>Base & ritmo</b><p>Sessões que combinam grupos musculares e constância.</p></article>
          <article><small>BRAVO</small><b>Intensidade</b><p>Treinos com combinações variadas para manter o ritmo.</p></article>
          <article><small>CHARLIE</small><b>Controle</b><p>Missões com foco em diferentes regiões e execução.</p></article>
          <article><small>DELTA</small><b>Força</b><p>Sessões guiadas para continuar evoluindo na jornada.</p></article>
          <article><small>ECHO</small><b>Finalização</b><p>Treinos que ampliam a variedade do programa.</p></article>
        </div>
      </section>

      <section className={styles.fit}>
        <div>
          <span className={styles.sectionKicker}>PARA QUEM É</span>
          <h2>Para quem quer um caminho mais direto para treinar.</h2>
        </div>
        <div className={styles.fitGrid}>
          <p><span>✓</span> Para quem prefere acompanhar um treino completo em vez de montar uma ficha.</p>
          <p><span>✓</span> Para quem quer acessar pelo celular e começar sem navegar por dezenas de módulos.</p>
          <p><span>✓</span> Para quem gosta de desafio, sequência e sensação de missão concluída.</p>
          <p><span>✓</span> Para quem procura uma experiência de treino prática e objetiva.</p>
        </div>
      </section>

      <section className={styles.offer}>
        <div className={styles.offerTop}>
          <span className={styles.sectionKicker}>ACESSO À OPERAÇÃO WKT</span>
          <h2>Comece com as 21 missões.</h2>
          <p>Um pagamento. Acesso digital à plataforma e aos treinos do programa atual.</p>
        </div>

        <div className={styles.offerCard}>
          <div className={styles.offerName}><small>OPERAÇÃO WKT</small><b>ACESSO 21</b></div>
          <div className={styles.offerPrice}><small>POR</small><span>R$</span><b>67</b><sup>,00</sup></div>
          <ul>
            <li>✓ 21 treinos completos em vídeo</li>
            <li>✓ Área exclusiva do aluno</li>
            <li>✓ Acesso pelo navegador/PWA</li>
            <li>✓ Jornada organizada por missões</li>
          </ul>
          <OfferCta className={styles.checkoutCta}>GERAR MEU PIX E COMEÇAR →</OfferCta>
          <small className={styles.paymentNote}>PIX processado no checkout seguro</small>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionKicker}>DÚVIDAS FREQUENTES</span>
          <h2>Antes de começar.</h2>
        </div>
        <div className={styles.faqList}>
          {faq.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
        </div>
      </section>

      <section className={styles.finalCta}>
        <span>PRONTO PARA COMEÇAR?</span>
        <h2>Abra a primeira missão.<br/><em>Dê o play.</em></h2>
        <OfferCta className={styles.primaryCta}>COMEÇAR AGORA POR R$ 67 →</OfferCta>
        <Link href="/login">Já comprou? Entrar na área do aluno</Link>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/"><span>OPERAÇÃO</span><b>WKT</b></Link>
        <small>Treine respeitando seus limites e procure orientação profissional quando necessário.</small>
        <div><Link href="/login">Login</Link><Link href="/">Site principal</Link></div>
      </footer>

      <div className={styles.mobileBar}>
        <div><small>ACESSO 21</small><b>R$ 67</b></div>
        <OfferCta className={styles.mobileCta}>COMEÇAR →</OfferCta>
      </div>
    </main>
  );
}
