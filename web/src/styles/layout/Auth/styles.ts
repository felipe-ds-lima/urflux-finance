import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`

export const Panel = styled.div`
  background-color: ${props => props.theme.colors.backgroundDark};
  height: fit-content;
  margin-top: 100px;
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  padding: 16px;

  > div {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    svg {
      font-size: 48px;
    }
  }
`
