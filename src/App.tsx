import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/Auth";
import RootLayout from "./component/Auth/RootLayout";
import ProtectedRoute from "./component/Auth/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import Login from "./component/Auth/Login";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootLayout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </RootLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
