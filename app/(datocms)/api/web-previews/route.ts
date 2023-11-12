import { webPreviews, cors } from 'next-dato-utils'
import { buildRoute } from '@lib/routes';
import { NextRequest } from 'next/server';

export const runtime = "edge"

export async function POST(req: NextRequest) {
  return await webPreviews(req, async ({ item, itemType }) => {
    return `${await buildRoute(itemType.attributes.api_key, item.attributes)}`
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