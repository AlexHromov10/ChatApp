import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { LoginForm } from "./components";

//import { MessageBox } from "../../components/ui.components";

const LoginPage = () => {
  const { token } = useAuth("");

  return !token ? <LoginForm /> : <Navigate to="/chat" />;
  //return <>{!token && <LoginForm />}</>;
};

export { LoginPage };
