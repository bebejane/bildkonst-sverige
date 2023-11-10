'use client'

import s from './LoginForm.module.scss'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginForm() {

  const [error, setError] = useState<string | null>(null)

  const handleSignin = async (e) => {
    e.preventDefault()

    setError(null)

    const url = new URLSearchParams(window.location.search).get('callbackUrl')
    const callbackUrl = url?.endsWith('/medlem/logga-ut') ? undefined : url ?? '/medlem'
    const formData = new FormData(e.target)

    signIn('credentials', {
      callbackUrl,
      username: formData.get('email'),
      password: formData.get('password'),
    }).then((response) => {
      if (response.error) {
        setError('Felaktigt användarnamn eller lösenord')
      }
    })
      .catch((error) => {
        setError('Något gick fel, försök igen')
      })

  }

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error')
    if (error === 'CredentialsSignin')
      setError('Felaktigt användarnamn eller lösenord')
  }, [])

  return (
    <div className="structured grid">
      <form method="POST" onSubmit={handleSignin}>
        <input id="email" name="email" type="email" placeholder="E-post" />
        <input id="password" name="password" type="password" placeholder="Lösenord" />
        <button type="submit">Login</button>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}