import styled, { css, keyframes } from 'styled-components'

interface IContainerProps {
  active: boolean
}

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

export const Container = styled.a<IContainerProps>`
  display: block;
  padding: 0 8px 8px;
  font-size: ${props => props.theme.texts.textBig};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      &::before {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: 4px;
        background-color: ${props => props.theme.colors.secondary};
        animation: 1s ease-out 0s 1 ${slideInFromLeft};
      }
    `}
`
