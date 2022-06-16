import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'

import { Card } from '@components/Card'
import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'
import { EroadTitle } from '@components/EroadTitle'

export default function Home() {
	const router = useRouter()

	const [secret, setSecret] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleOnChange = (event) => {
		setSecret(event.target.value)
	}

	const onFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		const response = await axios.post('/api/v1/secret', {
			secretText: secret,
		})

		router.push({ pathname: 'newSecret', query: { url: response.data.secretUrl } })
	}

	return (
		<>
			<EroadTitle />

			<Card isLoading={isLoading}>
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
