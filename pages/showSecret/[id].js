import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Card } from '@components/Card'
import { EroadTitle } from '@components/EroadTitle'
import { TextArea } from '@components/TextArea'
import { Button } from '@components/Button'

const ShowSecret = () => {
	const router = useRouter()
	const [secret, setSecret] = useState('')
	const { id, token } = router.query

	useEffect(() => {
		const fetchSecret = async () => {
			const response = await axios.post('/api/v1/revealSecret', {
				token,
				id,
			})
			setSecret(response.data.secret)
		}
		if (token) fetchSecret()
	}, [token])

	const handleOnCopyClicked = () => {
		navigator.clipboard.writeText(secret)
	}

	return (
		<>
			<EroadTitle />
			<Card className="flex flex-col gap-4">
				<h3 className="text-md font-bold">Here's your secret</h3>
				<TextArea value={secret} isReadOnly={true} />
				<Button onClick={handleOnCopyClicked} className="self-end">
					Copy to clipboard
				</Button>
			</Card>
		</>
	)
}

export default ShowSecret
