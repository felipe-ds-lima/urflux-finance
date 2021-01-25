import styled from 'styled-components'

import { darken, transparentize } from 'polished'

export const Container = styled.section`
  border: 1px solid ${props => transparentize(0.3, props.theme.colors.text)};
  padding: 4px 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-left: 8px;
  position: relative;

  p {
    font-size: 18px;
    pointer-events: none;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    width: fit-content;
    background: none;
    border: none;
    margin-left: 4px;
    color: ${props => props.theme.colors.text};
  }
`

export const InvoiceList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  border: 1px solid ${props => transparentize(0.3, props.theme.colors.text)};
  border-radius: 5px;
  list-style: none;
  overflow: hidden;

  button {
    display: flex;
    align-items: center;
    height: fit-content;
    width: fit-content;
    padding: 4px 8px;
    width: 100%;
    justify-content: flex-start;
    min-width: 130px;
    border: none;
    background-color: ${props => props.theme.colors.backgroundDark};
    color: ${props => props.theme.colors.text};
    transition: background 0.2s;

    &:hover {
      background-color: ${props =>
        darken(0.03, props.theme.colors.backgroundDark)};
    }
  }
`
