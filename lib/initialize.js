const elId = (id) => document.getElementById(id);
const elCls = (cls, ind) => {
 let elements = document.getElementsByClassName(cls);
 return ind && typeof ind == 'number' ? elements[ind] : elements;
};
const elName = (n) => {
 let elements = document.getElementsByName(n);
 return ind && typeof ind == 'number' ? elements[ind] : elements;
}
Element.prototype.addCss = function(val = {}) {
 for (let i of Object.keys(val)) {
  this.style[i] = val[i];
 }
};

let isMobile = null;
(function isMobileF() {
 if(isMobile == null) {
 try {
  document.createEvent("TouchEvent");
  isMobile = true;
 } catch (e) {
  isMobile = false;
 }
 }
})();

let selectedElementObject = {};

Element.prototype.ae = function(type, callback, props = {}) {
 this.addEventListener(type, callback, props);
};

String.prototype.capitalize = function() {
 return this.length > 1 ? this[0].toUpperCase() + this.slice(1) : this.toUpperCase();
};

function getStyle(name) {
 let styles = [];
 for (let e in document.body.style) {
  if (e.toLowerCase().indexOf(name) != -1) styles.push(e);
 }
 return styles;
}

function replaceCaps(str) {
 return str.replace(/([A-Z])/g, function(match, off, offset) {
  return (offset > 0 ? "-" : "") + match.toLowerCase();
 })
}

function replaceHyphens(str) {
 return str.replace(/([-]\w)/g, function(match, off, offset) {
  return offset > 0 ? str[offset + 1].toUpperCase() : '';
 });
}

function deepFreeze(obj) {
 if(obj !== null && typeof obj != 'object') {
  return;
 }
 //if(Array.isArray(obj))
}

function cloneObj(obj) {
   let newObj = {};
   for (prop in obj) {
    newObj[prop] = obj[prop];
    if (typeof obj[prop] === 'object')
     cloneObj(obj[prop]);
   }
   return newObj;
  }
  
const context = {
 selectedElement: undefined,
 clipboard: undefined,
 ref: undefined,
 opened_file: 0,
 browser_view: isMobile ? 'mobile-view2' : 'w-100'
};

const files = [];

const NewFile = {
 project: {
   0: {
    type: 'div',
    name: 'ROOT',
    props: { id: 'root', innerText: '' },
    ref: '0:',
    children: {},
    style: {},
    selected: true,
    collapsed: true
   }
 },
 title: 'My new page that has five of us I don\'t have a lot of people will be there ' + (files.length > 0 ? ` ${files.length}` : ''),
 titleF: function (props = {}) {
  return $.cEl('title', { innerText: this.title, ...props });
 },
 description: 'This is a brief description about your page.',
 descriptionF: function (props = {}) {
  return $.cEl('meta', { name: "description", content: this.description, ...props });
 },
 language: 'en-US',
 languageF: function (props = {}) {
  return $.cEl('html', { lang: this.language, ...props });
 },
 encoding: 'UTF-8',
 encodingF: function (props = {}) {
  return $.cEl('meta', { charset: this.encoding, ...props });
 },
 IE_view: 'IE=edge,chrome=1',
 IE_viewF: function (props = {}) {
  return $.cEl('meta', { name: "http-equiv", content: this.IE_view, ...props });
 },
 vw_width: 'device-width',
 vh_height: 'device-height',
 ini_scale: '1.0',
 Viewport: function () {
  let content = `width=${this.vw_width}${this.vh_height && this.vh_height != 'device-height' ? `, height=${this.vh_height}`: ''}, initial-scale=${this.ini_scale}${this?.min_scale && !this.min_scale <= '0' ? `, minimum-scale=${this.min_scale}` : ''}${this?.max_scale && this.max_scale < '10' ? `, maximum-scale=${this.max_scale}` : ''}`;
  return $.cEl('meta', { name: 'viewport', content });
 },
 canonicalLink: '',
 get canonical() {
  return this.canonicalLink;
 },
 set canonical(value) {
  try {
   if(value.match(/http[s]?:\/\/.+\..{2,}/)) {
    this.canonicalLink = value;
   }else {
    throw new Error(`"${value}" is not a valid canonical link`);
   }
  }catch(e) {
   console.error(e.stack);
  }
 },
 enableOG: false,
 "og:title": '',
 "og:titleF": function () {
  return $.cEl('meta', { property: 'og:title', content: this["og:title"] });
 },
 "og:description": '',
 "og:descriptionF": function () {
  return $.cEl('meta', { property: 'og:description', content: this["og:description"] });
 },
 "og:image": '',
 "og:imageF": function () {
  return $.cEl('meta', { property: 'og:image', content: this["og:image"] });
 },
 "fb:app_id": '',
 "fb:app_idF": function () {
  return $.cEl('meta', { property: 'fb:app_id', content: this["fb:app_id"] });
 },
 "og:locale": '',
 "og:localeF": function () {
  return $.cEl('meta', { property: 'og:locale', content: this["og:locale"] });
 },
 "og:url": '',
 "og:urlF": function () {
  return $.cEl('meta', { property: 'og:url', content: this["og:url"] });
 },
 "og:sitename": '',
 "og:sitenameF": function () {
  return $.cEl('meta', { property: 'og:sitename', content: this["og:sitename"] });
 },
 "og:type": 'Website',
 "og:typeF": function () {
  return $.cEl('meta', { property: 'og:type', content: this["og:type"] });
 },
 otherTags: {},
};
files.push(cloneObj(NewFile));

let project = files[context.opened_file].project;

let iframe = elId('frame-section').getElementsByTagName('iframe')[0];
const root = elId("root");
let iframeDoc, projBody;
let iframeLoaded = false;

iframe.src = "res/frame.html";

iframe.onload = function() {
 iframeLoaded = true;
};

iframe.onerror = function(e) {
 console.log(e.stack);
};

const add_Browser_View_Class = function (view) {
 let frame = elId('frame-section').getElementsByTagName('iframe')[context.opened_file];
 context.browser_view = view;
 switch (view) {
  case "mobile-view1":
  case "mobile-view2":
  case "mobile-view3":
  frame.className = view;
  frame.parentElement.classList.add('w-100');
  break;
 default:
  frame.className = view;
  frame.parentElement.classList.contains('w-100') && frame.parentElement.classList.remove('w-100');
 }
}
add_Browser_View_Class(context.browser_view);