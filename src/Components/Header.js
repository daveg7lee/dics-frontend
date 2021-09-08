import React from 'react';
import { Link } from 'react-router-dom';
import { FcSearch, FcUpload, FcPlus, FcMinus } from 'react-icons/fc';
import useUser from '../Hooks/useUser';

const Header = () => {
  const { data } = useUser();
  return (
    <header className="header z-50">
      <>
        <div className="headerBox allCenter" />
        <div className="headerBox allCenter">
          <Link to="/" replace>
            <h1 className="Logo">DICS</h1>
          </Link>
        </div>
        <div className="headerBox allCenter">
          {data?.me?.type === 'Admin' && (
            <>
              <Link className="mr-4" to="/upload">
                <FcUpload size={25} />
              </Link>
              <Link className="mr-4" to="/searchUser">
                <FcSearch size={25} />
              </Link>
              <Link className="mr-4" to="/signup">
                <FcPlus size={25} />
              </Link>
              <Link className="mr-4" to="/deleteUser">
                <FcMinus size={25} />
              </Link>
              <Link className="mr-4" to="/searchScore">
                <FcSearch size={25} />
              </Link>
            </>
          )}
        </div>
      </>
    </header>
  );
};

export default Header;
