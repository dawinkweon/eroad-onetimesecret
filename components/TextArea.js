const TextArea = ({ value, name, onChange, isReadOnly = false }) => {
	return (
		<textarea
			readOnly={isReadOnly}
			value={value}
            name={name}
            onChange={onChange}
			className="read-only:text-gray-500 text-black rounded p-2"
		/>
	)
}

export { TextArea }
