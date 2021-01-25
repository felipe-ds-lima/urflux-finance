import styled from 'styled-components'

export const Container = styled.footer`
  background-color: ${props => props.theme.colors.backgroundDark};
  height: 60px;
  margin-top: 40px;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1180px;
    width: 90%;
    margin: 0 auto;

    p {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        margin-left: 8px;
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        opacity: 0.8;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }

        img {
          width: 32px;
          height: 32px;
          margin-left: 8px;
        }
      }
    }
  }
`
