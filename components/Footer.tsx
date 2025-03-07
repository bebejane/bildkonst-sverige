'use client';

import Link from 'next/link';
import s from './Footer.module.scss';
import cn from 'classnames';
import NewsletterForm from '@components/NewsLetterForm';
import { useEffect, useState } from 'react';

export default function Footer() {
	return (
		<>
			<footer className={s.footer}>
				<div>
					<span>© {new Date().getFullYear()} KonstKontoret</span>
				</div>
				<h1 className='logo'>
					<Link href={'/'}>
						Bildkonst
						<br />
						sverige
					</Link>
				</h1>
				<div>
					<span>
						<Link href='/kontakt'>Kontakt</Link>
					</span>
				</div>
			</footer>
		</>
	);
}
