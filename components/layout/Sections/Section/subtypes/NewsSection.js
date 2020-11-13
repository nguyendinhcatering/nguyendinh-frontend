import React from "react";
import { Box, Styled } from "theme-ui";
import cn from "classnames";
import moment from "moment";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Multimedia from "../../../../ui/Multimedia";
import Wysiwyg from "../../../../renderer/wysiwyg";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";
import SectionAddon from "../../SectionAddons";
import LinkButton from "../../../../ui/LinkButton";
import { useRouter } from "next/router";
import slugify from "slugify";

const NewsSection = ({ section }) => {
  const router = useRouter();
  const hasMultipleImage = section?.media?.length > 1;

  const slug = `${section.newsId}-${slugify(section.newsTitle, {
    lower: true,
  })}`;

  return (
    <Box className={cn("flex flex-col")}>
      <Box>
        {section?.media[0] && (
          <Box
            sx={{ display: hasMultipleImage && ["none", "none", "initial"] }}
          >
            <Multimedia
              medium={section?.media[0]}
              sx={{ objectFit: "contain", height: "auto" }}
            />
          </Box>
        )}
        {hasMultipleImage && section?.media[1] && (
          <Box sx={{ display: ["initial", "initial", "none"] }}>
            <Multimedia
              medium={section?.media[1]}
              sx={{ objectFit: "contain", height: "auto" }}
            />
          </Box>
        )}
        <div />
      </Box>
      <Box className="w-full">
        <Box className="p-4 xl:px-5 xl:py-4 flex items-center justify-center flex-col h-full">
          <Box className="w-full">
            <Box sx={{ mb: 2 }}>
              {section.disableShowMore && (
                <Styled.h2>{section.newsTitle}</Styled.h2>
              )}
              {!section.disableShowMore && (
                <Box
                  as={Styled.h2}
                  sx={{
                    "&:hover": {
                      color: "red.5",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => router.push(`/news/${slug}`)}
                >
                  {section.newsTitle}
                </Box>
              )}
              <Box as={"p"} sx={{ color: "gray.7" }}>
                Cập nhật: {moment(section.newsUpdatedAt).format("DD/MM/YYYY")}
              </Box>
            </Box>
            <Wysiwyg
              data={section.text}
              overrides={getWysiwygOverrides(section)}
            />
            {section?.addons.map((addon, index) => (
              <SectionAddon addon={addon} key={index} />
            ))}
            {!section.disableShowMore && (
              <LinkButton src={`/news/${slug}`} sx={{ mt: 2 }}>
                Xem thêm
              </LinkButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsSection;
