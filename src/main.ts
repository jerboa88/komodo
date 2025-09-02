import './global.css';
import { Logger } from './logger.ts';
import { tourListRoute } from './pages/tour/list/index.ts';
import { tourViewRoute } from './pages/tour/view/index.ts';
import { tourZoomRoute } from './pages/tour/zoom/index.ts';
import type { Route } from './types.ts';

const logger = new Logger('router');

/**
 * Register handlers for the given routes.
 *
 * @param routes - The routes to register handlers for
 */
const registerRouteHandlers = (routes: Route[]) => {
	const path = location.pathname;

	for (const { name, pattern, handler } of routes) {
		const match = pattern.exec(path);

		if (match) {
			logger.debug(`Router: Calling handler for '${name}' route`);

			// Pass capturing groups to handler (excluding full match at index 0)
			handler(...match.slice(1));

			break;
		}
	}
};

/**
 * Entry point for the script.
 */
const init = () => {
	logger.debug('Script loaded');

	registerRouteHandlers([tourListRoute, tourViewRoute, tourZoomRoute]);

	logger.debug('Script unloaded');
};

init();
