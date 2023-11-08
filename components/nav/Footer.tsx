'use server'

import Link from "next/link";
import s from './Footer.module.scss'

export default async function Footer({ }: {}) {
  return (
    <footer className={s.footer}>
      <span>© 2023 BILDKONST SVERIGE</span>
      <h1><Link href={'/'}>Bildkonst<br />sverige</Link></h1>
      <span>Nyhetsbrev</span>
    </footer>
  );
}