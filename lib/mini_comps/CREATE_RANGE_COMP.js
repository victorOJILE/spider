import { _ } from '../utils.js';
import CREATE_SELECT from './CREATE_SELECT.js';
import { FaChevronLeft, FaChevronRight } from '../react-icons/fa/index.js';

function angleIndicator(angle) {
	return el('div', { class: ['angleIndicator', angle || 'full'] });
}

const rangeLimits = [-5000, -3000, -1000, -500, -300, -100, 0, 100, 300, 500, 1000, 3000, 5000];

export default function CREATE_RANGE_COMP(obj, callback) {
	let min = obj.min || rangeLimits.findIndex((num, ind) => parseFloat(obj.value || 0) >= num && parseFloat(obj.value || 0) < rangeLimits[ind + 1]);
	let max = obj.max || rangeLimits[min + 1];
	min = obj.min || rangeLimits[min];
	
	const range = el('input', { type: 'range', min, max, value: parseFloat(obj.value || 0), step: obj.step, class: 'mx-2' });
	let rangeState = range.val();

	const chevronLeft = $(FaChevronLeft({ width: '1.5em' }));
	const chevronRight = $(FaChevronRight({ width: '1.5em' }));
	
	let rangeOutput = el('output', { textContent: range.val(), class: 'flex-ajc' });
	
	let unit;
	if (obj.addUnit) {
		unit = CREATE_SELECT({
			attributes: {
				class: 'form-control w-16',
				data: { ignoreFocusIn: true }
			},
			options: ['px', 'vw', 'vh', 'em', 'rem', '%', 'vmax', 'ch', 'cm', 'pc', 'ex', 'fr', 'in', 'vmin', 'mm', 'pt'],
			selected: obj.unit,
			changeCallback: (e) => {
				callback(rangeState + $(e.target).val(), obj, range[0]); // callback is the function that would run on range input change
			}
		});
	}
	
	chevronLeft.click(function() {
		let index = rangeLimits.findIndex(e => rangeState == e);
		if (rangeState == range.attr('min')) {
			range.attr('min', rangeLimits[index - 1]);
			range.attr('max', rangeState);
		} else {
			updateState(parseInt(range.val()) - 1, callback);
		}
	});
	
	chevronRight.click(function() {
		let index = rangeLimits.findIndex(e => parseInt(rangeState) == e);
		if (index == -1) index = 6;
		if (~index && rangeState == range.attr('max')) {
			range.attr('min', rangeState);
			range.attr('max', rangeLimits[index + 1] || rangeState * 2);
		} else {
			updateState(parseInt(range.val()) + 1, callback);
		}
	});
	
	let rangeDiv = el('span', { class: 'flex-ac' }, chevronLeft, range, chevronRight);

	let form = el('form', { class: 'flex-ac py-1' });
	if (!obj?.showAngleIndicator) {
		obj?.angleIndicator && form.append(angleIndicator(obj.angleIndicator));
	}
	form.append(rangeDiv,
		el('div', { class: 'range-output' }, rangeOutput)
	);
	obj.addUnit && form.append(unit);
	
	form.on('input', function() {
		let val = Math.round(range[0].valueAsNumber);
		updateState(val, callback); // callback is the function that would run on range input change
	});

	function updateState(val, callback) {
		range.val(val);
		rangeState = val;
		rangeOutput.text(val);
		callback(val + (unit ? unit.val() : ''), obj, range[0]); // function to run on range input change
	}

	rangeDiv = el('div', { class: 'range p-2 text-center' }, form);
	
	return rangeDiv;
}