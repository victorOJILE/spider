import { attr, CSSPropAbbr, tw_preflight } from './data.js';
import {
	FaMobileAlt,
	FaTabletAlt,
	FaLaptop,
	FaDesktop,
	FaMousePointer,
	FaEdit,
	FaCut,
	FaCopy,
	FaPaste,
	FaClone,
	FaTrashAlt,
	FaTrash,
	FaSave,
	FaRetweet,
	FaInfoCircle,
	FaExchangeAlt
} from './react-icons/fa/index.js';
import CREATE_NEW_ELEMENT_COMP from './components/CREATE_NEW_ELEMENT_COMP.js';
import PropertyDialogue from './components/PROPERTY_DIALOGUE.js';


/**
 * Create iframe DOM tree (elements) out of project object
 * appends result to the provided parent element
 * @returns {Element}
 */
export const CREATE_IFRAME_ELEMENT = function(parent, elem) {
	for (let child of elem) {
		let newParent = el2(child.type, child.props);
		
		Object.defineProperty(newParent, 'ref', {
			value: child.ref,
			writable: true
		});
		
		if(currentFile.events[child.id]) {
			addEventsToElement(child.id, newParent);
		}
		
		parent.append(newParent);

		child.children.length && CREATE_IFRAME_ELEMENT(newParent, child.children);
	}

	return parent || '';
}

/**
 * Creates iframe DOM element from the project object without need of the parent element. 
 * You append the returned value to whatever parent of your choice
 * @param {object} obj
 * @param {Tagname} obj.type The tag name of the element
 * @returns {Element}
 */
export const cEl3 = function(obj) {
	if(obj.ref == '0') {
		if (currentFile.events[obj.id]) {
			addEventsToElement(obj.id, projBody);
		}
		
		return CREATE_IFRAME_ELEMENT(projBody, obj.children);
	}
	
	let parent = el2(obj.type, obj.props);

	Object.defineProperty(parent, 'ref', {
		value: obj.ref,
		writable: true
	});
	
		if(currentFile.events[obj.id]) {
			addEventsToElement(obj.id, parent);
		}
		
	obj.children.length && CREATE_IFRAME_ELEMENT(parent, obj.children);

	return parent || '';
}

function changeViewIcon(icon, id) {
	const currentView = $('#current-view');

	if (currentView.children().first().prop('id') !== id) {
		icon.prop('id', id);
		currentView.empty();
		currentView.append(icon);
	}
}

let mainSidebar = $('#right-pane main');
let activeElemRef = '', activeNestedIndex = 0;

const _ = {
	decimalToHexadecimal(ex) {
		let hexVal = ['A', 'B', 'C', 'D', 'E', 'F'];
		let ar = [10, 11, 12, 13, 14, 15];
		let fin = [];
		let firstVal = Math.floor(ex / 16);
		let rem = ex - (firstVal * 16);
		ar.indexOf(rem) != -1 ? fin.push(hexVal[ar.findIndex((ab) => ab === rem)]) : fin.push(rem);

		while (firstVal) {
			let nextVal = Math.floor(firstVal / 16);
			let rem2 = firstVal - (nextVal * 16);
			if (ar.indexOf(rem2) != -1) {
				let ind2 = ar.findIndex((ab) => ab === rem2);
				fin.unshift(hexVal[ind2]);
				firstVal = nextVal;
			} else {
				fin.unshift(rem2);
				firstVal = nextVal;
			}
		}
		return fin.join('').padStart(2, "0");
	},
	// add an event listener to the project iframe
	addListener(type = '', callback = Function.prototype, config) {

		projBody.addEventListener(type, callback, config);
	},
	// remove an event listener from the project iframe
	removeListener(type, callback) {
		projBody.removeEventListener(type, callback);
	},
	removeSelectedElement() {
		ACTIVE_DOM_ELEM = null;
		ACTIVE_ELEM.selected = false;
		ACTIVE_ELEM = null;
	},
	getElementObj(ref, navigate) {
		if (!ref || !ref.length) return alert('Invalid ref');
		ref = ref.split(':');
		
		let elObj, elObj1, elObj2 = project, parent = elObj2[0];
		
		try {
			for (let i = 0; i < ref.length; i++) {
				elObj = elObj2[ref[i]];
				elObj1 = elObj2;
				elObj2 = elObj2[ref[i]].children;
				
				if(navigate && i+1 != ref.length)	parent = elObj;
				
				if(navigate && i+1 == ref.length) {
					if(navigate == -2) {
						elObj = parent;
					} else if(navigate == -1) {
						elObj = elObj1[ref[i]-1] ? elObj1[ref[i]-1] : elObj1[elObj1.length -1];
					} else	if(navigate == 1) {
						elObj = elObj1[+ref[i]+1] ? elObj1[+ref[i]+1] : elObj1[0];
					} else if(navigate == 2) {
						if(elObj.children.length)	elObj = elObj.children[0];
					}
				}
			}
		} catch (e) {
		
		} finally {
			return elObj;
		}
	},
	removeObjProp(objectChildren, key = '') {
		function removeElem(arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].ref === key) {
					arr.splice(i, 1);
				} else if (arr[i].children.length) {
					removeElem(arr[i].children)
				}
			}
		}
		removeElem(objectChildren);
	},
	GET_ALL_IDS(obj = project, ids = new Set()) {
		for (let key of obj) {
			if (key.props.id) ids.add(key.props.id);
			if (key.children.length) _.GET_ALL_IDS(key.children, ids);
		}
		return ids;
	},
	GET_ALL_CLASSES(obj = project, classes = new Set()) {
		for (let key of obj) {
			if (typeof key.props.class === 'string') {
				let cls = key.props.class.split(' ');
				iter(cls, str => classes.add(str));
			} else {
				iter(key.props.class, className =>	classes.add(className));
			}

			key.children.length && _.GET_ALL_CLASSES(key.children, classes);
		}

		return classes;
	},
	add_Browser_View_Class(view) {
		SPIDER.browser_view = view;
		iframe.className = view;

		if (view == 'fluid-view') {
			changeViewIcon($(FaMobileAlt({ width: '1.4em' })), 'fluid');
		} else if (view.includes('mobile-view')) {
			changeViewIcon($(FaMobileAlt({ width: '1.4em' })), 'mobile');
		} else if (view == 'tablet-view1') {
			changeViewIcon($(FaMobileAlt({ width: '1.4em', style: 'transform: rotate(-90deg)' })), 'mobile_lsc');
		} else if (view == 'tablet-view2') {
			changeViewIcon($(FaTabletAlt({ width: '1.4em' })), 'tablet');
		} else if (view === 'laptop-view') {
			changeViewIcon($(FaLaptop({ width: '1.4em' })), 'laptop');
		} else {
			changeViewIcon($(FaDesktop({ width: '1.4em' })), 'desktop');
		}
		windowWidth.text(iframe.clientWidth);
		
		windowHeight.text(iframe.clientHeight);

		selectedElemWidth.text(parseFloat($(ACTIVE_DOM_ELEM).css('width')));
		selectedElemHeight.text(parseFloat($(ACTIVE_DOM_ELEM).css('height')));

		saveSpiderData('view', view);
	},
	RE_RENDER_DOM_SELECTORS() { // right pane dom tab
		if (ACTIVE_DOM_ELEM.ref) {
			selectedElemWidth.text($(ACTIVE_DOM_ELEM).css('width'));
			selectedElemHeight.text($(ACTIVE_DOM_ELEM).css('height'));
		} else {
			selectedElemWidth.text(0);
			selectedElemHeight.text(0);
		}
		
		activeElemRef = ACTIVE_ELEM.ref;
		activeNestedIndex = 0;
		
		if (mainSidebar.data().tab === 'tree') {
			mainSidebar.empty();
			cEl4(mainSidebar, project);
		}
	},
	UPDATE_CLASS_ON_SELECT(obj, toggle, callback) {
		
		obj.parent.click(function(e) {
			let target = $(e.target);
			
			if (!target.is(obj.parent)) {
				function getParent(elem) {
					if (!elem.parent().is(obj.parent)) {
						getParent(elem.parent());
					} else {
						target = elem;
					}
				}

				if (!target.parent().is(obj.parent)) getParent(target.parent());
				callback && callback(target);

				if (toggle && target.hasClass(obj.className)) {
					target.removeClass(obj.className);
					return;
				}

				obj.parent.children().removeClass(obj.className);

				target.addClass(obj.className);
			}
		});
	},
	COLOR_HEX_VAL(color) {
		if (color[0] == '#') return color;
		const defaultColors = ['white', 'floralwhite', 'ghostwhite', 'whitesmoke', 'azure', 'aliceblue', 'black', 'red', 'green', 'blue', 'crimson'];
		const hexDefaultColors = ['#FFFFFF', '#FFFAF0', '#F8F8FF', '#F5F5F5', '#F0FFFF', '#F0F8FF', '#000000', '#FF0000', '#008000', '#0000FF', '#DA2137'];

		let hexVal = '#',
			match = color.match(/\d+/g);
		match ? iter(match, e => hexVal += _.decimalToHexadecimal(e)) : hexVal = hexDefaultColors[defaultColors.findIndex(e => e == color)];
		return hexVal;
	},
	proxy(obj) {
		let object = obj;
		return function(prop, value) {
			if (prop) {
				if (value.trim()) {
					object[prop] = value;
				} else {
					object[prop] && (delete object[prop]);
				}
			} else {
				return object;
			}
		}
	},
	UPDATE_STYLE(inputName, value) {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
		try {
			let property = replaceSpaces(replaceHyphens(inputName));
			
			ACTIVE_DOM_ELEM.style[property] = value;

			_.proxy(updateViewF())(property, value);

			if (SPIDER.elemState) {
				// Find the rule with this selectorText in stateStyle
				if (!ACTIVE_ELEM.props.class.includes(ACTIVE_ELEM.id)) {
					ACTIVE_ELEM.props.class.push(ACTIVE_ELEM.id);
					ACTIVE_DOM_ELEM.classList.add(ACTIVE_ELEM.id);
				}

				function add(style) {
					let rule;
					
					for(let cssRule of style.cssRules) {
						if(cssRule.selectorText === '.' + ACTIVE_ELEM.id + SPIDER.elemState) {
							rule = cssRule;
							break;
						}
					}
					
					if (value) {
						rule ? rule.styleMap.set(replaceCaps(property), value) : style.insertRule(`.${ACTIVE_ELEM.id + SPIDER.elemState}{ ${replaceCaps(property)}: ${value} }`, style.cssRules.length);
					} else {
						rule && rule.styleMap.delete(replaceCaps(property));
					}
				}

				if (SPIDER.responsiveDesignActivated && SPIDER.browser_view != 'fluid-view') {
					add((function() {
						for (let ruleGroup of stateStyle.cssRules) {
							if (ruleGroup.conditionText && ruleGroup.conditionText.match(new RegExp(`${SPIDER.BrowserViewWidths[SPIDER.viewOrdered.findIndex(e => e === SPIDER.browser_view)]}`))) return ruleGroup;
						}
					})());
				} else {
					add(stateStyle);
				}
			}

			ElementUpdate.fire();

			setTimeout(() => {
				undo.addEdit(); // An Undo feature
			}, 0);
		} catch (e) {
			console.error(e.stack);
		}
	},
	UPDATE_DOM_ELEMENT() {
		if(ACTIVE_ELEM.ref == '0') {
			while	(ACTIVE_DOM_ELEM.firstChild) ACTIVE_DOM_ELEM.removeChild(ACTIVE_DOM_ELEM.firstChild);
			
			ACTIVE_DOM_ELEM.removeAttribute('style');
			
			addResponsiveCss(ACTIVE_DOM_ELEM, ACTIVE_ELEM.props);
			
			cEl3(ACTIVE_ELEM);
		} else {
			let newElem = cEl3(ACTIVE_ELEM);
			
			ACTIVE_DOM_ELEM.parentElement.replaceChild(newElem, ACTIVE_DOM_ELEM);
			ACTIVE_DOM_ELEM = newElem;
		}
		
		ElementUpdate.fire();
	},
	processProject(fileType) {
		let [myProject, styleViews] = this.processStyleToClass();

		let respSuffixes = Object.values(SPIDER.BrowserViewAbbr);
		respSuffixes.shift(); // Remove first value because it's an empty string, for 'fluid-view'

		let viewMediaQ = {};

		iter(styleViews, prop => {
			if (prop !== 'style') {
				viewMediaQ[prop] = `@media (min-width: ${SPIDER.BrowserViewWidths[SPIDER.viewOrdered.indexOf(prop)]}) {`;
			}
		});

		// Create CSS strings
		iter(styleViews, (view, arr) => {
			/* Object */
			if (view == 'style') return;
			if (arr.length) {
				arr.sort((a, b) => a.class.slice(1).localeCompare(b.class.slice(1)));
				iter(arr, rule => {
					/* Array */
					viewMediaQ[view] += `\n\t.${rule.class} {\n\t\t${replaceCaps(rule.property)}: ${rule.value}\n\t}`;
				});
			}
		});

		iter(viewMediaQ, view => viewMediaQ[view] += '\n}\n');

		let css = currentFile.externalLinks.find(link => link.endsWith('preflight.css')) ? tw_preflight : 'body { padding: 0; }\n';
		let cssSelectors = [];

  [].push.apply(cssSelectors, Array.from(_.GET_ALL_IDS(), id => '#' + id));
  [].push.apply(cssSelectors, Array.from(_.GET_ALL_CLASSES(), cls => '.' + cls));

		let stylesheets = iframeDoc.styleSheets;
		let bootstrapPresent = false;

		for (let sheet of stylesheets) {
			if (sheet.href && sheet.href.includes('bootstrap')) {
				bootstrapPresent = true;
				break;
			}
		}

		for (let sheet of stylesheets) {
			if (sheet.href && sheet.href.includes('user_style') && bootstrapPresent) continue;

			function parseSheet(sheet, media) {
				try {
					let innercss = '';
					if (media) {
						innercss += '@media ' + sheet.conditionText + ' {\n\t';
					}
					iter(sheet.cssRules, rule => {
						if (rule.selectorText) {
							iter(cssSelectors, selector => {
								if (rule.selectorText.includes(selector)) innercss += `${rule.cssText}\n\n`;
							});
						} else if (rule.constructor.name.includes('Media')) {
							parseSheet(rule, true);
						}
					});

					if (media) innercss += '\n}\n'
					if (innercss.match(/\.[A-Za-z]/)) css += innercss;
				} catch (e) {}
			}
			parseSheet(sheet);
		}

		iter(styleViews.style, key => css += `.${key.class} { ${replaceCaps(key.property)}: ${key.value};}\n\n`);

		iter(viewMediaQ, (view, text) => css += text);

		if (fileType === 'HTML') {
			let file = {
				encodingF() {
					return `<meta charset="${this.encoding}" />\n\t\t`;
				},
				Viewport() {
					let content = `width=${this.vw_width}${this.vh_height && this.vh_height != 'device-height' ? `, height=${this.vh_height}`: ''}, initial-scale=${this.ini_scale}${this?.min_scale && !this.min_scale <= '0' ? `, minimum-scale=${this.min_scale}` : ''}${this?.max_scale && this.max_scale < '10' ? `, maximum-scale=${this.max_scale}` : ''}`;
					return `<meta name="viewport" ${content} />\n\t\t`;
				},
				IE_viewF() {
					return `<meta name="http-equiv" content="${this.IE_view}" />\n\t\t`;
				},
				titleF() {
					return `<title>${this.title}</title>\n\t\t`;
				},
				descriptionF() {
					return `<meta name="description" content="${this.description}" />\n\t\t`;
				},
				"og:titleF"() {
					if (!this.enableOG) return '';
					return `<meta property="og:title" content="${this["og:title"] || this.title}" />\n\t\t`;
				},
				"og:descriptionF"() {
					if (!this.enableOG) return '';
					return `<meta property="og:description" content="${this["og:description"] || this.description}" />\n\t\t`;
				},
				"og:imageF"() {
					if (!this.enableOG) return '';
					return `<meta property="og:image" content="${this["og:image"]}" />\n\t\t`;
				},
				"fb:app_idF"() {
					if (!this.enableOG) return '';
					return `<meta property="fb:app_id" content="${this["fb:app_id"]}" />\n\t\t`;
				},
				"og:localeF"() {
					if (!this.enableOG || !this['og:locale'] || !this['og:locale'] == 'en-US') return '';
					return `<meta property="og:locale" content="${this["og:locale"]}" />\n\t\t`;
				},
				"og:urlF"() {
					if (!this.enableOG) return '';
					return `<meta property="og:url" content="${this["og:url"]}" />\n\t\t`;
				},
				"og:sitenameF"() {
					if (!this.enableOG) return '';
					return `<meta property="og:sitename" content="${this["og:sitename"]}" />\n\t\t`;
				},
				"og:typeF"() {
					if (!this.enableOG) return '';
					return `<meta property="og:type" content="${this["og:type"]}" />\n\t\t`;
				}
			}

			Object.setPrototypeOf(file, currentFile);

			let htmlFile = `<!DOCTYPE html>\n<html lang="${file.language}">\n\t<head>\n\t\t`;

			for (let key in file) {
				if (typeof file[key] == 'function') htmlFile += file[key]();
			}
			htmlFile += `<style>\n\t\t${css}\n\t\t</style>\n\t`;
			htmlFile += '</head>\n\t<body>\n\t\t';
			
			let body = cEl3(project[0]).outerHTML;

			htmlFile += `${body}\n\t</body>\n</html>`;
			// copyToClipboard(htmlFile);
			console.log(htmlFile);
		} else {
			// copyToClipboard(css);
			console.log(css);
		}
	},
	processStyleToClass() {
		const myProject = cloneObj(project);
		const styleViews = {
			style: {}
		};
		const classes = {};

		function extractStyles(obj, view) {
			iter(obj, each => {
				let style = view != 'style' ? each.props.responsive[view] : each.props.style;

				for (let key in style) {
					if (typeof style[key] == 'object' /* for elem states */ ) continue;

					if (styleViews[view][key]) {
						styleViews[view][key].push(style[key]);
					} else {
						styleViews[view][key] = [style[key]];
					}
				}

				each.children.length && extractStyles(each.children, view);
			});
		}
		extractStyles(myProject, 'style');

		for (let key in SPIDER.BrowserViewAbbr) {
			if (key === 'fluid-view') continue;
			styleViews[key] = {};

			extractStyles(myProject, key);

			if (!Object.keys(styleViews[key]).length) delete styleViews[key];
		}

		function parse(obj, view) {
			iter(obj, each => {
				let style = view == 'style' ? each.props.style : each.props.responsive[view];

				for (let key in styleViews[view]) {
					if (styleViews[view][key].length == 1) continue;

					if (!style[key]) continue;

					let cls = classes[view].find(cls => cls.property == key && cls.value == style[key] && cls.view == (view == 'style' ? undefined : view)).class;

					// classnames to be used when generating html

					!each.props.class.includes(cls) && each.props.class.push(cls);

					delete style[key];
				}

				each.children.length && parse(each.children, view);
			});
		}

		for (let view in styleViews) {
			classes[view] = [];

			for (let key in styleViews[view]) {
				if (styleViews[view][key].length == 1) continue;

				let abbr = CSSPropAbbr.find(e => Object.keys(e)[0] === replaceCaps(key));
				let prefix = abbr && Object.values(abbr)[0] || replaceCaps(key);
				/*
	     		let axis = abbr && Object.values(abbr)[0];
	     		if(axis && (axis == 'ml' || axis == 'pl')) {
	  						let ex = key.match(/(\w+)Left/)[1];
	  						if(objStyles[ex+'Right'] == objStyles[key]) axis = axis[0] + 'x';
	  					} else if(axis && (axis == 'mr' || axis == 'pr')) {
	  						let axis = abbr && Object.values(abbr)[0];
	  					if(axis && (axis == 'mr' || axis == 'pr')) {
	  						let ex = key.match(/(\w+)Right/)[1];
	  						if(objStyles[ex+'Left'] == objStyles[key]) {
	  							axis = axis[0] + 'x';
	  							delete objStyles[ex+'Left'];
	  						}
	  						}
	  					}*/

				for (let val of styleViews[view][key]) {

					let found = classes[view].find(cls => cls.property == key && cls.value == val && cls.view == (view == 'style' ? undefined : view));

					if (found) continue;

					let cssvalue = val.match(/^\w+$/);
					if (cssvalue) {
						let unitMatch = cssvalue[0].match(/\d(\w+$)/);

						if (unitMatch && ['px', 'vw', 'vh', 'em', 'rem', '%', 'vmax', 'ch', 'cm', 'pc', 'ex', 'fr', 'in', 'vmin', 'mm', 'pt'].includes(unitMatch[1])) {
							cssvalue = 'SP' + cssvalue[0].match(/\d+/)[0];
						}
					}

					let data = {
						property: key,
						value: val,
						class: `${prefix}-${cssvalue || styleViews[view][key].findIndex(e => e == val)}${view != 'style' ? '-' + SPIDER.BrowserViewAbbr[view] : ''}`
					}

					if (view != 'style') data.view = view;

					// Data to be used when generating css

					if (!classes[view]) classes[view] = [];

					classes[view].push(data);

				}
			}
			parse(myProject, view);
		}

		return [myProject, classes];
	},
	getDomElemFromElemRef(ref) {
		try {
			if (typeof ref != 'string') throw new TypeError('Invalid ref at getDomElemFromElemRef');
			
			if(projBody.ref == ref) return projBody;
			
			let ref2 = ref.split(':'),
				par = projBody,
				retrievedChild;
			ref2.shift(); // The body element (projBody) is the first (always 0)
			
			// for each of the ref numbers 
			for (let ind of ref2) {
				retrievedChild = par.children[ind];
				
				if (retrievedChild.ref != ref) {
					par = retrievedChild;
				} else { break }
			}
			return retrievedChild;
		} catch (e) {
			console.error(e.stack);
		}
	},
	INSERT_NEW_ELEMENT(obj) {
		let newElem = {
			type: obj.type,
			props: $.extend(obj.props, { responsive: obj.resp || resp() }),
			ref: `${ACTIVE_ELEM.ref}:${ACTIVE_ELEM.children.length}`,
			children: obj.children || [],
			name: obj.name,
			selected: false,
			open: false,
			id: generateId()
		};
		
		updateRef(newElem);
		
		if (obj.cannotHaveChildren) newElem.cannotHaveChildren = true;
		
		ACTIVE_DOM_ELEM.append(cEl3(newElem));
		ACTIVE_ELEM.children.push(newElem);

		_.RE_RENDER_DOM_SELECTORS();
		undo.addEdit();
	},
	SELECT_WITH_SELECTOR_TOOL(element) {
		_.SELECT_OBJECT(_.getElementObj(element.ref));

		iframe.style.cursor = 'auto';
	},
	SELECT_OBJECT(elemObj) {
		if (!elemObj) return;
		if(ACTIVE_DOM_ELEM) {
			ACTIVE_DOM_ELEM.style.outline = '';
			ACTIVE_DOM_ELEM.style.outlineOffset = '';
		}

		ACTIVE_DOM_ELEM = _.getDomElemFromElemRef(elemObj.ref);
		ACTIVE_DOM_ELEM.style.outline = '1px solid green';
		ACTIVE_DOM_ELEM.style.outlineOffset = '-1px';
		elemObj.selected = true;
		if(ACTIVE_ELEM) ACTIVE_ELEM.selected = false;
		ACTIVE_ELEM = elemObj;

		_.RE_RENDER_DOM_SELECTORS();
		
		ElementUpdate.fire();
	},
	FILE_SELECTOR(ref) {
		if (ref === SPIDER.opened_file) return alert('File is currently opened!');
		SPIDER.opened_file = ref;

		callVarUpdates();

		updateRef(project[0]);

		iframeDoc.location.reload();

		let title = $('#page-title');
		if (title.innerWidth() < 300) {
			title.text('');
			$('#page-title2').text(currentFile.title);
		} else {
			title.text(currentFile.title);
		}

		saveSpiderData('op_file', ref);
	}
}

function deleteRecursively(project) {
	for (let key of project) {
		for (let obj in key.props.responsive) {
			if (Object.keys(key.props.responsive[obj]).length === 0) {
				delete key.props.responsive[obj];
			}
		}
		delete key.ref;
		delete key.selected;
		delete key.open;

		if (key.children.length) deleteRecursively(key.children);
	}
}

/**
 * Transition In
 */
function TRIn(cls, tmt) {
	if (!cls || !cls.trim || !cls.trim()) return;
	ACTIVE_DOM_ELEM.classList.add(cls);
	setTimeout(() => {
		ACTIVE_DOM_ELEM.classList.add('normal-TR');
		ACTIVE_DOM_ELEM.addEventListener('transitionend', () => {
			ACTIVE_DOM_ELEM.classList.remove(cls);
			ACTIVE_DOM_ELEM.classList.remove('normal-TR');
		}, { once: true });
	}, tmt || 200);
}

function TROut(cls) {
	ACTIVE_DOM_ELEM.classList.add(cls);
	ACTIVE_DOM_ELEM.addEventListener('transitionend', () => ACTIVE_DOM_ELEM.classList.remove(cls), { once: true });
}

function revert(type) {
	let newProject = undo.getEdit(type);
	project[0] = newProject;
	_.SELECT_OBJECT(newProject);

	_.UPDATE_DOM_ELEMENT();
}

function checkElem() {
	if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
	if (ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');
	
	return 1;
}

export async function loadFeature(url, callback) {
	// if(navigator.onLine) throw new Error('');
	try {
		let dialog = await import(`${location.origin}/lib/${url}`);
		
		if(callback) {
			callback(dialog);
		} else {
			dialog = new dialog.default();
			
			dialog.focus();
		}
		
		URL.revokeObjectURL(new URL(`${location.origin}/lib/${url}`));
	} catch (e) {
		console.error(e);
		alert('Network Error: Please check your internet connection and try again!');
	}
}

async function addLayout(childCount, name, defaults) {
	if (!checkElem()) return;
	
	let count = ACTIVE_DOM_ELEM.childElementCount;
	if (count === childCount || !count) { // If the selected element's children.length == the amount of grid children we want to add/modify, or it has no children
	
	loadFeature('components/LAYOUT_COMPONENT.js', function(dialog) {
			dialog = new dialog.default(childCount, defaults, count === childCount);
			dialog.focus();
		});
	} else {
		alert(`${name} cannot modify layouts with ${count} children.`);
	}
}

const FEATURES = {
	'New file'() {
		loadFeature('components/PAGE_SETTINGS.js', function(dialog) {
			dialog = new dialog.default('New page');
			dialog.focus();
		});
	},
	'New folder'() {
		loadFeature('components/NEW_FOLDER.js');
	},
	Save() {
		document.body.style.cursor = 'wait';
		let fileToSave = cloneObj(files);

		runThroughFiles(fileToSave, file => deleteRecursively(file.content.project), () => null);


		if (storageAvailable) {
			let cache = JSON.parse(localStorage.getItem('spider'));

			cache.files = fileToSave;

			cache = JSON.stringify(cache);
			localStorage.setItem('spider', cache);
		}
		// Update files in user account
		/* fetch('data'+ currentFile.id, {
		  method: 'update',
		  headers: {
		   'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(currentFile),
		  credentials: 'include'
		 })
		 .then(res => res.json())
		 .then(res => res.message == 'Successful!' && (document.body.style.cursor = 'auto'))
		 .catch(error => alert(error.message) && (document.body.style.cursor = ''))
		 */
		alert('Saved!');
	},
	'Save as'() {
		loadFeature('components/PAGE_SETTINGS.js', function(dialog) {
			dialog = new dialog.default('Page settings', 'edit');
			dialog.focus();
		});
	},
	Duplicate() {
		currentFolder.content.push({
			content: cloneObj(currentFile),
			name: currentFile.title,
			type: 'file'
		});

		updateFileOrFolderRef(files);

		alert('Duplicated: ' + currentFile.title);

		_.FILE_SELECTOR(last(currentFolder.content).ref);
	},
	Delete() {
		if (filesSearch[0].ref === '0:0') return alert('Cannot delete current file'); // TODO:

		if (!confirm('Are you sure you want to delete this file: \n\n' + currentFile.title)) return;
		document.body.style.cursor = 'wait';

		filesSearch[2].content.splice(SPIDER.opened_file.match(/(\d+):$/)[1], 1);

		updateFileOrFolderRef(files);
		alert('Deleted: ' + currentFile.title);

		_.FILE_SELECTOR('0:0');
		this.Save();

		$(document.body).css('cursor', '');
	},
	Undo() {
		revert(true);
	},
	Redo() {
		revert();
	},
	"HTML"() {
		_.processProject('HTML');
	},
	"CSS"() {
		_.processProject('CSS');
	},
	'Copy element'() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element');
		if (ACTIVE_ELEM.ref == '0') return alert('Cannot copy the root element.\n\nTry creating a parent element inside of the root to hold the entire webpage.');

		SPIDER.clipboard = ACTIVE_ELEM;
	},
	'Cut element'() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
		if (ACTIVE_ELEM.ref === '0') return alert('Cannot cut the root element');

		let activeElemPar = ACTIVE_DOM_ELEM.parentElement;
		ACTIVE_DOM_ELEM.remove();
		updateDomRef(activeElemPar);
		
		SPIDER.clipboard = ACTIVE_ELEM;
		
		let parent = _.getElementObj(ACTIVE_ELEM.ref, -2);
		
		_.removeObjProp(project, ACTIVE_ELEM.ref);
		
		updateRef(parent);
		_.SELECT_OBJECT(parent);
		
		undo.addEdit();
	},
	'Copy styles'() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');

		SPIDER.copied_style = {};
		let elemObj = ACTIVE_ELEM.props;

		SPIDER.copied_style.style = cloneObj(elemObj.style);
		SPIDER.copied_style.class = cloneObj(elemObj.class);
		SPIDER.copied_style.responsive = cloneObj(elemObj.responsive);
	},
	'Copy ID'() {
		SPIDER.copied_id = ACTIVE_ELEM.id;
		alert('Element ID has been copied!');
	},
	'Paste element'() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
		if (!SPIDER.clipboard || !SPIDER.clipboard.ref) return alert('Please copy or cut an element!');

		let newElemFromClipboard = cloneObj(SPIDER.clipboard);
		newElemFromClipboard.selected = false;
		
		_.INSERT_NEW_ELEMENT(newElemFromClipboard);
	},
	'Paste styles'() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
		if (!SPIDER.copied_style) return alert('Please, copy a style!');

		let elemObj = ACTIVE_ELEM.props;
		elemObj.style = $.extend(elemObj.style, SPIDER.copied_style.style);
		let copied_resp = SPIDER.copied_style.responsive;

		for (let key in copied_resp) {
			elemObj.responsive[key] = $.extend(elemObj.responsive[key], copied_resp[key]);
		}

  [].push.apply(elemObj.class, SPIDER.copied_style.class);

		_.UPDATE_DOM_ELEMENT();
		
		undo.addEdit();
	},
	'Clear styles'() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
		if (!confirm('Clear selected element styles?')) return;
		let obj = ACTIVE_ELEM.props;
		obj.style = {};
		obj.class = [];
		obj.responsive = resp();

		_.UPDATE_DOM_ELEMENT();
		
		undo.addEdit();
	},
	"Remove Element"() {
		if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
		if (ACTIVE_ELEM.ref == '0') return alert('Cannot remove the root element!');
		if (!confirm('Are you sure you want to remove this element?')) return;

		let activeElemPar = ACTIVE_DOM_ELEM.parentElement;
		ACTIVE_DOM_ELEM.remove();
		updateDomRef(activeElemPar);
		
		let parent = _.getElementObj(ACTIVE_ELEM.ref, -2);
		
		_.removeObjProp(project, ACTIVE_ELEM.ref);
		
		updateRef(parent);

		_.SELECT_OBJECT(parent);
		
		undo.addEdit();
	},
	"Remove Children"() {
		if (ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');;
		if (!confirm("Are you sure you want to remove this element's children?")) return;

		ACTIVE_ELEM.children.length = 0; // Remove all children
		ACTIVE_ELEM.props.innerHTML = '';
		
		/* Remove grid class too
		if (elemObj.props.class.indexOf('row') != -1) {
		 let ind = elemObj.props.class.findIndex(e => e == 'row');
		 elemObj.props.class.splice(ind, 1);
		 elemDOM.classList.remove('row');
		}
		*/
		ACTIVE_DOM_ELEM.empty();
		_.RE_RENDER_DOM_SELECTORS();
		undo.addEdit();
	},
	'Fluid view'() {
		_.add_Browser_View_Class('fluid-view');
	},
	'Mobile view 1'() {
		_.add_Browser_View_Class('mobile-view1');
	},
	'Mobile view 2'() {
		_.add_Browser_View_Class('mobile-view2');
	},
	'Mobile view 3'() {
		_.add_Browser_View_Class('mobile-view3');
	},
	'Tablet view 1'() {
		_.add_Browser_View_Class('tablet-view1');
	},
	'Tablet view 2'() {
		_.add_Browser_View_Class('tablet-view2');
	},
	'Laptop view'() {
		_.add_Browser_View_Class('laptop-view');
	},
	'Desktop view 1'() {
		_.add_Browser_View_Class('desktop-view1');
	},
	'Desktop view 2'() {
		_.add_Browser_View_Class('desktop-view2');
	},
	Customize() {
		return checkElem() &&	loadFeature('components/CUSTOMIZE_LAYOUT.js');
	},
	'Layout 2X'() {
		addLayout(2, 'Layout 2X', [
			{
				name: 'Layout 12:12',
				format: [12, 12]
		 },
			{
				name: 'Layout 6:6',
				format: [6, 6]
		 },
			{
				name: 'Layout 3:9',
				format: [3, 9]
		 },
			{
				name: 'Layout 9:3',
				format: [9, 3]
		 },
			{
				name: 'Layout 8:4',
				format: [8, 4]
		 },
			{
				name: 'Layout 4:8',
				format: [4, 8]
		 }
		]);
	},
	'Layout 3X'() {
		addLayout(3, 'Layout 3X', [
			{
				name: 'Layout 4:4:4',
				format: [4, 4, 4]
   },
			{
				name: 'Layout 12:12:12',
				format: [12, 12, 12]
   },
			{
				name: 'Layout 6:6:12',
				format: [6, 6, 12]
   },
			{
				name: 'Layout 12:6:6',
				format: [12, 6, 6]
   },
			{
				name: 'Layout 2:8:2',
				format: [2, 8, 2]
   },
			{
				name: 'Layout 3:6:3',
				format: [3, 6, 3]
   }
  ]);
	},
	'Layout 4X'() {
		addLayout(4, 'Layout 4X', [
			{
				name: 'Layout 3:3:3:3',
				format: [3, 3, 3, 3]
		        },
			{
				name: 'Layout 4:4:4:4',
				format: [4, 4, 4, 4]
		        },
			{
				name: 'Layout 6:6:6:6',
				format: [6, 6, 6, 6]
		        },
			{
				name: 'Layout 12:12:12:12',
				format: [12, 12, 12, 12]
		    },
			{
				name: 'Layout 6:6:12:12',
				format: [6, 6, 12, 12]
		 },
			{
				name: 'Layout 12:6:6:12',
				format: [12, 6, 6, 12]
		 },
			{
				name: 'Layout 12:12:6:6',
				format: [12, 12, 6, 6]
			}
 ]);
	},
	'Layout 5X'() {
		addLayout(5, 'Layout 5X', [
			{
				name: 'Layout 2:2:2:2:2',
				format: [2, 2, 2, 2, 2]
	  },
			{
				name: 'Layout 3:3:3:3:3',
				format: [3, 3, 3, 3, 3]
	  },
			{
				name: 'Layout 4:4:4:4:4',
				format: [4, 4, 4, 4, 4]
	  },
			{
				name: 'Layout 6:6:6:6:6',
				format: [6, 6, 6, 6, 6]
	  },
			{
				name: 'Layout 12:12:12:12:12',
				format: [12, 12, 12, 12, 12]
	 	},
			{
				name: 'Layout 12:6:6:6:6',
				format: [12, 6, 6, 6, 6]
	  },
			{
				name: 'Layout 6:6:12:6:6',
				format: [6, 6, 12, 6, 6]
	  },
			{
				name: 'Layout 6:6:6:6:12',
				format: [6, 6, 6, 6, 12]
	  },
			{
				name: 'Layout 12:4:4:4:4',
				format: [12, 4, 4, 4, 4]
	  }
	]);
	},
	'Layout 6X'() {
		addLayout(6, 'Layout 6X', [
			{
				name: 'Layout 2:2:2:2:2:2',
				format: [2, 2, 2, 2, 2, 2]
	  },
			{
				name: 'Layout 3:3:3:3:3:3',
				format: [3, 3, 3, 3, 3, 3]
	  },
			{
				name: 'Layout 4:4:4:4:4:4',
				format: [4, 4, 4, 4, 4, 4]
	  },
			{
				name: 'Layout 6:6:6:6:6:6',
				format: [6, 6, 6, 6, 6, 6]
	     },
			{
				name: 'Layout 12:12:12:12:12:12',
				format: [12, 12, 12, 12, 12, 12]
	 },
	]);
	},
	Table() {
		return checkElem() &&	loadFeature('components/CREATE_TABLE.js');
	},
 Icons() {
		return checkElem() &&	loadFeature('components/Icons.js');
	},
	Button() {
		return checkElem() &&	loadFeature('components/CREATE_BUTTON.js');
	},
	Inputs() {
		return checkElem() && loadFeature('components/CREATE_INPUT.js');
	},
	'Fade-out'() {
		TROut('fadeOutTr');
	},
	'Fade-out-left'() {
		TROut('fadeOutLeftTr');
	},
	'Fade-out-right'() {
		TROut('fadeOutRightTr');
	},
	'Fade-out-up'() {
		TROut('fadeOutUpTr');
	},
	'Fade-out-down'() {
		TROut('fadeOutDownTr');
	},
	'Fade-in'() {
		TRIn('opacity-0');
	},
	'Fade-in-up'() {
		TRIn('fade-up');
	},
	'Fade-in-down'() {
		TRIn('fade-down');
	},
	'Fade-in-left'() {
		TRIn('fade-left');
	},
	'Fade-in-right'() {
		TRIn('fade-right');
	},
	'Slide-out-left'() {
		TROut('slideOutLeftTr');
	},
	'Slide-out-right'() {
		TROut('slideOutRightTr');
	},
	'Slide-out-up'() {
		TROut('slideOutUpTr');
	},
	'Slide-out-down'() {
		TROut('slideOutDownTr');
	},
	'Slide-in-up'() {
		TRIn('slide-up', 0);
	},
	'Slide-in-down'() {
		TRIn('slide-down', 0);
	},
	'Slide-in-left'() {
		TRIn('slide-left', 0);
	},
	'Slide-in-right'() {
		TRIn('slide-right', 0);
	},
	'Dark mode'() {
		if (!$(document.body).hasClass("light-theme")) return;
		$(document.body).removeClass("light-theme");
		saveSpiderData('theme', 'dark');
	},
	'Light mode'() {
		if ($(document.body).hasClass("light-theme")) return;
		$(document.body).addClass("light-theme");
		saveSpiderData('theme', 'light');
	},
	'Activate fullscreen'() {
		if (!document.fullscreenEnabled) return;

		let html = document.documentElement;

		if (html.requestFullscreen) {
			html.requestFullscreen();
		} else if (html.webkitRequestFullscreen) {
			html.webkitRequestFullscreen();
		} else if (html.msRequestFullscreen) {
			html.msRequestFullscreen();
		}
	},
	'Deactivate fullscreen'() {
		if (!document.fullscreenEnabled) return

		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
};

const actionsArr = [
	{
		name: 'Select',
		icon: FaMousePointer()
 },
	{
		name: 'Edit',
		icon: FaEdit()
 },
	{
		name: 'Cut',
		icon: FaCut()
 },
	{
		name: 'Copy',
		icon: FaCopy()
 },
	{
		name: 'Paste',
		icon: FaPaste()
 },
	{
		name: 'Paste before',
		icon: FaClone()
 },
	{
		name: 'Swap position',
		icon: FaExchangeAlt({ style: 'transform: rotate(90deg)' })
 },
	{
		name: 'Delete',
		icon: FaTrashAlt()
 },
	{
		name: 'Remove children',
		icon: FaTrash()
 },
	{
		name: 'Save as snippet',
		icon: FaSave()
 },
	{
		name: 'Toggle visibility',
		icon: FaRetweet()
 },
	{
		name: 'Properties',
		icon: FaInfoCircle()
 }
];

const actionsArrEvProto = {
	'Edit'() {
		new PropertyDialogue().focus();
	},
	'Cut'() {
		FEATURES['Cut element']();
	},
	'Copy'() {
		FEATURES["Copy element"]();
	},
	'Paste'() {
		FEATURES["Paste element"]();
	},
	'Delete'() {
		FEATURES["Remove Element"]();
	},
	'Paste before'() {
		if (!ACTIVE_ELEM.ref) return;
		if (!SPIDER.clipboard || !SPIDER.clipboard.ref) return alert('Please copy or cut an element first!');

		try {
			let newCopiedElem = cloneObj(SPIDER.clipboard);
			newCopiedElem.selected = false;
			
			$(ACTIVE_DOM_ELEM).before(cEl3(newCopiedElem));
			
			let parElem = _.getElementObj(ACTIVE_ELEM.ref, -2);
			let parChildren = parElem.children;

			let index = parChildren.findIndex(obj => obj.ref === ACTIVE_ELEM.ref);
			index && parChildren.splice(index, 0, newCopiedElem);
			!index && parChildren.unshift(newCopiedElem);

			updateRef(parElem);
			_.RE_RENDER_DOM_SELECTORS();

			updateDomRef($(ACTIVE_DOM_ELEM).parent());

			undo.addEdit();
		} catch (e) {
			console.error(e.stack);
		}
	},
	'Swap position'() {
		if (!ACTIVE_ELEM.ref) return;
		
		let parElem = _.getElementObj(ACTIVE_ELEM.ref, -2);
		let parChildren = parElem.children;

		let index = parChildren.findIndex(obj => obj.ref === ACTIVE_ELEM.ref);
		if (!index) {
   [parChildren[index], parChildren[index + 1]] = [parChildren[index + 1], ACTIVE_ELEM];
			ACTIVE_DOM_ELEM.before(ACTIVE_DOM_ELEM.next());
		} else {
   [parChildren[index], parChildren[index - 1]] = [parChildren[index - 1], ACTIVE_ELEM];
			ACTIVE_DOM_ELEM.before(ACTIVE_DOM_ELEM.prev());
		}
		updateRef(parElem);

		updateDomRef(ACTIVE_DOM_ELEM.parent());

		_.RE_RENDER_DOM_SELECTORS();

		undo.addEdit();
	},
	'Remove children'() {
		FEATURES["Remove Children"]();
	},
	'Save as snippet'() {
		alert('Under construction!');
	},
	'Properties'(ref) {
		new CREATE_NEW_ELEMENT_COMP({}, ref);
	}
};

/**
 * Create DOM Tab illustration tree out of project object
 * @param {Element} parent A parent element for the function to append its element(s) tree to.
 * @param {object} elem A projectObject
 * @param {Boolean} notFirstParent 
 */

const vellipDrop = el('ul', { class: 'menu right-0 font-normal' });

export const cEl4 = function(parent, elem, notFirstParent) {
	let active = activeElemRef.split(':').slice(0, ++activeNestedIndex).join(':');
	
	iter(elem, child => {
		if(active.startsWith(child.ref)) child.open = true;
	
		const newParent = el('div', { class: `elemNameDiv flex-ac ${child.open ? child.cannotHaveChildren ? '' : 'openedElem' : 'closedElem'}`, ref: child.ref });

		child.selected && newParent.addClass('bg-selected');
		
		const actionsArrEv = {
			'Select'(ref) {
				_.SELECT_OBJECT(_.getElementObj(ref));
			},
			'Toggle visibility'(ref) {
				let active_elem = _.getElementObj(ref);
				if (active_elem.cannotHaveChildren) return alert('No children!');
				active_elem.open = !active_elem.open;
				
				_.RE_RENDER_DOM_SELECTORS();
			},
			__proto__: actionsArrEvProto
		};

		const vellipBtn = el('button', { innerHTML: '&vellip;', class: 'px-2', data: { ref: child.ref, cannotHaveChildren: child.cannotHaveChildren, elemLen: elem.length } });
		const vellip = el('div', { class: 'dropdown' }, vellipBtn);

		if (!notFirstParent) {
			// addedClickEvent is to get the current main element (parent) since we are using recursion here to render elements children,

			// we should track the main element (first parent) so we don't add this click event to all parent elements provided by the recursion at insertBefore below

			!parent.data().addedClickEvent && parent.click(function(e) {
				if (!parent.data().enableDOMClick) return;

				let targ = e.target;
				if (targ.nodeName.toLowerCase() === 'button') {
					if (vellipDrop[0].isConnected) return;
					
					targ = $(targ);
					let dataset = targ.data();
					
					let vellipDropParent = targ.parent();

					vellipDrop.empty();

					for (let each of actionsArr) {
						let name = each.name;

						if (dataset.ref === '0' && !['Select', 'Edit', 'Paste', 'Toggle visibility', 'Remove children'].includes(name)) continue;

						if (dataset.cannotHaveChildren && (name === 'Remove children' || name === 'Toggle visibility' || name == 'Paste')) continue;

						if (dataset.elemLen < 2 && name === 'Swap position') continue;

						let li = el('li', { class: 'p-1 px-2', data: { ref: dataset.ref, text: name } }, el('span', { class: 'icon mr-1' }, $(each.icon)), el('span', { textContent: name }));
						vellipDrop.append(li);
					};
					
					vellipDropParent.append(vellipDrop);

					setTimeout(() =>
						$(window).bind('click.mynamespace', function(e) {
							if (!$.contains(vellipDrop[0], e.target)) {
								$(window).unbind('click.mynamespace');
								vellipDrop.remove();
							}
						}), 0);

					return;
				}

				let li = getParentElem(targ, 'li', 'main|div');

				if (li) {
					li = $(li);
					let dataset = li.data();
					
					let action = dataset.text;
					if (ACTIVE_ELEM.ref === dataset.ref && action === 'Select') return;

					// If this element is not selected, we can only click "Select" and "Toggle visibility"

					if (ACTIVE_ELEM.ref !== dataset.ref && (action !== 'Select' && action !== 'Toggle visibility')) return alert('Please, select this element first!');

					actionsArrEv[action](dataset.ref);
				}
			});

			// addedClickEvent is to get the current main element (parent) since we are using recursion here to render elements children,

			// we should track the main element (first parent) so we don't add this click event to all parent elements provided by the recursion at before() below
			
			parent.data('addedClickEvent', true);
		}

		let div = el('div', { class: 'flex-grow white-space' });
		let divHtml = '';
		divHtml += `${child.name || child.type.capitalize()}`;
		if (child.props.alt) divHtml += ` alt="${child.props.alt}"`;
		
		div.html(divHtml);

		parent.append(newParent);

		let innerParent = el('div', { textContent: `${child.props.innerHTML}`, style: { paddingLeft: '7px' } });

		!child.cannotHaveChildren && child.open && (child.props.innerHTML || child.children.length) && parent.append(innerParent);

		if (!child.open || !child.children.length) innerParent = null;

		newParent.append(div, el('span', { class: 'flex' }, !child.cannotHaveChildren ? String(child.children.length) : '', vellip));

		let newParentClose = el('div', { textContent: `${child.name || child.type.capitalize()}`, style: { paddingLeft: '10px', marginBottom: '1px' }, class: `white-space pr-3 elemNameDiv${child.selected ? ' bg-selected' : ''}` });

		!child.cannotHaveChildren && parent.append(newParentClose);

		if (child.children.length && child.open) {
			newParentClose.before(cEl4(innerParent, child.children, true));
		}
	});

	return parent || '';
}

export { _, FEATURES };