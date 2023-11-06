'use server'

import { StructuredContent } from '@components';
import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';

export default async function About() {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, { includeDrafts: draftMode().isEnabled })

  return (
    <>
      <h1>{about.headline}</h1>
      <StructuredContent content={about.content} id={about.id} />
      <DraftMode draftMode={draftMode().isEnabled} draftUrl={draftUrl} tag={about.id} />
    </>
  );
}