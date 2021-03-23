import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import ReactDOM from "react-dom";
import Client from "./Apollo/Client";
import App from "./Components/App";
import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
