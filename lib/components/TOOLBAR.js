import CREATE_NEW_ELEMENT_COMP from './CREATE_NEW_ELEMENT_COMP.js';
import { tools, generateAttributes } from '../data.js';

export default function toolbar(parent = $('#tools-section'), myTools = tools, childList) {

 const ul = el('ul');

 function nestor(ul, myTools, childList) {
  for (let tool of myTools) {
   let btn, li = el('li');

   if (tool.name) { // If this is a text or form selector
    li = elT('li', tool.name);
    
    li.data('data', $.extend({
    	type: tool.type || tool.name, // names are capitalized but document.createElement is not case-sensitive,
    	attributes: generateAttributes()
    }, tool));
   } else if (tool.childrenTools) { // if this is a tool dropdown parent
    let dropdown_content = el('div', { class: 'menu' });

    if (childList) { // heading is nested
     btn = el('div', { class: 'dropdown-toggle' }, elT('span', tool.name2));
    } else {
     btn = el('button', { class: `${childList ? 'py-0 ' : ''}py-2` }, $(tool.icon));
    }

    li.addClass('dropend').append(btn, dropdown_content);
    li.data('idle', true);

    nestor(dropdown_content, tool.childrenTools, true);
   } else {
    btn = el('button', { class: 'py-2' }, $(tool.icon));
    if (tool.run) {
    	li.data('data', $.extend({
    		name: tool.id,
    		attributes: generateAttributes()
    	}, tool));
    }

    li.append(btn);
   }
   if (tool.title) li.prop('title', tool.title);
   
   li.data('action', tool.action);

   ul.append(li);
  }
 }

 nestor(ul, myTools);

 ul.click(function(e) {
  let li = getParentElem(e.target, 'li', 'ul');
  if (li) {
 	 li = $(li);
 	 
   if (li.data().action) {
    li.data().action();
   } else {
    if (li.data().idle) return;

    if (ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');

    new CREATE_NEW_ELEMENT_COMP(li.data().data);
   }
  }
 });

 parent.append(ul);
}