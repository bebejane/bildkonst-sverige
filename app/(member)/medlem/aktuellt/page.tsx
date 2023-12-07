'use server'

import s from './page.module.scss'
import { AllNewsDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import { Image } from 'react-datocms';
import Link from 'next/link';
import { StructuredContent } from 'next-dato-utils';
import { format } from 'date-fns';

export default async function News() {

  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    },
    tags: ['news']
  })

  const extendedNews = allNews.filter(({ extended }) => extended)
  const shortNews = allNews.filter(({ extended }) => !extended)

  return (
    <article className={s.container}>
      <ul>
        {extendedNews.map(({ image, slug, title, intro, _publishedAt, category }) => (
          <li key={slug}>
            <Link href={`/medlem/aktuellt/${slug}`}>
              <figure>
                <Image data={image.responsiveImage} />
                <figcaption>{title}</figcaption>
              </figure>
              <p className={s.details}>
                {format(new Date(_publishedAt), 'yyyy-MM-dd hh:mm')}<br />
                {category?.title}
              </p>
              <StructuredContent content={intro} />
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {shortNews.map(({ image, slug, title, intro, _publishedAt, category }) => (
          <li key={slug}>
            <figure>
              <Image data={image.responsiveImage} />
              <figcaption>{title}</figcaption>
            </figure>
            <p className={s.details}>
              {format(new Date(_publishedAt), 'yyyy-MM-dd hh:mm')}<br />
              {category?.title}
            </p>
            <StructuredContent content={intro} />
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
