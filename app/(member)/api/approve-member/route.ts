import basicAuth from "@lib/dato-nextjs-utils/route-handlers/basic-auth";
import { NextResponse } from "next/server";
import { buildClient } from '@datocms/cma-client-browser';
import cors from "@lib/dato-nextjs-utils/route-handlers/cors";

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})

export const runtime = "edge"

export function POST(req: Request) {

  return basicAuth(req, async (req) => {
    try {

      console.log('approve-member')

      const { item, field } = await req.json()
      const id = item?.id

      if (!id)
        throw new Error('No id provided')

      const record = await client.items.find(id);

      if (!record)
        throw new Error('No record found with id: ' + id)

      if ((record[field.attributes.api_key] as boolean) === false) {
        console.log('send email to: ', record.email)
        await client.items.update(id, { [field.attributes.api_key]: true })
        return NextResponse.json({ success: true });
      } else {
        console.log('member not approved: ', record.email)
        return NextResponse.json({ success: false });
      }

    } catch (e) {
      console.log(e.message)
      return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
  });
}

export function OPTIONS(req: Request) {

  return cors(req, new Response('ok', { status: 200 }), {
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false
  })
}
