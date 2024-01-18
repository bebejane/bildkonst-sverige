import s from './TextBlock.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { recordToRoute } from '@lib/routes'

type Props = {
  data: TextBlockRecord
}

export default async function TextBlock({ data: { id, headline, image, link, text } }: Props) {

  const href = link.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
  const target = link.__typename === 'ExternalLinkRecord' ? "_blank" : undefined

  return (
    <div className={cn(s.container)}>
      <Link
        key={id}
        href={href}
        className={s.block}
        target={target}
      >
        {image &&
          <figure>
            <Image data={image.responsiveImage} className={s.image} />
          </figure>
        }
        <h2>{headline}</h2>
        <div>
          <p>{text}</p>
          <span className="date" target="_blank" rel="noreferrer">Läs mer »</span>
        </div>

      </Link>

    </div>
  )
}