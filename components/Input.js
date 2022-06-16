const Input = ({ value, onChange, type, className }) => {
	return (
		<input
			className={`rounded p-1 text-black ${className}`}
			type={type}
			value={value}
			onChange={onChange}
		/>
	)
}

export { Input }
