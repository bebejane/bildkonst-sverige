'use server'

import s from './page.module.scss'
import { AllPoliticDocument, PoliticDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { allPolitics } = await apiQuery<AllPoliticQuery, AllPoliticQueryVariables>(AllPoliticDocument, { generateTags: true });
  return allPolitics.map(({ slug, category }) => ({ slug }))
}


export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const { politic } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, { variables: { slug } })

  if (!politic) return notFound()

  return (
    <section className={s.container}>
      {politic.title}
    </section>
  );
}