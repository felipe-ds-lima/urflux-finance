import styled from 'styled-components'

import { darken, grayscale } from 'polished'

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 4px 16px;
  height: 48px;
  max-height: 48px;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  color: ${props => props.theme.colors.backgroundDark};
  background-color: ${props => props.theme.colors.secondary};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => darken(0.2, props.theme.colors.secondary)};
  }

  &:disabled {
    background-color: ${props => grayscale(props.theme.colors.secondary)};
  }
`
