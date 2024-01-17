'use client'

import s from './NewsLetterForm.module.scss'
import { useFormState, useFormStatus } from 'react-dom'
import newsletterSignup from '@lib/actions/newsletterSignup';
import { useEffect, useState } from 'react';

export default function NewsletterForm({ }) {

  const [state, formAction] = useFormState(newsletterSignup, {})
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(state?.error ? state.error : null)
  }, [state])

  return (
    <form action={formAction} className={s.form}>
      <input name="email" type="email" placeholder="Din e-post adress..." required={true} />
      <SubmitButton />
      {state.data && <div className={s.success}>
        <h3>Tack för din ansökan!</h3>
        <button className={s.close} onClick={() => setError(null)}>×</button>
      </div>
      }
      {error &&
        <div className={s.error}>
          {error}
          <button className={s.close} onClick={() => setError(null)}>×</button>
        </div>
      }
    </form>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  return <button type="submit" disabled={status.pending}>Skicka</button>
}