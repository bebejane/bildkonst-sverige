'use server'

import Article from '@components/Article';
import { AllToolsDocument, ToolDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function ToolPage({ params }: { params: { tool: string } }) {

  const { tool } = await apiQuery<ToolQuery, ToolQueryVariables>(ToolDocument, { variables: { slug: params.tool } })

  if (!tool) return notFound();

  const { id, title, intro, image, content } = tool;

  return (
    <Article id={id} title={title} intro={intro} image={image as FileField} content={content} />
  );
}

export async function generateStaticParams() {
  const { allTools } = await apiQuery<AllToolsQuery, AllToolsQueryVariables>(AllToolsDocument);
  return allTools.map(({ slug: tool }) => ({ tool }))
}

export async function generateMetadata({ params }) {
  const { tool } = await apiQuery<ToolQuery, ToolQueryVariables>(ToolDocument, { variables: { slug: params.tool } })

  return {
    title: tool.title,
  } as Metadata
}