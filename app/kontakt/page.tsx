'use server'

import { StructuredContent } from '@components';
import s from './page.module.scss'
import { ContactDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { draftMode } from 'next/headers';
import { Image } from 'react-datocms';

export default async function Contact() {

  const { contact } = await apiQuery<ContactQuery, ContactQueryVariables>(ContactDocument, { includeDrafts: draftMode().isEnabled })

  return (
    <>
      <h1>Kontakt</h1>
      <StructuredContent content={contact.intro} id={contact.id} />
      <ul>
        {contact.staff.map((staff) => (
          <li key={staff.id}>
            <Image data={staff.image.responsiveImage} />
            <h2>{staff.name}</h2>
            <p>{staff.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}