import { _, loadFeature } from '../utils.js';
import { generateAttributes } from '../data.js';
import CREATE_SELECT_WITH_LABEL from '../snippets/CREATE_SELECT_WITH_LABEL.js';
import { BsTextareaT } from '../react-icons/bs/index.js';
import AttributeMod from '../snippets/attributeMod.js';

export default function CREATE_NEW_ELEMENT_COMP(object, checkProperties) {
	if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
	
	let isMedia = ACTIVE_ELEM.type.match(/img|audio|video/);
	if(isMedia) {
		let url = isMedia[0] == 'img' ? 'IMAGE' : isMedia[0] == 'audio' ? 'AUDIO' : 'VIDEO';
		
		loadFeature(`components/UPLOAD_${url}.js`);
		
		return;
	}
	
	this.__proto__ = new Dialogue(object.name);

	this.__proto__myContext = typeof object.def == 'object' ? object.def : {};

	const outerThis = this;

	this.__proto__.callback = function() {
		// When the user clicks ok
		let ctx = outerThis.myContext;

		// if we are updating the properties of an existing element (not creating a new one)
		if (checkProperties) {
			ACTIVE_ELEM.name = object.name;

			let oldStyle = ACTIVE_ELEM.props.style;
			let oldResp = ACTIVE_ELEM.props.responsive;

			if ('class' in ctx) {
				// We stringify this because
				// the element may have a className before, and when editing,
				// the user may not edit the class field, to set myContext.class to a string value on change

				ctx.class = String(ctx.class);
				if (ctx.class.includes(',')) {
					ctx.class = ctx.class.trim().replace(/[,]/g, ' ');
				}
				let e = el('div', { class: ctx.class })[0];

				ctx.class = Object.values(e.classList);
			} else {
				ctx.class = [];
			}

			ACTIVE_ELEM.props = $.extend(ctx, { style: oldStyle, responsive: oldResp });

			if (!ACTIVE_ELEM.props.innerHTML) ACTIVE_ELEM.props.innerHTML = '';
			_.UPDATE_DOM_ELEMENT();

			_.RE_RENDER_DOM_SELECTORS(); // To update innerHTML's on the tree tab

			return;
		} else {
			if (!ctx.innerHTML) ctx.innerHTML = '';
			ctx.style = ctx.style || {};
			if (ctx.class) {
				if (ctx.class.includes(',')) {
					ctx.class = $.trim(ctx.class).replace(/[,]/g, ' ');
				}

				let e = el('div', { class: ctx.class })[0];

				ctx.class = Object.values(e.classList);
			} else {
				ctx.class = [];
			}
		}

		let newElem = {
			type: object.type,
			name: object.name,
			props: ctx
		};
		
		if(object.cannotHaveChildren) newElem.cannotHaveChildren = true;
		
		_.INSERT_NEW_ELEMENT(newElem);
	}

	let main = el('form', { class: 'propsFormatDiv p-2 bg-2' });

	let textarea = el('textarea', {
		placeholder: 'Enter a text for this element. You can always edit it later.',
		class: 'form-control ml-2 w-full',
		id: 'innerHTML',
		rows: 4,
		event: {
			change: function(e) { outerThis.myContext.innerHTML = $(e.target).val() }
		}
	});

	let elementName;
	if (checkProperties) {
		let obj = ACTIVE_ELEM;
		object.type = obj.type;
		object.name = obj.name;
		object.cannotHaveChildren = obj.cannotHaveChildren;
		object.attributes = generateAttributes(obj.type);
		textarea.val(obj.props.innerHTML || '');
		elementName = obj.name || '';

		this.__proto__.myContext = $.extend(this.myContext, obj.props);
		this.__proto__.name = obj.name;
	}

	textarea = el('div', { class: 'flex' },
		$(BsTextareaT({ width: '1.8em' })),
		textarea
	);

	let elemName = el('div', { class: 'my-2' },
		el('label', { textContent: 'Element name:', htmlFor: 'elemName' }),
		el('input', {
			type: 'text',
			class: 'form-control w-full',
			event: {
				change: function(e) { object.name = $.trim($(e.target).val()) }
			},
			id: 'elemName',
			value: elementName || object.name
		})
	);

	// The select option for changing attributes
	const { attributesElement } = AttributeMod(this.myContext, object);
 // TODO:
 // Still adding the textarea when modifying svg spans
 // should be hidden/absent
	
	main.append(elemName, !object.cannotHaveChildren && textarea);

	main.append(attributesElement);

	// append to the DOM (to the dialog)
	this.newDialog(main);
}