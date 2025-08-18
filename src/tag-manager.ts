import { debug } from './logger.ts';
import { Tag } from './tag.ts';

export type Trilean = boolean | null;

export type TagValueToInclusionMap = Map<string, Trilean>;

const TAG_REGEX = /\[\s*([^:[\]]+?)\s*:\s*([^:[\]]+?)\s*\]/g;

/**
 * Manages tags and tag filters.
 */
export class TagManager {
	private tagNameToValueMap = new Map<string, TagValueToInclusionMap>();

	/**
	 * Parses a string for tags and returns the remaining text and the extracted tags.
	 *
	 * @param text - The text to parse.
	 * @returns An object containing the remaining text and the extracted tags.
	 */
	static extractTags(text: string) {
		const tags: Tag[] = [];
		const matches = text.matchAll(TAG_REGEX);

		for (const match of matches) {
			tags.push(new Tag(match[1], match[2]));
		}

		return {
			text: text.replace(TAG_REGEX, '').trim(),
			tags,
		};
	}

	/**
	 * Convert a list of tags to a map of tag names to sets of tag values.
	 *
	 * @param tags - An array of tags
	 * @returns A map of tag names to sets of tag values
	 */
	static tagsToTagValueSetMap(tags: Tag[]) {
		const tagNameToValueSetMap = new Map<string, Set<string>>();

		for (const { name, value } of tags) {
			const existingValuesSet = tagNameToValueSetMap.get(name);

			if (!existingValuesSet) {
				const newValuesSet = new Set([value]);

				tagNameToValueSetMap.set(name, newValuesSet);
			} else if (!existingValuesSet.has(value)) {
				existingValuesSet.add(value);
			}
		}

		return tagNameToValueSetMap;
	}

	/**
	 * Adds a single tag to the tag manager.
	 *
	 * @param tag - The tag to add.
	 * @returns `true` if the tag was added, `false` if it already existed.
	 */
	add(tag: Tag): boolean {
		let updated = false;

		if (this.tagNameToValueMap.has(tag.name)) {
			// biome-ignore lint/style/noNonNullAssertion: We just checked that the key exists
			const values = this.tagNameToValueMap.get(tag.name)!;

			if (!values.has(tag.value)) {
				values.set(tag.value, null);

				updated = true;
			}
		} else {
			const tagValueToInclusionMap = new Map([[tag.value, null]]);

			this.tagNameToValueMap.set(tag.name, tagValueToInclusionMap);

			updated = true;
		}

		return updated;
	}

	/**
	 * Adds multiple tags to the tag manager.
	 *
	 * @param tags - The tags to add.
	 * @returns `true` if any of the tags were added, `false` if all of them already existed.
	 */
	addMultiple(tags: Tag[]): boolean {
		return tags.map((t) => this.add(t)).some(Boolean);
	}

	/**
	 * Gets all tags and their values.
	 *
	 * @returns An iterable of all tags and their values.
	 */
	getAll() {
		return this.tagNameToValueMap.entries();
	}

	/**
	 * Sets the inclusion value for a given tag name and tag value.
	 *
	 * @param tagName - The name of the tag to update.
	 * @param tagValue - The value of the tag to update.
	 * @param isIncluded - The new inclusion value (`true`, `false`, or `null`).
	 * @returns `true` if the value was set, `false` if the tag/value does not exist.
	 */
	setTagValueInclusion(
		tagName: string,
		tagValue: string,
		isIncluded: Trilean,
	): boolean {
		const tagValueToInclusionMap = this.tagNameToValueMap.get(tagName);

		if (!tagValueToInclusionMap || !tagValueToInclusionMap.has(tagValue)) {
			return false;
		}

		tagValueToInclusionMap.set(tagValue, isIncluded);

		return true;
	}

	/**
	 * Checks if a list of tags matches the current filters.
	 *
	 * @param tags - The list of tags to check.
	 * @returns `true` if the tags match the filters, `false` otherwise.
	 */
	matchesFilters(tags: Tag[]): boolean {
		// Create a Map with tag names as keys and a Set of tag values
		const routeTagMap = TagManager.tagsToTagValueSetMap(tags);

		for (const [
			tagName,
			tagValueToInclusionMap,
		] of this.tagNameToValueMap.entries()) {
			const routeTagValuesSet = routeTagMap.get(tagName);

			for (const [
				tagValue,
				tagIsIncluded,
			] of tagValueToInclusionMap.entries()) {
				// If any of the tags break the rules, return immediately
				if (tagIsIncluded === false && routeTagValuesSet?.has(tagValue)) {
					debug(
						`Excluding for reason: '${tagName}: ${tagValue}' prohibited by filter`,
					);

					return false;
				}

				if (tagIsIncluded === true && !routeTagValuesSet?.has(tagValue)) {
					debug(
						`Excluding for reason: '${tagName}: ${tagValue}' required by filter`,
					);

					return false;
				}
			}
		}

		// Include by default
		return true;
	}
}
