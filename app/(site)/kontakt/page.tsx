'use server'

import s from './page.module.scss'
import Article from '@components/Article';
import { ContactDocument } from "@graphql";
import { apiQuery, DraftMode } from "next-dato-utils";
import { draftMode } from 'next/headers';
import { Image, Metadata } from 'react-datocms';
import { notFound } from 'next/navigation';

export default async function Contact() {

  const { contactPage, draftUrl } = await apiQuery<ContactQuery, ContactQueryVariables>(ContactDocument)

  if (!contactPage)
    return notFound()

  const { id, title, staff, intro } = contactPage

  return (
    <>
      <Article id={id} title={title} intro={intro}>
        <ul className={s.staff}>
          {staff.map((staff) => (
            <li key={staff.id}>
              <figure>
                <Image data={staff.image.responsiveImage} />
              </figure>
              <h3>{staff.name}</h3>
              <p>{staff.description}</p>
              <p>
                <a href={`mailto:${staff.email}`}>{staff.email}</a>
              </p>
            </li>
          ))}
        </ul>
      </Article>
      <DraftMode url={draftUrl} tag={id} />
    </>
  );
}

export async function generateMetadata({ params }) {

  return {
    title: 'Kontakt',
  } as Metadata
}

