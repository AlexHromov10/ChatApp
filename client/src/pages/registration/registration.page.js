import { useState } from "react";
import { RegistrationForm } from "./components/RegistrationForm";
import { MessageBox } from "../../components/ui.components";

const RegistrationPage = () => {
  const [registrationState, setRegistrationState] = useState({ isFinished: false, success: false, message: "" });

  return (
    <>
      {console.log("RENDER")}
      {!registrationState.isFinished && !registrationState.success && (
        <RegistrationForm setRegistrationState={setRegistrationState} />
      )}
      {registrationState.isFinished && <MessageBox message={registrationState.message} />}
    </>
  );
};

export { RegistrationPage };
