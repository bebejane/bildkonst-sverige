'use server'

import s from './page.module.scss'
import { AllNewsDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import { Image } from 'react-datocms';
import Link from 'next/link';
import { StructuredContent } from 'next-dato-utils';
import { format } from 'date-fns';
import cn from 'classnames';

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
      <h3>Aktuellt för medlemmar</h3>
      <div className="grid">
        <ul className={s.main}>
          {extendedNews.map(({ image, slug, title, intro, _publishedAt, category, externalUrl }) => (
            <li key={slug}>
              <Link href={`/medlem/aktuellt/${slug}`}>
                {image &&
                  <figure>
                    <Image data={image.responsiveImage} />
                  </figure>
                }
                <h2>{title}</h2>
                <span className="date">{category?.title} • {format(new Date(_publishedAt), 'yyyy-MM-dd')}</span>
                <StructuredContent className="intro" content={intro} />
                {externalUrl &&
                  <a href={externalUrl} target="_blank" rel="noreferrer">Läs mer</a>
                }
              </Link>
            </li>
          ))}
        </ul>
        <ul className={s.left}>
          {shortNews.map(({ image, slug, title, intro, _publishedAt, category, externalUrl }) => (
            <li key={slug}>
              {image &&
                <figure>
                  <Image data={image.responsiveImage} />
                </figure>
              }
              <span className="date">{category?.title} • {format(new Date(_publishedAt), 'yyyy-MM-dd')}<br />
              </span>
              <h4>{title}</h4>
              <StructuredContent className="small" content={intro} />
              {externalUrl &&
                <a href={externalUrl} target="_blank" rel="noreferrer">Läs mer</a>
              }
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {

  return {
    title: 'Aktuellt',
  } as Metadata
}
