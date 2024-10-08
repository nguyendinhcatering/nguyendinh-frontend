import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import Script from "next/script";

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
          <Script
            src="https://js.hs-scripts.com/21974823.js"
            id="hs-script-loader"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
