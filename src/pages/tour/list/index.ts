import { CLASS, DATA_ATTRIBUTE, TAG_DELIMITER } from '@/constants.ts';
import {
	createButton,
	createElement,
	createElementTemplate,
	createTriStateCheckbox,
	onReactMounted,
	showElement,
} from '@/dom.ts';
import { debug, warn } from '@/logger.ts';
import { NodeAddObserver } from '@/node-add-observer.ts';
import { createTagPillContainer } from '@/tags/dom.ts';
import {
	type Tag,
	TagMap,
	type TagValueToInclusionMap,
} from '@/tags/tag-map.ts';
import type { Route, Trilean } from '@/types.ts';
import { assertDefined, toElementId } from '@/utils.ts';

const ROUTE_NAME = 'tour list' as const;
const ROUTE_PATTERN = /^\/user\/\d*?\/(routes|activities)$/;

/**
 * Initialize the page.
 */
const init = async (...capturingGroups: string[]) => {
	import('./style.css');

	const isRouteListPage = capturingGroups?.[0] === 'routes';
	const tagMap = new TagMap(
		TAG_DELIMITER.START,
		TAG_DELIMITER.END,
		TAG_DELIMITER.KEY_VALUE,
		TAG_DELIMITER.VALUE,
	);
	const savedRoutesAnchor = assertDefined(
		document.body.querySelector<HTMLAnchorElement>(
			'a[href^="/user/"][href$="/routes"]',
		),
		'saved routes link anchor (a)',
	);
	const ul = assertDefined(
		document.body.querySelector<HTMLUListElement>(
			'ul[data-test-id="tours-list"]',
		),
		'tour list (ul)',
	);

	/**
	 * Get all the list items in the tour list.
	 *
	 * @returns An array of HTMLLIElements
	 */
	const getLis = () =>
		[...ul.children].filter((li) => li.nodeName === 'LI') as HTMLLIElement[];

	const scrollToLoadAll = async () => {
		debug('Force loading all tours');

		const initialScrollPos = window.scrollY;
		const totalNumOfTours = Number(
			assertDefined(
				savedRoutesAnchor.lastElementChild?.textContent,
				'total number of tours label',
			),
		);

		debug(`Found ${totalNumOfTours} total tours`);

		const loadMore = async () => {
			ul.scrollTop = ul.scrollHeight;

			window.scrollTo(0, document.body.scrollHeight);

			await new Promise((r) => setTimeout(r, 100));

			return totalNumOfTours > getLis().length;
		};

		while (await loadMore());

		debug(`Restoring scroll position: ${initialScrollPos}`);

		window.scrollTo(0, initialScrollPos);
	};

	/**
	 * Add a button to the page that will force load all tours.
	 */
	const addLoadAllToursButton = () => {
		debug('Adding load all tours button to page');

		const title = isRouteListPage ? 'Load All Routes' : 'Load All Activities';
		const importLinkAnchor = assertDefined(
			document.body.querySelector<HTMLAnchorElement>('a[href="/upload"]'),
			'import link anchor (a)',
		);
		const container = assertDefined(
			importLinkAnchor.parentElement,
			'import link anchor parent',
		);
		const icon = createElementTemplate(
			savedRoutesAnchor.firstElementChild as SVGElement | null,
		);
		const button = createButton(title, icon, async (_event, button, span) => {
			button.disabled = true;
			span.textContent = 'Loading...';

			await scrollToLoadAll();

			span.textContent = 'Loaded';
		});

		container.insertBefore(button, importLinkAnchor);
	};

	/**
	 * Create a checkbox set for a given tag name and set of values.
	 *
	 * @param tagName - The name of the tag
	 * @param tagValueToInclusionMap - The map of tag values to their inclusion state
	 * @returns An HTML fieldset element with checkboxes
	 */
	const createTagFilterSet = (
		tagName: Tag['name'],
		tagValueToInclusionMap: TagValueToInclusionMap,
	) => {
		const div = createElement('div', {
			classList: [CLASS.SCROLLABLE],
		});
		const fieldset = createElement('fieldset');
		const sortedTagValueEntries = [...tagValueToInclusionMap.entries()].sort(
			([tagValueA], [tagValueB]) => tagValueA.localeCompare(tagValueB),
		);

		for (const [tagValue, isIncluded] of sortedTagValueEntries) {
			const handleClick = (checkedState: Trilean) => {
				tagMap.setInclusion(tagName, tagValue, checkedState);

				applyFilters();
			};

			const checkboxId = `${toElementId(tagName)}-${toElementId(tagValue)}`;
			const checkbox = createTriStateCheckbox(
				checkboxId,
				isIncluded,
				handleClick,
			);
			const label = createElement('label', {
				dataset: {
					[DATA_ATTRIBUTE.TAG_VALUE]: tagValue,
				},
			});
			const span = createElement('span', {
				textContent: tagValue,
			});

			label.appendChild(span);
			label.appendChild(checkbox);
			fieldset.appendChild(label);
			div.appendChild(fieldset);
		}

		return div;
	};

	/**
	 * Create a container for the tag checkbox elements.
	 *
	 * @returns An HTML div element
	 */
	const createTagFiltersContainer = () => {
		debug('Creating tag filters container');

		const tagFiltersContainer = createElement('form', {
			classList: [CLASS.TAG_FILTER_CONTAINER],
		});

		for (const [tagName, tagValueToInclusionMap] of tagMap.getAsMap()) {
			const tagFilter = createElement('div', {
				classList: [CLASS.NEW, CLASS.TAG_FILTER],
				dataset: {
					[DATA_ATTRIBUTE.TAG_NAME]: tagName,
				},
			});
			const filterSetTitle = createElement('p', {
				textContent: tagName ?? '...',
			});
			const divider = createElement('div', {
				classList: [CLASS.DIVIDER],
			});

			tagFilter.appendChild(filterSetTitle);
			tagFilter.appendChild(divider);

			const container = createTagFilterSet(tagName, tagValueToInclusionMap);

			tagFilter.appendChild(container);
			tagFiltersContainer.appendChild(tagFilter);
		}

		return tagFiltersContainer;
	};

	/**
	 * Recreate the tag filter controls on the page.
	 */
	const updateTagFilterControls = () => {
		debug('Updating tag filter controls on page');

		const filterContainer = document.querySelector<HTMLDivElement>(
			'#js-filter-anchor div:not([data-bottomsheet-scroll-ignore="true"]):has(> button:not([type="button"])',
		);
		const existingTagFilterContainer = filterContainer?.getElementsByClassName(
			CLASS.TAG_FILTER_CONTAINER,
		)?.[0];
		const tagFilterControls = createTagFiltersContainer();

		existingTagFilterContainer
			? existingTagFilterContainer.replaceWith(tagFilterControls)
			: filterContainer?.appendChild(tagFilterControls);

		filterContainer?.classList.add(CLASS.FILTER_CONTAINER);
	};

	/**
	 * Parse the title of a tour list item and extract any tags from it. This is used the first time a list item is parsed.
	 *
	 * @param a - The anchor element containing the title
	 * @returns An array of tags extracted from the title
	 */
	const updateLiTitle = (a: HTMLAnchorElement) => {
		if (!a) {
			warn('No a element found in li element', a);

			return {
				tourTagMap: new TagMap(),
				updated: false,
			};
		}

		const originalTitle = assertDefined(
			a.textContent,
			'tour title anchor text content (a.textContent)',
		);

		const {
			text,
			parsedTagMap: tourTagMap,
			wasUpdated,
		} = tagMap.parseAndAdd(originalTitle);

		a.textContent = text;
		a.title = originalTitle;

		return { tourTagMap, wasUpdated };
	};

	/**
	 * Parse the pills of a tour list item and extract any tags from it. This is used when a list item is already parsed and we need to update the tags.
	 *
	 * @param li - The list item element containing the pills
	 * @returns An array of tags extracted from the pills
	 */
	const parseLiTagPills = (li: HTMLLIElement): TagMap => {
		const pills = li.getElementsByClassName(
			CLASS.PILL,
		) as HTMLCollectionOf<HTMLDivElement>;
		const tourTagMap = new TagMap();

		for (const pill of pills) {
			const name = pill.dataset[DATA_ATTRIBUTE.TAG_NAME];
			const value = assertDefined(
				pill.dataset[DATA_ATTRIBUTE.TAG_VALUE],
				`${pill.textContent} tag value`,
			);

			tourTagMap.add(name, value);
		}

		return tourTagMap;
	};

	/**
	 * Extract tags from a li element, add tag pills to it, filter it, and update the tag map, if necessary.
	 *
	 * @param li - The li element to update
	 */
	const updateLi = (li: HTMLLIElement) => {
		debug('Updating li element');

		const a = assertDefined(
			li.querySelector<HTMLAnchorElement>(
				'a[data-test-id="tours_list_item_title"]',
			),
			'tour title anchor (a)',
		);
		const { tourTagMap, wasUpdated } = updateLiTitle(a);

		a.parentElement?.appendChild(createTagPillContainer(tourTagMap));

		if (wasUpdated) {
			updateTagFilterControls();
		}

		filterLi(li, tourTagMap);
	};

	/**
	 * Filter a li element based on the current filters.
	 *
	 * @param li - The li element to filter
	 * @param tourTagMap - A map of tags belonging to the current tour
	 */
	const filterLi = (li: HTMLLIElement, tourTagMap: TagMap) => {
		const doesMatchFilter = tagMap.matches(tourTagMap);
		const wasVisibilityChanged = showElement(li, doesMatchFilter);

		if (wasVisibilityChanged) {
			const msgPrefix = doesMatchFilter ? 'Showing' : 'Hiding';

			debug(`${msgPrefix} li element: ${li.dataset[DATA_ATTRIBUTE.TOUR_ID]}`);
		}
	};

	/**
	 * Apply the current filters to all loaded li elements.
	 */
	const applyFilters = () => {
		debug('Applying filters');

		const lis = getLis();

		for (const li of lis) {
			const tourTagMap = parseLiTagPills(li);

			filterLi(li, tourTagMap);
		}
	};

	debug('Waiting for li elements to be added to the list');

	new NodeAddObserver((newNode) => {
		if (newNode.nodeName === 'LI') {
			updateLi(newNode as HTMLLIElement);
		}
	}, ul);

	getLis().forEach(updateLi);
	addLoadAllToursButton();
	updateTagFilterControls();
};

/**
 * Handler for the page.
 */
const handler = (...capturingGroups: string[]) =>
	onReactMounted(() => init(...capturingGroups));

export const tourListRoute: Route = {
	name: ROUTE_NAME,
	pattern: ROUTE_PATTERN,
	handler,
};
