import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { GoThreeBars, GoX } from 'react-icons/go';
import { ME } from '../SharedQueries';

const Header = styled.header`
  width: 100%;
  backdrop-filter: saturate(200%) blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: ${(props) => props.theme.boxBorder};
  z-index: 50;
  position: fixed;
  top: 0;
`;

const Nav = styled.nav`
  display: block;
`;

const MobileNav = styled.div`
  display: none;
  margin-bottom: 1.5rem;
  @media (min-width: 640px) {
    display: none;
  }
`;

const MobileNavBox = styled.div``;

const MobileNavLink = styled(Link)`
  margin-top: 1.25rem;
  display: block;
  padding-left: 0.75rem;
  padding-right: 1rem;
  border-left-width: 4px;
  border-color: transparent;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const HeaderBox = styled.div`
  position: relative;
  height: 4rem;
  display: flex;
  justify-content: space-between;
`;

const HeaderColumn1 = styled.div`
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: 640px) {
    justify-content: flex-start;
    align-items: stretch;
  }
`;

const HeaderColumn2 = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  @media (min-width: 640px) {
    position: static;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    padding-right: 0;
    margin-left: 1.5rem;
  }
`;

const HeaderLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  border-bottom-width: 2px;
  border-color: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  --text-opacity: 1;
  color: #6b7280;
  color: rgba(107, 114, 128, var(--text-opacity));
  transition-duration: 0.15s;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    --text-opacity: 1;
    color: #374151;
    color: rgba(55, 65, 81, var(--text-opacity));
  }
  :focus {
    outline: none;
  }
  :not(:first-child) {
    margin-left: 1rem;
  }
`;

const HeaderLinkContainer = styled.div`
  display: none;
  @media (min-width: 640px) {
    margin-left: 1.5rem;
    display: flex;
  }
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const LogoMobile = styled.h1`
  width: auto;
  height: 2rem;
  display: block;
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const LogoDesktop = styled.h1`
  width: auto;
  height: 2rem;
  display: none;
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const Button = styled.div`
  transition: all 0.8s;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.4;
  color: black;
`;

const SignUpBtn = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  opacity: 0.4;
`;

const SignInBtn = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.4;
  display: none;
  @media (min-width: 640px) {
    display: block;
  }
`;

const MobileNavContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  @media (min-width: 640px) {
    display: none;
  }
`;

const MobileNavButtoon = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  color: #9fa6b2;
  background: none;
  :focus {
    outline: none;
  }
`;

export default withRouter(({ isLoggedIn }) => {
  const [click, setClick] = useState(false);
  const onClick = (e) => {
    setClick(!click);
  };
  if (isLoggedIn) {
    const { data, loading } = useQuery(ME);
    return (
      <Header>
        <Nav>
          <HeaderWrapper>
            <HeaderBox>
              <MobileNavContainer>
                <MobileNavButtoon onClick={onClick}>
                  {click ? (
                    <GoX style={{ height: '1.5rem', width: '1.5rem' }} />
                  ) : (
                    <GoThreeBars
                      style={{ height: '1.5rem', width: '1.5rem' }}
                    />
                  )}
                </MobileNavButtoon>
              </MobileNavContainer>
              <HeaderColumn1>
                <LogoContainer>
                  <Link to="/" replace>
                    <LogoMobile>DICS</LogoMobile>
                    <LogoDesktop>DICS</LogoDesktop>
                  </Link>
                </LogoContainer>
                <HeaderLinkContainer>
                  <HeaderLink to="/gallary" replace>
                    {window.location.href.includes('gallary') ? (
                      <Button style={{ opacity: 0.7 }}>Gallary</Button>
                    ) : (
                      <Button style={{ opacity: 0.4 }}>Gallary</Button>
                    )}
                  </HeaderLink>
                  <HeaderLink to="/classroom" replace>
                    {window.location.href.includes('classroom') ? (
                      <Button style={{ opacity: 0.7 }}>Class</Button>
                    ) : (
                      <Button style={{ opacity: 0.4 }}>Class</Button>
                    )}
                  </HeaderLink>
                </HeaderLinkContainer>
              </HeaderColumn1>
              <HeaderColumn2>
                <HeaderLink to="/me" replace>
                  {loading ? (
                    <Skeleton
                      circle={true}
                      width={'2.3rem'}
                      height={'2.3rem'}
                    />
                  ) : (
                    <img
                      src={data.me.avatar}
                      alt="User"
                      style={{
                        width: '2.3rem',
                        height: '2.3rem',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </HeaderLink>
              </HeaderColumn2>
            </HeaderBox>
          </HeaderWrapper>
          {click ? (
            <MobileNav style={{ display: 'block' }}>
              <MobileNavBox>
                <MobileNavLink to="/about" onClick={onClick}>
                  About
                </MobileNavLink>
                <MobileNavLink to="/gallary" onClick={onClick}>
                  Gallary
                </MobileNavLink>
                <MobileNavLink to="/classroom" onClick={onClick}>
                  Class
                </MobileNavLink>
              </MobileNavBox>
            </MobileNav>
          ) : (
            <MobileNav />
          )}
        </Nav>
      </Header>
    );
  } else {
    return (
      <Header>
        <Nav>
          <HeaderWrapper>
            <HeaderBox>
              <MobileNavContainer>
                <MobileNavButtoon onClick={onClick}>
                  {click ? (
                    <GoX style={{ height: '1.5rem', width: '1.5rem' }} />
                  ) : (
                    <GoThreeBars
                      style={{ height: '1.5rem', width: '1.5rem' }}
                    />
                  )}
                </MobileNavButtoon>
              </MobileNavContainer>
              <HeaderColumn1>
                <LogoContainer>
                  <Link to="/" replace>
                    <LogoMobile>DICS</LogoMobile>
                    <LogoDesktop>DICS</LogoDesktop>
                  </Link>
                </LogoContainer>
                <HeaderLinkContainer>
                  <HeaderLink to="/about" replace>
                    {window.location.href.includes('about') ? (
                      <Button style={{ opacity: 0.7 }}>About</Button>
                    ) : (
                      <Button style={{ opacity: 0.4 }}>About</Button>
                    )}
                  </HeaderLink>
                  <HeaderLink to="/gallary" replace>
                    {window.location.href.includes('gallary') ? (
                      <Button style={{ opacity: 0.7 }}>Gallary</Button>
                    ) : (
                      <Button style={{ opacity: 0.4 }}>Gallary</Button>
                    )}
                  </HeaderLink>
                </HeaderLinkContainer>
              </HeaderColumn1>
              <HeaderColumn2>
                <HeaderLink to="/SignIn" replace>
                  <SignInBtn>Sign In</SignInBtn>
                </HeaderLink>
              </HeaderColumn2>
            </HeaderBox>
          </HeaderWrapper>
          {click ? (
            <MobileNav style={{ display: 'block' }}>
              <MobileNavBox>
                <MobileNavLink to="/about" onClick={onClick}>
                  About
                </MobileNavLink>
                <MobileNavLink to="/gallary" onClick={onClick}>
                  Gallary
                </MobileNavLink>
                <MobileNavLink to="/SignIn" onClick={onClick}>
                  Sign In
                </MobileNavLink>
              </MobileNavBox>
            </MobileNav>
          ) : (
            <MobileNav />
          )}
        </Nav>
      </Header>
    );
  }
});
