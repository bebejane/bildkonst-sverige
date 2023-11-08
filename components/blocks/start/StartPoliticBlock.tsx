import s from './StartPoliticBlock.module.scss'
import cn from 'classnames'
import Link from "next/link"
import { Image } from "react-datocms"
import { format } from "date-fns"
import StructuredContent from '@components/common/StructuredContent'

type Props = {
  data: StartPoliticBlockRecord & {
    layout: 'big' | 'column' | 'headline'
  }
}

export default function StartPoliticBlock({ data: { record: { id, slug, category, intro, image, title, _publishedAt }, layout } }: Props) {

  return (
    <Link href={`/${category.slug}/${slug}`} className={cn(s.container, s[layout])}>
      <div className="grid">
        {image && layout !== 'headline' &&
          <figure>
            <Image data={image.responsiveImage} />
          </figure>
        }
        <div className={s.text}>
          <h1>{title}</h1>
          <div className="intro">
            <span className="date">{format(new Date(_publishedAt), 'd MMMM yyyy')}</span>
            <StructuredContent content={intro} id={id} />
          </div>
        </div>
      </div>
    </Link>
  )
}