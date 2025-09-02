import { PROJECT } from './constants.ts';

type Severity = 'debug' | 'info' | 'warn' | 'error';

const SCRIPT_NAME = `${PROJECT.EMOJI} ${PROJECT.NAME}`;
const IS_DEBUG = true;

export class Logger {
	private scope: string;
	private static colorMap: Record<string, string> = (() => {
		const htmlNode = window.getComputedStyle(document.documentElement);
		return {
			primary: htmlNode.getPropertyValue('--theme-ui-colors-primaryOnDark'),
			debug: htmlNode.getPropertyValue('--theme-ui-colors-info'),
			info: htmlNode.getPropertyValue('--theme-ui-colors-success'),
			warn: htmlNode.getPropertyValue('--theme-ui-colors-warning'),
			error: htmlNode.getPropertyValue('--theme-ui-colors-error'),
		};
	})();

	debug: (...args: unknown[]) => void;
	info: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;

	constructor(scope: string) {
		this.scope = scope;

		this.debug = this.buildLogFn('debug');
		this.info = this.buildLogFn('info');
		this.warn = this.buildLogFn('warn');
		this.error = this.buildLogFn('error');
	}

	private buildLogPrefix(severity: Severity): [string, string, string] {
		return [
			`%c${SCRIPT_NAME} %c${severity}(${this.scope})`,
			`font-style:italic;color:${Logger.colorMap.primary};`,
			`color:${Logger.colorMap[severity]};`,
		];
	}

	private buildLogFn(severity: Severity) {
		if (!IS_DEBUG) return () => {};
		const logFn = console[severity];
		const logPrefix = this.buildLogPrefix(severity);
		return (...args: unknown[]) => logFn(...logPrefix, ...args);
	}
}
