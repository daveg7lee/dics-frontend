import React, { useState } from "react";
import { logUserOut } from "../apollo";
import Popper from "@mui/material/Popper";
import Link from "next/link";
import useUser from "../hooks/useUser";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useUser();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <header className="bg-bgColor border-borderColor border-b fixed top-0 z-10 layout w-screen">
      <nav className="flex py-4 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="mr-6 flex items-center">
              <h1 className="text-black text-2xl font-bold">DICS</h1>
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <img
            aria-describedby={id}
            src={data?.me?.avatar}
            alt="profile img"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={handleClick}
          />
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            className="z-30"
          >
            <div className="absolute right-0 top-1 w-48 rounded-md shadow-lg z-[100]">
              <div className="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
                <Link href="edit">
                  <a className="block px-5 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                    Edit Profile
                  </a>
                </Link>
                <a
                  className="cursor-pointer block px-5 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
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
