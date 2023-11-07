'use client'

import s from './page.module.scss'
import { signIn } from 'next-auth/react'

export default async function Login() {

  const handleSignin = async (e) => {
    e.preventDefault()
    const url = new URLSearchParams(window.location.search).get('callbackUrl')
    const callbackUrl = url?.endsWith('/medlem/logga-ut') ? undefined : url ?? '/medlem'
    const formData = new FormData(e.target)
    const result = await signIn('credentials', {
      callbackUrl,
      username: formData.get('email'),
      password: formData.get('password'),
    })
    if (result.error) {
      console.log(result.error)
    } else {
      console.log(result)
    }
  }

  return (
    <article className={s.container}>
      <h1>Logga in</h1>
      <form method="POST" onSubmit={handleSignin}>
        <input id="email" name="email" type="email" placeholder="E-post" />
        <input id="password" name="password" type="password" placeholder="Lösenord" />
        <button>Logga in</button>
      </form>
    </article>
  );
}