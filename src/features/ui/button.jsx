export function Button({ labelName, func }) {
	return (
		<div>
			<button
				className='m-2 p-2 rounded-md border-2 border-stone-900'
				onClick={func}
			>
				{labelName}
			</button>
		</div>
	)
}
