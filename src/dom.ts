import { CLASS } from './constants.ts';
import { debug } from './logger.ts';
import type { Trilean } from './types.ts';
import { assertDefined } from './utils.ts';

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
		'Unable to create element template. Reference element not found',
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
	const div = document.createElement('div');

	if (text) {
		div.textContent = text;
	}

	div.classList.add(CLASS.NEW, CLASS.PILL);

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
	const button = document.createElement('button');
	const span = document.createElement('span');

	span.textContent = text;
	button.onclick = (event) => {
		debug('Button clicked');

		handleClick(event, button, span, icon);
	};

	button.classList.add(CLASS.NEW, CLASS.BUTTON);
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
		const checkbox = document.createElement('input');

		checkbox.type = 'checkbox';
		checkbox.id = id;

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
		debug('React has been mounted');

		callback();
	};

	const canaries = document.body.getElementsByClassName(canaryClassName);

	if (canaries.length > 0) {
		continueCall();

		return;
	}

	const observer = new MutationObserver((mutations) => {
		debug('Mutations observed on body', mutations);

		for (const mutation of mutations) {
			for (const newNode of mutation.addedNodes) {
				if (
					newNode instanceof HTMLElement &&
					newNode.classList.contains(canaryClassName)
				) {
					observer.disconnect();
					continueCall();

					return;
				}
			}
		}
	});

	debug('Waiting for React to be mounted');

	observer.observe(document.body, { childList: true });
};
