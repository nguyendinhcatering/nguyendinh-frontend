import React from "react";
import axios from "axios";
import Wysiwyg from "../components/renderer/wysiwyg";

const MyComponent = ({ data }) => {
  return (
    <div>
      <Wysiwyg data={data.test_rich_text} />
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await axios.get("http://localhost:1337/playground");

  return {
    props: {
      data: response.data,
    },
  };
};

export default MyComponent;
