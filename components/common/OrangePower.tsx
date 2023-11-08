'use client'

import s from './OrangePower.module.scss'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function OrangePower({ }: {}) {

  const pathname = usePathname()
  useEffect(() => {
    const paragraphs = Array.from(document.querySelectorAll('p')).filter(p => !isElementInViewport(p))
    const observePargraphs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(s.active)
        } else {
          entry.target.classList.add(s.active)
        }
      })
    }, { threshold: 0.2, rootMargin: '0px 0px -20% 0px' })

    paragraphs.forEach(p => {
      p.classList.add(s.paragraph)
      observePargraphs.observe(p)
    })

    return () => {
      observePargraphs.disconnect()
    }
  }, [pathname])

  return null
}

function isElementInViewport(el: HTMLElement) {
  return el.getBoundingClientRect()?.top <= (window.innerHeight || document.documentElement.clientHeight)
}
