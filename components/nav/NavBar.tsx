'use server'

import Link from "next/link";
import s from './NavBar.module.scss'

export default async function NavBar({ }: {}) {
  return (
    <nav className={s.navbar}>
      <ul className={s.menu}>
        <li>Kulturpolitik</li>
        <li>Om oss</li>
        <li>Medlemskap</li>
      </ul>
      <h1>Bildkonst<br />sverige</h1>
      <ul className={s.link}>
        <li>Instagram</li>
        <li>Facebook</li>
        <li>Logga in</li>
      </ul>
    </nav>
  );
}