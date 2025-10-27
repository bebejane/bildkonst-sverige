import { SiteMapDocument } from '@/graphql';
import { MetadataRoute } from 'next';
import { apiQuery } from 'next-dato-utils/api';
import {
	DatoCmsConfig,
	getItemReferenceRoutes,
	getUploadReferenceRoutes,
	getItemWithLinked,
} from 'next-dato-utils/config';

export default {
	routes: {
		start: async () => ['/'],
		politic: async ({ id }) => {
			const r = await getItemWithLinked(id);
			return [`/${r.category.slug}/${r.slug}`];
		},
		politic_category: async (record) => [`/${record.slug}`, ...(await getItemReferenceRoutes(record.id))],
		about: async (record) => [`/om-oss/${record.slug}`],
		contact_page: async (record) => ['/kontakt'],
		member_page: async (record) => ['/bli-medlem'],
		member_level: async (record) => ['/bli-medlem'],
		member: async (record) => null,
		mail: async (record) => ['/bli-medlem'],
		news: async (record) => [`/medlem/aktuellt/${record.slug}`, ...(await getItemReferenceRoutes(record.id))],
		news_category: async (record) => [`/medlem/aktuellt`, ...(await getItemReferenceRoutes(record.id))],
		toolbox: async (record) => ['/medlem/verktygslada'],
		staff: async (record) => ['/kontakt'],
		resource: async (record) => ['/medlem/resurser'],
		resource_category: async (record) => ['/medlem/resurser'],
		resource_theme: async (record) => ['/medlem/resurser'],
		upload: async (record) => await getUploadReferenceRoutes(record.id, this),
	},
	manifest: async () => {
		return {
			name: 'Bildkonst Sverige',
			short_name: 'Bildkonst Sverige',
			description: 'Bildkonst Sverige',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#ff7a00',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	sitemap: async () => {
		const staticRoutes: MetadataRoute.Sitemap = [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
				lastModified: new Date(),
				changeFrequency: 'daily',
				priority: 1,
			},
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/bli-medlem`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 1,
			},
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/kontakt`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 1,
			},
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/logga-in`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 1,
			},
		];

		const { allAbouts, allPolitics } = await apiQuery<SiteMapQuery, SiteMapQueryVariables>(SiteMapDocument, {
			all: true,
			variables: {
				first: 100,
				skip: 0,
			},
		});

		return [
			...staticRoutes,
			...(allAbouts.map(({ slug, _updatedAt }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss/${slug}`,
				lastModified: new Date(_updatedAt),
				changeFrequency: 'monthly',
				priority: 1,
			})) as MetadataRoute.Sitemap),
			...(allPolitics.map(({ slug, _updatedAt, category: { slug: categorySlug } }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${slug}`,
				lastModified: new Date(_updatedAt),
				changeFrequency: 'weekly',
				priority: 1,
			})) as MetadataRoute.Sitemap),
		];
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
				disallow: '/medlem/',
			},
		};
	},
} satisfies DatoCmsConfig;
