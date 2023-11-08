import basicAuth from "@lib/dato-nextjs-utils/route-handlers/basic-auth";
import { NextResponse } from "next/server";
import { buildClient } from '@datocms/cma-client-browser';

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})

export const runtime = "edge"

export function POST(req: Request) {

  return basicAuth(req, async (req) => {
    try {

      console.log('approve-member')

      const item = await req.json()
      const id = item?.entity?.id

      if (!id)
        throw new Error('No id provided')
      const record = await client.items.find(id);

      if (!record)
        throw new Error('No record found with id: ' + id)

      if (record.approved)
        console.log('send email to: ', record.email)

      return NextResponse.json({ success: true });

    } catch (e) {
      console.log(e.message)
      return NextResponse.json({ success: false, error: e.message });
    }
  });
}