'use client'

import s from './OrangePower.module.scss'
import cn from 'classnames'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { useRef, useState } from 'react';
import { useScrollData } from "scroll-data-hook";

export default function OrangePower({ }: {}) {

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
}