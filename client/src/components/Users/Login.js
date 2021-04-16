import axios from "axios";
import { useState } from "react";
import { ACCES_TOKEN_NAME } from "../../constants/constant";
import { withRouter } from "react-router-dom";
import logo from '../assets/logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const emailLogin = (event) =>
    setUserLogin({ ...userLogin, email: event.target.value });
  const passwordLogin = (event) =>
    setUserLogin({ ...userLogin, password: event.target.value });

  const submitLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", { ...userLogin })
      .then((response) => {
        setLoginCorrecto(response.data.message);
        localStorage.setItem(ACCES_TOKEN_NAME, response.data.token);
        redirectToHome()
      })
      .catch((error)=>{
        console.log(error.response.data)
        setErrorLogin(error.response.data)
      })  
  };
  const [errorLogin, setErrorLogin] = useState("");
  const [loginCorrecto, setLoginCorrecto] = useState("");

  const redirectToRegister = () => {
    props.history.push("/register");
  };
  const redirectToHome = () => {
    props.history.push("/posts");
  };

  return (
      
    <div className="fondo">
        <img src={logo} alt="logo" className="logo"/>
      
      <h3 className="login">Log in</h3>

      <form action="POST" onSubmit={submitLogin}>
        <input
          type="email"
          name="email"
          value={userLogin.email}
          onChange={emailLogin}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          value={userLogin.password}
          onChange={passwordLogin}
          placeholder="Password"
        />

        <div className="iniciologin">
          <button class="btn btn-primary" type="submit" onClick={submitLogin} className="boton">
          Iniciar Sesión
        </button>
        </div>
        

        <div className="mt-2">
          <span className="register">Crea tu cuenta </span>
          <span onClick={() => redirectToRegister()}>
            <span>
                <p className="loginText">
                Regístrate
                </p>
            </span>
          </span>
        </div>

        {errorLogin && (
          <div>
            <p className="error">{errorLogin}</p>
          </div>
        )}
        {loginCorrecto && (
          <div>
            <p className="error">{loginCorrecto}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default withRouter(Login);
