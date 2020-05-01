import Head from 'next/head';

const title = 'Stimulus Check Calculator';
const url = 'https://stimulus-check-calculator.now.sh/';
const description =
  'Use this calculator to determine the estimated amount of your stimulus check under the CARES Act.';

const Meta = () => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="description" content="" />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content={title} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    <meta property="og:image" content={`${url}calculator-screenshot.png`} />
    <meta name="twitter:image" content={`${url}calculator-screenshot.png`} />
    <link rel="canonical" href={url} />
    <script type="text/javascript" src="" />
  </Head>
);
export default Meta;
