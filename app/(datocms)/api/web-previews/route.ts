import { NextRequest } from 'next/server';
import webPreviews from '@lib/dato-nextjs-utils/route-handlers/web-previews'
import cors from '@lib/dato-nextjs-utils/route-handlers/cors'
import { buildRoute } from '@lib/routes';

export const runtime = "edge"

export async function POST(req: NextRequest) {
  return await webPreviews(req, async ({ item, itemType }) => {
    return await buildRoute(itemType.attributes.api_key, item)
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