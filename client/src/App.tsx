import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import NotFoundPage from "./pages/404";
import Introduction from "./pages/introduction";
import LoginForm from "./pages/login";
import { useAppDispatch } from "./store";
import { refreshToken } from "./store/user.store";
import LayoutsWithNavbar from "./layouts/WithNavbar";
import LayoutsWithoutNavbar from "./layouts/WithoutNavbar";
import SignUpForm from "./pages/signup";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route index element={<Introduction />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/account" element={<LayoutsWithoutNavbar />}>
          <Route index element={<LoginForm />} />
          <Route path="register" element={<SignUpForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
