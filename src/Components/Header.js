import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { FcSearch, FcUpload } from 'react-icons/fc';
import { ME } from '../SharedQueries';

const SHeader = styled.header`
  width: 100%;
  backdrop-filter: saturate(200%) blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: ${(props) => props.theme.boxBorder};
  z-index: 50;
  position: fixed;
  top: 0;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Logo = styled.h1`
  width: auto;
  height: 2rem;
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Icon = styled(Link)`
  margin-right: 10%;
`;

const Header = () => {
  const { data } = useQuery(ME);
  return (
    <SHeader>
      <>
        <HeaderBox />
        <HeaderBox>
          <Link to="/" replace>
            <Logo>DICS</Logo>
          </Link>
        </HeaderBox>
        <HeaderBox>
          {data?.me.type === 'Admin' && (
            <>
              <Icon to="/upload">
                <FcUpload size={25} />
              </Icon>
              <Icon to="/searchUser">
                <FcSearch size={25} />
              </Icon>
            </>
          )}
        </HeaderBox>
      </>
    </SHeader>
  );
};

export default Header;
