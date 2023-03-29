Copyright 2020 [Themesberg](https://themesberg.com) (Crafty Dwarf LLC)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



/*
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
    name: 'Text',
    type: 'span',
    attributes: generateAttributes(HTMLSpanElement),
    title: 'Insert inline text',
    action: function(e) {
     e.stopPropagation();
     new CREATE_NEW_ELEMENT_COMP(this.data);
    }
   },
   {
    name: 'Block text',
    type: 'div',
    attributes: generateAttributes(HTMLDivElement),
    action: function (e) {
     e.stopPropagation();
     console.log('Clicked Block text');
    },
    title: 'Insert block text',
   },
   {
    name2: 'Heading',
    childrenTools: [
     {
      name: 'Heading 1',
      type: 'h1',
      attributes: generateAttributes(HTMLHeadingElement),
      action: function (e) {
       e.stopPropagation();
       console.log('Clicked Heading 1');
      }
     },
     {
      name: 'Heading 2',
      type: 'h2',
      attributes: generateAttributes(HTMLHeadingElement),
      action: function (e) {
       e.stopPropagation();
       console.log('');
      }
     },
     {
      name: 'Heading 3',
      type: 'h3',
      attributes: generateAttributes(HTMLHeadingElement),
      action: function (e) {
       e.stopPropagation();
       console.log('');
      }
     },
     {
      name: 'Heading 4',
      type: 'h4',
      attributes: generateAttributes(HTMLHeadingElement),
      action: function (e) {
       e.stopPropagation();
       console.log('');
      }
     },
     {
      name: 'Heading 5',
      type: 'h5',
      attributes: generateAttributes(HTMLHeadingElement),
      action: function (e) {
       e.stopPropagation();
       console.log('');
      }
     },
     {
      name: 'Heading 6',
      type: 'h6',
      attributes: generateAttributes(HTMLHeadingElement),
      action: function (e) {
       e.stopPropagation();
       console.log('');
      }
     }
    ]
   },
   {
    name: 'Paragraph',
    type: 'p',
    attributes: generateAttributes(HTMLParagraphElement),
    action: function (e) {
     e.stopPropagation();
     console.log('Clicked Paragraph');
    },
    title: 'Insert paragraph'
   },
   {
    name: 'Small text',
    type: 'small',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Emphasized text',
    type: 'strong',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    },
    title: 'Bold and emphasized text'
   },
   {
    name: 'Blockquote text',
    type: 'q',
    attributes: generateAttributes(HTMLQuoteElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Cite text',
    type: 'cite',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Label text',
    type: 'label',
    attributes: generateAttributes(HTMLLabelElement),
    action: function () {
     console.log('Clicked H6');
    },
    title: 'Input element label text'
   },
   {
    name: 'Time text',
    type: 'time',
    attributes: generateAttributes(HTMLTimeElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Deleted text',
    type: 'del',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Newly inserted text',
    type: 'ins',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Superscript text',
    type: 'sup',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Subscript text',
    type: 'sub',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Abbreviation text',
    type: 'abbr',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: ' Marked text',
    type: 'mark',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
   {
    name: 'Incorrect text',
    type: 's',
    attributes: generateAttributes(HTMLSpanElement),
    action: function () {
     console.log('Clicked H6');
    }
   },
  ]
 },
 {
  icon: ['fa', 'fa-expand'], // Border
  action: function () {
   console.log('Border')
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
  type: 'img',
  attributes: generateAttributes(HTMLImageElement),
  action: function () {
   console.log('Image')
  },
  title: 'Insert image',
 },
 {
  icon: ['fa', 'fa-volume-high'],
  type: 'audio',
  attributes: generateAttributes(HTMLAudioElement),
  action: function () {
   console.log('Audio')
  },
  title: 'Insert audio file'
 },
 {
  icon: ['fa', 'fa-video'],
  type: 'video',
  attributes: generateAttributes(HTMLVideoElement),
  action: function () {
    console.log('Video')
  },
  title: 'Insert video file'
 },
 {
  icon: ['fa', 'fa-file-import'],
  action: function () {
   console.log('Embed');
  },
  title: 'Embed external file'
 }*/
 
 function generateAttributes(elem) {
 if(!elem || typeof elem != 'function') elem = HTMLElement;
 try {
  let attr = Object.getOwnPropertyNames(elem.prototype).filter(val => ['toString', 'constructor'].indexOf(val) == -1)
  return attr;
 }catch(e) {
  console.error(e.stack);
  return; // globalAttr;
 }
}