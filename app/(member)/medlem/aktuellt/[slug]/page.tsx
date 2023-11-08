'use server'

import { StructuredContent } from '@components';
import s from './page.module.scss'
import { AllNewsDocument, NewsDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

export async function generateStaticParams() {
  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument);
  return allNews.map(({ slug }) => ({ slug }))
}


export default async function NewsPage({ params: { slug } }: { params: { slug: string } }) {

  const { news } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, { variables: { slug } })

  if (!news) return notFound();

  const { id, title, intro, image, content } = news;

  return (
    <article>
      <div className="content">
        <h1>{title}</h1>
        {image && <>
          <div className="grid">
            <figure className={cn(s.main, "small")}>
              <Image data={image.responsiveImage} />
            </figure>
          </div>
        </>
        }
        <section className="intro">
          <span className="date">{format(new Date(_publishedAt), 'd MMMM yyyy')}</span>
          <StructuredContent content={intro} id={id} />
        </section>
        <section className={cn(s.content, "grid", "structured")}>
          <StructuredContent content={content} id={id} />
        </section>
      </div>
    </article>
  );
}