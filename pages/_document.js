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
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W5TTSM5');`}}></script>
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5TTSM5" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
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
