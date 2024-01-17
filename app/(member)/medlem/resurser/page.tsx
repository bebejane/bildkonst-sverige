import s from './page.module.scss'
import cn from 'classnames';
import { AllResourcesDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";
import { Metadata } from 'next';
import { StructuredContent } from 'next-dato-utils';
import Link from 'next/link';

export const dynamic = 'auto'
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


  const allThemes = []
  allResources.map(({ theme }) => theme.map(({ title }) => title)).flat().forEach(theme => !allThemes.includes(theme) && allThemes.push(theme))

  const filter = !searchParams.filter ? true : searchParams.filter === '0' ? false : true
  const themes: string[] = searchParams.tema?.split(',') ?? []
  const filterResources = allResources.filter(({ theme }) => themes.length === 0 || theme.some(({ title }) => themes.includes(title)))

  return (
    <article className={s.container}>
      <h3>
        Resurser
        <button>
          <Link href={filter ? `?filter=0` : '?'}>
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
              <li key={idx} className={cn(isSelected && s.selected, "date")}>
                <Link href={qs.length ? `?filter=1&tema=${qs.join(',')}` : '?filter=1'}>
                  {theme}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
      <ul className={cn("grid", s.resources)}>
        {filterResources.map(({ id, link, title, summary, subtitle, author, publisher, category, theme }) => (
          <li key={id}>
            <Link href={link.url} target="new" className={s.wrapper}>
              <div>
                <header>
                  <span className="date">{category?.title}&nbsp;•&nbsp;</span><span className="date">{theme.map(({ title }) => title).join(', ')}</span>
                </header>
                <h5>{title}</h5>
                {subtitle && <h6>{subtitle}</h6>}
                <StructuredContent className="small" content={summary} />
                {author && <span>{author}</span>}
                {publisher && <span>{publisher}</span>}
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
