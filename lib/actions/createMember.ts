'use server'

import { buildClient } from "@datocms/cma-client-browser"
import { sendMail } from "@lib/postmark"
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

export default async function createMember(prevState: any, formData: FormData): Promise<{ data?: any, error?: string, invalid?: any[] }> {

  try {

    const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN })
    const itemTypes = await client.itemTypes.list()
    const memberItemTypeId = itemTypes.find((itemType: any) => itemType.api_key === 'member')?.id
    const data = {}

    Object.keys(MemberForm.strict().shape).forEach((key) => data[key] = formData.get(key))

    try {
      MemberForm.parse(data)
    } catch (e) {
      const invalid = JSON.parse(e.message) as any[]
      return { invalid }
    }

    const mail = (await client.items.list({ filter: { type: 'mail' } }))?.[0]

    if (!mail)
      throw new Error('No mail template texts found')

    const record = await client.items.create({
      item_type: {
        type: 'item_type',
        id: memberItemTypeId
      },
      ...data
    })

    await sendMail(record.email as string, 'member-confirmation', {
      name: record.contact,
      confirmation: mail.confirmation
    })

    return { data: record }

  } catch (e) {
    console.error(e)
    return { error: e.message }
  }
} 