'use client'

import s from './root-template.module.scss'
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export type LayoutProps = {
  children: React.ReactNode
}

export default function MainTemplate({ children }: LayoutProps) {
  const pathname = usePathname()

  useEffect(() => {
    orangeScroll()
    orangeFade()
  }, [pathname])

  return (
    <>
      {children}
      {/*<div className={s.transition} key={pathname} />*/}
    </>
  )
}

const orangeScroll = () => {
  const paragraphs = Array.from(document.querySelectorAll('main p,main li')).filter(p => !isElementInViewport(p))
  const observePargraphs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observePargraphs.unobserve(entry.target)
        entry.target.classList.remove(s.active)
        entry.target.classList.remove(s.paragraph)
      } else
        entry.target.classList.add(s.active)
    })
  }, { threshold: 0.2, rootMargin: '0px 0px -20% 0px' })

  paragraphs.forEach(p => {
    p.classList.add(s.paragraph)
    observePargraphs.observe(p)
  })

  return () => {
    observePargraphs.disconnect()
  }
}

function orangeFade() {
  document.body.classList.remove('body-color-fade')
}

function isElementInViewport(el: Element) {
  return el.getBoundingClientRect()?.top <= (window.innerHeight || document.documentElement.clientHeight)
}
