'use server'

import { buildClient } from "@datocms/cma-client-browser"
import { z } from 'zod'
import { sleep } from 'dato-nextjs-utils/utils'

const NewsletterForm = z.object({
  email: z.string().email({ message: "Ogiltig e-post adress" }),
})

type NewsletterForm = z.infer<typeof NewsletterForm>;

export default async function newsletterSignup(prevState: any, formData: FormData): Promise<{ data?: string, error?: string, invalid?: any[] }> {

  try {

    const email = formData.get('email')
    console.log(email)

    await sleep(3000)

    const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN })
    const itemType = (await client.itemTypes.list()).find((itemType: any) => itemType.api_key === 'member')

    return { data: 'ok' }

  } catch (e) {
    console.error(e)
    return { error: e.message }
  }
} 