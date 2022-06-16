const TextArea = ({ value, name, onChange, style, isReadOnly = false }) => {
	return (
		<textarea
			style={{...style}}
			readOnly={isReadOnly}
			value={value}
            name={name}
            onChange={onChange}
			className="read-only:text-gray-500 text-black rounded p-2"
		/>
	)
}

export { TextArea }
