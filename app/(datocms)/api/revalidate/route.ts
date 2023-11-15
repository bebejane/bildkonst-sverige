
import { buildRoute } from '@lib/routes';
import { revalidate } from 'next-dato-utils'

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {

  return await revalidate(req, async (payload, revalidate) => {

    const { api_key, entity, event_type, entity_type } = payload;
    const { id, attributes } = entity
    const paths: string[] = []
    const tags: string[] = [id]

    paths.push(await buildRoute(api_key, attributes))

    switch (api_key) {
      default:
        break;
    }
    api_key && tags.push(api_key)
    return revalidate(paths, tags)
  })
}