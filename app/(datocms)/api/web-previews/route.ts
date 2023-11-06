import { NextRequest } from 'next/server';
import webPreviews from '@lib/dato-nextjs-utils/route-handlers/web-previews'
import cors from '@lib/dato-nextjs-utils/route-handlers/cors'
import { buildClient } from '@datocms/cma-client-browser';
import { PoliticCategoryDocument } from '@graphql';

const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN })

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
        const politic_category = await client.items.find(item.attributes.category)
        path = `/${politic_category.slug}/${slug}`
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