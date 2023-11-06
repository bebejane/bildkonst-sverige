'use server'

import '@styles/index.scss'
import { Footer, NavBar } from '@components';
import { apiQuery } from '@lib/client';
import { AllPoliticCategoriesDocument, GlobalDocument } from '@graphql';
import { Metadata } from 'next';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

export type LayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {

  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument)

  return (
    <>
      <html lang="en">
        <body id="root" >
          <NavBar allPoliticCategories={allPoliticCategories} />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html >
    </>
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
