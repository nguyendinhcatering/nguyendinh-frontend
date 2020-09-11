import React, { useState } from "react";
import { Box, Button, Input, Textarea } from "theme-ui";
import classnames from "classnames";

const ContactUsForm = ({ onDone }) => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clear = () => {
    setName("");
    setAddress("");
    setEmail("");
    setMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await API.sendContactEmail({
        email,
        name,
        address,
        message,
      });

      clear();

      if (onDone) {
        onDone();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={onSubmit} className="important:mt-3">
      <Box className="required important:mb-3">
        <Input
          placeholder="Họ và tên"
          required="required"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box className="required important:mb-3">
        <Input
          placeholder="Địa chỉ"
          required="required"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>
      <Box className="required important:mb-3">
        <Input
          type="email"
          placeholder="Email"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box className="important:mb-3">
        <Textarea
          placeholder="Thông điệp"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Box>
      <Button
        className={classnames(
          "important:min-w-32",
          isLoading ? "opacity-75" : ""
        )}
        disabled={isLoading}
      >
        Gửi
      </Button>
    </Box>
  );
};

export default ContactUsForm;
