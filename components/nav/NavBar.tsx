'use client'

import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Hamburger from 'hamburger-react'
import useNextAuthSession from "@lib/hooks/useNextAuthSession";
import { Menu } from "@lib/menu";

type Props = {
  menu: Menu
}

export default function NavBar({ menu }: Props) {

  const { session, error, status } = useNextAuthSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)


  const handleClickOutside = (e) => {
    e.stopPropagation()
    //setPane(null)
  }


  useEffect(() => {
    //setPane(null)
    setOpen(false)
  }, [pathname])

  return (
    <>
      <h1 className={cn(s.logo, open && s.open, "logo")}>
        <Link href={'/'}>Bildkonst<br />sverige</Link>
      </h1>

      <nav className={cn(s.hamburger, open && s.open)}>
        <Hamburger toggled={open} toggle={() => setOpen(!open)} />
      </nav>

      <nav className={cn(s.navbar, open && s.show)}>
        <MenuPanel position={'left'} menu={menu} />
        <MenuPanel position={'right'} menu={menu} />
      </nav>
    </>
  );
}


const MenuPanel = ({ position, menu }: { position: 'left' | 'right', menu: Menu }) => {

  const pathname = usePathname()
  const panel = menu.filter((el) => el.position === position)
  const [subId, setSubId] = useState<string | null>(null)

  useEffect(() => {
    setSubId(null)
  }, [pathname])

  return (
    <>
      <ul className={cn(s.menu, s[position], subId && s.open)}>
        {panel.map(({ id, title, slug, href, sub, position: pos }, idx) =>
          <li
            key={idx}
            className={cn(pathname === slug || subId === id && s.selected)}
            onClick={(e) => sub ? setSubId(subId === id ? null : id) : setSubId(null)}
          >
            {!sub ?
              <Link href={slug ?? href}>{title}</Link>
              :
              <>
                {title}
                <ul>
                  {sub?.map(({ id, title, slug }) => (
                    <li className={cn(pathname === `/${slug}` && s.selected)} key={id}>
                      <Link href={`/${slug}`}>{title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            }
          </li>
        )}
      </ul>
      {subId &&
        <ul className={cn(s.pane, s[position], s.show)}>
          {panel.find(({ id }) => subId === id).sub?.map(({ title, slug }, idx) =>
            <li key={idx} className={cn(pathname === slug && s.selected)}>
              <Link href={slug}>{title}</Link>
            </li>
          )}
        </ul>
      }
      {subId &&
        <div className={s.paneBackground} onClick={() => setSubId(null)} />
      }
    </>
  )
}