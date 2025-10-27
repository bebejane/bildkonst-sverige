'use client';

import s from './NewsLetterForm.module.scss';
import newsletterSignup from '@/lib/actions/newsletterSignup';
import { useActionState, useEffect, useState } from 'react';

export default function NewsletterForm({}) {
	const [state, formAction, pending] = useActionState(newsletterSignup, {});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleClose = (e) => {
		e.stopPropagation();
		setError(null);
		setSuccess(null);
	};

	useEffect(() => {
		setError(state?.error ? state.error : null);
		setSuccess(state?.data ? state.data : null);
	}, [state]);

	return (
		<form action={formAction} className={s.form}>
			<input name='email' type='email' placeholder='Din e-post adress...' required={true} />
			<button type='submit' disabled={pending}>
				Skicka
			</button>
			{success && (
				<div className={s.success}>
					<h3>Tack för din ansökan!</h3>
				</div>
			)}
			{error && (
				<div className={s.error}>
					{error}
					<button type='button' className={s.close} onClick={handleClose}>
						×
					</button>
				</div>
			)}
		</form>
	);
}
