'use server'

import Link from "next/link";
import s from './Footer.module.scss'

export default async function Footer({ }: {}) {
  return (
    <footer className={s.footer}>
      <div><span>© 2023 Bildkonst Sverige</span></div>
      <h1 className="logo"><Link href={'/'}>Bildkonst<br />sverige</Link></h1>
      <div><span>Nyhetsbrev</span><span>Kontakt</span></div>
    </footer>
  );
}