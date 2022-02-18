import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

export function NavBar() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setToken(null);
    navigate("/home");
  };

  return (
    <nav>
      <Link className="link" to="/">
        Домашнаяя страница
      </Link>
      {!token && (
        <Link className="link" to="/login">
          Войти
        </Link>
      )}
      {!token && (
        <Link className="link" to="/registration">
          Регистрация
        </Link>
      )}
      {token && <button onClick={handleClick}>Выйти</button>}
    </nav>
  );
}
