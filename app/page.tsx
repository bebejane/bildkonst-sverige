'use server'

import s from './page.module.scss'
import { apiQuery } from '@lib/client';
import { StartDocument } from '@graphql';
import { draftMode } from 'next/headers'
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import Block from '@components/blocks';

export default async function Home() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, { includeDrafts: draftMode().isEnabled });
  console.log(start)
  return (
    <>
      <div className={s.content}>
        {start?.content?.map((block, idx) =>
          <Block key={idx} data={block} />
        )}
      </div>
      <DraftMode draftMode={draftMode().isEnabled} draftUrl={draftUrl} tag={start?.id} />
    </>
  )
}