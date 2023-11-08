
'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export type NextAuthSession = {
  session: Session | null,
  error: Error | null,
  status: 'authenticated' | 'unauthenticated' | 'loading',
  refresh: () => void
}

export default function useNextAuthSession(): NextAuthSession {

  const pathname = usePathname()
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>('unauthenticated')

  const refresh = () => {
    setStatus('loading')
    setError(null)
    getSession().then((session) => {
      setStatus('authenticated')
      setSession(session)
    }).catch((err) => {
      setStatus('unauthenticated')
      setSession(null)
      setError(err)
    })
  }

  useEffect(() => {
    refresh()
  }, [pathname])

  return { session, error, status, refresh }
}