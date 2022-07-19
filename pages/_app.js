import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Wrapper from '../componets/Wrapper'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider options={{ clientMaxAge: 0 }} session={pageProps.session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  )
}

export default MyApp
