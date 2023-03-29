export default function colorGen(colorParent) {
 let allColors = [];
 for (let i = 1; i < 29; i++) allColors.push(i);
 
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