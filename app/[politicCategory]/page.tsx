'use server'

import s from './page.module.scss'
import { AllPoliticByCategoryDocument, AllPoliticCategoriesDocument } from "@graphql";
import { apiQuery, DraftMode } from "next-dato-utils";
import StructuredContent from '@components/StructuredContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Image } from 'react-datocms/image';
import cn from 'classnames';
import { Metadata } from 'next';

export default async function Page({ params }: { params: { politicCategory: string } }) {

  const { politicCategory, draftUrl } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(AllPoliticByCategoryDocument, {
    variables: { slug: params.politicCategory },
    tags: ['politic_category']
  })

  if (!politicCategory)
    return notFound()

  return (
    <>
      <article>
        <h3>{politicCategory.title}</h3>
        {politicCategory?._allReferencingPolitics.length > 0 ?
          <ul className={s.articles}>
            {politicCategory?._allReferencingPolitics.map(({ id, title, image, intro, slug, category, _publishedAt }) =>
              <li key={id}>
                <Link href={`/${category.slug}/${slug}`}>
                  <h2>{title}</h2>
                  <div className="grid">
                    <div className={cn(s.content, "intro", image && s.image)}>
                      <span className="date">{format(new Date(_publishedAt), 'd MMMM yyyy')}</span>
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
      <DraftMode url={draftUrl} tag={politicCategory.id} />
    </>
  );
}

export async function generateStaticParams() {
  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument, { tags: ['politic_category'] });
  return allPoliticCategories.map(({ slug: politicCategory }) => ({ politicCategory }))
}

export async function generateMetadata({ params }) {
  const { politicCategory } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(AllPoliticByCategoryDocument, {
    variables: { slug: params.politicCategory }
  })

  return {
    title: politicCategory.title,
  } as Metadata
}
