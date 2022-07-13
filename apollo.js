import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import axios from "axios";
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

export async function purgeAllUsers() {
  await axios.post(
    process.env.NODE_ENV === "production"
      ? "https://admin.stellate.co/dics-management"
      : "http://localhost:3011/",
    JSON.stringify({ query: `mutation { purgeUser }` }),
    {
      headers: {
        "Content-Type": "application/json",
        "stellate-token":
          "57ceed6f1995880253b2950d0951c7e878b6c01dd9e829af47204f8751c36b9c",
      },
    }
  );
}

export async function purgeAllScores() {
  await axios.post(
    process.env.NODE_ENV === "production"
      ? "https://admin.stellate.co/dics-management"
      : "http://localhost:3011/",
    JSON.stringify({ query: `mutation { purgeScore }` }),
    {
      headers: {
        "Content-Type": "application/json",
        "stellate-token":
          "57ceed6f1995880253b2950d0951c7e878b6c01dd9e829af47204f8751c36b9c",
      },
    }
  );
}

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://dics-management.stellate.sh"
      : "http://localhost:3010/",
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
