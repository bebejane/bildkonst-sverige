'use client'

import s from './NewsLetterForm.module.scss'
import { useFormState, useFormStatus } from 'react-dom'
import newsletterSignup from '@lib/actions/newsletterSignup';

export default function NewsletterForm({ }) {

  const [state, formAction] = useFormState(newsletterSignup, {})

  return (
    <form action={formAction} className={s.form}>
      <input name="email" type="email" placeholder="E-post" required={true} />
      <SubmitButton />
      {state.data && <div className={s.success}><h3>Tack för din ansökan!</h3></div>}
      {state.error && <div className={s.error}><h3>Det uppstod ett fel!</h3>{state.error}</div>}
    </form>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  console.log(status)
  return <button type="submit" disabled={status.pending}>Skicka</button>
}