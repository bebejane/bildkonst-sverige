'use server';

import { revalidateTag } from 'next/cache'

export default async function revalidate(tag: string | string[]) {
  (Array.isArray(tag) ? tag : [tag]).forEach(tag => {
    revalidateTag(tag)
  })
}