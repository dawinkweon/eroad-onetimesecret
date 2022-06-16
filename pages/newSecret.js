import { useRouter } from 'next/router'

import { Card } from '@components/Card'
import { EroadTitle } from '@components/EroadTitle'
import { TextArea } from '@components/TextArea'
import { Button } from '@components/Button'

export default function NewSecret() {
	const router = useRouter()
	const { url, recipient } = router.query

	const handleOnCopyClicked = () => {
		navigator.clipboard.writeText(url)
	}

	const handleCreateNewLink = () => {
		router.push('/')
	}

	return (
		<>
			<EroadTitle />

			<Card className="flex flex-col gap-4">
				{url ? (
					<>
						<h3 className="text-md font-bold">
							Great! Now share this one time secret link with the intended recipient
						</h3>
						<TextArea value={url} isReadOnly={true} />
					</>
				) : (
					<h2 className="text-center text-xl">
						A link to the secret has been sent to the recipient{' '}
						<span className="font-bold">{recipient}</span>
					</h2>
				)}
				<div className="flex self-end gap-4">
					<Button onClick={handleCreateNewLink} className="self-end" variant="secondary">
						Create new link
					</Button>

					{url && (
						<Button onClick={handleOnCopyClicked} className="self-end">
							Copy to clipboard
						</Button>
					)}
				</div>
			</Card>
		</>
	)
}
