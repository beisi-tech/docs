import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import OriginalHead from '@theme-original/BlogPostPage/Head';

const toAbsoluteUrl = (url: string, siteUrl: string) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
};

export default function BlogPostHead(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const {metadata, assets} = useBlogPost();

  const siteBaseUrl = `${siteConfig.url}${siteConfig.baseUrl}`;
  const canonicalUrl = `${siteConfig.url}${metadata.permalink}`;
  const fallbackImage = `${siteBaseUrl}img/docusaurus-social-card.jpg`;
  const imageUrl = assets.image
    ? toAbsoluteUrl(assets.image, siteConfig.url)
    : fallbackImage;

  const authors =
    metadata.authors && metadata.authors.length > 0
      ? metadata.authors.map((author) => ({
          '@type': 'Person',
          name: author.name,
          url: author.url,
        }))
      : undefined;

  const blogPostingJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: metadata.description ?? metadata.title,
    datePublished: metadata.date,
    dateModified: metadata.lastUpdatedAt
      ? new Date(metadata.lastUpdatedAt * 1000).toISOString()
      : metadata.date,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  };

  if (authors) {
    blogPostingJsonLd.author = authors;
  }

  if (imageUrl) {
    blogPostingJsonLd.image = [imageUrl];
  }

  if (metadata.tags && metadata.tags.length > 0) {
    blogPostingJsonLd.keywords = metadata.tags.map((tag) => tag.label);
  }

  const breadcrumbListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: siteBaseUrl.replace(/\/$/, ''),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '博客',
        item: `${siteBaseUrl}blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: metadata.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <OriginalHead />
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(blogPostingJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbListJsonLd)}
        </script>
      </Head>
    </>
  );
}
