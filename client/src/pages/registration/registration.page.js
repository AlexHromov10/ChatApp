import configData from "../../config.json";
import { TextInput, DateSelector } from "../../components/form.components/";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";

const RegistrationPage = () => {
  //const history = useHistory();

  const [registrationState, setRegistrationState] = useState({ isFinished: false, success: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(configData.SERVER_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          nickname: nicknameValue,
          birth_date: dateValue,
        }),
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setRegistrationState({ isFinished: true, success: true, message: { ...jsonData.message } });
      } else {
        setRegistrationState({ isFinished: true, success: false, message: { ...jsonData.message } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  return (
    <>
      {!registrationState.isFinished && !registrationState.success && (
        <div className="registration">
          <form className="form" onSubmit={handleSubmit}>
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
                setValue={setPasswordValue}
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
                setValue={setNicknameValue}
              />
            </div>

            <div className="form-group">
              <DateSelector setDateValue={setDateValue} />
            </div>

            <div className="form-group">
              <button
                disabled={
                  !emailValue.length > 0 ||
                  !passwordValue.length > 0 ||
                  !nicknameValue.length > 0 ||
                  !dateValue.length > 0
                }
                type="submit"
              >
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
      )}
      {registrationState.isFinished && (
        <div className="registration">
          <div className="form">
            <div className="form-group">
              <h1>{registrationState.message.h1}</h1>
              <p>{registrationState.message.p}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { RegistrationPage };
