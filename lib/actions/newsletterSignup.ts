'use server'

import { buildClient } from "@datocms/cma-client-browser"
import { z } from 'zod'
import { sleep } from 'next-dato-utils'

export default async function newsletterSignup(prevState: any, formData: FormData): Promise<{ data?: string, error?: string, invalid?: any[] }> {

  try {

    const email = formData.get('email')

    try {
      z.string().email({ message: "Ogiltig e-post adress" }).parse(email as string)
    } catch (e) {
      console.log(e)
      return { error: e.message }
    }

    await sleep(2000)

    const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN })
    const itemType = (await client.itemTypes.list()).find((itemType: any) => itemType.api_key === 'member')

    return { data: 'ok' }

  } catch (e) {
    console.log(e)
    return { error: e.message }
  }
} 