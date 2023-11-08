'use client'

import s from './OrangePower.module.scss'
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

  const height = Math.floor((speed.y / 5000) * 100)
  stylesRef.current = { top: active && direction.y === 'down' ? `${100 - height}vh` : '100vh' }

  return (
    <div className={s.orange} style={stylesRef.current}></div>
  );
}