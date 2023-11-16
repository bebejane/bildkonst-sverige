'use server'

import s from './page.module.scss'
import { AllToolsDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import Link from 'next/link';

export default async function Tools() {

  const { allTools } = await apiQuery<AllToolsQuery, AllToolsQueryVariables>(AllToolsDocument, {
    all: true,
    tags: ['tool']
  })

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

export async function generateMetadata({ params }) {

  return {
    title: 'Verktygslåda',
  } as Metadata
}

