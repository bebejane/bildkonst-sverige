import { buildClient } from "@datocms/cma-client-browser"

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN,
  environment: process.env.DATOCMS_ENVIRONMENT
})

type Routes = {
  [key: string]: Route
}

type Route = {
  path: ((item?: any) => Promise<string | null>)
  typeName: string
}

const routes: Routes = {
  "start": {
    typeName: "StartRecord",
    path: async (item) => '/'
  },
  "politic": {
    typeName: "PoliticRecord",
    path: async (item) => {
      const politic_category = await client.items.find(item.category)
      return `/${politic_category.slug}/${item.slug}`
    }
  },
  "politic_category": {
    typeName: "PoliticCategoryRecord",
    path: async (item) => `/${item.slug}`
  },
  "about": {
    typeName: "AboutRecord",
    path: async (item) => `/om-oss/${item.slug}`
  },
  "contact_page": {
    typeName: "ContactPageRecord",
    path: async (item) => `/kontakt`
  },
  "member_page": {
    typeName: "MemberPageRecord",
    path: async (item) => `/bli-medlem`
  },
  "member_level": {
    typeName: "MemberLevelRecord",
    path: async (item) => '/bli-medlem'
  },
  "member": {
    typeName: "MemberRecord",
    path: async (item) => null
  },
  "news": {
    typeName: "NewsRecord",
    path: async (item) => `/medlem/aktuellt/${item.slug}`
  },
  "tool": {
    typeName: "ToolRecord",
    path: async (item) => `/medlem/verktygslada/${item.slug}`
  },
  "staff": {
    typeName: "StaffRecord",
    path: async (item) => '/kontakt'
  },
  "site": {
    typeName: "SiteRecord",
    path: async (item) => '/'
  },
  "resource": {
    typeName: "ResourceRecord",
    path: async (item) => '/medlem/resurser'
  },
}

export const buildRoute = async (model: string, item?: any): Promise<string> => {
  if (!routes[model]) throw new Error(`Invalid model: ${model}`)
  return await routes[model].path(item)
}

export const recordToRoute = async (record: any): Promise<string> => {
  const { __typename } = record
  const model = Object.keys(routes).find(key => routes[key].typeName === __typename)
  if (!model) throw new Error(`Invalid record: ${__typename}`)
  return await buildRoute(model, record)
}

export default routes