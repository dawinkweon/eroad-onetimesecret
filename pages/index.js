import Head from 'next/head'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-items-center items-center">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center m-auto">
          <h1 className="text-4xl font-bold underline">
              EROAD's one time secret
          </h1>
      </main>

      <Footer />
    </div>
  )
}
