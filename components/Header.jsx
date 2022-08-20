import React, { useState } from "react";
import { useTheme } from "next-themes";
import { logUserOut } from "../apollo";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Link from "next/link";
import useUser from "../hooks/useUser";
import Image from "next/image";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data } = useUser();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <header className="bg-bgColor dark:bg-slate-800 text-black dark:text-white border-borderColor dark:border-slate-600 border-b fixed top-0 z-10 layout w-screen">
      <nav className="flex py-4 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <h1 className="text-2xl font-bold ml-1">DICS Students</h1>
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
            <div className="relative">
              {data?.me?.avatar ? (
                <img
                  src={data?.me?.avatar}
                  alt="profile img"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={handleClick}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse" />
              )}
              {open ? (
                <div className="absolute right-0 top-9 w-48 rounded-md shadow-lg z-[100] border border-borderColor dark:border-slate-600">
                  <div className="py-1 rounded-md bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5">
                    <Link href="edit">
                      <a className="border-b border-borderColor dark:border-slate-600 block px-5 py-2 text-sm leading-5 text-gray-700 dark:text-white focus:outline-none transition duration-150 ease-in-out opacity-60 hover:opacity-100">
                        Edit Profile
                      </a>
                    </Link>
                    <a
                      className="cursor-pointer block px-5 py-2 text-sm leading-5 text-gray-700 dark:text-white focus:outline-none transition duration-150 ease-in-out opacity-60 hover:opacity-100"
                      onClick={() => logUserOut()}
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </ClickAwayListener>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-500 dark:text-gray-400 ml-2"
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
