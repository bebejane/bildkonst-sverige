'use server'

import { StructuredContent } from '@components';
import s from './page.module.scss'
import { BoardDocument } from "@graphql";
import { apiQuery } from "@lib/client";
import { draftMode } from 'next/headers';
import { Image } from 'react-datocms';

export default async function Contact() {

  const { board } = await apiQuery<BoardQuery, BoardQueryVariables>(BoardDocument, { includeDrafts: draftMode().isEnabled })

  return (
    <>
      <h1>Styrelse</h1>
      <StructuredContent content={board.intro} id={board.id} />
      <ul>
        {board.staff.map((staff) => (
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