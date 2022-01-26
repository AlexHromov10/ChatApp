import { useInput } from "../../hooks/register.validation";

const RegistrationPage = () => {
  const email = useInput("", { isEmpty: true, emailError: true });
  const password = useInput("", { isEmpty: true, minLength: 8 });
  const nickname = useInput("", { isEmpty: true, minLength: 3 });

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  const daysOptions = days.map((day) => {
    return <option value={day}>{day}</option>;
  });
  const monthsOptions = months.map((month) => {
    return <option value={month}>{month}</option>;
  });

  return (
    <div className="registration">
      <form className="form">
        <h1>Регистрация</h1>
        <div className="form-group">
          <label>E-mail адрес:</label>
          <input placeholder="example@gmail.com" className="input-text" onChange={(e) => email.onChange(e)} onBlur={(e) => email.onBlur(e)} value={email.value} name="email" type="text"></input>

          {email.isDirty && email.isEmpty && <span>{email.errorMessage.isEmpty}</span>}
          {email.isDirty && !email.isEmpty && email.emailError && <span>{email.errorMessage.isEmail}</span>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input placeholder="••••••••" type="password" className="input-text" onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)} value={password.value} name="password"></input>

          {password.isDirty && password.isEmpty && <span>{password.errorMessage.isEmpty}</span>}
          {password.isDirty && !password.isEmpty && password.minLengthError && <span>{password.errorMessage.minLength}</span>}
        </div>

        <div className="form-group">
          <label>Никнейм:</label>
          <input placeholder="CoolName" className="input-text" onChange={(e) => nickname.onChange(e)} onBlur={(e) => nickname.onBlur(e)} value={nickname.value} name="nickname" type="text"></input>

          {nickname.isDirty && nickname.isEmpty && <span>{nickname.errorMessage.isEmpty}</span>}
          {nickname.isDirty && !nickname.isEmpty && nickname.minLengthError && <span>{nickname.errorMessage.minLength}</span>}
        </div>

        <div className="form-group">
          <label>Дата рождения:</label>
          <div className="form-group-date">
            <select name="day">
              <option value="" selected>
                День
              </option>
              {daysOptions}
            </select>

            <select className="input-text input-dmy" name="day">
              <option value="" selected>
                Месяц
              </option>
              {monthsOptions}
            </select>

            <select className="input-text input-dmy" name="day">
              <option value="" selected>
                Год
              </option>
              {monthsOptions}
            </select>
          </div>

          {/*
            <input
              className="input-date"
              name="birth_date"
              type="date"
              max={new Date().toLocaleDateString("en-ca")}
            ></input>
          */}
        </div>

        <div className="form-group">
          <button disabled={!email.inputValid || !password.inputValid} type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export { RegistrationPage };
