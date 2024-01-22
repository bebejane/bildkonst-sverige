'use server'

import { apiQuery } from 'next-dato-utils';
import { MenuDocument } from '@graphql';

export type MenuItem = {
  id: string,
  title: string,
  slug?: string,
  href?: string,
  parentSlug?: string,
  sub?: MenuItem[],
  auth?: boolean,
  position?: 'left' | 'right'
}

export type Menu = MenuItem[]

export const buildMenu = async (): Promise<Menu> => {
  const { allPoliticCategories, allAbouts } = await apiQuery<MenuQuery, MenuQueryVariables>(MenuDocument, {
    tags: ['politic_category', 'about']
  })

  const menu: Menu = [{
    id: 'politic',
    title: 'Kulturpolitik',
    sub: allPoliticCategories.map(({ id, slug, title }) => ({ id, title, slug: `/${slug}` })),
    position: 'left'
  }, {
    id: 'about',
    title: 'Om oss',
    sub: [...allAbouts.map(({ id, slug, title }) => ({ id, title, slug: `/om-oss/${slug}` })), {
      id: 'contact',
      title: 'Kontakt',
      slug: '/kontakt'
    }],
    position: 'left'
  }, {
    id: 'membership',
    title: 'Medlemskap',
    slug: '/bli-medlem',
    position: 'left'
  }, {
    id: 'member',
    title: 'Medlemssidor',
    auth: true,
    sub: [{
      id: 'news',
      title: 'Aktuellt',
      slug: '/medlem/aktuellt'
    }, /*{
      id: 'tools',
      title: 'Verktygslåda',
      slug: '/medlem/verktygslada'
    }, */{
      id: 'resources',
      title: 'Resurser',
      slug: '/medlem/resurser'
    },
    {
      id: 'logout',
      title: 'Logga ut',
      slug: '/medlem/logga-ut'
    }],
    position: 'right'
  }, {
    id: 'newsletter',
    title: 'Nyhetsbrev',
    slug: "#",
    position: 'right'
  }, {
    id: 'instagram',
    title: 'Instagram',
    href: 'https://www.instagram.com/bildkonstsverige',
    position: 'right'
  }]
  return menu
}
