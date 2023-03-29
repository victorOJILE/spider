import * as $ from './createElements.js';
import { NewPageDialogue, LAYOUT_COMPONENT, Dialogue, CLICK_DROPDOWN } from '../components.js';

const _ = {
 decimalToHexadecimal(ex) {
  let hexVal = ['A', 'B', 'C', 'D', 'E', 'F'];
  let ar = [10, 11, 12, 13, 14, 15];
  let fin = [];
  let firstVal = Math.floor(ex / 16);
  let rem = ex - (firstVal * 16);
  ar.indexOf(rem) != -1 ? fin.push(hexVal[ar.findIndex((ab) => ab === rem)]) : fin.push(rem);

  while (firstVal) {
   let nextVal = Math.floor(firstVal / 16);
   let rem2 = firstVal - (nextVal * 16);
   if (ar.indexOf(rem2) != -1) {
    let ind2 = ar.findIndex((ab) => ab === rem2);
    fin.unshift(hexVal[ind2]);
    firstVal = nextVal;
   } else {
    fin.unshift(rem2);
    firstVal = nextVal;
   }
  }
  return fin.join('').padStart(2, "0");
 },
 UPDATE_DOM_ELEMENT_STYLE() {
  let newElem = $.cEl3(selectedElementObject);
  for (let key in selectedElementObject.style) {
   newElem.style[key] = selectedElementObject.style[key];
  }
  context.selectedElement.parentElement.replaceChild(newElem, context.selectedElement);
  context.selectedElement = newElem;
 },
 updateDomRef(parentElem) {
  let parRef = parentElem.dataset.ref,
   i = 0;
  for (let child of parentElem.children) {
   child.dataset.ref = parRef + i + ":";
   i++;
   if (child.childElementCount) this.updateDomRef(child);
  }
 },
 updateRef(obj) {
  for (let i = 0; i < Object.keys(obj.children).length; i++) {
   obj.children[i].ref = obj.ref + i + ":";
   if (obj.children[i].children) this.updateRef(obj.children[i]);
  }
 },
 // add an event listener to the project iframe
 addListener(type, callback) {
  projBody.addEventListener(type, callback);
 },
 // remove an event listener from the project iframe
 removeListener(type, callback) {
  projBody.removeEventListener(type, callback);
 },
 removeSelectedElement() {
  context.selectedElement = null;
  selectedElementObject = null;
 },
 getElementObj(ref) {
  try {
   if (!ref) return;
   ref = ref.split(':');
   ref.pop();
   let elObj, elObj2 = project;
   for (let i = 0; i < ref.length; i++) {
    elObj = elObj2[ref[i]];
    elObj2 = elObj2[ref[i]].children;
   }
   return elObj;
  } catch (e) { console.error(e.stack) }
 },
 removeObjProp(object, key) {
  let selected = _.getElementObj(key);

  function removeElem(obj, par) {
   for (let prop in obj) {
    if (Object.is(context.clipboard, obj[prop])) {
     delete obj[prop];
     let i = 0,
      clone = _.cloneObj(obj);
     for (let key in obj) {
      delete obj[key];
     }
     for (let key in clone) {
      obj[i] = clone[key];
      i++;
     }
     _.updateRef(par);
    } else if (typeof obj[prop] === 'object')
     removeElem(obj[prop], obj);
   }
  }
  removeElem(object);
 },
 removeEmptyStyleProp(prop) {
  delete selectedElementObject.style[prop];
  let newElem = $.cEl3(selectedElementObject);
  for (let key in selectedElementObject.style) {
   newElem.style[key] = selectedElementObject.style[key];
  }
  context.selectedElement.parentElement.replaceChild(newElem, context.selectedElement);
  context.selectedElement = newElem;
 },
 closeMenuOpen() {
  if (!isMobile) {
   setTimeout(() => {
    menuopen.innerHTML = '';
    menuopen.classList.remove('block');
   }, 200);
  }
 },
 re_renderDOMSelectors() { // right pane dom tab
  try {
   let main = document.querySelector('#right-pane main');

   if (main.dataset.tab === 'dom') {
    main.innerHTML = '';
    $.cEl4(main, project);
   }
  } catch (e) {
   console.error(e.stack);
  }
 },
 UPDATE_CLASS_ON_SELECT(obj = {}) {
  if (obj.constructor.name != 'Object' || !obj.parent || !obj.className) return console.error('Reference error: obj is not of type "object" or has missing property');
  obj.parent.ae('click', (e) => {
   let target = e.target;
   if (target != obj.parent) {
    for (let elem of obj.parent.children) {
     if (elem.classList.contains(obj.className)) elem.classList.remove(obj.className);
    }
    target.classList.add(obj.className);
   }
  });
 },
 /*
Javascript Implementation
// rgbColor is an array of colors,
// where each color is an array with the three color values (RGB, 0 to 255)
function mixRGB(rgbColors) {
        function sumColors(summedColors, nextColor) {
            return summedColors.map(
                (summedColor, i) => nextColor[i] + summedColor,
            );
        }

        function averageColors(colors) {
            return colors
                .reduce(sumColors, [0, 0, 0])
                .map(c => c/colors.length);
        }

        // Remove white from all colors
        const whiteParts = [];
        const colorParts = [];
        rgbColors.forEach(color => {
            const whiteVal = Math.min(...color);
            whiteParts.push([whiteVal, whiteVal, whiteVal]);
            colorParts.push(color.map(val => val - whiteVal));
        });
        
        // Average the whites from each selection
        const averagedWhite = averageColors(whiteParts);
        // Average all non-white colors
        let averagedColor = averageColors(colorParts);

        // Take out the white from the averaged colors
        const whitePart = Math.min(...averagedColor);
        averagedColor = averagedColor.map(color => color - whitePart);

        // Half the white value removed and add that value to the Green
        averagedColor[1] += (whitePart / 2);
        
        // Add the averaged white back in and make whole number
        averagedColor = averagedColor.map((color, i) => Math.floor(color + averagedWhite[i]));
    
        return averagedColor;
  }
  */

 COLOR_HEX_VAL(color) {
  const defaultColors = ['white', 'floralwhite', 'ghostwhite', 'whitesmoke', 'azure', 'aliceblue', 'black', 'red', 'green', 'blue'];
  const hexDefaultColors = ['#FFFFFF', '#FFFAF0', '#F8F8FF', '#F5F5F5', '#F0FFFF', '#F0F8FF', '#000000', '#FF0000', '#008000', '#0000FF'];

  let hexVal = '#',
   match = color.match(/\d+/g);
  match ? match.forEach(e => hexVal += _.decimalToHexadecimal(e)) : hexVal = hexDefaultColors[defaultColors.findIndex(e => e == color)];
  return hexVal;
 },
 cloneObj(obj) {
  let newObj = {};
  for (prop in obj) {
   newObj[prop] = obj[prop];
   if (typeof obj[prop] === 'object')
    _.cloneObj(obj[prop]);
  }
  return newObj;
 },
 UPDATE_STYLE(inputName, value) {
  try {
   if (!context.selectedElement) {
    alert('Please select an element!');
    return;
   }
   if (value.length == 0) {
    _.removeEmptyStyleProp(inputName);
    return;
   }
   context.selectedElement.style[inputName] = value;
   selectedElementObject.style[inputName] = value;
  } catch (e) {
   console.error(e.stack);
  }
 },
 UPDATE_DOM_ELEMENT_ATTRIBUTES(obj) {
  let newElem = $.cEl3(obj);
  context.selectedElement.parentElement.replaceChild(newElem, context.selectedElement);
 },
 getDomElemFromElemRef(ref) {
  try {
   if (typeof ref != 'string') throw new SyntaxError('Invalid ref');
   let ref2 = ref.split(':');
   let par = projBody;
   let retrievedChild;
   for (let ind of ref2) {
    retrievedChild = par.children[ind];

    if (retrievedChild.dataset.ref != ref) {
     par = retrievedChild;
    } else { break }
   }
   return retrievedChild;
  } catch (e) {
   console.error(e.stack);
  }
 },
 INSERT_NEW_ELEMENT(obj) {
  let parentElem = this.getDomElemFromElemRef(selectedElementObject.ref);
  let newRef = Object.keys(selectedElementObject.children).length;
  let newElem = {
   type: obj.type,
   props: obj.props,
   ref: `${selectedElementObject.ref}${newRef}:`,
   children: {},
   style: obj?.props.style || {},
   name: obj.name,
   notText: obj.notText,
   selected: false,
   open: false
  };
  let newDOMElem = $.cEl3(newElem);
  //console.log(newDOMElem);
  parentElem.append(newDOMElem);
  selectedElementObject.children[newRef] = newElem;
  this.re_renderDOMSelectors();
 },
 Create_New_Project() {
  const frames_section = elId('frame-section');
  const current_frame = Array.from(frames_section.children).find(div => div.dataset.file == ('file' + context.opened_file));
  current_frame.classList.add('d-none');

  let NEW_PROJECT = $.cEl('iframe', { src: 'res/frame.html', frameBorder: 0, style: { backgroundColor: 'white' }, class: context.browser_view });

  const parent_div = $.cEl('div', { class: ['d-flex', 'jc-cent', 'view', 'w-100'], data: { file: 'file' + files.length } }, NEW_PROJECT);
  elId('page-title').innerText = files[context.opened_file].title;
  frames_section.append(parent_div);

  NEW_PROJECT.onload = (e) => {
   iframeDoc = NEW_PROJECT.contentDocument || NEW_PROJECT.contentWindow;
   projBody = iframeDoc.body;
   try {
    $.cEl2(projBody, project);
    NEW_PROJECT.parentElement.dataset.file = 'file' + files.length;
    selectedElementObject = _.getElementObj('0:');
    context.selectedElement = _.getDomElemFromElemRef('0:');
   } catch (e) {
    console.error(e.stack);
   }
  }
  NEW_PROJECT.onerror = (e) => {
   console.log(e);
  }
 }
}

const FEATURES = {
 New() {
  let dialogue = new NewPageDialogue('New page').newPage();
  elId('root').appendChild(dialogue[0]);
  dialogue[1].focus();
  _.closeMenuOpen();
 },
 'Save as'() {
  console.log('called')
  let dialogue = new NewPageDialogue(files[context.opened_file].title).newPage('edit');
  elId('root').appendChild(dialogue[0]);
  dialogue[1].focus();
  _.closeMenuOpen();
 },
 Open() {
  let ul = this.lastElementChild;
  ul.innerHTML = '';
  files.forEach(each => ul.append($.cEl('li', { class: ["p-1", "px-2"] }, $.cEl('span', { class: 'icon' }, $.cEl('i', { class: ['fa', 'fa-file'] })), $.cEl('span', { innerText: each.title }))))
 },
 Save() {
  localStorage.setItem('project', JSON.stringify(project));
  this.firstElementChild.style.color = 'grey';
  _.closeMenuOpen();
 },
 Undo() {

 },
 Redo() {

 },
 Copy() {
  if (selectedElementObject.props?.id == 'root' || context.ref == '0:') return alert('Cannot copy the root element.\n\nTry creating a parent element inside of the root to hold the entire webpage.')
  context.clipboard = _.getElementObj(context.ref || selectedElementObject.ref);
  _.closeMenuOpen();
 },
 Cut(newParent) {
  try {
   if (newParent?.ref == '0:' || selectedElementObject.props?.id == 'root') return alert('Cannot cut the root element');
   if (!selectedElementObject.ref && !newParent) return;
   let ref = context.ref || selectedElementObject.ref;
   let retrievedElem = _.getDomElemFromElemRef(ref);
   let retrievedElemPar = retrievedElem.parentElement;
   retrievedElem.remove();
   context.clipboard = _.getElementObj(ref);
   _.removeObjProp(project, ref);
   _.updateDomRef(retrievedElemPar);
   _.closeMenuOpen();
   _.re_renderDOMSelectors();
  } catch (e) {
   console.error(e.stack);
   alert('Please select an element!');
  }
 },
 'Copy styles'() {
  context["copied_style"] = _.getElementObj(selectedElementObject.ref).style;
  console.log(context.copied_style);
 },
 Paste() {
  try {
   if (!context.clipboard?.ref) return alert('Please copy or cut an element first!');
   let ref = context.ref || context.clipboard.ref;
   let newParentRef = _.getElementObj(ref); // element object from the project object

   let newElemFromClipboard = _.cloneObj(context.clipboard);
   let parentElem = _.getDomElemFromElemRef(ref);
   const objLen = Object.keys(newParentRef.children).length;
   parentElem.append($.cEl3(newElemFromClipboard));
   _.updateDomRef(parentElem);
   _.closeMenuOpen();

   newElemFromClipboard.ref = `${ref}${objLen}:`;
   newParentRef.children[objLen] = newElemFromClipboard;
   _.re_renderDOMSelectors();
   _.updateRef(newParentRef.children[objLen]);
  } catch (e) {
   console.error(e.stack);
  }
 },
 'Paste styles'() {
  if (!context.copied_style) return alert('Please, copy a style first!');
  let elemObj = _.getElementObj(selectedElementObject.ref);
  elemObj.style = { ...elemObj.style, ...context.copied_style };
  _.UPDATE_DOM_ELEMENT_STYLE();
 },
 'Clear styles'() {
  _.getElementObj(selectedElementObject.ref).style = {};
  _.UPDATE_DOM_ELEMENT_STYLE();
 },
 Remove(newParent) {
  if (newParent == window.event && selectedElementObject.ref == '0:') return alert('Cannot remove the root element');
  if (selectedElementObject.props?.id == 'root' || (newParent && newParent.ref == '0:')) return alert('Cannot remove the root element');
  if (!selectedElementObject.ref && !newParent) return;
  if (confirm('Are you sure you want to remove this element?')) {
   let ref = context.ref || selectedElementObject.ref;
   if (newParent) ref = newParent.ref;
   let retrievedElem = _.getDomElemFromElemRef(ref);
   let retrievedElemPar = retrievedElem.parentElement;
   retrievedElem.remove();
   context.clipboard = _.getElementObj(ref);
   _.removeObjProp(project, ref);
   _.updateDomRef(retrievedElemPar);
   _.closeMenuOpen();
   _.re_renderDOMSelectors();
  }
 },
 'Mobile view 1'() {
  add_Browser_View_Class('mobile-view1');
 },
 'Mobile view 2'() {
  add_Browser_View_Class('mobile-view2');
 },
 'Mobile view 3'() {
  add_Browser_View_Class('mobile-view3');
 },
 'Tablet view 1'() {
  add_Browser_View_Class('tablet-view1');
 },
 'Tablet view 2'() {
  add_Browser_View_Class('tablet-view2');
 },
 'Laptop view'() {
  add_Browser_View_Class('laptop-view');
 },
 'Desktop view 1'() {
  add_Browser_View_Class('desktop-view1');
 },
 'Desktop view 2'() {
  add_Browser_View_Class('desktop-view2');
 },
 addLayout(childCount, name, defaults) {
  let element = selectedElementObject;
  if (!element.ref) return alert('Please select an element!');
  let count = Object.keys(element.children).length;
  if (count == childCount || count == 0) {
   let elementDOM = context.selectedElement;
   if (element.props['class']) {
    element.props['class'].push('row');
   } else {
    element.props['class'] = ['row'];
   }

   new LAYOUT_COMPONENT('Layout', childCount, defaults, count == childCount ? true : false);
  } else {
   alert(`${name} cannot modify layouts with ${count} children.`);
   return false;
  }
 },
 'Customize'() {
  if (!selectedElementObject.ref) return alert('Please select an element!');

  class CUSTOMIZE_LAYOUT extends Dialogue {
   constructor(name) {
    super(name);
    this.myContext = {
     mobile: null,
     mobile_lsc: null,
     tablet: null,
     laptop: null,
     desk1: null,
     desk2: null
    };
    for (let key in this.myContext) {
     this.myContext[key] = {
      gridTemplateRows: ['auto'],
      gridTemplateColumns: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
      GRID_VALUE: [[]]
     }
    }
    this.callback = function() {
     const styleElement = document.createElement('style');

     if (!context?.grids) context.grids = [];
     const gridClass = `myGrid${context.grids.length}`;
     context.grids.push(gridClass);

     styleElement.id = gridClass;

     let viewIndex = 0;
     const breakpoints = [0, 576, 768, 992, 1200, 1400];
     let childrenClasses = new Set();
     let styleText = '',
      oldTemplateRows, oldTemplateColumns, oldAreas;
     for (let key in this.myContext) {
      let GRID_VALUE = this.myContext[key].GRID_VALUE;
      if (GRID_VALUE.length == 1 && !GRID_VALUE[0].length) {
       viewIndex++;
       continue;
      }
      GRID_VALUE.forEach(array => array.sort((a, b) => a.startIndex - b.startIndex));

      let gridTemplateRows = this.myContext[key].gridTemplateRows;
      let gridTemplateColumns = this.myContext[key].gridTemplateColumns;

      let areas = (function() {
       try {
        let alphabets = [],
         currentRow, currentAlpha = 0,
         incr = 0;
        let area = [];
        for (let i = 65; i < 91; i++) alphabets.push(String.fromCodePoint(i));
        let prevRow;
        GRID_VALUE.forEach((row, rowIndex) => {
         let newArray = new Array(12).fill('.');
         area.push(newArray);
         // currentAlpha is equal to the default value at first then later the incremented value when processing a new row

         currentAlpha = currentAlpha;

         row.forEach((div, boxIndex) => {
          let alpha;
          if (rowIndex) { // if we have multiple rows and currently on the 2>= row

           if (div.merged) {
            alpha = area[rowIndex - 1][div.startIndex];
            currentAlpha--;
           }
          }
          div.selected.forEach(box => {
           area[rowIndex][box] = alpha || alphabets[currentAlpha];
          });
          currentAlpha++;
         });
        });
        area = area.map(each => `"${each.join('')}"`).join('');
        return area;
       } catch (e) {
        console.error(e.stack);
       }
      })();
      let templateColumns = (function() {
       let allAuto = gridTemplateColumns.every(e => e == 'auto');
       if (!allAuto) return gridTemplateColumns.join(' ')
       return 'repeat(12, 1fr)';
      })();
      let templateRows = (function() {
       let allAuto = gridTemplateRows.every(e => e == 'auto');
       if (!allAuto) return gridTemplateRows.join(' ')
       return `repeat(${GRID_VALUE.length}, 1fr)`;
      })();

      let alphas = Array.from(new Set(areas)).filter(e => e.match(/\w/));

      let childCount = 1,
       childrenStyles = '';
      for (let key of alphas) {
       let childClass = `${gridClass}child${childCount++}`;
       // Add the childClass class to stylesheet
       childrenStyles += `
        .${childClass} {
         grid-area: ${key}
        }
       `;
       childrenClasses.add(childClass);
      }
      areas = Array.from(areas).join(' ');
      styleText += `
       @media (min-width: ${breakpoints[viewIndex++]}px) {
        .${gridClass} {${oldTemplateColumns == templateColumns ? '' :
         `grid-template-columns: ${templateColumns};
         `}${oldTemplateRows == templateRows ? '' : `grid-template-rows: ${templateRows};
         `}${oldAreas == areas ? '' : `grid-template-areas: ${areas}`};
        }
        ${childrenStyles}
      }`;
      oldTemplateColumns = templateColumns;
      oldTemplateRows = templateRows;
     }
     if (!styleText) return context.grids.pop();
     if (!selectedElementObject?.class) {
      selectedElementObject.props['class'] = ['grid', gridClass];
     } else {
      selectedElementObject.props.class.push(...['grid', gridClass]);
     }

     styleElement.innerText = styleText;
     iframeDoc.head.append(styleElement);
     context.selectedElement.classList.add('grid');
     context.selectedElement.classList.add(gridClass);

     Array.from(childrenClasses).forEach(childClass => {
      let newElemObj = {
       type: 'div',
       name: 'Box',
       props: {
        innerText: '',
        class: [childClass]
       },
       notText: false
      }
      _.INSERT_NEW_ELEMENT(newElemObj);
     });
    }
    this.createComponent();
   }
   createComponent() {
    const outerThis = this;
    let mainComp = $.cEl('main', { class: ['propsFormatDiv', 'p-2'] });
    mainComp.append(
     $.cEl('h2', { class: ['text-info'], innerText: `Dynamic Layout settings` })
    );
    const comp = (view) => $.cEl('div', { class: ['p-2', 'mt-1', 'text-black-50', 'bg-body', 'border'] });

    const Mobile_View = comp(),
     Mobile_Landscape_View = comp(),
     Tablet_View = comp(),
     Laptop_View = comp(),
     Desktop_View_1 = comp(),
     Desktop_View_2 = comp();
    mainComp.append(
     CLICK_DROPDOWN('Mobile view', Mobile_View, true),
     CLICK_DROPDOWN('Mobile landscape view', Mobile_Landscape_View),
     CLICK_DROPDOWN('Tablet view', Tablet_View),
     CLICK_DROPDOWN('Laptop view', Laptop_View),
     CLICK_DROPDOWN('Desktop view', Desktop_View_1),
     CLICK_DROPDOWN('Desktop view 2', Desktop_View_2)
    );

    Mobile_View.append(GENERATE_GRID_MAKER('mobile'));
    Mobile_Landscape_View.append(GENERATE_GRID_MAKER('mobile_lsc'));
    Tablet_View.append(GENERATE_GRID_MAKER('tablet'));
    Laptop_View.append(GENERATE_GRID_MAKER('laptop'));
    Desktop_View_1.append(GENERATE_GRID_MAKER('desk1'));
    Desktop_View_2.append(GENERATE_GRID_MAKER('desk2'));

    function GENERATE_GRID_MAKER(screenView) {
     function createDiv(index = 0) {
      let div = $.cEl('div', { class: ['row', 'px-2'], data: { index } });
      for (let i = 0; i < 12; i++) {
       div.append($.cEl('div', { style: { height: '2rem', boxShadow: 'inset 0px 0px 2px 1px grey', cursor: 'pointer' }, class: 'col-1' }));
      }
      return div;
     }
     
     let enableMerging = false, currentRowIndex, firstBox, lastBox, merge = false;

     function getTargIndex(targ) {
      let parent = targ.parentElement;
      let index = 0;
      for (let child of parent.children) {
       if (child == targ) return index;
       index++
      }
      return null;
     }

     function selectBox(event) {
      let targ = event.target;
      // if the clicked element is not a selector box, return
      try {
       if (!targ.parentElement.dataset.index) return;
       // if the clicked element has already been selected, return
       if (targ.style.borderTop) return;
       let lastBoxParInd = lastBox?.parentElement.dataset.index;
       let SAME_PARENT = lastBoxParInd == targ.parentElement.dataset.index;

       if (!SAME_PARENT && (+lastBoxParInd + 1 == targ.parentElement.dataset.index)) { // if a different row is selected
        let parentIndex = targ.parentElement.dataset.index;
        let canMerge = outerThis.myContext[screenView].GRID_VALUE[currentRowIndex || parentIndex].find(e => e.selected.indexOf(getTargIndex(targ)) != -1);
        if (canMerge && enableMerging) {
         enableMerging = false;
         let children = targ.parentElement.children;
         let lastBox2;
         let oldRow = currentRowIndex,
          newRow = targ.parentElement.dataset.index;
         for (let i = canMerge.startIndex; i < canMerge.selected.length + canMerge.startIndex; i++) {

          let lastRowChildren = lastBox.parentElement.children;
          lastRowChildren[i].style.borderBottom = 'none';

          let targIndex = getTargIndex(children[i]);

          if (lastBox2) {
           children[i].style.boxShadow = '';
           children[i].style.border = '1px none orange';
           children[i].style.borderStyle = 'none solid solid none';
           lastBox2.style.borderRight = 'none';

           let current = outerThis.myContext[screenView].GRID_VALUE[currentRowIndex];
           current[current.length - 1].selected.push(targIndex);
           lastBox2 = children[i];
          } else {
           children[i].style.boxShadow = '';
           children[i].style.border = '1px solid orange'
           children[i].style.borderTop = 'none';
           currentRowIndex = targ.parentElement.dataset.index;
           outerThis.myContext[screenView].GRID_VALUE[currentRowIndex].push({ startIndex: targIndex, selected: [targIndex], merged: true });
           lastBox2 = children[i];
          }
         }
         firstBox = null, lastBox = lastBox2;
         return;
        }
        firstBox = null, lastBox = null;
        enableMerging = false;
       }
       if (firstBox) {
        if (lastBox.nextElementSibling == targ) {
         targ.style.boxShadow = '';
         lastBox.style.borderRight = 'none';
         targ.style.border = '1px solid orange';
         targ.style.borderStyle = 'solid solid solid none';
         let current = outerThis.myContext[screenView].GRID_VALUE[currentRowIndex];
         current[current.length - 1].selected.push(getTargIndex(targ));
         lastBox = targ;
        } else if (firstBox.previousElementSibling == targ) {
         targ.style.boxShadow = '';
         firstBox.style.borderLeft = 'none';
         targ.style.border = '1px solid orange';
         targ.style.borderStyle = 'solid none solid solid';
         let targInd = getTargIndex(targ);
         let current = outerThis.myContext[screenView].GRID_VALUE[currentRowIndex];
         current[current.length - 1].selected.unshift(targInd);
         current[current.length - 1].startIndex = targInd;
         firstBox = targ;
        }
       } else {
        currentRowIndex = targ.parentElement.dataset.index;
        let targIndex = getTargIndex(targ);

        outerThis.myContext[screenView].GRID_VALUE[currentRowIndex].push({ startIndex: targIndex, selected: [targIndex] });
        targ.style.boxShadow = '';
        targ.style.border = '1px solid orange';
        firstBox = targ;
        lastBox = targ;
       }
       enableMerging = false;
      } catch (e) {
       console.error(e.stack);
      }
     }

     const gridParent = $.cEl('div', { class: 'flex-gr', style: { marginRight: '2%' } }),
      div = createDiv(0);

     function modifyXY(angle, template, promptVal) {
      angle.ae('click', function(e) {
       let targ = e.target;
       let index = targ.dataset.index || targ.parentElement.dataset.index;
       if (!index) return;
       let defaultVal = template[index] == 'auto' ? '' : template[index];
       let value = prompt(promptVal, defaultVal);
       if (!value || !value.trim()) return;
       if (!value.match(/\d/)) return alert('Invalid input!');
       targ.innerText = value;
       template[index] = value;
      });
     }

     const modifyX = $.cEl('div', { class: ['row', 'px-2'] });
     for (let i = 0; i < 12; i++) {
      modifyX.append($.cEl('div', { class: ['flex-ajc', 'col-1'], innerText: 'W', data: { index: i } }, $.cEl('i', { class: ['fa', 'fa-arrows-alt-h']})));
     }

     const modifyY = $.cEl('div', { style: { width: '2rem' } }, $.cEl('div', { innerText: 'S', class: ['flex-ajc'], data: { index: 0 }, style: { height: '2rem' } }, $.cEl('i', { class: ['fa', 'fa-arrows-alt-v'] })));

     modifyXY(modifyX, outerThis.myContext[screenView].gridTemplateColumns, 'Enter column width value.');
     modifyXY(modifyY, outerThis.myContext[screenView].gridTemplateRows, 'Enter row height value.');

     const gridParentP = $.cEl('div', { class: ['d-flex', 'mb-4', 'ml-2'], style: { fontSize: '0.55rem' } }, gridParent, modifyY);
     
     let started = false; // if selecting boxes is now allowed by clicking startBtn
     
     const startBtn = $.cEl('button', { class: ['btn', 'btn-secondary', 'mr-1'], innerText: 'Start', event: {
      click: () => {
       for (let row of gridParent.children) {
        row.ae('click', selectBox);
       }
       startBtn.classList.remove('btn-secondary');
       startBtn.classList.add('btn-success');
       started = true;
      }
     } });
     const endBtn = $.cEl('button', { class: ['btn', 'btn-secondary', 'mr-1'], innerText: 'End', event: {
      click: () => {
      startBtn.classList.remove('btn-success');
      startBtn.classList.add('btn-secondary');
      for (let row of gridParent.children) {
       row.removeEventListener('click', selectBox);
      }
      started = false;
      firstBox = null, lastBox = null;
     }
     } });
     const addBtn = $.cEl('button', { class: ['btn', 'btn-secondary'], innerText: 'Add row', event: {
      click: () => {
      const div = createDiv(gridParent.childElementCount - 1);
      if (started) div.ae('click', selectBox);
      gridParent.append(div);
      modifyY.append($.cEl('div', { innerText: '', class: 'flex-ajc', data: { index: modifyY.childElementCount }, style: { height: '2rem' } }));
      outerThis.myContext[screenView].GRID_VALUE.push([]);
      outerThis.myContext[screenView].gridTemplateRows.push('auto');
      }
      } });
     const mergeBtn = $.cEl('button', { class: ['btn', 'btn-outline-secondary', 'mr-1'], innerText: '', event: { click: () => enableMerging = !enableMerging } }, $.cEl('i', { class: ['fa', 'fa-code-merge'] }));
     
     const undo = $.cEl('button', { class: ['btn', 'btn-outline-secondary'], innerText: '' }, $.cEl('i', { class: ['fa', 'fa-refresh'] }));
     
     undo.ae('click', () => {
      let GRID_VALUE = outerThis.myContext[screenView].GRID_VALUE;
      outerThis.myContext[screenView].GRID_VALUE = new Array(GRID_VALUE.length).fill([]);
      
      for(let div of gridParent.getElementsByTagName('div')) {
       if(div.style.borderStyle) {
         div.replaceWith($.cEl('div', { style: { height: '2rem', boxShadow: 'inset 0px 0px 2px 1px grey', cursor: 'pointer' }, class: 'col-1' }));
       }
      }
     });
     gridParent.append(modifyX);
     gridParent.append(div);
     let main = $.cEl('div', {}, gridParentP);
     main.append(
      $.cEl('div', { class: ['d-flex', 'al-cent', 'jc-sb', 'px-2'] },
       $.cEl('div', {}, startBtn, endBtn, addBtn),
       $.cEl('div', {}, mergeBtn, undo)
      ));
     let checkIfRendered = () => {
      if (modifyX.isConnected) {
       clearInterval(interval);
       modifyY.style.marginTop = modifyX.clientHeight + "px";
      }
     };
     let interval = setInterval(checkIfRendered, 100);
     return main;
    }

    elId('root').append(this.newDialog(mainComp));
   }
  }
  // .newDialog() was inherited from the exte Dialogue class
  let dialogue = new CUSTOMIZE_LAYOUT('Customize layout')
 },
 'Layout 2X'() {
  let defaults = [
   {
    name: 'Layout 12:12',
    format: [12, 12]
    },
   {
    name: 'Layout 6:6',
    format: [6, 6]
        },
   {
    name: 'Layout 3:9',
    format: [3, 9]
        },
   {
    name: 'Layout 9:3',
    format: [9, 3]
        },
   {
    name: 'Layout 8:4',
    format: [8, 4]
        },
   {
    name: 'Layout 4:8',
    format: [4, 8]
        }
       ];
  FEATURES.addLayout(2, 'Layout 2X', defaults);
 },
 'Layout 3X'() {
  let defaults = [
   {
    name: 'Layout 4:4:4',
    format: [4, 4, 4]
     },
   {
    name: 'Layout 6:6:12',
    format: [6, 6, 12]
     },
   {
    name: 'Layout 12:6:6',
    format: [12, 6, 6]
     },
   {
    name: 'Layout 2:8:2',
    format: [2, 8, 2]
     },
   {
    name: 'Layout 3:6:3',
    format: [3, 6, 3]
     }
    ];
  FEATURES.addLayout(3, 'Layout 3X', defaults);
 },
 'Layout 4X'() {
  let defaults = [
   {
    name: 'Layout 3:3:3:3',
    format: [3, 3, 3, 3]
        },
   {
    name: 'Layout 4:4:4:4',
    format: [4, 4, 4, 4]
        },
   {
    name: 'Layout 6:6:6:6',
    format: [6, 6, 6, 6]
        },
   {
    name: 'Layout 12:12:12:12',
    format: [12, 12, 12, 12]
    },
   {
    name: 'Layout 6:6:12:12',
    format: [6, 6, 12, 12]
        },
   {
    name: 'Layout 12:6:6:12',
    format: [12, 6, 6, 12]
        },
   {
    name: 'Layout 12:12:6:6',
    format: [12, 12, 6, 6]
        }
       ]
  FEATURES.addLayout(4, 'Layout 4X', defaults);
 },
 'Layout 5X'() {
  let defaults = [
   {
    name: 'Layout 12:12:12:12:12',
    format: [12, 12, 12, 12, 12]
    },
   {
    name: 'Layout 2:2:2:2:2',
    format: [2, 2, 2, 2, 2]
     },
   {
    name: 'Layout 3:3:3:3:3',
    format: [3, 3, 3, 3, 3]
     },
   {
    name: 'Layout 4:4:4:4:4',
    format: [4, 4, 4, 4, 4]
     },
   {
    name: 'Layout 6:6:6:6:6',
    format: [6, 6, 6, 6, 6]
     },
   {
    name: 'Layout 12:6:6:6:6',
    format: [12, 6, 6, 6, 6]
     },
   {
    name: 'Layout 6:6:12:6:6',
    format: [6, 6, 12, 6, 6]
     },
   {
    name: 'Layout 6:6:6:6:12',
    format: [6, 6, 6, 6, 12]
     },
   {
    name: 'Layout 12:4:4:4:4',
    format: [12, 4, 4, 4, 4]
     }
    ];
  FEATURES.addLayout(5, 'Layout 5X', defaults);
 }
};

export { _, FEATURES };