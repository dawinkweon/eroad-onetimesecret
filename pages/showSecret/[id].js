import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Card } from '@components/Card'
import { EroadTitle } from '@components/EroadTitle'
import { TextArea } from '@components/TextArea'
import { Button } from '@components/Button'

const ShowSecret = () => {
	const router = useRouter()
	const { id, token } = router.query
	const [secret, setSecret] = useState('')

	useEffect(() => {
		// call api to get the value
		setSecret('my super secret')
	}, [])

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
