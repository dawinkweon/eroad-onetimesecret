import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>EROAD One Time Secret</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          Welcome to EROAD One Time Secret
        </p>
      </main>

      <Footer />
    </div>
  )
}
