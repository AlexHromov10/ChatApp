import configData from "../../../config.json";
import { TextInput, DateSelector } from "../../../components/form.components/";
import { useState } from "react";
import { Link } from "react-router-dom";
const { birth_date } = require("../../../constants/selector.constants");

export function RegistrationForm(props) {
  const { setRegistrationState } = props;

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegistrationState({ isStarted: true, isFinished: false, success: false, message: { h2: "Ожидайте..." } });

    const formData = JSON.stringify({
      email: e.target.email.value,
      password: e.target.password.value,
      nickname: e.target.nickname.value,
      birth_date: birth_date(e.target.year.value, e.target.month.value, e.target.day.value),
    });

    try {
      const response = await fetch(configData.SERVER_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setRegistrationState({ isStarted: true, isFinished: true, success: true, message: { ...jsonData.message } });
      } else {
        setRegistrationState({ isStarted: true, isFinished: true, success: false, message: { ...jsonData.message } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);

  return (
    <div className="registration">
      <form className="form" onSubmit={handleRegistrationSubmit}>
        <h1>Регистрация</h1>
        <div className="form-group">
          <TextInput
            validators={{
              isEmpty: true,
              emailError: true,
              isTaken: { url: "/auth/isemailfree", fieldToCheck: "email" },
            }}
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            type="text"
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
            setValue={setPasswordValid}
            type="password"
          />
        </div>

        <div className="form-group">
          <TextInput
            validators={{
              isEmpty: true,
              minLength: 3,
              isTaken: { url: "/auth/isnicknamefree", fieldToCheck: "nickname" },
            }}
            label="Никнейм"
            placeholder="CoolName"
            name="nickname"
            setValue={setNicknameValid}
          />
        </div>

        <div className="form-group">
          <DateSelector setDateValid={setDateValid} />
        </div>

        <div className="form-group">
          <button disabled={!emailValid || !passwordValid || !nicknameValid || !dateValid} type="submit">
            Зарегистрироваться
          </button>
        </div>

        <div className="form-group">
          <Link className="link" to="/login">
            Уже есть аккаунт? Авторизуйтесь!
          </Link>
        </div>
      </form>
    </div>
  );
}
