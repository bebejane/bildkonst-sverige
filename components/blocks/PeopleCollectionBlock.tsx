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
          </figure>
          <h3>{person.name}</h3>

          <div className={s.desc}><p>{person.description}</p></div>
        </li>
      ))}
    </ul>
  )
}