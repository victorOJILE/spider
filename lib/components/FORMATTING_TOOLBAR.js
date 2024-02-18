import { _, FEATURES } from '../utils.js';
import {
 FaAngleDoubleDown,
	FaAlignJustify,
	FaItalic,
 FaSave,
 FaFileAlt,
 FaTrashAlt,
 FaFolder,
 FaMoon,
 FaSun,
 FaMobileAlt,
 FaTabletAlt,
 FaLaptop,
 FaUndo,
 FaRedo,
 
} from '../react-icons/fa/index.js';
import {
 AiOutlineAlignLeft,
 AiOutlineAlignRight,
 AiOutlineAlignCenter,
 AiOutlineFontSize,
 AiFillLayout,
 
} from '../react-icons/ai/index.js';
import {
	BsFileEarmarkPlusFill,
	BsType,
	BsTypeUnderline,
	BsTypeItalic,
	BsTypeBold,
	BsJustify,
	BsTrash3Fill,
	BsFolderPlus
} from '../react-icons/bs/index.js';

export default function F() {
	const formattingToolBar = $('#formatting-toolbar');
 
 const flexBoxBar = (
  `<div class="flex al-cent flex-controls boundaryBorder" style="fill: #A3A4AC;stroke: #A3A4AC;stroke-linecap: round;stroke-linejoin: round">
      <span class="p-1 flex al-cent" data-prop="display" data-value="flex" title="Make a flex container.">
       <svg stroke="currentColor" fill="currentColor" style="width: 1.2rem" viewBox="0 -2 20 20">
        <g fill="none" stroke-width="1">
         <path d="M2 3L17 3 L15 2L17 3L15 4" />
         <rect x="0" y="30%" width="100%" height="60%" />
        </g>
        <g>
         <rect x="2" y="10" width="3" height="4" />
         <rect x="7" y="10" width="3" height="4" />
         <rect x="12" y="10" width="3" height="4" />
         <rect x="17" y="10" width="3" height="4" />
        </g>
        <g stroke="black" stroke-width="1" style="font-size: 3px">
         <text x="3" y="13">1</text>
         <text x="8" y="13">2</text>
         <text x="13" y="13">3</text>
         <text x="18" y="13">4</text>
        </g>
       </svg>
      </span>
      <span class="p-1 flex al-cent" data-prop="flexDirection" data-value="column" title="Column. Makes all children of a flex container stack on top of each other.">
       <svg stroke="currentColor" style="width: 1.2rem" viewBox="0 -2 20 20">
        <g fill="none" stroke-width="1">
         <path d="M3 2L3 17 L4 15L3 17L2 15" />
         <rect x="30%" y="0" width="60%" height="90%" />
        </g>
        <g>
         <rect x="38%" y="2" width="3" height="3" />
         <rect x="38%" y="7" width="3" height="3" />
         <rect x="38%" y="12" width="3" height="3" />
         <rect x="38%" y="17" width="3" height="3" />
        </g>
        <g stroke="black" stroke-width="1" style="font-size: 3px">
         <text x="40%" y="5">1</text>
         <text x="40%" y="10">2</text>
         <text x="40%" y="15">3</text>
        </g>
       </svg>
      </span>
      <span class="p-1 flex al-cent" data-prop="flexWrap" data-value="wrap" title="Wrap children. Makes a child of a flex container, wrap on to the next line when there is limited space.">
       <svg stroke="currentColor" style="width: 1.2rem" viewBox="0 -2 20 20">
        <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
        <g>
         <rect x="2" y="3" width="3" height="4" />
         <rect x="7" y="3" width="3" height="4" />
         <rect x="12" y="3" width="3" height="4" />
         <rect x="2" y="10" width="3" height="4" />
        </g>
        <g stroke="black" stroke-width="1" style="font-size: 3px">
         <text x="3" y="6">1</text>
         <text x="8" y="6">2</text>
         <text x="13" y="6">3</text>
         <text x="3" y="13">4</text>
        </g>
       </svg>
      </span>
      <span class="p-1 flex al-cent" title="Row or column reverse. Reverse the order of arrangement for the children of a flex container.">
       <svg stroke="currentColor" style="width: 1.2rem" viewBox="0 -2 20 20">
        <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
        <g>
         <rect x="2" y="3" width="3" height="4" />
         <rect x="7" y="3" width="3" height="4" />
         <rect x="12" y="3" width="3" height="4" />
         <rect x="2" y="10" width="3" height="4" />
        </g>
        <g stroke="black" stroke-width="1">
         <text x="3" y="6" style="font-size: 3px">4</text>
         <text x="8" y="6" style="font-size: 3px">3</text>
         <text x="13" y="6" style="font-size: 3px">2</text>
         <text x="3" y="13" style="font-size: 3px">1</text>
        </g>
       </svg>
      </span>
     </div>
     <div class="dropdown" title="Flexbox properties">
      <button class="btn border-0 px-2 flex al-cent dropdown-toggle" data-bs-toggle="dropdown" style="font-size: 0.45rem;height: 100%">
      ${FaAngleDoubleDown({ width: '1.5em'})}
      </button>
      <div class="menu flex-aligns right-0">
       <div class="boundaryBorder flex al-cent" data-prop="justifyContent" style="fill: #A3A4AC;stroke: #A3A4AC;stroke-linecap: round;stroke-linejoin: round">
        <span class="p-2 flex al-cent" data-value="flex-start" title="">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="10%" width="25%" height="30%" />
           <rect x="40%" y="10%" width="25%" height="30%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="center">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="21%" y="10%" width="25%" height="30%" />
           <rect x="54%" y="10%" width="25%" height="30%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="flex-end">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="36%" y="10%" width="25%" height="30%" />
           <rect x="68%" y="10%" width="25%" height="30%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="space-between">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="10%" y="10%" width="22%" height="30%" />
           <rect x="68%" y="10%" width="22%" height="30%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="space-around">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="15%" y="10%" width="25%" height="30%" />
           <rect x="60%" y="10%" width="25%" height="30%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="stretch">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="10%" width="39%" height="30%" />
           <rect x="54%" y="10%" width="38%" height="30%" />
          </g>
         </svg>
        </span>
       </div>
       <div class="boundaryBorder flex al-cent" data-prop="alignItems" style="fill: #A3A4AC;stroke: #A3A4AC;stroke-linecap: round;stroke-linejoin: round">
        <span class="p-2 flex al-cent" data-value="flex-start">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="7%" width="25%" height="22%" />
           <rect x="7%" y="36%" width="25%" height="22%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="center">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke="inherit" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="20%" width="25%" height="22%" />
           <rect x="7%" y="49%" width="25%" height="22%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="flex-end">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke="inherit" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="32%" width="25%" height="22%" />
           <rect x="7%" y="61%" width="25%" height="22%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="space-between">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke="inherit" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="10%" width="25%" height="22%" />
           <rect x="7%" y="58%" width="25%" height="22%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="space-around">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke="inherit" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="15%" width="25%" height="22%" />
           <rect x="7%" y="53%" width="25%" height="22%" />
          </g>
         </svg>
        </span>
        <span class="p-2 flex al-cent" data-value="stretch">
         <svg stroke="currentColor" style="width: 1.2rem;height: 1.2rem" viewBox="0 -2 20 20">
          <rect fill="none" stroke-width="1" x="0" y="0" width="100%" height="90%" />
          <g>
           <rect x="7%" y="10%" width="25%" height="70%" />
           <rect x="40%" y="10%" width="25%" height="70%" />
          </g>
         </svg>
        </span>
       </div>
      </div>
     </div>`);
 
 const textBar = el('div', { class: 'boundaryBorder flex al-cent mr-1' });
 const textAlignBar = el('div', { class: 'boundaryBorder flex al-cent clicks mr-1', data: { prop: 'text-align' } });

 ElementUpdate.add(function() {
  let elemObj = ACTIVE_ELEM.props;
  let style = updateViewF();
  
  $('.bg-green-600', formattingToolBar).removeClass('bg-green-600');
  
  function findPropData(parent) {
   for (let child of parent.children()) {
   	child = $(child);
   	let data = child.data();
   	
    if (data.prop && style[data.prop]) {
     if (child.children().first()[0].nodeName.toLowerCase() === 'svg') {
      data.value == style[data.prop] && child.addClass('bg-green-600');
     } else {
     	child.children().each(function() {
     		$(this).data().value == style[data.prop] && $(this).addClass('bg-green-600');
     	});
     }
    }
  
    child.children.length && findPropData($(child));
   }
  }
  findPropData(formattingToolBar);
 });
 
 const fileBar = el('div', { class: 'boundaryBorder flex al-cent mx-1', id: 'property', event: {
 	click(e) {
 		const span = getParentElem(e.target, 'span', 'div');
 		span && span.title && FEATURES[span.title]();
 	}}, tabIndex: 1 },
 	el('span', { class: 'inline-block p-1 px-2', title: 'New file' }, $(BsFileEarmarkPlusFill({ width: '1.2em' }))),
 	el('span', { class: 'inline-block p-1 px-2', title: 'New folder' }, $(FaFolder({ width: '1.4em' }))),
 	el('span', { class: 'inline-block p-1 px-2', title: 'Save' }, $(FaSave({ width: '1.2em' }))),
 	el('span', { class: 'inline-block p-1 px-2', title: 'Delete' }, $(BsTrash3Fill({ width: '1.2em' })))
 );
 
 formattingToolBar.append(fileBar, textBar, textAlignBar, flexBoxBar);

 let clicksParent = $('.flex-aligns', formattingToolBar);
 
 // Flex aligning and justifying
 clicksParent.click(function(e) {
  let span = getParentElem(e.target, 'span', 'div');
  
  if(span) {
   let updateView = updateViewF();
   span = $(span);
   
   let prop = span.parent().data().prop;
   let value = span.data().value;
   
   if (updateView[prop] && updateView[prop] === value) {
    _.UPDATE_STYLE(prop, '');
   } else {
    if (updateView.flexDirection && updateView.flexDirection.startsWith('column')) {
     prop = prop == 'align-items' ? 'justify-content' : 'align-items';
    }
    
    _.UPDATE_STYLE(prop, value);
   }
  }
 });

 // Display flex, direction, wrap, reverse
 const flexControls = $('.flex-controls', formattingToolBar).first();
	
 _.UPDATE_CLASS_ON_SELECT({ parent: flexControls, className: 'c' }, true, function(target) {
  let elemObj = ACTIVE_ELEM.props;
  let style = updateViewF();
 	
 	let data = target.data();
 	
  if (data.prop) {
   // toggle style property
   let value = style[data.prop];

   _.UPDATE_STYLE(data.prop, value ? '' : data.value);
  } else {
   // toggle style property
   let value = style.flexDirection;

   if (value === 'column') {
    value = 'column-reverse';
   } else if (value === 'column-reverse') {
    value = 'column';
   } else if (value === 'row-reverse') {
    value = '';
   } else {
    value = 'row-reverse';
   }
   
   _.UPDATE_STYLE('flexDirection', value);
  }
 });

 function useUlList(config, addStyle) {
  let ul = el('ul', { class: 'list maxH', data: { prop: config[0] } });
  if (!config[1]) { // for text-decoration-color
   return ul.append(
   	el('li', 0, el('input', {
    class: 'form-control w-20',
    placeholder: 'white',
    event: {
     change: function(e) { _.UPDATE_STYLE('textDecorationColor', e.target.value) }
    }
   })));
  }
  
  for (let i = 1; i < config.length; i++) {
   let isString = typeof config[i] === 'string';
   let style = (addStyle && isString && {
    [config[0]]: config[i]
   }) || {};
   
   let value = isString ? config[i] : config[i][0];

   ul.append(el('li', { textContent: isString ? config[i].capitalize() : config[i][1], data: { value }, style }));
  }

  ul.click(function(e) { e.target.nodeName === 'LI' && _.UPDATE_STYLE(config[0], $(e.target).data().value) });

  return ul;
 }

 function useDropdown(config) {
  let toggle = el('span', { class: 'd-inline-block px-2' }, $(config.icon));
  
  let dropdown = el('div', { class: 'dropdown', title: config.title }, toggle);
  
  let dropdown_content = el('div', { class: 'menu', style: { minWidth: '6rem' } }, config.ulList || useUlList(config.ulListControls, config.addStyle));
  
  dropdown.append(dropdown_content);
  
  return dropdown;
 }

 function inactiveDrpdwn(config) {
  let ul = el('ul', { class: 'list', style: { minWidth: 'max-content' } });
  
  iter(config, function(each) {
  	let dropdown = el('div', { class: 'dropend' }, el('div', { class: 'dropdown-toggle' }, el('span', { textContent: each.text })));
  	
  	dropdown.append(el('div', { class: 'menu', style: { minWidth: '6rem' } }, useUlList(each.ulListControls, each.addStyle)));
  	
  	ul.append(el('li', each.props, dropdown));
  });
  
  return ul;
 }

 let text_line_control = [
  {
  	text: 'Line',
  	ulListControls: ['text-decoration-line', ['', 'None'], ['none', 'No underline'], 'underline', 'line-through', 'overline'],
  	addStyle: true
  },
  {
  	text: 'Style',
  	ulListControls: ['text-decoration-style', ['', 'None'], 'solid', 'double', 'dotted', 'dashed', 'wavy']
  },
  {
  	text: 'Position',
  	ulListControls: ['text-underline-position', ['', 'None'], 'under']
  },
  {
  	text: 'Color',
  	ulListControls: ['text-decoration-color']
  }
 ];

 let text_line_controlUl = inactiveDrpdwn(text_line_control);
	
 let textBarControls = [
  { title: 'Bold', icon: BsTypeBold({ width: '1.4em' }), ulListControls: ['fontWeight', ['', 'None'], 'normal', 'bold', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900'], addStyle: true },
  { title: 'Italic', icon: FaItalic({ width: '1em' }), ulListControls: ['fontStyle', ['', 'None'], 'normal', 'italic'], addStyle: true },
  { title: 'Text line', icon: BsTypeUnderline({ width: '1.3em' }), ulList: text_line_controlUl },
  { title: 'Text case', icon: BsType({ width: '1.4em' }), ulListControls: ['textTransform', ['', 'None'], ['lowercase', 'lowercase'], ['uppercase', 'UPPERCASE'], ['capitalize', 'Capitalize']] },
  { title: 'Font size', icon: AiOutlineFontSize({ width: '1.3em' }), ulListControls: ['fontSize', ['', 'None'], ['0.5rem', 'FS-1'], ['0.65rem', 'FS-2'], ['0.75rem', 'FS-3'], ['0.85rem', 'FS-4'], ['0.95rem', 'FS-5'], ['1rem', 'FS-6'], ['1.2rem', 'FS-7'], ['1.5rem', 'FS-8'], ['2rem', 'FS-9'], ['2.5rem', 'FS-10'], ['3rem', 'FS-11'], ['3.5rem', 'FS-12'], ['4rem', 'FS-13'], ['4.5rem', 'FS-14'], ['5rem', 'FS-15']] }
   ];

 let textAlignControls = [
  { title: 'Align text to the left', value: 'left', icon: $(AiOutlineAlignLeft({ width: '1.2em' })) },
  { title: 'Align text to the center', value: 'center', icon: $(AiOutlineAlignCenter({ width: '1.2em' })) },
  { title: 'Align text to the right', value: 'right', icon: $(AiOutlineAlignRight({ width: '1.2em' })) },
  { title: 'Justify text', value: 'justify', icon: $(BsJustify({ width: '1.4em' })) }];
	
	let stateOptions = [
		{
			text: 'None',
			value: ''
	  },
		{
			text: 'Hover',
			value: ':hover'
	  },
		{
			text: 'Active',
			value: ':active'
	  },
		{
			text: 'Focus',
			value: ':focus'
	  },
		{
			text: 'Visited',
			value: ':visited'
	  },
		{
			text: 'Checked',
			value: ':checked'
	  },
		{
			text: 'Disabled',
			value: ':disabled'
	  },
		{
			text: 'Required',
			value: ':required'
	  },
		{
			text: 'Read-only',
			value: ':read-only'
	  },
		{
			text: 'Valid',
			value: ':valid'
	  },
		{
			text: 'Invalid',
			value: ':invalid'
	  },
		{
			text: 'Focus-within',
			value: ':focus-within'
	  },
		{
			text: 'Focus-visible',
			value: ':focus-visible'
	  },
		{
			text: 'Empty',
			value: ':empty'
	  },
		{
			text: 'Placeholder-shown',
			value: ':placeholder'
	  }
	 ];

 iter(textBarControls, function(control) { textBar.append(useDropdown(control)) });

 iter(textAlignControls, function(each) { textAlignBar.append(el('span', { class: 'inline-block p-1 px-2', title: each.title, data: { value: each.value } }, each.icon)) });

 _.UPDATE_CLASS_ON_SELECT({ parent: textAlignBar, className: 'bg-green-600' }, true, function(target) {
  let updateView = updateViewF();
  
  _.UPDATE_STYLE('textAlign', updateView.textAlign && updateView.textAlign === target.data().value ? '' : target.data().value);
 });
 
 formattingToolBar.append(
 	el('div', { class: 'flex-grow flex-ac pr-2 mx-1 overflow-auto whitspace-nowrap md:justify-end' },
		 el('div', { class: 'flex-ac ml-3' },
		 	(function() {
		 		let ico = $(FaUndo({ width: '1.1em', class: 'px-2', title: 'Undo' }));
		 		ico.click(FEATURES.Undo);
		 	
		 		return ico;
		 	})(),
		 	(function() {
		 		let ico = $(FaRedo({ width: '1.1em', class: 'px-2', title: 'Redo' }));
		 		ico.click(FEATURES.Redo);
		 	
		 		return ico;
		 	})(),
		 	(function() {
		 		let ico = $(AiFillLayout({ width: '1.5em', class: 'm-1', title: 'Use media query' }));
		 		ico.click(function() {
		 			$(this).toggleClass('responsive-toggle');
		 			SPIDER.responsiveDesignActivated = !SPIDER.responsiveDesignActivated;
		 	
		 			ElementUpdate.fire();
		 		});
		 	
		 		return ico;
		 	})(),
		 	el('select', {
		 			class: 'form-control2 w-16 mx-2',
		 			style: { padding: '.1rem .3rem' },
		 			event: {
		 				change() {
		 					SPIDER.elemState = $(this).val();
		 					updateViewF(); // Add this state to the current view style, if absent
		 	
		 					_.UPDATE_DOM_ELEMENT();
		 				}
		 			}
		 		},
		 		...stateOptions.map(each => new Option(each.text, each.value))
		 	)
		 ),
 		el('div', { class: 'flex-ac', event: {
	 	click(e) {
	 		const span = getParentElem(e.target, 'span', 'div');
	 		span && span.title && FEATURES[span.title]();
	 	}} },
	 	el('span', { class: 'inline-block p-1 px-2', title: 'Mobile view 3' }, $(FaMobileAlt({ width: '1.3em' }))),
	 	el('span', { class: 'inline-block p-1 px-2', title: 'Tablet view 1' }, $(FaTabletAlt({ width: '1.2em' }))),
	 	el('span', { class: 'inline-block p-1 px-2', title: 'Laptop view' }, $(FaLaptop({ width: '1.2em' }))),
	 	el('span', { class: 'inline-block p-1 px-2 ml-3', title: 'Dark mode' }, $(FaMoon({ width: '1.2em' }))),
	 	el('span', { class: 'inline-block p-1 px-2', title: 'Light mode' }, $(FaSun({ width: '1.3em' }))),
	 	)
		)
 );
 
 text_line_control = null;
 text_line_controlUl = null
 textBarControls = null;
 textAlignControls = null;
 stateOptions = null;
}