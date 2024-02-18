import { _ } from '../utils.js';
import { generateAttributes } from '../data.js';
import RangeAxis from '../snippets/RangeAxis.js';
import TabPanel from '../snippets/TabPanel.js';
import CREATE_RANGE_COMP from '../snippets/CREATE_RANGE_COMP.js';
import CREATE_SELECT from '../snippets/CREATE_SELECT.js';
import CLICK_DROPDOWN from '../snippets/CLICK_DROPDOWN.js';
import AttributeMod from '../snippets/attributeMod.js';

function angleIndicator(angle) {
	return el('div', { class: ['angleIndicator', angle || 'full'] });
}

export default function CreateInput() {
	this.__proto__ = new Dialogue('Input');

	const previewInput = el('input', { textContent: 'John Doe', value: 'Enter value here', style: { color: 'initial' } });

	const proxy = _.proxy(this.myContext);

	const outerThis = this;

	this.upDateContext = function(prop, value) {
		previewInput.css(prop, value);
		proxy(prop, value);
	}
	/**
	 * @returns {Element}
	 */
	this.controller = function(callback) {
		const rangeAxis = new RangeAxis();
		rangeAxis.callback = callback;

		return el('div', 0, rangeAxis.rangeMeth({ defaultValue: '0px' }));
	}
	/**
	 * @returns {Element}
	 */
	this.rangeInput = function(prop) {
		const input = el('input', {
			type: 'text',
			class: 'form-control w-50',
			event: {
				change: function() {
					outerThis.upDateContext(prop, $(this).val())
				}
			}
		});

		const range = new CREATE_RANGE_COMP({
			addUnit: true
		}, function(val) {
			input.val(val);
			outerThis.upDateContext(prop, val);
		});

		return el('div', 0, input, range);
	}
	/**
	 * @returns {Element}
	 */
	this.textOptions = function(arr, prop) {
		let options = el('div');

		let input = el('input', {
			type: 'text',
			class: 'p-1 mb-2 form-control',
			event: {
				input: function() {
					let val = $(this).val();
					outerThis.upDateContext(prop, val);

					options.children().each(function() {
						let option = $(this);
						option[option.text() === val ? 'addClass' : 'removeClass']('textPropValHoverClass');
					});
				}
			}
		});

		iter(arr, function(each) {
			options.append(el('span', {
				textContent: each,
				class: 'inl-bl py-1 px-2 m-1 textPropVal'
			}));
		});

		_.UPDATE_CLASS_ON_SELECT({ parent: options, className: 'textPropValHoverClass' }, true, function(btn) {
			let val = btn.text();
			if (previewInput[0].style[prop] == val) {
				outerThis.upDateContext(prop, '');
				input.val('');
			} else {
				outerThis.upDateContext(prop, val);
				input.val(val);
			}
		});

		return el('div', 0, input, options);
	}
	
	const mainComp = el('main', { class: 'propsFormatDiv bg-2 p-2' });
	
	let attributesContext = {
		value: 'Enter value here',
		type: 'text'
	}, oldCtx = {};
	
	const { attributesElement } = AttributeMod(attributesContext, 
	{
		attributes: generateAttributes('input')
	}, function(ctx, attrChange) {
		delete ctx.innerHTML;
		if(attrChange) {
			for(let key in oldCtx) {
				if(!ctx[key])	previewInput.removeAttr(key);
				delete oldCtx[key];
			}
			
			$.extend(oldCtx, ctx);
		}
		
		previewInput.attr(ctx);
	});
	
	mainComp.append(
		el('div', { class: 'flex-ajc mb-2', style: { minHeight: '8rem' } },
			el('div', { style: { backgroundColor: 'whitesmoke' } }, previewInput)
		),
		CLICK_DROPDOWN('Attributes', attributesElement)
	);

	const TabPanelConfig = {
		tabProps: { class: 'mt-1 bg-3 hov-outline-0' },
		clickUpdCls: 'bg-2',
		tabsBtnCls: ['p-2', 'px-3', 'border-0', 'hov-outline-0', 'bg-transparent']
	};

	const controllerClass = {
		section: el('section', { class: 'p-3' }),
		active: 'Spacing',
		textF(prop) {
			const myController = {
				section: el('section', { class: 'p-3' }),
				'Font size'() {
					this['Font sizeEl'] = outerThis.rangeInput('fontSize');
					this.section.append(this['Font sizeEl']);
				},
				'Font weight'() {
					this['Font weightEl'] = outerThis.textOptions(["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold", "bolder", "lighter"], 'fontWeight');
					this.section.append(this['Font weightEl']);
				},
				'Font style'() {
					this['Font styleEl'] = outerThis.textOptions(["normal", "italic", "oblique"], 'fontStyle');
					this.section.append(this['Font styleEl']);
				},
				'Font family'() {
					this['Font familyEl'] = outerThis.textOptions(["serif", "sans-serif", "monospace", "cursive", "fantasy"], 'fontFamily');
					this.section.append(this['Font familyEl']);
				}
			};

			const textPanel = TabPanel({
				...TabPanelConfig,
				section: myController.section,
				tabs: ['Font size', 'Font weight', 'Font style', 'Font family'],
				activeTab: 0,
				callback(tabBtn) {
					myController.section[0].empty();

					if (myController[tabBtn.text() + 'El']) {
						myController.section.append(myController[tabBtn.text()]);

						return;
					}

					myController[tabBtn.text()]();
				}
			});

			textPanel.css('margin', '-1rem');
			myController['Font size']();

			this[prop] = textPanel;
			this.section.append(this[prop]);
		},
		widH(prop) {
			this[prop] = outerThis.rangeInput(prop);
			this.section.append(this[prop]);
		},
		spacingF(prop) {
			const myController = {
				section: el('section', { class: 'p-3' }),
				'Margin'() {
					this.MarginEl = outerThis.controller(val => outerThis.upDateContext('margin', val));
					this.section.append(this.MarginEl);
				},
				'Padding'() {
					this.PaddingEl = outerThis.controller(val => outerThis.upDateContext('padding', val));
					this.section.append(this.PaddingEl);
				},
				'Letter spacing'() {
					this['Letter spacingEl'] = outerThis.rangeInput('letterSpacing');
					this.section.append(this['Letter spacingEl']);
				}
			};

			const spacingPanel = TabPanel({
				...TabPanelConfig,
				section: myController.section,
				tabs: ['Padding', 'Margin', 'Letter spacing'],
				activeTab: 0,
				callback(tabBtn) {
					myController.section[0].empty();

					if (myController[tabBtn.text() + 'El']) {
						myController.section.append(myController[tabBtn.text() + 'El']);

						return;
					}

					myController[tabBtn.text()]();
				}
			});

			spacingPanel.css('margin', '-1rem');
			myController.Padding();

			this[prop] = spacingPanel;
			this.section.append(this[prop]);
		},
		borderF(prop) {
			const myController = {
				section: el('section', { class: 'p-3' }),
				'Border width'() {
					this['Border widthEl'] = outerThis.controller(val => outerThis.upDateContext('borderWidth', val));
					this.section.append(this['Border widthEl']);
				},
				'Border style'() {
					const rangeAxis = new RangeAxis();
					rangeAxis.callback = function(value) { outerThis.upDateContext('borderStyle', value) };

					this['Border styleEl'] = rangeAxis.rangeMeth({
						defaultValue: 'none',
						comp: function(arr, anglesClasses, rangeHolder, updaterFunction) {
							iter(arr, (each, index) => {
								const style = el('div', { class: 'flex-ac mb-2 mx-2' }, angleIndicator(anglesClasses[index]));

								style.append(CREATE_SELECT({
									attributes: {
										class: 'form-control w-1/3 my-1',
										id: 'style'
									},
									options: ['none', 'solid', 'dotted', 'dashed', 'groove', 'ridge', 'hidden', 'double', 'inset', 'outset', 'initial', 'inherit'],
									selected: 'none',
									changeCallback(e) {
										updaterFunction($(e.target).val(), { rangeInd: index })
									}
								}));
								rangeHolder.append(style);
							});
						}
					});

					this.section.append(this['Border styleEl']);
				},
				'Border color'() {
					const rangeAxis = new RangeAxis();
					rangeAxis.callback = function(value) { outerThis.upDateContext('borderColor', value) };

					this['Border colorEl'] = rangeAxis.rangeMeth({
						defaultValue: '#000000',
						comp: function(arr, anglesClasses, rangeHolder, updaterFunction) {
							iter(arr, (each, index) => {
								let color = el('div', { class: 'flex-ac m-2' }, angleIndicator(anglesClasses[index]));

								let colorSelect = el('input', { type: 'color', style: { width: '2rem', height: '1.5rem' }, value: _.COLOR_HEX_VAL(each) });
								let value = el('small', { class: 'text-info ml-2', textContent: colorSelect.val() });

								colorSelect.on('input', function(e) {
									e = $(e.target).val();
									value.text(e);
									updaterFunction(e, { rangeInd: index })
								});

								color.append(colorSelect, value);
								rangeHolder.append(color);
							})
						}
					});

					this.section.append(this['Border colorEl']);
				},
				'Border radius'() {
					let radiusComp = el('div');

					iter([{ name: 'fullRound' }, { name: 'topLeft', value: 'top-left' }, { name: 'topRight', value: 'top-right' }, { name: 'rightBottom', value: 'bottom-right' }, { name: 'leftBottom', value: 'bottom-left' }], each => {
						let style = el('div', { class: 'flex-ac mb-2' }, angleIndicator(each.name));

						style.append(
							new CREATE_RANGE_COMP({ addUnit: true }, function(val) {
								if (val.match(/\b0\w+$/)) val = '';
								outerThis.upDateContext(`border${each.name == 'fullRound' ? '' : '-' + each.value}-radius`, val);
							})
						);
						radiusComp.append(style);
					});

					this['Border radiusEl'] = radiusComp;
					this.section.append(this['Border radiusEl']);
				}
			};

			const myPanel = TabPanel({
				...TabPanelConfig,
				section: myController.section,
				tabs: ['Border width', 'Border style', 'Border color', 'Border radius'],
				activeTab: 0,
				callback(tabBtn) {
					myController.section[0].empty();

					if (myController[tabBtn.text() + 'El']) {
						myController.section.append(myController[tabBtn.text() + 'El']);

						return;
					}

					myController[tabBtn.text()]();
				}
			});

			myController['Border width']();
			myPanel.css('margin', '-1rem');

			this[prop] = myPanel;
			this.section.append(this[prop]);
		},
		colorF(prop) {
			const myController = {
				section: el('section', { class: 'p-3' }),
				comp(prop) {
					let color = el('div', { class: 'flex-ac' });

					let input = el('input', {
						type: 'text',
						class: 'form-control w-1/2 mr-2',
						event: {
							change() {
								let val = $(this).val();
								value.text(val);
								outerThis.upDateContext(prop, val);
							}
						}
					});

					let colorSelect = el('input', { type: 'color', class: 'ml-2', style: { width: '2rem', height: '1.5rem' }, value: '' });

					let value = el('small', { class: 'text-info ml-2', textContent: colorSelect.val() });

					colorSelect.on('input', function(e) {
						e = $(this).val();

						input.value = e;
						value.text(e);
						outerThis.upDateContext(prop, e);
					});

					color.append(input, colorSelect, value);

					return color;
				},
				'Text color'() {
					if (this.colorEl) {
						this.section.append(this.colorEl);
					} else {
						this.colorEl = this.comp('color');
						this.section.append(this.colorEl);
					}
				},
				'Background color'() {
					if (this.bgEl) {
						this.section.append(this.bgEl);
					} else {
						this.bgEl = this.comp('backgroundColor');
						this.section.append(this.bgEl);
					}
				}
			};

			const colorPanel = TabPanel({
				...TabPanelConfig,
				section: myController.section,
				tabs: ['Text color', 'Background color'],
				activeTab: 0,
				callback(tabBtn) {
					myController.section[0].empty();
					myController[tabBtn.text()]()
				}
			});

			colorPanel.css('margin', '-1rem');
			myController['Text color']();

			this[prop] = colorPanel;
			this.section.append(this[prop]);
		}
	};

	const mainPanel = TabPanel({
		...TabPanelConfig,
		section: controllerClass.section,
		tabs: ['Text', 'Width', 'Height', 'Spacing', 'Border', 'Color'],
		activeTab: 3,
		callback(tabBtn) {
			if (tabBtn.text() == controllerClass.active) return;
			controllerClass.active = tabBtn.text();

			let prop = tabBtn.text().toLowerCase();
			controllerClass.section[0].empty();

			if (controllerClass[prop]) {
				controllerClass.section.append(controllerClass[prop]);
				return;
			}

			if (prop == 'width' || prop == 'height') {
				controllerClass.widH(prop);
			} else {
				controllerClass[prop + 'F'] && controllerClass[prop + 'F'](prop);
			}
		}
	});

	// Render the spacing component first
	controllerClass.spacingF();

	mainComp.append(
		CLICK_DROPDOWN('Styles', mainPanel, true)
	);

	this.__proto__.callback = function() {
		_.INSERT_NEW_ELEMENT({
			type: 'input',
			name: 'Input ' + previewInput.attr('type'),
			id: generateId(),
			props: {
				type: previewInput.attr('type'),
				class: [],
				innerHTML: '',
				responsive: resp(),
				style: outerThis.myContext,
				...attributesContext
			},
			cannotHaveChildren: true,
			children: []
		});
	}

	this.newDialog(mainComp);

	return this.closeProperty;
}