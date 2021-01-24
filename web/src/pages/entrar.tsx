import React from 'react'

import Head from 'next/head'

import Login from 'src/screens/Login'
import Auth from 'src/styles/layout/Auth'

const Entrar: React.FC = () => {
  return (
    <main>
      <Head>
        <title>Entrar | urFlux Finance</title>
      </Head>

      <Auth>
        <Login />
      </Auth>
    </main>
  )
}

export default Entrar
