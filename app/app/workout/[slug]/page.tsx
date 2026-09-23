import Link from "next/link";
import { drivePreviewUrl, getWorkout } from "@/lib/workouts";
import { notFound } from "next/navigation";

export default async function WorkoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workout = getWorkout(slug);
  if (!workout) notFound();

  return (
    <main className="playerPage">
      <header className="playerNav">
        <Link className="brand brandStack" href="/app"><span>← OPERAÇÃO</span><b>WKT</b></Link>
        <div className="playerMissionTitle"><small>MISSÃO {String(workout.id).padStart(2, "0")}</small><b>{workout.code.toUpperCase()}</b></div>
      </header>
      <div className="playerGrid">
        <section className="playerMain">
          <div className="videoFrame"><iframe src={drivePreviewUrl(workout.driveFileId)} allow="autoplay; fullscreen" allowFullScreen title={`Treino ${workout.id} ${workout.code}`}/></div>
          <div className="playerFooterBar"><p><b>Faça junto.</b> Você consegue.</p><Link className="button ghost compactButton" href="/app">Voltar ao painel</Link></div>
        </section>
        <aside className="workoutInfo">
          <span className="eyebrow">MISSÃO {String(workout.id).padStart(2, "0")}</span><h1>{workout.code}</h1><p>{workout.focus}</p>
          <div className="missionMeta verticalMeta"><span>◷ Sessão guiada</span><span>♙ Faça no seu ritmo</span></div>
          <hr/>
          <div className="workoutSteps">
            <div className="check done"><span>✓</span><b>Aquecimento</b><small>Prepare o corpo</small></div>
            <div className="check"><span>○</span><b>Treino guiado</b><small>Acompanhe o vídeo</small></div>
            <div className="check"><span>○</span><b>Finalização</b><small>Respire e recupere</small></div>
          </div>
          <button className="button full finishButton">Concluir missão ✓</button>
          <small className="providerNote">Vídeo reproduzido diretamente do Google Drive.</small>
        </aside>
      </div>
    </main>
  );
}
