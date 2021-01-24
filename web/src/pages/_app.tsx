import React from 'react'

import { AppProps } from 'next/dist/next-server/lib/router/router'

import { ThemeProvider } from 'styled-components'

import Hooks from 'src/hooks'

import GlobalStyles from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Hooks>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </Hooks>
  )
}

export default MyApp
