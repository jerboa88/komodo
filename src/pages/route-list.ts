import { CLASS, DATA_ATTRIBUTE } from '../constants.ts';
import {
	createButton,
	createElementTemplate,
	createMultiSelect,
	createPill,
	onReactMounted,
	showElement,
} from '../dom.ts';
import { debug, warn } from '../logger.ts';
import { Tag } from '../tag.ts';
import { TagManager } from '../tag-manager.ts';
import type { Route } from '../types.ts';
import { assertDefined, toElementId } from '../utils.ts';

const pattern = /^\/user\/\d*?\/routes$/;

/**
 * Initialize the route list page.
 */
const init = async () => {
	const tagManager = new TagManager();
	const savedRoutesAnchor = assertDefined(
		document.querySelector(
			'a[href^="/user/"][href$="/routes"]',
		) as HTMLAnchorElement | null,
		'No saved routes link found',
	);
	const ul = assertDefined(
		document.querySelector(
			'ul[data-test-id="tours-list"]',
		) as HTMLUListElement | null,
		'No route list found',
	);

	/**
	 * Get all the list items in the route list.
	 *
	 * @returns An array of HTMLLIElements
	 */
	const getLis = () =>
		[...ul.children].filter((li) => li.nodeName === 'LI') as HTMLLIElement[];

	const scrollToLoadAll = async () => {
		debug('Force loading all routes');

		const initialScrollPos = window.scrollY;
		const totalNumOfRoutes = Number(
			assertDefined(
				savedRoutesAnchor.lastElementChild?.textContent,
				'Unable to get total number of routes. Required element not found',
			),
		);

		debug(`Found ${totalNumOfRoutes} total routes`);

		const loadMore = async () => {
			ul.scrollTop = ul.scrollHeight;

			window.scrollTo(0, document.body.scrollHeight);

			await new Promise((r) => setTimeout(r, 100));

			return totalNumOfRoutes > getLis().length;
		};

		while (await loadMore());

		debug(`Restoring scroll position: ${initialScrollPos}`);

		window.scrollTo(0, initialScrollPos);
	};

	/**
	 * Add a button to the page that will force load all routes.
	 */
	const addLoadAllRoutesButton = () => {
		debug('Adding load all routes button to page');

		const importLinkAnchor = document.querySelector(
			'a[href="/upload"]',
		) as HTMLAnchorElement;
		const container = assertDefined(importLinkAnchor.parentElement);
		const icon = createElementTemplate(
			savedRoutesAnchor.firstElementChild as SVGElement | null,
		);
		const loadAllRoutesbutton = createButton(
			'Load All Routes',
			icon,
			async (_event, button, span) => {
				button.disabled = true;
				span.textContent = 'Loading...';

				await scrollToLoadAll();

				span.textContent = 'Loaded';
			},
		);

		container.insertBefore(loadAllRoutesbutton, importLinkAnchor);
	};

	/**
	 * Create a select element for a given tag name and set of values.
	 *
	 * @param name - The name of the tag
	 * @param values - The set of values for the tag
	 * @param id - The id of the select element
	 * @returns An HTML select element
	 */
	const createTagSelect = (name: string, values: Set<string>, id: string) => {
		const optionObjs = [...values].map((value) => ({
			value,
			selected: tagManager.getFilteredValuesSet(name).has(value) ?? false,
		}));
		const select = createMultiSelect(id, optionObjs, (event) => {
			const target = event.currentTarget as HTMLSelectElement;
			const selectedValuesSet = new Set(
				[...target.selectedOptions].map((o) => o.value),
			);

			tagManager.setFilteredValuesSet(name, selectedValuesSet);

			applyFilters();
		});

		return select;
	};

	/**
	 * Create a container for the tag select elements.
	 *
	 * @returns An HTML div element
	 */
	const createTagSelectContainer = () => {
		debug('Creating tag select container');

		const tagFilterContainer = document.createElement('div');

		tagFilterContainer.classList.add(CLASS.TAG_FILTER_CONTAINER);

		for (const [name, values] of tagManager.getAll()) {
			const tagFilter = document.createElement('div');

			tagFilter.classList.add(CLASS.NEW, CLASS.TAG_FILTER);

			const label = document.createElement('label');
			const id = toElementId(name);

			label.textContent = name;
			label.htmlFor = id;

			tagFilter.appendChild(label);

			const select = createTagSelect(name, values, id);

			tagFilter.appendChild(select);
			tagFilterContainer.appendChild(tagFilter);
		}

		return tagFilterContainer;
	};

	/**
	 * Recreate the tag filter controls on the page.
	 */
	const updateTagFilterControls = () => {
		debug('Updating tag filter controls on page');

		const filterContainer = document.querySelector(
			'#js-filter-anchor div:not([data-bottomsheet-scroll-ignore="true"]):has(> button:not([type="button"])',
		);
		const existingTagFilterContainer = filterContainer?.getElementsByClassName(
			CLASS.TAG_FILTER_CONTAINER,
		)?.[0];
		const tagFilterControls = createTagSelectContainer();

		existingTagFilterContainer
			? existingTagFilterContainer.replaceWith(tagFilterControls)
			: filterContainer?.appendChild(tagFilterControls);
		filterContainer?.classList.add(CLASS.FILTER_CONTAINER);
	};

	/**
	 * Parse the title of a route list item and extract any tags from it. This is used the first time a list item is parsed.
	 *
	 * @param a - The anchor element containing the title
	 * @returns An array of tags extracted from the title
	 */
	const parseLiTitle = (a: HTMLAnchorElement): Tag[] => {
		if (!a) {
			warn('No a element found in li element', a);

			return [];
		}

		const { text, tags } = TagManager.extractTags(a.textContent);

		a.textContent = text;

		return tags;
	};

	/**
	 * Parse the pills of a route list item and extract any tags from it. This is used when a list item is already parsed and we need to update the tags.
	 *
	 * @param li - The list item element containing the pills
	 * @returns An array of tags extracted from the pills
	 */
	const parseLiTagPills = (li: HTMLLIElement): Tag[] => {
		const pills = li.getElementsByClassName(
			CLASS.PILL,
		) as HTMLCollectionOf<HTMLDivElement>;

		if (!pills.length) return [];

		return [...pills].map((pill) => {
			const name = assertDefined(
				pill.dataset[DATA_ATTRIBUTE.TAG_NAME],
				`No tag name found in pill: ${pill.textContent}`,
			);
			const value = assertDefined(
				pill.dataset[DATA_ATTRIBUTE.TAG_VALUE],
				`No tag value found in pill: ${pill.textContent}`,
			);

			return new Tag(name, value);
		});
	};

	/**
	 * Create a pill element for a tag.
	 *
	 * @param tag - The tag to create a pill for
	 * @returns The pill element
	 */
	const createTagPill = (tag: Tag) => {
		const pill = createPill();
		const container = document.createElement('div');
		const nameSpan = document.createElement('span');
		const separatorSpan = document.createElement('span');
		const valueSpan = document.createElement('span');

		nameSpan.textContent = tag.name;
		separatorSpan.textContent = ': ';
		valueSpan.textContent = tag.value;

		pill.dataset[DATA_ATTRIBUTE.TAG_NAME] = tag.name;
		pill.dataset[DATA_ATTRIBUTE.TAG_VALUE] = tag.value;

		container.appendChild(nameSpan);
		container.appendChild(separatorSpan);
		container.appendChild(valueSpan);

		pill.appendChild(container);

		return pill;
	};

	/**
	 * Create a container for tag pills.
	 *
	 * @param tags - The tags to create pills for
	 * @returns The container element
	 */
	const createTagPillContainer = (tags: Tag[]) => {
		const div = document.createElement('div');

		tags.forEach((tag) => div.appendChild(createTagPill(tag)));

		div.classList.add(CLASS.TAG_PILL_CONTAINER);

		return div;
	};

	/**
	 * Extract tags from a li element, add tag pills to it, filter it, and update the tag map, if necessary.
	 *
	 * @param li - The li element to update
	 */
	const updateLi = (li: HTMLLIElement) => {
		debug('Updating li element');

		const a = assertDefined(
			li.querySelector(
				'a[data-test-id="tours_list_item_title"]',
			) as HTMLAnchorElement | null,
			'No a element found in li element',
		);
		const tags = parseLiTitle(a);
		const wasTagMapUpdated = tagManager.addMultiple(tags);

		a.parentElement?.appendChild(createTagPillContainer(tags));

		if (wasTagMapUpdated) {
			updateTagFilterControls();
		}

		filterLi(li, tags);
	};

	/**
	 * Filter a li element based on the current filters.
	 *
	 * @param li - The li element to filter
	 * @param tags - An array of tags to filter by
	 */
	const filterLi = (li: HTMLLIElement, tags: Tag[]) => {
		const doesMatchFilter = tagManager.matchesFilters(tags);
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
			const tags = parseLiTagPills(li);

			filterLi(li, tags);
		}
	};

	debug('Setting up route list page');

	const observer = new MutationObserver((mutations) => {
		debug('Mutations observed on ul', mutations);

		for (const mutation of mutations) {
			for (const newNode of mutation.addedNodes) {
				if (newNode.nodeName === 'LI') {
					updateLi(newNode as HTMLLIElement);
				}
			}
		}
	});

	debug('Waiting for li elements to be added to the list');

	observer.observe(ul, { childList: true });
	getLis().forEach(updateLi);
	addLoadAllRoutesButton();
	updateTagFilterControls();
};

/**
 * Handler for the route list page.
 */
const handler = () => onReactMounted(init);

export const routeListRoute: Route = {
	pattern,
	handler,
};
