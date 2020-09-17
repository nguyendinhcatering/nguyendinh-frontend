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

const Page = ({ page, preSections, postSections, header, children }) => {
  const { metadata, banners, sections } = page || {
    metadata: {},
    banners: [],
    sections: [],
  };
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [mainContentMargin, setMainContentMargin] = useState(0);
  const [heroSection, setHeroSections] = useState([]);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const { heroes } = splitBanners(banners);

    setHeroes(heroes);

    const currentHero = heroes[currentHeroIndex];

    if (!currentHero) {
      setMainContentMargin(5);
    } else {
      if (currentHero?.layout === "card") {
        setHeroSections([
          {
            id: `hero-${currentHero.id}`,
            type: "SECTION",
            mediaPlacement: "none",
            text: currentHero.text,
            headerColor: currentHero.headerColor,
            textColor: currentHero.textColor,
          },
        ]);
        setMainContentMargin(0);
      } else if (currentHero?.layout === "center") {
        setMainContentMargin([0, 0, 0, -5]);
        setHeroSections([]);
      } else if (currentHero?.layout === "video") {
        setMainContentMargin(0);
        setHeroSections([]);
      }
    }
  }, [banners, currentHeroIndex]);

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
          <Box sx={{ height: 16, backgroundColor: "red.5" }} />
        )}
        {header}
        <Box
          className="flex items-center flex-col justify-center w-full relative transition-all duration-200"
          sx={{ marginTop: mainContentMargin }}
        >
          <Box className="container">
            <Sections
              sections={heroSection}
              sx={{
                display: ["block", "block", "none", "none"],
                marginTop: [-5, -5, 0, 0],
              }}
            />
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
