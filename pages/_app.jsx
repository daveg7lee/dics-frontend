import { Analytics } from "@vercel/analytics/react";
import { ApolloProvider } from "@apollo/client";
import "react-toastify/dist/ReactToastify.min.css";
import "react-quill/dist/quill.bubble.css";
import { ToastContainer, toast } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "../apollo";
import Header from "../components/Header";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
        <Analytics />
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          hideProgressBar={true}
        />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
