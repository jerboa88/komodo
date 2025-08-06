import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		monkey({
			entry: 'src/main.ts',
			userscript: {
				name: 'Enhancements for Komoot',
				icon: '../src/logo.svg',
				namespace: 'https://github.com/jerboa88',
				match: [
					'https://www.komoot.com/user/*/routes',
					'https://www.komoot.com/tour/*',
				],
				grant: 'none',
			},
			build: {
				autoGrant: false,
			},
		}),
	],
});
