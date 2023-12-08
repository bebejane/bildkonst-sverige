import s from './page.module.scss'
import cn from 'classnames';
import { AllResourcesDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import { StructuredContent } from 'next-dato-utils';
import Link from 'next/link';

export const runtime = 'edge'

export default async function Resources({ searchParams }) {

  const { allResources } = await apiQuery<AllResourcesQuery, AllResourcesQueryVariables>(AllResourcesDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    },
    tags: ['resources']
  })

  const allThemes = allResources.map(({ theme }) => theme.map(({ title }) => title)).flat()
  const filter = searchParams.filter ? true : false
  const themes: string[] = searchParams.tema?.split(',') ?? []
  const filterResources = themes.length === 0 ? allResources : allResources.filter(({ theme }) => theme.some(({ title }) => themes.includes(title)))

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
          {allThemes.map((theme, idx) => {
            const qs = (themes.includes(theme) ? themes.filter(c => c !== theme) : [...themes, theme]).filter(c => c)
            const isSelected = themes.includes(theme)

            return (
              <li key={idx} className={cn(isSelected && s.selected)}>
                <Link href={qs.length ? `?filter=1&tema=${qs.join(',')}` : '?filter=1'}>
                  {theme}
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
