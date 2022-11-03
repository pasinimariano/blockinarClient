import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/Lato-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Lato-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
