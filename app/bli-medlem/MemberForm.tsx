'use client'

import s from './MemberForm.module.scss'
import { useFormState, useFormStatus } from 'react-dom'
import { createMember } from './actions';

export type Props = {
  allMemberLevels: MemberPageQuery['allMemberLevels']
}

export default function MemberForm({ allMemberLevels }: Props) {

  const [state, formAction] = useFormState(createMember, {})

  const errors = (id: string) => {
    const el = state.invalid?.find(e => e?.path?.includes(id))
    return el ? <div className={s.invalid}>{el.message}</div> : null
  }

  if (state.data)
    return <div className={s.success}><h1>Tack för din ansökan!</h1></div>

  if (state.error)
    return <div className={s.error}><h1>Det uppstod ett fel!</h1></div>

  return (
    <form action={formAction} className={s.form}>
      <label htmlFor='organization'>Organisation *</label>
      <input type='text' id="organization" name="organization" required={false} />
      {errors('organization')}

      <label htmlFor='organization_no'>Organisationsnummer *</label>
      <input type='text' id="organization_no" name="organization_no" required={false} />
      {errors('organization_no')}

      <label htmlFor='contact'>Kontaktperson *</label>
      <input type='text' id="contact" name="contact" required={false} />
      {errors('contact')}

      <label htmlFor='email'>E-post *</label>
      <input type='email' autoComplete='on' id="email" name="email" required={false} />
      {errors('email')}

      <label htmlFor='invoice_address'>Faktureringsadress *</label>
      <input type='text' id="invoice_address" name="invoice_address" required={false} />
      {errors('invoice_address')}

      <label htmlFor='level'>Medlemsnivå *</label>
      <select id="level" name="level" required={false}>
        <option value={'false'}>Välj nivå</option>
        {allMemberLevels.map(({ id, level }) =>
          <option key={id} value={id}>Medlemnivå {level}</option>
        )}
      </select>
      {errors('level')}

      <SubmitButton />
    </form >

  );
}

function SubmitButton() {
  const status = useFormStatus();
  return <button type="submit" disabled={status.pending}>Skicka</button>
}
