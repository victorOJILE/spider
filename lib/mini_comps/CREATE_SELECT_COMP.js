import { _ } from '../utils.js';
import { FaInfoCircle } from '../react-icons/fa/index.js';

export default function CREATE_SELECT_COMP(tag, par, context, value) {
		try {
			const select = el('select', { id: tag.id, name: tag.id, class: 'form-select cols-span-1', event: {
				change() { context[tag.id] = $(this).val() }
			} });
			
			for (let prop in tag.attr) {
				if ('content' in tag.attr) {
					$.each(tag.attr.content, (i, each) => select.append(new Option(each, each)));
				} else {
					$.each(tag.attr[prop], (ind, each) => select.append(new Option(each, (tag && (tag.innerText && tag.innerText[ind])) || each)));
				}
			}

			if (value) {
				for (let option of select[0].options) {
					if (option.value == value) {
						option.selected = true;
						break;
					}
				}
			}
			par = el('div', { class: 'my-1 grid grid-cols-2' },
			 el('label', { htmlFor: tag.id, textContent: tag.alias, class: 'cols-span-1' }),
			 select
			);
			
			if (tag.info) {
				par = el('div', 0, par, el('small', { class: 'inline-block mt-2 text-info text-yellow-500' }, $(FaInfoCircle({ class: 'mx-2' })), tag.info));
			}
			return par;
		} catch (e) {
			console.error(e.stack);
		}
}