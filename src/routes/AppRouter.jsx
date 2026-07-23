import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Teachers from "../pages/Teachers/Teachers.jsx";
import Favorites from "../pages/Favorites/Favorites.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
