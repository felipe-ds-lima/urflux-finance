import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.paragraph};
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    color: ${props => props.theme.colors.text};
    font-weight: bold;
  }

  h1 {
    font-size: ${props => props.theme.texts.heading1};
  }
  h2 {
    font-size: ${props => props.theme.texts.heading2};
  }
  h3 {
    font-size: ${props => props.theme.texts.heading3};
  }
  h4, h5, h6 {
    font-size: ${props => props.theme.texts.heading4};
  }

  p, span, strong, button, input {
    font-family: ${props => props.theme.fonts.paragraph};
    font-size: ${props => props.theme.texts.textNormal};
  }

  button {
    cursor: pointer;
  }
`
