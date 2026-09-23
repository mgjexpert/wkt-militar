import Link from "next/link";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";

const heroImage = driveThumbnailUrl(workouts[0].driveFileId, 1600);

export default function Home() {
  return (
    <main className="landing">
      <header className="siteHeader">
        <div className="shell siteHeaderInner">
          <Link className="brand brandStack" href="/">
            <span>OPERAÇÃO</span><b>WKT</b>
          </Link>
          <nav className="siteNav" aria-label="Navegação principal">
            <a href="#metodo">O método</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#programa">Programa</a>
          </nav>
          <div className="siteActions">
            <Link className="loginLink" href="/login">Entrar</Link>
            <Link className="button headerCta" href="/checkout">Quero começar</Link>
          </div>
        </div>
      </header>

      <section className="landingHero">
        <div className="shell heroStage">
          <div className="heroCopy">
            <span className="eyebrow">TREINO GUIADO • 12 SEMANAS • 21 MISSÕES</span>
            <h1>Você não precisa<br/>de mais motivação.<br/><em>Precisa de uma missão.</em></h1>
            <p>Treinos guiados para acompanhar do início ao fim. Dê play, acompanhe o instrutor e transforme rotina em disciplina.</p>
            <div className="actions">
              <Link className="button heroCta" href="/checkout">Começar minha missão <span>→</span></Link>
              <Link className="button ghost heroLogin" href="/login">Já sou aluno</Link>
            </div>
          </div>
          <div className="heroMedia" style={{ backgroundImage: `url("${heroImage}")` }} aria-label="Prévia do treino">
            <div className="heroMediaShade"/>
            <div className="heroMediaTop"><span>MISSÃO 01</span><b>ALPHA</b></div>
            <div className="heroMediaBottom"><span>PEITO • TRÍCEPS • PERNAS</span><strong>DISCIPLINA HOJE.<br/>RESULTADOS SEMPRE.</strong></div>
          </div>
        </div>
        <div className="shell heroFeatureStrip" id="como-funciona">
          <article><span className="featureIcon">▶</span><div><b>Treinos em vídeo</b><small>Acompanhe e faça junto</small></div></article>
          <article><span className="featureIcon">▣</span><div><b>Em qualquer lugar</b><small>Celular, tablet ou TV</small></div></article>
          <article><span className="featureIcon">↗</span><div><b>Progresso visível</b><small>Missões e evolução</small></div></article>
        </div>
      </section>

      <section className="landingProof" id="metodo">
        <div className="shell proofGrid">
          <div className="proofCopy">
            <span className="eyebrow darkEyebrow">O MÉTODO</span>
            <h2>Um programa.<br/>Uma rotina que você consegue seguir.</h2>
            <p>Sem biblioteca infinita e sem decidir o que fazer. A plataforma mostra a missão do dia e o treino acontece junto com o vídeo.</p>
            <div className="proofMiniStats">
              <span><b>21</b><small>treinos guiados</small></span>
              <span><b>12</b><small>semanas de jornada</small></span>
              <span><b>5x</b><small>por semana</small></span>
            </div>
          </div>
          <div className="proofVisual" id="programa">
            <div className="phoneMock phoneLeft"><span>SEMANA 3 • DIA 4</span><b>MISSÃO 14<br/>CHARLIE</b><small>Costas • 29 min</small><i>INICIAR MISSÃO ▶</i></div>
            <div className="phoneMock phoneRight"><span>SEU PROGRESSO</span><b>68%</b><small>9 dias consecutivos</small><div className="miniBars"><i/><i/><i/><i/><i/></div></div>
          </div>
        </div>
      </section>

      <section className="landingDarkSection">
        <div className="shell darkSplit">
          <div><span className="eyebrow">FEITO PARA ACOMPANHAR</span><h2>Não é um curso para assistir.<br/><em>É um treino para fazer.</em></h2></div>
          <div className="copy"><p>Alpha, Bravo, Charlie, Delta e Echo dão identidade a cada sessão. Você abre a missão, coloca o vídeo em tela cheia e acompanha o treino em tempo real.</p><Link className="textLink" href="/checkout">Ver acesso ao programa →</Link></div>
        </div>
      </section>

      <footer className="landingFooter">
        <div className="shell footerInner">
          <Link className="brand brandStack" href="/"><span>OPERAÇÃO</span><b>WKT</b></Link>
          <div className="footerLinks"><Link href="/login">Login do aluno</Link><Link href="/checkout">Começar agora</Link></div>
          <small>Operação WKT • MVP 2026</small>
        </div>
      </footer>
    </main>
  );
}
