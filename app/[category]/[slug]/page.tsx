'use server'

import s from './page.module.scss'
import { AllPoliticDocument, PoliticDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import StructuredContent from '@components/common/StructuredContent'
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms/image';
import { format } from 'date-fns';
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import Link from 'next/link';

export async function generateStaticParams() {
  const { allPolitics } = await apiQuery<AllPoliticQuery, AllPoliticQueryVariables>(AllPoliticDocument, { generateTags: true });
  return allPolitics.map(({ slug, category }) => ({ slug }))
}


export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const { politic, draftUrl } = await apiQuery<PoliticQuery, PoliticQueryVariables>(PoliticDocument, {
    variables: { slug },
    includeDrafts: draftMode().isEnabled
  })

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
      <Link href={`/${category.slug}`}>
        <button>Visa alla {category.title}</button>
      </Link>
      <DraftMode draftMode={draftMode().isEnabled} draftUrl={draftUrl} tag={id} />
    </>
  );
}