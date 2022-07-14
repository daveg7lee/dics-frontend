import React, { useState } from "react";
import { useTheme } from "next-themes";
import { logUserOut } from "../apollo";
import Popper from "@mui/material/Popper";
import Link from "next/link";
import useUser from "../hooks/useUser";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useUser();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <header className="bg-bgColor dark:bg-slate-800 text-black dark:text-white border-borderColor dark:border-slate-600 border-b fixed top-0 z-10 layout w-screen">
      <nav className="flex py-4 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="mr-6 flex items-center">
              <h1 className="text-2xl font-bold">DICS</h1>
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-500 dark:text-gray-400 mr-2"
            aria-label="dark-mode"
          >
            {theme === "light" ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          {data?.me?.avatar ? (
            <img
              aria-describedby={id}
              src={data?.me?.avatar}
              alt="profile img"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleClick}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse" />
          )}
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            className="z-30"
          >
            <div className="absolute right-0 top-1 w-48 rounded-md shadow-lg z-[100]">
              <div className="py-1 rounded-md bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5">
                <Link href="edit">
                  <a className="block px-5 py-2 text-sm leading-5 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                    Edit Profile
                  </a>
                </Link>
                <a
                  className="cursor-pointer block px-5 py-2 text-sm leading-5 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  onClick={() => logUserOut()}
                >
                  Log Out
                </a>
              </div>
            </div>
          </Popper>
        </div>
      </nav>
    </header>
  );
};

export default Header;
