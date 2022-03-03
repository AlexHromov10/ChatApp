import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RegistrationForm } from "./components/RegistrationForm";
import { MessageBox } from "../../components/main.components";
import { useAuth } from "../../hooks/auth.hook";

const RegistrationPage = () => {
  const [registrationState, setRegistrationState] = useState({
    isStarted: false,
    isFinished: false,
    success: false,
    message: "",
  });
  const { token } = useAuth("");

  return (
    <>
      {token && <Navigate to="/home" />}

      {!registrationState.isStarted && !registrationState.isFinished && !registrationState.success && (
        <RegistrationForm setRegistrationState={setRegistrationState} />
      )}

      {registrationState.isStarted && !registrationState.isFinished && !registrationState.success && (
        <MessageBox message={registrationState.message} />
      )}

      {registrationState.isStarted && registrationState.isFinished && (
        <MessageBox message={registrationState.message} />
      )}
    </>
  );
};

export { RegistrationPage };
