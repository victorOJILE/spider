import CREATE_SELECT from './CREATE_SELECT.js';

/**
 * Create a select element with a label on the left and element on the right
	* @function
	* @param {object} props
	* @param {string} props.innerText
	* @param {string} props.id
	* @param {object} props.selectProps
	
	* @param {object} props.selectProps.attributes - HTMLElement attributes to be added to the select element
	
	* @param {array} props.selectProps.options - Select options
	
	* @param {string} props.selectProps.selected
	
	* @param {function} props.selectProps.changeCallback
	
	* @param {string|array} props.class
*/

export default function CREATE_SELECT_WITH_LABEL(props) {
	let component = el('div', { class: 'flex-ajsb my-2' },
		el('label', { textContent: props.innerText, htmlFor: props.id }),
		CREATE_SELECT(props.selectProps)
	);

	if (props.class) {
		switch (typeof props.class) {
			case 'string':
				component.addClass(props.class);
				break;
			default:
			component.addClass.apply(component, props.class);
		}
	}
	
	return component;
}
