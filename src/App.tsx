import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Account from "./pages/Account";
import { SnackBarProvider } from "./store/SnackBarContext";
import AuthProvider from "./store/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// TODO: Protected Routes.

export default function App() {
  return (
    <AuthProvider>
      <SnackBarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/chat"
              element={<ProtectedRoute element={<Chat />} />}
            ></Route>
            <Route path="/account" element={<Account />}></Route>

            <Route path="*" element={<Navigate to="/chat" replace />}></Route>
          </Routes>
        </Router>
      </SnackBarProvider>
    </AuthProvider>
  );
}
