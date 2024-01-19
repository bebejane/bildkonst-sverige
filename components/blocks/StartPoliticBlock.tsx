import s from './StartPoliticBlock.module.scss'
import cn from 'classnames'
import Link from "next/link"
import Image from '@components/Image';
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
          <h2>{title}</h2>
          <div className={cn(layout === 'big' && 'intro')}>
            <span className="date">{category?.title} • {format(new Date(_publishedAt), 'yyyy-MM-dd')}</span>
            <StructuredContent content={intro} id={id} />
            <span className="date">Läs mer »</span>
          </div>
        </div>
      </div>
    </Link>
  )
}