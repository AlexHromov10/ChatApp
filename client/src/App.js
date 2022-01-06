import { Routes, Route, Link } from "react-router-dom";

import { RegistrationPage } from "./pages/registration/registration.page";
import { LoginPage } from "./pages/login.page";
import { HomePage } from "./pages/home.page";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Домашнаяя страница</Link>
        <Link to="/login">Войти</Link>
        <Link to="/registration">Регистрация</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
