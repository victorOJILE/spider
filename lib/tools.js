import { _ } from './utils.js';
import { attr, tags } from './data.js';
import { BorderSettingsComponent } from '../components.js';

function generateAttributes(elem) {
 if(!elem || typeof elem != 'string') attr.globalAttr;
 
 let attributes = tags.find(key => key == elem || key.name == elem);
 
 if(attributes) {
   if(typeof attributes == 'string') return attr.globalAttr;
   return attributes.attr.concat(attr.globalAttr);
  }
  return attr.globalAttr;
}

const tools = [
 {
  icon: ['fa', 'fa-arrow-pointer'],
  action: function() {
   _.addListener("click", toolsActions.select);
  },
  title: 'Select'
 },
 {
  icon: ['fa', 'fa-text-slash'],
  title: 'Insert text',
  childrenTools: [
   {
    name: 'Inline text',
    type: 'span',
    attributes: generateAttributes(),
    title: 'Insert inline text'
   },
   {
    name: 'Block text',
    type: 'div',
    attributes: generateAttributes(),
    title: 'Insert block text',
   },
   {
    name2: 'Heading',
    childrenTools: [
     {
      name: 'Heading 1',
      type: 'h1',
      attributes: generateAttributes()
     },
     {
      name: 'Heading 2',
      type: 'h2',
      attributes: generateAttributes()
     },
     {
      name: 'Heading 3',
      type: 'h3',
      attributes: generateAttributes()
     },
     {
      name: 'Heading 4',
      type: 'h4',
      attributes: generateAttributes()
     },
     {
      name: 'Heading 5',
      type: 'h5',
      attributes: generateAttributes()
     },
     {
      name: 'Heading 6',
      type: 'h6',
      attributes: generateAttributes()
     }
    ]
   },
   {
    name: 'Paragraph',
    type: 'p',
    attributes: generateAttributes(),
    title: 'Insert paragraph'
   },
   {
    name: 'Small text',
    type: 'small',
    attributes: generateAttributes()
   },
   {
    name: 'Emphasized text',
    type: 'strong',
    attributes: generateAttributes(),
    title: 'Bold and emphasized text'
   },
   {
    name: 'Blockquote text',
    type: 'q',
    attributes: generateAttributes('blockquote')
   },
   {
    name: 'Cite text',
    type: 'cite',
    attributes: generateAttributes()
   },
   {
    name: 'Label text',
    type: 'label',
    attributes: generateAttributes('label'),
    title: 'Input element label text'
   },
   {
    name: 'Time text',
    type: 'time',
    attributes: generateAttributes('time')
   },
   {
    name: 'Deleted text',
    type: 'del',
    attributes: generateAttributes('del')
   },
   {
    name: 'Newly inserted text',
    type: 'ins',
    attributes: generateAttributes('ins')
   },
   {
    name: 'Superscript text',
    type: 'sup',
    attributes: generateAttributes()
   },
   {
    name: 'Subscript text',
    type: 'sub',
    attributes: generateAttributes()
   },
   {
    name: 'Abbreviation text',
    type: 'abbr',
    attributes: generateAttributes('abbr')
   },
   {
    name: ' Marked text',
    type: 'mark',
    attributes: generateAttributes()
   },
   {
    name: 'Incorrect text',
    type: 's',
    attributes: generateAttributes()
   },
  ]
 },
 {
  icon: ['fa', 'fa-expand'], // Border
  action: function () {
   new BorderSettingsComponent('Border').component();
  },
  title: 'Border radius'
 },
 {
  icon: ['fa', 'fa-save'], // Gradient
  action: function () {
   console.log('Gradient')
  },
  title: 'Gradient'
 },
 {
  icon: ['fa', 'fa-external-link'],
  attributes: generateAttributes(HTMLAnchorElement),
  action: function () {
   
  },
  title: 'Insert link'
 },
 {
  icon: ['fa', 'fa-wpforms'],
  attributes: generateAttributes(HTMLFormElement),
  action: function () {
   console.log('Form')
  },
  title: 'Forms and inputs'
 },
 {
  icon: ['fa', 'fa-table-cells'],
  action: function () {
   console.log('Table')
  },
  title: 'Insert table'
 },
 {
  icon: ['fa', 'fa-icons'], // Icons
  action: function () {
   console.log('Icons')
  },
  title: 'Insert icons'
 },
 {
  icon: ['fa', 'fa-filter'],
  action: function () {
   console.log('Filter');
  },
  title: 'Filters'
 },
 {
  icon: ['fa', 'fa-image'],
  id: 'Image',
  type: 'img',
  attributes: generateAttributes('img'),
  run: true,
  title: 'Insert image',
 },
 {
  icon: ['fa', 'fa-volume-high'],
  id: 'Audio',
  type: 'audio',
  run: true,
  attributes: generateAttributes('audio'),
  title: 'Insert audio file'
 },
 {
  icon: ['fa', 'fa-video'],
  id: 'Video',
  type: 'video',
  attributes: generateAttributes('video'),
  run: true,
  title: 'Insert video file'
 },
 {
  icon: ['fa', 'fa-file-import'],
  action: function () {
   console.log('Embed');
  },
  title: 'Embed external file'
 }
];

const toolsActions = {
 select(event) {
  let elemObj = _.getElementObj(event.target.dataset.ref);
  elemObj.selected = true;
  if(selectedElementObject.ref) selectedElementObject.selected = false;
  selectedElementObject = elemObj;
  _.re_renderDOMSelectors();
  _.removeListener('click', toolsActions.select);
 }
}

export { tools, generateAttributes };