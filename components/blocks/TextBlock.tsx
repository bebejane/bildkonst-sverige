import s from './TextBlock.module.scss'
import cn from 'classnames'
import { recordToRoute } from '@lib/routes'
import Link from 'next/link'

type Props = {
  data: TextBlockRecord
}

export default function TextBlock({ data: { id, texts } }: Props) {
  const columns = texts.length === 1 ? s.one : texts.length === 2 ? s.two : s.three
  return (
    <div className={cn(s.container, columns)}>
      {texts.map(async ({ headline, text, link }, i) => {
        const slug = link?.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
        return link ?
          <Link key={id} href={slug} className={s.block}>
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