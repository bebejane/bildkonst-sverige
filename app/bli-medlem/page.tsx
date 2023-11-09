'use server'

import Article from '@components/layout/Article';
import s from './page.module.scss'
import { MemberPageDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import MemberForm from './MemberForm';

export default async function Membership() {

  const { memberIntro, allMemberLevels, draftUrl } = await apiQuery<MemberPageQuery, MemberPageQueryVariables>(MemberPageDocument)

  return (
    <>
      <Article className={s.container} id="membership" title="Bli medlem" intro={memberIntro.intro} content={memberIntro.content}>
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
      {< DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={memberIntro.id} />}
    </>
  );
}