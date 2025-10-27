'use server';

import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { StartDocument } from '@graphql';
import Block from '@components/blocks/Block';

export default async function Home() {
	const { start, draftUrl } = await apiQuery(StartDocument);

	return (
		<>
			<h3 className={s.headline}>Aktuellt</h3>
			<article className={cn(s.container, 'grid')}>
				<div>
					{start?.content?.map((block, idx) => (
						<section key={idx}>
							<Block key={idx} data={block} />
						</section>
					))}
				</div>
				<aside>
					{start?.smallColumn?.map((block, idx) => (
						<section key={idx}>
							<Block key={idx} data={block} />
						</section>
					))}
				</aside>
			</article>
			<DraftMode url={draftUrl} tag={start?.id} />
		</>
	);
}
