import s from './TextBlock.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { recordToRoute } from '@lib/routes'

type Props = {
  data: NoticeBlockRecord
}

export default async function NoticeBlock({ data: { id, headline, image, link, text } }: Props) {

  const href = link.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
  const target = link.__typename === 'ExternalLinkRecord' ? "_blank" : undefined
  return (
    <div className={s.container}>
      <Link
        href={href}
        target={target}
      >
        {image &&
          <figure>
            <Image data={image.responsiveImage} className={s.image} />
          </figure>
        }
        <h4>{headline}</h4>
        <p className="small">{text}</p>
      </Link>

    </div>
  )
}