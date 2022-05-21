import { useState } from 'react'
import Canvas from '@features/simulasi'
import { Slider, InputField, Button } from '@features/ui'

export function Page() {
	const [x, setX] = useState(375)
	const [y, setY] = useState(250)
	const [velocity, setVelocity] = useState(0)
	const [friction, setFriction] = useState(1)
	const [accel, setAccel] = useState(10)
	const canvasWidth = 750
	const canvasHeight = 500
	const radius = Math.sqrt(y + 100)

	function affectGravity(duration) {
		window.setInterval(() => {
			if (y != canvasHeight || accel != 0) {
				setY(y + accel)
				if (y > canvasHeight) {
					setY(Math.max(0, Math.min(y, canvasHeight)))
					setAccel(accel * -1)
					setAccel((accel * 0.5).floor())
				}
				setAccel(accel + 1)
			} else {
				window.clearInterval()
			}
		}, duration)
	}

	console.log(velocity)

	function affectToTheLeft(duration) {
		window.setInterval(() => {
			if (velocity > 0) {
				if (x - velocity >= canvasWidth || x - velocity <= 0) {
					setVelocity(velocity * -1)
					setFriction(friction * -1)
				}
				setX(x - velocity)
				setVelocity(velocity - friction)
			} else {
				setVelocity(0)
				window.clearInterval()
			}
		}, duration)
	}

	function affectToTheRight() {
		if (velocity > 0 && x < 750) {
			setX(x + velocity)
			setVelocity(velocity - friction)
		}
	}

	return (
		<div className='w-screen h-screen bg-stone-300'>
			<h1 className='flex justify-center items-center py-5 text-2xl font-semibold'>
				Aplikasi Simulasi GLBB
			</h1>
			<div className='flex justify-center items-center'>
				<Canvas
					xvalue={x}
					yvalue={y}
					canvaswidth={canvasWidth}
					canvasheight={canvasHeight}
					radius={radius}
				/>
				<div className='w-72 m-2 p-2'>
					<Slider
						labelName={'X Position'}
						value={x}
						onChangeValue={setX}
						minValue={20}
						maxValue={730}
					/>
					<Slider
						labelName={'Y Position'}
						value={y}
						onChangeValue={setY}
						minValue={12}
						maxValue={475}
					/>
					<InputField
						labelName={'Velocity'}
						value={velocity}
						minValue={1}
						onChangeValue={setVelocity}
					/>
					{/* <InputField
						labelName={'Friction'}
						value={friction}
						minValue={1}
						onChangeValue={setFriction}
					/> */}
					<div className='flex'>
						<Button labelName={'<<'} func={affectToTheLeft(100)} />
						<Button labelName={'V'} func={affectGravity} />
						<Button labelName={'>>'} func={affectToTheRight} />
					</div>
				</div>
			</div>
		</div>
	)
}
