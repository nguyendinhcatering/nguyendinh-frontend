import React, { useState } from "react";
import { Box, Button } from "theme-ui";
import Modal from "./Modal";
import Card from "./Card";
import ContactUsForm from "./ContactUsForm";

const ContactUsButton = ({
  title = "Liên hệ nhận tư vấn",
  variant = "primary",
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleDone = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="button" onClick={handleClick} variant={variant}>
        {title}
      </Button>
      <Modal isOpen={isOpen} setOpen={setOpen}>
        <Box className="absolute inset-0 sm:inset-3 md:inset-5">
          <Box className="h-full flex items-center justify-center">
            <Card className="w-1/2 p-4">
              <ContactUsForm onDone={handleDone} />
            </Card>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ContactUsButton;
