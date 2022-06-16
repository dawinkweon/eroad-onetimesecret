const Button = ({ children, type = 'button', className, onClick }) => {
	return (
		<button
			type={type}
			className={`rounded font-bold bg-cyan-500 p-2 ${className}`}
			onClick={() => onClick && onClick()}
		>
			{children}
		</button>
	)
}

export { Button }
