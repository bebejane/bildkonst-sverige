import s from './StartPoliticBlock.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Image from '@/components/Image';
import { format } from 'date-fns';
import { render as structuredToMarkdown, renderNodeRule } from 'datocms-structured-text-to-markdown';
import { isLink } from 'datocms-structured-text-utils';
import ReadMore from '../ReadMore';
import { Markdown } from 'next-dato-utils/components';

const markdownRenderOptions = {
	customNodeRules: [
		renderNodeRule(isLink, ({ node, children, adapter: { renderFragment } }) => {
			return renderFragment(children);
		}),
	],
};

type Props = {
	data: StartPoliticBlockRecord & {
		layout: 'big' | 'column' | 'headline';
	};
};

export default function StartPoliticBlock({
	data: {
		record: { id, slug, category, intro, image, title, _createdAt },
		layout,
	},
}: Props) {
	return (
		<Link href={`/${category.slug}/${slug}`} className={cn(s.container, s[layout])}>
			<div className='grid'>
				{image && (
					<figure>
						<Image data={image.responsiveImage} />
					</figure>
				)}
				<div className={s.text}>
					<h2>{title}</h2>
					<div className={cn(layout === 'big' && 'intro')}>
						<span className='date'>
							{category?.title} • {format(new Date(_createdAt), 'yyyy-MM-dd')}
						</span>
						<Markdown content={structuredToMarkdown(intro as any, markdownRenderOptions)} />
						<ReadMore className='date' />
					</div>
				</div>
			</div>
		</Link>
	);
}
