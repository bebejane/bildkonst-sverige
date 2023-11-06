'use server'

import s from './page.module.scss'
import { AllPoliticDocument, PoliticDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import StructuredContent from '@components/common/StructuredContent'
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms/image';
import { format } from 'date-fns';

export async function generateStaticParams() {
  const { allPolitics } = await apiQuery<AllPoliticQuery, AllPoliticQueryVariables>(AllPoliticDocument, { generateTags: true });
  return allPolitics.map(({ slug, category }) => ({ slug }))
}


export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const { politic } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, { variables: { slug } })

  if (!politic) return notFound()

  const { id, title, intro, image, content, category, _publishedAt } = politic

  return (
    <>
      <h1>{title}</h1>
      <figure>
        {image && <Image data={image.responsiveImage} />}
      </figure>
      <section className={s.intro}>
        <span>{format(new Date(_publishedAt), 'd MMMM yyyy')}</span>
        <StructuredContent content={intro} id={id} />
      </section>
      <section className={s.content}>
        <StructuredContent content={content} id={id} />
      </section>
    </>
  );
}