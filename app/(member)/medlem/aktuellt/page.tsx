'use server'

import s from './page.module.scss'
import { AllNewsDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import Link from 'next/link';

export default async function News() {

  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument)

  return (
    <article className={s.container}>
      <ul>
        {allNews.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/medlem/aktuellt/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}