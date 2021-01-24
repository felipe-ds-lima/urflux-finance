import styled, { css } from 'styled-components'

import { lighten, transparentize } from 'polished'

interface IContainerProps {
  status: 'normal' | 'focus' | 'error'
}

interface IInfoProps {
  type: 'info' | 'success' | 'error' | 'warning' | 'default'
  positionY?: 'top' | 'bottom'
  positionX?: 'left' | 'right'
}

export const Container = styled.label<IContainerProps>`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-bottom: 8px;
  border: 2px solid ${props => transparentize(0.4, props.theme.colors.text)};
  transition: border 0.2s;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    min-width: 40px;
    border: none;
    background: none;
    color: ${props => transparentize(0.4, props.theme.colors.text)};
    position: relative;
    transition: color 0.2s;

    &.info {
      svg {
        color: ${props => transparentize(0.6, props.theme.colors.text)};
      }
    }

    &.error {
      svg {
        color: ${props => transparentize(0.6, props.theme.colors.error)};
      }
    }

    &:hover {
      div {
        opacity: 1;
      }
    }
  }

  ${props =>
    props.status === 'focus' &&
    css`
      border: 2px solid ${props => lighten(0.05, props.theme.colors.primary)};
      > div {
        color: ${props => lighten(0.05, props.theme.colors.primary)};
      }
    `}

  ${props =>
    props.status === 'error' &&
    css`
      border: 2px solid ${props => lighten(0.05, props.theme.colors.error)};
      > div {
        color: ${props => lighten(0.05, props.theme.colors.error)};
      }
    `}

  input {
    width: 100%;
    background: none;
    border: none;
    outline: none;
    color: ${props => props.theme.colors.text};

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: all 9999s ease-in-out 0s;
      transition-property: background-color, color;
    }
  }
`

export const Info = styled.div<IInfoProps>`
  position: absolute;

  padding: 8px 16px;
  background-color: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors[props.type]};
  border: 2px solid ${props => props.theme.colors[props.type]};
  opacity: 0;
  transition: 0.2s;
  pointer-events: none;
  z-index: 2;
  width: max-content;
  max-width: 200px;
  text-align: center;
  border-radius: 8px;

  ${props =>
    (!props.positionY || props.positionY === 'top') &&
    css`
      bottom: 24px;
    `}

  ${props =>
    props.positionY === 'bottom' &&
    css`
      top: 24px;
    `}

    ${props =>
    (!props.positionX || props.positionX === 'left') &&
    css`
      right: 20px;
    `}

    ${props =>
    props.positionX === 'right' &&
    css`
      left: 20px;
    `}

    ${props =>
    props.positionX === 'right' &&
    props.positionY === 'top' &&
    css`
      border-radius: 8px 8px 8px 0;
    `}

    ${props =>
    props.positionX === 'left' &&
    props.positionY === 'top' &&
    css`
      border-radius: 8px 8px 0 8px;
    `}


    ${props =>
    props.positionX === 'right' &&
    props.positionY === 'bottom' &&
    css`
      border-radius: 0 8px 8px 8px;
    `}

    ${props =>
    props.positionX === 'left' &&
    props.positionY === 'bottom' &&
    css`
      border-radius: 8px 0 8px 8px;
    `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props =>
      transparentize(0.75, props.theme.colors[props.type])};
  }
`
