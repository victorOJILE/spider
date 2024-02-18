import CREATE_SELECT_WITH_LABEL from './CREATE_SELECT_WITH_LABEL.js';


export default function attributeMod(myContext, object, callback) {
	
	const selectAttr = CREATE_SELECT_WITH_LABEL({
		innerText: 'Add attributes:',
		id: 'addAttr',
		class: [],
		selectProps: {
			attributes: {
				class: ['form-select', 'w-1/2'],
				id: 'addAttr',
				multiple: true
			},
			options: object.attributes,
			selected: $.grep(Object.keys(myContext), function(e) { return e != 'innerHTML' }).length && Object.keys(myContext),
			changeCallback(event) {
				renderOptions($.makeArray(event.target.selectedOptions).map(e => e.value));
			}
		}
	});
	
	const attributeConfig = el('div', { class: 'p-2 my-3 border rounded' });

	function renderOptions(arr) {
		attributeConfig.empty();
		
		// reset context
		let newCtx = {};

		// if no attribute was selected before and onchange
	 if (!arr.length) arr = Object.keys(object.attributes[0]);

		for (let val of arr) {
			// if we have selected this value before, add it to the new ctx

			if (myContext[val]) newCtx[val] = myContext[val];

			let obj = object.attributes.find(e => Object.keys(e)[0] == val);

			if (!obj) continue;

			let selectedOption;

			// Check the type of input
			if ($.isArray(obj[val])) {
				// If we want to select from options
				
				newCtx[val] = myContext[val] || obj[val][0];
				
				selectedOption = CREATE_SELECT_WITH_LABEL({
					innerText: val + ":",
					id: val,
					class: [],
					selectProps: {
						attributes: {
							class: ['form-select', 'w-1/2'],
							id: val
						},
						options: obj[val],
						selected: myContext[val],
						changeCallback: function(e) {
							myContext[val] = $(e.target).val();
							callback && callback(myContext);
						}
					}
				});
			} else if (obj[val] == 2) {
				selectedOption = el('div', { class: 'my-2' },
					el('label', { textContent: val + ":", htmlFor: val }),
					el('input', {
						type: 'text',
						class: 'form-control w-full',
						event: {
							change: function(e) { myContext[val] = $.trim($(e.target).val());
								callback && callback(myContext)
							}
						},
						id: val,
						value: myContext[val] || ''
					})
				);
			} else {
				selectedOption = el('div', { class: 'mb-2' },
					el('label', { textContent: val + ":", htmlFor: val, class: 'block' }),
					el('textarea', {
						id: val,
						class: 'form-control w-full',
						textContent: myContext[val] || '',
						rows: 3,
						event: {
							change: function(e) {
								myContext[val] = $(e.target).val();
								callback && callback(myContext);
							}
						}
					})
				);
			}
			attributeConfig.append(selectedOption);
		}
		
		// Add innerHTML text to the newCtx
		newCtx.innerHTML = myContext.innerHTML || '';

		for (let key in myContext)	delete myContext[key];

		for (let key in newCtx)	myContext[key] = newCtx[key];
		
		callback && callback(myContext, true);
	}
	
	renderOptions(Object.keys(myContext));

	return {
		attributesElement: el('div', {},
			selectAttr,
			el('small', { class: 'block pt-1 text-right' },
				el('span', { innerHTML: 'Click &#128070; to add or remove attributes.' })
			),
			attributeConfig
		),
		refresh: renderOptions
	}
}