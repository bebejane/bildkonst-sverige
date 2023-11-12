'use server'

import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils';
import { StartDocument } from '@graphql';
import { draftMode } from 'next/headers'
import { DraftMode } from 'next-dato-utils';
import Block from '@components/blocks/Block';

export default async function Home() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, { includeDrafts: draftMode().isEnabled });

  return (
    <>
      <article className={s.container}>
        {start?.content?.map((block, idx) =>
          <section key={idx}>
            <Block key={idx} data={block} />
          </section>
        )}
      </article>
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={start?.id} />
    </>
  )
}