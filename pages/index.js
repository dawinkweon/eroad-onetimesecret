import { useRouter } from 'next/router'
import { useState } from 'react'

import { Card } from '@components/Card'
import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'
import { EroadTitle } from '@components/EroadTitle'

export default function Home() {
	const router = useRouter()

	const [secret, setSecret] = useState('')
	const handleOnChange = (event) => {
		setSecret(event.target.value)
	}

	const onFormSubmit = async (event) => {
		event.preventDefault()

		const JSONdata = JSON.stringify({ secretText: secret })
		const endpoint = '/api/v1/secret'

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		}

		const response = await fetch(endpoint, options)

		const result = await response.json()

		router.push({ pathname: 'newSecret', query: { url: result.secretUrl } })
	}

	return (
		<>
			<EroadTitle />

			<Card>
				<form onSubmit={onFormSubmit} className="flex flex-col gap-4" method="post">
					<h3 className="text-md font-bold">What's your secret?</h3>
					<TextArea value={secret} onChange={handleOnChange} name="secretText" />
					<Button className="self-end" type="submit">
						Submit
					</Button>
				</form>
			</Card>
		</>
	)
}
