import { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import theme from "styles/theme";
import "styles/index.css";
import "styles/tailwind.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "styles/react-datetime.css";
import "styles/nprogress.css";
import "animate.css";
import 'styles/app.css';
import { wrapper } from "../store";
import { ConnectedRouter } from "connected-next-router";
import "moment/locale/vi";
import NProgress from "nprogress";
import { Router } from "next/router";

function MyApp({ Component, pageProps }) {
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
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <style jsx global>
          {`
            :root {
              --animate-duration: 0.2s;
            }
          `}
        </style>
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(MyApp);
