import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "TOKEN";

const isLoggedIn =
  typeof window !== "undefined" && Boolean(localStorage.getItem(TOKEN));

export const isLoggedInVar = makeVar(isLoggedIn);

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  location.replace("/");
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://dics-backend.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadHttpLink),
  cache: new InMemoryCache(),
});
