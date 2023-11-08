'use server'

import s from './page.module.scss'
import { AllAboutsDocument, AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import StructuredContent from '@components/common/StructuredContent'
import { notFound } from 'next/navigation';
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import cn from 'classnames';

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
      <article>
        <h1>{title}</h1>
        <section className={cn(s.content, "grid", "structured")}>
          <StructuredContent content={content} id={id} />
        </section>
      </article>
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={id} />
    </>
  );
}