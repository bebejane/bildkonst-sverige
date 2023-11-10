'use server'

import cn from 'classnames';
import StructuredContent from '@components/StructuredContent';
import { format } from 'date-fns';
import { Image } from 'react-datocms';

export type ArticleProps = {
  id: string
  title: string;
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
        <h1>{title}</h1>
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
            {publishedAt && <span className="date">{format(new Date(publishedAt), 'd MMMM yyyy')}</span>}
            <StructuredContent content={intro} id={id} />
          </section>
        }
        {content &&
          <section className={cn("grid", "structured")}>
            <StructuredContent content={content} id={id} />
          </section>
        }
        {children}
      </div>
    </article>
  );
}