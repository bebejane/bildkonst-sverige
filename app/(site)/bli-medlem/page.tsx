'use server'

import Article from '@components/Article';
import s from './page.module.scss'
import { MemberPageDocument } from "@graphql";
import { apiQuery, } from "next-dato-utils/api";
import { DraftMode } from "next-dato-utils/components";
import MemberForm from '@components/MemberForm';
import { Metadata } from 'next';

const formatter = new Intl.NumberFormat('se-Sv', {
  maximumFractionDigits: 0
});

export default async function Membership() {

  const { memberPage, allMemberLevels, draftUrl } = await apiQuery<MemberPageQuery, MemberPageQueryVariables>(MemberPageDocument)
  const { id, title, intro, content } = memberPage

  return (
    <>
      <Article id={id} className={s.container} title={title} intro={intro} content={content}>

        <div className="structured grid">
          <h3 className={s.levelhead}>Årsomsättning</h3>
          <ul className={s.levels}>
            {allMemberLevels.map(({ id, level, turnoverMax, turnoverMin }) =>
              <li key={id}>
                Medlemsnivå {level}:&nbsp;&nbsp;
                {!turnoverMax && turnoverMin ? `<${formatter.format(turnoverMin)}` : turnoverMax && turnoverMin ? `>${formatter.format(turnoverMin)} <${formatter.format(turnoverMax)}` : `>${formatter.format(turnoverMax)}`}
              </li>
            )}
          </ul>
          <h3>Ansökningsformulär</h3>
          <MemberForm allMemberLevels={allMemberLevels} />
        </div>
      </Article>
      {<DraftMode url={draftUrl} tag={memberPage.id} />}
    </>
  );
}

export async function generateMetadata({ params }) {

  return {
    title: 'Bli medlem',
  } as Metadata
}

