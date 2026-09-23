import Link from "next/link";
import { getSession } from "@/lib/session";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";

export default async function Dashboard() {
  const session = await getSession();
  const current = workouts[0];
  const currentImage = driveThumbnailUrl(current.driveFileId, 1200);

  return (
    <main className="appShell">
      <aside className="sidebar">
        <Link className="brand brandStack" href="/app"><span>OPERAÇÃO</span><b>WKT</b></Link>
        <nav className="menu">
          <b>⌂ <span>Início</span></b><span>▢ <i>Minha jornada</i></span><span>⚔ <i>Treinos</i></span><span>▥ <i>Progresso</i></span><span>☆ <i>Conquistas</i></span><span>◎ <i>Perfil</i></span>
        </nav>
        <div className="sidebarBottom"><small>{session?.email}</small><Link href="/">↩ Sair</Link></div>
      </aside>
      <section className="dashboard">
        <div className="topline"><div><span className="eyebrow">PAINEL DO ALUNO</span><h1>Olá, {session?.name || "Recruta"}</h1></div><div className="userChip"><span className="avatar">W</span><small>Minha conta</small></div></div>
        <article className="todayCard">
          <div className="todayCopy">
            <span className="eyebrow">SEMANA 1 • DIA 1</span>
            <h2>MISSÃO {String(current.id).padStart(2, "0")}<br/>{current.code.toUpperCase()}</h2>
            <p>{current.focus}</p>
            <div className="missionMeta"><span>◷ 29 minutos</span><span>♙ Nível adaptável</span></div>
            <Link className="button dashboardCta" href={`/app/workout/${current.slug}`}>Iniciar missão ▶</Link>
          </div>
          <div className="todayMedia" style={{ backgroundImage: `url("${currentImage}")` }}><div className="todayMediaShade"/><strong>DISCIPLINA<br/>HOJE.<br/>RESULTADOS<br/>SEMPRE.</strong></div>
        </article>
        <div className="stats">
          <div><span>🔥</span><b>0 dias</b><small>consecutivos</small></div>
          <div><span className="barsIcon">▮▮▮</span><b>0%</b><small>progresso</small></div>
          <div><span>★</span><b>0 XP</b><small>pontos</small></div>
        </div>
        <div className="journeyHead"><h3>Sua jornada</h3><span>Ver calendário completo →</span></div>
        <div className="journeyTrack">
          {[1,2,3,4].map((week) => (
            <div className={week === 1 ? "week activeWeek" : "week"} key={week}>
              <small>SEMANA {week}</small>
              <div>{Array.from({length:5}, (_, i) => { const n=(week-1)*5+i+1; return <span className={n===1 ? "day activeDay" : "day"} key={n}>{n}</span>; })}</div>
            </div>
          ))}
          <div className="week lastWeek"><small>FINAL</small><div><span className="day">21</span></div></div>
        </div>
        <div className="journeyHead libraryHead"><h3>Biblioteca de missões</h3><span>{workouts.length} treinos</span></div>
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
