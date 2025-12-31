import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({children}: {children: React.ReactNode}) {
  const {siteConfig} = useDocusaurusContext();
  const siteBaseUrl = `${siteConfig.url}${siteConfig.baseUrl}`.replace(/\/+$/, '');

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Beisi Docs',
    alternateName: 'Beisi 技术文档与博客',
    url: siteBaseUrl,
    description: '面向中国开发者的教程、开发规范、项目介绍与博客汇总。',
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteBaseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Beisi Docs',
    legalName: 'Fuzhou Beisi Network Technology Co., Ltd.',
    url: siteBaseUrl,
    logo: `${siteBaseUrl}/img/logo.svg`,
    description: '提供教程、开发规范、项目案例与博客的技术知识库。',
    sameAs: ['https://github.com/beisi-tech/docs'],
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(webSiteJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
      </Head>
      {children}
    </>
  );
}
