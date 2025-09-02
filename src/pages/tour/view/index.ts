import { TAG_DELIMITER } from '@/constants.ts';
import { onReactMounted } from '@/dom.ts';
import { debug } from '@/logger.ts';
import { NodeAddObserver } from '@/node-add-observer.ts';
import { createTagPillContainer } from '@/tags/dom.ts';
import { TagMap } from '@/tags/tag-map.ts';
import type { Route } from '@/types.ts';
import { assertDefined } from '@/utils.ts';

const ROUTE_NAME = 'tour view' as const;
const ROUTE_PATTERN = /^\/tour\/\d*?$/;

/**
 * Initialize the page.
 */
const init = async () => {
	import('./style.css');

	const tagMap = new TagMap(
		TAG_DELIMITER.START,
		TAG_DELIMITER.END,
		TAG_DELIMITER.KEY_VALUE,
		TAG_DELIMITER.VALUE,
	);
	const h1 = document.body.getElementsByTagName('h1')?.[0];
	const span = assertDefined(
		h1.querySelector<HTMLSpanElement>('span[data-test-id="tour-title"]'),
		'tour title span (h1.span)',
	);

	let originalTourTitle: string;
	let tourTitle: string;

	/**
	 * Get breadcrumb elements on the page
	 *
	 * @returns A node list of HTML paragraph elements
	 */
	const getBreadcrumbs = () =>
		assertDefined(
			document.body.querySelectorAll<HTMLParagraphElement>(
				'a[href^="/user/"] ~ p',
			),
			'breadcrumb (a.p)',
		);

	/**
	 * Parse the tour title, store the original, and update it with parsed tags.
	 */
	const parseTourTitle = () => {
		debug('Parsing tour title');

		originalTourTitle = assertDefined(
			span.textContent,
			'tour title span text content (span.textContent)',
		);

		tourTitle = tagMap.parseAndAdd(originalTourTitle).text;

		console.warn(originalTourTitle, tourTitle);
	};

	/**
	 * Update the page's <title>, h1, and span with the parsed tour title.
	 */
	const updateTourTitle = () => {
		debug('Updating tour title');

		h1.title = originalTourTitle;
		document.title = tourTitle;
		span.textContent = tourTitle;

		span.appendChild(createTagPillContainer(tagMap));
	};

	/**
	 * Update a breadcrumb element with the parsed tour title.
	 *
	 * @param p - The breadcrumb paragraph element to update.
	 */
	const updateBreadcrumb = (p: HTMLParagraphElement) => {
		debug('Updating breadcrumb');

		p.title = originalTourTitle;
		p.textContent = tourTitle;
	};

	parseTourTitle();
	updateTourTitle();

	for (const breadcrumb of getBreadcrumbs()) {
		updateBreadcrumb(breadcrumb);
	}

	/**
	 * Observe breadcrumb changes and update when new breadcrumb nodes are added.
	 */
	const breadcrumbObserver = new NodeAddObserver((newNode, observer) => {
		if (newNode.nodeName === 'P') {
			observer.disconnect();
			updateBreadcrumb(newNode as HTMLParagraphElement);
		}
	});

	debug('Waiting for title to be edited');

	new NodeAddObserver((_newNode, observer) => {
		observer.reobserve(() => {
			parseTourTitle();
			updateTourTitle();
		});

		for (const breadcrumb of getBreadcrumbs()) {
			const parent = assertDefined(
				breadcrumb.parentElement,
				'breadcrumb parent',
			);

			debug('Waiting for breadcrumb to be updated');

			breadcrumbObserver.observe(parent);
		}
	}, span);
};

/**
 * Handler for the page.
 */
const handler = () => onReactMounted(init);

export const tourViewRoute: Route = {
	name: ROUTE_NAME,
	pattern: ROUTE_PATTERN,
	handler,
};
