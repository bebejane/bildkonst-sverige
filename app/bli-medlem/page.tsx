'use server'

import Article from '@components/Article';
import s from './page.module.scss'
import { MemberPageDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import MemberForm from './MemberForm';

export default async function Membership() {

  const { memberPage, allMemberLevels, draftUrl } = await apiQuery<MemberPageQuery, MemberPageQueryVariables>(MemberPageDocument)
  const { id, title, intro, content } = memberPage

  return (
    <>
      <Article id={id} className={s.container} title={title} intro={intro} content={content}>
        <div className="structured grid">
          <ul className={s.levels}>
            {allMemberLevels.map(({ id, level, turnoverMax, turnoverMin }) =>
              <li key={id}>
                Medlemsnivå {level} —
                Årsomsättning: {!turnoverMax && turnoverMin ? `< ${turnoverMin}` : turnoverMax && turnoverMin ? `> ${turnoverMin} < ${turnoverMax}` : `> ${turnoverMax}`}
              </li>
            )}
          </ul>
          <h3>Ansökningsformulär</h3>
          <MemberForm allMemberLevels={allMemberLevels} />
        </div>
      </Article>
      {<DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={memberPage.id} />}
    </>
  );
}