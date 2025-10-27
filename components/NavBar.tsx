'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from './NavBar.module.scss';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Hamburger from 'hamburger-react';
import useNextAuthSession from '@/lib/hooks/useNextAuthSession';
import { Menu, MenuItem } from '@/lib/menu';
import { useScrollInfo } from 'next-dato-utils/hooks';
import LoginForm from './LoginForm';
import NewsletterForm from './NewsLetterForm';

export type Props = {
	menu: Menu;
	backgroundColor?: string;
};

export default function NavBar({ menu, backgroundColor }: Props) {
	const pathname = usePathname();
	const { scrolledPosition } = useScrollInfo();
	const [open, setOpen] = useState(false);
	const [isScrolledDown, setIsScrolledDown] = useState(false);
	const [showNewsletter, setShowNewsletter] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);
	useEffect(() => {
		setIsScrolledDown(scrolledPosition > 0);
	}, [scrolledPosition]);

	useEffect(() => {
		document.body.classList.toggle('slide-up', showNewsletter);
	}, [showNewsletter]);

	return (
		<>
			<h1 className={cn(s.logo, isScrolledDown && !open && s.onScroll, open && s.open, 'logo')}>
				<Link href={'/'}>
					Bildkonst
					<br />
					sverige
				</Link>
			</h1>
			<DesktopMenu
				menu={menu}
				pathname={pathname}
				setShowNewsletter={setShowNewsletter}
				backgroundColor={backgroundColor}
			/>
			<MobileMenu
				menu={menu}
				pathname={pathname}
				open={open}
				onToggle={(val) => setOpen(val)}
				key={pathname}
				setShowNewsletter={setShowNewsletter}
			/>
			<div className={cn(s.newsletter, showNewsletter && s.show)}>
				<h2>Följ vad vi gör. Prenumerera på vårt nyhetsbrev.</h2>
				<NewsletterForm />
				<button className={s.close} onClick={() => setShowNewsletter(false)}>
					Stäng
				</button>
			</div>
		</>
	);
}

const MobileMenu = ({
	menu,
	pathname,
	open,
	onToggle,
	setShowNewsletter,
}: {
	menu: Menu;
	pathname: string;
	open: boolean;
	onToggle: (o: boolean) => void;
	setShowNewsletter: (o: boolean) => void;
}) => {
	const { session, error, status, refresh } = useNextAuthSession();
	const initialSubId = menu.find(({ sub }) => sub?.find((el) => el?.slug === pathname))?.id;
	const [subId, setSubId] = useState<string | null>(initialSubId ?? null);
	return (
		<>
			<nav className={cn(s.hamburger, open && s.open)}>
				<Hamburger size={30} toggled={open} toggle={() => onToggle(!open)} />
			</nav>
			<nav className={cn(s.mobile, open && s.show)}>
				<ul className={s.menu}>
					{menu.map(({ id, title, slug, href, sub, auth }, idx) => (
						<React.Fragment key={idx}>
							{menu[idx].position !== menu[idx - 1]?.position && <div className={s.separator} />}
							<li
								className={cn((isMenuItemIsOpen(pathname, menu[idx]) || subId === id) && s.selected)}
								onClick={(e) => {
									sub ? setSubId(subId === id ? null : id) : setSubId(null);
								}}
							>
								{id === 'newsletter' ? (
									<span onClick={() => setShowNewsletter(true)}>{title}</span>
								) : !sub ? (
									<Link href={slug ?? href}>{title}</Link>
								) : auth && !session ? (
									<>Logga in</>
								) : (
									<>{title}</>
								)}
								<ul className={cn(s.sub, subId === id && s.open)} onClick={(e) => e.stopPropagation()}>
									{auth && !session
										? subId === id && (
												<li className={s.login}>
													<LoginForm onSuccess={() => refresh()} />
												</li>
											)
										: sub?.map(({ id, title, slug }, i) => (
												<li
													key={id}
													className={cn(pathname === slug && s.selectedSub)}
													style={{ animationDelay: `${(i + 1) * 70}ms` }}
												>
													<Link href={slug}>{title}</Link>
												</li>
											))}
								</ul>
							</li>
						</React.Fragment>
					))}
				</ul>
			</nav>
		</>
	);
};

const DesktopMenu = ({
	menu,
	pathname,
	backgroundColor,
	setShowNewsletter,
}: {
	menu: Menu;
	pathname: string;
	backgroundColor: string;
	setShowNewsletter: (o: boolean) => void;
}) => {
	return (
		<nav className={s.desktop}>
			<DesktopMenuPanel
				position={'left'}
				menu={menu}
				pathname={pathname}
				setShowNewsletter={setShowNewsletter}
				backgroundColor={backgroundColor}
			/>
			<div className={s.separator} />
			<DesktopMenuPanel
				position={'right'}
				menu={menu}
				pathname={pathname}
				backgroundColor={backgroundColor}
				setShowNewsletter={setShowNewsletter}
			/>
		</nav>
	);
};

const DesktopMenuPanel = ({
	position,
	menu,
	pathname,
	backgroundColor,
	setShowNewsletter,
}: {
	position: 'left' | 'right';
	menu: Menu;
	pathname: string;
	backgroundColor: string;
	setShowNewsletter: (o: boolean) => void;
}) => {
	const { session, error, status, refresh } = useNextAuthSession();
	const panel = menu.filter((el) => el.position === position);
	const [subId, setSubId] = useState<string | null>(null);
	const subPanel = panel?.find(({ id }) => subId === id);

	useEffect(() => {
		setSubId(null);
	}, [pathname]);

	return (
		<>
			<ul
				className={cn(s.menu, s[position], subId && s.open)}
				style={{ backgroundColor: subId ? backgroundColor : undefined }}
				onMouseLeave={(e) => {
					setSubId(null);
				}}
			>
				{panel.map(({ id, title, slug, href, sub, auth }, idx) => (
					<li
						key={id}
						className={cn((isMenuItemIsOpen(pathname, panel[idx]) || isParentMenuActive(pathname, sub)) && s.selected)}
						onMouseEnter={(e) => {
							sub ? setSubId(id) : setSubId(null);
						}}
						onClick={(e) => {
							sub && setSubId(id);
						}}
					>
						{id === 'newsletter' ? (
							<span onClick={() => setShowNewsletter(true)}>{title}</span>
						) : !sub ? (
							<Link href={slug ?? href}>{title}</Link>
						) : auth && !session ? (
							<>Logga in</>
						) : (
							<>{title}</>
						)}
					</li>
				))}
				<ul className={cn(s.sub, s[position], subId === subPanel?.id && s.open)}>
					{subPanel?.auth && !session ? (
						<li className={s.login}>
							<LoginForm onSuccess={() => refresh()} />
						</li>
					) : (
						subPanel?.sub.map(({ id, title, slug }, i) => (
							<li
								key={id}
								className={cn(isSubMenuActive(pathname, slug) && s.selectedSub, s.show)}
								style={{ animationDelay: `${(i + 2) * 70}ms` }}
							>
								<Link href={slug}>{title}</Link>
							</li>
						))
					)}
				</ul>
			</ul>
		</>
	);
};

const isMenuItemIsOpen = (pathname: string, item: MenuItem) => {
	return item.slug === pathname || item.sub?.find((el) => pathname === el?.slug) !== undefined;
};

const isParentMenuActive = (pathname: string, sub?: MenuItem[]) => {
	return sub?.find((el) => pathname.split('/')[1] === el?.slug.split('/')[1]) !== undefined;
};

const isSubMenuActive = (pathname: string, slug: string) => {
	return pathname === slug || pathname.startsWith(`${slug}`);
};
