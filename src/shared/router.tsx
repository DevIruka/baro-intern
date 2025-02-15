import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UnitInfoPage from "../pages/UnitInfoPage";
import Home from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

const publicRoutes = [{ path: "/", element: <Home /> }];

const guestRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

const protectedRoutes = [{ path: "/unitinfo", element: <UnitInfoPage /> }];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}

        {guestRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<GuestRoute>{route.element}</GuestRoute>}
          />
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
