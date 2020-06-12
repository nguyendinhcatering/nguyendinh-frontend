import { ThemeProvider } from "theme-ui";
import theme from "styles/theme";
import "styles/index.css";
import "styles/tailwind.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "animate.css";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   const menu = await API.getMenu();
//
//   return { ...appProps, menu };
// };

export default wrapper.withRedux(MyApp);
