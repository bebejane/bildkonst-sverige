import s from "./ReadMore.module.scss"
import Link from "next/link"
import cn from "classnames"

export type ReadMoreProps = {
  url?: string
  path?: string
  className?: string
  external?: boolean
}

export default function ReadMore({ url, path, className, external = false }: ReadMoreProps) {
  return (
    <>
      {url ?
        <a
          href={url}
          className={cn(s.read, className, "date")}
          target="_blank"
          rel="noreferrer"
        >
          Öppna <span className={s.external}>»</span>
        </a>
        : path ?
          <Link href={path} className={cn(s.read, className)}>Läs mer »</Link>
          :
          <span className={cn(s.read, className)}>
            Läs mer <span className={external ? s.external : undefined}>»</span>
          </span>
      }
    </>
  )
}