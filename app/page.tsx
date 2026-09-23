import Link from "next/link";

const benefits = [
  ["21 treinos guiados", "Aperte play e acompanhe o treino do início ao fim."],
  ["Treine onde estiver", "Celular, notebook ou TV com acesso pela web."],
  ["Progresso visível", "Missões, sequência e evolução em uma única área."],
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <Link className="brand" href="/">OPERAÇÃO <b>WKT</b></Link>
        <nav>
          <a href="#metodo">Método</a>
          <a href="#treinos">Treinos</a>
          <Link className="button small" href="/checkout">Quero começar</Link>
        </nav>
      </header>

      <section className="hero shell">
        <div className="heroCopy">
          <span className="eyebrow">TREINO GUIADO • MISSÃO POR MISSÃO</span>
          <h1>Você não precisa de mais motivação.<br/><em>Precisa de uma missão.</em></h1>
          <p>Uma experiência de treino para acompanhar em tempo real. Dê play, siga o instrutor e complete uma missão por vez.</p>
          <div className="actions">
            <Link className="button" href="/checkout">Começar minha missão →</Link>
            <Link className="button ghost" href="/login">Já tenho acesso</Link>
          </div>
          <div className="micro">✓ 21 sessões em vídeo &nbsp; ✓ acesso web/PWA &nbsp; ✓ progresso por missão</div>
        </div>
        <div className="missionCard">
          <div className="missionGlow"/>
          <span>SEMANA 1 • DIA 1</span>
          <h2>MISSÃO 01<br/>ALPHA</h2>
          <p>Peito, tríceps e perna</p>
          <div className="fakeVideo"><div className="play">▶</div></div>
          <div className="cardStats"><b>29 min</b><b>Nível adaptável</b></div>
        </div>
      </section>

      <section id="metodo" className="benefits shell">
        {benefits.map(([title, desc], i) => (
          <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article>
        ))}
      </section>

      <section id="treinos" className="section shell split">
        <div>
          <span className="eyebrow">O MÉTODO</span>
          <h2>Não é um curso para assistir.<br/>É um treino para fazer.</h2>
        </div>
        <div className="copy">
          <p>Os vídeos ficam em destaque e o aluno acompanha cada sessão simultaneamente com o instrutor.</p>
          <p>Alpha, Bravo, Charlie, Delta e Echo transformam a biblioteca de treinos numa jornada simples e memorável.</p>
          <Link className="textLink" href="/checkout">Ver acesso ao programa →</Link>
        </div>
      </section>

      <footer className="footer shell">Operação WKT • MVP 2026</footer>
    </main>
  );
}
