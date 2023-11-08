import basicAuth from "@lib/dato-nextjs-utils/route-handlers/basic-auth";
import { NextRequest, NextResponse } from "next/server";
import { buildClient } from '@datocms/cma-client-browser';

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})


export default function POST(req: Request) {
  return basicAuth(req, async (req) => {
    try {
      const { id } = (await req.formData()).get('entity') as any;
      console.log(id)
      const record = await client.items.find(id);
      console.log(record)
      if (!record)
        return NextResponse.json({ success: false, message: 'Record not found' });


      if (record.approved)
        console.log('send email to: ', record.email)

      return NextResponse.json({ success: true });

    } catch (e) {
      console.log(e.message)
      return NextResponse.json({ success: false, error: e.message });
    }
  });
}