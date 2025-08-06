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
