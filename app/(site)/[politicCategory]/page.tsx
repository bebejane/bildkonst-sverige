'use server'

import s from './page.module.scss'
import { AllPoliticByCategoryDocument, AllPoliticCategoriesDocument, PoliticCategoryDocument } from "@graphql";
import { apiQuery, DraftMode } from "next-dato-utils";
import StructuredContent from '@components/StructuredContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Image } from 'react-datocms/image';
import cn from 'classnames';
import { Metadata } from 'next';

export default async function Page({ params }: { params: { politicCategory: string } }) {

  const { politicCategory } = await apiQuery<PoliticCategoryQuery, PoliticCategoryQueryVariables>(PoliticCategoryDocument, {
    variables: { slug: params.politicCategory },
  })

  if (!politicCategory)
    return notFound()

  const { allPolitics, draftUrl } = await apiQuery<AllPoliticByCategoryQuery, AllPoliticByCategoryQueryVariables>(AllPoliticByCategoryDocument, {
    variables: { id: politicCategory.id },
    all: true,
    tags: ['politic']
  })


  return (
    <>
      <article>
        <h3>{politicCategory.title}</h3>
        {allPolitics.length > 0 ?
          <ul className={s.articles}>
            {allPolitics.map(({ id, title, image, intro, slug, category, _publishedAt }) =>
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
  const { allPoliticCategories } = await apiQuery<AllPoliticCategoriesQuery, AllPoliticCategoriesQueryVariables>(AllPoliticCategoriesDocument, {
    all: true,
    tags: ['politic_category']
  });
  return allPoliticCategories.map(({ slug: politicCategory }) => ({ politicCategory }))
}

export async function generateMetadata({ params }) {
  const { politicCategory } = await apiQuery<PoliticCategoryQuery, PoliticCategoryQueryVariables>(PoliticCategoryDocument, {
    variables: { slug: params.politicCategory }
  })
  if (!politicCategory)
    return notFound()

  return {
    title: politicCategory.title,
  } as Metadata
}
