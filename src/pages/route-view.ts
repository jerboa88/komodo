import { debug } from '../logger.ts';
import type { Route } from '../types.ts';

const pattern = /^\/tour\/\d*?/;

/**
 * Handler for the route view page.
 */
const handler = async () => {
	debug('Setting up route page');
};

export const routeViewRoute: Route = {
	pattern,
	handler,
};
