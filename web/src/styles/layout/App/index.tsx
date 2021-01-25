import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuth } from 'src/hooks/auth'

import Footer from './Footer'
import Header from './Header'
import { Container, Wrapper } from './styles'

const App: React.FC = ({ children }) => {
  const { loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/entrar')
    }
  }, [loading, router, user])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Container>
  )
}

export default App
