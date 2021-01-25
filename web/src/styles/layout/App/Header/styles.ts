import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  position: relative;
`

export const Content = styled.header`
  max-width: 1180px;
  width: 90%;
  height: 80px;
  margin: 0 auto 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    font-size: 48px;
  }

  nav {
    display: flex;
    align-items: center;
  }
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 232px;
  z-index: -1;
  background-color: ${props => props.theme.colors.backgroundDark};
`
