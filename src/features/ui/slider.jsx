import { useCallback } from 'react'

export function Slider({
	labelName,
	value,
	onChangeValue,
	minValue,
	maxValue,
}) {
	const handleInputChange = useCallback(
		(event) => {
			onChangeValue(
				event.target.value === '' ? '' : Number(event.target.value)
			)
		},
		[onChangeValue]
	)

	const handleBlur = () => {
		if (value < minValue) {
			onChangeValue(minValue)
		} else if (value > maxValue) {
			onChangeValue(maxValue)
		}
	}

	return (
		<div>
			<h1>{labelName}</h1>
			<input
				type='range'
				className='w-full h-2 appearance-none text-stone-900 bg-stone-400 rounded-lg'
				value={value}
				min={minValue}
				max={maxValue}
				steps={1}
				onChange={handleInputChange}
				onBlur={handleBlur}
			/>
		</div>
	)
}
