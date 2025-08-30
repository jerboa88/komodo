/**
 * A page route.
 * @property name - The name of the route
 * @property pattern - The route pattern to match against the current URL path
 * @property handler - The function to call when the route pattern matches the current URL path. It is passed a list of capturing groups from the route pattern
 */
export type Route = {
	name: string;
	pattern: RegExp;
	handler: (...capturingGroups: string[]) => void;
};

/**
 * A trilean value, which can be true, false, or undefined.
 */
export type Trilean = boolean | undefined;
