"use server";

import Article from "@components/Article";
import { AllNewsDocument, NewsDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsPage({ params }: { params: { news: string } }) {
  const { news } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, {
    variables: { slug: params.news },
  });

  if (!news) return notFound();

  const { id, title, intro, image, content, _publishedAt } = news;

  return (
    <>
      <Article
        id={id}
        title={title}
        intro={intro}
        image={image as FileField}
        content={content}
        publishedAt={_publishedAt}
      />
      <Link href={'/medlem/aktuellt'}>
        <button>Tillbaka till Aktuellt</button>
      </Link>
    </>
  );
}

export async function generateStaticParams() {
  const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument, {
    tags: ["news"],
    all: true,
  });
  return allNews.map(({ slug: news }) => ({ NewsPage }));
}

export async function generateMetadata({ params }) {
  const { news } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, {
    variables: { slug: params.news },
  });

  return {
    title: news.title,
  } as Metadata;
}
