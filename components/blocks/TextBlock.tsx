import s from './PeopleCollectionBlock.module.scss'
import cn from 'classnames'
import { Image } from "react-datocms"

type Props = {
  data: TextBlockRecord
}

export default function TextBlock({ data: { id, texts } }: Props) {
  console.log(texts)
  return (
    <div className={s.container}>
      Text block!
    </div>
  )
}