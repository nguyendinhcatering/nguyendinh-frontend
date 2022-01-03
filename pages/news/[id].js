import API from "utils/api";
import slugify from "slugify";
import moment from "moment";
import { Box, Styled } from "theme-ui";
import { useRouter } from "next/router";
import Page from "components/layout/Page";
import Loading from "../../components/Loading";
import Card from "../../components/ui/Card";
import Section from "../../components/layout/Sections/Section";
import Error from "next/error";
import { toString } from "lodash";
import { wrapper } from "../../store";

const NewsItem = ({ newsItem, newsItems }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!newsItem) {
    return <Error statusCode={404} />;
  }

  return (
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
                      `/news/${nI.id}-${slugify(toString(nI.name), {
                        lower: true,
                      })}`
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
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const id = ctx.params.id.split("-")[0];

  const newsItem = await API.getNewsItem(id);
  const newsItems = await API.getNewsItems();

  return {
    props: {
      newsItem,
      newsItems,
    },
  };
});

export default NewsItem;
