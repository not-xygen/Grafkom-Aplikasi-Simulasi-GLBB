import React, { useRef, useEffect } from 'react'

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

function point(x, y) {
	return new Point(x, y)
}

const Canvas = (props) => {
	const canvasRef = useRef(null)
	const canvasWidth = props.canvaswidth
	const canvasHeight = props.canvasheight
	const xPos = props.xvalue
	const yPos = props.yvalue
	const radius = props.radius

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
		drawBall(ctx, xPos, yPos)
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

export default Canvas
