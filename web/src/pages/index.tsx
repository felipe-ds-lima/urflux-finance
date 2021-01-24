import React from 'react'

import Head from 'next/head'

import Dashboard from 'src/screens/Dashboard'
import App from 'src/styles/layout/App'

const Home: React.FC = () => {
  return (
    <main>
      <Head>
        <title>urFlux Finance</title>
      </Head>

      <App>
        <Dashboard />
      </App>
    </main>
  )
}

export default Home
