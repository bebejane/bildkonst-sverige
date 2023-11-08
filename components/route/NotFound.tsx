import Link from 'next/link'
import s from './NotFound.module.scss'

export default function NotFound() {
  return (
    <div className={s.container}>
      <h2>404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}