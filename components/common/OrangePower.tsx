'use client'

import s from './OrangePower.module.scss'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { useState } from 'react';
import { useScrollData } from "scroll-data-hook";

export default function OrangePower({ }: {}) {

  const [active, setActive] = useState(false)

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

  const height = Math.floor((speed.y / 10000) * 100)
  const styles = {
    top: scrolling ? direction.y === 'down' ? `${100 - height}vh` : `${height - 100}vh` : '100vh',
  }

  return (
    <div className={s.orange} style={styles}></div>
  );
}