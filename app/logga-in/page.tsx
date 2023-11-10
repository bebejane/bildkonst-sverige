'use server'

import Article from '@components/Article'
import LoginForm from './LoginForm'

export default async function Login() {

  return (
    <Article id={'login'} title="Logga in">
      <LoginForm />
    </Article>
  );
}
