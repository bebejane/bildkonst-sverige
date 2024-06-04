'use client'

import s from './FilterBar.module.scss'
import cn from 'classnames';
import { Metadata } from 'next';
import { useOptimistic } from 'react'
import Link from 'next/link';

type Props = {
  searchParams: {
    filter: string
    list: string
    tema: string
  }
  allResources: AllResourcesQuery['allResources']
}

export default function FilterBar({ searchParams, allResources }: Props) {

  const [themes, setThemes] = useOptimistic(searchParams.tema ? searchParams.tema.split(',') : [])

  const allThemes = []
  allResources.map(({ theme }) => theme.map(({ title }) => title)).flat().forEach(theme => !allThemes.includes(theme) && allThemes.push(theme))
  const filter = !searchParams.filter ? true : searchParams.filter === '0' ? false : true
  const list = searchParams.list === '1' ? true : false


  return (
    <nav className={cn(s.filter, filter && s.show)}>
      <ul>
        {allThemes.map((theme, idx) => {
          const qs = (themes.includes(theme) ? themes.filter(c => c !== theme) : [...themes, theme]).filter(c => c)
          const isSelected = themes.includes(theme)

          return (
            <li key={idx} className={cn(isSelected && s.selected, "date")}>
              <Link
                href={qs.length ? `?list=${list ? '1' : '0'}&tema=${qs.join(',')}` : `?list=${list ? '1' : '0'}`}
                onClick={() => setThemes(qs)}
              >
                {theme}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>

  );
}

export async function generateMetadata() {

  return {
    title: 'Resurser',
  } as Metadata
}
