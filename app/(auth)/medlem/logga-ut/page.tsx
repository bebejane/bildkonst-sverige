'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default function Logout() {

  useEffect(() => {
    signOut({ callbackUrl: '/' }).catch((error) => {
      console.error('Sign out error', error)
    })
  }, [])

  return (
    <article>
      <p>
        Loggar ut...
      </p>
    </article>
  )
}