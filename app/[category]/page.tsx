'use server'

import s from './page.module.scss'
import { AllPoliticByCategoryDocument, AllPoliticCategoriesDocument, PoliticDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument, { generateTags: true });
  return allPoliticCategories.map(({ slug: category }) => ({ category }))
}

export default async function Page({ params }: { params: { category: string } }) {

  const { politicCategory } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(AllPoliticByCategoryDocument, { variables: { slug: params.category } })

  if (!politicCategory) return notFound()

  return (
    <section className={s.container}>
      <ul>
        {politicCategory?._allReferencingPolitics.map(({ title, slug, category }, idx) =>
          <li key={idx}>
            <Link href={`/${category.slug}/${slug}`}>{title}</Link>
          </li>
        )}
      </ul>
    </section>
  );
}