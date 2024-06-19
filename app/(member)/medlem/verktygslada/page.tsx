import s from './page.module.scss'
import cn from 'classnames';
import { AllToolsDocument } from "@graphql";
import { apiQuery } from "next-dato-utils/api";
import Content from '@components/Content';
import Link from 'next/link';
import Article from '@components/Article';
import { Metadata } from 'next';

export const dynamic = 'auto'
export const runtime = 'edge'

export default async function Tools() {

  const { allTools, toolIntro } = await apiQuery<AllToolsQuery, AllToolsQueryVariables>(AllToolsDocument, {
    all: true,
    tags: ['tool']
  })

  return (
    <Article id={toolIntro.id} title={'Verktygslåda'} intro={toolIntro.intro} className={s.container}>
      <ul className={cn("grid", s.resources)}>
        {allTools.map(({ id, title, subtitle, slug, intro }) => (
          <li key={id}>
            <Link href={`/medlem/verktygslada/${slug}`} className={s.wrapper}>
              <div>
                <h5>{title}</h5>
                {subtitle}
                <Content className="small" content={intro} />
                <div className={s.meta}></div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Article >
  );
}

export async function generateMetadata() {

  return {
    title: 'Verktygslåda',
  } as Metadata
}
