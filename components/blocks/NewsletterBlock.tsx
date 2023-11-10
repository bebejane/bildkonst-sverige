import s from './NewsletterBlock.module.scss'
import NewsletterForm from '@components/NewsLetterForm'

type Props = {
  data: NewsletterBlockRecord
}

export default function NewsletterBlock({ data: { id, title } }: Props) {

  return (
    <div className={s.container}>
      <h3>{title}</h3>
      <NewsletterForm />
    </div>
  )
}