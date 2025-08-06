/**
 * Represents a tag.
 */
export class Tag {
	constructor(
		public readonly name: string,
		public readonly value: string,
	) {}

	toString() {
		return `${this.name}: ${this.value}`;
	}
}
