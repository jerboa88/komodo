import { TAG_DELIMITER } from '@/constants.ts';
import { Logger } from '@/logger.ts';
import type { Trilean } from '@/types.ts';

type TagName = string | undefined;
type TagValue = string;
type TagIsIncluded = Trilean;

export type Tag = {
	name: TagName;
	value: TagValue;
	isIncluded: TagIsIncluded;
};

export type TagValueToInclusionMap = Map<TagValue, TagIsIncluded>;

const logger = new Logger('TagMap');

export class TagMap implements Iterable<Tag> {
	private tagMap: Map<TagName, TagValueToInclusionMap> = new Map();

	private readonly startDelimiter: string;
	private readonly endDelimiter: string;
	private readonly keyValueDelimiter: string;
	private readonly valueDelimiter: string;

	constructor(
		startDelimiter = '[',
		endDelimiter = ']',
		keyValueDelimiter = ':',
		valueDelimiter = ',',
	) {
		this.startDelimiter = startDelimiter;
		this.endDelimiter = endDelimiter;
		this.keyValueDelimiter = keyValueDelimiter;
		this.valueDelimiter = valueDelimiter;
	}

	private getValueToInclusionMap(name: TagName) {
		const valueToInclusionMap = this.tagMap.get(name);

		// This should never happen, but TypeScript doesn't know that
		if (!valueToInclusionMap) {
			throw new Error(
				'TagMap: Expected valueToInclusionMap to be defined, but it was not',
			);
		}

		return valueToInclusionMap;
	}

	/**
	 * Add a tag to the map
	 * @returns true if the map was updated, false otherwise
	 */
	add(name: TagName, value: TagValue): boolean {
		if (!this.tagMap.has(name)) {
			this.tagMap.set(name, new Map());
		}

		const valueToInclusionMap = this.getValueToInclusionMap(name);

		if (valueToInclusionMap.has(value)) {
			return false;
		}

		valueToInclusionMap.set(value, undefined);

		return true;
	}

	/**
	 * Set the inclusion value of a tag
	 * @returns true if the value was changed, false otherwise
	 */
	setInclusion(
		name: TagName,
		value: TagValue,
		isIncluded: TagIsIncluded,
	): boolean {
		const valueToInclusionMap = this.tagMap.get(name);

		if (!valueToInclusionMap || !valueToInclusionMap.has(value)) {
			return false;
		}

		const current = valueToInclusionMap.get(value);

		if (current === isIncluded) {
			return false;
		}

		valueToInclusionMap.set(value, isIncluded);

		return true;
	}

	/**
	 * Returns the underlying map of tags.
	 *
	 * @returns The underlying map of tags.
	 */
	getAsMap = () => {
		return this.tagMap;
	};

	/**
	 * Provide a sorted iterator over all tags
	 */
	*[Symbol.iterator](): Iterator<Tag> {
		const sortedNames = Array.from(this.tagMap.keys()).sort();
		for (const name of sortedNames) {
			const valueToInclusionMap = this.getValueToInclusionMap(name);

			const sortedValues = Array.from(valueToInclusionMap.keys()).sort();

			for (const value of sortedValues) {
				yield { name, value, isIncluded: valueToInclusionMap.get(value) };
			}
		}
	}

	/**
	 * Parse a string, extract tags, add them to this TagMap.
	 * Returns the remaining text, a new TagMap with parsed tags, and an updated flag.
	 */
	parseAndAdd(input: string): {
		text: string;
		parsedTagMap: TagMap;
		wasUpdated: boolean;
	} {
		const parsedTagMap = new TagMap(
			TAG_DELIMITER.START,
			TAG_DELIMITER.END,
			TAG_DELIMITER.KEY_VALUE,
			TAG_DELIMITER.VALUE,
		);
		let text = '';
		let wasUpdated = false;
		let i = 0;

		while (i < input.length) {
			if (input[i] === this.startDelimiter) {
				i++; // skip OPEN

				let inside = '';

				while (i < input.length && input[i] !== this.endDelimiter) {
					inside += input[i++];
				}

				if (i < input.length && input[i] === this.endDelimiter) {
					i++; // skip CLOSE
				}

				// parse inside
				const kvIndex = inside.indexOf(this.keyValueDelimiter);
				let tagName: TagName;
				let values: TagValue[] = [];

				if (kvIndex >= 0) {
					tagName = inside.slice(0, kvIndex).trim();
					values = inside
						.slice(kvIndex + 1)
						.split(this.valueDelimiter)
						.map((v) => v.trim())
						.filter((v) => v.length > 0);
				} else {
					values = inside
						.split(this.valueDelimiter)
						.map((v) => v.trim())
						.filter((v) => v.length > 0);
				}

				for (const v of values) {
					const wasAdded = this.add(tagName, v);

					parsedTagMap.add(tagName, v);

					if (wasAdded) wasUpdated = true;
				}
			} else {
				text += input[i++];
			}
		}

		return { text, parsedTagMap, wasUpdated };
	}

	/**
	 * Compare this TagMap (reference) with another TagMap (candidate).
	 * Inclusion rules:
	 *  - isIncluded === true  → must exist in candidate
	 *  - isIncluded === false → must NOT exist in candidate
	 *  - isIncluded === undefined → ignored
	 */
	matches(candidate: TagMap): boolean {
		for (const { name, value, isIncluded } of this) {
			const candidateValueToInclusionMap = candidate.tagMap.get(name);
			const existsInCandidate =
				candidateValueToInclusionMap?.has(value) ?? false;

			if (isIncluded === true && !existsInCandidate) {
				logger.debug(
					`${name}:${value} is included in reference but not in candidate`,
				);

				return false;
			}

			if (isIncluded === false && existsInCandidate) {
				logger.debug(
					`${name}:${value} is excluded in reference but exists in candidate`,
				);

				return false;
			}
		}

		return true;
	}
}
