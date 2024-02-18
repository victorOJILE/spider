 /**
  * @returns {String}
  */
 function capitalize(str) {
 	return str.length > 1 ? str[0].toUpperCase() + str.slice(1) : str.toUpperCase();
 }

 /**
  * @returns {String}
  */
 function replaceCaps(str) {
 	return str.replace(/([A-Z])/g, (match, off, offset) => (offset > 0 ? "-" : "") + match.toLowerCase());
 }

 /**
  * @returns {String}
  */
 function replaceHyphens(str) {
 	return str.replace(/([-]\w)/g, (match, off, offset) => offset > 0 ? str[offset + 1].toUpperCase() : '');
 }

 /**
  * @returns {String}
  */
 function replaceSpaces(str) {
 	return str.replace(/([\s]\w)/g, (match, off, offset) => offset > 0 ? str[offset + 1].toUpperCase() : '');
 }

 /**
  * @returns {Element}
  */
 function elId(id) {
 	return document.getElementById(id);
 }

 /**
  * Iterate over iterables, similar to [].forEach
  */
 function iter(v, func) {
 	$.each(v, function(index, value) {
 		func(value, index);
 	});
 }

 const storageAvailable = (function(type) {
 	let storage;
 	try {
 		storage = window[type];
 		const x = "__storage_test__";
 		storage.setItem(x, x);
 		storage.removeItem(x);
 		return true;
 	} catch (e) {
 		return (
 			e instanceof DOMException &&
 			// everything except Firefox
 			(e.code === 22 ||
 				// Firefox
 				e.code === 1014 ||
 				// test name field too, because code might not be present
 				// everything except Firefox
 				e.name === "QuotaExceededError" ||
 				// Firefox
 				e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
 			// acknowledge QuotaExceededError only if there's something already stored
 			storage &&
 			storage.length !== 0
 		);
 	}
 })('localStorage');

 function copyToClipboard(text) {
 	if (window.clipboardData && window.clipboardData.setData) {
 		// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
 		return window.clipboardData.setData("Text", text);
 	} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
 		let textarea = document.createElement("textarea");
 		textarea.textContent = text;
 		textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
 		document.body.appendChild(textarea);
 		textarea.select();
 		try {
 			return document.execCommand("copy"); // Security exception may be thrown by some browsers.
 		} catch (ex) {
 			console.warn("Copy to clipboard failed.", ex);
 			return prompt("Copy to clipboard: Ctrl+C, Enter", text);
 		} finally {
 			document.body.removeChild(textarea);
 		}
 	}
 }

 function addCss(elem, val = {}) {
 	for (let i in val) {
 		if (i.startsWith(':')) continue;
 		elem.style[i] = val[i];
 	}
 }

 function cloneObj(obj) {
 	return JSON.parse(JSON.stringify(obj));
 }

 /**
  * @returns {Element}
  */
 function getParentElem(elem, tagName, exception) {
 	if (elem.nodeName.toLowerCase() == tagName) return elem;
 	if (exception && elem.nodeName.toLowerCase().match(new RegExp(exception))) return;
 	let child;
 	if (elem.parentElement) child = getParentElem(elem.parentElement, tagName, exception);
 	return child;
 }

 function getTargIndex(targ) {
 	let index = 0;
 	for (let child of targ.parent().children()) {
 		if ($(child).is(targ)) return index;
 		index++
 	}

 	return -1;
 }

 function updateDomRef(parentElem) {
 	let parRef = parentElem.ref;
 	iter(parentElem.children, (child, i) => {
 		Object.defineProperty(child, 'ref', {
 			value: parRef + ':' + i,
 			writable: true
 		});
 		child.hasChildNodes && updateDomRef(child);
 	});
 }

 function updateRef(obj) {
 	iter(obj.children, (key, i) => {
 		key.ref = obj.ref + ':' + i;
 		key.children.length && updateRef(key);
 	});
 }

 /**
  * Returns the last value in an array
  * @param {Array} arr - Array to get the last value.
  */
 function last(arr) {
 	return arr[arr.length - 1];
 }
 /*
 function array_from(iterable, mapper) {
 	let newArray = [], index = 0;
 	
 	if(iterable.constructor.name == 'Object') {
 		if(!iterable.length) return newArray;
 		
 		while(index < iterable.length) {
 			if(mapper && typeof mapper === 'function') {
 				newArray.push(mapper(iterable[index], index));
 			} else {
 				newArray.push(iterable[index]);
 			}
 			
 			index++;
 		}
 		
 		return newArray;
 	}
 	
 	let iter = iterable[Symbol.iterator]();
 	
 	while(true) {
 		let next = iter.next();
 		if(next.done) break;
 		if(mapper && typeof mapper === 'function') {
 			newArray.push(mapper(next.value, index))
 		} else {
 			newArray.push(next.value);
 		}
 		index++;
 	}
 	
 	return newArray;
 }
 */
 /**
  * Returns the found value in an array, checking from the last.
  * Skips the found value by occurrence (number) times
  */
 Array.prototype.findLastIndexSP = function(callback = Function, occurrence = 0) {
 	let array = this;
 	if (callback.constructor.name !== 'Function') {
 		throw TypeError('Cannot process value of this type. First parameter expects a function.');
 	}
 	for (let i = array.length - 1; i >= 0; i--) {
 		if (callback(array[i], i, array)) {
 			if (occurrence) {
 				occurrence--;
 			} else {
 				return i;
 			}
 		}
 	}
 };

 const argsSlice = Array.prototype.slice;
 const elemAppend = Element.prototype.append;
 const arrayPush = Array.prototype.push;

 String.prototype.capitalize = function() {
 	return this.length > 1 ? this[0].toUpperCase() + this.slice(1) : this.toUpperCase();
 }

 Element.prototype.empty = function() {
 	while (this.firstChild) this.removeChild(this.firstChild);
 }

 const spiderCache = window.localStorage && JSON.parse(localStorage.getItem('spider'));

 spiderCache && spiderCache.theme === "light" && $(document.body).addClass("light-theme");

 const SPIDER = {
 	responsiveDesignActivated: false,
 	isMobile: (function() {
 		try {
 			document.createEvent("TouchEvent");
 			return true;
 		} catch (e) {
 			return false;
 		}
 	})(),
 	viewOrdered: ['fluid-view', 'mobile-view1', 'mobile-view2', 'mobile-view3', 'tablet-view1', 'tablet-view2', 'laptop-view', 'desktop-view1', 'desktop-view2'],
 	BrowserViewWidths: ['', '280px', '320px', '360px', '576px', '768px', '992px', '1200px', '1400px'],
 	BrowserViewAbbr: {
 		'fluid-view': '',
 		'mobile-view1': 'xs',
 		'mobile-view2': 'mb1',
 		'mobile-view3': 'mb2',
 		'tablet-view1': 'sm',
 		'tablet-view2': 'md',
 		'laptop-view': 'lg',
 		'desktop-view1': 'xl',
 		'desktop-view2': 'xxl'
 	},
 	usedId: []
 };

 const generateId = (function() {
 	const idVals = [];
 	let i = 65,
 		limit = 123;

 	while (i < limit) {
 		idVals.push(String.fromCodePoint(i++));
 		if (i == 91) i = 97;
 	}

 	/**
 	 * Returns a unique id of 25 characters (by default)
 	 * Can modify the length by providing a salt value
 	 * @returns {String}
 	 */
 	return function gen(salt = 25) {
 		let id;

 		function gen() {
 			id = '';
 			for (i = 0; i < salt; i++) {
 				id += idVals[Math.floor(Math.random() * 51)];
 			}
 		}
 		gen();

 		SPIDER.usedId.find(e => e === id) ? gen() : SPIDER.usedId.push(id);

 		return id;
 	}
 })();

 function resp() {
 	return SPIDER.viewOrdered.reduce((obj, view) => {
 		view != 'fluid-view' && (obj[view] = {});
 		return obj;
 	}, {});
 }

 function addResponsiveCss(element, props) {
 	addCss(element, props.style);

 	if (SPIDER.elemState) addCss(element, props.style[SPIDER.elemState], true);

 	// apply and overwrite element styles for views in their order until current view 

 	for (let view of SPIDER.viewOrdered) {
 		if (view === 'fluid-view') continue;

 		addCss(element, props.responsive[view]);

 		if (SPIDER.elemState) {
 			addCss(element, props.responsive[view][SPIDER.elemState], true);
 		}

 		if (view === SPIDER.browser_view) break;
 	}
 }

 const createElement = (function() {
 	let element, props, prop;

 	let task = {
 		'class'() {
 			if ($.isArray(props.class)) props.class = props.class.join(' ');

 			element.attr('class', props.class);
 		},
 		data() {
 			element.data(props.data);
 		},
 		style() {
 			element.css(props.style);
 		},
 		event() {
 			element.on(props.event);
 		},
 		textContent() {
 			element.text(props[prop]);
 		},
 		innerHTML() {
 			element.html(props[prop]);
 		}
 	}

 	return function(elem, object, property) {
 		element = elem;
 		props = object;
 		prop = property;

 		if (task[prop]) {
 			task[prop]();
 		} else {
 			element.attr(property, object[property]);
 		}
 	}
 })()

 const createElement2 = (function() {
 	let element, props, prop;

 	let task = {
 		'class'() {
 			element.className = props.class.join(' ');
 		},
 		data() {
 			for (let d in props.data) {
 				element.dataset[d] = props[prop][d];
 			}
 		},
 		style() {
 			addResponsiveCss(element, props)
 		},
 		responsive() {}
 	}

 	return function(elem, object, property) {
 		element = elem;
 		props = object;
 		prop = property;

 		if (task[prop]) {
 			task[prop]();
 		} else {
 			element[property] = object[property];
 		}
 	}
 })()

 /**
  * Create html DOM element
  * @returns {HTMLElement}
  */
 function el(elem, props) {
 	let element = $(document.createElement(elem));
 	if (props && typeof props === 'object') {
 		$.each(props, prop => createElement(element, props, prop));
 	}

 	if (arguments.length > 2) {
 		$.each(argsSlice.call(arguments, 2), (i, child) => element.append(child));
 	}

 	return element;
 }

 /**
  * Create html DOM element for iframe
  * @returns {HTMLElement}
  */
 function el2(elem, props) {
 	let element = document.createElement(elem);
 	if (props && typeof props === 'object') {
 		for (let prop in props) {
 			createElement2(element, props, prop);
 		}
 	}

 	if (arguments.length > 2) {
 		elemAppend.apply(element, argsSlice.call(arguments, 2));
 	}

 	return element;
 }

 /**
  * Creates a single dom element and adds text content to it
  * @param {String} type DOM element type
  * @param {String} text DOM element textContent
  * @returns {Element}
  */
 function elT(type, text) {
 	let el = $(document.createElement(type));
 	if (text) el.text(text);

 	return el;
 }

 // if storage is available, if there is no spider data in storage, set spider data
 storageAvailable && localStorage.getItem('spider') || localStorage.setItem('spider', '{}');

 let ACTIVE_ELEM = {},
 	ACTIVE_DOM_ELEM, files, filesSearch, currentFile, currentFolder, project;

 /**
  * Get opened file or folder
  * @param {String} ref File or folder reference
  */
 function getFileOrFolder(ref, addCond) {
 	ref = ref.split(':');

 	let elObj, elObj2 = files,
 		elObj3, arr = files;

 	for (let i = 0; i < ref.length; i++) {
 		if (i + 1 !== ref.length || addCond) {
 			elObj3 = elObj;
 			elObj = elObj2[ref[i]];
 			elObj2 = elObj2[ref[i]].content;
 		}
 	}
 	return [elObj, elObj2, elObj3, arr];
 }

 function runThroughFiles(files, fileCallback, folderCallback) {
 	for (let key of files) {
 		if (key.type === 'folder') {
 			if (folderCallback(key, files)) break;

 			if (!runThroughFiles(key.content, fileCallback, folderCallback)) break;
 		} else {
 			if (fileCallback(key, files)) break;
 		}
 	}
 }

 function updateFileOrFolderRef(arr, oldRef) {
 	iter(arr, function(key, ind) {
 		arr[ind].ref = oldRef && oldRef + ':' + ind || String(ind);
 		if ($.isArray(arr[ind].content)) updateFileOrFolderRef(arr[ind].content, arr[ind].ref);
 	});
 }

 /**
  * Returns the current style you are editing
  * Could be 'props.style', 'responsive[view]' or element states
  */
 function updateViewF() {
 	let updateView = SPIDER.responsiveDesignActivated ?
 		(ACTIVE_ELEM.props.responsive[SPIDER.browser_view] || ACTIVE_ELEM.props.style) :
 		ACTIVE_ELEM.props.style;

 	if (SPIDER.elemState) {
 		if (!updateView[SPIDER.elemState]) updateView[SPIDER.elemState] = {};

 		updateView = updateView[SPIDER.elemState];
 	}

 	return updateView;
 }

 function NewFile(title) {
 	return {
 		language: 'en-US',
 		title: title || ('New page' + (currentFolder && currentFolder.content.length > 0 ? ' ' + currentFolder.content.length : '')),
 		titleNoSuffix: 'New page' + (currentFolder && currentFolder.content.length > 0 ? ' ' + currentFolder.content.length : ''),
 		description: 'This is a brief description about your project.',
 		encoding: 'UTF-8',
 		IE_view: 'IE=edge,chrome=1',
 		vw_width: 'device-width',
 		vh_height: 'device-height',
 		ini_scale: '1.0',
 		canonicalLink: '',
 		get canonical() {
 			return this.canonicalLink;
 		},
 		set canonical(value) {
 			if (value.match(/http[s]?:\/\/.+\..{2,}/)) {
 				this.canonicalLink = value;
 			} else {
 				if (value.trim() == '') return;
 				alert(`Error: "${value}" is not a valid canonical link`);
 			}
 		},
 		enableOG: false,
 		"og:title": '',
 		"og:description": '',
 		"og:image": '',
 		"fb:app_id": '',
 		"og:locale": '',
 		"og:url": '',
 		"og:sitename": '',
 		"og:type": 'Website',
 		otherTags: {},
 		animations: [],
 		events: {},
 		addEvent(id, type, callback) {
 			if (!this.events[id]) this.events[id] = {};
 			if (!this.events[id][type]) this.events[id][type] = [];

 			this.events[id][type].push(callback);
 		},
 		project: (function() {
 			return [{
 				type: 'body',
 				name: 'BODY',
 				id: generateId(),
 				props: {
 					innerHTML: '',
 					style: {
 						margin: '0px'
 					},
 					class: [],
 					responsive: resp()
 				},
 				ref: '0',
 				children: []
				}];
 		})(),
 		cssRules: [],
 		externalLinks: []
 	}
 };

 // add missing properties to element objects in project
 function addMissingProps(project) {
 	for (let elem of project) {
 		elem.props.responsive = $.extend(resp(), elem.props.responsive);
 		elem.selected = false;
 		elem.open = false;

 		addMissingProps(elem.children);
 	}
 }

 function checkFilesAndAddMissingProps(files) {
 	for (let file of files) {
 		if (file.type === 'file') {
 			addMissingProps(file.content.project);
 		} else {
 			checkFilesAndAddMissingProps(file.content);
 		}
 	}
 }

 function callVarUpdates(ref) {
 	filesSearch = getFileOrFolder(ref || SPIDER.opened_file, true);
 	currentFile = filesSearch[1];

 	currentFile.addEvent = function(id, type, callback) {
 		if (!this.events[id]) this.events[id] = {};
 		if (!this.events[id][type]) this.events[id][type] = [];

 		this.events[id][type].push(callback);
 	}

 	currentFolder = filesSearch[2];
 	project = currentFile.project;
 	project[0].ref = '0';
 }

 function saveSpiderData(key, value) {
 	if (storageAvailable) {
 		let cache = JSON.parse(localStorage.getItem('spider'));
 		if (key === 'view') {
 			cache.browser_view = value;
 		} else if (key === 'op_file') {
 			cache.opened_file = value;
 		} else if (key === 'theme') {
 			cache.theme = value;
 		}

 		localStorage.setItem('spider', JSON.stringify(cache));
 	}
 }

 let iframe = $('iframe')[0];
 let iframeDoc, projBody, stateStyle, windowWidth, windowHeight, selectedElemWidth, selectedElemHeight;

 const IframeReload = $.Callbacks();
 const ElementUpdate = $.Callbacks();

 window.addEventListener("beforeunload", function(e) {
 	let confirmationMessage = 'It looks like you have been editing something. ' +
 		'If you leave before saving, your changes will be lost.';

 	(e || window.event).returnValue = confirmationMessage; //Gecko + IE

 	return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
 });
	
 const eventsAdder = {
 	animation(names, elem) {
 		iter(names, name => {
 			const anim = currentFile.animations.find(a => a.name == name);
 			
 			if(anim) {
 				let timeline = gsap.timeline();
 				console.log(elem);
 				timeline[anim.start](elem, cloneObj(anim.config));
 			}
 		});
 	},
 }

 function addEventsToElement(id, elem) {
 	for (let event in currentFile.events[id]) {
 		eventsAdder[event](currentFile.events[id][event], elem);
 	}
 }

 /**
  animations: Array(1)
  0: Object
  config: Object
  name: "E"
  start: "to"
  trigger: undefined
  __proto__: Object
  length: 1
  
  encoding: "UTF-8"
  events: Object
  emamIVDgIbgJBRtdLZuxMOBLH: Object
  animation: Array(2)
  0: Object
  1: "E"
  length: 2
  __proto__: Array(2)
  __proto__: Object
  */
 function Undo() {
 	const _oldEdits = [cloneObj(project[0])];
 	let currentIndex = 0;

 	return {
 		addEdit: function() {
 			setTimeout(function() {
 				// TODO:
 				// Save old edits as an object
 				// if type of edit is a property modification,
 				// use {
 				//   type: 'mod',
 				//   condition: 'add || remove || modify',
 				//   prop: variable,
 				//   value: value
 				// }
 				// else if type of edit is the adding or removal of an element
 				// use {
 				//   type: 'new',
 				//   condition: 'add || remove',
 				//   child: variable
 				// }

 				// When adding new edits, make sure we continue from our last undo state and discard any further present redos (by slicing)
 				if (currentIndex < _oldEdits.length - 1) {
 					// I kinda prefer the pop() loop to this slicing
 					//this._oldEdits = this._oldEdits.slice(0, this.currentIndex + 1);
 					for (let i = 0; i < _oldEdits.length - currentIndex; i++) _oldEdits.pop();
 				}

 				_oldEdits.push(cloneObj(project[0]));

 				currentIndex = _oldEdits.length - 1;
 				_oldEdits.length > 100 && _oldEdits.shift();
 			}, 0);
 		},
 		getEdit: function(type) {
 			// if type is truthy, return undo, else redo
 			let returnVal = type ? _oldEdits[--currentIndex] : _oldEdits[++currentIndex];
 			if (currentIndex < 0) currentIndex = 0;
 			if (currentIndex > _oldEdits.length - 1) currentIndex = _oldEdits.length - 1;

 			// Do not remove cloneObj, to avoid overwriting values of current state after undoing, and editing continues
 			return !returnVal ? project[0] : cloneObj(returnVal);
 		}
 	}
 }

 function Dialogue(name) {
 	const outerThis = this;
 	this.name = name;
 	const okBtn = el('button', { textContent: 'Ok', class: 'p-1 font-bold rounded' });

 	okBtn.one('click', function() {
 		outerThis.callback && outerThis.callback();
 		outerThis.closeDialogueListener();
 	});

 	this.myContext = {};

 	const closeProperty = el('button', { id: 'close-property', class: ["p-1", "mb-1"] }, '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" width="1em" height="1em"  xmlns="http://www.w3.org/2000/svg"> <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" /></svg>');

 	closeProperty.one('click', function(e) {
 		outerThis.cancelled && outerThis.cancelled();
 		outerThis.closeDialogueListener(e);
 	});

 	this.closeProperty = closeProperty;

 	this.newDialog = function(main) {
 		// if a dialog exist in the DOM, return
 		if ($('.dialogue').length) return;

 		let body = el('div', { class: 'dialogueMain' },
 			el('div', { class: 'dialogueBody flex flex-col bg-3 p-1' },
 				el('div', { class: 'dialogueTop flex-ac jc-sb bg-3' },
 					el('h2', { textContent: this.name, class: 'w-75 truncate font-bold' }),
 					closeProperty
 				),
 				main || '',
 				el('div', { class: 'p-1 flex jc-fe dialogueFoot bg-3' }, okBtn)
 			)
 		);

 		if (document.fullscreen) {
 			body.css({
 				margin: 'auto',
 				width: '95%'
 			});
 		}

 		outerThis.body = body;

 		outerThis.dialogue = el('div', { class: 'dialogue' }, body);
 		$(document.body).append(outerThis.dialogue);
 	};

 	this.closeDialogueListener = function(e) {
 		outerThis.body.fadeOut('slow', function() {
 			outerThis.dialogue.remove();

 			$('#property').focus();

 			for (let key in outerThis) {
 				outerThis[key] = null;
 			}

 			undo.addEdit();
 		});
 	}
 }