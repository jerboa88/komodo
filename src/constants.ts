/**
 * Project metadata.
 */
export const PROJECT = {
	EMOJI: '🦎',
	NAME: 'Komodo',
	TAGLINE: 'Mods for Komoot',
} as const;

const prefix = PROJECT.NAME.toLowerCase();

/**
 * CSS classes used by the script.
 */
export const CLASS = {
	NEW: `${prefix}-new`,
	HIDE: `${prefix}-hide`,
	SCROLLABLE: `${prefix}-scrollable`,
	DIVIDER: `${prefix}-divider`,
	FILTER_CONTAINER: `${prefix}-filter-container`,
	TAG_FILTER_CONTAINER: `${prefix}-tag-filter-container`,
	TAG_FILTER: `${prefix}-tag-filter`,
	TAG_PILL_CONTAINER: `${prefix}-tag-pill-container`,
	PILL: `${prefix}-pill`,
	BUTTON: `${prefix}-button`,
} as const;

/**
 * Data attributes used by the script.
 */
export const DATA_ATTRIBUTE = {
	// Built-in
	TOUR_ID: 'tourId',
	// Custom
	TAGS: `${prefix}Tags`,
	TAG_NAME: `${prefix}TagName`,
	TAG_VALUE: `${prefix}TagValue`,
} as const;

/**
 * Tokens used to delimit tags in string form.
 */
export const TAG_DELIMITER = {
	START: '[',
	END: ']',
	KEY_VALUE: ':',
	VALUE: ',',
} as const;
