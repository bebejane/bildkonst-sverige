'use client'

import s from './page.module.scss'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { sleep } from 'next-dato-utils'

export default function Logout() {

  useEffect(() => {
    const logout = async () => {
      await sleep(500)
      signOut({ callbackUrl: '/' }).then(() => {
        console.log('Sign out success')
      }).catch((error) => {
        console.error('Sign out error', error)
      })
    }
    logout()

  }, [])

  return (
    <article className={s.article}>
      <p>
        Loggar ut...
      </p>
    </article>
  )
}