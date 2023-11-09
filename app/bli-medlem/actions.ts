'use server'

import { buildClient } from "@datocms/cma-client-browser"
import { z } from 'zod'

const MemberForm = z.object({
  organization: z.string().min(2, { message: "Organisationsnamn måste vara minst 2 tecken" }),
  organization_no: z.string().min(2, { message: "Organisationsnamn måste vara minst 2 tecken" }),
  contact: z.string().min(2, { message: "Kontakt person är ogiltigt" }),
  email: z.string().email({ message: "Ogiltig e-post adress" }),
  invoice_address: z.string().min(2, { message: "Fakturaadress är ogiltig" }),
  level: z.string().min(2, { message: "Medlemsnivå ID är ogiltig" }).refine(s => s !== 'false', 'Medlemsnivå är obligatorisk'),
})

type MemberForm = z.infer<typeof MemberForm>;

export async function createMember(prevState: any, formData: FormData): Promise<{ data?: any, error?: string, invalid?: any[] }> {

  try {

    const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN })
    const itemType = (await client.itemTypes.list()).find((itemType: any) => itemType.api_key === 'member')
    const data = {}

    Object.keys(MemberForm.strict().shape).forEach((key) => data[key] = formData.get(key))

    try {
      MemberForm.parse(data)
    } catch (e) {
      const invalid = JSON.parse(e.message) as any[]
      return { invalid }
    }

    const record = await client.items.create({
      item_type: {
        type: 'item_type',
        id: itemType.id
      },
      ...data
    })
    return { data: record }

  } catch (e) {
    console.error(e)
    return { error: e.message }
  }
} 