'use server'

import s from './page.module.scss'
import { AllResourcesDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import Link from 'next/link';
import { StructuredContent } from 'next-dato-utils';
import { format } from 'date-fns';
import cn from 'classnames';

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
      <h3>Resurser <span className="date">Filtrera+</span></h3>
      <section className={s.filter}>
        <ul>
          <li className="date">Konst</li>
          <li className="date">Utbildning</li>
          <li className="date">Ekonomi</li>
        </ul>
      </section>
      <ul className={cn("grid", s.resources)}>
        {allResources.map(({ slug, title, summary, _publishedAt, category }) => (
          <li key={slug}>
            <div className={s.wrapper}>
              <div>
                <header>
                  <span className="date">Typ</span>
                  <span className="date">{category?.title}</span>
                </header>
                <h2>{title}</h2>
                <StructuredContent className="small" content={summary} />
              </div>
              <button>Visa</button>
            </div>
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
