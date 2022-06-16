import { Card } from '@components/Card'
import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'

export default function Home() {
	return (
		<>
			<EroadTitle />

			<Card>
				<form className="flex flex-col gap-4">
					<h3 className="text-md font-bold">What's your secret?</h3>
					<TextArea value="" />
					<Button className="self-end" type="submit">
						Submit
					</Button>
				</form>
			</Card>
		</>
	)
}
