import s from './PeopleCollectionBlock.module.scss';
import cn from 'classnames';
import Image from '@/components/Image';

type Props = {
	data: PeopleCollectionBlockRecord;
};

export default function PeopleCollectionBlock({ data: { people } }: Props) {
	return (
		<ul className={s.container}>
			{people.map((person) => (
				<li key={person.id}>
					{person.image.responsiveImage && (
						<figure>{person.image && <Image data={person.image.responsiveImage} />}</figure>
					)}
					<h3>{person.name}</h3>
					<div className={s.desc}>
						<p>{person.description}</p>
					</div>
				</li>
			))}
		</ul>
	);
}
