import { _ } from '../utils.js';
import {
	FaChevronDown,
	FaChevronUp,
	FaMinus,
	FaPlus
} from '../react-icons/fa/index.js';

export default function TOGGLER(show, props, callback) {
	let up = props.type === 'chevron' ? $(FaChevronUp({ width: '1.5em', class: 'mx-2' })) : $(FaMinus({ class: 'mx-2' }));
	let down = props.type === 'chevron' ? $(FaChevronDown({ width: '1.5em', class: 'mx-2' })) : $(FaPlus({ class: 'mx-2' }));
	let parent = el('span');

	(show === 'up' ? down : up).addClass('hidden');
	
	props.class && parent.prop('class', props.class);
	props.style &&	parent.css(props[style]);
	
	parent.append(up, down)
	.click(function() {
		if (callback && typeof callback === 'function') callback(parent);
		$([up, down]).toggleClass('hidden');
	});
	
	return parent;
}