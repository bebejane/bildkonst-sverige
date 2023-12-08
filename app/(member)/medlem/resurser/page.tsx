import s from './page.module.scss'
import cn from 'classnames';
import { AllResourcesDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import { StructuredContent } from 'next-dato-utils';
import Link from 'next/link';

export default async function Resources({ searchParams }) {

  const { allResources, allResourceCategories } = await apiQuery<AllResourcesQuery, AllResourcesQueryVariables>(AllResourcesDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    },
    tags: ['resources']
  })

  const filter = searchParams.filter ? true : false
  const categories: string[] = searchParams.kategori?.split(',') ?? []
  const filterResources = categories.length === 0 ? allResources : allResources.filter(({ category }) => categories.includes(category?.title))

  return (
    <article className={s.container}>
      <h3>
        Resurser
        <button>
          <Link href={!filter ? `?filter=1` : '?'}>
            Filtrera {!filter ? '+' : '-'}
          </Link>
        </button>
      </h3>
      <section className={cn(s.filter, filter && s.show)}>
        <ul>
          {allResourceCategories.map(({ id, title }) => {
            const qs = (categories.includes(title) ? categories.filter(c => c !== title) : [...categories, title]).filter(c => c)
            const isSelected = categories.includes(title)

            return (
              <li key={id} className={cn(isSelected && s.selected)}>
                <Link href={qs.length ? `?filter=1&kategori=${qs.join(',')}` : '?'} >
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
      <ul className={cn("grid", s.resources)}>
        {filterResources.map(({ id, link, title, summary, _publishedAt, category, theme }) => (
          <li key={id}>
            <Link href={link.url} className={s.wrapper}>
              <div>
                <header>
                  <span className="date">{theme.map(({ title }) => title).join(', ')}</span>
                  <span className="date">{category?.title}</span>
                </header>
                <h2>{title}</h2>
                <StructuredContent className="small" content={summary} />
              </div>
              <button>Visa</button>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export async function generateMetadata({ params }) {

  return {
    title: 'Resurser',
  } as Metadata
}
