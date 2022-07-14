import { ApolloProvider, useReactiveVar } from "@apollo/client";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { client, isLoggedInVar } from "../apollo";
import Header from "../components/Header";

const MyApp = ({ Component, pageProps }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
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
