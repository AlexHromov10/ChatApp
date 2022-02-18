import { useState } from "react";
import { Navigate } from "react-router-dom";
import { RegistrationForm } from "./components/RegistrationForm";
import { MessageBox } from "../../components/main.components";
import { useAuth } from "../../hooks/auth.hook";

const RegistrationPage = () => {
  const [registrationState, setRegistrationState] = useState({ isFinished: false, success: false, message: "" });
  const { token } = useAuth("");

  return (
    <>
      {token && <Navigate to="/home" />}

      {!registrationState.isFinished && !registrationState.success && (
        <RegistrationForm setRegistrationState={setRegistrationState} />
      )}
      {registrationState.isFinished && <MessageBox message={registrationState.message} />}
    </>
  );
};

export { RegistrationPage };
