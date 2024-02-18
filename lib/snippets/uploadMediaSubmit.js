import { _ } from '../utils.js';

export default function mediaSubmit(ctx, mySrc, elemType, elemName) { // When the user clicks ok

	ctx.src = mySrc;
	// if we are updating the properties of an existing element (not creating a new one)
	if (ACTIVE_ELEM.type == elemType) {
		ACTIVE_ELEM.name = elemName;

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

		_.UPDATE_DOM_ELEMENT();

		_.RE_RENDER_DOM_SELECTORS(); // To update innerHTML's on the tree tab

		return;
	}

	ctx.style = {};
	if (ctx.class) {
		if (ctx.class.includes(',')) {
			ctx.class = $.trim(ctx.class).replace(/[,]/g, ' ');
		}

		try {
			let e = el('div', { class: ctx.class })[0];

			ctx.class = Object.values(e.classList);
		} catch (e) {

		}
	} else {
		ctx.class = [];
	}

	let newElem = {
		type: elemType,
		name: elemName,
		props: ctx,
		cannotHaveChildren: true
	}
	
	_.INSERT_NEW_ELEMENT(newElem);
}