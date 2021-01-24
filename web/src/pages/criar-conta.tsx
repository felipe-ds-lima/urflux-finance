import React from 'react'

import Head from 'next/head'

import SignUp from 'src/screens/SignUp'
import Auth from 'src/styles/layout/Auth'

const Entrar: React.FC = () => {
  return (
    <main>
      <Head>
        <title>Criar conta | urFlux Finance</title>
      </Head>

      <Auth>
        <SignUp />
      </Auth>
    </main>
  )
}

export default Entrar
