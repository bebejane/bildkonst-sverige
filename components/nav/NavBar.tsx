'use client'

import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn } from 'next-auth/react'
import Hamburger from 'hamburger-react'
import useNextAuthSession from "@lib/hooks/useNextAuthSession";
import { Menu, MenuItem } from "@lib/menu";
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
type Props = {
  menu: Menu
}

export default function NavBar({ menu }: Props) {


  const { isPageTop, scrolledPosition } = useScrollInfo()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <h1 className={cn(s.logo, (scrolledPosition > 0 && !open) && s.onScroll, open && s.open, "logo")}>
        <Link href={'/'}>Bildkonst<br />sverige</Link>
      </h1>

      <nav className={cn(s.hamburger, open && s.open)}>
        <Hamburger toggled={open} toggle={() => setOpen(!open)} />
      </nav>

      <nav className={cn(s.desktop, open && s.show)}>
        <MenuPanel position={'left'} menu={menu} />
        <div className={s.separator} />
        <MenuPanel position={'right'} menu={menu} />
      </nav>
    </>
  );
}

const MenuPanel = ({ position, menu, }: { position: 'left' | 'right', menu: Menu }) => {

  const ref = useRef<HTMLUListElement>(null)
  const { session, error, status, refresh } = useNextAuthSession()
  const pathname = usePathname()
  const panel = menu.filter((el) => el.position === position)
  const [subId, setSubId] = useState<string | null>(null)
  const subPanel = panel?.find(({ id }) => subId === id)

  const menuItemIsOpen = (item: MenuItem) => {
    return item.slug === pathname || item.sub?.find(({ slug }) => pathname === slug) !== undefined
  }

  useEffect(() => {
    setSubId(null)
  }, [pathname])

  return (
    <>
      <ul className={cn(s.menu, s[position], subId && s.open)} ref={ref}>
        {panel.map(({ id, title, slug, href, sub, auth }, idx) =>
          <>
            <li
              key={idx}
              className={cn((menuItemIsOpen(panel[idx]) || subId === id) && s.selected)}
              onMouseEnter={(e) => { sub ? setSubId(id) : setSubId(null) }}
              onClick={(e) => { sub ? setSubId(subId === id ? null : id) : setSubId(null) }}
            >
              {!sub ?
                <Link href={slug ?? href}>{title}</Link>
                :
                auth && !session ? <>Logga in</> : <>{title}</>
              }
            </li>
          </>
        )}
        <ul className={cn(s.sub, s[position], subId === subPanel?.id && s.open)}>
          {subPanel?.auth && !session ?
            <li className={s.login}>
              <LoginForm onSuccess={() => refresh()} />
            </li>
            :
            subPanel?.sub.map(({ id, title, slug }) => (
              <li className={cn(pathname === slug && s.selectedSub)} key={id}>
                <Link href={slug}>{title}</Link>
              </li>
            ))}
        </ul>
      </ul>
    </>
  )
}


const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {

  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSignin = async (e) => {
    e.preventDefault()

    setError(null)
    setSubmitting(true)

    const url = new URLSearchParams(window.location.search).get('callbackUrl')
    const formData = new FormData(e.target)

    signIn('credentials', {
      redirect: false,
      username: formData.get('email'),
      password: formData.get('password'),
    }).then((result) => {
      console.log(result)
      onSuccess()
    }).catch((error) => {
      setError('Något gick fel, försök igen')
    }).finally(() => {
      setSubmitting(false)
    })
  }

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error')
    if (error === 'CredentialsSignin')
      setError('Felaktigt användarnamn eller lösenord')
  }, [])

  return (
    <>
      <form method="POST" onSubmit={handleSignin} className={cn(s.loginForm, submitting && s.submitting)}>
        <input id="email" name="email" type="email" placeholder="E-post" />
        <input id="password" name="password" type="password" placeholder="Lösenord" />
        <button onClick={(e) => e.stopPropagation()}>Logga in</button>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </>
  );
}