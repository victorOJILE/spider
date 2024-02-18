import { _ } from '../utils.js';
import CREATE_RANGE_COMP from './CREATE_RANGE_COMP.js';

export default class RangeAxis {
 callback(value) {}
 rangeMeth(config) {
  config || (config = {});
  let rangeAxis = el('div', { class: 'p-1 pt-3 rangeAxis' });
  let outerThis = this;
  let selectedPropValue = this.selectedPropValue ? '' : el('input', {
   type: 'text',
   class: 'form-control',
   event: {
    change: function() { outerThis.callback($(this).val()) }
   }
  });

  const component = el('div', 0, selectedPropValue || '', rangeAxis);
  selectedPropValue = this.selectedPropValue || selectedPropValue;

  // config.defaultValue: This property would be present for components that want to supply a default value to this component

  config.defaultValue && selectedPropValue.val(config.defaultValue);

  const rangeHolder = el('div');
  component.append(rangeHolder);

  const response = [];

  function updaterFunction(value, obj) {
   response[obj.rangeInd] = value;
   let ans = response.join(' ');
   selectedPropValue.val(ans);
   outerThis.callback(ans);
  }

  function reRenderRangeFormat(arr, anglesClasses) {
   try {
    rangeHolder.empty();
    while(response.length) response.pop(); // empty the array
    
    arrayPush.apply(response, arr);
    
    if (!config.comp) {
     iter(arr, (each, ind2) => {
      rangeHolder.append(
       new CREATE_RANGE_COMP({
        value: parseFloat(each),
        angleIndicator: anglesClasses[ind2],
        rangeInd: ind2,
        addUnit: config.addUnit || true,
        unit: String(each).match(/\D+$/)?.[0] || 'px'
       }, updaterFunction)
      );
     });
    } else {
     config.comp(arr, anglesClasses, rangeHolder, updaterFunction, response);
    }
   } catch (e) { console.error(e.stack) }
  }
  const axisFuncArr = [
   function(val) {
    let angleInd = config.fullBorder || ['full'];
    reRenderRangeFormat([val[0]], ['full']);
    selectedPropValue.val(`${val[0]}`);
   },
   function(val) {
    let angleInd = config.XYBorder || ['topBottom', 'rightLeft'];
    if (val.length == 1) {
     reRenderRangeFormat([val[0], val[0]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[0]}`);
    } else {
     reRenderRangeFormat([val[0], val[1]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[1]}`);
    }
   },
   function(val) {
    let angleInd = config.TRIBorder || ['top', 'rightLeft', 'bottom'];
    if (val.length == 1) {
     reRenderRangeFormat([val[0], val[0], val[0]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[0]} ${val[0]}`);
    } else if (val.length == 2) {
     reRenderRangeFormat([val[0], val[1], val[1]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[1]} ${val[1]}`);
    } else {
     reRenderRangeFormat([val[0], val[1], val[2]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[1]} ${val[2]}`);
    }
   },
   function(val) {
    let angleInd = config.QUADBorder || ['top', 'right', 'bottom', 'left'];
    if (val.length == 1) {
     reRenderRangeFormat([val[0], val[0], val[0], val[0]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[0]} ${val[0]} ${val[0]}`);
    } else if (val.length == 2) {
     reRenderRangeFormat([val[0], val[1], val[1], val[1]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[1]} ${val[1]} ${val[1]}`);
    } else {
     reRenderRangeFormat([val[0], val[1], val[2], val[2]], angleInd);
     selectedPropValue.val(`${val[0]} ${val[1]} ${val[2]} ${val[2]}`);
    }
   }
  ];

  let val = selectedPropValue.val().split(' ');

  let axis = val.length - 1;
  axisFuncArr[axis](val);

  iter(['1v', '2v', '3v', '4v'], (each, ind) => rangeAxis.append(el('button', { textContent: each, class: ['m-1', ind == axis && 'rangeAxisActiveBtn'], data: { ind } })));

  _.UPDATE_CLASS_ON_SELECT({ parent: rangeAxis, className: 'rangeAxisActiveBtn' }, false, button => {
   if (button.hasClass('rangeAxisActiveBtn')) return;
   val = selectedPropValue.val().split(' ');
   
   if (!val) val = ['0px'];
   
   axisFuncArr[button.data().ind](val);
   
   outerThis.callback(selectedPropValue.val());
  });
  return component;
 }
}