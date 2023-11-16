import { apiQuery } from 'next-dato-utils'
import { MetadataRoute } from 'next'
import { SiteMapDocument } from '@graphql'

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
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const { allAbouts, allPolitics } = await apiQuery<SiteMapQuery, SiteMapQueryVariables>(SiteMapDocument, {
    all: true,
    variables: {
      first: 100,
      skip: 0
    }
  })

  return [
    ...staticRoutes,
    ...allAbouts.map(({ slug, _updatedAt }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: 'monthly',
      priority: 1,
    })) as MetadataRoute.Sitemap,
    ...allPolitics.map(({ slug, _updatedAt, category: { slug: categorySlug } }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: 'weekly',
      priority: 1,
    })) as MetadataRoute.Sitemap
  ]
}