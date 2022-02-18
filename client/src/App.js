import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/auth.hook";

import { RegistrationPage, LoginPage, HomePage, ChatPage } from "./pages/";
import { NavBar } from "./components/main.components";
import { ProtectedRoute } from "./ProtectedRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />

        <Routes>
          <Route path="/chat" element={<ProtectedRoute />}>
            <Route path="/chat" element={<ChatPage />} />
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
