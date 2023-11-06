'use server'

import s from './page.module.scss'
import { AllPoliticCategoriesDocument, PoliticDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument, { generateTags: true });
  return allPoliticCategories.map(({ slug: category }) => ({ category }))
}


export default async function Page({ params }: { params: { category: string } }) {
  const { politicCategory: { allPolitic } } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(PoliticDocument, { variables: { slug: params.category } })

  return (
    <section className={s.container}>
      <ul>
        {allPolitic.map(({ title, slug, category }, idx) =>
          <li key={idx}>
            <Link href={`/${category.slug}/${slug}`}>{title}</Link>
          </li>
        )}
      </ul>
    </section>
  );
}