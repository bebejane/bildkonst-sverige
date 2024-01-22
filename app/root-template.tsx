'use client'

import s from './root-template.module.scss'
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import React from 'react'

export type LayoutProps = {
  children: React.ReactNode
}

export default function MainTemplate({ children }: LayoutProps) {
  const pathname = usePathname()

  useEffect(() => {
    orangeFade()
    //orangeScroll()
  }, [pathname])

  return (
    <>
      {children}
    </>
  )
}

const orangeScroll = () => {

  function isElementInViewport(el: Element) {
    return el.getBoundingClientRect()?.top <= (window.innerHeight || document.documentElement.clientHeight)
  }

  const main = document.querySelector('main')
  const paragraphs = Array.from(main.querySelectorAll('p,li,span,h1,h2,h3,h4,h5,h6')).filter(p => !isElementInViewport(p))
  const observePargraphs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.remove(s.active)
      else if (entry.boundingClientRect.top > 100)
        entry.target.classList.add(s.active)
    })
  }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' })

  paragraphs.forEach(p => {
    p.classList.add(s.paragraph)
    observePargraphs.observe(p)
  })

  return () => {
    observePargraphs.disconnect()
  }
}

function orangeFade() {
  const imageOverlays = Array.from(document.querySelectorAll("div[data-image-overlay]"))
  document.body.classList.add('bodyfade')
  setTimeout(() => document.body.classList.add('fadeout'), 20)
  setTimeout(() => {
    document.body.classList.remove('bodyfade')
    document.body.classList.remove('fadeout')
    imageOverlays.forEach(img => img.remove())
  }, 700)
}