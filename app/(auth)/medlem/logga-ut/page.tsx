'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default async function Logout() {

  useEffect(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <article>
      <p>
        Loggar ut...
      </p>
    </article>
  )
}