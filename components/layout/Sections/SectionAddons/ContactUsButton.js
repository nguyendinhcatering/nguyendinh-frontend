import React, { useState } from "react";
import { Box, Button } from "theme-ui";
import Modal from "../../../ui/Modal";
import Card from "../../../ui/Card";
import ContactUsForm from "./ContactUsForm";

const ContactUsButton = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleDone = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="button" onClick={handleClick}>
        {data && data.title ? data.title : "Liên hệ nhận tư vấn"}
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
