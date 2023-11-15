import s from './NewsletterBlock.module.scss'
import NewsletterForm from '@components/NewsLetterForm'

type Props = {
  data: NewsletterBlockRecord
}

export default function NewsletterBlock({ data: { id, title } }: Props) {

  return (
    <div className={s.container}>
      <h2>{title}</h2>
      <NewsletterForm />
    </div>
  )
}