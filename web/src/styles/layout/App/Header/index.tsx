import React from 'react'

import LogoTagline from '../../../../assets/images/logo-tagline.svg'
import InvoiceSelect from '../InvoiceSelect'
import MenuItem from '../MenuItem'
import { Container, Content, Background } from './styles'

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <LogoTagline />
        <nav>
          <MenuItem href="/">Listagem</MenuItem>
          <MenuItem href="/#perfil">Perfil</MenuItem>

          <InvoiceSelect />
        </nav>
      </Content>
      <Background />
    </Container>
  )
}

export default Header
