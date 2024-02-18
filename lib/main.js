import { _, FEATURES, CREATE_IFRAME_ELEMENT, cEl4 } from './utils.js';
import TOGGLER from './snippets/TOGGLER.js';
import COLOR_GEN from './snippets/COLOR_GEN.js';
import CREATE_RANGE_COMP from './snippets/CREATE_RANGE_COMP.js';
import CREATE_INCR_INPUT from './snippets/CREATE_INCR_INPUT.js';
import CREATE_SELECT_WITH_LABEL from './snippets/CREATE_SELECT_WITH_LABEL.js';
import TabPanel from './snippets/TabPanel.js';
import { tags, attr, attrCaps } from './data.js';
import {
	FaSignInAlt,
	FaSignOutAlt,
	FaSync,
	FaTimes,
	FaPlus,
	FaMinus,
	FaCopy,
	FaMobileAlt,
	FaTabletAlt,
	FaLaptop,
	FaDesktop,
	FaCheckCircle,
	FaTrash,
	FaExchangeAlt,
	FaTextWidth,

} from './react-icons/fa/index.js';
import {
	AiOutlineColumnWidth,
	AiOutlineColumnHeight,
	AiOutlineHistory,
	AiFillEye,
	AiOutlineLineHeight,
	AiOutlineGlobal,

} from './react-icons/ai/index.js';
import { BsArrowBarDown } from './react-icons/bs/index.js';


iframe.src = '/frame.html';
let iframeLoaded = false;

let style, classes, classesArray, ids;

const viewIcons = {
	'All': AiFillEye({ width: '1.5em' }),
	'576': FaMobileAlt({ width: '1.5em', style: '-webkit-transform: rotate(-90deg); transform: rotate(-90deg)' }),
	'768': FaTabletAlt({ width: '1.5em' }),
	'996': FaLaptop({ width: '1.5em' }),
	'1200': FaDesktop({ width: '1.5em' }),
	'1400': FaDesktop({ width: '1.5em' })
};

async function addExistingCssRules() {
	let head = iframeDoc.head;

	iter(currentFile.externalLinks, link => {
		if (link.includes('.css')) {
			head.append(el('link', { href: link, rel: 'stylesheet' })[0]);
		} else {
			head.append(el('script', { src: link })[0]);
		}
	});

	style = el('link', { href: '/user_style.css', rel: 'stylesheet' })[0];

	head.append(style);

	// Remove any rule without property(ies)
	currentFile.cssRules = currentFile.cssRules.flatMap(rule => Object.keys(rule.ruleProperties).length ? [rule] : []);

	style.onload = function() {
		style = style.sheet;

		iter(currentFile.cssRules, function(each) {
			let mystyle;

			iter(Object.values(style.cssRules), function(ruleGroup) {
				if (ruleGroup.conditionText && ruleGroup.conditionText.match(new RegExp(each.view))) {
					mystyle = ruleGroup;
					return;
				}
			});

			mystyle = mystyle || style;

			mystyle.insertRule(`${each.ruleText} {${Object.entries(each.ruleProperties).reduce((acc, cur) => (acc += cur.join(': ') + '; ', acc), '')}}`, mystyle.cssRules.length);
		});

		// TODO:
		// Add elemStates to its stylesheet on this reload()

		const extractClass = /\w\S+/; // extract classnames from css rules
		classes = new Set();

		function parseClasses(style) {
			// Check for style.cssRules in case of @keyframes etc
			style.cssRules && iter(Object.values(style.cssRules), function(each) {
				if (each.selectorText) {
					if (each.selectorText.includes(',')) {
						iter(each.selectorText.split(','), e => e.includes('.') && classes.add(e.match(extractClass)[0]));
					} else if (each.selectorText.includes(' ')) {
						iter(each.selectorText.split(','), e => e.includes(' ') && classes.add(e.match(extractClass)[0]));
					} else {
						each.selectorText.startsWith('.') && classes.add(each.selectorText.match(extractClass)[0]);
					}
				} else {
					parseClasses(each);
				}
			});
		}
		parseClasses(style);
	}
}

iframe.addEventListener("load", function() {
	/**
	 * This is used to refresh again when iframe is reloaded by other features
	 */
	if (!iframeLoaded) return;
	iframeDoc = iframe.contentDocument || iframe.contentWindow;
	projBody = iframeDoc.body;
	projBody.ref = '0';

	addExistingCssRules();

	CREATE_IFRAME_ELEMENT(projBody, project[0].children);
	_.SELECT_OBJECT(_.getElementObj('0'));

	addResponsiveCss(projBody, ACTIVE_ELEM.props);

	IframeReload.fire();
});

iframe.addEventListener("load", async function(e) {
	/**
	 * This is used to allow the first load to run, when iframe is reloaded by other features
	 */
	iframeLoaded = true;

	iframeDoc = iframe.contentDocument || iframe.contentWindow;
	stateStyle = iframeDoc.styleSheets[2];
	projBody = iframeDoc.body;
	projBody.ref = '0';

	// In case we have a problem loading iframe html, an error message would be present in its DOM making its childElementCount truthy
	// else, our iframe would just have an empty body

	if ($(projBody).children().length) {
		alert('Unknown Error! Please try refreshing the page.');

		setInterval(function() { alert('Unknown Error! Please try refreshing the page.') }, 5000);

		return;
	}

	const renderFeatures = await import('./components/renderFeatures.js');
	renderFeatures.default();

	let title = $('#page-title');
	if (title.innerWidth() < 300) {
		$('#page-title2').text(currentFile.title);
	} else {
		title.text(currentFile.title);
	}

	try {
		addExistingCssRules();

		// Render or display current project

		CREATE_IFRAME_ELEMENT(projBody, project[0].children);

		windowWidth = $('#windowWidth');
		windowHeight = $('#windowHeight');

		selectedElemWidth = $('#selectedElemWidth');
		selectedElemHeight = $('#selectedElemHeight');

		_.SELECT_OBJECT(_.getElementObj('0'));

		addResponsiveCss(projBody, ACTIVE_ELEM.props);

		_.add_Browser_View_Class(SPIDER.browser_view);
	} catch (e) {
		console.error(e.stack);
	}
}, { once: true });

let rightpane = document.querySelector('#right-pane');
let main = $('main', rightpane);

const rightPaneTabs = {
	tree() {
		cEl4(main, project);
	},
	properties() {
		if (this.propertySection) return main.append(this.propertySection);

		const propertySection = el('div', { class: 'pb-20' });

		this.propertySection = propertySection;

		main.append(propertySection);

		const colorPropsArr = [
				"accentColor", "backgroundColor", "borderBlockColor", "borderBlockEndColor", "borderBlockStartColor", "borderBottomColor", "borderColor", "borderInlineColor", "borderInlineEndColor", "borderInlineStartColor", "borderLeftColor", "borderRightColor", "borderTopColor", "caretColor", "color", "columnRuleColor", "floodColor", "lightingColor", "outlineColor", "stopColor", "textDecorationColor", "textEmphasisColor", "webkitBorderAfterColor", "webkitBorderBeforeColor", "webkitBorderEndColor", "webkitBorderStartColor", "webkitColumnRuleColor", "webkitTapHighlightColor", "webkitTextEmphasisColor", "webkitTextFillColor", "webkitTextStrokeColor"
				];

		const colorUseVal = el('select', { class: 'text-light form-select w-2/6', data: { options: colorPropsArr } }, new Option('color'));

		const colorInput = el('input', { type: 'text', class: 'form-control', placeholder: 'Enter color value' });

		const selectColor = COLOR_GEN(function(color) {
			addToPreviousColors(color);
			_.UPDATE_STYLE(colorUseVal.val(), color);
		}); // This function arg is added to input[type=color] in this component

		const previouslyUsedColors = el('div', {
			class: 'mt-1 p-1 pb-0',
			event: {
				click(e) {
					if (e.target.nodeName.toLowerCase() !== 'li') return;

					let val = e.target.title;
					colorInput.val(val);

					_.UPDATE_STYLE(colorUseVal.val(), val);

					previouslyUsedColors.children().first().before($(e.target));
				}
			}
		});

		function addToPreviousColors(value) {
			if (!value) return;

			if (previouslyUsedColors.children().length) {
				if (previouslyUsedColors.children().prop('title') == value) return;

				let newLi;

				previouslyUsedColors.children().each(function() {
					if (this.title === value) {
						newLi = this;
					}
				})

				newLi = newLi || el('li', { class: 'previouslyUsedColor', title: value, style: { backgroundColor: value } });

				previouslyUsedColors.prepend(newLi);

				previouslyUsedColors.children().length >= 13 && previouslyUsedColors.children().last().remove();

			} else {
				previouslyUsedColors.append(el('li', { class: 'previouslyUsedColor', title: value, style: { backgroundColor: value } }));
			}

			selectColor.children().first()[0].style.backgroundColor = value;
		}

		const divNextToColors = el('div', { class: 'p-1 pt-2' },
			el('div', { class: 'flex items-stretch' },
				selectColor,
				colorInput,
				colorUseVal
			),
			el('h3', { textContent: 'Recent Colors', class: 'font-semibold mt-2 px-1' }),
			el('div', { class: 'flex-ac jc-sb', style: { fontSize: '1rem' } },
				previouslyUsedColors, AiOutlineHistory({ class: 'm-1', width: '1.5em' })
			)
		);

		propertySection.append(
			el('section', { class: 'colors bg-3' }, divNextToColors)
		);

		colorInput.blur(function() {
			addToPreviousColors(this.value);

			_.UPDATE_STYLE(colorUseVal[0].value, this.value);
		});

		ElementUpdate.add(function() {
			colorInput.val(updateViewF()[colorUseVal[0].value] || '');
			selectColor.children().first()[0].style.backgroundColor = colorInput[0].value;
		});

		colorUseVal.change(function(e) {
			if (!ACTIVE_ELEM.ref) return;
			const updateView = updateViewF(),
				val = this.value;

			colorInput.val(updateView[val] || '');

			selectColor.children().first().css('backgroundColor', updateView[val]);
		});

		// Used colors
		+
		(function() {
			const section = el('section', { class: 'p-1 bg-3' }, el('h3', { textContent: 'Used Colors', class: 'font-semibold my-1 px-1' }));

			propertySection.append(section);

			const list = el('ul', {
				class: 'block overflow-auto max-h-32',
				event: {
					click(e) {
						let targ = getParentElem(e.target, 'svg', 'span');

						if (targ) {
							copyToClipboard($(targ).data().value);
							alert('Copied color to clipboard!');
						}
					}
				}
			});

			let presentProps, addedToPreviousColors, oldProps = {};

			function getList(prop) {
				list.empty();

				for (let li of prop) {
					!addedToPreviousColors && addToPreviousColors(li);

					list.append(
						el('li', { class: 'show-on-hover p-1 flex-ajsb' },
							el('div', { class: 'flex-ac' },
								el('div', { class: 'w-4 h-4 mr-1', style: { backgroundColor: li } }),
								elT('span', li)
							),
							el('span', { class: 'show-on-hover-child' }, FaCopy({ color: 'rgb(150,150,0)', width: '1.3em', 'data-value': li }))
						)
					);
				}
			}

			const objSelect = el('select', {
				class: 'form-select w-full',
				data: { options: [] },
				event: {
					change() {
						getList(presentProps[this.value]);
					}
				}
			});

			section.append(objSelect, list);

			function getPresentColorProps(proj, colorProps = {}) {
				function add(proj) {
					for (let prop in proj) {
						if (prop[0] !== ':' && !colorPropsArr.includes(prop)) continue;

						if (prop[0] === ':') { // Element state
							add(proj[prop]);
						} else {
							if (colorProps[prop]) {
								colorProps[prop].add(proj[prop]);
							} else {
								colorProps[prop] = new Set([proj[prop]]);
							}
						}
					}
				}

				iter(proj, key => {
					add(key.props.style);

					for (let obj in key.props.responsive) {
						if (!Object.keys(key.props.responsive[obj]).length) continue;

						// obj = (e.g 'mobile-view3')
						add(key.props.responsive[obj]);
					}

					if (key.children.length) getPresentColorProps(key.children, colorProps);
				});

				return colorProps;
			}

			function getColors() {
				presentProps = getPresentColorProps(project);

				let changed = false;

				// Check property differences in newly found colors properties
				for (let prop in presentProps) {
					if (!oldProps[prop]) {
						changed = true;
						break;
					}
				}

				// Check property differences in old colors properties
				if (!changed) {
					for (let prop in oldProps) {
						if (!presentProps[prop]) {
							changed = true;
							break;
						}
					}
				}

				if (!changed) { // If properties didn't change
					for (let prop in oldProps) { // check if any of the values in each properties changed
						iter(oldProps[prop], function(val) {
							changed = presentProps[prop].has(val);
						});
					}
				}

				if (changed) { // update the old state
					oldProps = {};
					for (let prop in presentProps) {
						oldProps[prop] = style[prop];
					}
				}

				if (!changed) return;

				let colorUse = colorUseVal.val();
				objSelect.data('options', Object.keys(presentProps));
				objSelect.data('selected', colorUse);

				if (!objSelect.children().length) objSelect.append(new Option(colorUse));

				getList(presentProps[colorUse] || presentProps[objSelect[0].value]);

				addedToPreviousColors = true;
			}

			ElementUpdate.add(getColors);
		})()

		const optionsArr = ['px', 'vw', 'vh', 'em', 'rem', '%', 'vmax', 'ch', 'cm', 'pc', 'ex', 'fr', 'in', 'vmin', 'mm', 'pt'];

		const scrollOptions = ['auto', 'visible', 'hidden', 'scroll', 'initial', 'inherit'];

		function RangeComp(prop, ico, state) {
			let value = state[replaceHyphens(prop)];
			value = value && value.value || '';

			const input = el('input', {
				class: 'form-control2 w-1/2',
				value: value && parseFloat(value),
				placeholder: '5px',
				event: {
					change() {
						let val = this.value;

						let unitPresent = val.match(/[a-z%]+$/);
						unitPresent = unitPresent && optionsArr.find(unit => unit == unitPresent[0]);

						_.UPDATE_STYLE(prop, unitPresent ? val : $.trim(val) ? parseFloat(val) + select[0].value : '');
					}
				}
			});

			value = value && value.match(/[a-z%]+$/)[0];

			const select = el('select', {
				class: 'form-select w-5/12',
				data: { options: optionsArr },
				event: {
					change() {
						let inputVal = input[0].value;
						let val = (inputVal ? parseFloat(inputVal) : 0) + inputVal;

						input.val(inputVal ? parseFloat(inputVal) : 0);
						state[replaceHyphens(prop)].value = val;

						_.UPDATE_STYLE(prop, val);
					}
				}
			}, new Option(value || 'px'));

			return el('div', { class: 'flex-ac' }, $(ico), input, select);
		}

		function toggleOption(text, state, prop, callback, options) {
			const select = el('select', {
				class: 'form-select w-5/12',
				data: { options: options || scrollOptions },
				event: {
					change() {
						if (state[prop].value) {
							state[prop].value = this.value;
							_.UPDATE_STYLE(prop, this.value);
						}
					}
				}
			}, new Option(state[prop].value || (options || scrollOptions)[0]));

			return el('div', { class: 'flex-ajsb mb-2' },
				el('label', { class: 'flex-ac pl-3' },
					el('input', {
						type: 'checkbox',
						checked: !!state[prop].value,
						class: 'mr-2',
						event: {
							change() {
								state[prop].value = this.checked ? select[0].value : undefined;

								callback && callback();

								_.UPDATE_STYLE(prop, this.checked ? select[0].value : '');
							}
						}
					}),
					text), select
			);
		}

		function checkDiff(oldState) {
			const style = updateViewF();

			let changed = false;

			for (let prop in oldState) {
				if (style[prop] !== oldState[prop].value) {
					changed = prop;
					break;
				}
			}

			if (changed) { // update the old state
				for (let prop in oldState) {
					oldState[prop].value = style[prop];
				}
			}

			return changed;
		}

		function angleIndicator(angle) {
			return el('div', { class: ['angleIndicator', angle || 'full'] });
		}

		// Layout
		+
		(function() {
			const state1 = {
				width: {
					name: 'Width'
				},
				height: {
					name: 'Height'
				}
			};

			const state2 = {
				minWidth: {
					name: 'Min-W'
				},
				minHeight: {
					name: 'Min-H'
				},
				maxWidth: {
					name: 'Max-W'
				},
				maxHeight: {
					name: 'Max-H'
				}
			}

			const state3 = {
				overflow: {
					name: 'Scroll'
				},
				overflowX: {
					name: 'Scroll'
				},
				overflowY: {
					name: 'Scroll'
				},
				whiteSpace: {
					name: 'Wrap'
				}
			}

			const LayoutController = {
				active: 'Width',
				section: el('div', { class: 'px-1 py-2 mx-1 bg-2 mb-1' }),
				Width() {
					this.section.append(RangeComp('width', AiOutlineColumnWidth({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state1));
				},
				Height() {
					this.section.append(RangeComp('height', AiOutlineColumnHeight({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state1));
				}
			}

			const LayoutController2 = {
				active: 'Min-W',
				section: el('div', { class: 'px-1 py-2 mx-1 bg-2 mb-1' }),
				'Min-W'() {
					this.section.append(RangeComp('min-width', AiOutlineColumnWidth({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state2));
				},
				'Min-H'() {
					this.section.append(RangeComp('min-height', AiOutlineColumnHeight({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state2));
				},
				'Max-W'() {
					this.section.append(RangeComp('max-width', AiOutlineColumnWidth({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state2));
				},
				'Max-H'() {
					this.section.append(RangeComp('max-height', AiOutlineColumnHeight({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state2));
				}
			}

			const LayoutController3 = {
				active: 'Scroll',
				section: el('div', { class: 'px-1 py-2 mx-1 bg-2' }),
				Scroll() {
					const xy = toggleOption('Scroll XY-Axis', state3, 'overflow', function() {
						xyComp.children().last().toggle();

						_.UPDATE_STYLE('overflow-x', '');
						_.UPDATE_STYLE('overflow-y', '');
					});

					const xyComp = el('div', { class: 'py-2 mt-2 bg-1 relative' },
						toggleOption('Scroll X-Axis', state3, 'overflowX', function() {
							!state3.overflowY.value && _.UPDATE_STYLE('overflow-y', 'hidden');
						}),
						toggleOption('Scroll Y-Axis', state3, 'overflowY', function() {
							!state3.overflowX.value && _.UPDATE_STYLE('overflow-x', 'hidden');
						}),
						el('div', { class: 'absolute top-0 left-0 w-full h-full', style: { backgroundColor: 'rgba(31, 41, 55, 0.5)', display: state3.overflow.value ? 'block' : 'none' } })
					);

					this.section.append(xy, xyComp);
				},
				Wrap() {
					this.section.append(
						toggleOption('Wrap', state3, 'whiteSpace', undefined, ['normal', 'pre', 'nowrap', 'pre-wrap', 'pre-line', 'initial', 'inherit'])
					);
				}
			}

			const layoutTools = el('section', 0,
				el('div', { class: 'p-2 styleTabs' },
					el('div', 0,
						TOGGLER('down', {}, function() {
							layoutTools.children().last().toggle();

							if (layoutTools.data().rendered) return;

							layoutTools.data('rendered', true);

							LayoutController[LayoutController.active]();
							LayoutController2[LayoutController2.active]();
							LayoutController3[LayoutController3.active]();

							ElementUpdate.add(function() {
								let diff1, diff2, diff3;

								diff1 = checkDiff(state1);
								diff2 = checkDiff(state2);
								diff3 = checkDiff(state3);

								if (diff1 && state1[diff1].name == LayoutController.active) {
									LayoutController.section.empty();
									LayoutController[LayoutController.active]();
								}

								if (diff2 && state2[diff2].name == LayoutController2.active) {
									LayoutController2.section.empty();
									LayoutController2[LayoutController2.active]();
								}

								if (diff3 && state3[diff3].name == LayoutController3.active) {
									LayoutController3.section.empty();
									LayoutController3[LayoutController3.active]();
								}
							});
						}),
						'Layout'
					)
				),
				el('div', { style: { display: 'none' } },
					TabPanel({ // Layout Tab 1
						tabs: ['Width', 'Height'],
						tabProps: {
							class: 'grid grid-cols-2 px-1 bg-3'
						},
						section: LayoutController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: 0,
						callback: function(btn) {
							if (btn.text() == LayoutController.active) return;
							LayoutController.active = btn.text();
							LayoutController.section.empty();

							LayoutController[btn.text()]();
						}
					}),
					TabPanel({ // Layout Tab 2
						tabs: ['Min-W', 'Min-H', 'Max-W', 'Max-H'],
						tabProps: {
							class: 'grid grid-cols-4 px-1 bg-3'
						},
						section: LayoutController2.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: 0,
						callback: function(btn) {
							if (btn.text() == LayoutController2.active) return;

							LayoutController2.active = btn.text();
							LayoutController2.section.empty();

							LayoutController2[btn.text()]();
						}
					}),
					TabPanel({ // Layout Tab 3
						tabs: ['Scroll', 'Wrap'],
						tabProps: {
							class: 'grid grid-cols-2 px-1 bg-3'
						},
						section: LayoutController3.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: 0,
						callback: function(btn) {
							if (btn.text() == LayoutController3.active) return;
							LayoutController3.active = btn.text();
							LayoutController3.section.empty();

							LayoutController3[btn.text()]();
						}
					}),
				)
			);

			propertySection.append(layoutTools);
		})()

		// Spacing
		+
		(function() {
			const state1 = {
				padding: {
					name: 'All',
					parent: 'Inner Space'
				},
				paddingLeft: {
					name: 'left',
					parent: 'Inner Space'
				},
				paddingRight: {
					name: 'right',
					parent: 'Inner Space'
				},
				paddingTop: {
					name: 'top',
					parent: 'Inner Space'
				},
				paddingBottom: {
					name: 'bottom',
					parent: 'Inner Space'
				},
				margin: {
					name: 'All',
					parent: 'Outer Space'
				},
				marginLeft: {
					name: 'left',
					parent: 'Outer Space'
				},
				marginRight: {
					name: 'right',
					parent: 'Outer Space'
				},
				marginTop: {
					name: 'top',
					parent: 'Outer Space'
				},
				marginBottom: {
					name: 'bottom',
					parent: 'Outer Space'
				}
			};

			const state2 = {
				lineHeight: {
					name: 'Line Space'
				},
				wordSpacing: {
					name: 'Word Space'
				},
				letterSpacing: {
					name: 'Letter Space'
				}
			}

			const paddingOptions = [
				['', 'None'], ['0rem', 'P0'], ['0.25rem', 'P1'], ['0.5rem', 'P2'], ['0.75rem', 'P3'], ['1rem', 'P4'], ['1.25rem', 'P5'], ['1.5rem', 'P6'], ['3rem', 'P7'], ['4rem', 'P8'], ['5rem', 'P9'], ['6rem', 'P10']];

			const marginOptions = [
				['', 'None'], ['0rem', 'M0'], ['0.25rem', 'M1'], ['0.5rem', 'M2'], ['0.75rem', 'M3'], ['1rem', 'M4'], ['1.25rem', 'M5'], ['1.5rem', 'M6'], ['3rem', 'M7'], ['4rem', 'M8'], ['5rem', 'M9'], ['6rem', 'M10']];

			function component(prop, optionsArr, ico) {
				let value = state1[replaceHyphens(prop)];
				value = value && value.value || '';

				let input = el('input', {
					type: 'text',
					value,
					placeholder: '0.5rem',
					class: 'form-control2 w-1/2 my-2',
					event: {
						change() {
							_.UPDATE_STYLE(prop, this.value);
						}
					}
				});

				return el('div', 0,
					el('div', { class: 'flex-ac' },
						el('span', { class: 'mx-2 text-yellow-600' }, $(ico)),
						input,
						el('select', {
							class: 'form-select w-2/6',
							data: { ignoreFocusIn: true },
							event: {
								change() {
									let val = this.value;
									input.val(val);
									state1[replaceHyphens(prop)].value = val || undefined;

									_.UPDATE_STYLE(prop, val);
								}
							}
						}, ...optionsArr.map(option => new Option(option[1], option[0], option[0] == value, option[0] == value)))
					)
				);
			}

			const padController = {
				active: 'All',
				section: el('section', { class: 'bg-2' }),
				ico: 'All',
				AllProp: 'padding', // active = All
				leftProp: 'padding-left', // active = left
				rightProp: 'padding-right', // active = right
				topProp: 'padding-top', // active = top
				bottomProp: 'padding-bottom', // active = bottom
				run(meth, ico) {
					this.active = meth; // All, top, left, etc
					this.ico = ico;
					this.section[0].empty();

					this.section.append(component(this[meth + 'Prop'], paddingOptions, ico));
				}
			}

			const marController = {
				active: 'All',
				section: el('section', { class: 'bg-2' }),
				ico: 'All',
				AllProp: 'margin',
				leftProp: 'margin-left',
				rightProp: 'margin-right',
				topProp: 'margin-top',
				bottomProp: 'margin-bottom',
				run(meth, ico) {
					this.active = meth;
					this.ico = ico;
					this.section[0].empty();

					this.section.append(component(this[meth + 'Prop'], marginOptions, ico));
				}
			}

			const SpacingController = {
				active: 'Inner Space',
				section: el('div', { class: 'px-1 mb-1' }),
				'Inner Space'() {
					let Tab = TabPanel({
						tabs: ['All', FaSignInAlt({ style: 'transform: rotate(-90deg)', 'data-name': 'top' }), FaSignInAlt({ 'data-name': 'right' }), FaSignInAlt({ style: 'transform: rotate(90deg)', 'data-name': 'bottom' }), FaSignInAlt({ style: 'transform: rotate(180deg)', 'data-name': 'left' })],
						tabProps: {
							class: 'grid grid-cols-5 bg-2 text-yellow-600'
						},
						section: padController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-3',
						activeTab: 0,
						callback: function(btn) {
							let text = btn.children().length ? btn.children().first().data().name : btn.text();

							if (text == padController.active) return;
							padController.run(text, btn.html());
						}
					});

					this.section.append(Tab);

					padController.run(padController.active, padController.ico);

					$('nav', Tab).each(function() {
						let button = $(this);
						button.removeClass('bg-3');

						if (button.children().length && button.children().first().data().name) {
							button.children().first().data().name == padController.active && button.addClass('bg-3');
						} else {
							button.text() == padController.active && button.addClass('bg-3');
						}
					});
				},
				'Outer Space'() {
					let Tab = TabPanel({
						tabs: ['All', FaSignOutAlt({ style: 'transform: rotate(-90deg)', 'data-name': 'top' }), FaSignOutAlt({ 'data-name': 'right' }), FaSignOutAlt({ style: 'transform: rotate(90deg)', 'data-name': 'bottom' }), FaSignOutAlt({ style: 'transform: rotate(180deg)', 'data-name': 'left' })],
						tabProps: {
							class: 'grid grid-cols-5 bg-2 text-yellow-600'
						},
						section: marController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-3',
						activeTab: 0,
						callback: btn => {
							let text = btn.children().length ? btn.children().first().data().name : btn.text();

							if (text == marController.active) return;

							marController.run(text, btn.html());
						}
					});

					this.section.append(Tab);

					marController.run(marController.active, marController.ico);

					$('nav', Tab).each(function() {
						let button = $(this);
						button.removeClass('bg-3');

						if (button.children().length && button.children().first().data().name) {
							button.children().first().data().name == marController.active && button.addClass('bg-3');
						} else {
							button.text() == marController.active && button.addClass('bg-3');
						}
					});
				}
			}

			const TextController = {
				active: 'Line Space',
				section: el('div', { class: 'px-1 py-2 mx-1 bg-2' }),
				'Line Space'() {
					this.section.append(RangeComp('line-height', AiOutlineLineHeight({ class: 'mx-2 text-yellow-600', width: '1.6em' }), state2));
				},
				'Letter Space'() {
					this.section.append(RangeComp('letter-spacing', FaTextWidth({ class: 'mx-2 text-yellow-600', width: '1.3em' }), state2));
				},
				'Word Space'() {
					this.section.append(RangeComp('word-spacing', FaTextWidth({ class: 'mx-2 text-yellow-600', width: '1.3em' }), state2));
				}
			}

			const spacingTools = el('section', 0,
				el('div', { class: 'p-2 styleTabs' },
					el('div', 0,
						TOGGLER('down', {}, function() {
							spacingTools.children().last().toggle();

							if (spacingTools.data().rendered) return;

							spacingTools.data('rendered', true);

							SpacingController[SpacingController.active]();
							TextController[TextController.active]();

							ElementUpdate.add(function() {
								let diff1 = checkDiff(state1);
								let diff2 = checkDiff(state2);

								if (diff1) {
									let parentActive = state1[diff1].parent == SpacingController.active;

									let controller = parentActive && (SpacingController.active == 'Inner Space' ? padController : marController);

									if (controller && state1[diff1].name == controller.active) {
										SpacingController.section.empty();
										SpacingController[SpacingController.active]();
									}
								}

								if (diff2 && state2[diff2].name == TextController.active) {
									TextController.section.empty();
									TextController[TextController.active]();
								}
							});
						}),
						'Spacing'
					)
				),
				el('div', { style: { display: 'none' } },
					TabPanel({ // Spacing Tab
						tabs: ['Inner Space', 'Outer Space'],
						tabProps: {
							class: 'grid grid-cols-2 px-1 bg-3'
						},
						section: SpacingController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: 0,
						callback: btn => {
							if (btn.text() == SpacingController.active) return;

							SpacingController.active = btn.text();
							SpacingController.section.empty();

							SpacingController[btn.text()]();
						}
					}),
					TabPanel({ // Text spacing
						tabs: ['Line Space', 'Letter Space', 'Word Space'],
						tabProps: {
							class: 'grid grid-cols-3 px-1 bg-3'
						},
						section: TextController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: 0,
						callback: btn => {
							if (btn.text() == TextController.active) return;

							TextController.active = btn.text();
							TextController.section.empty();

							TextController[btn.text()]();
						}
					})
				)
			);

			propertySection.append(spacingTools);
		})()

		// Border
		+
		(function() {
			const state = {
				borderStyle: {
					name: 'Style'
				},
				borderWidth: {
					name: 'Width'
				},
				borderRadius: {
					name: 'Radius'
				},
				borderTopLeftRadius: {
					name: 'Radius'
				},
				borderTopRightRadius: {
					name: 'Radius'
				},
				borderBottomRightRadius: {
					name: 'Radius'
				},
				borderBottomLeftRadius: {
					name: 'Radius'
				},
				borderColor: {
					name: 'Color'
				}
			}

			const BorderController = {
				active: 'Style',
				section: el('div', { class: 'px-1 py-2 mx-1 bg-2' }),
				async Style() {
					let rangeAxis = await import('./snippets/RangeAxis.js');
					rangeAxis = new rangeAxis.default();

					rangeAxis.callback = function(value) {
						state.borderStyle.value = value;
						_.UPDATE_STYLE('borderStyle', value);
					}

					let comp = rangeAxis.rangeMeth({
						defaultValue: state.borderStyle.value || 'none',
						comp(arr, anglesClasses, rangeHolder, updaterFunction) {
							iter(arr, function(each, index) {
								rangeHolder.append(
									el('div', { class: 'flex-ac mb-1 mx-2' }, angleIndicator(anglesClasses[index]),
										el('select', {
											class: 'form-select w-1/2',
											data: { options: ['none', 'solid', 'dotted', 'dashed', 'groove', 'ridge', 'hidden', 'double', 'inset', 'outset', 'initial', 'inherit'] },
											event: {
												change() {
													updaterFunction(this.value, { rangeInd: index })
												}
											}
										}, new Option(each || 'none'))
									)
								);
							})
						}
					});
					this.section.empty();
					this.section.append(comp);
				},
				async Width() {
					let rangeAxis = await import('./snippets/RangeAxis.js');
					rangeAxis = new rangeAxis.default();

					let value = state.borderWidth.value || '';

					rangeAxis.callback = function(value) { _.UPDATE_STYLE('borderWidth', value) }

					let comp = rangeAxis.rangeMeth({
						defaultValue: state.borderWidth.value || '0px',
						comp(arr, anglesClasses, rangeHolder, updaterFunction) {
							iter(arr, function(each, index) {
								let input = el('input', {
									class: 'form-control2 w-1/2',
									value: each && parseFloat(each),
									placeholder: '0px',
									event: {
										change() {
											let val = this.value;

											let unitPresent = val.match(/[a-z%]+$/);
											unitPresent = unitPresent && optionsArr.find(unit => unit == unitPresent[0]);

											updaterFunction(unitPresent ? val : $.trim(val) ? parseFloat(val) + select[0].value : '', { rangeInd: index });
										}
									}
								});

								let selectValue = each && each.match(/[a-z%]+$/);
								selectValue = selectValue && selectValue[0];

								let select = el('select', {
										class: 'form-select w-2/6',
										data: { options: optionsArr },
										event: {
											change() {
												let inputVal = input[0].value;
												let val = (inputVal ? parseFloat(inputVal) : 0) + this.value;

												input.val(inputVal ? parseFloat(inputVal) : 0);
												state.borderWidth.value = val;

												updaterFunction(val, { rangeInd: index });
											}
										}
									},
									new Option(selectValue || 'px')
								);

								rangeHolder.append(
									el('div', { class: 'flex-ac pl-1 mb-1' },
										angleIndicator(anglesClasses[index]),
										input, select
									));
							})
						}
					});

					this.section.empty();
					this.section.append(comp);
				},
				Radius() {
					this.section.empty();

					let outerThis = this;

					iter([{ name: 'fullRound' }, { name: 'topLeft', value: 'TopLeft' }, { name: 'topRight', value: 'TopRight' }, { name: 'rightBottom', value: 'BottomRight' }, { name: 'leftBottom', value: 'BottomLeft' }], function(each) {
						let val = state[`border${each.name == 'fullRound' ? '' : each.value}Radius`].value || '';

						let input = el('input', {
							class: 'form-control2 w-1/2',
							value: val && parseFloat(val),
							placeholder: '0px',
							event: {
								change() {
									let val = this.value;
									let unitPresent = val.match(/[a-z%]+$/);
									unitPresent = unitPresent && optionsArr.find(unit => unit == unitPresent[0]);

									_.UPDATE_STYLE(
										`border${each.name == 'fullRound' ? '' : each.value}Radius`,
										unitPresent ? val : $.trim(val) ? parseFloat(val) + select.val() : ''
									);
								}
							}
						});

						let selectValue = val && val.match(/[a-z%]+$/);
						selectValue = selectValue && selectValue[0];

						let select = el('select', {
								class: 'form-select w-2/6',
								data: { options: optionsArr },
								event: {
									change() {
										let inputVal = input[0].value;
										input.val(inputVal ? parseFloat(inputVal) : 0);

										let value = inputVal + this.value;

										state[`border${each.name == 'fullRound' ? '' : each.value}Radius`].value = value;

										_.UPDATE_STYLE(`border${each.name == 'fullRound' ? '' : each.value}Radius`, value);
									}
								}
							},
							new Option(selectValue || 'px')
						);

						outerThis.section.append(
							el('div', { class: 'flex-ac pl-1 mb-1' },
								angleIndicator(each.name),
								input, select
							)
						);
					});
				},
				async Color() {
					let rangeAxis = await import('./snippets/RangeAxis.js');
					rangeAxis = new rangeAxis.default();

					let value = state.borderColor.value || '';

					rangeAxis.callback = function(value) { _.UPDATE_STYLE('borderColor', value) }

					let comp = rangeAxis.rangeMeth({
						defaultValue: state.borderColor.value || '#000000',
						comp(arr, anglesClasses, rangeHolder, updaterFunction) {
							iter(arr, function(each, index) {
								let col = _.COLOR_HEX_VAL(each);

								let value = el('small', { class: 'text-info ml-2', textContent: col });

								let colorSelect = COLOR_GEN(function(color) {
									value.text(color);
									state.borderColor.value = color;

									updaterFunction(color, { rangeInd: index });
								});

								colorSelect.children().first()[0].style.backgroundColor = col;

								rangeHolder.append(
									el('div', { class: 'flex-ac m-2' },
										angleIndicator(anglesClasses[index]),
										colorSelect, value
									)
								);
							})
						}
					});

					this.section.empty();
					this.section.append(comp);
				}
			}

			const borderTools = el('section', 0,
				el('div', { class: 'p-2 styleTabs' },
					el('div', 0,
						TOGGLER('down', {}, function() {
							borderTools.children().last().toggle();

							if (borderTools.data().rendered) return;

							borderTools.data('rendered', true);
							BorderController[BorderController.active]();

							ElementUpdate.add(function() {
								let diff = checkDiff(state);

								if (diff && state[diff].name == BorderController.active) {
									BorderController[BorderController.active]();
								}
							});
						}),
						'Border'
					)
				),
				el('div', { style: { display: 'none' } },
					TabPanel({
						tabs: ['Style', 'Width', 'Radius', 'Color'],
						tabProps: {
							class: 'grid grid-cols-4 px-1 bg-3'
						},
						section: BorderController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: 0,
						callback: function(btn) {
							if (btn.text() == BorderController.active) return;
							BorderController.active = btn.text();

							BorderController[btn.text()]();
						}
					})
				)
			);

			propertySection.append(borderTools);
		})()

		// Background
		+
		(function() {
			const state = {
				background: {
					active: 'URL'
				}
			}

			const state2 = []; // Keeps the value of each options (url, color, gradient) to update them on re-render

			const gradientTypes = ['linear', 'radial', 'repeating-linear', 'repeating-radial'];

			const mainValue = el('input', {
				class: 'form-control w-full mb-1',
				event: {
					change() {


						// /^(?:\s*(?:#(?:[a-fA-F\d]{3,}|[a-fA-F\d]{6})|rgba?\([^\)]*\)|\b\w+\b|[^\),]+)\s*|\burl\([^\)]*\)\s*|\b(?:linear|radial|repeating-linear|repeating-radial)\s*\([^)]*\)\s*)\s*,\s*)+$/;

						return; // TODO (*)
						let newValue = this.value.split('), ').map(val => $.trim(val));

						while (newValue.length < state2.length) state2.pop();

						_.UPDATE_STYLE('background', this.value);
					}
				}
			});

			const compsParent = el('div');

			function updateValue(ind) {
				let val = state2.reduce((acc, cur) => {
					acc += cur.value + ', ';
					return acc;
				}, '');

				val = val.slice(0, -2);
				state.background.value = val;

				mainValue.val(val);

				_.UPDATE_STYLE('background', val);
			}

			function generateComp(ind) {
				if (!state2[ind]) state2[ind] = {
					active: 'Color'
				};

				const BackgroundController = {
					active: state2[ind].active || 'Color',
					section: el('div', { class: 'px-1 py-2 bg-2' }),
					Color() {
						state2[ind].active = 'Color';
						if (state2[ind].color) {
							state2[ind].value = state2[ind].color;
							updateValue(ind);
						}

						let input = el('input', {
							class: 'form-control w-10/12',
							value: state2[ind].color || '',
							event: {
								change() {
									let val = this.value;
									state2[ind].color = val;
									state2[ind].value = val;

									colorSelect.children().first()[0].style.backgroundColor = val;

									updateValue(ind);
								}
							}
						});

						let colorSelect = COLOR_GEN(function(color) {
							state2[ind].color = color;
							state2[ind].value = color;

							input.val(color);

							updateValue(ind);
						});

						colorSelect.children().first()[0].style.backgroundColor = state2[ind].color;

						this.section.append(
							el('div', { class: 'flex-ajsb' }, input, colorSelect)
						);
					},
					URL() {
						state2[ind].active = 'URL';
						if (state2[ind].urlValue) {
							state2[ind].value = state2[ind].urlValue;
							updateValue(ind);
						}

						this.section.append(
							el('div', { class: 'flex-ac' },
								AiOutlineGlobal({ width: '1.8em', class: 'mx-2 text-yellow-600' }),
								el('input', {
									class: 'form-control flex-grow',
									value: state2[ind].url || '',
									event: {
										change() {
											let val = this.value;
											state2[ind].url = val;

											state2[ind].value = val.startsWith('url') ? val : `url('${val}')`;
											state2[ind].urlValue = state2[ind].value;
											updateValue(ind);
										}
									}
								})
							)
						);
					},
					Gradient() {
						state2[ind].active = 'Gradient';

						let grad = state2[ind].grd || 'linear-gradient(90deg, blue 0px, red 50%)';
						state2[ind].value = grad;

						updateValue(ind);

						try {
							let input, select, type, deg;

							let stops = grad.match(/deg,\s(.+)\)$/)[1];

							stops = stops.split(', ').map(s => s.split(' '));

							type = gradientTypes.find(type => grad.match(new RegExp(`^${type}-gradient`))) || 'linear';

							deg = grad.match(/\d+deg/)[0] + ', ';

							function updateValue2() {
								state2[ind].value = `${type}-gradient(${deg}${stops.map(each => $.isArray(each) ? each.join(' ') : each).join(', ')})`;

								state2[ind].grd = state2[ind].value;
								input.val(state2[ind].value);
								updateValue(ind);
							}

							input = el('input', {
								class: 'form-control w-9/12 mx-auto',
								value: grad,
								event: {
									change() {
										state2[ind].value = this.value;
										state2[ind].grd = state2[ind].value;

										_.UPDATE_STYLE('background', state2[ind].value);
									}
								}
							});

							select = el('select', {
									class: 'form-select w-5/12',
									data: { options: gradientTypes },
									event: {
										change() {
											type = this.value;

											updateValue2();
										}
									}
								},
								new Option(type)
							);

							let comp = el('div', {},
								el('div', { class: 'flex' }, input, select),
								el('div', { class: 'flex-ajsb px-1' }, el('span', { textContent: 'Deg:', class: 'text-yellow-600' }), CREATE_RANGE_COMP({
									value: parseFloat(deg)
								}, function(val) {
									deg = val + 'deg, ';

									updateValue2();
								}))
							);

							function createStop(stop, i) {
								let color = stop[0],
									stp = stop[1].match(/-?\d+/)[0],
									unit = stop[1].match(/\d(\D+)$/);

								comp.children().last().before(
									el('div', { class: 'bg-1 py-1 mb-1' },
										el('div', { class: 'flex-ac px-1 mb-2' },
											el('span', { textContent: 'color:', class: 'text-yellow-600 mr-3' }),
											COLOR_GEN(function(col) {
												color = col;

												stops[i] = color + ' ' + stp;

												updateValue2();
											}, {
												color,
												addOutput: true
											})
										),
										el('div', { class: 'flex-ajsb px-1' },
											el('span', { textContent: 'stop:', class: 'text-yellow-600' }),
											el('div', { class: 'flex-ajsb w-4/5 px-2' }, CREATE_INCR_INPUT(stp, {
												type: 'number',
												addUnit: true,
												unit: unit && unit[1] || 'px'
											}, function(val) {
												stp = val;

												stops[i] = color + ' ' + stp;

												updateValue2();
											}), ))
									));
								stp = stp + (unit && unit[1] || 'px');
							}

							comp.append(
								el('button', {
									class: 'bg-blue-800 px-3 py-1 my-2 rounded-sm',
									textContent: 'Add stop',
									event: {
										click() {
											stops.push(['blue', '0px']);
											createStop(stops[stops.length - 1], stops.length - 1);
											updateValue2();
										}
									}
								})
							);

							iter(stops, createStop);

							this.section.append(comp);
						} catch (e) {
							console.error(e)
						}
					}
				}

				let tabs = ['Color', 'URL', 'Gradient'];

				compsParent.append(
					TabPanel({ // BackgroundTab
						tabs,
						tabProps: {
							class: 'grid grid-cols-3 bg-3 mt-1'
						},
						section: BackgroundController.section,
						tabsBtnCls: ['p-1'],
						clickUpdCls: 'bg-2',
						activeTab: tabs.findIndex(tab => tab === BackgroundController.active),
						callback: function(btn) {
							if (btn.text() == BackgroundController.active) return;
							BackgroundController.active = btn.text();

							BackgroundController.section.empty();

							BackgroundController[btn.text()]();
						}
					})
				);

				BackgroundController[state2[ind].active]();
			}

			const backgroundTools = el('section', 0,
				el('div', { class: 'p-1 px-2 styleTabs flex-ajsb' },
					el('div', 0,
						TOGGLER('down', {}, function() {
							backgroundTools.children().last().toggle();

							if (backgroundTools.data().rendered) return;

							backgroundTools.data('rendered', true);
							generateComp(state2.length);

							ElementUpdate.add(function() {
								if (checkDiff(state)) {
									compsParent.empty();
									iter(state2, function(pos, ind) { generateComp(ind) });
								}
							});
						}),
						'Background'
					),
					el('div', 0,
						el('span', {
							event: {
								click() {
									if (confirm('Are you sure you want to cancel this element background process!')) {
										compsParent.empty();
										while (state2.length) state2.pop();

										mainValue.val('');
										state.background.value = undefined;

										_.UPDATE_STYLE('background', '');
										backgroundTools.data('rendered', true);

										generateComp(0);
									}
								}
							}
						}, FaTimes({ width: '2em', class: 'p-1 px-3 text-red-500' })),
						el('span', {
							event: {
								click() {
									backgroundTools.data('rendered', true);
									generateComp(state2.length);
								}
							}
						}, BsArrowBarDown({ width: '2.5em', class: 'bg-gray-800 hover:bg-gray-700 rounded-sm p-1' }))
					)
				),
				el('div', { class: 'px-1', style: { display: 'none' } },
					mainValue,
					compsParent
				)
			);

			propertySection.append(backgroundTools);
		})()
	},
	styles() {
		if (this.styleSection) return main.append(this.styleSection);

		let div = el('div', { class: 'bg-3' });
		main.append(div);

		let currentView = 'All';

		// Element styles
		+
		(function() {
			let section = el('section');
			div.append(section);

			let responsiveStyles = el('div', 0,
				el('div', { class: 'p-2 styleTabs' },
					el('div', 0,
						TOGGLER('up', {}, function() {
							responsiveStyles.children().last().toggle();
						}),
						'Element styles'
					)
				));
			section.append(responsiveStyles);

			let responsivePlayGround = el('div', { class: 'mb-2 overflow-auto', style: { maxHeight: '330px' } });

			let responsiveStylesComp = el('div', {
				class: 'px-1'
			}, responsivePlayGround);

			responsiveStyles.append(responsiveStylesComp);

			function generateStylesComp() {
				let resp = ACTIVE_ELEM.props.responsive;

				let styleObjs = [ACTIVE_ELEM.props.style, '', resp["mobile-view1"], resp["mobile-view2"], resp["mobile-view3"], resp["tablet-view1"], resp["tablet-view2"], resp["laptop-view"], resp["desktop-view1"], resp["desktop-view2"]
    ];

				function createRule(ruleName, styles, nested) {
					let parent = el('div', { style: { paddingLeft: '6px' } },
						elT('div', `${ruleName}${nested || ''} {`)
					);

					let props = '';
					for (let key in styles) {
						if (typeof styles[key] == 'string') {
							props += `${replaceCaps(key)}: ${styles[key]};<br />`;
						} else {
							// We are passing key as the third arg to createRule func

							//to indicate that this is a recalled func to render element states (e.g :hover)

							// and pass that state to the func as 'nested' above to be appended to element (e.g element:hover)

							Object.keys(styles[key]).length && parent.append(createRule('&', styles[key], key))
						}
					}

					parent.append(el('div', { innerHTML: props, style: { paddingLeft: '6px' } }));

					parent.append(elT('div', '}'));

					return parent;
				}

				responsivePlayGround.empty();

				iter(styleObjs, function(view, ind) {
					if (Object.keys(view).length) {
						responsivePlayGround.append(createRule(ind > 1 ? `@media (min-width: ${SPIDER.BrowserViewWidths[ind-1]})` : 'element', view));
					}
				});

				if (!responsivePlayGround.children().length) responsivePlayGround.append(el('div', { textContent: 'No styles. Check parent element!', class: 'p-2 bg-dark border text-center' }));
			}
			generateStylesComp();

			ElementUpdate.add(generateStylesComp);
		})();

		// Create selector rule
		+
		(function() {
			let section = el('section');
			div.append(section);

			function initStyle() {
				ids = Array.from(_.GET_ALL_IDS());
				classesArray = Array.from(classes);

				classesArray = classesArray.concat(Array.from(_.GET_ALL_CLASSES()));

				classesArray.sort((a, b) => a.localeCompare(b));
			}
			initStyle();

			// TODO: 
			// Get aria attributes from react dom
			let attributes = new Set();

			// attr variable was imported from './Object.values(.js'

			iter(Object.keys(attrCaps), e => attributes.add(e));

			// tags variable was imported from './data.js'
			iter(tags, each => typeof each != 'string' && iter(each.attr, e => attributes.add(Object.keys(e)[0])));

			attributes = Array.from(attributes);

			attributes.sort((a, b) => a.localeCompare(b));

			attributes[0] = ''; // empty option for removing attributes
			for (let i = 0; i < attributes.length; i++) {

				if (attributes[i].toLowerCase() == (attributes[i + 1] && attributes[i + 1].toLowerCase())) {
					delete attributes[i];
				}
			}

			attributes = $.grep(attributes, e => e);

			const views = el('div', { class: 'flex items-stretch mb-1' },
				el('div', { class: 'w-6 mx-1' }, $(viewIcons['All'])),
				el('div', { class: 'flex-grow' },
					el('div', { class: 'grid grid-cols-6 text-center border-l-2' },
						el('span', { textContent: 'All', class: 'cols-span-1 py-1 bg-blue-700' }),
						el('span', { textContent: '576', class: 'cols-span-1 py-1' }),
						el('span', { textContent: '768', class: 'cols-span-1 py-1' }),
						el('span', { textContent: '996', class: 'cols-span-1 py-1' }),
						el('span', { textContent: '1200', class: 'cols-span-1 py-1' }),
						el('span', { textContent: '1400', class: 'cols-span-1 py-1' })
					)
				));

			_.UPDATE_CLASS_ON_SELECT({ parent: views.children().last().children(), className: 'bg-blue-700' }, undefined, function(target) {
				views.children().first().empty();
				views.children().first().html(viewIcons[target.text()]);
				currentView = target.text();
			});

			const selectorOutputComp = el('output', { class: 'block mb-2 p-1' });

			const section2 = el('section', { class: 'p-2' }, views, selectorOutputComp);

			const pseudoClasses = [
						"", ":active", ":autofill", ":blank", ":checked", ":dir", ":disabled", ":empty", ":enabled", ":first-child", ":first-of-type", ":focus", ":focus-visible", ":focus-within", ":hover", ":indeterminate", ":invalid", ":last-child", ":lang", ":last-of-type", ":link", ":local-link", ":only-child", ":optional", ":placeholder-shown", ":read-only", ":read-write", ":required", ":scope", ":target", "target-within", ":user-invalid", ":valid", ":visited"];

			// Browser parsing for this selectors may be different from our input, so we are removing some selectors and using only the browser end result type
			// e.g nth-child(odd) is parsed as nth-child(2n+1)

			const childrenPosSelector = [
    "", ":nth-child()", ":nth-child(even)", ":nth-child(odd)", ":nth-child(2n)", ":nth-child(2n+1)", ":nth-child(3n+1)", ":nth-last-child(2)", ":nth-of-type(2)", ":nth-last-of-type(2)", ":first-of-type()", ":last-of-type()", ":only-of-type()", ":not()"];

			const pseudoElements = ['', '::after', '::before', '::first-line', '::first-letter'];

			const nestors = [
				{ name: '', format: '' }, { name: 'Direct children (">")', format: ' > ' }, { name: 'Descendants match (" ")', format: ' ' }, { name: 'Next sibling ("+")', format: ' + ' }, { name: 'Siblings and subsequent to ("~")', format: ' ~ ' }, { name: 'Add rules (", ")', format: ', ' }];

			function inputCallback(e, setValue) {
				let targ = $(e.target),
					initialValue = targ[0].value,
					finalValue, name = targ.prop('name'),
					prefix, ind = targ.data().index;

				prefix = name === 'class' ? '.' : name === 'id' ? '#' : '';

				finalValue = prefix + $.trim(initialValue);

				if (name === 'class') {
					classesArray.indexOf(initialValue) != -1 ? setValue(ind, finalValue) : setValue(ind, '');
				} else if (name === 'id') {
					ids.indexOf(initialValue) != -1 ? setValue(ind, finalValue) : setValue(ind, '');
				} else {
					setValue(ind, finalValue);
				}
			}

			let inputComp = function(e, config, setValue) {
				let datalist = el('datalist', { id: `inp${config}` });

				let inputTag = el('input', {
					class: 'mt-3 form-control2',
					placeholder: `Enter ${e}`,
					name: e,
					data: { index: 0 },
					event: {
						focus(e) {
							let array = this.name === 'class' ? classesArray : ids;

							iter(array, each => datalist.append(new Option(each)));
						},
						blur() {
							datalist.empty();
						},
						input(e) {
							inputCallback(e, setValue);
						}
					}
				});

				inputTag.attr('list', `inp${config}`);

				return el('form', { event: { submit(e) { e.preventDefault(); } } },
					inputTag, datalist);
			};

			let generatedSelector = [],
				indexes = 0,
				d;
			let comp = el('div', { class: 'rounded overflow-auto p-2 mb-2', style: { border: '1px solid rgb(40,40,40)', maxHeight: '330px' } });

			let division = function() {
				function generateNewSection(config) {

					// Inputs updates will process sectionSelector value by updating their respective indexes in selectedOutputValue array below

					// This value may change if no initial selector is present e.g id, class, which makes index 0 undefined.

					// In this case selectedOutputValue would be overwritten with a new [] value to clear out any existing nestor (e.g >, +) or pseudoClasses at >= 1 indexes

					let selectedOutputValue = [];

					let section1 = el('div', { class: 'flex jc-sb pr-1 mb-2 bg-2', style: {} });

					let sectionSelector = el('output', { class: 'p-1 my-2 flex-grow', style: { minHeight: '25px', wordBreak: 'break-all' } });
					section1.append(sectionSelector);

					let delSelector = $(FaTrash({ class: 'px-2 remove', width: '1.8em', color: 'red' }));

					delSelector.click(function() {
						if (!confirm('Delete?')) return;
						generatedSelector[config] = '';
						selectorOutputComp.val(generatedSelector.join(''));
						section1.remove();
						workspace.remove();

						if (config + 1 == indexes) { // If the removed component is the last

							$('button', main).last().toggle();
						}

						section1 = null;
						workspace = null;
					});

					// We don't want to add delete btn to the first comp, where config === 0

					section1.append(
						el('div', { class: 'col-3 flex-ac jc-fe', style: { fontSize: '0.75em' } }, config > 0 ? delSelector : '', TOGGLER('up', { type: 'chevron' }, () => workspace.toggleClass('wrap'))));
					config < 1 && (delSelector = null);

					/**
					 * All element calling the inputClass function's oninput event, must have a dataset.index
					 */

					let nestorsSelect = el('select', {
						class: 'w-1/2 form-select',
						data: { ignoreFocusIn: true },
						id: `nestor${config}`,
						event: {
							change(e) {
								try {
									let targ = $(this);
									//if (!selectedOutputValue[0] && !attrSelect.value) return this.value = '';
									if (pseudoElSelect.val()) return targ.val(''); // if pseudoElement has been added

									setValue(3, targ.val());
									pseudoElSelect.val('');
								} catch (e) {
									console.error(e.stack)
								}
							},
							blur() {
								let elem = $(this);
								let selected = elem[0].selectedOptions[0];
								elem.empty();
								elem.append(selected);
							},
							focus(e) {
								let elem = $(this);
								iter(nestors, each => elem.append(new Option(each.name, each.format)));
							}
						}
					});

					let addNestor = el('div', { class: 'flex-ajsb mt-2 mb-1' },
						el('label', { htmlFor: `nestor${config}`, textContent: 'Add nestor', class: 'p-2 pl-0 w-1/2' }), nestorsSelect
					);

					let pseudo = el('div', { class: 'py-2 mt-2' });
					let pseudoClsSelect = el('select', {
						class: 'w-1/2 form-select',
						id: `pseudoClsSelect${config}`,
						data: { index: 2, options: pseudoClasses },
						event: {
							input(e) { inputCallback(e, setValue) }
						}
					});

					let childrenPosComp = (function() {
						let datalist = el('datalist', { id: `siblpos${config}` });
						iter(childrenPosSelector, each => datalist.append(new Option(each, each)));

						let inputTag = el('input', {
							class: 'w-1/2 p-1 my-2',
							id: `siblinp${config}`,
							style: { border: 'none', borderBottom: '1px solid rgb(40,40,40)', backgroundColor: 'inherit' },
							placeholder: `:nth`,
							data: { index: 2 },
							event: {
								input(e) { inputCallback(e, setValue) }
							}
						});

						inputTag.attr('list', `siblpos${config}`);

						return el('form', {
								class: 'flex-ajsb',
								event: { submit(e) { e.preventDefault(); } }
							},
							el('label', { textContent: 'Children position', htmlFor: `siblinp${config}`, class: 'pr-3' }),
							inputTag, datalist);
					})();

					childrenPosComp.change(function(e) { pseudoClsSelect.val('') });

					let pseudoElSelect = el('select',
					{
						class: 'w-1/2 form-select',
						id: `pseudoElSelect${config}`,
						data: { index: 2, options: pseudoElements },
						event: {
							input(e) {

								// Selecting this option will clear out any existing pseudoClsClass, attribute or nestor selector leaving only tag, id, class or nestor selector

								// This option will update from index 1 upwards in the selectedOutputValue array

								// At the time of selection, no selector may have been added which will cause the below .slice() action to return undefined, so we replace undefined with a new array []

								selectedOutputValue = selectedOutputValue.slice(0, 2) || [];
								inputCallback(e, setValue);
							}
						}
					});

					// Empty the nestorsSelect value when a pseudo class is used instead
					pseudoClsSelect.change(function() {
						pseudoElSelect.val('');
						childrenPosComp.val('');
					});

					// Empty the nestorsSelect value when a pseudo element is used instead
					pseudoElSelect.change(function() {
						nestorsSelect.val('');
						pseudoClsSelect.val('');
					});

					let pseudoElSelectComp = el('div', 0,
						el('label', { textContent: 'Pseudo element', class: 'py-1 flex-ajsb', htmlFor: `pseudoElSelect${config}` },
							pseudoElSelect)
					);

					pseudo.append(
						el('div', 0,
							el('label', { textContent: 'Pseudo class', class: 'py-1 flex-ajsb', htmlFor: `pseudoClsSelect${config}` },
								pseudoClsSelect)
						),
						childrenPosComp,
						pseudoElSelectComp
					);

					let toggleMatchUseCase = el('span', {
						title: 'Toggle attribute value matching feature',
						role: 'radio',
						class: 'radio mr-2',
						ariaChecked: 'true',
						event: {
							click(e) {
								let elem = $(this);
								elem.toggleClass('toggleRadio');
								let status = elem.attr('ariaChecked') === 'true' ? 'false' : 'true';
								let onOff = elem.attr('ariaChecked') === 'true' ? 'off' : 'on';
								elem.attr('ariaChecked', status);
								elem.attr('checked', status);
								elem.val(onOff);
								if (status === 'true') {
									matchSelectComp.prop('disabled', false);
									attrsInput.prop('disabled', false);
								} else {
									if (attrSelect.val()) {
										setValue(1, `[${attrSelect.val()}]`);
									}

									matchSelectComp.prop('disabled', true);
									attrsInput.prop('disabled', true);
								}
							}
						}
					});
					Object.defineProperties(toggleMatchUseCase, {
						value: { value: 'true', writable: true },
						defaultChecked: { value: 'true' },
						checked: { value: 'on', writable: true }
					});

					let datalistAttr = el('datalist', { id: `attrsInput${config}` });

					iter(attributes, each => datalistAttr.append(new Option(each, each)));

					let attrSelect = el('input', {
						class: 'w-1/2 p-1 my-2',
						id: `attrsInputTag${config}`,
						style: { border: 'none', borderBottom: '1px solid rgb(40,40,40)', backgroundColor: 'inherit' },
						placeholder: 'method',
						data: { index: 2 },
						event: {
							change() {
								let val = this.value;
								if (val === '') return setValue(1, '');
								let useStatus = toggleMatchUseCase.prop('ariaChecked') === 'true' ? true : false;
								useStatus ? setValue(1, `[${val}${matchSelectComp.val()}="${attrsInput.val()}"]`) : setValue(1, `[${val}${matchSelectComp.val()}]`);
								pseudoElSelect.val('');
							},
							blur() {
								datalistAttr.empty();
							},
							focus(e) { iter(attributes, each => datalistAttr.append(new Option(each, each))) }
						}
					});
					attrSelect.attr('list', `attrsInput${config}`);

					let attrsInput = el('input',
					{
						type: 'text',
						class: 'cols-span-1 form-control',
						event: {
							input() {
								let val = attrSelect.val();
								let thisVal = this.value;
								if (thisVal.includes('"') && !thisVal.includes("'")) {
									setValue(1, `[${val}${matchSelectComp.val()}='${thisVal}']`);
								} else if (thisVal.includes('"') && thisVal.includes("'")) {
									setValue(1, `[${val}${matchSelectComp.val()}=${thisVal}]`);
								} else {
									setValue(1, `[${val}${matchSelectComp.val()}="${thisVal}"]`);
								}
							}
						}
					});

					let matchSelectComp = el('select', {
						class: 'cols-span-1 mr-1 form-select',
						data: { ignoreFocusIn: true },
						event: {
							change() {
								let val = attrSelect.val();
								if (!val || !attrsInput.val()) return;
								setValue(1, `[${val}${this.value}="${attrsInput.val()}"]`);
							}
						}
					});

					iter([
						{ text: 'Exact match', format: '' }, { text: 'Contains', format: '*' }, { text: 'Starts with', format: '^' }, { text: 'Ends with', format: '$' }, { text: 'Match or preceed "-"', format: '|' }
      ], each => matchSelectComp.append(new Option(each.text, each.format)));

					let attrMatchComp = el('div', { class: 'grid grid-cols-2' },
						matchSelectComp, attrsInput);

					let attrComp = el('div', { class: 'p-2 pt-0 pb-1 mb-3', style: { marginLeft: '-0.5rem', marginRight: '-0.5rem' } },
						el('div', { class: 'flex-ajsb py-2' },
							el('div', { class: 'flex-ac' },
								toggleMatchUseCase,
								el('label', { textContent: 'Attributes', htmlFor: `attrSelect${config}` })),
							attrSelect, datalistAttr),
						attrMatchComp
					);

					function setValue(index, val) {
						selectedOutputValue[index] = val;
						let finalVal = selectedOutputValue.join('');

						generatedSelector[config] = finalVal;
						selectorOutputComp.val(generatedSelector.join(''));
						sectionSelector.val(finalVal);
					}

					let nextSelector = el('button', {
						type: 'button',
						class: 'bg-blue-800 text-gray-100 px-3 py-1 my-2 rounded-sm',
						textContent: 'Next selector'
					});

					nextSelector.click(function() {
						if (!selectedOutputValue.length) return alert('Please add a nextable selector!');

						let d = generateNewSection(indexes++);
						comp.append(d[0], d[1]);

						nextSelector.toggle();
					});

					let selectIdClassOrTag = el('select', { class: 'w-1/2 form-select', id: `selectors${config}`, data: { options: ['id', 'class', 'tag'] } }, new Option('id'));

					// Render id selector at first
					let selectedSelector = el('div', 0, inputComp('id', config, setValue));

					let workspace = el('div', { class: 'mb-3' },
						el('div', { class: 'flex-ajsb' },
							el('label', { textContent: 'Selector type:', htmlFor: `selectors${config}` }), selectIdClassOrTag),
						el('div', 0, selectedSelector, addNestor, pseudo, attrComp, nextSelector)
					);

					// Selector type change
					selectIdClassOrTag.change(function(e) {
						let val = this.value;
						if (val != 'tag') {
							// for class and id
							selectedSelector.empty();
							selectedSelector.append(inputComp(val, config, setValue));
						} else {
							// for tag
							let myTags = tags.map(each => each.name || each).concat(['*']).sort((a, b) => a.localeCompare(b));
							let tagsOptions = el('select', {
								class: 'ml-2 flex-grow border-0 form-select',
								id: `${config}tags`,
								data: { index: 0, options: myTags },
								style: { backgroundColor: 'inherit', outline: 'none' },
								event: {
									input: (e) => inputCallback(e, setValue)
								}
							}, new Option(myTags[0]));

							let tag = el('div', { class: 'flex-ac mt-3' }, el('label', { textContent: 'Tag', htmlFor: `${config}tags` }), tagsOptions);

							setValue(0, '*');

							selectedSelector.empty();
							selectedSelector.append(tag);
						}
					});
					return [section1, workspace];
				}

				d = generateNewSection(indexes++);
				comp.append(d[0], d[1]);

				return comp;
			}

			let divisionComp = division();
			section2.append(divisionComp);

			function refreshClassesAndIds() {
				let refr = $(this);
				refr.addClass('spin');
				initStyle();
				setTimeout(() => refr.removeClass('spin'), 500);
			}

			// Cancel the selector ongoing rule process
			function cancel() {
				if (confirm('Cancel generated selector rule')) {
					selectorOutputComp.val('');
					for (let span of divisionComp[0].getElementsByTagName('span')) {
						if (span.dataset.name === 'clearMemBtn') span.click();
					}
					comp.empty();

					indexes = 0;
					generatedSelector = [];
					division();
				}
			}

			let refresh = $(FaSync({ title: 'Refresh class names and ids.', width: '1.3em', color: 'orange' }));

			refresh.click(refreshClassesAndIds);

			// cancel callback function (ruleWorkspace[2]) is returned from ruleWorkspace because we need access to that scope to cancel the ongoing process, internally

			let cancelIcon = $(FaTimes({
				class: 'px-3',
				title: 'Reset',
				width: '1.6em',
				color: 'red'
			}));

			cancelIcon.click(cancel);

			let done = $(FaCheckCircle({ width: '1.5em', title: 'Create', color: 'green' }));

			done.click(function() {
				if (!confirm('Create selector rule.')) return;
				let newRule = $.trim(selectorOutputComp.text());

				if (!newRule) return alert('Cannot create an empty selector rule!');
				let suffix = newRule[newRule.length - 2] + newRule[newRule.length - 1];
				let reject = [' >', ' > ', ' +', ' + ', ' ~', ' ~ '];

				if (reject.indexOf(suffix) != -1 || newRule.endsWith(',')) return alert('Incomplete selector rule!');
				let rules = [];

				function stripRules(sty) {
					iter(Object.values(sty.cssRules), e => !e.selectorText ? stripRules(e) : e.selectorText && rules.push(e.selectorText));
				}
				stripRules(style);

				if (rules.find(e => e === newRule) && !confirm('This rule already exist in your project.')) return;

				if ($.grep(currentFile.cssRules, r => r.ruleText == newRule && r.view == currentView).length) return alert('You cannot add same css rule more than once per view!');

				let myStyle = style;

				try {
					if (currentView == 'All') {
						myStyle.insertRule(`${newRule} {}`, myStyle.cssRules.length);
					} else {
						for (let ruleGroup of style.cssRules) {
							if (ruleGroup.conditionText && ruleGroup.conditionText.match(new RegExp(`${currentView}`))) {
								myStyle = ruleGroup;
							}
						}
						myStyle.insertRule(`${newRule} {}`, myStyle.cssRules.length);
					}

					let parsedRule = style.cssRules[style.cssRules.length - 1].selectorText;

					if (parsedRule !== newRule) {
						if (!confirm(`Your css rule\n\n${newRule}\n\nwas parsed as\n\n${parsedRule}.\n\nDo you want to continue with this new rule?`)) return;
						newRule = parsedRule;
					}

					currentFile.cssRules.push({
						ruleText: newRule,
						ruleProperties: {},
						view: currentView
					});
				} catch (e) {
					alert(e.message.match(/[\:](.+)/)[1]);
				}
				// FEATURES.Save();
			});

			let createRule = el('div', 0,
				el('div', { class: 'p-2 pr-2 styleTabs flex-ajsb' },
					el('span', 0, TOGGLER('up', {}, function() {
							section2.toggle();
							cancelIcon.toggle();
							done.toggle();
						}),
						'Create selector rule'),
					el('span', 0, refresh, cancelIcon, done)
				),
				section2);

			section.append(createRule);
		})();

		// Custom style rules
		+
		(function() {
			let section = el('section');
			div.append(section);

			let noRulesComp = el('div', { textContent: 'No rules! Create selector rules above!', class: 'p-2 bg-2 border text-center' });

			let list = el('ul', { class: 'px-1' });

			let refreshIcon = $(FaSync({ color: 'orange', width: '1.3em' }));

			refreshIcon.click(function() {
				let refr = $(this);
				refr.addClass('spin');
				list.empty();

				renderRules();
				setTimeout(() => refr.removeClass('spin'), 500);
			});

			let existingRules = el('div', 0,
				el('div', { class: 'p-2 styleTabs flex-ajsb' },
					el('div', 0,
						TOGGLER('down', 0, function() {
							existingRules.children().last().toggle();
						}),
						'Custom style rules'
					),
					refreshIcon
				),
				el('div', { style: { display: 'none' } }, list)
			);

			section.append(existingRules);

			function getStyleMap(cssText) {
				// Extract css rule properties and values, 
				// remove whitespaces from both ends

				cssText = $.trim(cssText.match(/{(.+)}/)[1]);

				// split by ';', this also removes the ';',
				// add it back with the map meth
				return $.grep(cssText.split(';'), each => each).map(each => $.trim(each) + ';');
			}

			function filterRuleIndex(style, rule) {
				if (rule.view != 'All') {
					let ind = 0;
					for (let media of style.cssRules) {
						if (media.conditionText && media.conditionText.match(new RegExp(rule.view))) {
							for (let mediaRule of media.cssRules) {
								if (mediaRule.selectorText == rule.ruleText) {
									return {
										text: mediaRule.cssText,
										view: rule.view,
										rule: rule.ruleText,
										media: mediaRule,
										ind
									};
								}
								ind++;
							}
						}
					}
				} else {
					let ind = 0;
					for (let media of style.cssRules) {
						if (media.selectorText && media.selectorText == rule.ruleText) {
							return {
								text: media.cssText,
								view: rule.view,
								rule: rule.ruleText,
								media,
								ind
							}
						}
						ind++;
					}
				}
			}

			const ruleUtilities = {
				"delete"() {
					if (!confirm('Removing a style rule is irreversible. Do you want to continue?')) return;

					const { media, ind, rule } = this.config;

					try {
						(media.parentRule || media.parentStyleSheet).deleteRule(ind - 1);

						this.li.remove();
						this.li = null;

						currentFile.cssRules = $.grep(currentFile.cssRules, e => e.ruleText !== rule);
						!currentFile.cssRules.length && list.append(noRulesComp);

						//	FEATURES.Save();
					} catch (e) {
						console.error(e);
					}
				},
				edit() {
					let liChildren = this.li.children();

					if (liChildren.last().children().length) {
						liChildren.last().toggleClass('hidden');
						liChildren.last().prev().toggleClass('hidden');
						return;
					}

					liChildren.last().toggleClass('hidden');
					liChildren.last().prev().toggleClass('hidden');

					iter(getStyleMap(this.config.text), each =>
						liChildren.last().append(elT('div', each)));
				}
			};

			function ListItem(config) {
				const { rule, media, view } = config;

				this.config = config;

				let list = this;

				let li = el('li', { class: 'p-1', style: { borderBottom: '1px solid #222222' } },
					el('div', { class: 'relative show-on-hover' },
						elT('span', rule),
						el('div', {
								class: 'absolute text-right top-0 w-full show-on-hover-child',
								event: {
									click: function(e) {
										let target = getParentElem(e.target, 'svg', 'li');

										if (!target || target.nodeName.toLowerCase() !== 'svg') return;
										target = $(target);

										ruleUtilities[target.data().action] && ruleUtilities[target.data().action].call(list);
									}
								}
							},
							view != 'All' && el('span', { style: { fontSize: '0.8rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' } }, viewIcons[view]) || '',
							FaTrash({ class: 'ml-2 px-2', 'data-action': 'delete', width: '1.3em', color: 'red' }),
							FaExchangeAlt({ class: 'px-1', 'data-action': 'edit', width: '1.3em', style: 'transform: rotate(90deg)' })
						)
					),
					el('div', {
							class: 'grid grid-cols-2 hidden bg-2',
							event: {
								focusout: function(e) {
									let input = e.target;
									if (!input.nodeName.toLowerCase() == 'input') return;

									let prop, val;

									if (input.placeholder == 'Property') {
										prop = $.trim(input.value);
										val = $.trim($(input).next().val());
									} else {
										prop = $.trim($(input).prev().val());
										val = $.trim(input.value);
									}

									try {
										media.styleMap.set(prop, val);
									} catch (e) {
										// There is a property but no value, remove that property
										if (prop && !val) {
											media.styleMap.delete(prop);
										}
									} finally {
										let liElement = li.children().last();

										let styleMap = getStyleMap(media.cssText);

										list.config.text = media.cssText;
										liElement.empty();

										iter(styleMap, each => liElement.append(elT('div', each)));

										let savedRuleInSPIDER = currentFile.cssRules.find(savedRule => savedRule.ruleText == rule);

										savedRuleInSPIDER.ruleProperties = styleMap.reduce((acc, each) => {
											let splitted = each.split(':');
											acc[splitted[0]] = splitted[1];
											return acc;
										}, {});
									}
								}
							}
						},
						el('input', {
							type: 'text',
							class: 'form-control2 col-span-1',
							placeholder: 'Property'
						}),
						el('input', { type: 'text', class: 'form-control2 col-span-1', placeholder: 'Value' })
					),
					el('div', { class: 'p-1 bg-2 my-1 hidden' })
				);

				this.li = li;

				return li;
			}

			function renderRules() {
				if (currentFile.cssRules.length) {
					let allRules = currentFile.cssRules.reduce((acc, rule) => (acc.push(filterRuleIndex(style, rule)), acc), []);

					iter(allRules, each => list.append(new ListItem(each)));
				} else {
					list.append(noRulesComp);
				}
			}
			renderRules();
		})();

		+
		(function() {
			let section = el('section');
			div.append(section);

			const externalStylesheets = el('div', 0,
				el('div', { class: 'p-2 styleTabs flex-ac' },
					TOGGLER('up', {}, function() { externalStylesheets.children().last().toggle() }),
					'Add external links'
				));

			section.append(externalStylesheets);

			const linksComp = el('div');

			let process = {
				'Preflight CSS': ['preflight.css'],
				'Bootstrap v3.4.1': ["https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css",
						"https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js",
						"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"],
				'Bootstrap v4.6.2': ["https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
						"https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.slim.min.js",
						"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"],
				'Bootstrap v5.2.3': ['https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
						'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'],
				'Tailwind v2.2.17': ["https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"],
				'Foundation v6.7.5': ["https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/css/foundation.min.css", 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.min.js'],
				'Bulma CSS v0.9.0': ['https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css'],
				'Bulma CSS v0.9.4': ['https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css'],
				'Animate CSS v3.7.2': ['https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'],
				'Animate CSS v4.1.1': ['https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css']
			};

			linksComp.append(CREATE_SELECT_WITH_LABEL({
				innerText: 'Select:',
				id: 'select-ext-link',
				class: 'pl-1',
				selectProps: {
					attributes: {
						class: 'form-select w-3/5',
						multiple: true,
					},
					options: ['Preflight CSS',
							'Bootstrap v3.4.1',
							'Bootstrap v4.6.2',
							'Bootstrap v5.2.3',
							'Tailwind v2.2.17',
							'Foundation v6.7.5',
							'Bulma CSS v.0.9.0',
							'Bulma CSS v0.9.4',
							'Animate CSS v3.7.2',
							'Animate CSS v4.1.1'],
					changeCallback: function() {
						let externalLinks = [];

						let bsAdded = false,
							bulmaAdded = false,
							animateAdded = false;

						for (let option of this) {
							if (option.selected) {
								if (option.value.includes('Bootstrap') && bsAdded) continue;
								if (option.value.includes('Bulma') && bulmaAdded) continue;
								if (option.value.includes('Animate') && animateAdded) continue;

								if (option.value.includes('Bootstrap')) bsAdded = true;
								if (option.value.includes('Bulma')) bulmaAdded = true;
								if (option.value.includes('Animate')) animateAdded = true;

       [].push.apply(externalLinks, process[option.value]);
							}
						}

						currentFile.externalLinks = externalLinks;

						FEATURES.Save();

						iframeDoc.location.reload();
					}
				}
			}));

			let select = $('select', linksComp);

			function updateSelect() {
				let inUSE = new Set();

				iter(currentFile.externalLinks, link => {
					for (let tech in process) {
						let toolFound = process[tech].find(tool => tool == link);
						if (toolFound) {
							inUSE.add(tech);
							break;
						}
					}
				});

				select.children().each(function() {
					this.selected = inUSE.has(this.value);
				});
			}

			updateSelect();

			IframeReload.add(updateSelect);

			externalStylesheets.append(linksComp);
		})();

		this.styleSection = div;
	},
	snippets() {
		if (this.snippetsSection) return main.append(this.snippetsSection);

		let section = el('section');
		main.append(section);

		function snippetsTab(snippet, content, opened = 'down') {
			let tab = el('div', 0,
				el('div', { class: 'p-2 styleTabs flex-ac' },
					TOGGLER(opened, {}, function() {
						tab.children().last().toggle();
					}), snippet
				));

			let playGround = el('div', { class: 'px-1 mb-2 overflow-auto', style: { display: 'none', maxHeight: '330px' } }, content);

			tab.append(playGround);
			return tab;
		}

		const snippetsList = [
			{
				name: 'Typography',
				component: undefined
				},
			{
				name: 'Navigation Bars',
				component: undefined
				},
			{
				name: 'Dropdowns',
				component: undefined
				},
			{
				name: 'Buttons',
				component: undefined
				},
			{
				name: 'Tabs',
				component: undefined
				},
			{
				name: 'Collapsibles',
				component: undefined
				},
			{
				name: 'Popups',
				component: undefined
				},
			{
				name: 'Modals',
				component: undefined
				},
			{
				name: 'Popovers',
				component: undefined
				},
			{
				name: 'Carousels',
				component: undefined
				},
			{
				name: 'Forms',
				component: undefined
				},
			{
				name: 'Alphanumeric inputs',
				component: undefined
				},
			{
				name: 'Gallery',
				component: undefined
				},
			{
				name: 'Image',
				component: undefined
				},
			{
				name: 'Audio',
				component: undefined
				},
			{
				name: 'Video',
				component: undefined
				}
			];

		$.each(snippetsList, (i, snipp) => section.append(snippetsTab(snipp.name, elT('div', 'Here'))));

		this.snippetsSection = section;
	},
	animations() {
		if (this.animationsSection) return main.append(this.animationsSection);
		
		const startProp = ['to', 'from', 'fromTo'];

		const eases = [
			'none', 'power1.in', 'power1.out', 'power1.inOut', 'power2.in', 'power2.out', 'power2.inOut', 'power3.in', 'power3.out', 'power3.inOut', 'power4.in', 'power4.out', 'power4.inOut', 'bounce.in', 'bounce.out', 'bounce.inOut', 'back.in', 'back.out', 'back.inOut', 'circ.in', 'circ.out', 'circ.inOut', 'elastic.in', 'elastic.out', 'elastic.inOut', 'expo.in', 'expo.out', 'expo.inOut', 'sine.in', 'sine.out', 'sine.inOut'];

		const animationConfig = {
			animatee: [],
			trigger: undefined,
			onComplete: undefined
		};

		const animationExamples = {
			In: ['slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown', 'slideInLeftUp', 'slideInRightUp', 'slideInLeftDown', 'slideInRightDown', 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'fadeInDown', 'fadeInLeftUp', 'fadeInRightUp', 'fadeInLeftDown', 'fadeInRightDown'],
			Out: ['slideOutLeft', 'slideOutRight', 'slideOutUp', 'slideOutDown', 'slideOutLeftUp', 'slideOutRightUp', 'slideOutLeftDown', 'slideOutRightDown', 'fadeOutLeft', 'fadeOutRight', 'fadeOutUp', 'fadeOutDown', 'fadeOutLeftUp', 'fadeOutRightUp', 'fadeOutLeftDown', 'fadeOutRightDown'],
			Others: ['custom', 'zoomInFade1', 'zoomOutFade1', 'zoomInFade2', 'zoomOutFade2']
		};

		const properties = [
			['x', {
				value: '100%',
				format: 'text',
				text: 'Move X'
			}],
			['xPercent', {
				value: '0',
				format: 'number',
				text: 'Move X (%)'
			}],
			['y', {
				value: '100%',
				format: 'text',
				text: 'Move Y'
			}],
			['yPercent', {
				value: '0',
				format: 'number',
				text: 'Move Y (%)'
			}],
			['opacity', {
				value: '0',
				format: 'number',
				text: 'Opacity'
			}],
			['rotation', {
				value: '0',
				format: 'number',
				text: 'Rotation'
			}],
			['rotationX', {
				value: '0',
				format: 'number',
				text: 'Rotation X'
			}],
			['rotationY', {
				value: '0',
				format: 'number',
				text: 'Rotation Y'
			}],
			['scale', {
				value: '0',
				format: 'number',
				text: 'Scale'
			}],
			['scaleX', {
				value: '0',
				format: 'number',
				text: 'Scale X'
			}],
			['scaleY', {
				value: '0',
				format: 'number',
				text: 'Scale Y'
			}],
			['skewX', {
				value: '0',
				format: 'number',
				text: 'Skew X'
			}],
			['skewY', {
				value: '0',
				format: 'number',
				text: 'Skew Y'
			}],
			['transformOrigin', {
				value: '0',
				format: 'number',
				text: 'transformOrigin (%)'
			}],
			['duration', {
				value: '0.5',
				format: 'number',
				text: 'Duration (secs)'
			}],
			['delay', {
				value: '0',
				format: 'number',
				text: 'Delay (secs)'
			}],
			['repeat', {
				value: '0',
				format: 'number',
				text: 'Repeat'
			}],
			['repeatDelay', {
				value: '0',
				format: 'number',
				text: 'Repeat delay'
			}],
			['ease', {
				value: 'power1.out',
				format: 'select',
				text: 'Ease',
				options: eases
			}],
			['yoyo', {
				value: 'false',
				format: 'select',
				text: 'Yoyo',
				options: ['false', 'true']
			}]
		];

		let cssProperties = Object.keys(el('div')[0].style);

		//cssProperties = cssProperties.slice(0, cssProperties.findIndex(prop => prop.startsWith('webkit')));

		//	console.log(cssProperties);

		const getInd = (function() {
			let found = {};

			return function(name) {
				if (found[name]) return found[name];
				found[name] = properties.findIndex(n => n[0] == name);

				return found[name];
			}
		})()

		function getConfig(config) {
			for (let key in config) {
				if (config[key] && typeof config[key] !== 'string') break;

				let index = getInd(key);
				let obj = properties[index][1];
				if (config[key]) obj.value = config[key];
				obj.order = index;
				config[key] = obj;
			}

			return config;
		}

		const animationExamplesConfigProto = {
			slide: {
				duration: '1.5',
				ease: 'power1.inOut'
			},
			fade: {
				opacity: '0',
				duration: '1.5',
				ease: 'power1.in'
			}
		};

		const animationExamplesConfig = {
			slideInLeft: {
				start: 'from',
				config: {
					x: '-100vw',
					proto: 'slide'
				}
			},
			slideInRight: {
				start: 'from',
				config: {
					x: '100vw',
					proto: 'slide'
				}
			},
			slideInUp: {
				start: 'from',
				config: {
					y: '-100vh',
					proto: 'slide'
				}
			},
			slideInDown: {
				start: 'from',
				config: {
					y: '100vh',
					proto: 'slide'
				}
			},
			slideInLeftUp: {
				start: 'from',
				config: {
					x: '-100vw',
					y: '-100vh',
					proto: 'slide'
				}
			},
			slideInRightUp: {
				start: 'from',
				config: {
					x: '100vw',
					y: '-100vh',
					proto: 'slide'
				}
			},
			slideInLeftDown: {
				start: 'from',
				config: {
					x: '-100vw',
					y: '100vh',
					proto: 'slide'
				}
			},
			slideInRightDown: {
				start: 'from',
				config: {
					x: '100vw',
					y: '100vh',
					proto: 'slide'
				}
			},
			fadeInLeft: {
				start: 'from',
				config: {
					x: '-100%',
					proto: 'fade'
				}
			},
			fadeInRight: {
				start: 'from',
				config: {
					x: '100%',
					proto: 'fade'
				}
			},
			fadeInUp: {
				start: 'from',
				config: {
					y: '-100%',
					proto: 'fade'
				}
			},
			fadeInDown: {
				start: 'from',
				config: {
					y: '100%',
					proto: 'fade'
				}
			},
			fadeInLeftUp: {
				start: 'from',
				config: {
					x: '-100%',
					y: '-100%',
					proto: 'fade'
				}
			},
			fadeInRightUp: {
				start: 'from',
				config: {
					x: '100%',
					y: '-100%',
					proto: 'fade'
				}
			},
			fadeInLeftDown: {
				start: 'from',
				config: {
					x: '-100%',
					y: '100%',
					proto: 'fade'
				}
			},
			fadeInRightDown: {
				start: 'from',
				config: {
					x: '100%',
					y: '100%',
					proto: 'fade'
				}
			},
			slideOutLeft: {
				start: 'to',
				config: {
					x: '-100vw',
					proto: 'slide'
				}
			},
			slideOutRight: {
				start: 'to',
				config: {
					x: '100vw',
					proto: 'slide'
				}
			},
			slideOutUp: {
				start: 'to',
				config: {
					y: '-100vh',
					proto: 'slide'
				}
			},
			slideOutDown: {
				start: 'to',
				config: {
					y: '100vh',
					proto: 'slide'
				}
			},
			slideOutLeftUp: {
				start: 'to',
				config: {
					x: '-100vw',
					y: '-100vh',
					proto: 'slide'
				}
			},
			slideOutRightUp: {
				start: 'to',
				config: {
					x: '100vw',
					y: '-100vh',
					proto: 'slide'
				}
			},
			slideOutLeftDown: {
				start: 'to',
				config: {
					x: '-100vw',
					y: '100vh',
					proto: 'slide'
				}
			},
			slideOutRightDown: {
				start: 'to',
				config: {
					x: '100vw',
					y: '100vh',
					proto: 'slide'
				}
			},
			fadeOutLeft: {
				start: 'to',
				config: {
					x: '-100%',
					proto: 'fade'
				}
			},
			fadeOutRight: {
				start: 'to',
				config: {
					x: '100%',
					proto: 'fade'
				}
			},
			fadeOutUp: {
				start: 'to',
				config: {
					y: '-100%',
					proto: 'fade'
				}
			},
			fadeOutDown: {
				start: 'to',
				config: {
					y: '100%',
					proto: 'fade'
				}
			},
			fadeOutLeftUp: {
				start: 'to',
				config: {
					x: '-100%',
					y: '-100%',
					proto: 'fade'
				}
			},
			fadeOutRightUp: {
				start: 'to',
				config: {
					x: '100%',
					y: '-100%',
					proto: 'fade'
				}
			},
			fadeOutLeftDown: {
				start: 'to',
				config: {
					x: '-100%',
					y: '100%',
					proto: 'fade'
				}
			},
			fadeOutRightDown: {
				start: 'to',
				config: {
					x: '100%',
					y: '100%',
					proto: 'fade'
				}
			},
			custom: {
				start: 'to',
				config: {}
			},
			zoomInFade1: {
				start: 'from',
				config: {
					scale: window.innerWidth / 100,
					opacity: '0'
				}
			},
			zoomOutFade1: {
				start: 'to',
				config: {
					scale: window.innerWidth / 100,
					opacity: '0'
				}
			},
			zoomInFade2: {
				start: 'from',
				config: {
					scale: '0'
				}
			},
			zoomOutFade2: {
				start: 'to',
				config: {
					scale: '0',
					opacity: '0'
				}
			}
		}

		const defaultRunConfig = getConfig({
			duration: null,
			delay: null,
			repeat: null,
			repeatDelay: null,
			ease: null,
			yoyo: null
		});

		function getElemFromId(val, obj = project, ids) {
			for (let key of obj) {
				if (key.id == val) {
					ids = key;
					break;
				} else {
					if (key.children.length) {
						let res = getElemFromId(val, key.children, ids);
						if (res) {
							ids = res;
							break;
						}
					}
				}
			}
			return ids;
		}

		// Set where to start running the animation from
		function setRun(type, animationConfig) {
			$('input', $(this).parent()).each(function() {
				$(this).prop('checked', false);
			});

			this.children().prop('checked', true);
			animationConfig.start = startProp[type];
		}
		
		const startingPoints = ['Start from current point', 'Set starting point', 'Set starting and ending point'];
		
		const startingPointComp = el('div', {
			class: 'bg-2 px-2 py-1',
			event: {
				click(e) {
					let label = getParentElem(e.target, 'label', 'div');

					if (label) {
						label = $(label);
						setRun.call(label, getTargIndex(label), animationConfig);
					}
				}
			}
		});
		
		let startingPointFlag;

		function generateStartingPointComp(active) {
			if (active == startingPointFlag) return;

			startingPointFlag = active
			startingPointComp.empty();

			$.each(startingPoints, function(i, point) {
				startingPointComp.append(
					el('label', { class: 'flex-ac py-1' },
						el('input', {
							type: 'checkbox',
							class: 'mr-2',
							checked: i == active
						}), point
					)
				);
			});
		}
		
		generateStartingPointComp(0);
		
		const controller = {
			section: el('section'),
			active: 'Traject',
			Traject() {
				if(this.start) {
					this.section.append(this.start);
					return;
				}
				
				this.start = startingPointComp;
				this.section.append(startingPointComp);
			},
			Beneficiary() {
				if(this.beneficiary) {
					this.section.append(this.beneficiary);
					return;
				}
				
				const beneficiaries = el('ul', { class: 'bg-1 p-1' });
				
				ElementUpdate.add(function() {
					beneficiaries.empty();
				});

				function addToBeneficiaries(elem) {
					beneficiaries.append(
						el('li', { class: 'flex-ajsb p-1 pr-0', textContent: elem.name },
							el('div', { class: 'flex-grow white-space' }),
							el('span', {
								class: 'w-8',
								event: {
									click() {
										$(this).parent().remove();
										animationConfig.animatee.splice(animationConfig.animatee.findIndex(e => e.id == elem.id), 1);
									}
								}
							}, FaMinus())
						)
					);
				}
				
				const comp = el('div', 0,
					el('div', { class: 'grid grid-cols-6 items-center mb-1 bg-1 p-2 pr-0' },
						el('label', { textContent: 'Beneficiary:', class: 'col-span-2', htmlFor: 'beneficiariesComp' }),
						el('input', { class: 'form-control2 col-span-3', id: 'beneficiariesComp', placeholder: 'Selected Element' }),
						el('button', {	type: 'button',
							class: 'col-span-1 h-full',
							event: {
								click() {
									let value = $.trim($(this).prev().val());
				
									if (!value) {
										if (SPIDER.copied_id) $(this).prev().val(SPIDER.copied_id);
										return;
									}
				
									let elem = getElemFromId(value);
				
									if (elem && !animationConfig.animatee.find(e => e.id == value)) {
										animationConfig.animatee.push(elem);
				
										addToBeneficiaries(elem);
									}
				
									if (!elem) { // try to see if it's a valid css selector
										let result = projBody.querySelectorAll(value);
										if (result.length) {
											result = Array.from(result).map(e => e.ref).filter(e => e);
											result = result.map(e => _.getElementObj(e));
				
											iter(result, elem => {
												// We don't want duplicates elem in animationConfig.animatee
												if (animationConfig.animatee.findIndex(e => e.id == elem.id) != -1) return;
												animationConfig.animatee.push(elem);
												addToBeneficiaries(elem);
											});
										}
									}
								}
							}
						}, FaPlus())
					),
					beneficiaries
				);
				
				this.section.append(comp);
				
				this.beneficiary = comp;
			},
			Trigger() {
				if(this.trigger) {
					this.section.append(this.trigger);
					return;
				}
				
				const triggers = [
					{ name: 'Click', action: 'click' },
					{ name: 'Visible', action: 'visible' },
					{ name: 'Hover', action: 'mouseover' }
				];
				
				const comp =	el('div', { class: 'grid grid-cols-3 items-center bg-2 p-2' },
					el('label', { textContent: 'Trigger:', class: 'col-span-1', htmlFor: '' }),
					el('select', { class: 'form-select col-span-2', multiple: true, event: {
						change() {
							animationConfig.trigger = Array.from(this.selectedOptions, a => a.value);
						}
					} }, triggers.map(e => new Option(e.name, e.action)))
				);
				
				this.section.append(comp);
				this.trigger = comp;
			}
		};
		
		const section = el('section',
			{ class: 'p-1 bg-3' });
		
		const tabPanel = TabPanel({
			tabs: ['Traject', 'Beneficiary', 'Trigger'],
			tabProps: {
				class: 'grid grid-cols-3 bg-3 mt-1'
			},
			section: controller.section,
			tabsBtnCls: ['p-1'],
			clickUpdCls: 'bg-2',
			activeTab: 0,
			callback: function(btn) {
				if (btn.text() == controller.active) return;
				controller.active = btn.text();
		
				controller.section[0].empty();
		
				controller[btn.text()]();
			}
		});
		
		controller.Traject();
		
		section.append(tabPanel);
	
		let timeline, isInline, display, run, oldAnimatee;

		function animationEnd() {
			timeline.revert();
			if (isInline) {
				$.each(animationConfig.animatee, function(i, elem) {
					if (display[i]) elem.style.display = 'initial';
				});
			}

			animationConfig.animatee = oldAnimatee;

			run.disabled = false;
			run.classList.replace('bg-gray-400', 'bg-blue-700');
		}

		ElementUpdate.add(function() {
			while (animationConfig.animatee.length) animationConfig.animatee.pop();

			animationConfig.animatee[0] = ACTIVE_ELEM;
		});

		section.append(
			el('div', { class: 'grid grid-cols-3 gap-2 mt-5 mb-2' },
				el('button', {
					class: 'bg-blue-700 py-2 text-center font-bold rounded-sm',
					textContent: 'Run',
					event: {
						click() {
							run = this;
							run.disabled = true;
							run.classList.replace('bg-blue-700', 'bg-gray-400');
				
							try {
								oldAnimatee = animationConfig.animatee;
				
								if (!animationConfig.animatee.length) animationConfig.animatee.push(ACTIVE_ELEM);
				
								// We could have proceeded without run this map, but
								// after adding a beneficiary, the user might perform some cut/copy and paste, which will alter the elem.ref, to be used below
				
								animationConfig.animatee = animationConfig.animatee.map(elem => getElemFromId(elem.id));
				
								animationConfig.animatee = animationConfig.animatee.map(elem => _.getDomElemFromElemRef(elem.ref));
				
								display = animationConfig.animatee.map(elem => elem.style.display == 'inline' || getComputedStyle(elem).display == 'inline');
				
								// Make inline element to be block, temporarily
								$.each(animationConfig.animatee, function(i, elem) {
									if (display[i]) {
										isInline = true;
										elem.style.display = 'inline-block';
									}
								});
				
								const config = Object.entries(animationConfig.config).reduce((acc, cur) => {
									if (cur[0].indexOf('repeat') != -1) {
										acc[cur[0]] = Number(cur[1].value);
									} else {
										acc[cur[0]] = cur[1].value;
									}
				
									return acc;
								}, {});
				
								// Remove fields with empty strings
								for (let key in config) {
									if (!config[key] && typeof config[key] == 'string') delete config[key];
								}
				
								timeline = gsap.timeline();
				
								timeline[animationConfig.start](
									animationConfig.animatee,
									{
										...config,
										onComplete: animationEnd
									});
							} catch (e) {
								console.error(e);
								animationEnd();
							}
						}
					}
				}),
				el('button', {
					class: 'py-2 rounded-sm font-bold active:bg-gray-500',
					textContent: 'Stop',
					event: {
						click() {
							if (!timeline) return;
							timeline.kill();

							animationEnd();
						}
					}
				}),
				el('button', {
					class: 'py-2 rounded-sm font-bold bg-green-700',
					textContent: 'Save',
					event: {
						click() {
							const animation = {
								trigger: animationConfig.trigger && animationConfig.trigger.slice(0),
								start: animationConfig.start
							};
							
							const config = Object.entries(animationConfig.config).reduce((acc, cur) => {
								if (cur[0].indexOf('repeat') != -1) {
									acc[cur[0]] = Number(cur[1].value);
								} else {
									acc[cur[0]] = cur[1].value;
								}

								return acc;
							}, {});

							// Remove fields with empty strings
							for (let key in config) {
								if (!config[key] && typeof config[key] == 'string') delete config[key];
							}
							
							animation.config = config;
							
							const dialog = new Dialogue('Save animation');
							
							dialog.newDialog(
								el('section', { class: 'bg-2 px-2 py-5' },
									el('label', { class: 'block mb-2', textContent: 'Animation name:'}),
									el('input', { type: 'text', class: 'form-control w-full', event: {
										input() {
											if(currentFile.animations.find(anim => anim.name == this.value)) {
												let elem = $(this);
												elem.addClass('invalid');
												elem.next().removeClass('hidden');
											} else {
												let elem = $(this);
												elem.removeClass('invalid');
												elem.next().addClass('hidden');
											}
											
											animation.name = this.value;
										}
									} }),
									el('small', { class: 'block my-2 text-red-400 hidden', textContent: 'Animation name already used!' })
								)
							);
							
							dialog.callback = function() {
								if(!$.trim(animation.name) || currentFile.animations.find(anim => anim.name == animation.name)) return;

								
								currentFile.animations.push(animation);
								
								iter(animationConfig.animatee, elem => currentFile.addEvent(elem.id, 'animation', animation.name));
								
								console.log(currentFile.events, currentFile);
							}
						}
					}
				})
			)
		);
		
		function extendExample(child) {
			let obj = $.extend(animationConfig, child);
			if (obj.config.proto) {
				let proto = obj.config.proto;
				delete obj.config.proto;

				obj.config = $.extend(cloneObj(getConfig(obj.config)), cloneObj(getConfig(animationExamplesConfigProto[proto])));
			}
		}

		const currentRunningExample = el('select',
			{
				class: 'form-select col-span-2',
				data: {
					options: animationExamples.Out
				},
				event: {
					change() {
						extendExample(animationExamplesConfig[this.value]);

						runConfigurationUI();
					}
				}
			},
			new Option(animationExamples.Out[0])
		);
		
		// Set animation configuration

		const defaultConfiguration = el('div',
		 {
			class: 'bg-1 p-2',
			event: {
				focusout(e) {
					let input = e.target;
					let config = $(input).data().config;

					if (defaultRunConfig[input.name] && defaultRunConfig[input.name].value == input.value || !$.trim(input.value)) {
						delete animationConfig.config[input.name];
						return;
					}

					/**
					 * We are saving the entire object to animationConfig.config because,
					 * at times, we would have to rerender the entire configuration UI,
					 * merging the defaultRunConfig with animationConfig.config
					 */
					animationConfig.config[input.name] = $.extend(config, { value: $.trim(input.value) });

					if (input.nodeName.toLowerCase() === 'select' && input.name == 'yoyo' && (!animationConfig.config.repeat || animationConfig.config.repeat.value == '0')) { // If yoyo is set, make sure there is a repeat value
						let index = properties.findIndex(e => e[0] == 'repeat');

						animationConfig.config.repeat = $.extend(properties[index][1], { value: '1', order: index });

						runConfigurationUI();
					}
				}
			}
		});

		const mainProperties = el('select', {
			multiple: true,
			class: 'form-select col-span-2',
			event: {
				change() {
					let obj = Object.values(this.selectedOptions).reduce((acc, cur) => {
						let index = properties.findIndex(e => e[0] == cur.value);
						acc[cur.value] = properties[index][1];
						acc[cur.value].order = index;

						return acc;
					}, {});

					obj = $.extend(cloneObj(defaultRunConfig), obj);

					// Remove any prop in animationConfig that is not selected here
					for (let prop in animationConfig.config) {
						if (!obj[prop]) continue;
						obj[prop].value = animationConfig.config[prop].value;
					}

					animationConfig.config = obj;

					runConfigurationUI();
				}
			}
		});

		const otherProperties = el('input', {
			type: 'text',
			class: 'form-control2 col-span-3',
			placeholder: 'Property',
			id: 'otherPropertiesAnimInput',
			event: {
				focus() {
					iter(cssProperties, prop => otherPropertiesDatalist.append(new Option(prop)));
				},
				blur() {
					otherPropertiesDatalist.empty();
				}
			}
		});

		const otherPropertiesDatalist = el('datalist', { id: 'otherPropsAnim' });

		otherProperties.attr('list', 'otherPropsAnim');

		mainProperties.append(el('optgroup', { label: 'Main' }));

		iter(properties.slice(0, 14), property => mainProperties.append(new Option(property[1].text, property[0])));

		mainProperties.append(el('optgroup', { label: 'Others' }));

		section.append(
			el('fieldset', { class: 'mb-2' },
				el('legend', { class: 'text-sm font-bold mb-1', textContent: 'Configuration' }),
				el('div',
				{ class: 'bg-2 p-2' },
					el('div', { class: 'grid grid-cols-3 gap-2 mb-2' },
						el('select', {
							class: 'form-select',
							data: {
								options: ['In', 'Out', 'Others']
							},
							event: {
								change() {
									const example = animationExamples[this.value];

									currentRunningExample.data('options', example);

									currentRunningExample.children().remove();
									currentRunningExample.append(new Option(example[0]));

									extendExample(animationExamplesConfig[example[0]]);

									generateStartingPointComp(Number(startProp.indexOf(animationExamplesConfig[example[0]].start)));
									runConfigurationUI();
								}
							}
						}, new Option('Out')),
						currentRunningExample
					),
					el('label', { class: 'grid grid-cols-3 items-center gap-2' },
						'Main:',
						mainProperties
					),
				),
				el('div', { class: 'grid grid-cols-6 items-center mb-2 bg-1 p-2 pr-0' },
					el('label', { textContent: 'Add:', class: 'col-span-2', htmlFor: 'otherPropertiesAnimInput' }),
					otherProperties,
					otherPropertiesDatalist,
					el('button', {
						type: 'button',
						class: 'col-span-1 h-full',
						event: {
							click() {
								let value = $.trim(otherProperties.val());
								if (value && cssProperties.indexOf(value) != -1 && !animationConfig.config[value]) {
									animationConfig.config[value] = {
										value: '',
										order: 0,
										text: value,
										format: 'text',
										removable: true
									};

									properties.unshift([value, animationConfig.config[value]]);

									mainProperties.append(new Option(value, value, false, true));
									runConfigurationUI()
								}
							}
						}
					}, FaPlus())
				),
				defaultConfiguration
			)
		);

		extendExample(animationExamplesConfig[currentRunningExample.val()]);

		function runConfigurationUI() {
			defaultConfiguration.empty();

			let newConfig = Object.entries($.extend(cloneObj(defaultRunConfig), animationConfig.config));

			newConfig.sort((a, b) => a[1].order - b[1].order);

			iter(newConfig, function(config) {
				let name = config[0];
				config = config[1];

				if (config.format !== 'select') {
					defaultConfiguration.append(
						el('label', { class: 'grid grid-cols-6 items-center', htmlFor: name + 'animId' },
							el('span', { class: 'text-yellow-600 col-span-3', textContent: config.text }),
							el('input', {
								type: config.format,
								class: 'form-control2 col-span-2',
								name,
								id: name + 'animId',
								value: config.value || '',
								placeholder: 'N/A',
								data: { config }
							}),
							config.removable && el('button', {
								type: 'button',
								class: 'text-center',
								event: {
									click() {
										delete animationConfig.config[name];
										$(this).parent().remove();

										let index = properties.findIndex(e => e[0] == name);

										for (let option of Object.values(mainProperties[0].options)) {
											if (option.value == name) {
												option.remove();
											}
										}

										properties.splice(index, 1);
									}
								}
							}, FaMinus()) || ''
						)
					);
				} else {
					defaultConfiguration.append(
						CREATE_SELECT_WITH_LABEL({
							innerText: config.text,
							id: name + 'animId',
							class: 'text-yellow-600',
							selectProps: {
								attributes: {
									id: name + 'animId',
									name,
									class: 'form-control w-1/2',
									data: {
										options: config.options,
										config
									}
								},
								options: [config.options[0]],
								selected: config.value,
								ignoreCallback: true
							}
						})
					);
				}
			});
		}

		runConfigurationUI();

		main.append(section);

		this.animationsSection = section;
	},
	actions() {
		if (this.actionsSection) return main.append(this.actionsSection);

		let section = el('div');
		main.append(section);


		section.append(
			el('button', {
				class: 'bg-gray-600 p-3',
				textContent: 'Click',
				event: {
					click() {
						$(ACTIVE_DOM_ELEM).addClass('slideInLeft');

					}
				}
			})
		);

		this.actionsSection = section;
	}
}

try {
	function tabClick(target) {
		let tabName = target.data().tab;
		if (main.data().tab === tabName) return;

		// Save scroll position since we are reusing the main element
		// so we can continue at the old scroll position for each tab

		main.data(main.data().tab, main.scrollTop()); // save old tab scrollTop
		let top = main.data(tabName); // old scroll position for this tab

		main[0].empty();

		main.data({
			enableDOMClick: tabName === 'tree',
			tab: tabName
		});

		try {
			rightPaneTabs[tabName] && rightPaneTabs[tabName]();
			main.scrollTop(top || 0);

		} catch (e) {
			console.error('Error: Right pane error');
			console.error(e.stack);
		}
	}

	_.UPDATE_CLASS_ON_SELECT({ parent: $('.tabs', rightpane).first(), className: 'currentTab' }, undefined, function(target) {
		if (target[0].nodeName === 'SPAN') {
			tabClick(target);
		}
	});

	rightPaneTabs.animations();

	$('#otherFeatures').click(function(e) {
		let tabs = $('.tabs', rightpane).first();

		let last = tabs.children().last();

		let targ = $(e.target);

		let spanData = {
			textContent: last.text(),
			role: 'tablist',
			tabIndex: '1',
			data: {
				tab: last.data().tab
			}
		};

		let liData = {
			class: 'p-2 mr-1 currentTab',
			textContent: targ.text(),
			role: 'tablist',
			tabIndex: '1',
			data: {
				tab: targ.data().tab
			}
		}

		tabs.children().removeClass('currentTab');
		tabClick(targ);

		targ.replaceWith(el('li', spanData));
		tabs.scrollLeft(tabs.prop('scrollWidth'));

		last.replaceWith(el('span', liData));
	});

} catch (e) {
	console.error('Error in the right pane component');
	console.error(e.stack);
}

try {
	main.focusin(function(e) {
		let targ = e.target;
		if (targ.tagName.toLowerCase() != 'select' || targ.multiple || targ.dataset.ignoreFocusIn || $(targ).data().ignoreFocusIn) return;

		targ = $(targ);

		$.each(targ.data().options, (i, opt) => opt != targ.val() && targ.append(new Option(opt)) || true);
	});

	main.focusout(function(e) {
		let targ = e.target;
		if (targ.tagName.toLowerCase() != 'select' || targ.multiple || targ.dataset.ignoreFocusIn || $(targ).data().ignoreFocusIn) return;

		targ = $(targ);

		let selected = targ[0].selectedOptions[0];

		targ.empty();
		targ.append(selected);
	});
} catch (e) {
	console.error(e);
}

const hotKeyTask = {
	ctrl: {
		x: FEATURES['Cut element'],
		c: FEATURES['Copy element'],
		v: FEATURES['Paste element'],
		z: FEATURES.Undo,
		y: FEATURES.Redo,
		e() {
			let updateView = updateViewF();
			_.UPDATE_STYLE('textAlign', updateView.textAlign && updateView.textAlign === "center" ? '' : "center");
		},
		l() {
			let updateView = updateViewF();
			_.UPDATE_STYLE('textAlign', updateView.textAlign && updateView.textAlign === "left" ? '' : "left");
		},
		r() {
			let updateView = updateViewF();
			_.UPDATE_STYLE('textAlign', updateView.textAlign && updateView.textAlign === "right" ? '' : "right");
		}
	},
	shift: {
		Delete: FEATURES["Remove Children"],
	},
	single: {
		ArrowLeft(){
			if(ACTIVE_ELEM.ref == '0') return;
			_.SELECT_OBJECT(_.getElementObj(ACTIVE_ELEM.ref, -2));
		},
		ArrowRight() {
			if(!ACTIVE_ELEM.children.length) return;
			_.SELECT_OBJECT(_.getElementObj(ACTIVE_ELEM.ref, 2));
		},
		ArrowUp() {
			let elem = _.getElementObj(ACTIVE_ELEM.ref, -1);
			if(elem.ref == ACTIVE_ELEM.ref) return;
			_.SELECT_OBJECT(elem);
		},
		ArrowDown() {
			let elem = _.getElementObj(ACTIVE_ELEM.ref, -1);
			if(elem.ref == ACTIVE_ELEM.ref) return;
			_.SELECT_OBJECT(_.getElementObj(ACTIVE_ELEM.ref, 1));
		},
		Delete: FEATURES["Remove Element"],

	}
}

function hotkeys(event) {
	let key = event.key, ctrl = event.ctrlKey, shiftKey = event.shiftKey;
	if(ctrl) {
		if(hotKeyTask.ctrl[key]) {
			event.preventDefault();
			hotKeyTask.ctrl[key]();
		}
	} else if(shiftKey) {
		if(hotKeyTask.shift[key]) {
			event.preventDefault();
			hotKeyTask.shift[key]();
		}
	} else {
		if(hotKeyTask.single[key]) {
			event.preventDefault();
			hotKeyTask.single[key]();
		}
	}
}

window.addEventListener('keydown', hotkeys);

