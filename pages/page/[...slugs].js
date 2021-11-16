import API from "utils/api";
import { useRouter } from "next/router";
import Error from "next/error";
import Page from "components/layout/Page";
import Loading from "../../components/Loading";
import { wrapper } from "../../store";

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

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const path = `/page/${ctx.params.slugs.join("/")}`;
  const page = await API.getPage(encodeURI(path));

  return {
    props: {
      page,
    },
  };
});

export default PagePage;
