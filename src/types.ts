/**
 * A page route.
 * @property pattern - The route pattern to match against the current URL path
 * @property handler - The function to call when the route pattern matches the current URL path
 */
export type Route = {
	pattern: RegExp;
	handler: () => void;
};

/**
 * A trilean value, which can be true, false, or undefined.
 */
export type Trilean = boolean | undefined;
