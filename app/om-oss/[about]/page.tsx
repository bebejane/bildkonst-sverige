'use server'

import { AllAboutsDocument, AboutDocument } from "@graphql";
import { apiQuery, DraftMode } from "next-dato-utils";
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Article from '@components/Article';
import { Metadata } from "next";

export default async function Page({ params }: { params: { about: string } }) {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
    variables: { slug: params.about },
    includeDrafts: draftMode().isEnabled
  })

  if (!about) return notFound()

  const { id, title, intro, content } = about

  return (
    <>
      <Article id={id} title={title} intro={intro} content={content} />
      <DraftMode url={draftUrl} tag={id} />
    </>
  );
}

export async function generateStaticParams() {
  const { allAbouts } = await apiQuery<AllAboutsQuery, AllAboutsQueryVariables>(AllAboutsDocument, { tags: ['about'] });
  return allAbouts.map(({ slug: about }) => ({ about }))
}

export async function generateMetadata({ params }) {
  const { about } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, { variables: { slug: params.about } })

  return {
    title: about.title,
  } as Metadata
}
