import { SessionProvider } from 'next-auth/react'
import Wrapper from '../componets/Wrapper'
import { CssBaseline, ThemeProvider,createTheme } from '@mui/material'

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider options={{ clientMaxAge: 0 }} session={pageProps.session}>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Wrapper>
    </SessionProvider>
  )
}

export default MyApp
