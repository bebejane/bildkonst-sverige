import s from './page.module.scss'
import cn from 'classnames';
import { AllResourcesDocument } from "@graphql";
import { apiQuery } from "next-dato-utils/api";
import { Metadata } from 'next';
import Content from '@components/Content';
import Link from 'next/link';
import FilterBar from './FilterBar';

export const dynamic = 'auto'
export const runtime = 'edge'

export default async function Resources({ searchParams }) {

  const { allResources } = await apiQuery<AllResourcesQuery, AllResourcesQueryVariables>(AllResourcesDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    },
    tags: ['resource']
  })

  const allThemes = []
  allResources.map(({ theme }) => theme.map(({ title }) => title)).flat().forEach(theme => !allThemes.includes(theme) && allThemes.push(theme))

  const list = searchParams.list === '1' ? true : false
  const themes: string[] = searchParams.tema ? searchParams.tema.split(',') : []
  const filterResources = allResources.filter(({ theme }) => themes.length === 0 || theme.some(({ title }) => themes.includes(title)))

  const sortByAuthor = (a: AllResourcesQuery['allResources'][0], b: AllResourcesQuery['allResources'][0]) => {
    if (!a.author && b.author) return 1
    if (a.author && !b.author) return -1
    return a.author === b.author ? 0 : a.author > b.author ? 1 : -1
  }

  return (
    <article className={s.container}>
      <h3>Resurser</h3>
      <FilterBar searchParams={searchParams} allResources={allResources} />
      {
        !list ?
          <ul className={cn("grid", s.resources)}>
            {filterResources.map(({ id, link, title, summary, subtitle, author, publisher, category, theme }) => (
              <li key={id}>
                <Link href={link.url} target="new" className={s.wrapper}>
                  <div>
                    <header>
                      <span className="date">{category?.title}&nbsp;•&nbsp;</span><span className="date">{theme.map(({ title }) => title).join(', ')}</span>
                    </header>
                    <h5>{title} {subtitle && <><br />—<br />{subtitle}</>}</h5>

                    <Content className="small" content={summary} />
                    <div className={s.meta}>
                      <span className="meta">{[author, publisher].filter(s => s).join(', ')}</span>
                    </div>
                  </div>
                  <button>ÖPPNA</button>
                </Link>
              </li>
            ))}
          </ul>
          :
          <table className={cn(s.list)}>
            <tbody>
              {filterResources.sort(sortByAuthor).map(({ id, link, title, subtitle, author, category, theme }) => (
                <tr key={id}>
                  <td><h4><Link href={link.url} target="new">{author}</Link></h4></td>
                  <td><h4><Link href={link.url} target="new">{title}{subtitle && <> — {subtitle}</>}</Link></h4></td>
                  <td className="date"><Link href={link.url} target="new">{category?.title}</Link></td>
                  <td className="date"><Link href={link.url} target="new">{theme.map(({ title }) => title).join(', ')}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
      }
      <button className={s.toggle}>
        <Link href={`?list=${list ? '0' : '1'}&tema=${themes.join(',')}`}>
          {!list ? 'Visa som lista' : 'Visa som kolumner'}
        </Link>
      </button>
    </article >
  );
}

export async function generateMetadata() {

  return {
    title: 'Resurser',
  } as Metadata
}
