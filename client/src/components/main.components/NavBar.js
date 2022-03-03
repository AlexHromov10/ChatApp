import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

export function NavBar() {
  const { token } = useAuth("");
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("auth-token");
    //alert("LOL");
    navigate("/login");
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
          <a className="navlink" href=" " onClick={handleClick}>
            <p>Выйти</p>
          </a>
        )}
      </div>
    </nav>
  );
}
