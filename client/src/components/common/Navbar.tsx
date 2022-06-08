import React, { useState } from "react";
import "../../index.css";
import { useAppState } from "../../store";

export const Navbar: React.FC = () => {
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
      <div className="absolute right-2 w-fit h-[40px]">
        {!user.accessToken ? (
          <div className=" flex flex-row align-middle h-[40px]">
            <button className="text-white hover:bg-slate-600 hover:underline hover:duration-150 hover:ease-in-out px-2 border-r border-solid border-white">
              place
            </button>
            <button className="text-white hover:bg-slate-600 hover:underline hover:duration-150 ease-in-out px-2">
              holder
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};
