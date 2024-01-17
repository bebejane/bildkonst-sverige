'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { apiQuery, DraftMode } from 'next-dato-utils';
import { StartDocument } from '@graphql';
import Block from '@components/blocks/Block';

export default async function Home() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument);

  return (
    <>
      <article className={cn(s.container, 'grid')}>
        <div>
          <h3>Aktuellt</h3>
          {start?.content?.map((block, idx) =>
            <section key={idx}>
              <Block key={idx} data={block} />
            </section>
          )}
        </div>
        <aside>
          {start?.smallColumn?.map((block, idx) =>
            <section key={idx}>
              <Block key={idx} data={block} />
            </section>
          )}
        </aside>
      </article>
      <DraftMode url={draftUrl} tag={start?.id} />
    </>
  )
}