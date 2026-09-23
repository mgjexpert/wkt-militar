import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="centerPage">
      <div className="authCard">
        <a className="brand" href="/">OPERAÇÃO <b>WKT</b></a>
        <span className="eyebrow">ÁREA DO ALUNO</span>
        <h1>Entrar na missão</h1>
        <p>Use seu e-mail e o código de acesso do MVP.</p>
        <LoginForm />
      </div>
    </main>
  );
}
