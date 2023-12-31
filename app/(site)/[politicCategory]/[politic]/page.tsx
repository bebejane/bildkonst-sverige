'use server'

import { AllPoliticDocument, PoliticDocument } from "@graphql";
import { apiQuery, DraftMode } from "next-dato-utils";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Article from '@components/Article';
import { Metadata } from "next";

export default async function Page({ params }: { params: { politic: string } }) {

  const { politic, draftUrl } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, {
    variables: { slug: params.politic }
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
      <DraftMode url={draftUrl} tag={id} />
    </>
  );
}

export async function generateStaticParams() {
  const { allPolitics } = await apiQuery<AllPoliticQuery, AllPoliticQueryVariables>(AllPoliticDocument, {
    all: true,
    tags: ['politic']
  });
  return allPolitics.map(({ slug: politic }) => ({ politic }))
}

export async function generateMetadata({ params }) {
  const { politic } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, {
    variables: { slug: params.politic }
  })

  if (!politic) return notFound()

  return {
    title: politic.title,
  } as Metadata
}
