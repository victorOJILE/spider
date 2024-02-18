
export default function CREATE_SELECT(props) {
	let select = el('select', props.attributes);
	$.each(props.options, (i, value) => {
		if (typeof value == 'string') {
			select.append(new Option(value, value));
		} else {
			value = Object.keys(value)[0];
			select.append(new Option(value, value));
		}
	});

	if (props.selected) {
		if (typeof props.selected == 'string') {
			for (let option of select) option.value == props.selected && (option.selected = true);
		} else {
			for (let option of select) props.selected.indexOf(option.value) != -1 && (option.selected = true);
		}
	} else {
		select.children().first().attr('selected', true);
	}
	
	select.change(props.changeCallback);
	return select;
}