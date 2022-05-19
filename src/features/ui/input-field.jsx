import { useCallback } from 'react'

export function InputField({ labelName, value, minValue, onChangeValue }) {
	const handleInputChange = useCallback(
		(event) => {
			onChangeValue(
				event.target.value === '' ? '' : Number(event.target.value)
			)
		},
		[onChangeValue]
	)

	return (
		<div>
			<h1>{labelName}</h1>
			<input
				type='number'
				className='text-stone-900 bg-stone-400 rounded-lg'
				value={value}
				min={minValue}
				onChange={handleInputChange}
				steps={1}
			/>
		</div>
	)
}
