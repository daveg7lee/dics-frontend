import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Styles/index.css';
import { ApolloProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';
import { client } from './Client';
import App from './Components/App';
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
