'use client'

import s from './ApplyForm.module.scss'
import cn from 'classnames'

import { useFormState, useFormStatus } from 'react-dom'
import { createMember } from './actions';

export type Props = {
  allMemberLevels: MemberPageQuery['allMemberLevels']
}

function SubmitButton() {
  const status = useFormStatus();
  return <button type="submit" disabled={status.pending}>Skicka</button>
}

export default function ApplyForm({ allMemberLevels }: Props) {

  const [state, formAction] = useFormState(createMember, {})

  const invalid = (id: string) => {
    const el = state.invalid?.find(e => e?.path?.includes(id))
    return el ? <div className={s.invalid}>{el.message}</div> : null
  }

  if (state.data)
    return <div className={s.success}>Tack för din ansökan!</div>

  if (state.error)
    return <div className={s.error}>Det uppstod ett fel!</div>

  return (
    <form action={formAction} className={s.form}>
      <label htmlFor='organization'>Organisation *</label>
      <input type='text' id="organization" name="organization" required={false} />
      {invalid('organization')}

      <label htmlFor='organization_no'>Organisationsnummer *</label>
      <input type='text' id="organization_no" name="organization_no" required={false} />
      {invalid('organization_no')}

      <label htmlFor='contact'>Kontaktperson *</label>
      <input type='text' id="contact" name="contact" required={false} />
      {invalid('contact')}

      <label htmlFor='email'>E-post *</label>
      <input type='email' autoComplete='on' id="email" name="email" required={false} />
      {invalid('email')}

      <label htmlFor='invoice_address'>Faktureringsadress *</label>
      <input type='text' id="invoice_address" name="invoice_address" required={false} />
      {invalid('invoice_address')}

      <label htmlFor='level'>Medlemsnivå *</label>
      <select id="level" name="level" required={false}>
        <option value={'false'}>Välj nivå</option>
        {allMemberLevels.map(({ id, level }) =>
          <option key={id} value={id}>Medlemnivå {level}</option>
        )}
      </select>
      {invalid('level')}
      <SubmitButton />
    </form >

  );
}