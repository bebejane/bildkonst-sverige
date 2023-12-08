import s from './TextBlock.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { recordToRoute } from '@lib/routes'

type Props = {
  data: TextBlockRecord
}

export default async function TextBlock({ data: { texts } }: Props) {

  const links = await Promise.all(texts.filter(({ link }) => link).map(async ({ link }) => ({
    __typename: link.__typename,
    id: link.id,
    slug: link.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
  })))

  const columns = texts.length
  const columnsClass = columns === 1 ? s.one : columns === 2 ? s.two : s.three
  const Header = ({ children }) => columns < 3 ? <h2>{children}</h2> : <h3>{children}</h3>

  return (
    <div className={cn(s.container, columnsClass)}>
      {texts.map(({ headline, text, link, image }, i) => {
        const l = links.find(({ id }) => id === link?.id)
        return l?.slug ?
          <Link
            key={i} href={l.slug}
            className={s.block}
            target={l.__typename === 'ExternalLinkRecord' ? "_blank" : undefined}
          >
            {image &&
              <Image data={image.responsiveImage} className={s.image} />
            }
            <Header>{headline}</Header>
            <p>{text}</p>
          </Link>
          :
          <div key={i} className={s.block}>
            {image &&
              <Image data={image.responsiveImage} className={s.image} />
            }
            <Header>{headline}</Header>
            <p>{text}</p>
          </div>
      })}
    </div>
  )
}