'use server'

import { Article } from '@components';
import { AllNewsDocument, NewsDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument);
  return allNews.map(({ slug }) => ({ slug }))
}


export default async function NewsPage({ params: { slug } }: { params: { slug: string } }) {

  const { news } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, { variables: { slug } })

  if (!news) return notFound();

  const { id, title, intro, image, content } = news;

  return (
    <Article id={id} title={title} intro={intro} image={image as FileField} content={content} />
  );
}