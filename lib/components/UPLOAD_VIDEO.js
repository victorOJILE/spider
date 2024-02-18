import { generateAttributes } from '../data.js';
import TabPanel from '../snippets/TabPanel.js';
import mediaSubmit from '../snippets/uploadMediaSubmit.js';
import AttributeMod from '../snippets/attributeMod.js';
import VideoComp from '../snippets/mediaUpload.js';
import { FaInfoCircle } from '../react-icons/fa/index.js';

export default function UplaodVideo() {
	if (!ACTIVE_ELEM.ref) return alert('Please select an element!');
	
	this.__proto__ = new Dialogue('Video');
	
	const object = {
		type: 'video',
		name: 'Video',
		attributes: generateAttributes('video')
	}

	const outerThis = this;
	
	let mySrc, formattedSrc;
	
	this.__proto__.callback = function() {
		mediaSubmit(outerThis.myContext, mySrc, 'video', object.name);
	}
	
	let elementName;
	
	if (ACTIVE_ELEM.type == 'video') {
		elementName = ACTIVE_ELEM.name;
		object.name = ACTIVE_ELEM.name;
	
		mySrc = ACTIVE_ELEM.props.src;
	
		$.extend(this.__proto__.myContext, ACTIVE_ELEM.props);
	}
	
	const { attributesElement } = AttributeMod(this.myContext, object);
	
	const media = el('video', { src: mySrc, controls: true });
			
	const mediaUrl = el('input', { class: 'form-control col-span-2', placeholder: 'Paste video url here', value: mySrc, event: {
		keyup(e) {
			mySrc = e.target.value;
		}
	} });
	
	const LayoutController = {
		section: el('form', { class: 'propsFormatDiv bg-2' }),
		active: 'Properties',
		Properties() {
			if(this.properties) {
				media.attr('src', mySrc);
				this.section.append(this.properties);
				return;
			}
			
			const div = el('div');
			
			const elemName = el('div', { class: 'my-2' },
				el('label', { class: 'grid grid-cols-3 items-center', textContent: 'Element name:', htmlFor: 'elemName' },
					el('input', {
						type: 'text',
						class: 'form-control col-span-2',
						event: {
							change: function(e) { object.name = $.trim($(e.target).val()) }
						},
						id: 'elemName',
						value: elementName || 'Video'
					})
				)
			);
		
			const inputComp = VideoComp('video', { class: 'form-control col-span-1' }, function(e, name) {
				if (e) {
					let url = typeof e == 'string' ? e : e.target.result;
					
					media.attr('src', url);
					
					mediaUrl.val(name);
					
					mySrc = url;
				} else {
					alert('Attempting to upload a different or invalid media type!\n\nPlease upload a valid video file');
				}
			});
			
			div.append(
				el('div', { class: 'p-2 text-center', style: { maxHeight: '300px', overflow: 'auto' } }, media),
				elemName,
				el('div', { class: 'grid grid-cols-3 relative' },
					inputComp,
					mediaUrl,
					el('span', { class: 'absolute top-1/2 right-5 transform -translate-y-1/2 text-yellow-600' },
						el('div', { class: 'dropdown' },
							FaInfoCircle(),
							el('div', { class: 'menu right-0', style: { padding: '0.75rem' } }, "Note: Editing this field directly by typing in or pasting, will set the entered value as the url to the image!")
						)
					)
				),
				attributesElement
			);
			
			this.section.append(div);
			
			this.properties = div;
		},
		Options() {
			if(this.options) {
				this.section.append(this.options);
				return;
			}
			
			const div = el('div');
			
			this.section.append(div);
			
			this.options = div;
		}
	}
	
	const panel = TabPanel({
		tabProps: { class: 'bg-1' },
		tabs: ['Properties', 'Options'],
		section: LayoutController.section,
		tabsBtnCls: ['py-2', 'px-3'],
		clickUpdCls: 'bg-2',
		activeTab: 0,
		callback: function(btn) {
			if (btn.text() == LayoutController.active) return;
			LayoutController.active = btn.text();
			LayoutController.section[0].empty();
			
			LayoutController[btn.text()]();
		}
	});
	
	LayoutController[LayoutController.active]();
	
	// append to the DOM (to the dialog)
	this.newDialog(panel);

	return this.closeProperty;
}