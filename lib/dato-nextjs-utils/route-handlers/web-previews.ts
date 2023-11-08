import { NextRequest, NextResponse } from "next/server";
import cors from './cors'

export type PreviewLink = {
  label: string
  url: string
}


export default async function webPreviews(req: NextRequest, generatePreviewUrl: (record: WebhookPayload) => Promise<string | null>): Promise<Response> {

  if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.SITE_URL)
    throw new Error('NEXT_PUBLIC_SITE_URL is not set in .env')

  if (!process.env.DATOCMS_PREVIEW_SECRET)
    throw new Error('DATOCMS_PREVIEW_SECRET is not set in .env')

  const payload: WebhookPayload = await req.json()

  if (!payload)
    throw new Error('No form data in request body')

  const previewLinks = []
  let path = await generatePreviewUrl(payload);
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  const isExternal = path?.startsWith('https://')

  if (isExternal && path) {
    const url = new URL(path)
    baseUrl = url.origin
    path = url.pathname
  }

  if (path) {
    previewLinks.push({ label: 'Live', url: `${baseUrl}${path}` })
    previewLinks.push({ label: 'Draft', url: `${baseUrl}/api/draft?slug=${path}&secret=${process.env.DATOCMS_PREVIEW_SECRET}` })
  }

  return new Response(JSON.stringify({ previewLinks }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export type WebhookPayload = {
  item: {
    id: string
    type: string
    attributes: any
    relationships: {
      item_type: {
        data: {
          id: string
          type: string
        }
      }
      creator: {
        data: {
          id: string
          type: string
        }
      }
    }
    meta: {
      created_at: string
      updated_at: string
      published_at: string
      publication_scheduled_at: any
      unpublishing_scheduled_at: any
      first_published_at: string
      is_valid: boolean
      is_current_version_valid: boolean
      is_published_version_valid: boolean
      status: string
      current_version: string
      stage: any
    }
  }
  itemType: {
    id: string
    type: string
    attributes: {
      name: string
      singleton: boolean
      sortable: boolean
      api_key: string
      ordering_direction: any
      ordering_meta: any
      tree: boolean
      modular_block: boolean
      draft_mode_active: boolean
      all_locales_required: boolean
      collection_appearance: string
      has_singleton_item: boolean
      hint: any
      inverse_relationships_enabled: boolean
    }
    relationships: {
      fields: {
        data: Array<{
          id: string
          type: string
        }>
      }
      fieldsets: {
        data: Array<any>
      }
      singleton_item: {
        data: any
      }
      ordering_field: {
        data: any
      }
      title_field: {
        data: {
          id: string
          type: string
        }
      }
      image_preview_field: {
        data: {
          id: string
          type: string
        }
      }
      excerpt_field: {
        data: any
      }
      workflow: {
        data: any
      }
    }
    meta: {
      has_singleton_item: boolean
    }
  }
  environmentId: string
  locale: string
  currentUser: {
    id: string
    type: string
    attributes: {
      full_name: string
      is_2fa_active: boolean
      is_active: boolean
      email: string
    }
    relationships: {
      role: {
        data: {
          id: string
          type: string
        }
      }
    }
    meta: {
      last_access: string
    }
  }
}
