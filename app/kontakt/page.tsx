'use server'

import s from './page.module.scss'
import { AboutDocument } from "@graphql";
import { apiQuery } from "@lib/client";

export default async function Contact() {

  //const { about } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument)

  return (
    <section className={s.container}>
      contact page
    </section>
  );
}