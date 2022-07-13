import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import Cookies from "js-cookie";

const TOKEN = "TOKEN";

const isLoggedIn = typeof window !== "undefined" && Boolean(Cookies.get(TOKEN));

export const isLoggedInVar = makeVar(isLoggedIn);

export const logUserIn = (token) => {
  Cookies.set("authorization", "true");
  Cookies.set(TOKEN, token, { expires: 7 });
  isLoggedInVar(true);
};

export const logUserOut = () => {
  Cookies.set("authorization", "false");
  Cookies.remove(TOKEN);
  window.location.reload();
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://dics-management.stellate.sh"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": Cookies.get(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadHttpLink),
  cache: new InMemoryCache(),
});
