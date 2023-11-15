'use server'

import { default as RootLayout, LayoutProps } from '@components/RootLayout';
import { generateMetadata as gMetaData } from '@components/RootLayout';

export default async function Layout({ children }: LayoutProps) {
  return <RootLayout>{children}</RootLayout>
}

export async function generateMetadata() {
  return gMetaData();
}