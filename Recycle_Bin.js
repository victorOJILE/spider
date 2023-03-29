 /*
 let alphaCount = [];
 for (let i = 0; i < filterQuotes.length; i += 12) alphaCount.push(filterQuotes.slice(i, i + 12));
 
 let rowsCount = {};
 alphaCount.forEach(arr => {
  let alphas = Array.from(new Set(arr));
  alphas.forEach(each => {
   if (each in rowsCount) {
    rowsCount[each]++;
   } else {
    rowsCount[each] = 1;
   }
  })
 });
 
 alphaCount = (function() {
  let columnCount = [];
  alphaCount.forEach((arr, ind) => {
   let count = arr.reduce((all, alpha) => {
    if (alpha in all) {
     all[alpha]++;
    } else {
     all[alpha] = 1;
    }
    return all;
   }, {});
   columnCount.push(count);
  });
  columnCount = columnCount.reduce((myObj, obj) => {
   myObj = Object.assign(myObj, obj);
   return myObj;
  }, {});
  return columnCount;
 })();
 
 
 let style = Object.values(iframeDoc.styleSheets).find(sheet => sheet.href && new URL(sheet.href).pathname == '/res/user_style.css');
 
 */