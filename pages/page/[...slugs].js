import API from "utils/api";
import { useRouter } from "next/router";
import DefaultLayout from "components/layout/DefaultLayout";
import Error from "next/error";
import Page from "components/layout/Page";
import Loading from "../../components/Loading";

const PagePage = ({ page, layout }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!page) {
    return (
      <DefaultLayout layout={layout}>
        <Error statusCode={404} />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout layout={layout}>
      <Page page={page} />
    </DefaultLayout>
  );
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

  const layout = await API.getLayoutData();

  return {
    props: {
      page,
      layout,
    },
    revalidate: 1,
  };
}

export default PagePage;
