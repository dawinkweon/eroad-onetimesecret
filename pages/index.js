import Head from 'next/head'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-items-center items-center">
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
