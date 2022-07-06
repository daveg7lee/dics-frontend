import { ApolloProvider, useReactiveVar } from "@apollo/client";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { client, isLoggedInVar } from "../apollo";
import Theme from "../styles/Theme";
import Header from "../components/Header";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <Head>
          <title>DICS 벌점체크 시스템</title>
        </Head>
        {isLoggedIn && <Header />}
        <Component {...pageProps} />
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          hideProgressBar={true}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
