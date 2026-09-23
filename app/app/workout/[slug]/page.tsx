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
        <Link className="brand" href="/app">← OPERAÇÃO <b>WKT</b></Link>
        <span>MISSÃO {String(workout.id).padStart(2, "0")} • {workout.code.toUpperCase()}</span>
      </header>
      <div className="playerGrid">
        <section>
          <div className="videoFrame">
            <iframe
              src={drivePreviewUrl(workout.driveFileId)}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={`Treino ${workout.id} ${workout.code}`}
            />
          </div>
          <div className="motivation"><b>Faça junto.</b> Acompanhe o instrutor e conclua a sessão.</div>
        </section>
        <aside className="workoutInfo">
          <span className="eyebrow">MISSÃO {String(workout.id).padStart(2, "0")}</span>
          <h1>{workout.code}</h1>
          <p>{workout.focus}</p>
          <hr/>
          <div className="check">✓ Aquecimento</div>
          <div className="check">○ Treino guiado</div>
          <div className="check">○ Finalização</div>
          <button className="button full">Concluir missão ✓</button>
          <small>O player usa Google Drive Preview. Nenhuma API do Drive é usada.</small>
        </aside>
      </div>
    </main>
  );
}
