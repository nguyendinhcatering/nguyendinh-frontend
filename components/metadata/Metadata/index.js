import React, { useContext } from "react";
import Head from "next/head";
import { getImageAlt, getImageUrl } from "../../../utils/getImageSrc";
import { SiteDataContext } from "../../ui/Map/SiteDataContext";

const Metadata = ({ metadata }) => {
  if (!metadata) {
    return null;
  }

  const siteData = useContext(SiteDataContext);

  const title = metadata.title;
  const description = metadata.description;
  const contentType = metadata.contentType ?? "article";
  const url = siteData?.mainPageUrl + metadata?.menu?.url;
  const imageUrl = getImageUrl(metadata?.image);
  const imageAlt = getImageAlt(metadata?.image);

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta name="content-type" content={contentType} />
      {/*Open Graph*/}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}}
      <meta property="og:type" content={contentType} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {/*Twitter*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}}
      {imageAlt && <meta property="twitter:image:alt" content={imageAlt} />}
    </Head>
  );
};

export default Metadata;
