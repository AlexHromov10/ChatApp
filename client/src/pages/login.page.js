import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <p>Login</p>
      <input type="text" placeholder="EMAIL"></input>
      <p>Нет аккаунта? зарегись: </p>
      <Link to="/registration">Регистрация</Link>
    </div>
  );
};

export { LoginPage };
