import s from './TextBlock.module.scss'
import cn from 'classnames'
import { recordToRoute } from '@lib/routes'
import Link from 'next/link'

type Props = {
  data: TextBlockRecord
}

export default async function TextBlock({ data: { texts } }: Props) {

  const links = await Promise.all(texts.filter(({ link }) => link).map(async ({ link }) => ({
    id: link.id,
    slug: link.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
  })))
  const columns = texts.length === 1 ? s.one : texts.length === 2 ? s.two : s.three

  return (
    <div className={cn(s.container, columns)}>
      {texts.map(({ headline, text, link }, i) => {
        const slug = links.find(({ id }) => id === link?.id)?.slug
        return link && slug ?
          <Link key={i} href={slug} className={s.block}>
            <h3>{headline}</h3>
            <p>{text}</p>
          </Link>
          :
          <div key={i} className={s.block}>
            <h3>{headline}</h3>
            {text}
          </div>
      })}
    </div>
  )
}