import classnames from 'classnames'

const Button = ({ children, type = 'button', className, onClick, variant = 'primary' }) => {
	const classes = classnames([
		'drop-shadow-md rounded font-bold p-2',
		className,
		{
			'border-2 border-sky-600 bg-sky-600 active:bg-sky-500 active:border-sky-500':
				variant === 'primary',
		},
		{ 'border-2 border-sky-600 active:border-sky-500': variant !== 'primary' },
	])

	return (
		<button type={type} className={classes} onClick={() => onClick && onClick()}>
			{children}
		</button>
	)
}

export { Button }
