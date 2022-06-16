import classnames from 'classnames'

const Button = ({ children, type = 'button', className, onClick, variant = 'primary' }) => {
	const classes = classnames([
		'drop-shadow-md rounded font-bold p-2',
		className,
		{ 'border-2 border-cyan-500 bg-cyan-500': variant === 'primary' },
		{ 'border-2 border-cyan-500': variant !== 'primary' },
	])

	return (
		<button type={type} className={classes} onClick={() => onClick && onClick()}>
			{children}
		</button>
	)
}

export { Button }
