import { _ } from '../utils.js';
import CLICK_DROPDOWN from '../snippets/CLICK_DROPDOWN.js';
import CREATE_INCR_INPUT from '../snippets/CREATE_INCR_INPUT.js';
import { FaLightbulb } from '../react-icons/fa/index.js';
import { BsChevronBarRight, BsArrowLeftRight, BsBorderAll } from '../react-icons/bs/index.js';

const views = ['mobile', 'mobile_lsc', 'tablet', 'laptop', 'desk1', 'desk2'];
const viewUnit = ['', 'sm', 'md', 'lg', 'xl', 'xxl'];

export default function LAYOUT_COMPONENT(boxcount, defaults, modifier) {
	this.__proto__ = new Dialogue('Layout');

	let val = () => ({
		order: {},
		offset: {},
		gutter: {}
	});
	
	this.__proto__.myContext = views.reduce((acc, cur) => (acc[cur] = val(), acc), {});

	const outerThis = this;

	const main = el('main', { class: 'dialogueBody propsFormatDiv p-1 bg-2' });

	main.append(
		el('h2', { class: 'my-3 font-bold text-lg', textContent: `${boxcount}X Layout settings` })
	);

	let inputs;

	const comp = function(view) {
		let ul = el('ul');

		iter(defaults, function(def) {
			let li = el('li', { class: 'p-2', textContent: def.name });

			li.click(function() {
				let format = def.format;
				for (let i = 0; i < 5; i++) {
					def.format = def.format.concat(format);
				}

				$.each(def.format.slice(view), function(ind, code) { $(inputs[ind + view]).val(code) });

				let i = view,
					j = view / boxcount,
					k = 0;
				while (i < def.format.length) {
					for (; k < boxcount; k++) {
						outerThis.myContext[views[j]][k] = def.format[i++];
					}
					j++, k = 0;
				}
			});
			ul.append(li);
		});
		
		let toggler = el('button', { class: 'text-info rounded border-warning', style: { backgroundColor: 'inherit' } }, $(FaLightbulb()));

		let dropdown = el('div', { class: 'menu right-0 p-1' }, ul);

		return el('div', { class: 'p-1 mt-1 text-black-50 border relative' },
			el('div', { class: 'absolute right-0 mr-2 mt-1 py-2 px-3 bg-3 rounded-sm' },
				el('div', { class: 'dropdown' }, toggler, dropdown)
			))
	};

	const Mobile_View = comp(0),
		Mobile_Landscape_View = comp(boxcount * 1),
		Tablet_View = comp(boxcount * 2),
		Laptop_View = comp(boxcount * 3),
		Desktop_View_1 = comp(boxcount * 4),
		Desktop_View_2 = comp(boxcount * 5);

	main.append(
		CLICK_DROPDOWN('Mobile view', Mobile_View, true),
		CLICK_DROPDOWN('Mobile landscape view', Mobile_Landscape_View),
		CLICK_DROPDOWN('Tablet view', Tablet_View),
		CLICK_DROPDOWN('Laptop view', Laptop_View),
		CLICK_DROPDOWN('Desktop view', Desktop_View_1),
		CLICK_DROPDOWN('Desktop view 2', Desktop_View_2)
	);

	let value = parseInt(12 / boxcount),
		rem = 12 % boxcount;

	function appendOptions(view, i, name, value) {
		view.append(
			el('div', { class: 'p-1 bg-1 mb-1' },
				el('div', { class: 'flex items-center justify-between mb-1' },
					el('div', { textContent: 'Grid:' }),
					el('div', { class: 'bg-2 rounded-sm w-8/12 p-1' },
						CREATE_INCR_INPUT(value, { min: 1, max: 12, type: 'number', cls: 'main' }, function(val) { outerThis.myContext[name][i] = val })
					)
				),
				el('div', { class: 'grid grid-cols-3' },
					el('div', { class: 'flex items-center bg-2 rounded-sm mr-1' }, $(BsArrowLeftRight({ width: '1.4em', class: 'text-yellow-600 mx-1' })), CREATE_INCR_INPUT(i + 1, { min: 1, max: 12, type: 'number', width: ' w-10/12' }, function(val) { outerThis.myContext[name].order[i] = val })),
					el('div', { class: 'flex items-center bg-2 rounded-sm mr-1' }, $(BsChevronBarRight({ width: '1.5em', class: 'text-yellow-600 mx-1' })), CREATE_INCR_INPUT(1, { min: 1, max: 12, type: 'number', width: ' w-10/12' }, function(val) { outerThis.myContext[name].offset[i] = val }))
				)
			)
		);

		outerThis.myContext[name][i] = value;
	}

	for (let i = 0; i < boxcount; i++) {
		if (i + 1 == boxcount) value += rem;
		appendOptions(Mobile_View, i, 'mobile', value);
		appendOptions(Mobile_Landscape_View, i, 'mobile_lsc', value);
		appendOptions(Tablet_View, i, 'tablet', value);
		appendOptions(Laptop_View, i, 'laptop', value);
		appendOptions(Desktop_View_1, i, 'desk1', value);
		appendOptions(Desktop_View_2, i, 'desk2', value);
	}

	inputs = $('input.main', main);

	// Add gutter (spacing) option to all views

	iter([
			[Mobile_View, views[0]],
			[Mobile_Landscape_View, views[1]],
			[Tablet_View, views[2]],
			[Laptop_View, views[3]],
			[Desktop_View_1, views[4]],
			[Desktop_View_2, views[5]]
		], function([elem, view]) {
		elem.append(
			el('div', { class: 'flex items-center justify-between bg-2 rounded-sm' }, 'Spacing:', CREATE_INCR_INPUT(3, { min: 1, max: 5, type: 'number', width: ' w-8/12' }, function(val) { outerThis.myContext[view].gutter.value = val }))
		);
	});

	this.__proto__.callback = function() {
		let elem = ACTIVE_ELEM;
		if (elem.props.class) {
			let cls = elem.props.class;

			// Create a new class with some exceptions
			let newCls = $.grep(cls, e => !e.startsWith('col') && !e.includes('order') && e != 'grid' && !e.match(/row-?|g-\w+/));

			// Add the 'row' class to the element
			newCls.push('row');

			if (!modifier && ACTIVE_DOM_ELEM.className.indexOf('col') != -1 || ACTIVE_DOM_ELEM.parentElement.className.indexOf('row') != -1) { // if we are not modifying an existing layout and the selected element is a flex child with col- class

				_.INSERT_NEW_ELEMENT({
					type: 'div',
					name: 'Box',
					props: {
						innerHTML: '',
						class: newCls,
						style: {}
					}
				});

				ACTIVE_DOM_ELEM = ACTIVE_DOM_ELEM.firstElementChild;
				ACTIVE_ELEM = _.getElementObj(ACTIVE_DOM_ELEM.ref);

				elem = ACTIVE_ELEM;
			} else {
				elem.props.class = newCls;
			}
		} else {
			elem.props.class('row');
		}

		let obj = this.myContext;
		let spacing, order, offset;
		
		// Add gutter classes to parent element
		$.each(views, function(ind, view) {
			if (obj[view].gutter.value && ind != Number(obj[view].gutter.value) + 1) {
				let cls = `g-${ind ? `${viewUnit[ind]}-` : ''}${obj[view].gutter.value}`;

				if (spacing && obj[view].gutter.value == spacing.match(/\d$/)[0]) return;

				elem.props.class.push(cls);
				spacing = cls;
			}
		});

		let mobile = Object.values(obj.mobile).slice(0, boxcount);
		let mobile_lsc = Object.values(obj.mobile_lsc).slice(0, boxcount);
		let tablet = Object.values(obj.tablet).slice(0, boxcount);
		let laptop = Object.values(obj.laptop).slice(0, boxcount);
		let desk1 = Object.values(obj.desk1).slice(0, boxcount);
		let desk2 = Object.values(obj.desk2).slice(0, boxcount);

		let childObj = function() {
			return {
				type: 'div',
				name: 'Edit Child',
				props: {
					innerHTML: '',
					style: {},
					class: []
				},
				children: [{
					type: 'div',
					name: 'Box',
					props: {
						innerHTML: '',
						style: {},
						class: []
					},
					children: []
					}]
			}
		};
		
		let addRowCols = Array.from({ length: 6 }, () => true);

		if (modifier) { // If we are modifying an existing layout
			let children = ACTIVE_ELEM.children;
			for (let elemObj of children) elemObj.props.class = $.grep(elemObj.props.class, cl => !cl.startsWith('col-') && !cl.match(/order|row-cols|offset|g-\w+/));

			for (let i = 0; i < boxcount; i++) addClass(i, children[i]);
		} else {
			for (let i = 0; i < boxcount; i++) {
				let child = childObj();
				addClass(i, child);

				_.INSERT_NEW_ELEMENT(child);
			}
		}
		
		function addClass(i, child) {
			if (addRowCols[0] && mobile.every(e => e == mobile[0])) {
				if (12 / mobile[i] != 1) {
					elem.props.class.push(`row-cols-${12/mobile[i]}`);
					addRowCols[0] = false;
				}
			} else {
				addRowCols[0] && child.props.class.push(`col-${mobile[i]}`);
			}

			// TODO:

			if (obj.mobile.order[i] && i != obj.mobile.order[i]) {
				child.props.class.push(`order-${obj.mobile.order[i]}`);
			}

			let col;
			if (addRowCols[1] && mobile_lsc.every(e => e == mobile_lsc[0])) {
				col = 12 / mobile_lsc[i];
				// Here, we don't want same layout setting to repeat itself in another view e.g row-cols-2,row-cols-sm-2
				if (!(12 / mobile[i] == col && !addRowCols[0])) {
					elem.props.class.push(`row-cols-sm-${col}`);
					addRowCols[1] = false;
				}
			} else {
				addRowCols[1] && mobile[i] != mobile_lsc[i] && child.props.class.push(`col-sm-${mobile_lsc[i]}`);
			}

			if (addRowCols[2] && tablet.every(e => e == tablet[0])) {
				col = 12 / tablet[i];
				// Here, we will check backwards twice (mobile_lsc then mobile) if mobile_lsc check is falsy
				if (!(
						(12 / mobile_lsc[i] == col && !addRowCols[1]) ||
						(12 / mobile[i] == col && !addRowCols[0])
					)) {
					elem.props.class.push(`row-cols-md-${col}`);
					addRowCols[2] = false;
				}
			} else {
				addRowCols[2] && mobile_lsc[i] != tablet[i] && child.props.class.push(`col-md-${tablet[i]}`);
			}

			if (addRowCols[3] && laptop.every(e => e == laptop[0])) {
				col = 12 / laptop[i];
				if (!(
						(12 / tablet[i] == col && !addRowCols[2]) ||
						(12 / mobile_lsc[i] == col && !addRowCols[1]) ||
						(12 / mobile[i] == col && !addRowCols[0])
					)) {
					elem.props.class.push(`row-cols-lg-${12/laptop[i]}`);
					addRowCols[3] = false;
				}
			} else {
				addRowCols[3] && tablet[i] != laptop[i] && child.props.class.push(`col-lg-${laptop[i]}`);
			}

			if (addRowCols[4] && desk1.every(e => e == desk1[0])) {
				let col = 12 / desk1[i];
				if (!(
						(12 / laptop[i] == col && !addRowCols[3]) ||
						(12 / tablet[i] == col && !addRowCols[2]) ||
						(12 / mobile_lsc[i] == col && !addRowCols[1]) ||
						(12 / mobile[i] == col && !addRowCols[0])
					)) {
					elem.props.class.push(`row-cols-xl-${12/desk1[i]}`);
					addRowCols[4] = false;
				}
			} else {
				addRowCols[4] && laptop[i] != desk1[i] && child.props.class.push(`col-xl-${desk1[i]}`);
			}

			if (addRowCols[5] && desk2.every(e => e == desk2[0])) {
				let col = 12 / desk2[i];
				if (!(
						(12 / desk1[i] == col && !addRowCols[1]) ||
						(12 / laptop[i] == col && !addRowCols[3]) ||
						(12 / tablet[i] == col && !addRowCols[2]) ||
						(12 / mobile_lsc[i] == col && !addRowCols[1]) ||
						(12 / mobile[i] == col && !addRowCols[0])
					)) {
					elem.props.class.push(`row-cols-xxl-${12/desk2[i]}`);
					addRowCols[5] = false;
				}
			} else {
				addRowCols[5] && desk1[i] != desk2[i] && child.props.class.push(`col-xxl-${desk2[i]}`);
			}
		}
		
		_.UPDATE_DOM_ELEMENT();
	}
	this.newDialog(main);

	return this.closeProperty;
}