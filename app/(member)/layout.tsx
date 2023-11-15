'use server'

import { default as RootLayout, LayoutProps } from '@components/RootLayout';
import { generateMetadata as gMetaData } from '@components/RootLayout';

export default async function Layout({ children }: LayoutProps) {
  return <RootLayout backgroundColor={'var(--member-color)'}>{children}</RootLayout>
}

export async function generateMetadata() {
  return gMetaData();
}