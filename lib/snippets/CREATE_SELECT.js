
export default function CREATE_SELECT(props) {
	let select = el('select', props.attributes);
	let selected = props.selected;
	
	$.each(props.options, (i, value) => {
		if (typeof value == 'string') {
			select.append(new Option(value));
		} else {
			value = Object.keys(value)[0];
			select.append(new Option(value));
		}
	});
	
	if (props.selected) {
		if (typeof props.selected == 'string') {
			let modified;
			for (let option of select) {
				if(option.value == props.selected) {
					option.selected = true;
					modified = true;
				}
			}
			if(!modified) {
				select.prepend(new Option(props.selected, props.selected, true, true))
			}
		} else {
			iter(props.selected, val => {
				for (let option of select[0].options) {
					if(option.value == val) option.selected = true;
				}
			});
		}
	}
	
	!props.ignoreCallback && select.change(props.changeCallback);
	
	return select;
}