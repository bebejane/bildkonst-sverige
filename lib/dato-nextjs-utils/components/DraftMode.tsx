'use client'

import s from './DraftMode.module.scss'
import { usePathname } from 'next/navigation'
import { disableDraftMode } from '@app/(datocms)/api/draft/exit/action'
import revalidateTag from '../actions/revalidate-tag'
import { useEffect, useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'

export type DraftModeProps = {
  enabled: boolean
  draftUrl?: string,
  tag: string
}

const disabledDraftMode = async () => {

}

export default function DraftMode({ enabled, draftUrl, tag }: DraftModeProps) {

  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const disable = async () => {
    console.log('disable draft mode')
    setLoading(true)
    await disableDraftMode(pathname)
    setLoading(false)
  }

  useEffect(() => {

    if (!draftUrl) return

    let updates = 0;
    const eventSource = new EventSource(draftUrl)
    eventSource.addEventListener("open", () => {
      console.log("connected to channel!");
    });
    eventSource.addEventListener("update", async (event) => {
      if (++updates <= 1) return

      setLoading(true)
      await revalidateTag(tag)
      setLoading(false)

    });
    return () => {
      eventSource.close()
    }

  }, [draftUrl, tag])

  if (!enabled) return null

  return (

    <button className={s.draftMode} onClick={disable}>
      <label>
        Exit draft
        {loading && <div className={s.loading}><ImSpinner8 /></div>}
      </label>
      <img width="20" height="20" />
    </button>
  )
}