import Head from "next/head";

export default function Seo({ title, description, keywords }) {
  return (
    <Head>
      <title>{`${title} | DICS 학생 지원 서비스`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="og:site_name" content="DICS 학생 지원 서비스" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
    </Head>
  );
}
