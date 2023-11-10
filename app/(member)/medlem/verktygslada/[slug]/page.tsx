'use server'

import Article from '@components/Article';
import { AllToolsDocument, ToolDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { allTools } = await apiQuery<AllToolsQuery, AllToolsQueryVariables>(AllToolsDocument);
  return allTools.map(({ slug }) => ({ slug }))
}

export default async function ToolPage({ params: { slug } }: { params: { slug: string } }) {

  const { tool } = await apiQuery<ToolQuery, ToolQueryVariables>(ToolDocument, { variables: { slug } })

  if (!tool) return notFound();

  const { id, title, intro, image, content } = tool;

  return (
    <Article id={id} title={title} intro={intro} image={image as FileField} content={content} />
  );
}