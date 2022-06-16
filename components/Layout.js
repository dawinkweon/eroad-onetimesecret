import Head from 'next/head'

import Footer from '@components/Footer'
const Layout = ({ children }) => {
	return (
		<div className="flex flex-col h-screen justify-items-center items-center">
			<Head>
				<title>EROAD One Time Secret</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="m-auto w-11/12 sm:w-3/4 lg:w-2/4 flex flex-col gap-4">{children}</main>
			<Footer />
		</div>
	)
}

export { Layout }
