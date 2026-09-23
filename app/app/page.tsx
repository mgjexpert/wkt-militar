import Link from "next/link";
import { getSession } from "@/lib/session";
import { workouts } from "@/lib/workouts";

export default async function Dashboard() {
  const session = await getSession();
  const current = workouts[0];

  return (
    <main className="appShell">
      <aside className="sidebar">
        <Link className="brand" href="/app">OPERAÇÃO <b>WKT</b></Link>
        <div className="menu">
          <b>⌂ Início</b><span>▢ Minha jornada</span><span>⚔ Treinos</span><span>▥ Progresso</span><span>★ Conquistas</span>
        </div>
        <small>{session?.email}</small>
      </aside>
      <section className="dashboard">
        <div className="topline"><div><span className="eyebrow">BEM-VINDO DE VOLTA</span><h1>Olá, {session?.name || "Recruta"}.</h1></div><div className="avatar">W</div></div>

        <article className="todayCard">
          <div>
            <span className="eyebrow">SEMANA 1 • DIA 1</span>
            <h2>MISSÃO {String(current.id).padStart(2, "0")}<br/>{current.code.toUpperCase()}</h2>
            <p>{current.focus}</p>
            <Link className="button" href={`/app/workout/${current.slug}`}>Iniciar missão ▶</Link>
          </div>
          <div className="target"><div className="targetInner">01</div></div>
        </article>

        <div className="stats">
          <div><span>🔥</span><b>0 dias</b><small>sequência</small></div>
          <div><span>▥</span><b>0%</b><small>progresso</small></div>
          <div><span>★</span><b>0 XP</b><small>conquistas</small></div>
        </div>

        <div className="journeyHead"><h3>Suas missões</h3><span>21 treinos</span></div>
        <div className="workoutGrid">
          {workouts.map((w) => (
            <Link href={`/app/workout/${w.slug}`} className="workoutTile" key={w.id}>
              <span>{String(w.id).padStart(2, "0")}</span><b>{w.code}</b><small>{w.focus}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
