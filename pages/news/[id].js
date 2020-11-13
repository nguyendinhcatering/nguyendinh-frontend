import API from "utils/api";
import slugify from "slugify";
import moment from "moment";
import { Box, Styled } from "theme-ui";
import { useRouter } from "next/router";
import DefaultLayout from "components/layout/DefaultLayout";
import Page from "components/layout/Page";
import Loading from "../../components/Loading";
import Card from "../../components/ui/Card";
import Section from "../../components/layout/Sections/Section";
import Error from "next/error";

const NewsItem = ({ newsItem, newsItems, layout }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!newsItem) {
    return (
      <DefaultLayout layout={layout}>
        <Error statusCode={404} />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout layout={layout}>
      <Page
        page={newsItem}
        preSection={
          <Card id={newsItem.id} sx={{ mb: 5 }}>
            <Section section={{ ...newsItem.head, disableShowMore: true }} />
          </Card>
        }
        postSection={
          <Card sx={{ mb: 5, px: [4, 4, 5], py: 4 }}>
            <Box as={Styled.h3} sx={{ mb: 2 }}>
              Các tin khác
            </Box>
            <Styled.ul>
              {newsItems
                .filter((nI) => nI.id !== newsItem.id)
                .map((nI) => (
                  <Box
                    as={Styled.li}
                    sx={{
                      "&:hover": {
                        color: "red.5",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() =>
                      router.push(
                        `/news/${nI.id}-${slugify(nI.name, { lower: true })}`
                      )
                    }
                  >
                    <Box as="span">{nI.name}</Box>
                    <Box as="span" sx={{ color: "gray.5" }}>
                      {" "}
                      ({moment(nI.updated_at).format("DD/MM/YYYY")})
                    </Box>
                  </Box>
                ))}
            </Styled.ul>
          </Card>
        }
      />
    </DefaultLayout>
  );
};

export async function getStaticPaths() {
  const newsItems = await API.getNewsItems();

  const paths = newsItems.map((newsItem) => ({
    params: {
      id: `${newsItem.id}-${slugify(newsItem.name, { lower: true })}`,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const layout = await API.getLayoutData();

  const id = ctx.params.id.split("-")[0];

  const newsItem = await API.getNewsItem(id);
  const newsItems = await API.getNewsItems();

  return {
    props: {
      newsItem,
      newsItems,
      layout,
    },
    revalidate: 1,
  };
}

export default NewsItem;
