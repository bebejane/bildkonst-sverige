'use client'

import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useOnClickOutside } from 'usehooks-ts'
import Hamburger from 'hamburger-react'

export type Props = {
  allPoliticCategories: AllPoliticCategoriesQuery['allPoliticCategories']
}

export default function NavBar({ allPoliticCategories }: Props) {

  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [pane, setPane] = useState<'left' | 'right' | null>(null)
  const pathname = usePathname()
  const handleClickOutside = () => setPane(null)

  useEffect(() => {
    setPane(null)
    setOpen(false)
  }, [pathname])

  useOnClickOutside(ref, handleClickOutside)

  return (
    <>
      <h1 className={cn(s.logo, open && s.open)}><Link href={'/'}>Bildkonst<br />sverige</Link></h1>
      <nav className={cn(s.hamburger, open && s.open)}>
        <Hamburger toggled={pane === 'left'} toggle={() => setOpen(!open)} />
      </nav>
      <nav className={cn(s.navbar, open && s.show)}>
        <ul className={cn(s.menu, pane === 'left' && s.open)}>
          <li className={cn(pane === 'left' && s.selected)} onClick={(e) => setPane(pane === 'left' ? null : 'left')}>
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
          <li className={cn(pane === 'right' && s.selected)} onClick={() => setPane(pane === 'right' ? null : 'right')}>
            Logga in
            <ul>
              <li className={cn(pathname === `/medlem/actuellt` && s.selected)}>
                <Link href={`/medlem/aktuellt`}>Aktuellt</Link>
              </li>
              <li className={cn(pathname === `/medlem/verktygslada` && s.selected)}>
                <Link href={`/medlem/verktygslada`}>Verktygslåda</Link>
              </li>
              <li>
                <Link href={`/medlem/logga-ut`}>Logga ut</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <ul className={cn(s.pane, s.left, pane === 'left' && s.show)} ref={pane === 'left' ? ref : undefined}>
        {allPoliticCategories?.map(({ id, title, slug }) => (
          <li className={cn(pathname === `/${slug}` && s.selected)} key={id}>
            <Link href={`/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>

      <ul className={cn(s.pane, s.right, pane === 'right' && s.show)} ref={pane === 'right' ? ref : undefined}>
        <li className={cn(pathname === `/medlem/actuellt` && s.selected)}>
          <Link href={`/medlem/aktuellt`}>Aktuellt</Link>
        </li>
        <li className={cn(pathname === `/medlem/verktygslada` && s.selected)}>
          <Link href={`/medlem/verktygslada`}>Verktygslåda</Link>
        </li>
        <li>
          <Link href={`/medlem/logga-ut`}>Logga ut</Link>
        </li>
      </ul>
    </>
  );
}