
export default function CREATE_TEXTAREA(props) {
	let textarea = el('textarea', { class: 'form-control', ...props.attributes });
	textarea.onchange = props.changeCallback;
	return textarea;
}