'use server'

import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";

export default async function Member() {

  return (
    <article className={s.container}>
      Medlemssida
    </article>
  );
}