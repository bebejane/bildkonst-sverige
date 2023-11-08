'use client'

import s from './OrangePower.module.scss'
import cn from 'classnames'
import { is } from 'date-fns/locale';
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useRef, useState } from 'react';
import { useScrollData } from "scroll-data-hook";


function isElementInViewport(el: HTMLElement) {
  return el.getBoundingClientRect()?.top <= (window.innerHeight || document.documentElement.clientHeight)
}

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
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -20% 0px'

    })

    paragraphs.forEach(p => {
      p.classList.add(s.paragraph)
      observePargraphs.observe(p)
    })

    return () => {
      observePargraphs.disconnect()
    }
  }, [pathname])



  return null
  /*
  const [active, setActive] = useState(false)
  const stylesRef = useRef<any>({})
  const {
    scrolling,
    time,
    speed,
    direction,
    position,
    relativeDistance,
    totalDistance
  } = useScrollData({
    onScrollStart: () => setActive(true),
    onScrollEnd: () => setActive(false)
  });

  const height = Math.floor((speed.y / 10000) * 50)
  stylesRef.current = direction.y === 'down' ? { top: `${90 - height}vh` } : direction.y === 'up' ? { top: '100vh' } : stylesRef.current

  return (
    <div className={cn(s.orange, active && s.active)} style={stylesRef.current}></div>
  );
  */
}