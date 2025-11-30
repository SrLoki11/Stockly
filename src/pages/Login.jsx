import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); 
    navigate("/home"); 
  }

  return (
    <div className="login-container">

      {/* Lado esquerdo com formulário */}
      <div className="login-left">
        <h1 className="login-title">
          Faça seu <br /> login<span className="dot">.</span>
        </h1>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" required />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" required />

          <a href="#" className="forgot-password">Esqueci minha senha</a>

          <button type="submit" className="btn-login">
            Entrar
          </button>

          <a href="#" className="register-link">
            Ainda não tenho uma conta →
          </a>
        </form>
      </div>

      {/* Lado direito com imagem */}
      <div className="login-right"></div>
    </div>
  );
}

export default Login;
