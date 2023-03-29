try {
 const smallListComponent = (f) => cEl('li', { class: 'p-1', innerText: f });
 try {
 let rightpane = document.querySelector('#right-pane');
 updateClassOnSelect({parent: rightpane.getElementsByClassName('tabs')[0], className: 'currentTab'});
 let main = rightpane.querySelector('main');
 class LeftPaneTabs {
  constructor() {

  }
  dom(tabName) {
   cEl4(main, project);
   main.dataset.tab = tabName;
  }
  colors(tabName) {
   let custom_color = cEl('input', {type: 'color', class: 'mr-1', value: ''});
   let colorInput = cEl('input', { type: 'text', class: 'p-1', placeholder: 'Enter color value'});
   let colorUseVal = cEl('input', { type: 'text', id: 'colorUseValue', value: 'color', class: 'p-1'});
   let colorUse = cEl('ul', {class: 'colorUse'});
   let divNextToColors = cEl('div', {class: 'p-1'}, cEl('h2', {class: 'colorProp', id: 'colorProp', innerText: 'Text color'}), cEl('div', {class: 'flex'}, custom_color, colorInput), cEl('div', {class: 'dropdown'}, cEl('span', {class: 'icon', innerHTML: '&hearts;'}), colorUseVal, cEl('div', {class: ['dropdown-content', 'main-list']}, colorUse)), cEl('p', {class: ['colorProp', 'inl-block'], innerText: 'Color property'}));
   let colors = cEl('div', {class: 'colors'}, divNextToColors);
   let defaultColors = ['black', 'white', 'red', 'green', 'blue'].map((each, ind) => {
    let li = cEl('li', {style: {backgroundColor: each}});
    if(!ind) li.style.border = '1px solid white';
    li.dataset.color = each;
    return li;
   });
   let colorsMain = cEl('div', {class: 'colorsMain'});
   let colorList = cEl('div', {id: 'allColors', class: ['p-1', 'mt-2', 'boundaryBoder']}, cEl('ul', {class: 'flex'}, ...defaultColors), colorsMain);
   colors.appendChild(colorList);
   colorGen(colorsMain);
   let elemInput = createLi(colorUse, getStyle('color').map(each => replaceCaps(each)));
   custom_color.ae("change", function() {
    colorInput.value = this.value;
    updateStyle(colorUseVal.value, this.value)
   });
   colorInput.ae('blur', function() {
    if (!context.selectedElement) {
     alert('Please select an element!');
     return;
    }
    updateStyle(colorUseVal.value, this.value.toLowerCase());
   });
   colorList.ae('click', (e) => {
    try {
     if (!context.selectedElement) return;
     let targ = e.target;
     if (targ.tagName == 'LI') {
      let color = targ.dataset.color;
      colorInput.value = color;
      updateStyle(colorUseVal.value, color);
     }
    } catch (e) { console.error(e.stack) }
   });
   colorUse.ae('click', (e) => {
    clickChange(e, colorUse, elemInput, false);
    elId('colorProp').innerText = elemInput.value;
   });
   main.appendChild(colors);
   main.dataset.tab = tabName;
  }
  styles(tabName) {
   main.dataset.tab = tabName;
  }
 }
 
 let leftPaneTabs =  new LeftPaneTabs();
 rightpane.firstElementChild.ae('click', async (e) => {
  let t = e.target;
  if(t.tagName == 'SPAN') {
   let tabName = t.dataset.tab;
   if(main.dataset.tab == tabName) return;
   main.innerHTML = '';
   await leftPaneTabs[tabName](tabName);
  }
 });
 leftPaneTabs.dom('dom');
 } catch(e) {
  console.error('Error in the right pane component', e.stack);
 }
 function colorGen(colorParent) {
  let allColors = [];
  for (let i = 1; i < 29; i++) {
   allColors.push(i);
  }
  function generateColors(a) {
   let code, cal, ul = document.createElement('ul');
   let codes = {
    2(i) { return code = `rgb(${i},0,0)` },
    4(i) { return code = `rgb(0,${i},0)` },
    6(i) { return code = `rgb(0,0,${i})` },
    8(i) { return code = `rgb(${i},${i},0)` },
    10(i) { return code = `rgb(${i},0,${i})` },
    12(i) { return code = `rgb(0,${i},${i})` },
    1(i) { return code = `rgb(${i},${i},${i})` },
    13(i) { return code = `rgb(${i},255,255)` },
    11(i) { return code = `rgb(255,${i},255)` },
    9(i) { return code = `rgb(255,255,${i})` },
    7(i) { return code = `rgb(${i},${i},255)` },
    5(i) { return code = `rgb(${i},255,${i})` },
    3(i) { return code = `rgb(255,${i},${i})` }, //
    14(i) { return code = `rgb(255,112,${i})` },
    15(i) { return code = `rgb(255,${i},112)` },
    16(i) { return code = `rgb(${i},255,112)` },
    17(i) { return code = `rgb(112,255,${i})` },
    18(i) { return code = `rgb(112,${i},255)` },
    19(i) { return code = `rgb(${i},112,255)` },
    20(i) { return code = `rgb(${i},112,112)` },
    21(i) { return code = `rgb(112,${i},112)` },
    22(i) { return code = `rgb(112,112,${i})` },
    23(i) { return code = `rgb(0,112,${i})` },
    24(i) { return code = `rgb(0,${i},112)` },
    25(i) { return code = `rgb(${i},0,112)` },
    26(i) { return code = `rgb(112,0,${i})` },
    27(i) { return code = `rgb(112,${i},0)` },
    28(i) { return code = `rgb(${i},112,0)` },
   };
   cal = codes[a];
   for (let i = 25, j = 0; j < 9; i = i + 25, j++) {
    let li = document.createElement('li');
    cal(i);
    li.style.backgroundColor = code;
    li.title = code;
    li.dataset.color = code;
    ul.appendChild(li);
   }
   colorParent.appendChild(ul);
  }
  allColors.forEach(each => generateColors(each));
 }

 const property = elId('property');

 property.ae('click', openDialogue);
 
 function openDialogue(e, alertFlag = true, elem) {
  if (alertFlag) {
   if (!context.selectedElement) {
     alert('Please select an element');
     return;
    }
  }else {
   if(context.selectedElement) context.selectedElement["contentEditable"] = false;
   context.selectedElement = getDomElemFromElemRef(elem.dataset.ref);
   context.selectedElement["contentEditable"] = true;
    selectedElementObject = getElementObj(elem);
    ;
  }
  let dialogue = new PropertyDialogue().openDialogue();
  elId('root').appendChild(dialogue[0]);
  dialogue[0].showModal();
  dialogue[1].focus();
 }

 let initialValue;
 let inputChange = (e, elemInput) => updateStyle(elemInput.name, elemInput.value);

 function clickChange(e, elem, elemInput, updateSty = true) {
  const target = e.target;
  if (target.dataset.selected != 'true') {
   for (let li of elem.children) {
    if (li.dataset.selected == 'true') {
     li.dataset.selected = '';
    }
   }
   target.dataset.selected = 'true';
   if (target.innerText == initialValue) {
    elemInput.value = target.innerText;
    return;
   }
   elemInput.value = target.innerText;
   updateSty ? updateStyle(elemInput.name, target.innerText) : null;
  }
 }

 function createLi(elem, listType) {
  listType.forEach(each => elem.appendChild(smallListComponent(each)));
  return elem.parentElement.previousElementSibling;
 }

 function createList(listClass, listType) {
  const list = elCls(listClass);
  for (let elem of list) {
   const elemInput = createLi(elem, listType);
   elemInput.ae('focus', (e) => {
    initialValue = e.target.value;
   });
   elem.ae('click', (e) => clickChange(e, elem, elemInput));
   elemInput.ae('keyup', (e) => inputChange(e, elemInput));
  }
 }
 createList('fontsList', fontsFullValue.map(each => each.name));
 createList('fontNumberList', dV.fontSizeValues);
 createList('unitList', dV.unitValues);
 createList('fontWeightValues', dV.fontWeightValues);
 createList('widthHNumberList', dV.widHeiValues);
 createList('padMarNumberList', dV.padMarNumberList);
 createList('lineHeightValueList', dV.lineHeightValueList);
/*
let dropdown = (d = {}) => {
  try {
   let childr = d.children.map(each => {
    let li;
    if(each.name) {
     li = cEl('li', {class: [d.childrClass, 'flex', 'jc-sb', 'al-cent'] }, cEl('span', {innerText: each.name}), cEl('span', {innerHTML: '<i class="fa fa-chevron-right"></i>'}));
    }else {
     li = cEl('li', { innerHTML: each.icon || each, class: d.childrClass });
     if (typeof each == 'object') {
      li.ae('click', each.action);
     }
    }
    return li;
   });
   let ul = cEl('ul', {}, ...childr);
   let dropcnt = cEl('div', { class: d.dropcntClass }, ul);
   let li = cEl(d.returnType, { class: d.returnClass }, cEl(d.returnType2, { innerHTML: d.name }), dropcnt);
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
} catch (e) {
 console.error(e.stack);
}