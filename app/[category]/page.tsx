'use server'

import s from './page.module.scss'
import { AllPoliticByCategoryDocument, AllPoliticCategoriesDocument } from "@graphql";
import { StructuredContent } from '@components';
import { apiQuery } from "@lib/client";
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Image } from 'react-datocms/image';

export async function generateStaticParams() {
  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument);
  return allPoliticCategories.map(({ slug: category }) => ({ category }))
}

export default async function Page({ params }: { params: { category: string } }) {

  const { politicCategory, draftUrl } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(AllPoliticByCategoryDocument, {
    variables: { slug: params.category },
    includeDrafts: draftMode().isEnabled
  })

  if (!politicCategory)
    return notFound()

  return (
    <>
      <article>
        <h1>{politicCategory.title}</h1>
        {politicCategory?._allReferencingPolitics.length > 0 ?
          <ul className={s.articles}>
            {politicCategory?._allReferencingPolitics.map(({ id, title, image, intro, slug, category, _publishedAt }) =>
              <li key={id}>
                <Link href={`/${category.slug}/${slug}`}>
                  <h3>{title}</h3>
                  <div className={s.wrap}>
                    <div className={s.content}>
                      <span className={s.date}>{format(new Date(_publishedAt), 'd MMMM yyyy')}</span>
                      <StructuredContent content={intro} id={id} />
                    </div>
                    {image &&
                      <figure>
                        <Image data={image.responsiveImage} />
                      </figure>
                    }
                  </div>
                </Link>
              </li>
            )}
          </ul>
          :
          <p>
            Det finns inga poster i den här kategorin
          </p>
        }
      </article>
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={politicCategory.id} />
    </>
  );
}