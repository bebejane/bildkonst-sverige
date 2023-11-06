import { NextRequest } from 'next/server';
import webPreviews from '@lib/dato-nextjs-utils/route-handlers/web-previews'
import cors from '@lib/dato-nextjs-utils/route-handlers/cors'
import { apiQuery } from '@lib/client';
import { PoliticCategoryDocument } from '@graphql';

export const runtime = "edge"

export async function POST(req: NextRequest) {

  return await webPreviews(req, async ({ item, itemType, locale }) => {

    let path = null;

    const { slug } = item.attributes

    switch (itemType.attributes.api_key) {
      case 'start':
        path = `/`
        break;
      case 'politic':
        const { politicCategory } = await apiQuery<PoliticCategoryQuery, PoliticCategoryQueryVariables>(PoliticCategoryDocument, { variables: { id: item.attributes.politicCategory } })
        path = `/${politicCategory.slug}/${slug}`
        break;
      case 'politic_category':
        path = `/${slug}`
        break;
      case 'contact':
        path = `/kontakt`
        break;
      case 'about':
        path = `/om-oss`
        break;
      case 'board':
        path = `/styrelse`
        break;
      case 'membership':
        path = `/bli-medlem`
        break;
      default:
        break;
    }

    return path
  })
}

export async function OPTIONS(req: Request) {

  return await cors(req, new Response('ok', { status: 200 }), {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false
  })
}