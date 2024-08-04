import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'build'
	},
	server: {
		port: process.env.PORT || 3000,
		host: '0.0.0.0'
	}
});
