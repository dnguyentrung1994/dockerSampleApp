import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/common/Navbar";
import "./index.css";
import NotFoundPage from "./pages/404";
import Introduction from "./pages/introduction";
import LoginForm from "./pages/login";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store";
import { refreshToken } from "./store/user.store";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const LayoutsWithNavbar = () => (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
  const LayoutsWithoutNavbar = () => (
    <div>
      <Outlet />
      <ToastContainer />
    </div>
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route index element={<Introduction />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/account" element={<LayoutsWithoutNavbar />}>
          <Route index element={<LoginForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
