'use server'

import Article from '@components/Article'
import LoginForm from './LoginForm'
import { Metadata } from 'next';

export default async function Login() {

  return (
    <Article id={'login'} title="Logga in">
      <LoginForm />
    </Article>
  );
}

export async function generateMetadata({ params }) {

  return {
    title: 'Logga in',
  } as Metadata
}

