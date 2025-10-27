'use server';

import Article from '@/components/Article';
import { AllNewsDocument, NewsDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NewsPage({ params }) {
	const slug = (await params).news;
	const { news } = await apiQuery(NewsDocument, {
		variables: { slug },
	});

	if (!news) return notFound();

	const { id, title, intro, image, content, _publishedAt } = news;

	return (
		<>
			<Article
				id={id}
				title={title}
				intro={intro}
				image={image as FileField}
				content={content}
				publishedAt={_publishedAt}
			/>
			<Link href={'/medlem/aktuellt'}>
				<button>Tillbaka till Aktuellt</button>
			</Link>
		</>
	);
}

export async function generateStaticParams() {
	const { allNews } = await apiQuery(AllNewsDocument, {
		all: true,
	});
	return allNews.map(({ slug: news }) => ({ news }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const slug = (await params).news;
	const { news } = await apiQuery(NewsDocument, {
		variables: { slug },
	});

	return {
		title: news.title,
	} as Metadata;
}
