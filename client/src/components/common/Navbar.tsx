import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { useAppState } from "../../store";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [expandSideBar, useExpandSideBar] = useState<Boolean>(false);

  const { user } = useAppState((state) => state);
  const useToggleSidebar = () => {
    useExpandSideBar(!expandSideBar);
    console.log(expandSideBar);
  };
  return (
    <nav className=" relative flex min-h-[40px] h-[40px] bg-black align-middle z-20">
      <button className=" cursor-default">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute left-2 top-2"
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
      <div className="absolute right-2  h-[40px] space-x-0.5 bg-white flex">
        {!user.accessToken ? (
          <div className=" flex flex-row align-middle h-[40px] ">
            <button
              className={`text-white px-2 bg-black min-w-[70px]
                hover:bg-slate-600 hover:scale-110 hover:-translate-y-[2px] duration-150 ease-in-out 
                `}
              onClick={() => navigate("/account")}
            >
              Login
            </button>
            <button
              className={`text-white px-2 bg-black min-w-[70px]
                hover:bg-slate-600 hover:scale-110 hover:-translate-y-[2px] duration-150 ease-in-out 
                `}
            >
              PHolder
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};
