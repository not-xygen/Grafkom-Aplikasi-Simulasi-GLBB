import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@features',
				replacement: path.resolve(__dirname, './src/features/'),
			},
			{
				find: '@pages',
				replacement: path.resolve(__dirname, './src/pages/'),
			},
		],
	},
	plugins: [react()],
})
