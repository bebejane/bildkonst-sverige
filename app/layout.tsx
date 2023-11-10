'use server'

import '@styles/index.scss'
import s from './layout.module.scss';
import NavBar from '@components/nav/NavBar';
import Footer from '@components/nav/Footer';
import { apiQuery } from '@lib/client';
import { GlobalDocument } from '@graphql';
import { Metadata } from 'next';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { buildMenu } from '@lib/menu';

export type LayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {

  const menu = await buildMenu();

  return (
    <html lang="sv">
      <body id="root">
        <NavBar menu={menu} />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export async function generateMetadata() {
  const { site: { globalSeo, favicon }, site } = await apiQuery<GlobalQuery, GlobalQueryVariables>(GlobalDocument, { generateTags: false });

  return {
    title: globalSeo?.siteName,
    description: globalSeo?.fallbackSeo?.description,
    image: globalSeo?.fallbackSeo?.image?.url,
    icons: favicon.map(({ attributes: { rel, sizes, type, href: url } }) => ({ rel, url, sizes, type })) as Icon[],
  } as Metadata
}
