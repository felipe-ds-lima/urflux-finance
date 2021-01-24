import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuth } from 'src/hooks/auth'

import LogoTagline from '../../../assets/images/logo-tagline.svg'
import { Container, Panel } from './styles'

const Auth: React.FC = ({ children }) => {
  const { loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/')
    }
  }, [loading, router, user])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Panel>
        <div>
          <LogoTagline />
        </div>
        {children}
      </Panel>
    </Container>
  )
}

export default Auth
