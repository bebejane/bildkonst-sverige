'use server';

import s from './page.module.scss';
import Article from '@components/Article';
import { ContactDocument } from '@graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Metadata } from 'react-datocms';
import Image from '@components/Image';
import { notFound } from 'next/navigation';

export default async function Contact() {
	const { contactPage, draftUrl } = await apiQuery(ContactDocument);

	if (!contactPage) return notFound();

	const { id, title, staff, intro } = contactPage;

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
	} as Metadata;
}
