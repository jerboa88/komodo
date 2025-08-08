import { CLASS } from './constants.ts';
import { debug } from './logger.ts';
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
export const createPill = (text: string) => {
	const div = document.createElement('div');

	div.textContent = text;

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
 * Create a select element that allows for multiple selections.
 *
 * @param name - The name of the select element
 * @param optionObjs - An array of objects containing the value and selected state of each option
 * @param handleChange - The function to call when the select element is changed
 * @returns An HTML select element
 */
export const createMultiSelect = (
	name: string,
	optionObjs: { value: string; selected: boolean }[],
	handleChange: (event: Event) => void,
) => {
	const select = document.createElement('select');

	select.id = name;
	select.multiple = true;
	select.size = Math.min(5, optionObjs.length);

	const sortedValues = [...optionObjs].sort((a, b) =>
		a.value.localeCompare(b.value),
	);

	for (const { value, selected } of sortedValues) {
		const option = document.createElement('option');

		option.value = value;
		option.textContent = value;
		option.selected = selected;

		select.appendChild(option);
	}

	select.onchange = handleChange;

	return select;
};

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
