import { _ } from '../utils.js';
import { styleProps } from '../data.js';
import CREATE_SELECT_WITH_LABEL from '../snippets/CREATE_SELECT_WITH_LABEL.js';
import CREATE_RANGE_COMP from '../snippets/CREATE_RANGE_COMP.js';
import RangeAxis from '../snippets/RangeAxis.js';
import {
	FaPlus,
	FaMinus,
	FaArrowLeft,
	FaListUl
} from '../react-icons/fa/index.js';

const smallListComponent = (f, arrow) => {
	if (arrow) {
		return el('form', { class: 'dropend' }, el('input', { type: 'submit', value: f, class: 'p-1 dropdown-toggle w-full text-left truncate border-0' }));
	} else {
		return el('form', 0, el('input', { type: 'submit', value: f, class: 'p-1 dropdown-toggle w-full text-left truncate border-0' }))
	}
};

function angleIndicator(angle) {
	return el('div', { class: ['angleIndicator', angle || 'full'] });
}

function PropertyDialogue() {
	let previousStyle = cloneObj(updateViewF());

	let h3SideBar = el('h3', { class: 'p-1 text-center m-0 ml-1', textContent: 'All' });
	let backArrowIcon = $(FaArrowLeft({ width: '1.4em', class: 'mx-1', style: 'display: none' }));

	let listIcon = $(FaListUl({ width: '1.4em', class: 'mx-1' }));
	let propsMainH3Parent = el('span');

	let propsFormatDiv = el('div', { class: 'propsFormatDiv' }, el('h3', { class: 'text-center mx-auto', textContent: 'Please, select an option from the left section.', style: { color: 'lightgrey', width: '11rem' } }));

	let rangeHolder = el('div', { id: 'rangeHolder' });

	this.__proto__ = new Dialogue('Properties');
	
	const outerThis = this;

	this.generatePropsPropList = function(arr, eventFunc, propsProp, removeEvent, addName) {
		propsProp.empty();

		iter(arr, function(each, ind) {
			let li;
			if (!removeEvent) {
				li = smallListComponent(each.name, true);
			} else {
				li = smallListComponent(each.name);
				!ind && li.addClass('active-dialogueSidebarLi');
			}
			li.submit(function(e) { eventFunc(e, propsProp) });
			li.prop('name', each.name);
			if (addName) {
				li.data({
					parent: addName,
					style: each.data || each.name.replace(' ', '-').toLowerCase()
				});
			}
			propsProp.append(li);
		});

		if (removeEvent) this.generatePropsComp(propsProp.children().first());
	}

	this.stylePropList = function(e, propsProp) {
		e.preventDefault();
		let name = $(e.target).prop('name');
		let targObj = styleProps.find(e => name == e.name);
		let targetVal = targObj.val;

		h3SideBar.text(targObj.name);

		listIcon.css('display', 'none');
		backArrowIcon.css('display', 'block');

		outerThis.generatePropsPropList(targetVal, outerThis.styleProp, propsProp, true, targObj.name);
	}

	this.styleProp = function(e) {
		e.preventDefault();
		let t = $(e.target);
		if (t.hasClass('active-dialogueSidebarLi')) return;

		$('form', t.parent()).removeClass('active-dialogueSidebarLi');
		t.addClass('active-dialogueSidebarLi');

		outerThis.generatePropsComp(t);
	}

	this.generatePropsComp = function(t) {
		try {
			const innerText = t.prop('name');
			let tData = t.data();
			let datasetVal = tData.parent;

			propsMainH3Parent.text(`${datasetVal} » ${innerText}`);

			let found = styleProps.find(e => datasetVal == e.name).val.find(e => e.name == innerText);

			propsFormatDiv.empty();

			this.dialogueSelectPropValue = el('input', { type: 'text', class: 'form-control' });

			this.dialogueSelectPropValue.blur(function() {
				_.UPDATE_STYLE(tData.style, $(this).val())
			});

			const propsSelectedValDiv = el('div', { textContent: `${innerText}: `, class: 'p-2' }, this.dialogueSelectPropValue);

			propsFormatDiv.append(propsSelectedValDiv);

			this.propsStyle = tData.style;

			let updateView = updateViewF();

			let comps = {
				range() {
					let oldStyle = updateView[this.propsStyle] || '0px';

					this.dialogueSelectPropValue.val(oldStyle);

					if (found.includeRangeAxis) {
						let rangeAxis = new RangeAxis();
						rangeAxis.selectedPropValue = this.dialogueSelectPropValue;
						rangeAxis.callback = this.rangeUpdateMeth;

						propsFormatDiv.append(rangeAxis.rangeMeth({
							rangeInd: 0,
							addUnit: !found.noUnit,
							unit: String(oldStyle).match(/\D+$/)?.[0] || 'px'
						}));
					} else {
						propsFormatDiv.append(new CREATE_RANGE_COMP({
							value: parseInt(oldStyle),
							showAngleIndicator: found.showAngleIndicator,
							rangeInd: 0,
							addUnit: !found.noUnit,
							unit: String(oldStyle).match(/\D+$/)?.[0] || 'px'
						}, function(value) {
							outerThis.dialogueSelectPropValue.val(value);
							outerThis.rangeUpdateMeth(value);
						}));
					}
					rangeHolder.empty();
				},
				text() {
					let selected = replaceHyphens(found.data || replaceSpaces(found.name).toLowerCase());
					//  console.log(updateView, selected)
					propsFormatDiv.append(this.text(found.val, updateView[selected] && updateView[selected]));
				},
				select() {
					this.selectValue(found, innerText.toLowerCase());
				},
				'select-add'() {
					this.selectValue(found, innerText.toLowerCase(), true);
				}
			}
			iter(found.type, each => comps[each].call(this, found));
		} catch (e) {
			console.error(e.stack);
		}
	}

	this.text = function(arr, highlight) {
		highlight && this.dialogueSelectPropValue.val(highlight);

		const div = el('div', { class: 'p-1 pt-3 mt-2 textPropValPar' });

		iter(arr, function(each) {
			div.append(
				el('span', { class: ['inline-block', 'py-1', 'px-2', 'm-1', 'textPropVal', each == highlight && 'textPropValHoverClass'], textContent: each, tabIndex: 1 })
			);
		});

		_.UPDATE_CLASS_ON_SELECT({ parent: div, className: 'textPropValHoverClass' }, true, function(targ) {
			if (targ.hasClass('textPropValHoverClass')) {
				outerThis.dialogueSelectPropValue.val('');
				_.UPDATE_STYLE(outerThis.propsStyle, '');
			} else {
				outerThis.dialogueSelectPropValue.val(targ.text());
				_.UPDATE_STYLE(outerThis.propsStyle, outerThis.dialogueSelectPropValue.val());
			}
		});

		return div;
	}

	this.selectValue = function(object, id, add) {
		let updateView = updateViewF();

		if (updateView[id]) this.dialogueSelectPropValue.val(updateView[id]);

		let div = el('div', { class: 'p-1 m-1' });

		function run(obj, selected, ind) {
			return {
				innerText: obj.innerText,
				id: obj.innerText,
				class: 'p-1',
				selectProps: {
					attributes: {
						id: obj.innerText,
						class: ['form-select', 'w-1/2'],
						name: id
					},
					options: obj.val,
					selected,
					changeCallback: function(e) {
						outerThis.rangeUpdateMeth($(e.target).val(), { rangeInd: ind }, e.target)
					}
				}
			};
		}

		function rerun() {
			iter(object.val, function(obj, ind) {
				let selected = '';
				if (!updateView[id]) {
					outerThis.dialogueSelectPropValue[0].value += obj.val[0] + " ";
				} else {
					selected = updateView[id].split(' ')[ind];
				}

				div.append(CREATE_SELECT_WITH_LABEL(run(obj, selected, ind)));
			});
		}

		rerun();

		propsFormatDiv.append(div);

		if (add) {
			let adderDiv = el('div', { class: 'px-2 mt-2' });

			let addbtn = el('btn', {
				class: 'btn btn-primary ml-1',
				event: {
					click: function() {
						let obj = cloneObj(object.val[0]);
						let newObj = $.extend(obj, { innerText: obj.innerText + ' ' + (object.val.length + 1) });
						object.val.push(newObj);
						outerThis.dialogueSelectPropValue.val('');
						div.empty();
						rerun();
					}
				}
			}, $(FaPlus()));

			let minusbtn = el('btn', {
				class: 'btn btn-danger ml-1',
				event: {
					click: function() {
						if (object.val.length == 1) return outerThis.dialogueSelectPropValue.val('');
						object.val.pop();
						outerThis.dialogueSelectPropValue.val('');
						div.empty();
						rerun();
					}
				}
			}, $(FaMinus()));

			adderDiv.append(minusbtn, addbtn);
			propsFormatDiv.append(adderDiv);
		}
	}

	this.rangeUpdateMeth = function(value) {
		_.UPDATE_STYLE(outerThis.propsStyle, value);
	}

	this.__proto__.cancelled = function() {
		try {
			updateViewF() = previousStyle; // TODO, may not update the returned object

			_.UPDATE_DOM_ELEMENT();
		} catch (e) {
			console.error(e.stack)
		}
	};

	let span = el('span', { class: 'flex-ajc' }, listIcon, backArrowIcon);
	let propsProps = el('ul', { id: 'propsProps' });

	backArrowIcon.click(function(e) {
		h3SideBar.text('All');
		let arrowBackSvg = $(this);

		arrowBackSvg.css('display', 'none');
		arrowBackSvg.prev().css('display', 'block');

		outerThis.generatePropsPropList(styleProps, outerThis.stylePropList, propsProps);
	});

	this.generatePropsPropList(styleProps, this.stylePropList, propsProps);

	let dialogueSidebar = el('div', { class: 'dialogueSidebar' },
		el('div', { class: 'flex al-cent ulHeader bg-2' }, span, h3SideBar),
		el('div', { class: 'propsPropsParent px-1 my-2' }, propsProps)
	);

	let propsMain = el('div', { class: 'flex-grow', id: 'prop' },
		el('div', { class: 'ulHeader flex-ac pl-2 bg-2' },
			propsMainH3Parent
		),
		propsFormatDiv
	);

	this.newDialog(el('div', { class: 'flex flex-grow bg-1' }, dialogueSidebar, propsMain));

	return this.closeProperty;
}

export default PropertyDialogue;