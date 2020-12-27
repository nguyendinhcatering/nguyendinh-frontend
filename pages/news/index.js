import API from "utils/api";
import { Box, IconButton } from "theme-ui";
import { useRouter } from "next/router";
import Page from "components/layout/Page";
import Loading from "../../components/Loading";
import Section from "../../components/layout/Sections/Section";
import Card from "../../components/ui/Card";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Pagination = ({ pagination }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        mb: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <IconButton
        variant="elevated"
        size={12}
        onClick={() =>
          router.push(
            `${router.pathname}?page=${
              pagination.currentPage - 1 < 1 ? 1 : pagination.currentPage - 1
            }`
          )
        }
        disabled={pagination.currentPage <= 1}
      >
        <MdChevronLeft />
      </IconButton>
      <IconButton
        variant="elevated"
        size={12}
        disabled={pagination.currentPage === 1}
        onClick={() => router.push(`${router.pathname}?page=1`)}
      >
        <span>1</span>
      </IconButton>
      {pagination.currentPage - 1 >= 3 && <Box>...</Box>}
      {pagination.currentPage > 2 && (
        <IconButton
          variant="elevated"
          size={12}
          onClick={() =>
            router.push(`${router.pathname}?page=${pagination.currentPage - 1}`)
          }
        >
          <span>{pagination.currentPage - 1}</span>
        </IconButton>
      )}
      {pagination.currentPage !== 1 &&
        pagination.currentPage !== pagination.totalPages && (
          <IconButton
            variant="elevated"
            size={12}
            disabled
            onClick={() =>
              router.push(`${router.pathname}?page=${pagination.currentPage}`)
            }
          >
            <span>{pagination.currentPage}</span>
          </IconButton>
        )}
      {pagination.currentPage < pagination.totalPages - 1 &&
        pagination.currentPage !== pagination.totalPages && (
          <IconButton
            variant="elevated"
            size={12}
            onClick={() =>
              router.push(
                `${router.pathname}?page=${pagination.currentPage + 1}`
              )
            }
          >
            <span>{pagination.currentPage + 1}</span>
          </IconButton>
        )}
      {pagination.totalPages - pagination.currentPage >= 3 && <Box>...</Box>}
      {pagination.totalPages > 1 && (
        <IconButton
          variant="elevated"
          size={12}
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() =>
            router.push(`${router.pathname}?page=${pagination.totalPages}`)
          }
        >
          <span>{pagination.totalPages}</span>
        </IconButton>
      )}
      <IconButton
        variant="elevated"
        size={12}
        onClick={() =>
          router.push(
            `${router.pathname}?page=${
              pagination.currentPage + 1 > pagination.totalPages
                ? pagination.totalPages
                : pagination.currentPage + 1
            }`
          )
        }
        disabled={pagination.currentPage >= pagination.totalPages - 1}
      >
        <MdChevronRight />
      </IconButton>
    </Box>
  );
};

const NewsPage = ({ page, newsItems, pagination }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Page
      page={page}
      preSection={
        <Box>
          {newsItems.map((newsItem) => (
            <Card id={newsItem.id} sx={{ mb: 5 }}>
              <Section section={newsItem.head} />
            </Card>
          ))}
          <Box sx={{ mb: 5 }} />
        </Box>
      }
      postSection={<Pagination pagination={pagination} />}
    />
  );
};

export async function getServerSideProps(ctx) {
  const path = `/news`;
  const totalItems = await API.getNewsItemsCount();
  const pagination = {
    currentPage: Number(ctx?.query?.page) || 1,
    totalPages: Math.ceil(totalItems / 5),
  };

  if (pagination.currentPage > pagination.totalPages) {
    return {
      props: {},
      redirect: { destination: `/news?page=${pagination.totalPages}` },
    };
  }

  const page = await API.getPage(encodeURI(path));

  const newsItems = await API.getNewsItems(5, (ctx?.query?.page || 1) - 1);

  return {
    props: {
      page,
      newsItems,
      pagination,
    },
  };
}

export default NewsPage;
