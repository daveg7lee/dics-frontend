import { Analytics } from "@vercel/analytics/react";
import { ApolloProvider } from "@apollo/client";
import "react-toastify/dist/ReactToastify.min.css";
import "react-quill/dist/quill.bubble.css";
import { ToastContainer, toast } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "../apollo";
import Header from "../components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
          <Analytics />
          <ToastContainer
            position={toast.POSITION.TOP_RIGHT}
            hideProgressBar={true}
          />
        </ChakraProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default MyApp;
