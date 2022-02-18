import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";

import { RegistrationPage, LoginPage, HomePage } from "./pages/";
import { NavBar } from "./components/ui.components";
import { ProtectedRoute } from "./ProtectedRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />

        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
