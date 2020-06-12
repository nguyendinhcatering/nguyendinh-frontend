import React from "react";
import { Box, Embed } from "theme-ui";
import Modal from "./Modal";
import Carousel from "./Carousel";
import { Slide } from "pure-react-carousel";
import Hero from "../layout/HeroBanner/Hero";
import Image from "./Image";

const Lightbox = ({ images, isOpen, setOpen }) => {
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Box className="absolute inset-0 sm:inset-3 md:inset-5">
        <Box className="h-full">
          <Carousel
            totalSlides={images.length}
            // aspectRatio={[8, 16]}
            isIntrinsicHeight={true}
            dragEnabled={true}
            touchEnabled={true}
            buttonProps={{
              sx: {
                color: "white",
                visibility: ["hidden", "hidden", "visible"],
              },
            }}
          >
            {images.map((medium) => (
              <Slide key={medium.id}>
                <Box className="h-full">
                  {medium.embeddedMedia && (
                    <Embed
                      src={medium.embeddedMedia}
                      sx={{ height: "100%", paddingBottom: "unset" }}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    />
                  )}
                  {medium.image && (
                    <Box className="w-full h-full">
                      <Image
                        image={medium.image}
                        className="important:mx-auto"
                        sx={{
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Modal>
  );
};

export default Lightbox;
