import { Helmet } from "react-helmet-async";

const SITE_NAME = "The Classical Way";
const SITE_URL = "https://theclassicalway.com.br";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

type SEOHeadProps = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "article" | "website";
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = "article",
}: SEOHeadProps) => {
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
