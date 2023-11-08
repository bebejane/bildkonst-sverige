'use client'

import s from './_Error.module.scss'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

  useEffect(() => { console.error(error) }, [error])

  return (
    <article className={s.error}>
      <h1>Something went wrong!</h1>
      <br />
      <p className={s.message}>
        {error.message}
      </p>
      <p>
        <button onClick={() => reset()}>
          Try again
        </button>
      </p>
    </article>
  )
}