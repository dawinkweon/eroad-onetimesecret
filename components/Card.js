import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Card = ({ children, isLoading = false }) => {
	return (
		<div className="rounded bg-eroad-red p-4 text-white">
			{isLoading ? (
				<div className="flex w-full">
					<FontAwesomeIcon
						className="animate-spin flex m-auto"
						size="2x"
						icon={faSpinner}
					/>
				</div>
			) : (
				children
			)}
		</div>
	)
}

export { Card }
