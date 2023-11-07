'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default async function Logout() {

  useEffect(() => {
    setTimeout(() => signOut({
      callbackUrl: '/'
    }), 1000)
  }, [])

  return (
    <article>
      Loggar ut...
    </article>
  )
}