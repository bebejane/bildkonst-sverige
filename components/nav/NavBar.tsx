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
      <h1 className={cn(s.logo, open && s.open, "logo")}>
        <Link href={'/'}>Bildkonst<br />sverige</Link>
      </h1>

      <nav className={cn(s.hamburger, open && s.open)}>
        <Hamburger toggled={open} toggle={() => setOpen(!open)} />
      </nav>

      <nav className={cn(s.navbar, open && s.show)}>
        <MenuPanel pane={pane} position={'left'} menu={menu} setPane={setPane} />
        <MenuPanel pane={pane} position={'right'} menu={menu} setPane={setPane} />
      </nav>

    </>
  );
}


const MenuPanel = ({ pane, position, menu, setPane }: { pane: 'left' | 'right', position: 'left' | 'right', menu: Menu, setPane: Dispatch<SetStateAction<"left" | "right">> }) => {

  const pathname = usePathname()

  return (
    <ul className={cn(s.menu, s[position], pane === position && s.open)}>
      {menu.filter((el) => el.position === position).map(({ id, title, slug, href, sub, position: pos }, idx) =>
        <li
          key={idx}
          className={cn(pane === pos && s.selected)}
          onClick={(e) => setPane(pane === pos ? null : pos)}
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
  )

}