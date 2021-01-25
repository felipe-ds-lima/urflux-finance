import React, { useMemo } from 'react'

import { Container } from './styles'

const Footer: React.FC = () => {
  const year = useMemo(() => {
    return new Date().getFullYear()
  }, [])

  return (
    <Container>
      <div>
        <p>{year} &copy; urFlux Finance</p>

        <p>
          Made with{' '}
          <span role="img" aria-label="love">
            💜
          </span>{' '}
          by{' '}
          <a
            href="https://monts.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Monts
            <img src="https://monts.com.br/logo-square.png" alt="Logo" />
          </a>
        </p>
      </div>
    </Container>
  )
}

export default Footer
