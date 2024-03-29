'use server'

import cn from 'classnames';
import Content from '@components/Content';
import { format } from 'date-fns';
import Image from '@components/Image';

export type ArticleProps = {
  id: string
  title?: string;
  intro?: any;
  image?: FileField
  content?: any;
  publishedAt?: string;
  className?: string
  children?: React.ReactNode | React.ReactNode[]
}

export default async function Article({
  title,
  intro,
  image,
  content,
  publishedAt,
  id,
  className,
  children
}: ArticleProps) {

  return (
    <article className={className}>
      <div className="content">
        {title && <h1>{title}</h1>}
        {image &&
          <div className="grid">
            <figure className="small">
              <Image data={image.responsiveImage} />
              <figcaption>{image.title}</figcaption>
            </figure>
          </div>
        }
        {intro &&
          <section className="intro">
            {publishedAt && <span className="date">{format(new Date(publishedAt), 'yyyy-MM-dd')}</span>}
            <Content content={intro} id={id} />
          </section>
        }
        {content &&
          <section className={cn("grid", "structured")}>
            <Content content={content} id={id} />
          </section>
        }
        {children}
      </div>
    </article>
  );
}