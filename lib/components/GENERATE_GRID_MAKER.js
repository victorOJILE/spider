import { _ } from '../utils.js';
import CREATE_RANGE_COMP from '../snippets/CREATE_RANGE_COMP.js';
import { FaArrowsAltH, FaArrowsAltV } from '../react-icons/fa/index.js';
import {
 AiFillStop,
 AiOutlineUndo,
 AiOutlineReload,
 AiOutlineMergeCells,
 AiOutlineInsertRowBelow,
 AiOutlineInsertRowRight
} from '../react-icons/ai/index.js';

function createDiv(index = 0, viewMode, ctx) {
 let div = el('div', { class: 'flex', data: { index } });
 for (let i = 0; i < ctx[viewMode].gridTemplateColumns.length; i++) {
  div.append(el('div', { style: { height: '2rem', boxShadow: 'inset 0px 0px 2px 1px grey', cursor: 'pointer' }, class: 'col' }));
 }
 return div;
}

function modifyXY(angle, template, promptVal) {
 _.UPDATE_CLASS_ON_SELECT({
  parent: angle,
  className: 'n'
 }, undefined, function(targ) {
  let index = targ.data().index;
  let defaultVal = template[index] === 'auto' ? '' : template[index];
  let value = prompt(promptVal, defaultVal);
  if (!value || !$.trim(value)) return;
  if (!value.match(/\d/) && $.trim(value.trim) !== 'auto') return alert('Invalid input!');
  targ.html(value);
  template[index] = value;
 });
}

export default function GENERATE_GRID_MAKER(screenView) {
 const ctx = {};
 ctx[screenView] = {
  gridTemplateRows: ['auto'],
  gridTemplateColumns: ['auto', 'auto'],
  GRID_VALUE: [[]]
 }

 let enableMerging = false, started = false;
 
 let currentRowIndex, firstBox, lastBox, isolatedActivated = true;
 
 // started - if selecting boxes is now allowed by clicking startBtn

 function selectBox(event) {
  let targ = $(event.target);
  
  try {
   // if the clicked element is not a selector box, return
   
   if (targ.parent() && !$.isNumeric(targ.parent().data().index)) return;
   // if the clicked element has already been selected, return
   
   if (targ[0].style.borderTop) return;
   
   let lastBoxParInd = lastBox?.parent().data().index;
   let SAME_PARENT = lastBoxParInd == targ.parent().data().index;

   if (!SAME_PARENT && +lastBoxParInd +1 == targ.parent().data().index) { // if a different row is selected
    let parentIndex = targ.parent().data().index;
    let canMerge = ctx[screenView].GRID_VALUE[currentRowIndex || parentIndex].find(e => e.selected.indexOf(getTargIndex(targ)) != -1);
    if (canMerge && enableMerging) {
     disableMerging();
     let children = targ.parent().children();
     let lastBox2;
     let oldRow = currentRowIndex,
      newRow = targ.parent().data().index;
     for (let i = canMerge.startIndex; i < canMerge.selected.length + canMerge.startIndex; i++) {

      let lastRowChildren = lastBox.parent().children();
      lastRowChildren[i].css('borderBottom', 'none');

      let targIndex = getTargIndex(children[i]);

      if (lastBox2) {
       children[i].css({
       	boxShadow: '',
       	border: '1px none orange',
       	borderStyle: 'none solid solid none'
       });
       lastBox2.css('borderRight', 'none');

       let current = ctx[screenView].GRID_VALUE[currentRowIndex];
       current[current.length - 1].selected.push(targIndex);
       lastBox2 = children[i];
      } else {
       children[i].css({
       	boxShadow: '',
       	border: '1px solid orange',
       	borderTop: 'none'
       });
       currentRowIndex = targ.parent().data().index;
       ctx[screenView].GRID_VALUE[currentRowIndex].push({ startIndex: targIndex, selected: [targIndex], merged: true });
       lastBox2 = children[i];
      }
     }
     firstBox = null, lastBox = lastBox2;
     return;
    }
    firstBox = null, lastBox = null;
    disableMerging();
   }
   if (firstBox) {
    if (isolatedActivated) {
     currentRowIndex = targ.parent().data().index;
     let targIndex = getTargIndex(targ);

     targ.css({
     	boxShadow: '',
     	border: '1px solid orange'
     });

     ctx[screenView].GRID_VALUE[currentRowIndex].push({ startIndex: targIndex, selected: [targIndex] });
     firstBox = targ;
     lastBox = targ;
    } else if (lastBox.next().is(targ)) {
     targ.css({
     	boxShadow: '',
     	border: '1px solid orange',
     	borderStyle: 'solid solid solid none'
     });
     
     lastBox.css('borderRight', 'none');
     
     let current = ctx[screenView].GRID_VALUE[currentRowIndex];
     current[current.length - 1].selected.push(getTargIndex(targ));
     lastBox = targ;
    } else if (firstBox.prev() == targ) {
     targ.css({
     	boxShadow: '',
     	border: '1px solid orange',
     	borderStyle: 'solid none solid solid'
     });
     
     firstBox.css('borderLeft', 'none');
     let targInd = getTargIndex(targ);
     let current = ctx[screenView].GRID_VALUE[currentRowIndex];
     current[current.length - 1].selected.unshift(targInd);
     current[current.length - 1].startIndex = targInd;
     firstBox = targ;
    }
   } else {
    currentRowIndex = targ.parent().data().index;
    let targIndex = getTargIndex(targ);

    ctx[screenView].GRID_VALUE[currentRowIndex].push({ startIndex: targIndex, selected: [targIndex] });
    targ.css({
    	boxShadow: '',
    	border: '1px solid orange'
    });
    
    firstBox = targ;
    lastBox = targ;
   }
   disableMerging();
  } catch (e) {
   console.error(e.stack);
  }
 }

 const gridParent = el('div', { class: 'flex-grow' }),
  div = createDiv(0, screenView, ctx);

 const modifyX = el('div', { class: 'flex px-2' },
  el('div', { class: 'flex-ajc col', data: { index: 0 } }, $(FaArrowsAltH())),
  el('div', { class: 'flex-ajc col', data: { index: 1 } }, $(FaArrowsAltH()))
 );

 const modifyY = el('div', { style: { width: '2rem' } },
  el('div', { class: 'flex-ajc', data: { index: 0 }, style: { height: '2rem' } },
   $(FaArrowsAltV())
  )
 );

 modifyXY(modifyX, ctx[screenView].gridTemplateColumns, 'Enter column width value.');
 modifyXY(modifyY, ctx[screenView].gridTemplateRows, 'Enter row height value.');

 const gridParentP = el('div', { class: 'flex mb-4 ml-2', style: { fontSize: '0.55rem' } }, gridParent, modifyY);

 const startBtn = el('button', {
  class: 'mr-2',
  event: {
   click() {
    gridParent.children().on('click', selectBox);
    
    $(this).addClass('text-green-400');
    started = true;
   }
  }
 }, $(AiOutlineReload({ width: '1.7em' })));

 const endBtn = el('button', {
  class: 'mr-2',
  event: {
   click() {
    startBtn.removeClass('text-green-400');
   	gridParent.children().off('click', selectBox);
    
    started = false;
    firstBox = null, lastBox = null;
   }
  }
 }, $(AiFillStop({ width: '1.7em' })));

 const addColBtn = el('button', {
  class: 'mr-2',
  event: {
   click() {
    const div = createDiv(gridParent.children().length - 1, screenView, ctx);
    if (started) div.click(selectBox);
    gridParent.append(div);
    
    modifyY.append(
     el('div', { class: 'flex-ajc', data: { index: modifyY.children().length }, style: { height: '2rem' } },
      $(FaArrowsAltV())
     )
    );
    ctx[screenView].GRID_VALUE.push([]);
    ctx[screenView].gridTemplateRows.push('auto');
   }
  }
 }, $(AiOutlineInsertRowBelow({ width: '1.7em' })));

 const addRowBtn = el('button', {
  event: {
   click() {
    modifyX.append(
    	el('div', { class: 'flex-ajc col', data: { index: modifyX.children().length } }, $(FaArrowsAltH()))
    );
    
    gridParent.children().slice(1).each(function() {
    	$(this).append(el('div', { style: { height: '2rem', boxShadow: 'inset 0px 0px 2px 1px grey', cursor: 'pointer' }, class: 'col' }));
    });
    
    ctx[screenView].gridTemplateColumns.push('auto');
   }
  }
 }, $(AiOutlineInsertRowRight({ width: '1.7em' })));

 const isolatedSelection = el('button', {
  class: 'mr-2',
  event: {
   click() {
    isolatedActivated = !isolatedActivated;
    $(this)[isolatedActivated ? 'removeClass' : 'addClass']('text-green-400');
   }
  }
 }, $(AiOutlineMergeCells({ width: '1.7em' })));

 const mergeBtn = el('button', {
  class: 'mr-2',
  event: {
   click() {
    enableMerging = !enableMerging;
    $(this)[enableMerging ? 'addClass' : 'removeClass']('text-green-400');
   }
  }
 }, $(AiOutlineMergeCells({ width: '1.7em', style: '-webkit-transform: rotate(90deg); transform: rotate(90deg)' })));

 function disableMerging() {
  enableMerging = false;
  mergeBtn.removeClass('text-green-400');
 }
 
 const clear = el('button', {
  event: {
   click() {
    let GRID_VALUE = ctx[screenView].GRID_VALUE;
    ctx[screenView].GRID_VALUE = Array.from({ length: GRID_VALUE.length }, () => []);

    $('div', gridParent).each(function() {
    	if (this.style.borderStyle) {
    		$(this).replaceWith(el('div', { style: { height: '2rem', boxShadow: 'inset 0px 0px 2px 1px grey', cursor: 'pointer' }, class: 'col' }));
     }
    });
    
    endBtn.click();
   }
  }
 }, $(AiOutlineUndo({ width: '1.7em' })));

 gridParent.append(modifyX);
 gridParent.append(div);

 let main = el('div', 0, gridParentP);
 
 main.append(
  el('div', { class: 'flex jc-sb' },
   el('div', 0, startBtn, endBtn, addColBtn, addRowBtn),
   el('div', 0, isolatedSelection, mergeBtn, clear)
  ));

 main.append(
  el('h3', { class: 'mt-5 font-bold text-green-600', style: { fontSize: '1rem' }, textContent: 'Add spaces to rows and columns' }),
  el('div', { class: 'flex-ajsb mt-3' },
   elT('label', 'Row spacing:'),
   new CREATE_RANGE_COMP({ addUnit: true, unit: 'px' }, val => ctx[screenView].rowGap = val)
  ),
  el('div', { class: 'flex-ajsb' },
   elT('label', 'Column spacing:'),
   new CREATE_RANGE_COMP({ addUnit: true, unit: 'px' }, val => ctx[screenView].columnGap = val)
  )
 );
 
 let interval = setInterval(function() {
 	if (!modifyX[0].isConnected) return;
 	modifyY.css('marginTop', modifyX.innerHeight() + "px");
 	clearInterval(interval);
 }, 100);

 return [main, ctx];
}