import { Card } from '@components/Card'
import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'

export default function Home() {
	return (
		<>
			<section>
				<h1 className="text-3xl font-bold">EROAD</h1>
				<h2 className="text-xl tracking-widest">secret sharer</h2>
			</section>

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
