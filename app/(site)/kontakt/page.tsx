'use server'

import { Article, StructuredContent } from '@components';
import s from './page.module.scss'
import { ContactDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { draftMode } from 'next/headers';
import { Image } from 'react-datocms';
import DraftMode from '@lib/dato-nextjs-utils/components/DraftMode';
import { notFound } from 'next/navigation';

export default async function Contact() {

  const { contact, draftUrl } = await apiQuery<ContactQuery, ContactQueryVariables>(ContactDocument, { includeDrafts: draftMode().isEnabled })

  if (!contact) return notFound()

  return (
    <>
      <Article id="contact" title="Kontakt">
        <ul>
          {contact.staff.map((staff) => (
            <li key={staff.id}>
              <figure>
                <Image data={staff.image.responsiveImage} />
              </figure>
              <h3>{staff.name}</h3>
              <p>{staff.description}</p>
            </li>
          ))}
        </ul>
      </Article>
      <DraftMode enabled={draftMode().isEnabled} draftUrl={draftUrl} tag={contact.id} />
    </>
  );
}