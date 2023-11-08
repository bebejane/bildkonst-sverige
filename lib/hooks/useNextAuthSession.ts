
'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export type NextAuthSession = {
  session: Session | null,
  error: Error | null,
  status: 'authenticated' | 'unauthenticated' | 'loading'
}

export default function useNextAuthSession(): NextAuthSession {

  const pathname = usePathname()
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>('unauthenticated')

  useEffect(() => {
    setStatus('loading')
    setError(null)
    getSession().then((session) => {
      setStatus('authenticated')
      setSession(session)
    }).catch((err) => {
      setSession(null)
      setError(err)
      setStatus('unauthenticated')
    })
  }, [pathname])

  return { session, error, status }
}