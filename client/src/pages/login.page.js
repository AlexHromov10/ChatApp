import configData from "../config.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TextInput } from "../components/form.components/";

const LoginPage = () => {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(configData.SERVER_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        console.log(jsonData);
        //setRegistrationState({ isFinished: true, success: true, message: { ...jsonData.message } });
      } else {
        console.log(jsonData);
        //setRegistrationState({ isFinished: true, success: false, message: { ...jsonData.message } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <>
      <div className="registration">
        <form className="form" onSubmit={handleLoginSubmit}>
          <h1>Авторизация</h1>
          <div className="form-group">
            <TextInput
              validators={{
                isEmpty: true,
                emailError: true,
              }}
              label="Email"
              placeholder="example@gmail.com"
              name="email"
              setValue={setEmailValue}
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
              setValue={setPasswordValue}
            />
          </div>

          <div className="form-group">
            <button disabled={!emailValue.length > 0 || !passwordValue.length > 0} type="submit">
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
    </>
  );
};

export { LoginPage };
