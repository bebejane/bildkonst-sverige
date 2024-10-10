"use server";

import Article from "@components/Article";
import { ToolboxDocument } from "@graphql";
import { apiQuery } from "next-dato-utils/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ToolboxPage({ params }: { params: { toolbox: string } }) {
  const { toolbox } = await apiQuery<ToolboxQuery, ToolboxQueryVariables>(ToolboxDocument);

  if (!toolbox) return notFound();

  const { id, title, intro, image, content, _publishedAt } = toolbox;

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


export async function generateMetadata({ params }) {
  const { toolbox } = await apiQuery<ToolboxQuery, ToolboxQueryVariables>(ToolboxDocument);

  return {
    title: toolbox.title,
  } as Metadata;
}
