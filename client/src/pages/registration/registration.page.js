import { useEffect, useState } from "react";
import configData from "../../config.json";

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
  };
};

const RegistrationPage = () => {
  const email = useInput("");
  const password = useInput("");

  return (
    <div>
      <h1>Регистрация</h1>
      <form className="registration-form">
        <div className="registration-form-group">
          <label for="email">Логин (E-mail адрес):</label>
          <input
            className="input-text"
            onChange={email.onChange}
            value={email.value}
            name="email"
            type="text"
          ></input>
        </div>
        <div className="registration-form-group">
          <label for="password">Пароль:</label>
          <input
            className="input-text"
            onChange={password.onChange}
            value={password.value}
            name="password"
            type="text"
          ></input>
        </div>
        <div className="registration-form-group">
          <label for="first_name">Имя:</label>
          <input className="input-text" name="first_name" type="text"></input>
        </div>
        <div className="registration-form-group">
          <label for="last_name">Фамилия:</label>
          <input className="input-text" name="last_name" type="text"></input>
        </div>
        <div className="registration-form-group">
          <label for="birth_date">Дата рождения:</label>
          <input
            className="input-date"
            name="birth_date"
            type="date"
            max={new Date().toLocaleDateString("en-ca")}
          ></input>
        </div>
      </form>
    </div>
  );
};

export { RegistrationPage };
