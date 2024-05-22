import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

type Props ={}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext)

  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

const AppRoutes = (props: Props) => {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Router>
  )
}

export default AppRoutes