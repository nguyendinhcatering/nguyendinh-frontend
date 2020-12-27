import API from "utils/api";
import { useRouter } from "next/router";
import Error from "next/error";
import Page from "components/layout/Page";
import Loading from "../../components/Loading";

const PagePage = ({ page }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!page) {
    return <Error statusCode={404} />;
  }

  return <Page page={page} />;
};

export async function getStaticPaths() {
  const menus = await API.getMenus();

  const paths = menus
    .map((menu) => menu.url)
    .filter((menu) => menu.startsWith("/page") || menu.startsWith("page"))
    .map((path) => ({
      params: {
        slugs: path
          .split("/")
          .filter(Boolean)
          .filter((subPath) => subPath !== "page"),
      },
    }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const path = `/page/${ctx.params.slugs.join("/")}`;
  const page = await API.getPage(encodeURI(path));

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}

export default PagePage;
