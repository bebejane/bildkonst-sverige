'use server'

import s from './page.module.scss'

import { AllPoliticByCategoryDocument, AllPoliticCategoriesDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument);
  return allPoliticCategories.map(({ slug: category }) => ({ category }))
}

export default async function Page({ params }: { params: { category: string } }) {

  const { politicCategory, draftUrl } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(AllPoliticByCategoryDocument, {
    variables: { slug: params.category },
    includeDrafts: draftMode().isEnabled
  })

  if (!politicCategory) return notFound()

  return (
    <>
      {politicCategory?._allReferencingPolitics.length > 0 ?
        <ul>
          {politicCategory?._allReferencingPolitics.map(({ title, slug, category }, idx) =>
            <li key={idx}>
              <Link href={`/${category.slug}/${slug}`}>{title}</Link>
            </li>
          )}
        </ul>
        :
        <p>
          Det finnsinga poster i den här kategorin
        </p>
      }
      <DraftMode draftMode={draftMode().isEnabled} draftUrl={draftUrl} tag={politicCategory.id} />
    </>
  );
}