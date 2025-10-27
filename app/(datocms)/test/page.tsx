import s from './page.module.scss';
import config from '@/datocms.config';
import client from '@/lib/client';
import React from 'react';

export default async function TestConfig() {
	return null;
	const pathnames: {
		[api_key: string]: string[] | null;
	} = {};

	for (const api_key in config.routes) {
		try {
			if (api_key === 'upload') continue;
			const record = await client.items.list({ filter: { type: api_key }, version: 'current', limit: 1 });
			pathnames[api_key] = await config.routes[api_key](record[0]);
		} catch (e) {
			pathnames[api_key] = null;
		}
	}

	return (
		<article>
			<table className={s.table}>
				<tbody>
					<tr>
						<th>api_key</th>
						<th>pathnames</th>
					</tr>
					{Object.entries(pathnames).map(([api_key, pathnames], key) => (
						<tr key={key}>
							<td>{api_key}</td>
							<td>
								{pathnames?.map((p, i) => (
									<React.Fragment key={i}>
										{p}
										<br />
									</React.Fragment>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</article>
	);
}
