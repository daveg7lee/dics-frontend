import React from "react";
import Link from "next/link";
import { FcSearch, FcUpload, FcPlus, FcMinus } from "react-icons/fc";
import useUser from "../Hooks/useUser";

const Header = () => {
  const { data } = useUser();
  return (
    <header className="header z-50">
      <>
        <div className="headerBox allCenter" />
        <div className="headerBox allCenter">
          <Link href="/">
            <a>
              <h1 className="Logo">DICS</h1>
            </a>
          </Link>
        </div>
        <div className="headerBox allCenter">
          {data?.me?.type === "Admin" && (
            <>
              <Link href="/upload">
                <a className="mr-4">
                  <FcUpload size={25} />
                </a>
              </Link>
              <Link href="/searchUser">
                <a className="mr-4">
                  <FcSearch size={25} />
                </a>
              </Link>
              <Link href="/signup">
                <a className="mr-4">
                  <FcPlus size={25} />
                </a>
              </Link>
              <Link href="/deleteUser">
                <a className="mr-4">
                  <FcMinus size={25} />
                </a>
              </Link>
              <Link href="/searchScore">
                <a className="mr-4">
                  <FcSearch size={25} />
                </a>
              </Link>
            </>
          )}
        </div>
      </>
    </header>
  );
};

export default Header;
