import { _ } from '../utils.js';
import { FaChevronUp, FaChevronDown } from '../react-icons/fa/index.js';

/**
 * @function
 * @param {string} name
 * @param {HTMLElement} content
 * @param {Boolean} open
*/

export default function CLICK_DROPDOWN(name, content, open) {
	let iconUp = el('span', { }, $(FaChevronUp({ width: '1.5em', class: 'mx-2' })));
	let iconDown = el('span', 0, $(FaChevronDown({ width: '1.5em', class: 'mx-2' })));
	
	!open &&	iconUp.hide();
	
	const parent = el('div', { class: 'mb-2' },
		el('div', { textContent: name, class: 'p-2 border flex-ajsb rounded bg-3', event: {
				click() {
					iconUp.toggle();
					iconDown.toggle();
					
					if(content[0].isConnected) {
						content[0].remove();
					} else {
						parent.append(content);
					}
				}
			} },	iconUp, iconDown
		));
	
	if(open) {
		iconDown.hide();
		parent.append(content);
	}
	
	return parent;
}