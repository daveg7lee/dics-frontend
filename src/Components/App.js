/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Header from './Header';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { client, isLoggedInVar } from '../apollo';

export default () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <Router>
          <>
            {isLoggedIn && <Header />}
            <div className="w-full px-8">
              <Routes isLoggedIn={isLoggedIn} />
            </div>
          </>
        </Router>
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          hideProgressBar={true}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
};
