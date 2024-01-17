import s from './StartPoliticBlock.module.scss'
import cn from 'classnames'
import Link from "next/link"
import { Image } from "react-datocms"
import { format } from "date-fns"
import StructuredContent from '@components/StructuredContent'

type Props = {
  data: StartPoliticBlockRecord & {
    layout: 'big' | 'column' | 'headline'
  }
}

export default function StartPoliticBlock({ data: { record: { id, slug, category, intro, image, title, _publishedAt }, layout } }: Props) {

  return (
    <Link href={`/${category.slug}/${slug}`} className={cn(s.container, s[layout])}>
      <div className="grid">
        {image &&
          <figure>
            <Image data={image.responsiveImage} />
          </figure>
        }
        <div className={s.text}>
          <h1>{title}</h1>
          <div className={cn(layout === 'big' && 'intro')}>
            <span className="date">{category?.title} • {format(new Date(_publishedAt), 'yyyy-MM-dd')}</span>
            <StructuredContent content={intro} id={id} />
          </div>
        </div>
      </div>
    </Link>
  )
}