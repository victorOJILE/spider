import { _ } from '../utils.js';
import {
	FaMobileAlt,
	FaSquareFull,
	FaChevronLeft,
	FaChevronRight,
	FaExchangeAlt,
	FaSyncAlt,
	
} from '../react-icons/fa/index.js';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from '../react-icons/ai/index.js';
import { BsFonts } from '../react-icons/bs/index.js'

export default function footer() {
	let footer =	$('footer');
	
	footer.append(
		el('div', 
		{ class: 'flex al-str mx-1 text-info whitespace-nowrap' },
		el('div', { class: 'flex al-cent px-2', style: { borderRight: '1px solid gray' } },
			el('span', { id: 'current-view', title: 'Page view', class: 'px-1' }, $(FaMobileAlt({ width: '1.4em' }))),
			el('div', { style: { fontSize: '0.55rem' } },
				el('span', { id: 'windowWidth', class: 'mx-1', title: 'Window width', textContent: '0' }),
				el('span', { textContent: ' - ' }),
				el('span', { id: 'windowHeight', class: 'mx-1 mr-3', title: 'Window height', textContent: '0' })
			)
		),
		el('div', { class: 'flex al-cent jc-cent px-2' },
			$(FaSquareFull({ width: '1.4em', title: 'Selected element', class: 'px-1' })),
			el('div', { style: { fontSize: '0.55rem' } },
				el('span', { id: 'selectedElemWidth', class: 'mx-1', title: 'Selected element width', textContent: '0' }),
				el('span', { textContent: ' - ' }),
				el('span', { id: "selectedElemHeight", class: "mx-1 mr-3", title: "Selected element height", textContent: '0' })
			)
		)
	)
	);
	
	footer.append(
	el('div', { id: 'page-title2', class: 'truncate flex-grow text-center' }),
	el('div',	{ class: 'flex-ac justify-around', style: { minWidth: '18rem' } },
		el('span', {
				title: 'Select previous parent element',
				event: {
					click: function() {
						if(ACTIVE_ELEM.ref == '0') return;
						
						_.SELECT_OBJECT(_.getElementObj(ACTIVE_ELEM.ref, -2));
					}
				}
			},
			$(AiOutlineDoubleLeft({ width: '1.7em' }))
		),
		el('span', {
				title: 'Select previous sibling element',
				event: {
					click: function() {
						let elem = _.getElementObj(ACTIVE_ELEM.ref, -1);
						if(elem.ref == ACTIVE_ELEM.ref) return;
						_.SELECT_OBJECT(elem);
					}
				}
			},
			$(FaChevronLeft({ width: '1.5em' }))
		),
		el('span', {
				title: 'Select next sibling element',
				event: {
					click: function() {
						let elem = _.getElementObj(ACTIVE_ELEM.ref, -1);
						if(elem.ref == ACTIVE_ELEM.ref) return;
						_.SELECT_OBJECT(_.getElementObj(ACTIVE_ELEM.ref, 1));
					}
				}
			},
			$(FaChevronRight({ width: '1.5em' }))
		),
		el('span', {
				title: 'Select next parent element',
				event: {
					click: function() {
						if(!ACTIVE_ELEM.children.length) return;
						_.SELECT_OBJECT(_.getElementObj(ACTIVE_ELEM.ref, 2));
					}
				}
			},
			$(AiOutlineDoubleRight({ width: '1.7em' }))
		),
		el('span', 
			{
				class: 'px-2',
				title: 'Add or edit text',
				event: {
					click: function() {
					 if(ACTIVE_ELEM.cannotHaveChildren) return;
						if (ACTIVE_ELEM.children.length) return alert('Cannot edit an element that has children!');
						let dialogue = new Dialogue('Enter new text');
						let elemObj = ACTIVE_ELEM.props;
						let textarea = el('textarea', {
							value: elemObj.innerHTML || '',
							placeholder: 'Type text here',
							class: 'form-control my-3 w-full',
							event: {
								input: function() {
									$(ACTIVE_DOM_ELEM).html($(this).val());
								}
							}
						});
						
						dialogue.newDialog(el('div', { class: 'bg-1' }, textarea));
						
						$('.dialogueMain').css({ minHeight: 'auto' });
						
						textarea.select();
						
						dialogue.callback = function() {
							elemObj.innerHTML = $(textarea).val();
							_.RE_RENDER_DOM_SELECTORS();
						}
						dialogue.cancelled = function() {
							$(ACTIVE_DOM_ELEM).html(elemObj.innerHTML);
						}
					}
				}
			},
			$(BsFonts({ width: '1.8em' }))
		),
		el('span', { title: 'Toggle collapse', event: {
			click: function() {
				if(ACTIVE_ELEM.cannotHaveChildren) return alert('No children!');
				ACTIVE_ELEM.open = !ACTIVE_ELEM.open;
				_.RE_RENDER_DOM_SELECTORS();
			}
		} },
			$(FaExchangeAlt({ width: '1.3em', style: 'transform: rotate(90deg)' }))
		),
		el('span', {
				title: 'Refresh project',
				event: {
					click: function() {
						iframeDoc.location.reload();
					}
				}
			},
			FaSyncAlt({ width: '1.3em' })
		)
	));
}
