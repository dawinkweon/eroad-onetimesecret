const TextArea = ({ value, isReadOnly = false }) => {
	return (
		<textarea
			readOnly={isReadOnly}
			value={value}
			className="read-only:text-gray-500 text-black rounded p-2"
		/>
	)
}

export { TextArea }
