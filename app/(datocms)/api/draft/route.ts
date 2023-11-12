import { draft } from 'next-dato-utils'

export const dynamic = 'force-dynamic'
export const runtime = "edge"

export async function GET(request: Request) {
  return await draft(request)
}