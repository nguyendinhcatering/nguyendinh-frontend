import React from "react";
import Head from "next/head";
import { getImageUrl } from "../../../utils/getImageSrc";

const Metadata = ({ metadata }) => {
  if (!metadata) {
    return null;
  }

  const title = metadata.title;
  const description = metadata.description;
  const contentType = metadata.contentType ?? "article";
  const url = metadata?.menu.url;
  const imageUrl = getImageUrl(metadata?.image);

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="favicon.ico" />
      <meta name="description" content={description} />
      <meta name="content-type" content={contentType} />
      {/*Open Graph*/}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}}
      {/*Twitter*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}}
    </Head>
  );
};

export default Metadata;
