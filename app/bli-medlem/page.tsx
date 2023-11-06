'use server'

import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';

export default async function Membership() {

  //const { about } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument)

  return (
    <>
      <article className={s.container}>
        Membership page
      </article>
      {/*<DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={id} />*/}
    </>
  );
}