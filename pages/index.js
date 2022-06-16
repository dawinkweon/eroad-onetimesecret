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
	const [recipient, setRecipient] = useState('')
	const [isRecipientToggledOn, setIsRecipientToggledOn] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleOnChange = (event) => {
		setSecret(event.target.value)
	}

	const onRecipientChange = (event) => {
		setRecipient(event.target.value);
	}

	const handleRecipientToggleChange = (event) => {
		setIsRecipientToggledOn(event.target.checked);
	}

	const onFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		const response = await axios.post('/api/v1/secret', {
			secretText: secret,
			recipient
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
					<div>
						<input style={{display:"inline-block"}} type="checkbox" value={isRecipientToggledOn} onChange={handleRecipientToggleChange}/>
						<label className="text-md font-bold">&nbsp;Specify recipient?&nbsp;</label>
						{ isRecipientToggledOn && <TextArea style={{height: "2em"}} value={recipient} onChange={onRecipientChange} name="recipient" />}
					</div>
					{/** jezza@pobox.com **/}
					<Button className="self-end" type="submit">
						Submit
					</Button>
				</form>
			</Card>
		</>
	)
}
