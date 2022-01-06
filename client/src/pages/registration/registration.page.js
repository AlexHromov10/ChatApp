import { useState } from "react";
import configData from "../../config.json";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [emailFilled, setEmailFilled] = useState(false);
  const [emailError, setEmailError] = useState(
    "Поле для e-mail не можеты быть пустым!"
  );

  const checkEmail = async (e) => {
    try {
      const response = await fetch(configData.SERVER_URL + "/auth/checkemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e.target.value }),
      });
      const jsonData = await response.json();
      if (!jsonData["check email"]) {
        setEmailError("E-mail уже занят!");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(String(e.target.value).toLowerCase().trim())) {
      setEmailError("Некорректный e-mail!");
    } else {
      setEmailError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailFilled(true);
        checkEmail(e);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form>
        <label for="email">Логин (E-mail адрес):</label>
        <input
          name="email"
          type="text"
          value={email}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => emailHandler(e)}
          placeholder="Введите e-mail"
        ></input>
        {emailFilled && emailError && (
          <span style={{ color: "red" }}>{emailError}</span>
        )}
      </form>
    </div>
  );
};

export { RegistrationPage };
