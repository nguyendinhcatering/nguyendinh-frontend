import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { FacebookProvider, MessageUs, CustomChat } from "react-facebook";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="vi">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          {/*    <script*/}
          {/*      async*/}
          {/*      defer*/}
          {/*      crossOrigin="anonymous"*/}
          {/*      src="https://connect.facebook.net/en_US/sdk.js"*/}
          {/*    />*/}
          {/*    <script*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*        __html: `*/}
          {/*            setTimeout(() => {*/}
          {/*                ZaloSocialSDK.reload()*/}
          {/*            }, 5000);*/}
          {/*        `,*/}
          {/*      }}*/}
          {/*    />*/}
          {/*    <script src="https://sp.zalo.me/plugins/sdk.js" async defer />*/}
          {/*    <script*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*        __html: `*/}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
