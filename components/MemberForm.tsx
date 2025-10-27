'use client';

import s from './MemberForm.module.scss';
import { useActionState } from 'react';
import createMember from '@/lib/actions/createMember';

export type Props = {
	allMemberLevels: MemberPageQuery['allMemberLevels'];
};

const inititalState = {
	organiszation: '',
	organiszation_no: '',
	contact: '',
	email: '',
	invoice_address: '',
	level: null,
	invalid: null,
	data: null,
	error: null,
};

export default function MemberForm({ allMemberLevels }: Props) {
	const [state, formAction, pending] = useActionState(createMember, inititalState);
	const errors = (id: string) => {
		const el = state.invalid?.find((e) => e?.path?.includes(id));
		return el ? <div className={s.invalid}>{el.message}</div> : null;
	};

	return (
		<form action={formAction} className={s.form}>
			<label htmlFor='organization'>Organisation *</label>
			<input type='text' id='organization' name='organization' required={false} defaultValue={state.organization} />
			{errors('organization')}

			<label htmlFor='organization_no'>Organisationsnummer *</label>
			<input
				type='text'
				id='organization_no'
				name='organization_no'
				required={false}
				defaultValue={state.organization_no}
			/>
			{errors('organization_no')}

			<label htmlFor='contact'>Kontaktperson *</label>
			<input type='text' id='contact' name='contact' required={false} defaultValue={state.contact} />
			{errors('contact')}

			<label htmlFor='email'>E-post *</label>
			<input type='email' autoComplete='on' id='email' name='email' required={false} defaultValue={state.email} />
			{errors('email')}

			<label htmlFor='invoice_address'>Faktureringsadress *</label>
			<input
				type='text'
				id='invoice_address'
				name='invoice_address'
				required={false}
				defaultValue={state.invoice_address}
			/>
			{errors('invoice_address')}

			<label htmlFor='level'>Medlemsnivå *</label>
			<select id='level' name='level' required={false} defaultValue={state.level}>
				<option value={'false'}>Välj nivå</option>
				{allMemberLevels.map(({ id, level }) => (
					<option key={id} value={id}>
						Medlemnivå {level}
					</option>
				))}
			</select>
			{errors('level')}

			<button type='submit' disabled={pending}>
				Skicka
			</button>

			{state.data && (
				<div className={s.success}>
					<h1>Tack för din ansökan!</h1>
				</div>
			)}
			{state.error && (
				<div className={s.error}>
					<h1>Det uppstod ett fel!</h1>
					{state.error}
				</div>
			)}
		</form>
	);
}
