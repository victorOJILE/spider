import { _, FEATURES } from './lib/utils.js';
import * as $ from './lib/createElements.js';
import { MAIN_NAVIGATION, attr, styleProps } from './lib/data.js';
import { generateAttributes } from './lib/tools.js';

const smallListComponent = (f, arrow) => {
 if (arrow) {
  return $.cEl('form', { class: ['p-1', 'd-flex', 'jc-sb', 'al-cent'] }, $.cEl('input', { type: 'submit', value: f, class: 'flex-gr' }), $.cEl('i', { class: ['fa', 'fa-chevron-right'] }));
 } else {
  return $.cEl('form', { class: ['p-1', 'd-flex'] }, $.cEl('input', { type: 'submit', value: f, class: 'flex-gr' }))
 }
};

export let menuopen = null;

export const dropmenu = function(btn, dropcnt, type, elem) {
 let div = $.cEl(elem?.tag || 'div', {class: 'dropdown'}, btn, dropcnt);
 if(elem) {
  for(let key in elem.style) {
   div.style[key] = elem.style[key];
  }
 }
 if(!isMobile) {
  dropcnt.dataset.type = type;
  btn.ae('click', () => {
  dropcnt.classList.toggle('block');
  if(menuopen) {
   if(menuopen.dataset.type == 'parent' && dropcnt.dataset.type != 'child' && menuopen != dropcnt) {
    menuopen.classList.remove('block');
   }
  }
  menuopen = dropcnt;
 });
 }
 return div;
}

export function menubar() {
 const mainNavsElem = elId('mainNavs');
 for (let nav in MAIN_NAVIGATION) {
  try {
   let ul = $.cEl('ul', { class: ["dropdown-content", "main-list"], style:{ top: '110%'} });
    MAIN_NAVIGATION[nav].map(each => {
    try {
     let li;
     if (each.value) {
      let dropcnt = $.cEl('ul', { class: ["dropdown-content", "main-list", 'top-0', 'left-100'] });
      each.value.map(e => {
       let li = $.cEl('li', { class: ['d-flex', 'al-cent'] }, $.cEl('span', { class: 'icon' }, $.cEl('i', { class: e.icon })), $.cEl('span', { innerText: e.name, class: ['ml-1', 'd-inline-block', 'text-truncate'] }));
       li.ae('click', FEATURES[e.name]);
       dropcnt.appendChild(li);
      })
      
      let btn = $.cEl('div', { class: ['d-flex', 'jc-sb', 'al-cent'] }, $.cEl('span', {}, $.cEl('span', { class: 'icon' }, $.cEl('i', { class: each.icon })), $.cEl('span', { innerText: each.name, class: 'inl-bl' })), $.cEl('span', { innerHTML: '<i class="fa fa-chevron-right"></i>' }));
      
      li = dropmenu(btn, dropcnt, 'child', {tag: 'li', style: { width: '100%' }});
      
     } else {
      li = $.cEl('li', {}, $.cEl('span', { class: 'icon' }, $.cEl('i', { class: each.icon })), $.cEl('span', { innerText: each.name }));
     }
     try {
     if(FEATURES[each.name]) li.ae('click', FEATURES[each.name]);
     }catch(e) { console.error(e.stack) }
     ul.appendChild(li);
    } catch (e) { console.error(e.stack) }
   });

   
   let btn = $.cEl('button', { innerText: nav, class: 'dropbtn' });
   let li = dropmenu(btn, ul, 'parent');
   mainNavsElem.append(li);
  } catch (e) {
   console.error(e.stack);
   console.error(`Error in dropdown component code`);
  }
 }
}

export function toolbar(parent, tools, childList) {
 try {
   const ul = $.cEl('ul');
   for (let tool of tools) {
   let btn, li = $.cEl('li');
   if(tool.title) li.title = tool.title;
   if(tool.name) {
    btn = $.cEl('button', { innerText: tool.name });
    if(childList) btn.classList.add('text-left');
    Object.defineProperties(li, {
      data: { value: {
       name: tool.name,
       type: tool.type,
       attributes: tool.attributes
      } }
     });
    li.ae('click', function(e) { new CREATE_NEW_ELEMENT_COMP(this.data) });
    li.append(btn);
   }else {
    if(tool.childrenTools) {
     let dropdown_content = $.cEl('div', { class: ['dropdown-content', 'main-list', 'abs-right']});
     let btn;
     if(childList) {
      btn = $.cEl('button', { class: ['py-0', 'rounded', 'text-left', 'd-flex', 'al-cent', 'jc-sb']}, $.cEl('span', { innerText: tool.name2 }), $.cEl('i', { class: ['fa', 'fa-chevron-right']}));
     }else {
      btn = $.cEl('button', { innerText: 'F', class: [childList ? 'py-0' : 'py-2', 'rounded'] }, $.cEl('i', { class: tool.icon }))
     }
     let div = $.cEl('div', { class: ['dropdown', 'w-100'] }, btn, dropdown_content);
     
     toolbar(dropdown_content, tool.childrenTools, true);
     li.append(div);
    }else {
     if(childList) btn.classList.add('text-left');
     btn = $.cEl('button', { innerText: 'G', class: ['py-2', 'rounded'] }, $.cEl('i', { class: tool.icon }));
     if(tool.run) {
      Object.defineProperties(li, {
      data: { value: {
       name: tool.id,
       type: tool.type,
       notText: true,
       attributes: tool.attributes
      } }
     });
     li.ae('click', function(){ new CREATE_NEW_ELEMENT_COMP(this.data) });
     }else {
      li.ae('click', tool.action);
     }
     li.append(btn);
    }
   }
   ul.append(li);
  }
  
  parent.append(ul);
 } catch(e) {
  console.error(e.stack);
  console.error('Error in tools components code rendering!!!');
 }
}

export class Dialogue {
 constructor(name) {
  this.name = name;
  this.dialogue = undefined;
  this.myContext = {};
  this.previousStyle = _.cloneObj(selectedElementObject.style);
  this.closeProperty = $.cEl('button', { id: 'close-property', class: ["p-1", "mb-1"] }, $.cEl('i', { class: ['fa', 'fa-close'] }));
  this.cancelled = function() {
   selectedElementObject.style = this.previousStyle;
   _.UPDATE_DOM_ELEMENT_STYLE();
  };
  this.callback = function() {
   console.log('Styles added or removed!');
  };
  this.closeDialogueListener = this.closeDialogueListener.bind(this);
  this.okButton = this.okButton.bind(this);
 }
 newDialog(sideBarMainFlex) {
  try {
   // if a dialog exist in the DOM, return
   if(elCls('dialogue')[0]) return ['', '']; 
   let dialogueTop = $.cEl('div', { class: ['dialogueTop', 'd-flex', 'jc-sb', 'al-cent', 'px-1'] }, $.cEl('h2', { id: 'dialogueHeader', innerText: this.name || 'Properties', class: ['w-75', 'text-truncate'] }), this.closeProperty);

   this.closeProperty.ae('click', (e) => this.closeDialogueListener(e));
   
   let okBtn = $.cEl('button', {innerText: 'Ok', class: 'p-1' });
   okBtn.ae('click', this.okButton);
   let foot = $.cEl('div', { class: ['p-2', 'd-flex', 'jc-rt', 'dialogueFoot']}, okBtn);
   
   let body = $.cEl('div', { class: ['dialogueMain', 'p-1'] }, $.cEl('div', { class: ['dialogueBody', 'd-flex', 'flex-dir-col'] }, dialogueTop, sideBarMainFlex, foot));
   
   let dialogueMain = $.cEl('div', { class: 'dialogue' }, body);
   //console.log(window.innerHeight/3);
   dialogueMain.style.left = context?.styleDialog?.x || window.innerWidth / 3 + "px";
   dialogueMain.style.top = context?.styleDialog?.y || "20%";

   function preventWinScroll(e) {
    e.preventDefault();
   }
   
   let pos1, pos2, pos3, pos4;
   function activateDrag(event) {
    window.addEventListener('scroll', preventWinScroll);
    let touch = event.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    
    document.addEventListener('touchmove', dragMove);
    document.addEventListener('touchend', dragEnd);
   }
   let outerThis = this;
   function dragMove(event) {
    let touch = event.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    let top = dialogueMain.offsetTop - pos2;
    let left = dialogueMain.offsetLeft - pos1;
    console.log(top, left);
    outerThis.left = left, outerThis.top = top;
    dialogueMain.style.left = left;
    dialogueMain.style.top = top;
   }
   function dragEnd(event) {
   // let touch = event.changedTouches[0];
    window.removeEventListener('scroll', preventWinScroll);
    if (!context.styleDialog) {
     context.styleDialog = {
      x: undefined,
      y: undefined
     };
    }

    context.styleDialog.x = outerThis.left;
    context.styleDialog.y = outerThis.top;
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('touchend', dragEnd);
   }
   if(!isMobile) {
    dialogueTop.addEventListener('touchstart', activateDrag);
   }

   this.dialogue = dialogueMain;
   return dialogueMain;
  } catch (e) {
   console.error(stack);
  }
 }
 closeDialogueListener(e) {
  e.target.removeEventListener('click', this.closeDialogueListener);
  this.cancelled();
  this.dialogue.remove();
  property.focus();
 }
 okButton(e) {
  e.target.removeEventListener('click', this.okButton);
  this.callback();
  this.dialogue.remove();
  property.focus();
 }
}

export class LAYOUT_COMPONENT extends Dialogue {
 constructor(name, boxcount, defaults, modifier) {
  super(name);
  this.myContext['mobile'] = {};
  this.myContext['mobile']['order'] = {};
  this.myContext['mobile_lsc'] = {};
  this.myContext['mobile_lsc']['order'] = {};
  this.myContext['tablet'] = {};
  this.myContext['tablet']['order'] = {};
  this.myContext['laptop'] = {};
  this.myContext['laptop']['order'] = {};
  this.myContext['desk1'] = {};
  this.myContext['desk1']['order'] = {};
  this.myContext['desk2'] = {};
  this.myContext['desk2']['order'] = {};
  this.boxcount = boxcount;
  this.modifier = modifier;
  this.defaults = defaults;
  this.comp();
 }
 comp() {
  const main = $.cEl('main', { class: ['dialogueBody', 'propsFormatDiv', 'p-2'] });
  
  main.append(
   $.cEl('h2', { class: ['text-info', 'd-flex', 'jc-sb', 'al-cent'], innerText: `${this.boxcount}X Layout settings`})
  );
  
  const comp = (view) => {
   let ul = $.cEl('ul');
  this.defaults.forEach(def => {
   let li = $.cEl('li', { innerText: def.name });
   let inputs = main.getElementsByTagName('input');
   li.ae('click', () => {
    let format = def.format;
    for(let i=0; i<5; i++) {
     def.format = def.format.concat(format);
    }
    def.format.slice(view).forEach((code, ind) => inputs[ind+view].value = code);
    let views = ['mobile', 'mobile_lsc', 'tablet', 'laptop', 'desk1', 'desk2'];
    let i = view, j = view/this.boxcount, k = 0;
    while(i < def.format.length) {
     for (; k < this.boxcount; k++) {
      this.myContext[views[j]][k] = def.format[i++];
     }
     j++, k = 0;
    }
   });
   ul.append(li);
  });
   return $.cEl('div', { class: ['p-2', 'mt-1', 'text-black-50', 'bg-body', 'border', 'pos-rel']},
   $.cEl('div', { class: ['pos-abs'], style: { right: '0.5rem' }},
    $.cEl('div', { class: ['dropdown']}, 
     $.cEl('button', { innerText: 'here', class: ['text-info', 'rounded', 'border-warning'], style: { backgroundColor: 'inherit' } }, $.cEl('i', { class: ['fa', 'fa-lightbulb'], style: { fontSize: '1.2rem' } })),
     $.cEl('div', { class: ['dropdown-content', 'main-list', 'right-0', 'text-light']}, ul
     )
    )))
  };
  
  const Mobile_View = comp(0), Mobile_Landscape_View = comp(this.boxcount *1), Tablet_View = comp(this.boxcount *2),
  Laptop_View = comp(this.boxcount *2), Desktop_View_1 = comp(this.boxcount *4), Desktop_View_2 = comp(this.boxcount *5);
  main.append(
   CLICK_DROPDOWN('Mobile view', Mobile_View, true),
   CLICK_DROPDOWN('Mobile landscape view', Mobile_Landscape_View),
   CLICK_DROPDOWN('Tablet view', Tablet_View),
   CLICK_DROPDOWN('Laptop view', Laptop_View),
   CLICK_DROPDOWN('Desktop view', Desktop_View_1),
   CLICK_DROPDOWN('Desktop view 2', Desktop_View_2)
  );
  let value = parseInt(12/this.boxcount), rem = 12 % this.boxcount;
  
  let appendOptions = (view, i, name, value) => {
   view.append(CREATE_INCR_INPUT(value, { min: 1, max: 12 }, (val) => this.myContext[name][i] = val));
   this.myContext[name][i] = value;
  }
  
  for(let i=0; i<this.boxcount; i++) {
   if(i+1 == this.boxcount) value += rem;
   appendOptions(Mobile_View, i, 'mobile', value);
   appendOptions(Mobile_Landscape_View, i, 'mobile_lsc', value);
   appendOptions(Tablet_View, i, 'tablet', value);
   appendOptions(Laptop_View, i, 'laptop', value);
   appendOptions(Desktop_View_1, i, 'desk1', value);
   appendOptions(Desktop_View_2, i, 'desk2', value);
  }
  
  this.callback = () => {
   if(context.selectedElement.className.indexOf('col') != -1) {
    _.INSERT_NEW_ELEMENT({
     type: 'div',
     name: 'Box',
     props: {
      innerText: '',
      class: ['bg-grey']
     },
     notText: false
    });
    context.selectedElement = context.selectedElement.firstElementChild;
    selectedElementObject = _.getElementObj(context.selectedElement.dataset.ref);
   }
   context.selectedElement.classList.add('row');
   let obj = this.myContext;
   let mobile = Object.values(obj.mobile);
   let mobile_lsc = Object.values(obj.mobile_lsc);
   let tablet = Object.values(obj.tablet);
   let laptop = Object.values(obj.laptop);
   let desk1 = Object.values(obj.desk1);
   let desk2 = Object.values(obj.desk2);
   let childObj = () => {
    return {
     type: 'div',
     name: 'Box',
     props: {
      innerText: '',
      class: ['bg-grey']
     },
     notText: false
    }
   }
   if(this.modifier) { // If we are modifying an existing layout
    let children = selectedElementObject.children;
    for(let key in children) {
     let domElement = _.getDomElemFromElemRef(children[key].ref);
     domElement.className = domElement.className.split(' ').filter(e => !e.startsWith('col')/* || e != 'row'*/).join(' ');
     // Get the class prop array in the children[key] (children variable above) object 
     let cls = children[key].props.class;
     cls.forEach((cl, ind) => {
      if(cl.indexOf('col') == 0 || cl.indexOf('order') == 0) cls.splice(ind, 1);
     });
    }
    
    for(let i=0; i<this.boxcount; i++) {
     // Get each box with index 'i' in its parent
     let domElement = _.getDomElemFromElemRef(children[i].ref);
     // Add new classes to it
     addClass(i, children[i], domElement);
     //console.log(domElement);
    }
   }else {
    for(let i=0; i<this.boxcount; i++) {
     let child = childObj();
     addClass(i, child);
     _.INSERT_NEW_ELEMENT(child);
    }
   }
   function addClass(i, child, elem) {
    child.props["class"].push(`col${mobile[i] == '' ? '' : '-' + mobile[i]}`);
    elem && elem.classList.add(`col${mobile[i] == '' ? '' : '-' + mobile[i]}`);
    if (mobile[i] != mobile_lsc[i]) {
     child.props["class"].push(`col-sm${mobile_lsc[i] == '' ? '' : '-' + mobile_lsc[i]}`);
     elem && elem.classList.add(`col-sm${mobile_lsc[i] == '' ? '' : '-' + mobile_lsc[i]}`);
    }
    if (mobile_lsc[i] != tablet[i]) {
     child.props["class"].push(`col-md${tablet[i] == '' ? '' : '-' + tablet[i]}`);
     elem && elem.classList.add(`col-md${tablet[i] == '' ? '' : '-' + tablet[i]}`);
    }
    if (tablet[i] != laptop[i]) {
     child.props["class"].push(`col-lg${laptop[i] == '' ? '' : '-' + laptop[i]}`);
     elem && elem.classList.add(`col-lg${laptop[i] == '' ? '' : '-' + laptop[i]}`);
    }
    if (laptop[i] != desk1[i]) {
     child.props["class"].push(`col-xl${desk1[i] == '' ? '' : '-' + desk1[i]}`);
     elem && elem.classList.add(`col-xl${desk1[i] == '' ? '' : '-' + desk1[i]}`);
    }
    if (desk1[i] != desk2[i]) {
     child.props["class"].push(`col-xxl${desk2[i] == '' ? '' : '-' + desk2[i]}`);
     elem && elem.classList.add(`col-xl${desk2[i] == '' ? '' : '-' + desk2[i]}`);
    }
   }
  }
  elId('root').append(this.newDialog(main));
 }
}

class SmallDialogue {
 constructor(name) {
  this.name = name;
  this.previousStyle = _.cloneObj(selectedElementObject.style);
  this.closeProperty = $.cEl('button', { id: 'close-property', class: ["p-1", "my-1"] }, $.cEl('i', { class: ['fa', 'fa-close'] }));
  this.closeDialogueListener = this.closeDialogueListener.bind(this);
  this.okButton = this.okButton.bind(this);
 }
 dialogue(content = '') {
  if(elCls('dialogue')[0]) return ''; 
  let dialogueTop = $.cEl('div', { class: ['dialogueTop', 'd-flex', 'jc-sb', 'al-cent'] }, $.cEl('h2', { id: 'dialogueHeader', innerText: this.name || 'Properties', class: ['w-75', 'text-truncate'] }), this.closeProperty);
   this.closeProperty.ae('click', (e) => this.closeDialogueListener(e));
   
   let okBtn = $.cEl('button', {innerText: 'Ok', class: 'p-1' });
   okBtn.ae('click', this.okButton);
   let foot = $.cEl('div', { class: ['p-2', 'd-flex', 'jc-rt', 'dialogueFoot']}, okBtn);
   
   let body = $.cEl('main', { class: ['dialogueMain', 'p-1'] }, dialogueTop, content, foot);
   
   let dialogueMain = $.cEl('div', { class: ['dialogue'] }, body);
   
   this.dialog = dialogueMain;
   return dialogueMain;
 }
 closeDialogueListener(e) {
  e.target.removeEventListener('click', this.closeDialogueListener);
  this.cancelled?.();
  this.dialog.remove();
  property.focus();
 }
 okButton(e) {
  e.target.removeEventListener('click', this.okButton);
  this.callback();
  this.dialog.remove();
  property.focus();
 }
}

export class PropertyDialogue extends Dialogue {
 constructor(name) {
  super(name);
  this.arrowBackSvg = this.arrowBackSvg.bind(this);
  this.h3SideBar = $.cEl('h3', { class: 'p-1', innerText: 'All' });
  this.backArrowIcon = $.cEl('i', { class: ['fa', 'fa-long-arrow-left'], style: { display: 'none' } });
  this.listIcon = $.cEl('i', { class: ['fa', 'fa-list-ul'] });
  this.propsMainH3Parent = $.cEl('span');
  this.stylePropList = this.stylePropList.bind(this);
  this.styleProp = this.styleProp.bind(this);
  this.generatePropsPropList = this.generatePropsPropList.bind(this);
  this.generatePropsComp = this.generatePropsComp.bind(this);
  this.propsFormatDiv = $.cEl('div', { class: ['propsFormatDiv'] }, $.cEl('div', { class: ['d-flex', 'jc-cent', 'al-cent'], style: { height: '100%' } }, $.cEl('h3', { class: 'center', innerHTML: 'Please, select an option from the left section.', style: { color: 'grey', fontSize: '11px', width: '11rem' } })));
  this.propsStyle = null;
  this.dialogueSelectPropValue = null;
  this.ranges = [-5000, -3000, -1000, -500, -300, -100, 0, 100, 300, 500, 1000, 3000, 5000];
  this.angles = [['full'], ['topBottom', 'rightLeft'], ['top', 'rightLeft', 'bottom'], ['top', 'right', 'bottom', 'left']];
  this.text = this.text.bind(this);
  
  this.rangeUpdateMeth = this.rangeUpdateMeth.bind(this);
  this.rangeAxis = this.rangeAxis.bind(this);
  this.rangeHolder = $.cEl('div', { id: 'rangeHolder' });
  this.rangeFormIndex = null;
  this.angleIndicator = this.angleIndicator.bind(this);
 }
 openDialogue() {
  try {
   let span = $.cEl('span', { class: ['back-arrow', 'd-flex', 'al-cent', 'jc-cent'], style: { backgroundColor: '#090511' } }, this.listIcon, this.backArrowIcon);
   let propsProps = $.cEl('ul', { id: 'propsProps' });
   this.backArrowIcon.ae('click', (e) => this.arrowBackSvg(e, propsProps));
   this.generatePropsPropList(styleProps, this.stylePropList, propsProps);

   let dialogueSidebar = $.cEl('div', { class: 'dialogueSidebar' }, $.cEl('div', { class: ['d-flex', 'al-str', 'ulHeader'] }, span, this.h3SideBar), $.cEl('div', { class: ['propsPropsParent', 'px-1', 'my-2'] }, propsProps));
   let propsMain = $.cEl('div', { class: ['flex-gr'], id: 'prop' }, $.cEl('div', { class: ['ulHeader', 'd-flex', 'al-cent', 'pl-2'] }, this.propsMainH3Parent), this.propsFormatDiv);
   let sideBarMainFlex = $.cEl('div', { class: ['d-flex', 'flex-gr']}, dialogueSidebar, propsMain);

   return [this.newDialog(sideBarMainFlex), this.closeProperty];
  } catch (e) { console.error(e.stack) }
 }

 generatePropsPropList(arr, eventFunc, propsProp, removeEvent, addName) {
  propsProp.innerHTML = '';
  arr.forEach((each, ind) => {
   let li;
   if (!removeEvent) {
    li = smallListComponent(each.name, true);
   } else {
    li = smallListComponent(each.name);
    !ind && li.classList.add('active-dialogueSidebarLi');
   }
   li.ae('submit', (e) => eventFunc(e, propsProp));
   li.name = each.name;
   if (addName) {
    li.dataset.parent = addName;
    li.dataset.style = each.data || each.name.replace(' ', '-').toLowerCase();
   }
   propsProp.appendChild(li);
  });
  if (removeEvent) this.generatePropsComp(propsProp.firstElementChild);
 }
 stylePropList(e, propsProp) {
  try {
   e.preventDefault();
   let targ = e.target;
   let targObj = styleProps.find(e => targ.name == e.name);
   let targetVal = targObj.val;
   /*for (let li of propsProp.children) {
    li.removeEventListener('click', stylePropList);
   }*/
   this.h3SideBar.innerText = targObj.name;
   
   this.listIcon.style.display = 'none';
   this.backArrowIcon.style.display = 'block';
   
   this.generatePropsPropList(targetVal, this.styleProp, propsProp, true, targObj.name);
  } catch (e) {
   console.error(e.stack);
  }
 }
 arrowBackSvg(e, propsProp) {
  try {
   this.h3SideBar.innerText = 'All';
   for (let li of propsProp.children) {
    li.removeEventListener('submit', (e) => this.styleProp(e, propsProp))
   }
   this.generatePropsPropList(styleProps, this.stylePropList, propsProp);
   e.currentTarget.style.display = 'none';
   e.currentTarget.previousElementSibling.style.display = 'block';
  } catch (e) {
   console.error(e.stack);
  }
 }
 styleProp(e) {
  try {
   e.preventDefault();
   let t = e.target;
   if (t.classList.contains('active-dialogueSidebarLi')) return;
   for (let li of propsProps.querySelectorAll('form')) {
    if (li.classList.contains('active-dialogueSidebarLi')) {
     li.classList.remove('active-dialogueSidebarLi');
     break;
    }
   }
   t.classList.add('active-dialogueSidebarLi');
   this.generatePropsComp(t);
  } catch (e) { console.error(e.stack) }
 }
 generatePropsComp(t) {
  try {
   const innerText = t.name;
   let datasetVal = t.dataset.parent;
   this.propsMainH3Parent.innerText = `${datasetVal} » ${innerText}`;
   let found = styleProps.find(e => datasetVal == e.name).val.find(e => e.name == innerText);
  
   this.propsFormatDiv.innerHTML = '';
   const selectedVal = $.cEl('input', { type: 'text', class: ['bg-body', 'border', 'rounded', 'p-1'] });
   selectedVal.ae('blur', function() {
    _.UPDATE_STYLE(t.dataset.style, this.value)
   });
   this.dialogueSelectPropValue = selectedVal;

   const propsSelectedValDiv = $.cEl('div', { innerText: `${innerText}: `, class: ['p-2'] }, selectedVal);
   propsSelectedValDiv.appendChild(this.dialogueSelectPropValue);
   this.propsFormatDiv.appendChild(propsSelectedValDiv);
   this.propsStyle = t.dataset.style;
   let rangeHolder = this.rangeHolder;
   let outerThis = this;
   let comps = {
    range(found) {
     let oldStyle = selectedElementObject.style[this.propsStyle],
      min, max, value;
     if (oldStyle && oldStyle.toString().match(/-?(\d+)/)) {
      function minimum(oldStyle) {
       min = outerThis.ranges.findIndex((num, ind) => parseInt(oldStyle) >= num && parseInt(oldStyle) < outerThis.ranges[ind+1]);
       max = outerThis.ranges[min +1];
       min = outerThis.ranges[min];
       value = oldStyle;
      }
      if (oldStyle.match(/\s\d/)) {
       let splitVal = oldStyle.split(' ');
       run(splitVal.length - 1);
       splitVal.forEach((each, ind) => {
        minimum(each);
        rangeHolder.appendChild(
         new CREATE_RANGE_COMP(
          {
           min, max, 
           value: parseInt(value),
           angleIndicator: this.angles[splitVal.length-1][ind],
           noAngleIndicator: found.angleIndicator,
           rangeInd: ind, 
           addUnit: true, 
           unit: value.match(/\D+$/)[0] || 'px' 
          }, 
          this.propsStyle,
          outerThis.rangeUpdateMeth)
         );
        this.propsFormatDiv.appendChild(rangeHolder);
       });
       return;
      }
      minimum(oldStyle);
     } else {
      min = 0, max = 100;
      value = oldStyle == undefined ? 0 : oldStyle.match(/\d/) ? oldStyle : 0;
     }

     function run(axis = 0) {
      outerThis.dialogueSelectPropValue.value = oldStyle || '';
      found.includeRangeAxis && outerThis.propsFormatDiv.appendChild(outerThis.rangeAxis(axis));
      rangeHolder.innerHTML = '';
     }
     run();
     rangeHolder.appendChild(new CREATE_RANGE_COMP({min, max, value: parseInt(value), angleIndicator: found.angleIndicator || 'full',
     showAngleIndicator: found.noAngleIndicator,
     rangeInd: 0, addUnit: !found.noUnit, unit: String(value).match(/\D+$/)?.[0] || 'px' }, outerThis.propsStyle, outerThis.rangeUpdateMeth));
     outerThis.propsFormatDiv.appendChild(rangeHolder);
    },
    text(found) {
     let selected = found.data || found.name.replace(' ', '-').toLowerCase();
     outerThis.propsFormatDiv.appendChild(outerThis.text(found.val, selectedElementObject.style[selected] && selectedElementObject.style[selected]));
    },
    select(found) {
     outerThis.selectValue(found, innerText.toLowerCase());
    },
    'select-add'() {
     outerThis.selectValue(found, innerText.toLowerCase(), true);
    }
   }
   found.type.forEach(each => comps[each].call(this, found));
  } catch (e) {
   console.error(e.stack);
  }
 }
 text(arr, highlight) {
  if (highlight) this.dialogueSelectPropValue.value = highlight;
  const div = $.cEl('div', { class: ['p-1', 'pt-3', 'mt-2', 'textPropValPar'] });
  div.ae('click', (e) => {
   let targ = e.target;
   if (targ.tagName == 'SPAN') {
    this.dialogueSelectPropValue.value = targ.innerText;
    _.UPDATE_STYLE(this.propsStyle, this.dialogueSelectPropValue.value)
   }
  });
  arr.forEach(each => div.appendChild($.cEl('span', { class: ['inl-bl', 'py-1', 'px-2', 'm-1', 'textPropVal', highlight && each == highlight && 'textPropValHoverClass'], innerText: each, tabIndex: 1 })));
  _.UPDATE_CLASS_ON_SELECT({ parent: div, className: 'textPropValHoverClass' });
  return div;
 }
 selectValue(object, id, add) {
  if(id in selectedElementObject.style) this.dialogueSelectPropValue.value = selectedElementObject.style[id];
  let div = $.cEl('div', { class:  ['p-1', 'm-1', 'bg-light'] });
  let run = (obj, selected, ind) => {
   let props = {
    innerText: obj.innerText,
    id: obj.innerText,
    class: 'p-1',
    selectProps: {
     attributes: {
      id: obj.innerText,
      class: ['form-select', 'w-50'],
      name: id
     },
     options: obj.val,
     selected,
     changeCallback: (e) => this.rangeUpdateMeth(e.target.value, { rangeInd: ind }, e.target)
    }
   }
   return props;
  }
  let rerun = () => {
   object.val.forEach((obj, ind) => {
   let selected = '';
   if(!selectedElementObject.style[id]) { 
    this.dialogueSelectPropValue.value += obj.val[0] + " ";
   }else {
    selected = selectedElementObject.style[id].split(' ')[ind];
   }
   
   div.append(CREATE_SELECT_WITH_LABEL(run(obj, selected, ind)));
   });
  }
  rerun();
  this.propsFormatDiv.append(div);
  
  if(add) {
  let adderDiv = $.cEl('div', { class: ['px-2', 'mt-2'] });
  let addbtn = $.cEl('btn', { class: ['btn', 'btn-primary', 'ml-1'], innerText: '+'}, $.cEl('i', { class: ['fa', 'fa-plus']}));
  
  addbtn.ae('click', () => {
   let obj = _.cloneObj(object.val[0]);
   let newObj = Object.assign(obj, { innerText: obj.innerText + ' ' + (object.val.length+1)});
   object.val.push(newObj);
   this.dialogueSelectPropValue.value = '';
   div.innerHTML = '';
   rerun();
  })
  let minusbtn = $.cEl('btn', { class: ['btn', 'btn-danger', 'ml-1'], innerText: '-'}, $.cEl('i', { class: ['fa', 'fa-minus']}));
  minusbtn.ae('click', () => {
   if(object.val.length == 1) return this.dialogueSelectPropValue.value = '';
   object.val.pop();
   this.dialogueSelectPropValue.value = '';
   div.innerHTML = '';
   rerun();
  })
  
  adderDiv.append(minusbtn, addbtn);
  this.propsFormatDiv.append(adderDiv);
 }
 }
 rangeUpdateMeth(val, obj, range) {
  try {
  let dialogueSelectPropValue = this.dialogueSelectPropValue;

  let currentVal = dialogueSelectPropValue.value.split(' ');
  if (currentVal[0] == '') {
   dialogueSelectPropValue.value = val;
  } else {
   currentVal[obj.rangeInd] = val;
   dialogueSelectPropValue.value = currentVal.join(' ');
  }
  
  _.UPDATE_STYLE(range.name, dialogueSelectPropValue.value);
 }catch(e) {
  console.error(e.stack);
 }
 }
 rangeAxis(e = 0, renderOnDisplay) {
  let rangeAxis = $.cEl('div', { class: ['p-1', 'pt-3', 'rangeAxis'] });
  let ranges = this.ranges;
  let outerThis = this;
  
  function reRenderRangeFormat(arr, arr2) {
   try {
   let rangeHolder = outerThis.rangeHolder;
   rangeHolder.innerHTML = '';
   
   arr.forEach((each, ind2) => {
    let min = ranges.findIndex((num, ind) => parseInt(each) >= num && parseInt(each) < ranges[ind+1]);
    let max = ranges[min+1];
    min = ranges[min];
    
    rangeHolder.appendChild(new CREATE_RANGE_COMP({min, max, value: parseInt(each), angleIndicator: arr2[ind2], rangeInd: ind2, addUnit: true, unit: String(each).match(/\D+$/)?.[0] || 'px' }, outerThis.propsStyle, outerThis.rangeUpdateMeth));
   });
  } catch(e) { console.error(e.stack); }
  }
  const axisFuncArr = [
   function(val) {
    let angleInd = ['full'];
    reRenderRangeFormat([val[0]], ['full']);
    outerThis.dialogueSelectPropValue.value = `${val[0]}`;
   },
   function(val) {
    let angleInd = ['topBottom', 'rightLeft'];
    if (val.length == 1) {
     reRenderRangeFormat([val[0], val[0]], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[0]}`;
    } else {
     reRenderRangeFormat([val[0], val[1]], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[1]}`;
    }
   },
   function(val) {
    let angleInd = ['top', 'rightLeft', 'bottom'];
    if (val.length == 1) {
     reRenderRangeFormat([val, val, val], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[0]} ${val[0]}`;
    } else if (val.length == 2) {
     reRenderRangeFormat([val[0], val[1], val[1]], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[1]} ${val[1]}`;
    } else {
     reRenderRangeFormat([val[0], val[1], val[2]], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[1]} ${val[2]}`;
    }
   },
   function(val) {
    let angleInd = ['top', 'right', 'bottom', 'left'];
    if (val.length == 1) {
     reRenderRangeFormat([val, val, val, val], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[0]} ${val[0]} ${val[0]}`;
    } else if (val.length == 2) {
     reRenderRangeFormat([val[0], val[1], val[1], val[1]], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[1]} ${val[1]} ${val[1]}`;
    } else {
     reRenderRangeFormat([val[0], val[1], val[2], val[2]], angleInd);
     outerThis.dialogueSelectPropValue.value = `${val[0]} ${val[1]} ${val[2]} ${val[2]}`;
    }
   }
  ];

  let dialogueSelectPropValue = this.dialogueSelectPropValue;
  if(renderOnDisplay) axisFuncArr[e]([0]);
  ['1v', '2v', '3v', '4v'].forEach((each, ind) => {
   const button = $.cEl('button', { innerText: each, class: ['m-1', ind == e && 'rangeAxisActiveBtn'] });

   function callAxisFunc(ind) {
    if (button.classList.contains('rangeAxisActiveBtn')) return;
    let val = dialogueSelectPropValue.value.split(' ');
    if (!parseInt(val)) val = ['0px'];
    axisFuncArr[ind](val);
   }
   button.ae('click', () => {
    callAxisFunc(ind);
    let attr = outerThis.propsMainH3Parent.innerText.match(/(?<=»).+/)[0].replace(/\s/g, '-').toLowerCase();
    if(attr[0] == '-') attr = attr.slice(1);
    _.UPDATE_STYLE(attr, dialogueSelectPropValue.value);
   });
   rangeAxis.appendChild(button);
  });

  _.UPDATE_CLASS_ON_SELECT({ parent: rangeAxis, className: 'rangeAxisActiveBtn' });
  return rangeAxis;
 }
 initializeRangePartsForExternalUse(rangeHolder, dialogueSelectPropValue, propsMainH3Parent, propsStyle) {
  this.rangeHolder = rangeHolder;
  this.dialogueSelectPropValue = dialogueSelectPropValue;
  this.propsMainH3Parent = propsMainH3Parent;
  this.propsStyle = propsStyle;
 }
 angleIndicator(angle) {
  return $.cEl('div', { class: ['angleIndicator', angle ? angle : 'full'] });
 }
}

export const openDialogue = function(e, alertFlag = true, elem) {
 try {
  if (alertFlag) {
   if (!context.selectedElement) {
    alert('Please select an element');
    return;
   }
  } else {
   context.selectedElement = _.getDomElemFromElemRef(elem.ref);
   selectedElementObject = _.getElementObj(elem.ref);
  }
  let dialogue = new PropertyDialogue().openDialogue();
  elId('root').appendChild(dialogue[0]);
 
  dialogue[1].focus();
 } catch(e) {
  console.error(e.stack);
 }
}

export class NewPageDialogue extends Dialogue {
 constructor(name) {
  super(name);
 }
 newPage(opt) { // opt - if this is called by edit page info feature.
 // it holds a string "edit" or undefined if called by New
  let nav = $.cEl('div', {});
  let dialogueSection;
  const tabs = ['Main', 'Page view', 'Open Graph'];
  this.myContext = _.cloneObj(opt ? files[context.opened_file] : NewFile);
  const outerThis = this;
  
  function receiveInput(tag, section) {
   let par = null;
   const value = !opt ? null : outerThis.myContext?.[tag.id];
   if (tag.meth == 'textarea') {
    const textarea = $.cEl('textarea', { class: ['p-2', 'py-1', 'bg-light'], id: tag.id, name: tag.id, rows: tag.rows, value: value || '', style: { width: "100%" } });
    textarea.ae('change', (e) => outerThis.myContext[tag.id] = e.currentTarget.value);
   
    if (tag?.placeholder) textarea.placeholder = tag.placeholder;
    par = $.cEl('div', {}, $.cEl('div', { class: ["pt-3"] },
      $.cEl('label', { htmlFor: tag.id, class: 'pb-1', innerText: tag.alias }),
     ),
     textarea
    );
    if(tag.info) {
     par.append($.cEl('small', { class: 'text-info' }, $.cEl('i', { class: ['fa', 'fa-info-circle', 'mr-1']}), document.createTextNode(tag.info)));
    }
    section.append(par);
    if (tag.break) section.append($.cEl('hr'));
   } else {
    section.append(new CREATE_SELECT_COMP(tag, par,  outerThis.myContext, value));
    if (tag.break) section.append($.cEl('hr'));
   }
  }
  
  function run(tags, name, heading, otherTask) {
   let section2 = dialogueSection.getElementsByTagName('section')[0];
   if (section2) section2.remove();
   section2 = null;
   const form = $.cEl('form');
   const section = $.cEl('section', { class: ['newFDialog', 'p-2', 'py-3'], name, style: {
     height: '350px', overflow: 'auto'
    } }, form);
    
   form.appendChild($.cEl('h1', { innerText: heading, class: 'text-info' }));
    if(otherTask) {
     let trigger =  $.cEl('input', { class: 'form-check-input', type: 'checkbox' });
     let triggerParent = $.cEl('div', { class: ['custom-control', 'form-switch'], role: 'switch' }, trigger);
     if(outerThis.myContext.enableOG) {
      trigger.checked = true;
     }
     triggerParent.ae('click', function() {
      outerThis.myContext["enableOG"] = !outerThis.myContext["enableOG"];
      if(outerThis.myContext["enableOG"]) {
       form.classList.remove('text-black-50');
       for(let child of form.getElementsByTagName('textarea')) {
         child.removeAttribute('disabled');
        }
       for (let child of form.getElementsByTagName('select')) {
         child.removeAttribute('disabled');
        }
       }else {
        form.classList.add('text-black-50');
       for (let child of form.getElementsByTagName('textarea')) {
         child.setAttribute('disabled', true);
       }
        for (let child of form.getElementsByTagName('select')) {
          child.setAttribute('disabled', true);
         }
       }
      });
      
     let switchParent = $.cEl('div', { class: ['d-flex', 'jc-sb', 'p-2', 'bg-primary', 'text-light', 'rounded']}, $.cEl('label', { htmlFor: 'enableOG', innerText: 'Enable open graph tags' }), triggerParent);
     form.append(switchParent, $.cEl('hr'));
    }
    
    tags.forEach(tag => receiveInput(tag, form));
    if(!outerThis.myContext.enableOG && section.name == 'OG') {
    form.classList.add('text-black-50');
    for (let child of form.getElementsByTagName('textarea')) {
     child.setAttribute('disabled', true);
    }
    for (let child of form.getElementsByTagName('select')) {
     child.setAttribute('disabled', true);
    }
    }
    dialogueSection.append(section);
    
    return section;
  }
  const actions = {
   'Main'() {
    if(this.innerText == 'Main' && dialogueSection.lastElementChild.name == 'Main') return;
    const tags = [{
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
    
    let section = run(tags, 'Main', 'New page settings');
    let addTagBtn = $.cEl('btn', { class: ['btn', 'btn-primary'], title: 'Add head section tag'}, $.cEl('i', { class: ['fa', 'fa-plus'], innerText: '+'}));
    
    let otherTagsCount = 0;
    
    function addTagFunc() {
     let textarea = $.cEl('textarea', { class: ['p-2', 'py-1', 'bg-light'], rows: '2', placeholder: 'e.g <link rel="alternate" type="application/atom+xml" href="posts.xml" title="Blog" />', value: outerThis.myContext.otherTags[otherTagsCount] || '', style: { width: "100%" } });
     textarea.dataset.tagIndex = otherTagsCount;
     textarea.ae('change', (e) => {
      outerThis.myContext.otherTags[textarea.dataset.tagIndex] = e.currentTarget.value;
     });
     
     let tag = $.cEl('div', {}, $.cEl('div', { class: ["pt-3"] },
       $.cEl('label', { class: 'pb-1', innerText: 'Add head section tag' }),
      ),
      textarea
     );
     otherTagsCount++;
     return tag;
    }
    addTagBtn.ae('click', function() {
      addTagBtn.insertAdjacentElement('beforebegin', addTagFunc());
     });
    
    let otherTagsAdded = Object.keys(outerThis.myContext.otherTags).length;
    if(otherTagsAdded) {
     for(let i=0; i<otherTagsAdded; i++) {
      section.append(addTagFunc());
     }
    }else {
     section.append(addTagFunc());
    }
    section.append(addTagBtn);
    
    return section;
   },
   'Page view'() {
    if(this.innerText == 'Page view' && dialogueSection.lastElementChild.name == 'Page view') return;
    
    let section2 = dialogueSection.getElementsByTagName('section')[0];
    if (section2) section2.remove();
    section2 = null;
   
    const props = [
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
    const form = $.cEl('form', { class: ['newFDialog', 'p-2', 'py-3'], style: {
     height: '350px', overflow: 'auto'
    } });
    const section = $.cEl('section', { name: 'Page view'}, form);
    let par = null;
    form.append($.cEl('h1', { innerText: 'Browser viewport settings', class: 'text-info'}));
    props.forEach(tag => {
     let par;
     const value = !opt ? null : outerThis.myContext?.[tag.id];
     if(tag.meth == 'input') {
      let input = $.cEl('input', { type: 'text', class: ['form-control', 'rem10'], id: tag.id, value: outerThis.myContext[tag.id] || '' });
      input.ae('change', function() {
       outerThis.myContext[tag.id] = this.value;
      });
      form.append($.cEl('div', { class: ['my-1', 'd-flex', 'jc-sb'] }, $.cEl('label', { htmlFor: tag.id, innerText: tag.alias }), input));
      
     }else if (tag.meth == 'opt') {
       form.append(new CREATE_SELECT_COMP(tag, par, outerThis.myContext, value));
       
     } else {
      let value2 = !opt ? null : outerThis.myContext?.[tag.name];
      if(value2) tag = { ...tag, value: value2 };
      
      form.append(
       $.cEl('div', { class: ['d-flex', 'al-cent', 'jc-sb'], style: { marginRight: '-0.5rem' }}, 
       $.cEl('label', {htmlFor: tag.name, innerText: tag.alias }),
       new CREATE_RANGE_COMP(tag, tag.name, function(val) {
       outerThis.myContext[tag.name] = val;
      })));
     }
    });
    const reset = $.cEl('input', { type: 'reset', class: ['mt-4', 'btn', 'btn-outline-success'] });
    reset.onclick = () => {
     let ranges = Array.from(section.getElementsByTagName('input')).filter(each => each.name);
     let outputs = Array.from(section.getElementsByTagName('output'));
     ranges.forEach((input, ind) => {
      let initialValue = props.find(obj => obj.name == input.name).value;
      input.value = initialValue;
      outputs[ind].innerText = initialValue;
      outerThis.myContext[input.name] = initialValue;
     });
    }
    
    form.append(reset);
    dialogueSection.append(section);
   },
   'Open Graph'() {
    if(this.innerText == 'Open Graph' && dialogueSection.lastElementChild.name == 'OG') return;
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
       locale: attr.lang.map(e => Object.keys(e))
      },
      innerText: attr.lang.map(e => Object.values(e)),
      meth: 'option',
      info: 'Default value "en-US" won\'t be added to your webpage!'
     }
    ];
    
    
    return run(tags, 'OG', 'Open Graph settings', true);
   }
  }
  tabs.forEach(tab => {
   let elem = $.cEl('button', { innerText: tab, class: ['p-1', 'px-3'] });
   elem.ae('click', actions[tab]);
   nav.append(elem);
  });
  nav.firstElementChild.classList.add('activeNewFTab');

  _.UPDATE_CLASS_ON_SELECT({ parent: nav, className: 'activeNewFTab' })
  dialogueSection = $.cEl('div', {}, $.cEl('div', {class: 'newFDialogHead'}, nav));
  dialogueSection.append(actions.Main());
  // This function runs when the ok button is clicked. It is inherited from the Dialogue class
  this.callback = function() {
   if(!opt) {
    let f = _.cloneObj(NewFile);
   /* console.log(f, 'newfile');
    console.log(outerThis.myContext, 'context');*/
    f = {
     ...f,
     ...outerThis.myContext,
     project: {
      0: {
       type: 'div',
       name: 'ROOT',
       props: { id: 'root', innerText: '' },
       ref: '0:',
       children: {},
       style: {}
      }
     },
    }
    files.push(f);
    MAIN_NAVIGATION.File.find(opt => opt.name == 'Open').value = files.map(e => ({ name: e.title, icon: ['a'] }));
    context.opened_file = files.length-1;
    project = files[context.opened_file].project;
    _.re_renderDOMSelectors();
    _.Create_New_Project();
   }else {
    files[context.opened_file] = {
     ...files[context.opened_file],
     ...outerThis.myContext
    }
   }
  }
  
  return [this.newDialog(dialogueSection), this.closeProperty];
 }
}

class CREATE_SELECT_COMP {
 constructor(tag, par, context, value) {
  this.tag = tag;
  this.par = par;
  this.context = context;
  this.value = value;
  this.comp = this.comp.bind(this);
  return this.comp();
 }
 comp() {
  try {
  let tag = this.tag, par = this.par, context = this.context, value = this.value;
  const select = $.cEl('select', { id: tag.id, name: tag.id, class: 'form-select', style: { width: '15rem'} });
  select.ae('change', (e) => context[tag.id] = e.currentTarget.value);
    
    for (let prop in tag.attr) {
     if ('content' in tag.attr) {
      tag.attr.content.forEach(each => select.append($.cEl('option', { value: each, innerText: each })))
     } else {
      tag.attr[prop].forEach((each, ind) => select.append($.cEl('option', { value: tag?.innerText?.[ind] || each, innerText: each })))
     }
    }
   
   if (value) {
     for(let option of select.options) {
      if (option.value == value) {
       option.selected = true;
       break;
      }
     }
    }
   par = $.cEl('div', { class: ['pt-3', 'd-flex', 'jc-sb', 'al-cent'] }, $.cEl('label', { htmlFor: tag.id, innerText: tag.alias }), select );
   if (tag.info) {
     par = $.cEl('div', {}, par, $.cEl('small', { class: ['inl-bl', 'mt-2', 'text-info'] }, $.cEl('i', { class: ['fa', 'fa-info-circle', 'mr-1'] }), document.createTextNode(tag.info)));
    }
    return par;
  }catch(e) {
   console.error(e.stack);
  }
 }
}

class CREATE_RANGE_COMP {
 constructor(obj, prop, callback) {
  this.ranges = [-5000, -3000, -1000, -500, -300, -100, 0, 100, 300, 500, 1000, 3000, 5000];
  
  this.range = this.range.bind(this);
  this.angleIndicator = this.angleIndicator.bind(this);
  return this.range(obj, prop, callback);
 }
 range(obj, prop, callback) {
  try {
  const range = $.cEl('input', { type: 'range', min: obj.min, max: obj.max, name: prop?.toLowerCase() || '', value: obj.value || 0, step: obj.step || 1, class: 'mx-2' });
  let rangeState = range.value;
  
  const chevronLeft = $.cEl('span', { class: 'p-1' }, $.cEl('i', { class: ['fa', 'fa-chevron-left'] }));
  const chevronRight = $.cEl('span', { class: 'p-1' }, $.cEl('i', { class: ['fa', 'fa-chevron-right'] }));
  let rangeOutput = $.cEl('output', { innerText: range.value, class: ['d-flex', 'al-cent', 'jc-cent'] });
  let unit;
  if(obj.addUnit) {
   unit = CREATE_SELECT({
    attributes: { class: 'p-1', style: { width: '3rem' } },
    options: ['px', 'vw', 'vh', 'em', 'rem', '%', 'vmax', 'ch', 'cm', 'pc', 'ex', 'fr', 'in', 'vmin', 'mm', 'pt'],
    selected: obj.unit,
    changeCallback: (e) => {
     callback(rangeState + e.target.value, obj, range); // callback is the function that would run on range input change
    }
   });
  }
  chevronLeft.onclick = () => {
   let index = this.ranges.findIndex(e => rangeState == e);
   if (rangeState == range.min) {
    range.min = this.ranges[index - 1];
    range.max = rangeState;
   } else {
    updateState(parseInt(range.value) - 1, callback);
   }
  }
  chevronRight.onclick = () => {
   let index = this.ranges.findIndex(e => parseInt(rangeState) == e);
   if (index == -1) index = 6;
   if (~index && rangeState == range.max) {
    range.min = rangeState;
    range.max = this.ranges[index + 1] || rangeState * 2;
   } else {
    updateState(parseInt(range.value) + 1, callback);
   }
  }
  let rangeDiv = $.cEl('span', { class: ['d-flex', 'al-cent'] }, chevronLeft, range, chevronRight);

  let form = $.cEl('form', { class: ['d-flex', 'al-cent', 'py-1'] });
   if(!obj?.['showAngleIndicator']) {
   obj?.angleIndicator && form.append(this.angleIndicator(obj.angleIndicator));
  }
  form.append(rangeDiv, 
    $.cEl('div', { class: 'range-output' }, rangeOutput)
   );
  obj.addUnit && form.append(unit);
  form.ae('input', function() {
   let val = Math.round(range.valueAsNumber);
   updateState(val, callback); // callback is the function that would run on range input change
  });

  function updateState(val, callback) {
   range.value = val;
   rangeState = val;
   rangeOutput.innerText = val;
   callback(val + (unit ? unit.value : ''), obj, range); // function to run on range input change
  }
  
  rangeDiv = $.cEl('div', { class: ['range', 'p-2', 'center'] }, form);
  return rangeDiv;
  }catch(e) {
   console.error(e.stack);
  }
 }
 angleIndicator(angle) {
  return $.cEl('div', { class: ['angleIndicator', angle ? angle : 'full'] });
 }
}

export class CREATE_NEW_ELEMENT_COMP extends Dialogue {
 constructor(object, checkProperties) {
  super();
  this.object = object;
  this.name = this.object.name;
  this.checkProperties = checkProperties;
  return this.component();
 }
 component() {
  if(!selectedElementObject.ref) return alert('Please select an element!');
  let main = $.cEl('form', { class: ['propsFormatDiv', 'p-2', 'text-black-50'] });
  let textarea = CREATE_TEXTAREA({
   attributes: {
    placeholder: 'Enter a text for this element. You can always edit it later.', class: 'form-control',
    id: 'innerText',
    rows: 4
   },
   changeCallback: (e) => this.myContext["innerText"] = e.target.value
  });
  if(this.checkProperties) {
   let obj = _.getElementObj(this.checkProperties);
   this.object.type = obj.type;
   this.object.name = obj.name;
   this.object.notText = obj.notText;
   this.object.attributes = generateAttributes(obj.type);
   textarea.value = obj.props.innerText || '';
   this.myContext = { ...this.myContext, ...obj.props };
  }
  
  textarea.onchange = (e) => this.myContext["innerText"] = e.target.value;
  
  let selectWithLabel;
  
  // If attributes added changes, run callback
  let changeCallback = (event) => {
   let newDiv = $.cEl('div', {class: ['p-2', 'my-3', 'border', 'rounded']});
   selectWithLabel.parentElement.replaceChild(newDiv, main.lastElementChild);
   main.append(newDiv);
  
  let renderOptions = (arr) => {
   if(event) arr = Array.from(event.target.selectedOptions).map(e => e.value);
   if(!arr.length) arr = Object.keys(this.object.attributes[0]);
   
   for(let key of arr) {
    let val = key;
    let obj = this.object.attributes.find(e => Object.keys(e)[0] == val);
    let selectedOption;
    if (Array.isArray(obj[val])) {
     selectedOption = CREATE_SELECT_WITH_LABEL({
      innerText: val.capitalize() + ":",
      id: val,
      class: ['my-3'],
      selectProps: {
       attributes: {
        class: ['form-select', 'w-50'],
        id: val
       },
       options: obj[val],
       selected: this.myContext[val],
       changeCallback: (e) => this.myContext[val] = e.target.value
      }
     });
        
     this.myContext[val] = this.myContext[val] || obj[val][0];
    } else if(obj[val] == 2) {
     selectedOption = CREATE_INPUT_WITH_LABEL({
      innerText: val.capitalize() + ":",
      id: val,
      inputProps: {
       id: val,
       value: this.myContext[val] || ''
      },
      inputChange: (e) => this.myContext[val] = e.target.value.trim()
     });
        
     this.myContext[val] = this.myContext[val] || '';
    }else {
     //if(val == 'class') console.log('a class');
     selectedOption = $.cEl('div', {}, 
     $.cEl('label', { innerText: val.capitalize() + ":", htmlFor: val, class: 'd-block' }),
      CREATE_TEXTAREA({
      attributes: {
       id: val,
       value: this.myContext[val] || '',
       rows: 3
      },
      changeCallback: (e) => this.myContext[val] = e.target.value
     })
     );
     this.myContext[val] = this.myContext[val] || '';
    }
    newDiv.append(selectedOption, $.cEl('hr'));
   }
  }
  
  // If called by first render not on attribute change: !event or checkProperties == true
  try {
  !event && !this.checkProperties ? renderOptions(Object.keys(this.myContext)) : this.checkProperties ? renderOptions(Object.keys(this.myContext).filter(e => e != 'innerText')) : renderOptions();
  } catch(e) {
   console.error(e.stack);
  }
  }
  selectWithLabel = CREATE_SELECT_WITH_LABEL({
    innerText: 'Add attributes:',
    id: 'addAttr',
    class: ['text-info'],
    selectProps: {
     attributes: {
      class: ['form-select', 'w-50'], 
      id: 'addAttr',
      multiple: true
     },
     options: this.object.attributes,
     selected: Object.keys(this.myContext).filter(e => e != 'innerText').length && Object.keys(this.myContext),
     changeCallback,
    }
   });
   let fileInput = this.myContext['src'] || '';
  if(this.object.notText) {
  let currentFile = '';
  let display = (type) => {
   let parent = $.cEl('div', { class: ['p-2', 'text-center'], style: { maxHeight: '300px', overflow: 'auto' } }, $.cEl('p', { id: 'fileInputName', class: ['text-truncate'] } ));
   if(type != 'img') {
    parent.append($.cEl(type, { controls: true, id: 'fileComp', src: this.myContext['src'] || '' }));
    return parent;
   }
   parent.append($.cEl('img', { src: this.myContext['src'] || 'images/webber.png', id: 'fileComp' }));
   return parent;
  } 
  
  let inputComp = $.cEl('input', { type: 'file', class: 'form-file-input', id: 'upload' });
  
  inputComp.ae('change', () => {
   try {
   let file = inputComp.files[0];
   if(this.object.type == 'img' && !file.type.match(new RegExp('image.*')) && file.type.match(new RegExp('jpg||JPG||png||PNG||gif||GIF||webp'))) return alert('Please upload an image file of these formats: .jpg .JPG .png .PNG .gif .GIF .webp');
   if(this.object.type == 'video' && !file.type.match(new RegExp('video.*'))) return alert('Please upload a video file');
   if(currentFile) URL.revokeObjectURL(currentFile);
   elId('fileInputName').innerText = file.name;
   let url = URL.createObjectURL(file);
   this.myContext['src'] = url;
   elId('fileComp').src = url;
   changeCallback();
   currentFile = url;
   } catch(e) {
    if(e.name == 'TypeError') return;
    alert('Please upload a valid media type');
    console.error(e.stack);
    console.error('Attempting to upload a different or invalid media type!');
   }
  })
  
  fileInput = $.cEl('div', {}, display(this.object.type), 
   $.cEl('div', {}, 
    inputComp,
    $.cEl('label', { htmlFor: 'upload' }, 
    $.cEl('button', { type: 'button', class: ['btn', 'btn-success', 'p-2', 'px-3', 'mb-2'], innerText: 'Upload'}))
   )
  );
 }
  main.append(
   this.object.notText ? fileInput : textarea, this.object.notText ? '' : $.cEl('hr'), 
   selectWithLabel, 
   $.cEl('small', { class: ['d-block', 'pt-1', 'text-right', 'text-info']}, 
    $.cEl('span', {innerText: 'Click '}), 
    $.cEl('i', { class: ['fa', 'fa-arrow-circle-up']}), 
    $.cEl('span', {innerText: ' to add or remove attributes.'})
   ),
   $.cEl('div')
  );
  elId('root').append(this.newDialog(main));
  changeCallback(); // render the input for first attribute since it will be selected at first
  
  this.callback = () => { // When the user clicks ok
   let formElements = [];
   // Get attributes added to the element
   for(let elem of main.elements) elem.id != 'addAttr' && formElements.push(elem.id);
   let newContext = {};
   formElements.forEach(element => {
    if(element in this.myContext && this.myContext[element].trim()) {
     newContext[element] = this.myContext[element];
    }
   })
   newContext.innerText || (newContext.innerText = '');
   if (this.checkProperties) {
    let domElem = _.getDomElemFromElemRef(selectedElementObject.ref);
    
    selectedElementObject.props = newContext;
    _.UPDATE_DOM_ELEMENT_ATTRIBUTES(selectedElementObject);
    _.re_renderDOMSelectors();
    return;
   }
   
   _.INSERT_NEW_ELEMENT({
    type: this.object.type,
    name: this.object.name,
    props: newContext,
    notText: this.object.notText ? true : false
   });
  }
 }
}

export class BorderSettingsComponent extends SmallDialogue {
 constructor(name) {
  super(name);
  this.myContext = {
   'border-style': 'solid',
   'border-width': '1px'
  };
  this.useStylishRadius = false;
 }
 component() {
  const main = $.cEl('main', { class: ['dialogueBody', 'propsFormatDiv', 'p-2'] });
  main.append(
   $.cEl('h2', { class: ['text-info', 'd-flex', 'al-cent']},
    new PropertyDialogue().angleIndicator(), 
    $.cEl('span', { innerText: 'Border settings', class: 'ml-1' })
   )
  );
  if(!('useStylishRadius' in selectedElementObject)) _.UPDATE_STYLE('border', '1px solid');
  
  for(let key in selectedElementObject.style) {
   if(key.startsWith('border')) this.myContext[key] = selectedElementObject.style[key];
  }
  this.useStylishRadius = selectedElementObject.useStylishRadius || false;
  
  const comp = () => $.cEl('div', { class: ['p-2', 'mt-1', 'text-black-50', 'bg-body', 'border']});
  
  const border_style_comp = comp(), border_width_comp = comp(), border_radius_comp = comp(), border_color_comp = comp();
  
  main.append(
   $.cEl('section', {},
    CLICK_DROPDOWN('Border style', border_style_comp),
    CLICK_DROPDOWN('Border width', border_width_comp, true),
    CLICK_DROPDOWN('Border radius', border_radius_comp),
    CLICK_DROPDOWN('Border color', border_color_comp),
   )
  );
  
  elId('root').append(this.dialogue(main));
  
  const angles = ['full', 'top', 'right', 'bottom', 'left'];
  angles.forEach(each => {
   let style = $.cEl('div', { class: ['d-flex', 'al-cent', 'mb-2'] }, new PropertyDialogue().angleIndicator(each));
   style.append(CREATE_SELECT({ 
    attributes: {
     class: ['form-select', 'w-50']
    },
    options: ['', 'none', 'solid', 'dotted', 'dashed', 'groove', 'ridge', 'hidden', 'double', 'inset', 'outset', 'initial', 'inherit'],
    selected: this.myContext[`border${each == 'full' ? '' : '-' + each}-style`],
    changeCallback: (e) => {
     _.UPDATE_STYLE(`border${each == 'full' ? '' : '-' + each}-style`, e.target.value);
    }
   }));
   border_style_comp.append(style);
  });
  
  const ranges = [-5000, -3000, -1000, -500, -300, -100, 0, 100, 300, 500, 1000, 3000, 5000];
  
  angles.forEach(each => {
   let style = $.cEl('div', { class: ['d-flex', 'al-cent', 'mb-2'] }, new PropertyDialogue().angleIndicator(each));
   
   let value = this.myContext[`border${each == 'full' ? '' : '-' + each}-width`] || '0px';
  
   let min = parseInt(value) == 0 ? 6 : ranges.findIndex((num, ind) => parseInt(value) >= num && parseInt(value) < ranges[ind+1]);
   let max = ranges[min+1];
   min = ranges[min];
   
   let unit = String(value).match(/\D+$/) || 'px';
   value = parseInt(value);
   style.append(
    new CREATE_RANGE_COMP({
     min, max,
     value,
     addUnit: true,
     unit
    },
    `border${each == 'full' ? '' : '-' + each}-width`,
    (val) => {
     _.UPDATE_STYLE(`border${each == 'full' ? '' : '-' + each}-width`, val);
    }
    )
   );
   border_width_comp.append(style);
  });
  
  let trigger =  $.cEl('input', { class: 'form-check-input', type: 'checkbox' });
  let triggerParent = $.cEl('div', { class: ['custom-control', 'form-switch'], role: 'switch' }, trigger);
  if (this.useStylishRadius) {
   trigger.checked = true;
  }
  triggerParent.ae('click', (e) => {
   this.useStylishRadius = !this.useStylishRadius;
  });
  
  border_radius_comp.append(
   $.cEl('div', { class: ['d-flex', 'jc-sb', 'p-2','mt-1', 'mb-4', 'bg-primary', 'text-light', 'rounded']},
    $.cEl('label', { htmlFor: 'stylish', innerText: 'Enable stylish border radius' }), triggerParent
   )
  );
  
  [{name: 'fullRound', value: ''}, {name: 'topLeft', value: 'top-left'}, {name: 'topRight', value: 'top-right'}, {name: 'rightBottom', value: 'bottom-right'}, {name: 'leftBottom', value: 'bottom-left'}].forEach(each => {
   let style = $.cEl('div', { class: ['d-flex', 'al-cent', 'mb-2'] }, new PropertyDialogue().angleIndicator(each.name));
   
   let val = this.myContext[`border${each.name == 'fullRound' ? '' : '-' + each.value}-radius`] || '0px';
  
   let min = parseInt(val) == 0 ? 6 : ranges.findIndex((num, ind) => parseInt(val) >= num && parseInt(val) < ranges[ind + 1]);
   let max = ranges[min + 1];
   min = ranges[min];
   
   let unit = String(val).match(/\D+$/) || 'px';
   val = parseInt(val);
   style.append(
    new CREATE_RANGE_COMP({
     min, max,
     value: val,
     addUnit: true,
     unit
    },
    `border${each.name == 'fullRound' ? '' : '-' + each.value}-radius`,
    (val) => {
     _.UPDATE_STYLE(`border${each.name == 'fullRound' ? '' : '-' + each.value}-radius`, val);
    }
    )
   );
   border_radius_comp.append(style);
  });
  
  angles.forEach(each => {
   let style = $.cEl('div', { class: ['d-flex', 'al-cent', 'mb-2'] }, new PropertyDialogue().angleIndicator(each));
   let colorSelect = $.cEl('input', { type: 'color', value: this.myContext[`border${each == 'full' ? '' : '-' + each}-color`] });
   let value = $.cEl('small', { class: ['text-info', 'ml-2'], innerText: colorSelect.value });
   colorSelect.oninput = (e) => {
    value.innerText = e.target.value;
    _.UPDATE_STYLE(`border${each == 'full' ? '' : '-' + each}-color`, e.target.value);
   };
   style.append(colorSelect);
   style.append(value);
   
   border_color_comp.append(style);
  });
  this.cancelled = () => {
   selectedElementObject.style = this.previousStyle;
   _.UPDATE_DOM_ELEMENT_STYLE();
  }
  this.callback = () => {
   selectedElementObject.useStylishRadius = this.useStylishRadius;
   console.log(context.selectedElement)
   console.log('Ok clicked. Border styles added or removed.');
  }
 }
}

export let CLICK_DROPDOWN = function(name, content, open) {
 let main = $.cEl('div', { class: 'mb-2' });
 
 let iconUp = $.cEl('i', { class: ['fa', 'fa-chevron-up', 'icon'] });
 !open && iconUp.classList.add('d-none');
 let iconDown = $.cEl('i', { class: ['fa', 'fa-chevron-down', 'icon'] });
 open && iconDown.classList.add('d-none');
 
 let header = $.cEl('div', { innerText: name, class: ['p-2', 'd-flex', 'al-cent', 'jc-sb', 'form-control'] },
  iconUp, iconDown
 );
 
 if(!open) content.classList.add('hide');
 main.append(header, content);
 header.ae('click', () => {
  content.classList.toggle('hide');
  iconDown.classList.toggle('d-none');
  iconUp.classList.toggle('d-none');
 });
 return main;
}

function CREATE_INCR_INPUT(value, limit, callback) {
 let parent = $.cEl('div', { class: ['d-flex', 'al-cent', limit.width || 'w-50', 'my-1'] });
 let input = $.cEl('input', { class: ['form-control', 'text-center', 'flex-gr'], type: 'text', value: value || '0' });
 input.onkeyup = () => callback(input.value, parent.parentElement, input);
 
 let incr = $.cEl('button', { class: ['btn', 'btn-secondary', 'ml-1', 'p-1', 'px-2']}, $.cEl('i', { class: ['fa', 'fa-plus']}));
 incr.onclick = () => {
  let val = input.value;
  if(val.includes('NaN')) {
   input.value = '0';
  }else {
   val = parseInt(val) +1;
   if(val > limit.max) return;
   input.value = val;
  }
  callback(val, parent.parentElement, input);
 }
 let decr = $.cEl('button', { class: ['btn', 'btn-secondary', 'mr-1', 'p-1', 'px-2']}, $.cEl('i', { class: ['fa', 'fa-minus']}));
 decr.onclick = () => {
  let val = input.value;
  if(val.includes('NaN')) {
   input.value = '0';
  }else {
   val = parseInt(val) -1;
   if(val < limit.min) return;
   input.value = val;
  }
  callback(val, parent.parentElement, input);
 }
 parent.append(decr, input, incr);
 return parent;
}

function CREATE_SELECT_WITH_LABEL(props) {
 let component = $.cEl('div', { class: ['d-flex', 'al-cent', 'jc-sb']}, 
  $.cEl('label', { innerText: props.innerText, htmlFor: props.id }), 
  CREATE_SELECT(props.selectProps)
 );
 
 if(props.class) {
  switch (typeof props.class) {
   case 'string':
    component.classList.add(props.class); break;
   default:
    props.class.forEach(each => component.classList.add(each));
  }
 }
 return component;
}

function CREATE_SELECT(props) {
 let select = $.cEl('select', props.attributes);
 props.options.forEach(value => {
  if(typeof value == 'string') {
   select.append($.cEl('option', { value, text: value }));
  }else {
   value = Object.keys(value)[0];
   select.append($.cEl('option', { value, innerText: value }));
  }
 });
 
 if(props.selected) {
  if(typeof props.selected == 'string') {
   for(let option of select) option.value == props.selected && (option.selected = true);
  }else {
   for(let option of select) props.selected.indexOf(option.value ) != -1 && (option.selected = true);
  }
 }else {
  select.firstElementChild.selected = true;
 }
 select.ae('change', props.changeCallback);
 return select;
}

function CREATE_INPUT_WITH_LABEL(props) {
 let input = $.cEl('input', { class: ['form-control', 'w-75'], ...props.inputProps});
 
 input.ae('change', props.inputChange);
 
 let div = $.cEl('div', { class: 'my-2' }, 
  $.cEl('label', { innerText: props.innerText, htmlFor: props.id }), 
  input
 );
 return div;
}

function CREATE_TEXTAREA(props) {
 let textarea = $.cEl('textarea', { class: ['form-control'], ...props.attributes });
 textarea.onchange = props.changeCallback;
 return textarea;
}
