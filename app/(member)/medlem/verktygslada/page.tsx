'use server'

import s from './page.module.scss'
import { AllToolsDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import Link from 'next/link';

export default async function Tools() {

  const { allTools } = await apiQuery<AllToolsQuery, AllToolsQueryVariables>(AllToolsDocument)

  return (
    <article className={s.container}>
      <ul>
        {allTools.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/medlem/verktygslada/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}