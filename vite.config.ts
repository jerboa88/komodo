import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { PROJECT } from './src/constants';

const iconPath = resolve(__dirname, 'src/logo_static.png');
const iconBuffer = readFileSync(iconPath);
const iconBase64 = `data:image/png;base64,${iconBuffer.toString('base64')}`;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		monkey({
			entry: 'src/main.ts',
			userscript: {
				name: `${PROJECT.NAME} - ${PROJECT.TAGLINE}`,
				icon: iconBase64,
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
