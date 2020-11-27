import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="vi">
        <Head>
          <script src="https://sp.zalo.me/plugins/sdk.js" async defer />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  setTimeout(() => {
                      ZaloSocialSDK.reload()
                  }, 5000);
              `,
            }}
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

export default MyDocument;
