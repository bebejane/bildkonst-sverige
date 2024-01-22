import s from "./ReadMore.module.scss"
import Link from "next/link"
import cn from "classnames"
import { recordToRoute } from "../lib/routes"

export type ReadMoreProps = {
  url?: string
  path?: string
  className?: string
  external?: boolean
  link?: InternalLinkRecord | ExternalLinkRecord
}

export default async function ReadMore({ url, path, className, link, external = false }: ReadMoreProps) {

  if (link && link.__typename === 'InternalLinkRecord')
    path = await recordToRoute(link.link)
  else if (link && link.__typename === 'ExternalLinkRecord')
    url = link.url

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