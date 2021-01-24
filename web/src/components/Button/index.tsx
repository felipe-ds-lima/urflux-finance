import React from 'react'

import Loading from '@components/Loading'

import { Container } from './styles'

interface IOwnProps {
  loading?: boolean
}

type IButtonProps = IOwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<IButtonProps> = ({ children, loading, ...rest }) => {
  return <Container {...rest}>{loading ? <Loading /> : children}</Container>
}

export default Button
