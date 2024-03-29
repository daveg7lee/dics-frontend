import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1E293B" />
        <meta
          name="naver-site-verification"
          content="a0a1e12488e89a367e582a5ad80b778e8b18ccd9"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="images/icons/icon-192x192.png"
        ></link>
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
