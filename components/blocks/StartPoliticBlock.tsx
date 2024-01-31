import s from './StartPoliticBlock.module.scss'
import cn from 'classnames'
import Link from "next/link"
import Image from '@components/Image';
import { format } from "date-fns"
import Content from '@components/Content'
import ReadMore from '../ReadMore';

type Props = {
  data: StartPoliticBlockRecord & {
    layout: 'big' | 'column' | 'headline'
  }
}

export default function StartPoliticBlock({ data: { record: { id, slug, category, intro, image, title, _createdAt }, layout } }: Props) {

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
            <span className="date">{category?.title} • {format(new Date(_createdAt), 'yyyy-MM-dd')}</span>
            <Content content={intro} id={id} />
            <ReadMore className="date" />
          </div>
        </div>
      </div>
    </Link>
  )
}