import s from './NoticeBlock.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import Image from '@components/Image';
import { recordToRoute } from '@lib/routes'
import { format } from 'date-fns'
import ReadMore from '../ReadMore';

type Props = {
  data: NoticeBlockRecord
}

export default async function NoticeBlock({ data: { id, headline, image, link, text, category, date } }: Props) {

  const href = link?.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
  const target = link?.__typename === 'ExternalLinkRecord' ? "_blank" : undefined

  const content = <>
    {image &&
      <figure>
        <Image data={image.responsiveImage} className={s.image} />
      </figure>
    }
    {category && date &&
      <span className="date">{category} • {format(new Date(date), 'yyyy-MM-dd')}</span>
    }
    <h4>{headline}</h4>

    <p className="small">
      {text} {link && <ReadMore className="date" external={link?.__typename === 'ExternalLinkRecord'} />}
    </p>
  </>

  return (
    <div className={s.container}>
      {href ?
        <Link href={href} target={target}>
          {content}
        </Link>
        :
        <>
          {content}
        </>
      }
    </div>
  )
}