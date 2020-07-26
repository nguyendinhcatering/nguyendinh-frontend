import React, { useState, useEffect } from "react";
import { Box } from "theme-ui";
import Metadata from "../../metadata/Metadata";
import HeroBanner from "../HeroBanner";
import Sections from "../Sections";
import NDCarouselContextProvider from "../../ui/Carousel/NDCarouselContext";

const splitBanners = (banners) => {
  return {
    heroes: banners.filter((banner) => banner.location === "hero"),
  };
};

const Page = ({
  page: { metadata, banners, sections },
  preSections,
  postSections,
  children,
}) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [mainContentMargin, setMainContentMargin] = useState(0);
  const { heroes } = splitBanners(banners);

  useEffect(() => {
    const currentHero = heroes[currentHeroIndex];

    if (!currentHero) {
      setMainContentMargin(5);
    } else {
      if (currentHero?.layout === "card") {
        setMainContentMargin(0);
      } else if (currentHero?.layout === "center") {
        setMainContentMargin([0, 0, 0, -5]);
      } else if (currentHero?.layout === "video") {
        setMainContentMargin(0);
      }
    }
  }, [currentHeroIndex]);

  return (
    <Box className="relative">
      <Metadata metadata={metadata} />
      <NDCarouselContextProvider
        currentIndex={currentHeroIndex}
        setCurrentIndex={setCurrentHeroIndex}
        name="hero"
      >
        {heroes && heroes.length > 0 ? (
          <HeroBanner banners={heroes} carouselName="hero" />
        ) : (
          <Box sx={{ marginTop: 6, height: 0 }} />
        )}
        <Box
          className="flex items-center flex-col justify-center w-full relative transition-all duration-200"
          sx={{ marginTop: mainContentMargin }}
        >
          <Box className="container">
            {preSections && <Sections sections={preSections} />}
            <Sections sections={sections} />
            {postSections && <Sections sections={postSections} />}
            {children}
          </Box>
        </Box>
      </NDCarouselContextProvider>
    </Box>
  );
};

export default Page;
