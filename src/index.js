import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';
import { client } from './Apollo/Client';
import App from './Components/App';
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
