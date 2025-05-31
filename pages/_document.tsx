import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <title>개발자 김준휘 포트폴리오</title>
        <meta name="google-site-verification" content="74kWzkP25nO6LUizzpzP7e40HsW4mO1FmKNzm5sBbrE" />
        {/* <meta name="description" content="My PORTFOLIO" /> */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
