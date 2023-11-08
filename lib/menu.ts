'use server'

import { apiQuery } from '@lib/client';
import { MenuDocument } from '@graphql';

export type MenuItem = {
  id: string,
  title: string,
  slug?: string,
  href?: string,
  sub?: MenuItem[],
  position?: 'left' | 'right'
}

export type Menu = MenuItem[]

export const buildMenu = async (): Promise<Menu> => {
  const { allPoliticCategories, allAbouts } = await apiQuery<MenuQuery, MenuQueryVariables>(MenuDocument)
  const menu: Menu = [{
    id: 'politic',
    title: 'Kulturpolitik',
    sub: allPoliticCategories,
    position: 'left'
  }, {
    id: 'about',
    title: 'Om oss',
    sub: allAbouts,
    position: 'left'
  }, {
    id: 'membership',
    title: 'Medlemskap',
    slug: '/bli-medlem',
    position: 'left'
  }, {
    id: 'instagram',
    title: 'Instagram',
    href: 'https://www.instagram.com',
    position: 'right'
  }, {
    id: 'facebook',
    title: 'Facebook',
    href: 'https://www.facebook.com',
    position: 'right'
  }, {
    id: 'member',
    title: 'Medlemssidor',
    sub: [{
      id: 'news',
      title: 'Aktuellt',
      slug: '/medlem/aktuellt'
    }, {
      id: 'tools',
      title: 'Verktygslåda',
      slug: '/medlem/verktygslada'
    },
    {
      id: 'logout',
      title: 'Logga ut',
      slug: '/medlem/logga-ut'
    }],
    position: 'right'
  }]
  return menu
}
