import { CLASS } from './constants.ts';
import { Logger } from './logger.ts';
import { NodeAddObserver } from './node-add-observer.ts';
import type { Trilean } from './types.ts';
import { assertDefined } from './utils.ts';

type AttributeMap<K extends keyof HTMLElementTagNameMap> = Partial<
	Omit<HTMLElementTagNameMap[K], 'classList' | 'dataset'>
> & {
	classList?: string[];
	dataset?: Record<string, string | undefined>;
};

const logger = new Logger('dom');

/**
 * Create an HTML element and apply attributes from an attribute map.
 *
 * Special keys:
 * - `classList`: array of CSS class names → added via `classList.add`.
 * - `dataset`: object of data attributes → assigned via `element.dataset`.
 * - Any other key → treated as a valid HTML attribute/property.
 *
 * @param tagName - The HTML element tag name (e.g., "div", "input").
 * @param attributeMap - Attributes, properties, classList, or dataset to apply.
 * @returns The created element.
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	attributeMap: AttributeMap<K> = {},
): HTMLElementTagNameMap[K] => {
	const element = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributeMap)) {
		if (key === 'classList' && Array.isArray(value)) {
			element.classList.add(...value);
		} else if (
			key === 'dataset' &&
			typeof value === 'object' &&
			value !== null
		) {
			for (const [dataKey, dataVal] of Object.entries(value)) {
				element.dataset[dataKey] = dataVal;
			}
		} else if (value !== undefined) {
			// assign as property if exists, otherwise set as attribute
			if (key in element) {
				// @ts-expect-error TS can't always infer HTMLElement property assignment
				element[key] = value;
			} else {
				element.setAttribute(key, String(value));
			}
		}
	}

	return element;
};

/**
 * Create a template for an element based on a existing element on the page
 * @param nullableReferenceElement - The element to clone
 * @returns The cloned element
 **/
export const createElementTemplate = <T extends HTMLElement | SVGElement>(
	nullableReferenceElement: T | null,
) => {
	const referenceElement = assertDefined(
		nullableReferenceElement,
		'reference element',
	);
	const elementTemplate: T = referenceElement.cloneNode(true) as T;

	elementTemplate.classList.add(CLASS.NEW);

	return elementTemplate;
};

/**
 * Create a pill element.
 *
 * @param text - The text to display in the pill
 * @returns An HTML span element containing the pill
 */
export const createPill = (text?: string) => {
	const div = createElement('div', {
		classList: [CLASS.NEW, CLASS.PILL],
	});

	if (text) {
		div.textContent = text;
	}

	return div;
};

/**
 * Create a button element.
 *
 * @param text - The text to display in the button
 * @param icon - The icon to display in the button
 * @param handleClick - The function to call when the button is clicked
 * @returns An HTML button element
 */
export const createButton = (
	text: string,
	icon: SVGElement,
	handleClick: (
		event: PointerEvent,
		button: HTMLButtonElement,
		span: HTMLSpanElement,
		icon: SVGElement,
	) => Promise<void> | null,
) => {
	const button = createElement('button', {
		classList: [CLASS.NEW, CLASS.BUTTON],
	});
	const span = createElement('span', {
		textContent: text,
	});

	button.addEventListener('click', (event) => {
		logger.debug('Button clicked:', text);

		handleClick(event, button, span, icon);
	});

	button.appendChild(icon);
	button.appendChild(span);

	return button;
};

/**
 * Factory function that creates a tri-state checkbox element.
 *
 * The checkbox cycles through three states on click:
 * - `true`   → checked
 * - `false`  → indeterminate
 * - `null`   → unchecked
 *
 * @param id - The DOM id to assign to the checkbox element.
 * @param tagValue - The label text displayed alongside the checkbox.
 * @param initialCheckedState - The starting state of the checkbox (`true`, `false`, or `null`).
 * @param onClick - Callback invoked whenever the checkbox cycles to a new state.
 * @returns The created `<input type="checkbox">` element.
 *
 * @example
 * ```ts
 * const checkbox = createTriStateCheckbox(
 *   "myBox",
 *   "Enable feature",
 *   null,
 *   (state) => console.log("New state:", state)
 * );
 * document.body.appendChild(checkbox);
 * ```
 */
export const createTriStateCheckbox = (() => {
	const stateMap = {
		undefined: undefined,
		true: true,
		false: false,
	};
	const states = Object.values(stateMap);

	const updateCheckboxState = (
		checkbox: HTMLInputElement,
		checkedState: Trilean,
	) => {
		checkbox.checked = checkedState === true;
		checkbox.indeterminate = checkedState === false;
		checkbox.value = String(checkedState);
	};

	return (
		id: string,
		initialCheckedState: Trilean,
		onClick: (checkedState: Trilean) => void,
	) => {
		const checkbox = createElement('input', {
			type: 'checkbox',
			id,
		});

		checkbox.addEventListener('click', () => {
			let checkedState = stateMap[checkbox.value as keyof typeof stateMap];

			const newCheckedStateIndex =
				(states.indexOf(checkedState) + 1) % states.length;

			checkedState = states[newCheckedStateIndex];

			updateCheckboxState(checkbox, checkedState);

			onClick(checkedState);
		});

		updateCheckboxState(checkbox, initialCheckedState);

		return checkbox;
	};
})();

/**
 * Show or hide an element using a class.
 *
 * @param element - The element to show or hide
 * @param visible - Whether to show or hide the element
 * @returns true if the class list was changed, false otherwise
 */
export const showElement = <T extends HTMLElement>(
	element: T,
	visible: boolean,
): boolean => {
	const shouldHide = !visible;
	const isHidden = element.classList.contains(CLASS.HIDE);

	if (isHidden === shouldHide) {
		return false;
	}

	element.classList.toggle(CLASS.HIDE, shouldHide);

	return true;
};

/**
 * Wait for React to be mounted before calling the callback.
 *
 * @param callback - The callback function to call
 */
export const onReactMounted = (callback: () => void) => {
	const canaryClassName = 'ReactModalPortal';

	const continueCall = () => {
		logger.debug('React has been mounted');

		callback();
	};

	const canaries = document.body.getElementsByClassName(canaryClassName);

	if (canaries.length > 0) {
		continueCall();

		return;
	}

	logger.debug('Waiting for React to be mounted');

	new NodeAddObserver((newNode, observer) => {
		if (
			newNode instanceof HTMLElement &&
			newNode.classList.contains(canaryClassName)
		) {
			observer.disconnect();
			continueCall();
			observer.stop();
		}
	}, document.body);
};
