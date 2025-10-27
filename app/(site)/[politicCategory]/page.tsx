'use server';

import s from './page.module.scss';
import { AllPoliticByCategoryDocument, AllPoliticCategoriesDocument, PoliticCategoryDocument } from '@/graphql';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { render as structuredToText } from 'datocms-structured-text-to-plain-text';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from '@/components/Image';
import cn from 'classnames';
import { Metadata } from 'next';

export default async function Page({ params }) {
	const slug = (await params).politicCategory;
	const { politicCategory } = await apiQuery(PoliticCategoryDocument, {
		variables: { slug },
	});

	if (!politicCategory) return notFound();

	const { allPolitics, draftUrl } = await apiQuery(AllPoliticByCategoryDocument, {
		variables: { id: politicCategory.id },
		all: true,
	});

	return (
		<>
			<article>
				<h3>{politicCategory.title}</h3>
				{allPolitics.length > 0 ? (
					<ul className={s.articles}>
						{allPolitics.map(({ id, title, image, intro, slug, category, _createdAt }) => (
							<li key={id}>
								<Link href={`/${category.slug}/${slug}`}>
									<h2>{title}</h2>
									<div className='grid'>
										<div className={cn(s.content, 'intro', image && s.image)}>
											<span className='date'>{format(new Date(_createdAt), 'yyyy-MM-dd')}</span>
											<p>{structuredToText(intro as any)}</p>
										</div>
										{image && (
											<figure>
												<Image data={image.responsiveImage} />
											</figure>
										)}
									</div>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p>Det finns inga poster i den här kategorin</p>
				)}
			</article>
			<DraftMode url={draftUrl} tag={politicCategory.id} />
		</>
	);
}

export async function generateStaticParams() {
	const { allPoliticCategories } = await apiQuery(AllPoliticCategoriesDocument, {
		all: true,
	});
	return allPoliticCategories.map(({ slug: politicCategory }) => ({ politicCategory }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const slug = (await params).politicCategory;
	const { politicCategory } = await apiQuery(PoliticCategoryDocument, {
		variables: { slug },
	});
	if (!politicCategory) return notFound();

	return {
		title: politicCategory.title,
	} as Metadata;
}
