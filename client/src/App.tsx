import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/common/Navbar";
import "./index.css";
import NotFoundPage from "./pages/404";
import Introduction from "./pages/introduction";
import LoginForm from "./pages/login";

const App = () => {
  const LayoutsWithNavbar = () => (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route index element={<Introduction />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/account">
          <Route index element={<LoginForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
