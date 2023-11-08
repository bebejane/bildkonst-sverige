'use client'

import { useEffect, useState } from 'react'
import s from './page.module.scss'
import { signIn } from 'next-auth/react'
import { Article } from '@components'

export default function Login() {

  const [error, setError] = useState<string | null>(null)

  const handleSignin = async (e) => {
    e.preventDefault()

    setError(null)

    const url = new URLSearchParams(window.location.search).get('callbackUrl')
    const callbackUrl = url?.endsWith('/medlem/logga-ut') ? undefined : url ?? '/medlem'
    const formData = new FormData(e.target)
    const result = await signIn('credentials', {
      callbackUrl,
      username: formData.get('email'),
      password: formData.get('password'),
    }).catch((error) => {
      setError('Något gick fel, försök igen')
    })

  }

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error')
    if (error === 'CredentialsSignin')
      setError('Felaktigt användarnamn eller lösenord')
  }, [])

  return (
    <Article id={'login'} title="Logga in">
      <form method="POST" onSubmit={handleSignin}>
        <input id="email" name="email" type="email" placeholder="E-post" />
        <input id="password" name="password" type="password" placeholder="Lösenord" />
        <button>Logga in</button>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </Article>
  );
}