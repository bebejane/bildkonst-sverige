import s from './ImageBlock.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import Image from '@components/Image';

type Props = {
  data: ImageBlockRecord
}

export default async function ImageBlock({ data: { id, image } }: Props) {

  return (
    <figure className={s.figure}>
      <Image data={image.responsiveImage} pictureClassName={s.picture} />
    </figure>
  )
}