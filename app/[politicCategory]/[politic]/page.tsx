'use server'

import { AllPoliticDocument, PoliticDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { notFound } from 'next/navigation';
import { DraftMode } from 'next-dato-utils';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import Article from '@components/Article';
import { Metadata } from "next";

export default async function Page({ params }: { params: { politic: string } }) {

  const { politic, draftUrl } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, {
    variables: { slug: params.politic },
    includeDrafts: draftMode().isEnabled
  })

  if (!politic) return notFound()

  const { id, title, intro, image, content, category, _publishedAt } = politic

  return (
    <>
      <Article
        id={id}
        title={title}
        intro={intro}
        image={image as FileField}
        content={content}
        publishedAt={_publishedAt}
      >
        <Link href={`/${category.slug}`}>
          <button>Visa alla {category.title}</button>
        </Link>
      </Article>
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={id} />
    </>
  );
}

export async function generateStaticParams() {
  const { allPolitics } = await apiQuery<AllPoliticQuery, AllPoliticQueryVariables>(AllPoliticDocument, { generateTags: true });
  return allPolitics.map(({ slug: politic }) => ({ politic }))
}

export async function generateMetadata({ params }) {
  const { politic } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, {
    variables: { slug: params.politic }
  })

  return {
    title: politic.title,
  } as Metadata
}
