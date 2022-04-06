import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  title?: string,
  cookie: string,
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title', cookie }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <h2>
                Freights
              </h2>
            </a>
            <Link href={`/landing`}>
              <button style={ { display: cookie ? 'block' : 'none' } } className="btn btn-light">Freights list</button>
            </Link>
            <Link href={`/removed`}>
              <button style={ { display: cookie ? 'block' : 'none' } } className="btn btn-light">Removed list</button>
            </Link>
        </nav>
    </header>
    {children}
    <hr/>
  </div>
)

export default Layout