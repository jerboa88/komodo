import { debug } from './logger.ts';
import { assertDefined } from './utils.ts';

/**
 * Wrapper around `MutationObserver` that focuses on added nodes.
 *
 * Usage:
 * ```ts
 * const observer = new NodeAddObserver((node, obs) => {
 *   if (node instanceof HTMLElement && node.classList.contains('canary')) {
 *     console.log('Found canary node!');
 *     obs.disconnect();
 *     obs.stop(); // exit processing loop early
 *   }
 * }, document.body, { subtree: true });
 * ```
 */
export class NodeAddObserver {
	private observer: MutationObserver;
	private stopProcessing = false;
	private target?: Node;
	private options?: MutationObserverInit;

	/**
	 * Creates a new `NodeAddObserver`.
	 *
	 * @param callback - Function called for each added node.
	 *   - args: `(node, obs)`
	 *     - `node`: the newly added Node
	 *     - `obs`: the current `NodeAddObserver` instance, so you can call `disconnect`, `observe`, `reobserve`, or `stop`
	 * @param target - Optional Node to automatically start observing
	 * @param options - Optional observer options (merged with `{ childList: true }`)
	 */
	constructor(
		callback: (node: Node, obs: NodeAddObserver) => void,
		target?: Node,
		options?: MutationObserverInit,
	) {
		this.observer = new MutationObserver((mutations) => {
			this.stopProcessing = false;

			for (const mutation of mutations) {
				for (const newNode of mutation.addedNodes) {
					if (this.stopProcessing) {
						return;
					}

					callback(newNode, this);
				}
			}
		});

		if (options) {
			this.options = options;
		}

		// Auto-start if a target Node was provided
		if (target) {
			this.target = target;
			this.observe(target, options);
		}
	}

	/** Disconnects the observer */
	public disconnect(): void {
		this.observer.disconnect();
		debug('Disconnected');
	}

	/**
	 * Starts observing a target Node for added children.
	 * Subtree changes are included if `{ subtree: true }` is passed in options.
	 */
	public observe(target: Node, options: MutationObserverInit = {}): void {
		this.observer.observe(target, { childList: true, ...options });
		debug('Observing:', target);
	}

	/**
	 * Disconnects and re-observes the previously specified target.
	 * Useful when the DOM may have reset.
	 *
	 * @param beforeObserve - Callback executed between disconnect and reobserve.
	 */
	public reobserve(beforeObserve: () => void): void {
		const target = assertDefined(this.target);
		this.disconnect();
		beforeObserve();
		this.observe(target, this.options);
	}

	/** Stops looping over new nodes immediately */
	public stop(): void {
		this.stopProcessing = true;
	}
}
