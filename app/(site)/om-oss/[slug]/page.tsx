'use server'

import { AllAboutsDocument, AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { notFound } from 'next/navigation';
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import { Article } from '@components';

export async function generateStaticParams() {
  const { allAbouts } = await apiQuery<AllAboutsQuery, AllAboutsQueryVariables>(AllAboutsDocument, { generateTags: true });
  return allAbouts.map(({ slug }) => ({ slug }))
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
    variables: { slug },
    includeDrafts: draftMode().isEnabled
  })

  if (!about) return notFound()

  const { id, title, content } = about

  return (
    <>
      <Article id={id} title={title} content={content} />
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={id} />
    </>
  );
}