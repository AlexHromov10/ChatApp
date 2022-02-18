import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function NavBar() {
  const [token] = useAuth("");
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("auth-token");
    navigate("/home");
  };

  return (
    <nav>
      <Link to="/">Домашнаяя страница</Link>
      {!token && <Link to="/login">Войти</Link>}
      {!token && <Link to="/registration">Регистрация</Link>}
      {token && <button onClick={handleClick}>Выйти</button>}
    </nav>
  );
}
