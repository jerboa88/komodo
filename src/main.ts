import './style.css';
import { debug } from './logger.ts';
import { routeListRoute } from './pages/route-list';
import { routeViewRoute } from './pages/route-view.ts';
import type { Route } from './types.ts';

/**
 * Register route handlers for the given routes.
 *
 * @param routes - The routes to register handlers for
 */
const registerRouteHandlers = (routes: Route[]) => {
	const path = location.pathname;

	for (const { pattern, handler } of routes) {
		if (pattern.test(path)) {
			handler();

			break;
		}
	}
};

/**
 * Entry point for the script.
 */
const init = () => {
	debug('Script loaded');

	registerRouteHandlers([routeViewRoute, routeListRoute]);

	debug('Script unloaded');
};

init();
