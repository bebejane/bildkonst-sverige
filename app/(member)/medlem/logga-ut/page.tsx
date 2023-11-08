'use client'

import s from './page.module.scss'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default function Logout() {

  useEffect(() => {
    signOut({ callbackUrl: '/' }).then(() => {
      console.log('Sign out success')
    }).catch((error) => {
      console.error('Sign out error', error)
    })
  }, [])

  return (
    <article className={s.article}>
      <p>
        Loggar ut...
      </p>
    </article>
  )
}