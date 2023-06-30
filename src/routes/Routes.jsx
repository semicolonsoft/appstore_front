import { Navigate, Route, Routes } from "react-router-dom";

import ApplicationPage from "../pages/ApplicationPage";
import { AuthContext } from "../components/AuthProvider";
import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";
import { useContext } from "react";

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={isLoggedIn ? <MainPage /> : <Navigate to={"/auth"} />}
      />
      <Route
        path="/auth"
        element={isLoggedIn ? <Navigate to={"/"} /> : <AuthPage />}
      />
      <Route
        path="/application/:id"
        element={isLoggedIn ? <ApplicationPage /> : <Navigate to={"/auth"} />}
      />
    </Routes>
  );
};

export default AppRoutes;
