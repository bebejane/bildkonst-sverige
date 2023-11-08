'use server'

import { StructuredContent } from '@components';
import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function About() {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, { includeDrafts: draftMode().isEnabled })

  if (!about) return notFound()

  return (
    <article>
      <h1>{about.headline}</h1>
      <StructuredContent content={about.content} id={about.id} />
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={about.id} />
    </article>
  );
}