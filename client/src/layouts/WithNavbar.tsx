import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "../components/common/Navbar";
import "react-toastify/dist/ReactToastify.css";

const LayoutsWithNavbar = () => (
  <div>
    <Navbar />
    <Outlet />
    <ToastContainer />
  </div>
);

export default LayoutsWithNavbar;
