const Button = ({ children, type = 'button', className }) => {
	return (
		<button type={type} className={`rounded font-bold bg-cyan-500 p-2 ${className}`}>
			{children}
		</button>
	)
}

export { Button }
