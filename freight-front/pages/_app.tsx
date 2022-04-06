import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import { CookiesProvider } from 'react-cookie'
import 'bootstrap-icons/font/bootstrap-icons.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    )
}

export default MyApp
