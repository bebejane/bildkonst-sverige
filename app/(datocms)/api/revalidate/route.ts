
import revalidate from '@lib/dato-nextjs-utils/route-handlers/revalidate';
import { buildRoute } from '@lib/routes'

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  return await revalidate(req, async (record, revalidate) => {
    const { event_type } = record;
    const { api_key } = record.model;
    return revalidate([await buildRoute(api_key, record)], [record.id])
  })
}