'use server'

import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';

export default async function About() {

  const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, { includeDrafts: draftMode().isEnabled })

  return (
    <>
      <section className={s.container}>
        About page
      </section>
      <DraftMode draftMode={draftMode().isEnabled} draftUrl={draftUrl} tag={about.id} />
    </>
  );
}