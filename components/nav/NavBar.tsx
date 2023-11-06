'use client'

import Link from "next/link";
import s from './NavBar.module.scss'

export default async function NavBar({ }: {}) {
  return (
    <nav className={s.navbar}>
      <ul className={s.menu}>
        <li>Kulturpolitik</li>
        <li><Link href={'/om-oss'}>Om oss</Link></li>
        <li><Link href={'/medlemskap'}>Medlemskap</Link></li>
      </ul>
      <h1>Bildkonst<br />sverige</h1>
      <ul className={s.link}>
        <li>Instagram</li>
        <li>Facebook</li>
        <li><Link href={'logga-in'}>Logga in</Link></li>
      </ul>
    </nav>
  );
}