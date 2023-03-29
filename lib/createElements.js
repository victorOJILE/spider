import { _, FEATURES } from './utils.js';
import { CREATE_NEW_ELEMENT_COMP, dropmenu, openDialogue, menuopen } from '../components.js';

 // Create html DOM elements

export const cEl = function(elem, props = {}, ...children) {
  let element = document.createElement(elem);
  if (props && typeof props == 'object') {
   for (let prop in props) {
    if (prop == 'class') {
     if (Array.isArray(props[prop])) {
      props[prop].forEach(each => {
       element.classList.add(each);
      })
     } else {
      if(props[prop].includes(' ')) {
       let cls = props[prop].split(' ');
       cls.forEach(each => element.classList.add(each));
      }else {
       element.classList.add(props[prop]);
      }
     }
    } else if (prop == 'data') {
     for(let d in props[prop]) {
      element.dataset[d] = props[prop][d];
     }
    } else if (prop == 'style') {
     element.addCss(props[prop]);
    } else if(prop == 'event') {
     for(let ev in props[prop]) {
      element.ae(ev, props[prop][ev]);
     }
    } else {
     element[prop] = props[prop];
    }
   }
  }
  if (children) {
   for(let child of children) element.append(child);
  }
  return element;
 }

 // Create DOM tree (elements) out of project object

export const cEl2 = function(parent, elem) {
  for (let child in elem) {
   let newParent = cEl(elem[child].type, elem[child].props);
   newParent.dataset.ref = elem[child].ref;

   for (let key in elem[child].style) {
    newParent.style[key] = elem[child].style[key];
   }
   if (Object.keys(elem[child].children).length) {
    parent.append(cEl2(newParent, elem[child].children));
   } else {
    parent.append(newParent);
   }
  }
  return parent || '';
 }

// cEl3(projectObject)
// Creates iframe DOM element from the project object with need of the parent element. 
// You append the return value to whatever parent of your choice 

export const cEl3 = function (obj) {
  let parent = cEl(obj.type, obj.props);
  parent.dataset.ref = obj.ref;
  if (Object.keys(obj.children).length) {
   cEl2(parent, obj.children);
  }
  return parent || '';
 }
 
 
 // $.cEl4(Parent, projectObject, NestedChildrenToBeHidden)
 
 // Create DOM element tree illustration out of project object
 
 // Provide parent param as the first param for the function to append its element(s) tree to.
 
 let cEl4Tabbing = 5;
 const actionsArr = [{ name: 'Select', icon: ['fa', 'fa-arrow-pointer'] }, { name: 'Edit', icon: ['fa', 'fa-edit'] }, { name: 'Insert', icon: 'fa' }, { name: 'Cut', icon: ['fa', 'fa-cut'] }, { name: 'Copy element', icon: ['fa', 'fa-copy'] }, { name: 'Paste element', icon: ['fa', 'fa-paste'] }, { name: 'Remove children', icon: ['fa', 'fa-trash'] }, { name: 'Toggle collapse', icon: ['fa', 'fa-retweet'] }, { name: 'Remove', icon: ['fa', 'fa-trash-alt'] }, { name: 'Properties', icon: ['fa', 'fa-info-circle'] }];

export const cEl4 = function(parent, elem) {
  for (let child in elem) {
   const newParent = cEl('div', { style: { paddingLeft: `${cEl4Tabbing}px` }, class: ['elemNameDiv', 'flex', 'jc-sb', 'al-cent'] });
   elem[child].selected && newParent.classList.add('bg-selected')
   Object.defineProperty(newParent, "ref", {
    value: elem[child].ref
   });
   
   const vellipDrop = cEl('ul', { class: ['dropdown-content', 'main-list', 'vellip-drop', 'p-1', 'right-100'] });

   const actionsArrEv = {
    'Edit'() {
     openDialogue();
     if(menuopen) {
      menuopen.classList.remove('block');
      menuopen.innerHTML = '';
     }
    },
    'Select'() {
     context.selectedElement = _.getDomElemFromElemRef(newParent.ref);
     let elemObj = _.getElementObj(newParent.ref);
     elemObj.selected = true;
     selectedElementObject.selected = false;
     selectedElementObject = elemObj;
     _.re_renderDOMSelectors();
    },
    'Insert'() {
     // let retrievedElem = _.getDomElemFromElemRef(elem[child].ref);

    },
    'Cut'() {
     context.ref = newParent.ref;
     FEATURES.Cut(newParent);
    },
    'Copy element'() {
     context.ref = newParent.ref;
     FEATURES.Copy();
    },
    'Paste element'() {
     context.ref = newParent.ref;
     FEATURES.Paste();
    },
    'Remove children'() {
     if(!confirm('Are you sure you want to remove this element?')) return;
     let elemObj = _.getElementObj(newParent.ref);
     elemObj.children = {};
     let elemDOM = _.getDomElemFromElemRef(newParent.ref);
     if(elemObj.props?.class && elemObj.props.class.indexOf('row') != -1) {
      let ind = elemObj.props.class.findIndex(e => e == 'row');
      elemObj.props.class.splice(ind, 1);
      elemDOM.classList.remove('row');
     }
     elemDOM.innerHTML = '';
     newParent.nextElementSibling.innerHTML = '';
    },
    'Toggle collapse'(e) {
     const arrowD = newParent.firstElementChild;
     if (arrowD.style.display == 'block') {
      arrowD.style.display = 'none'
      arrowD.nextElementSibling.style.display = 'block'
     } else {
      arrowD.style.display = 'block'
      arrowD.nextElementSibling.style.display = 'none'
     }
     newParent.nextElementSibling.classList.toggle('hide');
     let elemObj = _.getElementObj(newParent.ref);
     elemObj.open = elemObj.open ? false : true;
    },
    'Remove'() {
     context.ref = newParent.ref;
     FEATURES.Remove(newParent);
    },
    'Properties'() {
     if(selectedElementObject.ref != '0:') {
      context.selectedElement = _.getDomElemFromElemRef(newParent.ref);
      selectedElementObject = _.getElementObj(newParent.ref);
     }
     new CREATE_NEW_ELEMENT_COMP({}, newParent.ref);
    }
   }
   
   newParent.addEventListener('dblclick', () => actionsArrEv['Select']); // Not working!!!
   
   const vellipBtn = cEl('button', { innerHTML: '&vellip;' });
   const vellip = dropmenu(vellipBtn, vellipDrop, 'parent');
   
   let createList = function() {
    actionsArr.forEach(each => {
     let li = cEl('li', { class: [] }, cEl('span', { class: 'icon' }, cEl('i', { class: each.icon })), cEl('span', { innerText: each.name }));
     vellipDrop.append(li);
     });
     createList = null;
   }
   isMobile && createList();
   
   let vellipFunc = function() {
    if(!vellipDrop.classList.contains('block')) {
     vellipDrop.innerHTML = '';
    }else {
     vellipDrop.innerHTML = '';
     createList();
    }
   }
   !isMobile && vellipBtn.ae('click', vellipFunc);
   
   vellipDrop.ae('click', function(e) {
    actionsArrEv[e.target.closest('li').innerText]();
   });
   
   let div = cEl('div', { class: ['flex-gr', 'white-space'] });
   let arrowRight = cEl('i', { class: ["fa", 'fa-caret-right', 'pr-1' ], style: { display: elem[child].open ? 'none' : 'block' } });
   let arrowDown = cEl('i', { class: ["fa", 'fa-caret-down', 'pr-1'], style: { display: elem[child].open ? 'block' : 'none' } });
   arrowRight.ae('click', () => {
    arrowRight.style.display = 'none';
    arrowDown.style.display = 'block';
    newParent.nextElementSibling.classList.toggle('hide');
    _.getElementObj(newParent.ref).open = true;
   });
   arrowDown.ae('click', () => {
    arrowDown.style.display = 'none';
    arrowRight.style.display = 'block';
    newParent.nextElementSibling.classList.toggle('hide');
    _.getElementObj(newParent.ref).open = false;
   });
   
   newParent.append(arrowRight, arrowDown);
   div.innerHTML += `${elem[child].name || elem[child].type.capitalize()}`;
   parent.append(newParent);
   
   let innerParent = cEl('div', { innerText: `${elem[child].props.innerText}`, style: { paddingLeft: `${cEl4Tabbing+2}px`} });
   parent.append(innerParent);
    
   newParent.append(div, vellip);
   
   elem[child].open && newParent.nextElementSibling.classList.add('hide');
   let newParentClose = cEl('div', { innerText: `${elem[child].name || elem[child].type.capitalize()}`, style: { paddingLeft: `${cEl4Tabbing +5}px`, marginBottom: '1px' }, class: ['elemNameDiv'] });
   elem[child].selected && newParentClose.classList.add('bg-selected');
   parent.append(newParentClose);
   if (Object.keys(elem[child].children).length) {
    parent.insertBefore(cEl4(innerParent, elem[child].children), newParentClose);
    cEl4Tabbing = 5;
   }
  }
  return parent || '';
 }