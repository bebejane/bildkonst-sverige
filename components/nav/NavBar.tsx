'use client'

import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useOnClickOutside } from 'usehooks-ts'

export type Props = {
  allPoliticCategories: AllPoliticCategoriesQuery['allPoliticCategories']
}

export default function NavBar({ allPoliticCategories }: Props) {

  const ref = useRef(null)
  const [pane, setPane] = useState<'left' | 'right' | null>(null)
  const pathname = usePathname()
  const handleClickOutside = () => setPane(null)

  useEffect(() => {
    setPane(null)
  }, [pathname])

  useOnClickOutside(ref, handleClickOutside)

  return (
    <nav className={s.navbar} ref={ref}>
      <ul className={cn(s.menu, pane === 'left' && s.open)}>
        <li className={cn(pane === 'left' && s.selected)} onClick={() => setPane(pane === 'left' ? null : 'left')}>
          Kulturpolitik
        </li>
        <li className={cn(pane !== 'left' && pathname === '/om-oss' && s.selected)}>
          <Link href={'/om-oss'}>Om oss</Link>
        </li>
        <li className={cn(pane !== 'left' && pathname === '/medlemskap' && s.selected)}>
          <Link href={'/bli-medlem'}>Medlemskap</Link>
        </li>
      </ul>
      <nav className={cn(s.pane, s.left, pane === 'left' && s.show)} >
        <ul>
          {allPoliticCategories?.map(({ id, title, slug }) => (
            <li className={cn(pathname === `/${slug}` && s.selected)} key={id}>
              <Link href={`/${slug}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <h1><Link href={'/'}>Bildkonst<br />sverige</Link></h1>
      <ul className={s.links}>
        <li>Instagram</li>
        <li>Facebook</li>
        <li className={cn(pane !== 'right' && pathname === '/logga-in' && s.selected)}>
          <Link href={'logga-in'}>Logga in</Link>
        </li>
      </ul>
      <nav className={cn(s.pane, s.right)}></nav>
    </nav>
  );
}