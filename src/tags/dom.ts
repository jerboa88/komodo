import { CLASS, DATA_ATTRIBUTE } from '../constants.ts';
import { createElement, createPill } from '../dom.ts';
import type { Tag, TagMap } from './tag-map.ts';

/**
 * Create a pill element for a tag.
 *
 * @param tag - The tag to create a pill for
 * @returns The pill element
 */
export const createTagPill = (tag: Tag) => {
	const pill = createPill();
	const container = createElement('div');
	const valueSpan = createElement('span', {
		textContent: tag.value,
	});

	pill.dataset[DATA_ATTRIBUTE.TAG_VALUE] = tag.value;

	if (tag.name) {
		const nameSpan = createElement('span', {
			textContent: tag.name,
		});
		const separatorSpan = createElement('span', {
			textContent: ': ',
		});

		pill.dataset[DATA_ATTRIBUTE.TAG_NAME] = tag.name;

		container.appendChild(nameSpan);
		container.appendChild(separatorSpan);
	}

	container.appendChild(valueSpan);
	pill.appendChild(container);

	return pill;
};

/**
 * Create a container for tag pills.
 *
 * @param routeTagMap - The tags to create pills for
 * @returns The container element
 */
export const createTagPillContainer = (routeTagMap: TagMap) => {
	const div = createElement('div', {
		classList: [CLASS.TAG_PILL_CONTAINER],
	});

	for (const tag of routeTagMap) {
		div.appendChild(createTagPill(tag));
	}

	return div;
};
