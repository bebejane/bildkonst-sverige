import s from './PeopleCollectionBlock.module.scss'
import cn from 'classnames'
import { Image } from "react-datocms"

type Props = {
  data: PeopleCollectionBlockRecord
}

export default function PeopleCollectionBlock({ data: { people } }: Props) {

  return (
    <ul className={s.container}>
      {people.map((person) => (
        <li key={person.id}>
          <figure>
            <Image
              data={person.image.responsiveImage}
              className={s.image}
              pictureClassName={s.picture}
            />
            <figcaption>{person.name}</figcaption>
          </figure>
          <div className={s.desc}>{person.description}</div>
        </li>
      ))}
    </ul>
  )
}