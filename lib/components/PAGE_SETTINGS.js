import { _, FEATURES } from '../utils.js';
import TabPanel from '../snippets/TabPanel.js';
import { attr } from '../data.js';
import CREATE_SELECT_COMP from '../snippets/CREATE_SELECT_COMP.js';
import CREATE_RANGE_COMP from '../snippets/CREATE_RANGE_COMP.js';
import { FaInfoCircle, FaPlus } from '../react-icons/fa/index.js';

export default function NewPageDialogue(name, opt) {
	// opt - if this is called by edit page info feature.
	// it holds a string "edit" or undefined if called by New

	this.__proto__ = new Dialogue(name);

	this.__proto__.myContext = opt ? cloneObj(currentFile) : NewFile();

	const dialogueSection = el('section', {
		class: 'p-2 newFDialog bg-2',
		style: {
			height: '350px',
			overflow: 'auto'
		}
	});

	const section = TabPanel({
		tabProps: { class: 'newFDialogHead' },
		tabs: ['Main', 'Page view', 'Open Graph'],
		section: dialogueSection,
		tabsBtnCls: ['p-1', 'px-3'],
		activeTab: 0,
		clickUpdCls: 'bg-2',
		callback: tabUpdate
	});

	// Append to the DOM
	this.newDialog(section);

	const outerThis = this;

	function receiveInput(tag, section) {
		let par;
		const value = !opt ? null : outerThis.myContext?.[tag.id];
		if (tag.meth == 'textarea') {
			const textarea = el('textarea', {
				class: 'form-control w-full',
				id: tag.id,
				name: tag.id,
				rows: tag.rows,
				value: value || '',
				event: {
					change: function(e) {
						outerThis.myContext[tag.id] = $(this).val();
					}
				}
			});

			if (tag.placeholder) textarea.prop('placeholder', tag.placeholder);

			par = el('div', 0, el('div', { class: 'pt-3' },
					el('label', { htmlFor: tag.id, class: 'pb-1', textContent: tag.alias }),
				),
				textarea
			);

			if (tag.info) {
				par.append(el('small', { class: 'text-yellow-500' }, $(FaInfoCircle({ class: 'mx-2' })), tag.info));
			}
			section.append(par);
			if (tag.break) section.append(el('hr', { class: 'my-5' }));
		} else {
			section.append(CREATE_SELECT_COMP(tag, par, outerThis.myContext, value));
			if (tag.break) section.append(el('hr', { class: 'my-5' }));
		}
	}

	function tabUpdate(button) {
		const tabText = button.text();

		if (dialogueSection.children().last().attr('name') === tabText) return;
		if (actions[tabText + 'Comp']) {
			dialogueSection[0].empty();
			dialogueSection.append(actions[tabText + 'Comp']);

			return;
		}
		actions[tabText]();
	}

	const actions = {
		'Main'() {
			let tags = [{
					alias: 'Title:',
					id: 'title',
					placeholder: 'Enter a title for your webpage!',
					meth: 'textarea',
					rows: '2'
      },
				{
					alias: 'Description:',
					id: 'description',
					placeholder: 'Enter a brief description about your webpage!',
					meth: 'textarea',
					rows: '3'
      },
				{
					alias: 'Canonical link',
					id: 'canonical',
					placeholder: 'This tells search engines the preferred URL for the page',
					meth: 'textarea',
					rows: '2',
					info: 'This helps prevent duplicate content issues and ensures that the correct page is indexed.',
					break: true
      },
				{
					alias: 'Encoding:',
					id: 'encoding',
					attr: {
						charset: attr.charset
					},
					meth: 'option'
      },
				{
					alias: 'Language:',
					id: 'language',
					attr: {
						lang: attr.lang.map(e => Object.values(e))
					},
					innerText: attr.lang.map(e => Object.keys(e)),
					meth: 'option'
      },
				{
					alias: 'Internet Explorer view:',
					id: 'IE_view',
					attr: {
						content: ["IE=edge,chrome=1", "IE=edge", "IE=9", "IE=EmulateIE9", "IE=8", "IE=EmulateIE8", "IE=7", "IE=EmulateIE7", "IE=5"]
					},
					meth: 'option',
					break: true
      }
      ];

			const form = el('form', { name: 'Main' });

			dialogueSection.append(form);

			iter(tags, function(tag) { receiveInput(tag, form) });

			let addTagBtn = el('btn', { class: 'btn btn-primary', title: 'Add head section tag' }, $(FaPlus()));

			let otherTagsCount = 0;

			function addTagFunc() {
				let textarea = el('textarea', { class: 'form-control', rows: '2', placeholder: 'e.g <link rel="alternate" type="application/atom+xml" href="posts.xml" title="Blog" />', value: outerThis.myContext.otherTags[otherTagsCount] || '', style: { width: "100%" } });
				textarea.data('tagIndex', otherTagsCount);
				textarea.change(function(e) {
					outerThis.myContext.otherTags[textarea.data().tagIndex] = $(this).val();
				});

				let tag = el('div', 0, el('div', { class: 'pt-3' },
						el('label', { class: 'pb-1', textContent: 'Add head section tag' }),
					),
					textarea
				);
				otherTagsCount++;

				return tag;
			}

			addTagBtn.click(function() {
				addTagBtn.prepend(addTagFunc());
			});

			form.append(addTagFunc());
			form.append(addTagBtn);
			this.MainComp = form;
		},
		'Page view'() {
			let props = [
				{
					alias: 'Viewport width:',
					id: 'vw_width',
					attr: {
						content: ['device-width']
					},
					meth: 'input'
      },
				{
					alias: 'Viewport height:',
					id: 'vh_height',
					attr: {
						content: ['device-height']
					},
					meth: 'input'
      },
				{
					alias: 'Viewport initial scale:',
					name: 'ini_scale',
					meth: 'range',
					min: 0,
					max: 10,
					step: 0.01,
					value: 1.0
      },
				{
					alias: 'Viewport minimum scale:',
					name: 'min_scale',
					meth: 'range',
					min: 0,
					max: 10,
					step: 0.01,
					value: 0.1
      },
				{
					alias: 'Viewport maximum scale:',
					name: 'max_scale',
					meth: 'range',
					min: 0,
					max: 10,
					step: 0.01,
					value: 10
      },
				{
					alias: 'User scalable:',
					id: 'user_sc',
					attr: {
						content: ['yes', 'no', '0', '1']
					},
					meth: 'opt'
      },
				{
					alias: 'Interactive widget:',
					attr: {
						content: ['resizes-visual', 'resizes-content', 'overlays-content']
					},
					meth: 'opt'
      }
     ];
			const form = el('form', { class: 'py-2', name: 'Page view' });

			$.each(props, (i, tag) => {
				let par;
				const value = !opt ? null : outerThis.myContext?.[tag.id];
				if (tag.meth == 'input') {
					let input = el('input', { type: 'text', class: 'form-control cols-span-1', id: tag.id, defaultValue: outerThis.myContext[tag.id] || '', value: outerThis.myContext[tag.id] || '' });

					input.change(function(e) { outerThis.myContext[tag.id] = $(this).val() });

					form.append(el('div', { class: 'my-1 grid grid-cols-2' }, el('label', { htmlFor: tag.id, textContent: tag.alias, class: 'cols-span-1' }), input));

				} else if (tag.meth == 'opt') {
					form.append(CREATE_SELECT_COMP(tag, par, outerThis.myContext, value));

				} else {
					let value2 = !opt ? null : outerThis.myContext?.[tag.name];
					if (value2) tag.value = value2;

					form.append(
						el('div', { class: 'flex-ajsb' },
							el('label', { htmlFor: tag.name, textContent: tag.alias }),
							new CREATE_RANGE_COMP(tag, function(val) {
								outerThis.myContext[tag.name] = val;
							})));
				}
			});

			const reset = el('input', { type: 'reset', class: 'mt-4 btn btn-outline-success' });
			/*
			    reset.onclick = () => {
			     let ranges = $.grep(Array.from(section.getElementsByTagName('input')), each => each.name);
			     let outputs = Array.from(section.getElementsByTagName('output'));
			     ranges.forEach((input, ind) => {
			      let initialValue = props.find(obj => obj.name == input.name).value;
			      input.value = initialValue;
			      outputs[ind].text(initialValue);
			      outerThis.myContext[input.name] = initialValue;
			     });
			    }
			*/
			form.append(reset);

			dialogueSection.empty();
			dialogueSection.append(form);

			this['Page viewComp'] = form;
		},
		'Open Graph'() {
			const tags = [{
					alias: 'OG title:',
					id: 'og:title',
					meth: 'textarea',
					placeholder: 'An alternative title for your webpage to be shown when linked on Facebook.',
					rows: '2'
     },
				{
					alias: 'OG description:',
					id: 'og:description',
					meth: 'textarea',
					placeholder: 'An alternative description for your webpage to be shown when linked on Facebook',
					rows: '3'
     },
				{
					alias: 'Facebook appID:',
					id: 'fb:app_id',
					meth: 'textarea',
					rows: '2',
     },
				{
					alias: 'Open Graph type:',
					id: 'og:type',
					attr: {
						type: ['Website', 'Article']
					},
					innerText: ['website', 'article'],
					meth: 'option'
     },
				{
					alias: 'Open Graph locale:',
					id: 'og:locale',
					attr: {
						locale: attr.lang.map(e => Object.values(e))
					},
					innerText: attr.lang.map(e => Object.keys(e)),
					meth: 'option',
					info: 'Default value "en-US" won\'t be added to your webpage!'
     }
    ];

			const form = el('form', { name: 'Open Graph' });

			dialogueSection.empty();
			dialogueSection.append(form);

			let trigger = el('input', { class: 'form-check-input', type: 'checkbox' });

			let triggerParent = el('div', { class: 'custom-control form-switch', role: 'switch' }, trigger);

			if (outerThis.myContext.enableOG) trigger.prop('checked', true);

			function enableOGCallback() {
				if (outerThis.myContext.enableOG) {
					$('textarea', form).removeAttr('disabled');

					$('select', form).removeAttr('disabled');
				} else {
					$('textarea', form).attr('disabled', true);

					$('select', form).attr('disabled', true);
				}
			};

			trigger.change(function(e) {
				outerThis.myContext.enableOG = $(this).prop('checked');
				enableOGCallback();
			});

			let switchParent = el('div', { class: 'flex jc-sb p-2 bg-blue-500 text-light rounded my-3' }, el('label', { htmlFor: 'enableOG', textContent: 'Enable open graph tags' }), triggerParent);
			form.append(switchParent, el('hr'));

			iter(tags, function(tag) { receiveInput(tag, form) });
			enableOGCallback();

			this['Open GraphComp'] = form;
		}
	};

	actions.Main();
	// this.callback: This function runs when the ok button is clicked. It is added to the Dialogue class
	this.__proto__.callback = function() {
		let titleElem = $('#page-title');
		if (titleElem.innerWidth() < 300) {
			titleElem.text('');
			titleElem = $('#page-title2');
		}

		if (!opt) {
			let f = NewFile();
			f = $.extend(f, this.myContext);

			currentFolder.content.push({
				content: f,
				name: f.title,
				type: 'file'
			});

			updateFileOrFolderRef(files);

			SPIDER.opened_file = last(currentFolder.content).ref;

			callVarUpdates();

			titleElem.text(currentFile.title);

			_.RE_RENDER_DOM_SELECTORS();

			FEATURES.Save();

			iframeDoc.location.reload();
		} else {
			currentFile = $.extend(currentFile, outerThis.myContext);
			titleElem.text(outerThis.myContext.title);

			filesSearch[0].name = outerThis.myContext.title;
			FEATURES.Save();
		}
	}

	return this.closeProperty;
}