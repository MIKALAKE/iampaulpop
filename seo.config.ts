/**
 * Single source of truth for the static SEO tags.
 *
 * Social crawlers (Facebook, LinkedIn, WhatsApp, Twitter) don't execute JS, so
 * react-helmet-async never reaches them — these tags have to exist in the HTML
 * that ships. The Vite plugin in vite.config.ts renders this block once per
 * language, into dist/index.html (ro) and dist/en/index.html (en).
 */

export const SITE_URL = 'https://iampaulpop.ro';

export const IMAGE = `${SITE_URL}/web-app-manifest-512x512.png`;

export type Language = 'ro' | 'en';

export const LANGUAGES: Record<
  Language,
  {
    locale: string;
    path: string;
    title: string;
    description: string;
    keywords: string;
    imageAlt: string;
    jobTitle: string;
  }
> = {
  ro: {
    locale: 'ro_RO',
    path: '/',
    title: 'Paul Pop — Dezvoltator Front-end | React & TypeScript',
    description:
      'Paul Pop — dezvoltator front-end din Cluj-Napoca, specializat în React, TypeScript și interfețe moderne. Descoperă proiectele, experiența, abilitățile și CV-ul meu.',
    keywords:
      'Paul Pop, dezvoltator front-end, dezvoltator web, React, TypeScript, JavaScript, portofoliu, programator Cluj, front-end Cluj-Napoca, web developer România, CV',
    imageAlt: 'Paul Pop — Dezvoltator Front-end, iampaulpop.ro',
    jobTitle: 'Dezvoltator Front-end',
  },
  en: {
    locale: 'en_US',
    path: '/en/',
    title: 'Paul Pop — Front-end Developer | React & TypeScript',
    description:
      'Paul Pop — front-end developer based in Cluj-Napoca, specialised in React, TypeScript and modern interfaces. Explore my projects, experience, skills and CV.',
    keywords:
      'Paul Pop, front-end developer, web developer, React developer, TypeScript, JavaScript, portfolio, software developer Cluj, front-end Romania, CV',
    imageAlt: 'Paul Pop — Front-end Developer, iampaulpop.ro',
    jobTitle: 'Front-end Developer',
  },
};

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Every language-dependent tag, rendered for one locale. */
export const renderSeo = (lang: Language) => {
  const { locale, path, title, description, keywords, imageAlt, jobTitle } = LANGUAGES[lang];

  const url = `${SITE_URL}${path}`;
  const alternate = LANGUAGES[lang === 'ro' ? 'en' : 'ro'];

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paul Pop',
    url: SITE_URL,
    image: IMAGE,
    jobTitle,
    description,
    knowsAbout: ['React', 'TypeScript', 'JavaScript', 'Front-end Development'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cluj-Napoca',
      addressCountry: 'RO',
    },
  };

  return `<!-- Primary SEO -->
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <meta name="keywords" content="${escape(keywords)}" />
    <meta name="author" content="Paul Pop" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#1E1E1E" />
    <link rel="canonical" href="${url}" />

    <!-- Language alternates -->
    <link rel="alternate" hreflang="ro" href="${SITE_URL}${LANGUAGES.ro.path}" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}${LANGUAGES.en.path}" />
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}${LANGUAGES.ro.path}" />

    <!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="paul.pop" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${IMAGE}" />
    <meta property="og:image:alt" content="${escape(imageAlt)}" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:locale:alternate" content="${alternate.locale}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${IMAGE}" />
    <meta name="twitter:image:alt" content="${escape(imageAlt)}" />

    <!-- Structured data -->
    <script type="application/ld+json">
${JSON.stringify(person, null, 2)
  .split('\n')
  .map(line => `      ${line}`)
  .join('\n')}
    </script>`;
};
