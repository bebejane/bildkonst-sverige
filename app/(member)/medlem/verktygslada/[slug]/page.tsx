'use server'

import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";

export default async function NewsPage() {

  //const { about } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument)

  return (
    <article className={s.container}>

    </article>
  );
}