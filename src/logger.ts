import { PROJECT } from './constants.ts';

type Severity = 'debug' | 'info' | 'warn' | 'error';

const SCRIPT_NAME = `${PROJECT.EMOJI} ${PROJECT.NAME}`;
const IS_DEBUG = true;

const buildLogPrefix = (() => {
	const htmlNode = window.getComputedStyle(document.documentElement);
	const colorMap = {
		primary: htmlNode.getPropertyValue('--theme-ui-colors-primaryOnDark'),
		debug: htmlNode.getPropertyValue('--theme-ui-colors-info'),
		info: htmlNode.getPropertyValue('--theme-ui-colors-success'),
		warn: htmlNode.getPropertyValue('--theme-ui-colors-warning'),
		error: htmlNode.getPropertyValue('--theme-ui-colors-error'),
	};

	return (severity: Severity) => [
		`%c${SCRIPT_NAME} %c${severity}`,
		`font-style:italic;color:${colorMap.primary};`,
		`color:${colorMap[severity]};`,
	];
})();

const buildLogFn = (severity: Severity) => {
	if (!IS_DEBUG) {
		return () => {
			// no-op
		};
	}

	const logFn = console[severity];
	const logPrefix = buildLogPrefix(severity);

	return (...args: unknown[]) => logFn(...logPrefix, ...args);
};

export const debug = buildLogFn('debug');
export const info = buildLogFn('info');
export const warn = buildLogFn('warn');
export const error = buildLogFn('error');
