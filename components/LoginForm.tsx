import s from './LoginForm.module.scss'
import cn from 'classnames'
import { useState, useEffect } from "react"
import { signIn } from 'next-auth/react'

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {

  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSignin = async (e) => {
    e.preventDefault()

    setError(null)
    setSubmitting(true)

    const url = new URLSearchParams(window.location.search).get('callbackUrl')
    const formData = new FormData(e.target)

    signIn('credentials', {
      redirect: true,
      callbackUrl: '/medlem/aktuellt',
      username: formData.get('email'),
      password: formData.get('password'),
    }).then((result) => {
      if (result.status === 401)
        setError('Felaktigt användarnamn eller lösenord')
      else if (result.status !== 200)
        setError(`Något gick fel, försök igen. ${result.error}`)
      else
        onSuccess()
    }).catch((error) => {
      setError(`Något gick fel, försök igen. ${error.message ?? error}`)
    }).finally(() => {
      setSubmitting(false)
    })
  }

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error')
    if (error === 'CredentialsSignin')
      setError('Felaktigt användarnamn eller lösenord')
  }, [])

  return (
    <>
      <form
        method="POST"
        onSubmit={handleSignin}
        className={cn(s.loginForm, submitting && s.submitting)}
        onClick={(e) => e.stopPropagation()}
      >
        <input id="email" name="email" type="email" placeholder="E-post" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Lösenord"
          autoComplete="current-password"
        />

        <button onClick={(e) => e.stopPropagation()}>Logga in</button>
      </form>
      {error && <p className={s.loginError}>{error}</p>}
    </>
  );
}