import { _, FEATURES } from './utils.js';
import CREATE_NEW_ELEMENT_COMP from './components/CREATE_NEW_ELEMENT_COMP.js';
import PropertyDialogue from './components/PROPERTY_DIALOGUE.js';
import {
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

/**
 * Create iframe DOM tree (elements) out of project object
 * appends result to the provided parent element
 * @returns {Element}
 */
export const cEl2 = function(parent, elem) {
	for (let child of elem) {
		let newParent = el2(child.type, child.props);
		
		Object.defineProperty(newParent, 'ref', {
			value: child.ref,
			writable: true
		});
		
		parent.append(newParent);

		child.children.length && cEl2(newParent, child.children);
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
		return cEl2(projBody, obj.children);
	}
	
	let parent = el2(obj.type, obj.props);

	Object.defineProperty(parent, 'ref', {
		value: obj.ref,
		writable: true
	});

	obj.children.length && cEl2(parent, obj.children);

	return parent || '';
}

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

let actionsArrEvProto = {
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
		FEATURES.Remove();
	},
	'Paste before'() {
		if (!ACTIVE_ELEM.ref) return
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
		if (ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');;
		if (!confirm("Are you sure you want to remove this element's children?")) return;

		while(ACTIVE_ELEM.children.length) ACTIVE_ELEM.children.pop(); // Remove all children
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
	'Save as snippet'() {
		alert('Under construction!');
	},
	'Properties'(ref) {
		new CREATE_NEW_ELEMENT_COMP({}, ref);
	}
}


/**
 * Create DOM Tab illustration tree out of project object
 * @param {Element} parent A parent element for the function to append its element(s) tree to.
 * @param {object} elem A projectObject
 * @param {Boolean} notFirstParent 
 */

const vellipDrop = el('ul', { class: 'menu right-0 font-normal' });

export const cEl4 = function(parent, elem, notFirstParent) {
	iter(elem, child => {
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
		}

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

						if (dataset.cannotHaveChildren && (name === 'Remove children' || name === 'Toggle visibility' || name == 'Paste' || name == 'Paste before')) continue;

						if (dataset.elemLen < 2 && name === 'Swap position') continue;

						let li = el('li', { class: 'p-1 px-2', data: { ref: dataset.ref, text: name } }, el('span', { class: 'icon' }, $(each.icon)), el('span', { textContent: name }));
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

		let newParentClose = el('div', { textContent: `${child.name || child.type.capitalize()}`, style: { paddingLeft: '10px', marginBottom: '1px' }, class: `elemNameDiv${child.selected ? ' bg-selected' : ''}` });

		!child.cannotHaveChildren && parent.append(newParentClose);

		if (child.children.length && child.open) {
			newParentClose.before(cEl4(innerParent, child.children, true));
		}
	});

	return parent || '';
}