import { Analytics } from "@vercel/analytics/react";
import { ApolloProvider } from "@apollo/client";
import "react-toastify/dist/ReactToastify.min.css";
import "react-quill/dist/quill.bubble.css";
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { client } from "../apollo";
import Header from "../components/Header";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <ThemeProvider attribute="class">
          <DefaultSeo
            title="DICS Students"
            description="Powerful website for DICS students!"
            openGraph={{
              type: "website",
              url: "https://dics-frontend.vercel.app",
              title: "DICS Students",
              description: "Powerful website for DICS students!",
              images: [
                {
                  url: "https://namu.wiki/jump/55EMQO%2FGIJamY7dfBJFNgAtN0X%2FWQXCMLKdHHaKAW0dXqpNn7CppEZY3EQ4aSwY3j%2BkE0XPn6%2B1b2GqsBCt3eyvwlkxpMb%2BF95H6qjz46fs%3D",
                  width: 800,
                  height: 400,
                },
              ],
            }}
          />
          <Header />
          <Component {...pageProps} />
          <Analytics />
          <ToastContainer
            position={toast.POSITION.TOP_RIGHT}
            hideProgressBar={true}
          />
        </ThemeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
