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
import cn from 'classnames';

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
      <article>
        <content>
          <h1>{title}</h1>
          <div className="grid">
            <figure className={cn(s.main, "small")}>
              {image && <Image data={image.responsiveImage} />}
            </figure>
          </div>
          <section className="intro">
            <span>{format(new Date(_publishedAt), 'd MMMM yyyy')}</span>
            <StructuredContent content={intro} id={id} />
          </section>
          <section className={cn(s.content, "grid", "structured")}>
            <StructuredContent content={content} id={id} />
          </section>
          <Link href={`/${category.slug}`}>
            <button>Visa alla {category.title}</button>
          </Link>
        </content>
      </article>
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={id} />
    </>
  );
}