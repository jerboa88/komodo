import type { Route } from '../types.ts';

const ROUTE_NAME = 'tour view' as const;
const ROUTE_PATTERN = /^\/tour\/\d*?$/;

const handler = async () => {
	// TODO: Implement
};

export const tourViewRoute: Route = {
	name: ROUTE_NAME,
	pattern: ROUTE_PATTERN,
	handler,
};
