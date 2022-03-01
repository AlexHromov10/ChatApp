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
      <div className="nav--left">
        <Link className="navlink" to="/">
          <p>Домашнаяя страница</p>
        </Link>
      </div>
      <div className="nav--right">
        {!token && (
          <Link className="navlink" to="/login">
            <p>Войти</p>
          </Link>
        )}
        {!token && (
          <Link className="navlink" to="/registration">
            <p>Регистрация</p>
          </Link>
        )}
        {token && (
          <button className="navlink" onClick={handleClick}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
}
