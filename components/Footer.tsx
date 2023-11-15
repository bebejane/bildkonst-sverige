'use client'

import Link from "next/link";
import s from './Footer.module.scss'
import cn from 'classnames'
import NewsletterForm from "@components/NewsLetterForm";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showNewsletter, setShowNewsletter] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('slide-up', showNewsletter)
  }, [showNewsletter])

  return (
    <>
      <footer className={s.footer}>
        <div><span>© 2023 Bildkonst Sverige</span></div>
        <h1 className="logo">
          <Link href={'/'}>Bildkonst<br />sverige</Link>
        </h1>
        <div>
          <span onClick={() => setShowNewsletter(!showNewsletter)}>
            Nyhetsbrev
          </span>
          <span><Link href="/kontakt">Kontakt</Link></span>
        </div>
      </footer>
      <div className={cn(s.newsletter, showNewsletter && s.show)}>
        <h2>Prenumerera på vårt nyhetsbrev</h2>
        <NewsletterForm />
        <button className={s.close} onClick={() => setShowNewsletter(false)}>Stäng</button>
      </div>
    </>
  );
}