'use server'

import Article from '@components/Article';
import { AllNewsDocument, NewsDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function NewsPage({ params }: { params: { news: string } }) {

  const { news } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, { variables: { slug: params.news } })

  if (!news) return notFound();

  const { id, title, intro, image, content } = news;

  return (
    <Article id={id} title={title} intro={intro} image={image as FileField} content={content} />
  );
}

export async function generateStaticParams() {
  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument);
  return allNews.map(({ slug: news }) => ({ NewsPage }))
}

export async function generateMetadata({ params }) {
  const { news } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, { variables: { slug: params.news } })

  return {
    title: news.title,
  } as Metadata
}
