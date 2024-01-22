import s from './ButtonBlock.module.scss'
import cn from 'classnames'
import Link from 'next/link'

type Props = {
  data: ButtonBlockRecord
}

export default async function ButtonBlock({ data: { text, url } }: Props) {

  //const href = link.__typename === 'InternalLinkRecord' ? await recordToRoute(link.link) : link?.url
  //const target = link.__typename === 'ExternalLinkRecord' ? "_blank" : undefined

  return (

    <Link href={url} className={s.button}>
      <button className={s.button}>
        {text}
      </button>
    </Link>

  )
}