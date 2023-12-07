'use server'

import s from './page.module.scss'
import { AllResourcesDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import Link from 'next/link';
import { StructuredContent } from 'next-dato-utils';
import { format } from 'date-fns';

export default async function Resources() {

  const { allResources } = await apiQuery<AllResourcesQuery, AllResourcesQueryVariables>(AllResourcesDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    },
    tags: ['resources']
  })

  return (
    <article className={s.container}>
      <ul>
        {allResources.map(({ slug, title, summary, _publishedAt, category }) => (
          <li key={slug}>
            <h3>{title}</h3>
            <p className={s.details}>
              {format(new Date(_publishedAt), 'yyyy-MM-dd hh:mm')}<br />
              {category?.title}
            </p>
            <StructuredContent content={summary} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export async function generateMetadata({ params }) {

  return {
    title: 'Resurser',
  } as Metadata
}
