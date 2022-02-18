import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../hooks/auth";
import { TextInput } from "../../../components/form.components/";
import configData from "../../../config.json";

export function LoginForm(props) {
  const [setToken] = useAuth("");

  const [loginError, setLoginError] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = JSON.stringify({
      email: e.target.email.value,
      password: e.target.password.value,
    });

    try {
      const response = await fetch(configData.SERVER_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const jsonData = await response.json();
      const jwt = response.headers.get("auth-token");
      console.log(jwt);

      if (jsonData.success) {
        localStorage.setItem("auth-token", jwt);
        setToken(jwt);
        navigate("/home");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration">
      <form className="form" onSubmit={handleLoginSubmit}>
        <h1>Авторизация</h1>

        {loginError && <span>Неверные данные!</span>}

        <div className="form-group">
          <TextInput
            validators={{
              isEmpty: true,
              emailError: true,
            }}
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            setValue={setEmailValid}
          />
        </div>

        <div className="form-group">
          <TextInput
            validators={{
              isEmpty: true,
              minLength: 8,
            }}
            label="Пароль"
            placeholder="••••••••"
            name="password"
            type="password"
            setValue={setPasswordValid}
          />
        </div>

        <div className="form-group">
          <button disabled={!emailValid || !passwordValid} type="submit">
            Войти
          </button>
        </div>

        <div className="form-group">
          <Link className="link" to="/registration">
            Нет аккаунта? Зарегиструйтесь!
          </Link>
        </div>
      </form>
    </div>
  );
}
