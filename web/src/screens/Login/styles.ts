import styled from 'styled-components'

export const Container = styled.main`
  h1 {
    text-align: center;
    margin-bottom: 16px;
  }

  a {
    margin: 24px 16px 0;
    display: block;
    text-align: center;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`
