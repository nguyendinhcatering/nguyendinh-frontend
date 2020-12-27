import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import theme from "styles/theme";
import "styles/index.css";
import "styles/tailwind.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "styles/react-datetime.css";
import "styles/nprogress.css";
import "animate.css";
import { wrapper } from "../store";
import { ConnectedRouter } from "connected-next-router";
import "moment/locale/vi";
import NProgress from "nprogress";
import { Router } from "next/router";
import ZaloChat from "../components/ui/ZaloChat";
import { FacebookProvider, CustomChat } from "react-facebook";
import App from "next/app";
import API from "../utils/api";
import DefaultLayout from "../components/layout/DefaultLayout";

function MyApp({ Component, pageProps, layout }) {
  const routeChangeStart = () => {
    NProgress.start();
  };

  const routeChangeEnd = () => {
    NProgress.done();
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd);
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });

    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);
      Router.events.off("routeChangeComplete", routeChangeEnd);
      Router.events.off("routeChangeError", routeChangeEnd);
      Router.events.off("routeChangeComplete", () => {
        window.scrollTo(0, 0);
      });
    };
  }, []);

  return (
    <ConnectedRouter>
      <FacebookProvider appId={layout.siteData.fbAppId} chatSupport>
        <ThemeProvider theme={theme}>
          <DefaultLayout layout={layout}>
            <Component {...pageProps} />
            <style jsx global>
              {`
                :root {
                  --animate-duration: 0.2s;
                }
              `}
            </style>
            <CustomChat
              pageId={layout.siteData.fbPageId}
              themeColor={layout.siteData.fbChatThemeColor}
              loggedInGreeting={layout.siteData.fbChatGreetingMessage}
              loggedOutGreeting={layout.siteData.fbChatGreetingMessage}
            />
            {/*<ZaloChat />*/}
          </DefaultLayout>
        </ThemeProvider>
      </FacebookProvider>
    </ConnectedRouter>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  const layout = await API.getLayoutData();

  return {
    ...appProps,
    layout,
  };
};

export default wrapper.withRedux(MyApp);
