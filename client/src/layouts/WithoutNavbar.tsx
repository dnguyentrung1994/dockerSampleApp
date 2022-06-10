import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutsWithoutNavbar = () => (
  <div>
    <Outlet />
    <ToastContainer />
  </div>
);

export default LayoutsWithoutNavbar;