'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';

export type LayoutProps = {
	children: React.ReactNode;
};

export default function MainTemplate({ children }: LayoutProps) {
	const pathname = usePathname();

	useEffect(() => {
		orangeFade();
	}, [pathname]);

	return <>{children}</>;
}

function orangeFade() {
	const imageOverlays = Array.from(document.querySelectorAll('div[data-image-overlay]'));
	document.body.classList.add('bodyfade');
	setTimeout(() => document.body.classList.add('fadeout'), 20);
	setTimeout(() => {
		document.body.classList.remove('bodyfade');
		document.body.classList.remove('fadeout');
		imageOverlays.forEach((img) => img.remove());
	}, 700);
}
