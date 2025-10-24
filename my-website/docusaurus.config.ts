import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Beisi Docs',
  tagline: 'Organize Knowledge, Empower Teams.',
  favicon: 'img/favicon(1).ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://beisi-tech.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'beisi-tech', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs/tutorial',
          sidebarPath: './sidebarsTutorial.ts',
          routeBasePath: 'tutorial',
          editUrl:
            'https://github.com/beisi-tech/docs/tree/main/my-website/docs/tutorial/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/beisi-tech/docs/tree/main/my-website/docs/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id:'rule',
        path: 'docs/rule',
        routeBasePath: 'rule',
        sidebarPath:'./sidebarsRule.ts',
        editUrl:
          'https://github.com/beisi-tech/docs/tree/main/my-website/docs/rule/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id:'project',
        path: 'docs/project',
        routeBasePath: 'project',
        sidebarPath:'./sidebarsProject.ts',
        editUrl:
          'https://github.com/beisi-tech/docs/tree/main/my-website/docs/project/',
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Beisi Docs',
      logo: {
        alt: 'My Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          docsPluginId: 'default',
          position: 'left',
          label: 'Tutorial',
        },
        {
          type: 'docSidebar',
          sidebarId: 'ruleSidebar',
          docsPluginId: 'rule',
          position: 'left',
          label: 'Rule',
        },
        {
          type: 'docSidebar',
          sidebarId: 'projectSidebar',
          docsPluginId: 'project',
          position: 'left',
          label: 'Project',
        },
        {to: '/docs/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/beisi-tech/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial/tutorial-intro',
            },
            {
              label: 'Rule',
              to: '/docs/rule/rule-intro',
            },
            {
              label: 'Project',
              to: '/docs/project/project-intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/docs/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/beisi-tech/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fuzhou Beisi Network Technology Co., Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
