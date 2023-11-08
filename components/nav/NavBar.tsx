'use client'

import Link from "next/link";
import cn from 'classnames'
import s from './NavBar.module.scss'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, getSession } from 'next-auth/react'
import Hamburger from 'hamburger-react'
import useNextAuthSession from "@lib/hooks/useNextAuthSession";
import { Menu } from "@lib/menu";
import { Session } from "next-auth";

type Props = {
  menu: Menu
}

export default function NavBar({ menu }: Props) {


  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

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


const MenuPanel = ({ position, menu, }: { position: 'left' | 'right', menu: Menu }) => {

  const { session, error, status, refresh } = useNextAuthSession()
  const pathname = usePathname()
  const [subId, setSubId] = useState<string | null>(null)
  const panel = menu.filter((el) => el.position === position)
  const subPanel = panel?.find(({ id }) => subId === id)

  useEffect(() => {
    setSubId(null)
  }, [pathname])

  return (
    <>
      <ul className={cn(s.menu, s[position], subId && s.open)}>
        {panel.map(({ id, title, slug, href, sub, auth }, idx) =>
          <li
            key={idx}
            className={cn(pathname === slug || subId === id && s.selected)}
            onClick={(e) => sub ? setSubId(subId === id ? null : id) : setSubId(null)}
          >
            {!sub ?
              <Link href={slug ?? href}>{title}</Link>
              :
              <>
                {auth && !session ? 'Logga in' : title}
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
      {subPanel &&
        <ul className={cn(s.pane, s[position], s.show)}>
          {subPanel.auth && !session ?
            <li className={s.login}>
              <LoginForm onSuccess={refresh} />
            </li>
            : subPanel.sub.map(({ title, slug }, idx) =>
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


const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {

  const [error, setError] = useState<string | null>(null)

  const handleSignin = async (e) => {
    e.preventDefault()

    setError(null)
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
    })
  }

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error')
    if (error === 'CredentialsSignin')
      setError('Felaktigt användarnamn eller lösenord')
  }, [])

  return (
    <>
      <form method="POST" onSubmit={handleSignin} className={s.loginForm}>
        <input id="email" name="email" type="email" placeholder="E-post" />
        <input id="password" name="password" type="password" placeholder="Lösenord" />
        <button>Logga in</button>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </>
  );
}