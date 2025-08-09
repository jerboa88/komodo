/**
 * Assert that a value is defined. If not, throw an error.
 *
 * @param value - The value to check
 * @param message - An optional custom error message to print if the value is not defined
 * @returns The value if it is defined
 * @throws Error if the value is not defined
 */
export const assertDefined = <T>(
	value: T | undefined | null,
	message = 'Value is not defined',
): T => {
	if (value == null) throw new Error(message);

	return value;
};

/**
 * Convert a string to a valid element ID.
 *
 * @param value - The string to convert
 * @returns The converted string
 */
export const toElementId = (value: string) => {
	if (!value) {
		return 'id_empty';
	}

	// Letters, digits, hyphens, underscores, colons, and periods are allowed
	const validChar = /^[a-zA-Z0-9\-_:.]+$/;

	let result = '';

	for (const ch of value) {
		if (validChar.test(ch)) {
			result += ch;
		} else {
			// Encode disallowed char as _uXXXX_ (hex codepoint, lowercase)
			const code = ch.codePointAt(0)?.toString(16).padStart(4, '0');

			result += `_u${code}_`;
		}
	}

	// Ensure it starts with a letter
	if (!/^[a-zA-Z]/.test(result)) {
		result = `id_${result}`;
	}

	return result;
};
