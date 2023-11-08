import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bildkonst Sverige',
    short_name: 'Bildkonst Sverige',
    description: 'Bildkonst Sverige',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff7a00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}