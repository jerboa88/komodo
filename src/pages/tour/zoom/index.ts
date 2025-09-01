import { TAG_DELIMITER } from '@/constants.ts';
import { onReactMounted } from '@/dom.ts';
import { createTagPillContainer } from '@/tags/dom.ts';
import { TagMap } from '@/tags/tag-map.ts';
import type { Route } from '@/types.ts';
import { assertDefined } from '@/utils.ts';

const ROUTE_NAME = 'tour zoom' as const;
const ROUTE_PATTERN = /^\/tour\/\d*?\/zoom$/;

/**
 * Initialize the page.
 */
const init = async () => {
	const tagMap = new TagMap(
		TAG_DELIMITER.START,
		TAG_DELIMITER.END,
		TAG_DELIMITER.KEY_VALUE,
		TAG_DELIMITER.VALUE,
	);

	/**
	 * Parse the page title, extract tags, and add pills to it.
	 */
	const updatePageTitle = () => {
		const h1 = assertDefined(
			document.body.getElementsByTagName('h1')?.[0],
			'h1',
		);
		const originalTitle = assertDefined(h1.textContent);
		const { text, parsedTagMap: tourTagMap } =
			tagMap.parseAndAdd(originalTitle);

		document.title = text;
		h1.textContent = text;
		h1.title = originalTitle;

		h1.appendChild(createTagPillContainer(tourTagMap));
	};

	updatePageTitle();
};

/**
 * Handler for the page.
 */
const handler = () => onReactMounted(init);

export const tourZoomRoute: Route = {
	name: ROUTE_NAME,
	pattern: ROUTE_PATTERN,
	handler,
};
