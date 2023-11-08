'use server'

import { Article } from '@components';
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
      <Article id="membership" title="Bli medlem" intro={memberIntro.intro}>
        <ul className={s.levels}>
          {allMemberLevels.map(({ id, level, turnoverMax, turnoverMin }) =>
            <li key={id}>
              Medlemsnivå: {level}<br />
              Årsomsättning: {!turnoverMax && turnoverMin ? `< ${turnoverMin}` : turnoverMax && turnoverMin ? `> ${turnoverMin} < ${turnoverMax}` : `> ${turnoverMax}`}
            </li>
          )}
        </ul>
        <h3>Ansökningsformulär</h3>
        <MemberForm allMemberLevels={allMemberLevels} />
      </Article>
      {< DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={memberIntro.id} />}
    </>
  );
}