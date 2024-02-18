import { _ } from '../utils.js';
import * as fa from '../react-icons/fa/index.js';
import * as bs from '../react-icons/bs/index.js';
import * as ai from '../react-icons/ai/index.js';

const List = (value, path) => el('li', { data: { path, value } }, el('button', { type: 'button', class: 'p-1 w-full text-left truncate border-0', textContent: value }));

let iconsList = [
	{
		name: 'Web Applications',
		list: '../spider-icons/web_apps.js'
	},
	{
		name: 'Media Icons',
		list: '../spider-icons/media.js'
	},
	{
		name: 'Arrows',
		list: '../spider-icons/arrows.js'
	},
	{
		name: 'Emojis & Gestures',
		list: '../spider-icons/emojis.js'
	},
	{
		name: 'Messaging',
		list: '../spider-icons/messaging.js'
	}
];

let iconsLibrary = {
	Fa: fa,
	Bs: bs,
	Ai: ai
};

export default function Icons(name) {
	this.__proto__ = new Dialogue('Icons');
	const iconSection = el('div',
		{ class: 'propsFormatDiv p-3' }, el('div', { class: 'text-center flex-ajc h-56', innerHTML: `<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="2em" height="2em" xmlns="http://www.w3.org/2000/svg">
 		<path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z" />
		</svg>` }));

	const outerThis = this;

	let menu = el('ul', {
		id: 'propsProps',
		event: {
			click: async function(e) {
				let li = getParentElem(e.target, 'li', 'ul');
				if (li && $(li).data().value == menu.data().active) return;

				if (li) {
					li = $(li);
					try {
						const list = await import(li.data().path);

						menu.children().removeClass('active-dialogueSidebarLi');

						li.addClass('active-dialogueSidebarLi');

						URL.revokeObjectURL(new URL(`${location.origin}/lib${li.data().path.slice(2)}`));

						menu.data('active', li.data().value);

						outerThis.component(list.default);
					} catch (e) {
						console.error(e);
					}
				}
			}
		}
	});

	iter(iconsList, list => menu.append(List(list.name, list.list)));
	
	iconsList = null;
	
	setTimeout(() => menu.children().first().click(), 300);

	this.newDialog(
		el('div', { class: 'flex flex-grow bg-1' },
			el('div', { class: 'dialogueSidebar' },
				el('div', { class: 'propsPropsParent px-1 my-2' }, menu)
			),
			el('div', { class: 'flex-grow' }, iconSection)
		)
	);

	this.component = function(list) {
		iconSection.empty();
		iconSection.scrollTop(0);

		let ul = el('ul', {
			class: 'grid grid-cols-3 text-center text-xs',
			event: {
				click: function(e) { outerThis.editIcon($(getParentElem(e.target, 'li', 'ul'))) }
			}
		});

		iconSection.append(ul);

		iter(list, function(ico) {
			let object = iconsLibrary[ico.slice(0, 2)];

			if (!object) {
				outerThis.useEmoji(ul, ico);
			} else {
				object[ico] && ul.append(
					el('li', { class: 'p-2 rounded-sm hover:bg-gray-800', data: { name: ico } },
						$(object[ico]({ width: '2em' })),
						el('div', { class: 'truncate' }, ico.slice(2))
					)
				);
			}
		});
	}
	
	this.useEmoji = function(ul, ico) {
		ul.append(
			el('li', { class: 'p-2 rounded-sm hover:bg-gray-800', data: { name: ico } },
				el('span', { innerHTML: ico, class: 'text-lg' })
			)
		);
	}
	
	this.editIcon = function(ico) {
		let object = iconsLibrary[ico.data().name.slice(0, 2)];

		SPIDER.clipboard = {
			type: 'span',
			name: !object ? 'Emoji' : ico.data().name.slice(2),
			props: {
				innerHTML: !object ? ico.data().name : object[ico.data().name](),
				class: [],
				responsive: resp(),
				style: {}
			},
			ref: '0',
			id: generateId(),
			children: [],
			cannotHaveChildren: true
		};

		alert('Copied!');
	}

	return this.closeProperty;
}