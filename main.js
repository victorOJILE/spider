import * as $ from './lib/createElements.js';
import { _, FEATURES } from './lib/utils.js';
import { menubar, toolbar, openDialogue } from './components.js';
import { tools } from './lib/tools.js';

import colorGen from './lib/colors.js';

menubar(); // Render menu bar

const tools_section = elId('tools-section');

toolbar(tools_section, tools); // Render tools section

/*
const formatBar = elCls('format-bar')[0];

formatBar.ae('click', function(e) {
 let action = e.target.closest('span').dataset.action;
 FEATURES[action]();
});
*/
function checkFrameLoadStatus() {
if(iframeLoaded) {
 iframeDoc = iframe.contentDocument || iframe.contentWindow;
 projBody = iframeDoc.body;
 try {
  $.cEl2(projBody, project);
  iframe.parentElement.dataset.file = 'file' + files.length;
  selectedElementObject = _.getElementObj('0:');
  context.selectedElement = _.getDomElemFromElemRef('0:');
  
  // Activate this code later
  
 // setTimeout(FEATURES["Save as"], 1000);
 }catch(e) {
  console.error(e.stack);
 }
}else {
 setTimeout(checkFrameLoadStatus, 1000);
}
}
checkFrameLoadStatus();
elId('page-title').innerText = files[context.opened_file].title;

try {
 let rightpane = document.querySelector('#right-pane');
 _.UPDATE_CLASS_ON_SELECT({ parent: rightpane.getElementsByClassName('tabs')[0], className: 'currentTab' });
 let main = rightpane.querySelector('main');
 class RightPaneTabs {
  constructor() {
   this.color = '';
   this.property = context.currentColorUseVal || 'color';
  }
  dom(tabName) {
   $.cEl4(main, project);
   main.dataset.tab = tabName;
  }
  colors(tabName) {
   const custom_color = $.cEl('input', { type: 'color', class: 'mr-1', value: _.COLOR_HEX_VAL(selectedElementObject.style?.[this.property] || this.color) });
   const colorInput = $.cEl('input', { type: 'text', class: ['p-1', 'text-light'], value: selectedElementObject.style?.[this.property] || this.color, placeholder: 'Enter color value' });
   const colorUseVal = $.cEl('select', { class: ['p-1', 'ml-1', 'text-light'] });
   const colorPropsArr = ["accentColor", "backgroundColor", "borderBlockColor", "borderBlockEndColor", "borderBlockStartColor", "borderBottomColor", "borderColor", "borderInlineColor", "borderInlineEndColor", "borderInlineStartColor", "borderLeftColor", "borderRightColor", "borderTopColor", "caretColor", "color", "columnRuleColor", "floodColor", "lightingColor", "outlineColor", "stopColor", "textDecorationColor", "textEmphasisColor", "webkitBorderAfterColor", "webkitBorderBeforeColor", "webkitBorderEndColor", "webkitBorderStartColor", "webkitColumnRuleColor", "webkitTapHighlightColor", "webkitTextEmphasisColor", "webkitTextFillColor", "webkitTextStrokeColor"];
   
   for(let key of colorPropsArr.map(each => replaceCaps(each))) {
    let option = $.cEl('option', { value: key, innerText: key });
    if(key == this.property) option.selected = true;
    colorUseVal.appendChild(option);
   }
   
   const divNextToColors = $.cEl('div', { class: ['p-1', 'pt-4'] },
    $.cEl('div', { class: 'flex' }, custom_color, colorInput, colorUseVal));
    
   const colors = $.cEl('div', { class: 'colors' }, divNextToColors);
   const defaultColors = ['white', 'floralwhite', 'ghostwhite', 'whitesmoke', 'azure', 'aliceblue', 'black', 'red', 'green', 'blue'];
   const otherColors = $.cEl('ul', { class: 'flex' });
   defaultColors.forEach((each, ind) => {
    let li = $.cEl('li', { style: { backgroundColor: each, title: each } });
    if (ind == 6) li.style.border = '1px solid white';
    li.dataset.color = each;
    otherColors.appendChild(li);
   });
   const colorsMain = $.cEl('div', { class: 'colorsMain' });
   const colorList = $.cEl('div', { id: 'allColors', class: ['p-1', 'mt-2', 'boundaryBoder'] }, otherColors, colorsMain);
   colors.appendChild(colorList);
   colorGen(colorsMain);
   
   custom_color.ae("input", function() {
    colorInput.value = this.value;
    _.UPDATE_STYLE(colorUseVal.value, this.value);
    this.color = this.value;
   });
   
   colorInput.ae('blur', function() {
    if (!context.selectedElement) {
     alert('Please select an element!');
     return;
    }
    _.UPDATE_STYLE(colorUseVal.value, this.value.toLowerCase());
    this.color = this.value.toLowerCase();
   });
   let allColors = colorList.getElementsByTagName('li');
   colorList.ae('click', (e) => {
    try {
     if (!selectedElementObject.ref) return;
     let targ = e.target;
     if (targ.tagName == 'LI') {
      let color = targ.dataset.color;
      colorInput.value = color;
      custom_color.value = _.COLOR_HEX_VAL(color);
      _.UPDATE_STYLE(colorUseVal.value, color);
      this.color = color;
      for (let li of allColors) {
       if (li.classList.contains('allColorsSelected')) li.classList.remove('allColorsSelected');
      }
      targ.classList.add('allColorsSelected');
     }
    } catch (e) { console.error(e.stack) }
   });
   
   colorUseVal.ae('change', (e) => {
    this.property = e.target.value;
   })
   main.appendChild(colors);
   for (let li of allColors) {
    if (li.dataset.color == this.color) li.classList.add('allColorsSelected');
   }
   main.dataset.tab = tabName;
  }
  styles(tabName) {
   main.dataset.tab = tabName;
   let div = $.cEl('div', { style: { display: 'grid', gridTemplateRows: 'repeat(12, 1fr)', gridTemplateAreas: '"BBBBBBCCCCCC"', backgroundColor: 'green' }},
    $.cEl('div', { style: { height: '3rem', backgroundColor: 'red', gridArea: 'B'} }),
    $.cEl('div', { style: { height: '3rem', backgroundColor: 'blue', gridArea: 'C'} })
   );
   console.log(div);
   main.append(div);
  }
 }

 let rightPaneTabs = new RightPaneTabs();
 rightpane.firstElementChild.ae('click', async (e) => {
  let t = e.target;
  if (t.tagName == 'SPAN') {
   let tabName = t.dataset.tab;
   if (main.dataset.tab == tabName) return;
   main.innerHTML = '';
   rightPaneTabs[tabName](tabName);
  }
 });
 rightPaneTabs.colors('colors');
} catch (e) {
 console.error('Error in the right pane component', e.stack);
}

const property = elId('property');
property.ae('click', openDialogue);

/*
function hotkeys(event) {
 
}

window.addEventListener('keydown', hotkeys);

let initialValue;

function inputChange(e, elemInput) {
 let inputVal = elemInput.value;
 let value = elemInput.value + elemInput.parentElement.getElementsByTagName('input')[1].value;
 if (!inputVal.match(/\d/)) {
  if (dV.widHeiValues.includes(inputVal)) {
   _.UPDATE_STYLE(elemInput.name, inputVal);
   return;
  }
 }
 _.UPDATE_STYLE(elemInput.name, value);
}

function clickChange(e, elem, elemInput, type) {
 const target = e.target;
 if (target.tagName != 'LI') return;
 if (target.dataset.selected != 'true') {
  for (let li of Array.from(elem.children).filter(el => el.tagName == 'LI')) {
   if (li.dataset.selected == 'true') {
    li.dataset.selected = '';
   }
  }
  target.dataset.selected = 'true';
  if (target.innerText == initialValue) {
   elemInput.value = target.innerText;
   return;
  }
  let val = target.innerText;
  if (type == 'val') {
   if (!val.match(/\d+$/)) {
    if (dV.widHeiValues.includes(val)) {
     elemInput.value = target.innerText;
     _.UPDATE_STYLE(elemInput.name, val);
     return;
    }
   } else {
    elemInput.value = target.innerText;
    val = target.innerText + elId(elemInput.name + "-un").value;
    _.UPDATE_STYLE(elemInput.name, val);
   }
  } else {
   let v = elId(elemInput.name + "-sh").value;
   if (!v.match(/\d+$/)) {
    elemInput.value = target.innerText;
    return;
   }
   val = v + target.innerText;
   elemInput.value = target.innerText;
   _.UPDATE_STYLE(elemInput.name, val);
  }
 }
}

function createLi(elem, listType) {
 listType.forEach(each => elem.appendChild(smallListComponent2(each)));
 return elem.parentElement.previousElementSibling;
}

function createList(listClass, listType, type = 'val') {
 const list = elCls(listClass);
 for (let elem of list) {
  const elemInput = createLi(elem, listType);
  elemInput.ae('focus', (e) => {
   initialValue = e.target.value;
  });
  elem.ae('click', (e) => clickChange(e, elem, elemInput, type));
  elemInput.ae('blur', (e) => inputChange(e, elemInput));
 }
}

// createList('unitList', dV.unitValues, 'unit');

//createList('widthHNumberList', dV.widHeiValues, 'val');


let dropdown = (d = {}) => {
  try {
   let childr = d.children.map(each => {
    let li;
    if(each.name) {
     li = $.cEl('li', {class: [d.childrClass, 'flex', 'jc-sb', 'al-cent'] }, $.cEl('span', {innerText: each.name}), $.cEl('span', {innerHTML: '<i class="fa fa-chevron-right"></i>'}));
    }else {
     li = $.cEl('li', { innerHTML: each.icon || each, class: d.childrClass });
     if (typeof each == 'object') {
      li.ae('click', each.action);
     }
    }
    return li;
   });
   let ul = $.cEl('ul', {}, ...childr);
   let dropcnt = $.cEl('div', { class: d.dropcntClass }, ul);
   let li = $.cEl(d.returnType, { class: d.returnClass }, $.cEl(d.returnType2, { innerHTML: d.name }), dropcnt);
   d.action && li.ae('click', d.action);
   return li;
  } catch (e) {
   console.error(e.stack);
   console.error(`Error in ${d.compName} component code`);
  }
 }
 const toolsUl = elId('tools-section').getElementsByTagName('ul')[0];
 try {
  for (let t in tools) {
   toolsUl.appendChild(dropdown({
    name: tools[t].icon,
    action: tools[t].action,
    children: tools[t].childrenTools,
    childrClass: "p-1",
    dropcntClass: ["dropdown-content", "abs-right"],
    returnType: 'li',
    returnType2: 'i',
    returnClass: ['dropdown', 'p-1'],
    compName: 'tools button'
   }));
  }
 } catch (e) {
  console.error('Error in tools render code!')
 }*/