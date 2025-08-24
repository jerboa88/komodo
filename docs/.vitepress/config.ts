import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';
import { description } from '../../package.json';
import { PROJECT } from '../../src/constants.ts';

type AbsolutePath = `/${string}`;
type Page = {
	text: string;
	path: string;
};

const title = `${PROJECT.NAME} - ${PROJECT.TAGLINE}`;
const rootPath: AbsolutePath = '/docs';
const logoPath: AbsolutePath = '/logo_static.png';
const pages: Page[] = [
	{
		text: 'Docs',
		path: 'docs',
	},
	{
		text: 'Contributing',
		path: 'contributing',
	},
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: 'en-US',
	title,
	description,
	head: [['link', { rel: 'icon', href: logoPath }]],
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: logoPath,
		outline: 'deep',
		nav: [
			{ text: 'Home', link: '/' },
			...pages.map(({ text, path }) => ({
				text,
				link: `/${path}/`,
			})),
		],
		sidebar: generateSidebar(
			pages.map(({ path }) => ({
				documentRootPath: rootPath,
				scanStartPath: path,
				resolvePath: `/${path}/`,
				useTitleFromFrontmatter: true,
				useTitleFromFileHeading: true,
				useFolderTitleFromIndexFile: true,
				useFolderLinkFromIndexFile: true,
				sortMenusByFrontmatterOrder: true,
			})),
		),
		editLink: {
			pattern: 'https://github.com/jerboa88/komodo/edit/main/docs/:path',
			text: 'Edit this page on GitHub',
		},
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/jerboa88/komodo',
			},
		],
		search: {
			provider: 'local',
		},
	},
	cleanUrls: true,
	lastUpdated: true,
	markdown: {
		config(md) {
			// Rewrite image links from README.md to account for Vitepress working dir
			md.renderer.rules.image = (tokens, idx, options, _env, self) => {
				const token = tokens[idx];
				const src = token.attrGet('src');

				if (src?.startsWith(rootPath)) {
					const newSrc = src.replace(rootPath, '');

					token.attrSet('src', newSrc);
				}

				return self.renderToken(tokens, idx, options);
			};
		},
	},
});
