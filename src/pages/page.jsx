import { Canvas, CanvasState } from '@features/simulasi'
import { Slider, InputField, Button } from '@features/ui'

export function Page() {
	const state = new CanvasState()
	const { x, setX, y, setY } = state

	let { velocity, setVelocity } = state.horizontal
	const canvasWidth = 750
	const canvasHeight = 500

	function affectGravity() {
		state.playVertical()
	}

	function affectToTheLeft() {
		state.playHorizontal(-1)
	}

	function affectToTheRight() {
		state.playHorizontal(1)
	}

	return (
		<div className='w-screen h-screen bg-stone-300'>
			<h1 className='flex justify-center items-center py-5 text-2xl font-semibold'>
				Aplikasi Simulasi GLBB
			</h1>
			<div className='flex justify-center items-center'>
				<Canvas
					state={state}
					canvaswidth={canvasWidth}
					canvasheight={canvasHeight}
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
					<div className='flex'>
						<Button labelName={'<<'} func={affectToTheLeft} />
						<Button labelName={'V'} func={affectGravity} />
						<Button labelName={'>>'} func={affectToTheRight} />
					</div>
				</div>
			</div>
		</div>
	)
}
