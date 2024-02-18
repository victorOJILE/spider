import { FaPlus, FaMinus } from '../react-icons/fa/index.js';

const units = ['px', 'vw', 'vh', 'em', 'rem', '%', 'vmax', 'ch', 'cm', 'pc', 'ex', 'fr', 'in', 'vmin', 'mm', 'pt'];

export default function CREATE_INCR_INPUT(value, config, callback) {
	let parent = el('div', { class: 'flex-ac my-1' + config.width || ' w-1/2' });
	
	let input = el('input', { class: 'form-control text-center w-1/2', type: config.type || 'text', value: value || '0', event: {
		input() {
			callback(input.val() + (select && select.val() || ''), parent.parent(), input[0]);
		}
	} });
	
	if(config.cls) {
		input.addClass(config.cls);
	}
	
	let select;
	parent.append(
		input, 
	 el('button', { class: 'py-1 px-2', event: {
		click() {
			let val = input.val();
			if (val.includes('NaN')) {
				input.val('0');
			} else {
				val = parseInt(val);
				val = val < 0 ? --val : ++val;
				if (val > config.max) return;
				input.val(val);
			}
			callback(val + (select && select.val() || ''), parent.parent(), input[0]);
		}} }, $(FaPlus())),
		el('button', { class: 'py-1 px-2 ml-1', event: {
			click() {
				let val = input.val();
				if (val.includes('NaN')) {
					input.val('0');
				} else {
					val = parseInt(val);
					val = val < 0 ? ++val : --val;
					if (val < config.min) return;
					input.val(val);
				}
				callback(val + (select && select.val() || ''), parent.parent(), input[0]);
			}
		} }, $(FaMinus()))
	);
	
	if(config.addUnit) {
		select = el('select', { class: 'form-control w-16', data: { ignoreFocusIn: true }, event: {
			change() {
				callback(input.val() + $(this).val(), parent.parent(), input[0]);
			}
		} }, ...units.map(e => new Option(e, e, e == config.unit, e == config.unit))
		);
		
		parent.append(select);
	}
	
	return parent;
}