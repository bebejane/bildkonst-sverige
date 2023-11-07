'use client'

import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Hamburger from 'hamburger-react'
import useNextAuthSession from "@lib/hooks/useNextAuthSession";

export type Props = {
  allPoliticCategories: AllPoliticCategoriesQuery['allPoliticCategories']
}

const memberMenu = [
  {
    title: 'Aktuellt',
    href: '/medlem/aktuellt',
  },
  {
    title: 'Verktygslåda',
    href: '/medlem/verktygslada',
  },
  {
    title: 'Logga ut',
    href: '/medlem/logga-ut',
  },

]

export default function NavBar({ allPoliticCategories }: Props) {

  const { session, error, status } = useNextAuthSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [pane, setPane] = useState<'left' | 'right' | null>(null)


  const handleClickOutside = (e) => {
    e.stopPropagation()
    setPane(null)
  }

  useEffect(() => {
    setPane(null)
    setOpen(false)
  }, [pathname])

  return (
    <>
      <h1 className={cn(s.logo, open && s.open)}>
        <Link href={'/'}>Bildkonst<br />sverige</Link>
      </h1>

      <nav className={cn(s.hamburger, open && s.open)}>
        <Hamburger toggled={pane === 'left'} toggle={() => setOpen(!open)} />
      </nav>

      <nav className={cn(s.navbar, open && s.show)}>
        <ul className={cn(s.menu, pane === 'left' && s.open)}>
          <li
            className={cn(pane === 'left' && s.selected)}
            onClick={(e) => setPane(pane === 'left' ? null : 'left')}
          >
            Kulturpolitik
            <ul>
              {allPoliticCategories?.map(({ id, title, slug }) => (
                <li className={cn(pathname === `/${slug}` && s.selected)} key={id}>
                  <Link href={`/${slug}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className={cn(pane !== 'left' && pathname === '/om-oss' && s.selected)}>
            <Link href={'/om-oss'}>Om oss</Link>
          </li>
          <li className={cn(pane !== 'left' && pathname === '/bli-medlem' && s.selected)}>
            <Link href={'/bli-medlem'}>Medlemskap</Link>
          </li>
        </ul>
        <ul className={cn(s.links, pane === 'right' && s.open)}>
          <li>Instagram</li>
          <li>Facebook</li>
          {!session ?
            <li key={'logga-in'}>
              <Link href={'/logga-in'}>Logga in</Link>
            </li>
            :
            <li
              key={'member-pane'}
              className={cn(pane === 'right' && s.selected)}
              onClick={() => setPane(pane === 'right' ? null : 'right')}
            >
              Medlemssidor
              <ul>
                {memberMenu.map(({ title, href }, idx) =>
                  <li key={idx} className={cn(pathname === href && s.selected)}>
                    <Link href={href}>{title}</Link>
                  </li>
                )}
              </ul>
            </li>
          }
        </ul>
      </nav>

      {pane &&
        <div className={s.paneBackground} onClick={handleClickOutside} />
      }

      <ul className={cn(s.pane, s.left, pane === 'left' && s.show)}>
        {allPoliticCategories?.map(({ id, title, slug }) => (
          <li className={cn(pathname === `/${slug}` && s.selected)} key={id}>
            <Link href={`/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>

      <ul className={cn(s.pane, s.right, pane === 'right' && s.show)}>
        {memberMenu.map(({ title, href }, idx) =>
          <li key={idx} className={cn(pathname === href && s.selected)}>
            <Link href={href}>{title}</Link>
          </li>
        )}
      </ul>
    </>
  );
}