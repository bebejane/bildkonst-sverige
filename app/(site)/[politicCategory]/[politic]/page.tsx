'use server';

import { AllPoliticDocument, PoliticDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Article from '@/components/Article';
import { Metadata } from 'next';

export default async function Page({ params }) {
	const slug = (await params).politic;
	const { politic, draftUrl } = await apiQuery(PoliticDocument, {
		variables: { slug },
	});

	if (!politic) return notFound();

	const { id, title, intro, image, content, category, _createdAt } = politic;

	return (
		<>
			<Article
				id={id}
				title={title}
				intro={intro}
				image={image as FileField}
				content={content}
				publishedAt={_createdAt}
			>
				<Link href={`/${category.slug}`}>
					<button>Visa alla {category.titlePlural}</button>
				</Link>
			</Article>
			<DraftMode url={draftUrl} tag={id} />
		</>
	);
}

export async function generateStaticParams() {
	const { allPolitics } = await apiQuery(AllPoliticDocument, {
		all: true,
	});
	return allPolitics.map(({ slug: politic }) => ({ politic }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const slug = (await params).politic;
	const { politic } = await apiQuery(PoliticDocument, {
		variables: { slug },
	});

	if (!politic) return notFound();

	return {
		title: politic.title,
	} as Metadata;
}
