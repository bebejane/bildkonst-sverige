import { basicAuth, cors } from 'next-dato-utils/route-handlers';
import { NextResponse } from "next/server";
import { buildClient } from '@datocms/cma-client-browser';
import { sendMail } from '@lib/postmark';

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})

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

        const mail = (await client.items.list({ filter: { type: 'mail' } }))?.[0]
        if (!mail)
          throw new Error('No mail template texts found')

        await sendMail(record.email as string, 'member-approved', {
          welcome: mail.welcome,
          name: record.contact,
          action_url: `${process.env.NEXT_PUBLIC_SITE_URL}/logga-in`,
          password: process.env.NEXTAUTH_URL_STATIC_PASSWORD
        })
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
