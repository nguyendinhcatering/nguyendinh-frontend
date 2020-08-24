import React from "react";
import { Box, Embed } from "theme-ui";
import Modal from "./Modal";
import Carousel from "./Carousel";
import { Slide } from "pure-react-carousel";
import Image from "./Image";
import Multimedia from "./Multimedia";

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
            isPlaying={false}
            buttonProps={{
              sx: {
                color: "white",
                visibility: ["hidden", "hidden", "visible"],
              },
            }}
          >
            {images.map((medium) => (
              <Slide key={medium.id}>
                <Multimedia
                  medium={medium}
                  typeProps={{
                    video: {
                      sx: {
                        height: ["90%", "90%", "full"],
                        paddingBottom: "unset",
                        marginTop: ["30px", "30px", "0px"],
                        // margin: "0 auto",
                      },
                    },
                    image: {
                      sx: {
                        margin: "0 auto",
                        objectFit: "contain",
                        width: "full",
                      },
                    },
                  }}
                />
              </Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Modal>
  );
};

export default Lightbox;
