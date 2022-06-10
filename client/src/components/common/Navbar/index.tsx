import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../store";
import Styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [expandSideBar, useExpandSideBar] = useState<Boolean>(false);

  const { user } = useAppState((state) => state);
  const useToggleSidebar = () => {
    useExpandSideBar(!expandSideBar);
    console.log(expandSideBar);
  };
  return (
    <nav className={clsx(Styles.navbarContainer)}>
      <button className={clsx(Styles.sidebarToggleButton)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(Styles.sidebarToggleButtonIcon)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={2}
          onClick={useToggleSidebar}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className={clsx(Styles.accountSection)}>
        {!user.accessToken ? (
          <div className={clsx(Styles.guestAccountSection)}>
            <button
              className={clsx(Styles.guestLoginButton)}
              onClick={() => navigate("/account")}
            >
              Login
            </button>
            <button className={clsx(Styles.guestLoginButton)}>PHolder</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};
