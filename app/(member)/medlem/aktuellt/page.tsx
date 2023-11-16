'use server'

import s from './page.module.scss'
import { AllNewsDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import Link from 'next/link';

export default async function News() {

  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument, {
    all: true,
    tags: ['news']
  })

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

export async function generateMetadata({ params }) {

  return {
    title: 'Aktuellt',
  } as Metadata
}
