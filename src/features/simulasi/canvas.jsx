import React, { useRef, useEffect, useState } from 'react'

function rn() {
	return performance.now()
}

function elapsed(time) {
	let elapsed = rn() - time
	elapsed /= 1000
	return elapsed
}

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class VerticalState {
	constructor() {
		;[this.acceleration, this.setAcceleration] = useState(10)
		;[this.direction, this.setDirection] = useState(0)
		;[this.isPlaying, this.setIsPlaying] = useState(false)
		;[this.start, this.setStart] = useState(rn())

		this.play = () => {
			this.setIsPlaying(true)
			this.setStart(rn())
			this.setAcceleration(10)
			this.setDirection(-1)
		}

		let [rerenderer, setRerenderer] = useState(rn())
		this.move = (pos, max) => {
			if (this.isPlaying) {
				let time = elapsed(this.start)
				let acceleration = this.acceleration
				setRerenderer(rn())
				if (time > 0.01) {
					console.log(time)
					if (this.direction == -1) {
						acceleration += 9.8
						acceleration += acceleration * time
						pos += acceleration

						if (pos > max) {
							this.setDirection(1)
							pos = max
						}
					} else if (this.direction == 1) {
						acceleration -= 9.8
						acceleration -= acceleration * time
						pos -= acceleration
						if (acceleration <= 0) {
							this.setDirection(-1)
						}
					}

					this.setAcceleration(acceleration)
					this.setStart(rn())

					if (acceleration <= 0 && pos >= max) {
						this.setIsPlaying(false)
					}
				}
			}
			return pos
		}
	}
}

class HorizontalState {
	constructor() {
		;[this.velocity, this.setVelocity] = useState(200)
		;[this.friction, this.setFriction] = useState(0.5)
		;[this.acceleration, this.setAcceleration] = useState(100)
		;[this.direction, this.setDirection] = useState(0)
		;[this.isPlaying, this.setIsPlaying] = useState(false)
		;[this.start, this.setStart] = useState(rn())
		;[this.duration, this.setDuration] = useState(0)

		this.play = (direction) => {
			this.setIsPlaying(true)
			let start = rn()
			this.setStart(start)
			this.setDirection(direction)

			this.setDuration((this.velocity / this.acceleration) * 1000)
		}

		this.distance_at = (time) => {
			return (
				this.velocity * time + 0.5 * -this.acceleration * (time * time)
			)
		}

		this.velocity_at = (time) => {
			return this.velocity + -this.acceleration * time
		}

		this.move = (pos, max) => {
			let x = pos
			let direction = this.direction

			if (this.isPlaying) {
				let time = elapsed(this.start)

				let distance = this.distance_at(time)
				while (distance > 0) {
					let move_by = Math.min(distance, 5)
					distance -= move_by
					x += move_by * direction

					if (x < 0 || x > max) {
						direction *= -1
					}
				}

				const nextVelocity = this.velocity_at(time)
				this.setVelocity(nextVelocity)

				if (0 < this.duration) {
					this.play(direction)
				} else {
					this.setIsPlaying(false)
					this.setVelocity(0)
				}
			}
			return x
		}
	}
}

class CanvasState {
	constructor() {
		;[this.x, this.setX] = useState(200)
		;[this.y, this.setY] = useState(200)
		this.vertical = new VerticalState()
		this.radius = 50
		this.horizontal = new HorizontalState()

		this.radius = () => {
			return Math.sqrt(this.y + 100)
		}

		this.playHorizontal = (direction) => {
			this.horizontal.play(direction)
		}

		this.playVertical = () => {
			this.vertical.play()
		}

		this.isPlaying = () => {
			return this.horizontal.isPlaying || this.vertical.isPlaying
		}

		this.move = (canvasWidth) => {
			if (this.isPlaying()) {
				const x = this.horizontal.move(this.x, canvasWidth)
				const y = this.vertical.move(this.y, 470)
				this.setX(x)
				this.setY(y)

				console.log(x, y)

				return [x, y]
			} else {
				return [this.x, this.y]
			}
		}
	}

	radius = () => {
		return Math.sqrt(this.y + 100)
	}
}

const Canvas = (props) => {
	const canvasRef = useRef(null)
	const canvasWidth = props.canvaswidth
	const canvasHeight = props.canvasheight

	const state = props.state

	const radius = state.radius()

	function drawRotatingLine(ctx, x0, y0, radius) {
		let line = 4
		let points = [...Array(line).keys()]
			.map((it) => (it * 360.0) / line)
			.map((it) => it + x0 + y0)
			.map((it) => it * (Math.PI / 180))
			.map((it) => [
				x0 + radius * Math.cos(it),
				y0 + radius * Math.sin(it),
			])
			.forEach((it) => {
				let [x, y] = it
				ctx.beginPath()
				ctx.moveTo(x0, y0)
				ctx.lineTo(x, y)
				ctx.stroke()
			})
	}

	function drawBall(ctx, x, y) {
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, 2 * Math.PI)
		ctx.fillStyle = 'white'
		ctx.fill()
		ctx.strokeStyle = 'black'
		ctx.stroke()
		drawRotatingLine(ctx, x, y, radius)
	}

	const draw = (ctx) => {
		const [x, y] = state.move(canvasWidth, canvasHeight)
		drawBall(ctx, x, y)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		context.clearRect(0, 0, canvas.width, canvas.height)
		draw(context)
	}, [draw])

	return (
		<canvas
			ref={canvasRef}
			className='bg-slate-100 rounded-lg'
			height={canvasHeight}
			width={canvasWidth}
			{...props}
		/>
	)
}

export { Canvas, CanvasState, HorizontalState, VerticalState }
