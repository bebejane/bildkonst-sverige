'use server'

import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "next-dato-utils";

export default async function Member() {

  return (
    <article className={s.container}>
      Medlemssida
    </article>
  );
}