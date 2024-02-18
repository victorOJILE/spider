import { _ } from '../utils.js';
import { FaTimes } from '../react-icons/fa/index.js';

export default function Dialogue(name) {
	const outerThis = this;

	const okBtn = el('button', { textContent: 'Ok', class: 'p-1 font-bold rounded' });

	okBtn.one('click', function() {
		outerThis.callback && outerThis.callback();
		outerThis.closeDialogueListener();
	});

	this.myContext = {};

	const closeProperty = el('button', { id: 'close-property', class: ["p-1", "mb-1"] }, $(FaTimes()));

	closeProperty.one('click', function(e) {
		outerThis.cancelled && outerThis.cancelled();
		outerThis.closeDialogueListener(e);
	});

	this.closeProperty = closeProperty;

	this.newDialog = function(main) {
		// if a dialog exist in the DOM, return
		if ($('.dialogue').length)	return;

		let body = el('div', { class: 'dialogueMain' },
			el('div', { class: 'dialogueBody flex flex-col bg-3 p-1' },
				el('div', { class: 'dialogueTop flex-ac jc-sb bg-3' },
					el('h2', { textContent: name, class: 'w-75 truncate' }),
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