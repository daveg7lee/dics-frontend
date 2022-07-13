import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="DICS 벌점체크 사이트" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta
          name="google-site-verification"
          content="ljN2MsEuFIaVZgS0RCKF-iufd7Wn6vVp_ygDmB87VRI"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}