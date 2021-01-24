import React from 'react'

import { Container } from './styles'

interface ILoadingZoom {
  zoom?: number
}

const Loading: React.FC<ILoadingZoom> = ({ zoom = 0.5 }) => {
  return (
    <Container zoom={zoom}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  )
}

export default Loading
