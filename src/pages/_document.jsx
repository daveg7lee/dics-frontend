import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="../../public/favicon.ico" />
        <meta name="description" content="DICS 벌점체크 사이트" />
        <link rel="apple-touch-icon" href="../../public/logo192.png" />
        <meta
          name="google-site-verification"
          content="iVIdX2Zr88cCNMJzRYM-wmA9vVXbKako6kSJigxu2Og"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
