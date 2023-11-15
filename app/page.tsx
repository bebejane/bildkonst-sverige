'use server'

import s from './page.module.scss'
import { apiQuery, DraftMode } from 'next-dato-utils';
import { StartDocument } from '@graphql';
import Block from '@components/blocks/Block';

export default async function Home() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument);

  return (
    <>
      <article className={s.container}>
        {start?.content?.map((block, idx) =>
          <section key={idx}>
            <Block key={idx} data={block} />
          </section>
        )}
      </article>
      <DraftMode url={draftUrl} tag={start?.id} />
    </>
  )
}