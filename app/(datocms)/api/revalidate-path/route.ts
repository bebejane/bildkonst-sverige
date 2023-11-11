
import revalidatePath from '@lib/dato-nextjs-utils/route-handlers/revalidate-path';
import { buildRoute } from '@lib/routes'

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  return await revalidatePath(req, async (record, revalidate) => {
    const { api_key } = record.model;
    const paths = [await buildRoute(api_key, record)]
    return revalidate(paths)
  })
}