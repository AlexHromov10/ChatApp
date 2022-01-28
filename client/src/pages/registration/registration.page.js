import { useInput } from "../../hooks/register.validation";
import configData from "../../config.json";

const RegistrationPage = () => {
  const email = useInput("", {
    isEmpty: true,
    emailError: true,
    isTaken: { url: "/auth/emailexists", fieldToCheck: "email" },
  });
  const password = useInput("", { isEmpty: true, minLength: 8 });
  const nickname = useInput("", {
    isEmpty: true,
    minLength: 3,
    isTaken: { url: "/auth/nickexists", fieldToCheck: "nickname" },
  });
  const daySelect = useInput("", { isEmpty: true, selectDefaultError: true });
  const monthSelect = useInput("", { isEmpty: true, selectDefaultError: true });
  const yearSelect = useInput("", { isEmpty: true, selectDefaultError: true });

  function generateYearsBetween(startYear = 1905) {
    let endDate = new Date().getFullYear();
    let years = [];
    for (var i = endDate; i >= startYear; i--) {
      years.push(endDate);
      endDate--;
    }
    return years;
  }
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const months = {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь",
  };

  const daysOptions = days.map((day) => {
    return (
      <option key={day.toString()} value={day}>
        {day}
      </option>
    );
  });

  const monthsOptions = Object.entries(months).map(([key, value]) => {
    return (
      <option key={key.toString()} value={key}>
        {value}
      </option>
    );
  });

  // const monthsOptions = months.map((month) => {
  //   return (
  //     <option key={month.key.toString()} value={month.key}>
  //       {month.value}
  //     </option>
  //   );
  // });
  const yearsOptions = generateYearsBetween().map((year) => {
    return (
      <option key={year.toString()} value={year}>
        {year}
      </option>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birth_date = (y, m, d) => {
      return `${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}`;
    };

    //const birthdate = new Date(yearSelect.value, monthSelect.value, daySelect.value);

    try {
      const response = await fetch(configData.SERVER_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          nickname: nickname.value,
          //birth_date: birthdate.toLocaleDateString("en-US"),
          birth_date: birth_date(yearSelect.value, monthSelect.value, daySelect.value),
        }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <div className="form-group">
          <div className="form-group--label-error">
            <label>E-mail</label>
            {email.isDirty && email.isEmpty && <span>{email.errorMessage.isEmpty}</span>}
            {email.isDirty && !email.isEmpty && email.emailError && <span>{email.errorMessage.isEmail}</span>}
            {email.isDirty && !email.isEmpty && !email.emailError && email.isTaken && (
              <span>{email.errorMessage.isTakenError}</span>
            )}
          </div>

          <input
            placeholder="example@gmail.com"
            className={email.isDirty && (email.isEmpty || email.emailError || email.isTaken) ? "error_input" : ""}
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            name="email"
            id="email"
            type="text"
          ></input>
        </div>

        <div className="form-group">
          <div className="form-group--label-error">
            <label>Пароль</label>
            {password.isDirty && password.isEmpty && <span>{password.errorMessage.isEmpty}</span>}
            {password.isDirty && !password.isEmpty && password.minLengthError && (
              <span>{password.errorMessage.minLength}</span>
            )}
          </div>

          <input
            placeholder="••••••••"
            type="password"
            className={password.isDirty && (password.isEmpty || password.minLengthError) ? "error_input" : ""}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            value={password.value}
            name="password"
            id="password"
          ></input>
        </div>

        <div className="form-group">
          <div className="form-group--label-error">
            <label>Никнейм</label>
            {nickname.isDirty && nickname.isEmpty && <span>{nickname.errorMessage.isEmpty}</span>}
            {nickname.isDirty && !nickname.isEmpty && nickname.minLengthError && (
              <span>{nickname.errorMessage.minLength}</span>
            )}
            {nickname.isDirty && !nickname.isEmpty && !nickname.minLengthError && nickname.isTaken && (
              <span>{nickname.errorMessage.isTakenError}</span>
            )}
          </div>

          <input
            placeholder="CoolName"
            className={
              nickname.isDirty && (nickname.isEmpty || nickname.minLengthError || nickname.isTaken) ? "error_input" : ""
            }
            onChange={(e) => nickname.onChange(e)}
            onBlur={(e) => nickname.onBlur(e)}
            value={nickname.value}
            name="nickname"
            id="nickname"
            type="text"
          ></input>
        </div>

        <div className="form-group">
          <div className="form-group--label-error">
            <label>Дата рождения</label>
            {((yearSelect.isDirty && yearSelect.selectError) ||
              (monthSelect.isDirty && monthSelect.selectError) ||
              (daySelect.isDirty && daySelect.selectError)) && <span>Некорректная дата</span>}
          </div>

          <div className="form-group-date">
            <select
              onClick={(e) => daySelect.onClickSelector(e)}
              name="day"
              id="day"
              className={daySelect.isDirty && daySelect.selectError ? "error_input" : ""}
            >
              <option value="NONE" defaultValue={"NONE"}>
                День
              </option>
              {daysOptions}
            </select>

            <select
              onClick={(e) => monthSelect.onClickSelector(e)}
              name="month"
              id="month"
              className={monthSelect.isDirty && monthSelect.selectError ? "error_input" : ""}
            >
              <option value="NONE" defaultValue={"NONE"}>
                Месяц
              </option>
              {monthsOptions}
            </select>

            <select
              onClick={(e) => yearSelect.onClickSelector(e)}
              name="year"
              id="year"
              className={yearSelect.isDirty && yearSelect.selectError ? "error_input" : ""}
            >
              <option value="NONE" defaultValue={"NONE"}>
                Год
              </option>
              {yearsOptions}
            </select>
          </div>
        </div>

        <div className="form-group">
          <button
            disabled={
              !email.inputValid ||
              !password.inputValid ||
              !nickname.inputValid ||
              !daySelect.inputValid ||
              !monthSelect.inputValid ||
              !yearSelect.inputValid
            }
            type="submit"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export { RegistrationPage };
