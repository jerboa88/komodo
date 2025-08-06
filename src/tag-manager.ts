import { Tag } from './tag.ts';

const TAG_REGEX = /\[\s*([^:[\]]+?)\s*:\s*([^:[\]]+?)\s*\]/g;

/**
 * Manages tags and tag filters.
 */
export class TagManager {
	private tagValuesMap = new Map<string, Set<string>>();
	private filteredTagValuesMap = new Map<string, Set<string>>();

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
	 * Adds a single tag to the tag manager.
	 *
	 * @param tag - The tag to add.
	 * @returns `true` if the tag was added, `false` if it already existed.
	 */
	add(tag: Tag): boolean {
		let updated = false;

		if (this.tagValuesMap.has(tag.name)) {
			// biome-ignore lint/style/noNonNullAssertion: We just checked that the key exists
			const values = this.tagValuesMap.get(tag.name)!;

			if (!values.has(tag.value)) {
				values.add(tag.value);

				updated = true;
			}
		} else {
			this.tagValuesMap.set(tag.name, new Set([tag.value]));

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
	 * @returns An array of all tags and their values.
	 */
	getAll() {
		return [...this.tagValuesMap.entries()];
	}

	/**
	 * Sets a list of values to filter by for a given tag name.
	 *
	 * @param tagName - The name of the tag to filter by.
	 * @param values - The values to filter by.
	 * @returns The new Map of filtered values.
	 */
	setFilteredValuesSet(tagName: string, values: Set<string>) {
		this.filteredTagValuesMap.set(tagName, values);
	}

	/**
	 * Gets the list of values to filter by for a given tag name.
	 *
	 * @param tagName - The name of the tag to filter by.
	 * @returns The list of values to filter by.
	 */
	getFilteredValuesSet(tagName: string): Set<string> {
		return this.filteredTagValuesMap.get(tagName) ?? new Set();
	}

	/**
	 * Checks if a list of tags matches the current filters.
	 *
	 * @param tags - The list of tags to check.
	 * @returns `true` if the tags match the filters, `false` otherwise.
	 */
	matchesFilters(tags: Tag[]): boolean {
		for (const [tagName, values] of this.filteredTagValuesMap.entries()) {
			if (values.size === 0) continue;
			if (!tags.some((tag) => tag.name === tagName && values.has(tag.value))) {
				return false;
			}
		}

		return true;
	}
}
