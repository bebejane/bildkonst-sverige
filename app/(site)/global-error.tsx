'use client'

import s from './error.module.scss'

export default function GlobalError({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <html>
      <body className={`${s.body} ${s.error}`}>
        <main>
          <article>
            <h1>Something went wrong!</h1>
            <p className={s.message}>{error.message}</p>
            <p>
              <button onClick={() => reset()}>Try again</button>
            </p>
          </article>
        </main>
      </body>
    </html>
  )
}