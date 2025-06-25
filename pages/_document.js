import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <iframe
        id="imgproxy-signer"
        src="http://localhost:3000/img-proxy-sign-iframe/iframe.html"
        style={{ display: "none" }}
      />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
