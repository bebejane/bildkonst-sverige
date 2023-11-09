import basicAuth from "@lib/dato-nextjs-utils/route-handlers/basic-auth";
import { NextResponse } from "next/server";
import { buildClient } from '@datocms/cma-client-browser';
import cors from "@lib/dato-nextjs-utils/route-handlers/cors";
import * as postmark from 'postmark';

const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN, environment: process.env.DATOCMS_ENVIRONMENT })

export const runtime = "nodejs"

export function POST(req: Request) {

  return basicAuth(req, async (req) => {
    try {

      console.log('approve-member')

      const { item, field, value } = await req.json()
      const id = item?.id

      if (!id)
        throw new Error('No id provided')

      const record = await client.items.find(id);

      if (!record)
        throw new Error('No record found with id: ' + id)

      if (value) {
        console.log('send email to: ', record.email)

        const res = await postmarkClient.sendEmailWithTemplate({
          From: process.env.POSTMARK_FROM_EMAIL,
          To: record.email as string,
          TemplateAlias: 'member-approved',
          TemplateModel: {
            sender_name: 'Bildkonst Sverige',
            name: record.contact,
            site_url: process.env.NEXT_PUBLIC_SITE_URL,
            action_url: `${process.env.NEXT_PUBLIC_SITE_URL}/logga-in`,
            password: process.env.NEXTAUTH_URL_STATIC_PASSWORD,
            support_email: 'info@bildkonst-sverige.se'
          }
        })
        console.log(res)
        if (res.ErrorCode)
          throw new Error(res.Message)
      }
      await client.items.update(id, { [field.attributes.api_key]: value })
      return NextResponse.json({ success: true });

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
