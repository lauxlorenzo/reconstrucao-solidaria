import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"

import AppContextProviders from "./context/AppContextProvider";
import PrivateRoutes from "./components/PrivateRoutes";
import ResetPassword from "./pages/ResetPassword";

import { AuthProvider } from "./context/authContext";

function AppRoutes() {
  const providers = [AuthProvider]
  return (
    <Router>
      <AppContextProviders components={providers}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
      </AppContextProviders>
    </Router>
  )
}
export default AppRoutes