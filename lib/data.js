const MAIN_NAVIGATION = {
 "File": [
  {
   name: 'New',
   icon: ['fa', 'fa-file-text']
  },
  {
   name: 'Open',
   icon: ['fa', 'fa-folder-open'],
   value: files.map(e => ({ name: e.title, icon: ['a'] })) || []
  },
  {
   name: 'Save',
   icon: ['fa', 'fa-border-none']
  },
  {
   name: 'Save as',
   icon: ['fa', 'fa-save']
  },
  {
   name: 'View',
   icon: ['fa', 'fa-tablet-alt'],
   value: [
    {
     name: 'Mobile view 1',
     icon: ['fa', 'fa-mobile-alt'],
    },
    {
     name: 'Mobile view 2',
     icon: ['fa', 'fa-mobile-alt'],
    },
    {
     name: 'Mobile view 3',
     icon: ['fa', 'fa-mobile-alt'],
    },
    {
     name: 'Tablet view 1',
     icon: ['fa', 'fa-tablet-alt']
    },
    {
     name: 'Tablet view 2',
     icon: ['fa', 'fa-tablet-alt']
    },
    {
     name: 'Laptop view',
     icon: ['fa', 'fa-laptop']
    },
    {
     name: 'Desktop view 1',
     icon: ['fa', 'fa-desktop']
    },
    {
     name: 'Desktop view 2',
     icon: ['fa', 'fa-desktop']
    }]
   },
  {
   name: 'Rename',
   icon: ['fa', 'fa-i-cursor']
   }
  ],
 "Edit": [{
   name: "Undo",
   icon: ['fa', 'fa-undo']
  },
  {
   name: "Redo",
   icon: ['fa', 'fa-redo']
  },
  {
   name: "Cut",
   icon: ['fa', 'fa-cut']
  },
  {
   name: "Copy element",
   icon: ['fa', 'fa-clone']
  },
  {
   name: 'Copy styles',
   icon: ['fa', 'fa-copy']
  },
  {
   name: 'Copy layout',
   icon: ['fa'],
  },
  {
   name: "Paste",
   icon: ['fa', 'fa-paste']
  },
  {
   name: 'Paste styles',
   icon: ['fa', 'fa-paste']
  },
  {
   name: 'Clear styles',
   icon: ['fa', 'fa-trash']
  },
  {
   name: "Insert component",
   icon: ['fa', 'fa-plus-square']
  },
  {
   name: "Remove",
   icon: ['fa', 'fa-trash-alt']
  }],
 "Layout": [
  {
   name: 'Customize',
   icon: ['fa', 'fa-user-edit']
  },
  {
   name: 'Layout 2X',
   icon: ['fa', 'fa-columns']
  },
  {
   name: 'Layout 3X',
   icon: ['fa', 'fa-table-list']
  },
  {
   name: 'Layout 4X',
   icon: ['fa', 'fa-border-all']
  },
  {
   name: 'Layout 5X',
   icon: ['fa']
  }
 ],
 "Animation": [
  {
   name: "Undo",
   icon: 'gg',
  },
  {
   name: "Redo",
   icon: 'vg',
  },
  {
   name: "Add child",
   icon: 'fd'
  },
  {
   name: "Remove child",
   icon: 'ch'
  }],
 "Advanced": [
  {
   name: "Undo",
   icon: 'c'
  },
  {
   name: "Redo",
   icon: 'vv',
  },
  {
   name: "Add child",
   icon: 'xd'
  },
  {
   name: "Remove child",
   icon: 'a'
  }],
 "Help": [
  {
   name: "Undo",
   icon: 'a'
  },
  {
   name: "Redo",
   icon: 'a'
  },
  {
   name: "Add child",
   icon: 'a'
  },
  {
   name: "Remove child",
   icon: 'a'
  }]
}
//Object.freeze(MAIN_NAVIGATION);

const attr = {
 condition: ['true', 'false'],
 charset: ["UTF-8", "ASCII", "ISO-8859-1", "ANSI(Windows-1252)", "macintosh", "ISO-8859-2", "ISO-8859-3", "ISO-8859-4", "ISO-8859-5", "ISO-8859-6", "ISO-8859-7", "ISO-8859-8", "ISO-8859-8-I", "ISO-8859-10", "ISO-8859-13", "ISO-8859-14", "ISO-8859-15", "ISO-8859-16", "KOI8-R", "KOI8-U", "windows-874", "windows-1250", "windows-1251", "windows-1252", "windows-1253", "windows-1254", "windows-1255", "windows-1256", "windows-1257", "windows-1258", "x-mac-cyrillic", "GBK", "gb18030", "Big-5", "EUC-JP", "replacement", "ISO-2022-JP", "Shift_JIS", "EUC-KR", "UTF-16BE", "UTF-16LE", "x-user-defined"],
 lang: [{ "en-US": 'English US' }, { "en-GB": 'English GB' }, { "fr": 'French' }, { "ru": 'Russian' }, { "zh": 'Chinese' }, { "ja": 'Japanese' }, { "ko": 'Korean' }],
 link_rel: ["alternate", "apple-touch-icon", "author", "bookmark", "canonical", "dns-prefetch", "external", "help", "icon", "license", "manifest", "me", "modulepreload", "next", "nofollow", "noopener", "noreferrer", "opener", "pingback", "preconnect", "prefetch", "preload", "prerender", "prev", "search", "sitemap", "stylesheet", "tag"],
 media: {
  'all': ' ',
  'print': ' ',
  'screen': ' ',
  'any-hover': ['none', 'hover'],
  'any-pointer': ['none', 'fine', 'coarse'],
  'aspect-ratio': 0,
  'min-aspect-ratio': 0,
  'max-aspect-ratio': 0,
  'color': [''],
  'min-color': 1,
  'max-color': 1,
  'color-gamut': ['srgb', 'p3', 'rec2020'],
  'color-index': [''],
  'min-color-index': 1,
  'max-color-index': 1,
  'display-mode': ['fullscreen', 'standalone', 'minimal-ui', 'browser', 'window-controls-overlay'],
  'dynamic-range': ['standard', 'high'],
  'forced-colors': ['none-active'],
  'grid': ['0', '1'],
  'height': 1,
  'min-height': 1,
  'max-height': 1,
  'hover': ['none', 'hover'],
  'inverted-colors': ['none', 'inverted'],
  'monochrome': [''],
  'min-monochrome': 1,
  'max-monochrome': 1,
  'orientation': ['portrait', 'landscape'],
  'overflow-block': ['none', 'flow', 'optional-pledged', 'paged'],
  'overflow-inline': ['none', 'scroll'],
  'pointer': () => attr.media['any-pointer'],
  'prefers-color-scheme': ['light', 'dark'],
  'prefers-contrast': ['no-preference', 'more', 'less', 'custom'],
  'prefers-reduced-motion': ['no-preference', 'reduced'],
  'resolution': 1,
  'min-resolution': 1,
  'max-resolution': 1,
  'scripting': ['none', 'initial-only', 'enabled'],
  'update': ['none', 'slow', 'fast'],
  'video-dynamic-range': () => attr.media['dynamic-range'],
  'width': 1,
  'min-width': 1,
  'max-width': 1
 },
 referrerpolicy: ['no-referrer', 'no-referrer-when-downgrade'],
 crossorigin: ['anonymous', 'use-credentials'],
 'http-equiv': ['x-ua-compatible', 'content-security-policy', 'set-cookie', 'refresh', 'content-language', 'content-type', 'default-style'],
 as: ['audio', 'document', 'embed', 'fetch', 'font', 'image', 'object', 'script', 'style', 'track', 'video', 'worker'],
 fetchpriority: ['high', 'low', 'auto'],
 dir: ['ltr', 'rtl', 'auto'],
 loading: ['lazy', 'eager'],
 sandbox: ['', 'allow-downloads', 'allow-forms', 'allow-modals', 'allow-orientation-lock', 'allow-pointer-lock', 'allow-popups', 'allow-popups-to-escape-sandbox', 'allow-presentation', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation', 'allow-top-navigation-by-user-activation', 'allow-top-navigation-to-custom-protocols'],
 link_target: ['_blank', '_self', '_parent', '_top'],
 methods: ['get', 'post', 'put', 'patch', 'delete'],
 enctypes: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'],
 input_types: ['text', 'number', 'email', 'password', 'tel', 'search', 'url', 'hidden', 'range', 'checkbox', 'radio', 'file', 'button', 'reset', 'submit', 'date', 'month', 'week', 'time', 'datetime-local', 'color', 'image'],
 switch: ['on', 'off']
};

attr.globalAttr = [
 {class: 1},
 {id: 2},
 {contentEditable: attr.condition},
 {role: ['alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox', 'columnheader', 'combobox', 'command', 'complementary', 'composite', 'contentinfo', 'definition', 'dialog', 'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 'img', 'input', 'landmark', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'range', 'region', 'roletype', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'search', 'searchbox', 'section', 'sectionhead', 'select', 'separator', 'slider', 'spinbutton', 'status', 'structure', 'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem', 'widget']},
 {title: 1},
 {accessKey: 1},
 {dir: attr.dir},
 {draggable: attr.condition},
 {dropzone: ['copy', 'move', 'link']},
 {hidden: attr.condition},
 {lang: 2},
 {spellcheck: attr.condition},
 {tabindex: 2},
 {translate: ['yes', 'no']},
 {ariaActivedescendant: 1},
 {ariaAtomic: attr.condition},
 {ariaAutoComplete: ['none', 'inline', 'list', 'both']},
 {ariaBusy: attr.condition},
 {ariaChecked: attr.condition.concat(['mixed'])},
 {ariaColCount: 2},
 {ariaColIndex: 2},
 {ariaColSpan: 2},
 {ariaControls: 1},
 {ariaCurrent: attr.condition.concat(['page', 'step', 'location', 'date', 'time'])},
 {ariaDescription: 1},
 {ariaDetails: 1},
 {ariaDisabled: attr.condition},
 {ariaErrormessage: 1},
 {ariaExpanded: attr.condition},
 {ariaFlowto: 1},
 {ariaHasPopup: attr.condition.concat(['menu', 'listbox', 'tree', 'grid', 'dialog'])},
 {ariaHidden: attr.condition},
 {ariaInvalid: attr.condition.concat(['grammar', 'spelling'])},
 {ariaKeyShortcuts: 1},
 {ariaLabel: 1},
 {ariaLabelledby: 1},
 {ariaLevel: 2},
 {ariaLive: ['off', 'assertive', 'polite']},
 {ariaModal: attr.condition},
 {ariaMultiLine: attr.condition},
 {ariaMultiSelectable: attr.condition},
 {ariaOrientation: ['undefined', 'horizontal', 'vertical']},
 {ariaOwns: 1},
 {ariaPlaceholder: 1},
 {ariaPosInSet: 2},
 {ariaPressed: attr.condition.concat('mixed')},
 {ariaReadOnly: attr.condition},
 {ariaRelevant: ['all', 'text', 'additions', 'additions text', 'removals']},
 {ariaRequired: attr.condition},
 {ariaRoleDescription: 1},
 // 2 - small input field for number
 {ariaRowCount: 2},
 {ariaRowIndex: 2},
 {ariaRowSpan: 2},
 {ariaSelected: attr.condition},
 {ariaSetSize: 2},
 {ariaSort: ['ascending', 'descending', 'other']},
 {ariaValueMax: 2},
 {ariaValueMin: 2},
 {ariaValueNow: 2},
 {ariaValueText: 1}
];
attr.mediaAttr = [
  {src: 1},
  {controls: attr.condition},
  {autoplay: attr.condition},
  {muted: attr.condition},
  {loop: attr.condition},
  {crossorigin: attr.crossorigin},
  {preload: ['none', 'metadata', 'auto']}
 ]
{ Object.freeze(attr); }

const tags = [
/*
 {
  name: 'META',
  attr: {
   name: ['viewport', 'title', 'description', 'keywords', 'author', 'referrer', 'theme-color', 'color-scheme', 'application-name', 'generator', 'textarea'],
   content: ['textarea'],
   "http-equiv": attr["http-equiv"],
   property: 1,
   charset: attr.charset,
   media: attr.media
  }
 },
 {
  name: 'TITLE',
  attr: {
   innerText: ['textarea']
  }
   },
 {
  name: 'LINK',
  attr: {
   rel: attr.link_rel,
   href: ['textarea'],
   hreflang: Object.values(attr.lang),
   type: 1,
   media: attr.media,
   sizes: 1,
   crossorigin: attr.crossorigin,
   as: ['audio', 'document', 'embed', 'fetch', 'font', 'image', 'object', 'script', 'style', 'track', 'video', 'worker'],
   disabled: attr.condition,
   title: ['textarea'],
   blocking: ['render'],
   fetchpriority: attr.fetchpriority,
   imagesizes: 1,
   imagesrcset: [''],
   integrity: ['textarea'],
   prefetch: ['textarea'],
   referrerpolicy: attr.referrerpolicy
  }
 }, */
 {
  name: 'a',
  attr: [
   {charset: attr.charset},
   {download: 1},
   {href: 1},
   {hreflang: attr.lang},
   {host: 1},
   {hostname: 1},
   {hash: 1},
   {ping: 1},
   {name: 1},
   {password: 1},
   {pathname: 1},
   {port: 2},
   {protocol: 2},
   {rev: 1},
   {referrerPolicy: attr.referrerpolicy},
   {rel: attr.link_rel},
   {target: attr.link_target},
   {type: attr.media}
  ]
 },
 {
  name: 'abbr',
  attr: [{title: 1}]
 }, 'address',
 {
  name: 'area',
  attr: [
   {coords: 1}, {alt: 1},
   {shape: ['polygon', 'rectangle', 'circle', 'default']},
   {href: 1}, {target: 1},
   {download: attr.condition},
   {ping: 1}, {rel: attr.link_rel},
   {referrerpolicy: attr.referrerpolicy}
  ]
 },
 {
  name: 'audio',
  attr: attr.mediaAttr
 }, 'article', 'aside', 'b', 
 {
  name: 'bdo',
  attr: [{dir: attr.dir}]
 },
 {
  name: 'bdi',
  attr: [{dir: attr.dir}]
 },
 {
  name: 'blockquote',
  attr: [{cite: 1}]
 }, 'br', 
 {
  name: 'button',
  attr: [
   {type: ['button', 'submit', 'reset']},
   {value: 1},
   {disabled: attr.condition},
   {name: 2}, {form: 2},
   {formAction: 1},
   {formMethod: attr.methods},
   {formEnctype: attr.enctypes},
   {formNoValidate: attr.condition},
   {formTarget: attr.link_target}
  ]
 },
 'caption', 'cite',  'code', 
 {
  name: 'col',
  attr: [{span: 2}]
 },
 {
  name: 'colgroup',
  attr: [{span: 2}]
 },
 {
  name: 'data',
  attr: [{value: 2}]
 }, 'datalist', 'div', 'dd', 'dl', 'dt', 
 {
  name: 'del',
  attr: [{cite: 1}, {datetime: 1}]
 },
 {
  name: 'dfn',
  attr: [{title: 1}]
 }, 'em',
 {
  name: 'embed',
  attr: [
   {src: 1}, {type: 1}, {width: 2},
   {height: 2}, {name: 2}
  ]
 },
 'figure', 'figcaption',
 {
  name: 'fieldset',
  attr: ['4.10.15']
 }, 'footer',
 {
  name: 'form',
  attr: [
   {name: 2},
   {method: attr.methods},
   {action: 1},
   {enctype: attr.enctypes},
   {target: attr.link_target},
   {autocomplete: attr.switch},
   {noValidate: attr.condition},
   {acceptCharset: attr.charset},
   {rel: attr.link_rel}
  ]
 }, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 
 {
  name: 'img',
  attr: [
   {src: 1},
   {alt: 1},
   {srcset: 1},
   {width: 2},
   {height: 2},
   {sizes: 2},
   {name: 2},
   {useMap: 2},
   {ismap: attr.condition},
   {crossorigin: attr.crossorigin},
   {referrerpolicy: attr.referrerpolicy},
   {fetchpriority: attr.fetchpriority},
   {loading: attr.loading},
   {decoding: ['sync', 'async', 'auto']}
  ]
 },
 {
  name: 'input',
  attr: [
   {type: attr.input_types},
   {value: 1},
   {name: 1},
   {size: 2},
   {placeholder: 1},
   {pattern: 1},
   {checked: attr.condition},
   {disabled: attr.condition},
   {readOnly: attr.condition},
   {required: attr.condition},
   {minLength: 2},
   {maxLength: 2},
   {min: 2}, {max: 2}, {step: 2},
   {multiple: attr.condition},
   {autocomplete: attr.switch},
   {dirName: 1}, {list: 1},
   {accept: 1}, {capture: 1},
   {form: 2},
   {formAction: 1},
   {formMethod: attr.methods},
   {formEnctype: attr.enctypes},
   {formNoValidate: attr.condition},
   {formTarget: attr.link_target},
   {src: 1}, {alt: 1},
   {width: 2}, {height: 2},
   {title: 1}
  ]
 },
 {
  name: 'ins',
  attr: [{cite: 1}, {datetime: 2}]
 },
 {
  name: 'iframe',
  attr: [
   {name: 2}, {src: 1}, {srcdoc: 1},
   {width: 2}, {height: 2},
   {sandbox: attr.sandbox},
   {allow: attr.condition},
   {referrerpolicy: attr.referrerpolicy},
   {allowfullscreen: attr.condition},
   {loading: attr.loading}
  ]
 },
 'kbd',
 {
  name: 'label',
  attr: [{htmlFor: 1}]
 },
 {
  name: 'li',
  attr: [{value: 1}]
 }, 'main', 'mark',
 {
  name: 'map',
  attr: [{name: 1}]
 }, 'menu', 
 {
  name: 'meter',
  attr: [{value: 2}, {min: 2}, {max: 2}, {low: 2}, {high: 2}, {optimum: 2}]
 }, 'nav',
 {
  name: 'object',
  attr: [
   {data: 1}, {type: 2},
   {name: 2}, {width: 2},
   {height: 2}, {form: 2},
   {useMap: 2}, {border: 2},
   {code: 1}, {codeBase: 1},
   {codeType: 1}, {declare: 1},
   {standby: 1}
  ]
 },
 {
  name: 'ol',
  attr: [
   { type: ['1', 'a', 'A', 'i', 'I'] },
   { start: 2 },
   { reversed: attr.condition }
  ]
 }, 
 {
  name: 'optgroup',
  attr: [{disabled: attr.condition}, {label: 1}]
 },
 {
  name: 'option',
  attr: [{value: 1}, {selected: attr.condition}, {disabled: attr.condition}, {label: 1}]
 },
 {
  name: 'output',
  attr: [{htmlFor: 2}, {name: 2},
  {form: 2}]
 }, 'p', 'picture', 'pre',
 {
  name: 'progress',
  attr: [{value: 2}, {max: 2}]
 },
 {
  name: 'q',
  attr: [{cite: 1}]
 }, 'ruby', 'rt', 'rp', 's', 'samp', 'section',
 {
  name: 'select',
  attr: [
   {name: 2}, {required: attr.condition}, {multiple: attr.condition}, {disabled: attr.condition}, {size: 2}, 
   {autocomplete: attr.switch}, {form: 2}
  ]
 }, 'small',
 {
  name: 'source',
  attr: [
   {srcset: 1}, {src: 1},
   {type: 2}, {media: attr.media},
   {sizes: 2}, {width: 2},
   {height: 2},
  ]
 }, 'span', 'strong', 'sup', 'sub',
 {
  name: 'textarea',
  attr: [
   {name: 2}, {placeholder: 1},
   {rows: 2}, {cols: 2},
   {required: attr.condition},
   {disabled: attr.condition},
   {readOnly: attr.condition},
   {minLength: 2}, {maxLength: 2},
   {autocomplete: attr.condition},
   {wrap: ['soft', 'hard']}, {dirName: 1}
  ]
 }, 'table', 'tbody', 'thead', 'tfoot', 'tr',
 {
  name: 'td',
  attr: [ {colspan: 2}, {rowspan: 2}, {headers: 2}
  ]
 },
 {
  name: 'th',
  attr: [
   {colspan: 2}, {rowspan: 2},
   {headers: 2},
   {scope: ['row', 'col', 'rowgroup', 'colgroup', 'auto']}, {abbr: 1}
  ]
 },
 {
  name: 'time',
  attr: [{datetime: 1}]
 }, 
 {
  name: 'track',
  attr: [
   {src: 1},
   {kind: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata']},
   {label: 1}, {default: attr.condition}, {srclang: 1}
  ]
 }, 'u',
 {
  name: 'ul',
  attr: [{type: 1}]
 }, 'var',
 {
  name: 'video',
  attr: [
   ...attr.mediaAttr,
   {width: 2}, {height: 2},
   {playsinline: attr.condition},
   {poster: 1}
  ]
 }, 'wbr'
]; 
//console.log(HTMLTextAreaElement);

{ Object.freeze(tags); }

const numberValues = ['0', '25', '50', '75', '100'];
const DEFAULT_VALUES = {
 iniInhR: ['initial', 'inherit'],
 auIniInh: ['auto', 'initial', 'inherit'],
 minMaxFit: ['min-content', 'max-content', 'fit-content'],
 fontsFullValue: [
  { name: "Arial", value: "Arial, Helvetica, sans-serif" },
  { name: "Arial Narrow", value: "'Arial Narrow', Arial, sans-serif" },
  { name: "Arial Narrow Bold", value: "'Arial Narrow Bold', sans-serif" },
  { name: "-apple-system", value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "BlinkMacSystemFont", value: "BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "Calibri", value: "Calibri, 'Trebuchet MS', sans-serif" },
  { name: "Cambria", value: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" },
  { name: "Cantarell", value: "Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "Cochin", value: "Cochin, Georgia, Times, 'Times New Roman', serif" },
  { name: "Courier", value: "Courier, 'Courier New', monospace" },
  { name: "Courier New", value: "'Courier New', Courier, monospace" },
  { name: "cursive", value: "cursive" },
  { name: "fantasy", value: "fantasy" },
  { name: "Franklin Gothic", value: "'Franklin Gothic' 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" },
  { name: "Franklin Gothic Medium", value: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" },
  { name: "Geneva", value: "Geneva, Verdana, sans-serif" },
  { name: "Georgia", value: "Georgia, 'Times New Roman', Times, serif;" },
  { name: "Gill Sans", value: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" },
  { name: "Gill Sans MT", value: "'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" },
  { name: "Haettenschweiler", value: "Haettenschweiler, 'Arial Narrow Bold', sans-serif" },
  { name: "Helvetica", value: "Helvetica, sans-serif" },
  { name: "Helvetica Neue", value: "'Helvetica Neue', sans-serif" },
  { name: "Impact", value: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" },
  { name: "inherit", value: "inherit" },
  { name: "initial", value: "initial" },
  { name: "Lucida Grande", value: "'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" },
  { name: "Lucida Sans", value: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" },
  { name: "Lucida Sans Regular", value: "'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" },
  { name: "Lucida Sans Unicode", value: "'Lucida Sans Unicode', Geneva, Verdana, sans-serif" },
  { name: "monospace", value: "monospace" },
  { name: "Open Sans", value: "'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "Oxygen", value: "Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "Roboto", value: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "sans-serif", value: "sans-serif" },
  { name: "Segoe UI", value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  { name: "serif", value: "serif" },
  { name: "Tahoma", value: "Tahoma, Geneva, Verdana, sans-serif" },
  { name: "Times", value: "Times, serif" },
  { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" },
  { name: "Ubuntu", value: "Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" },
  { name: "unset", value: "unset" },
  { name: "Verdana", value: "Verdana, Geneva, Tahoma, sans-serif;" },
 ],
 fontSizeValues: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "larger", "smaller", 'auto', 'initial', 'inherit'],
 fontWeightValues: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold", "bolder", "lighter", 'initial', 'inherit']
};
/*
let dV = {
 fontSizeValues: numberValues.concat(,
 unitValues: ['px', 'vw', 'vh', 'em', 'rem', '%', 'vmax', 'ch', 'cm', 'pc', 'ex', 'fr', 'in', 'vmin', 'mm', 'pt'],
 ,
 widHeiValues: numberValues.concat(['auto']).concat(minMaxFit).concat(iniInhR),
 padMarNumberList: numberValues.concat(auIniInh),
 lineHeightValueList: numberValues.concat(['normal']).concat(auIniInh),
}
*/
const styleProps = [
 {
  name: 'Layout',
  val: [
   {
    name: 'Display',
    type: ['text'],
    val: ['none', 'block', 'inline', 'inline-block', 'flex', 'grid', 'table', 'inline-flex', 'inline-grid', 'inline-table', 'inline-list-item', 'run-in', 'flow', 'flow-root', 'subgrid', 'ruby', 'table-row', 'table-cell', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-column', 'table-column-group', 'table-caption', 'ruby-base', 'ruby-text', 'ruby-base-container', 'ruby-text-container', 'contents'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Box sizing',
    type: ['text'],
    val: ['content-box', 'border-box'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Float',
    type: ['text'],
    val: ['none', 'left', 'right', 'inline-start', 'inline-end'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Clear',
    type: ['text'],
    val: ['none', 'left', 'right', 'both', 'inline-start', 'inline-end'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Isolation',
    type: ['text'],
    val: ['isolate'].concat(DEFAULT_VALUES.auIniInh)
   },
   {
    name: 'Width',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.minMaxFit.concat(DEFAULT_VALUES.auIniInh),
    noAngleIndicator: true
   },
   {
    name: 'Maximum width',
    type: ['range', 'text'],
    val: ['none'].concat(DEFAULT_VALUES.minMaxFit).concat(['fill-available']).concat(DEFAULT_VALUES.iniInhR),
    data: 'max-width',
    noAngleIndicator: true
   },
   {
    name: 'Mininum width',
    type: ['range', 'text'],
    val: ['none'].concat(DEFAULT_VALUES.minMaxFit).concat(['fill-available']).concat(DEFAULT_VALUES.iniInhR),
    data: 'min-width',
    noAngleIndicator: true
   },
   {
    name: 'Height',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.minMaxFit.concat(DEFAULT_VALUES.auIniInh),
    noAngleIndicator: true
   },
   {
    name: 'Maximum height',
    type: ['range', 'text'],
    val: ['none', ...DEFAULT_VALUES.minMaxFit, 'fill-available', ...DEFAULT_VALUES.iniInhR],
    data: 'max-height',
    noAngleIndicator: true
   },
   {
    name: 'Minimum height',
    type: ['range', 'text'],
    val: ['none', ...DEFAULT_VALUES.minMaxFit, 'fill-available', ...DEFAULT_VALUES.iniInhR],
    data: 'min-height',
    noAngleIndicator: true
   },
   {
    name: 'Object fit',
    type: ['text'],
    val: ['none', 'contain', 'cover', 'fill', 'scale-down', ...DEFAULT_VALUES.iniInhR]
   },
   {
    name: 'Object position',
    // %values \d% \d% - two vals
    // text \d. text \d.
    type: ['range', 'text'],
    val: ['center', 'top', 'right', 'bottom', 'left', ...DEFAULT_VALUES.iniInhR],
    includeRangeAxis: true,
    noAngleIndicator: true
   },
   {
    name: 'Overflow',
    type: ['text'],
    // or dual - visible hidden
    val: ['visible', 'hidden', 'scroll', 'clip', 'auto', ...DEFAULT_VALUES.iniInhR]
   },
   {
    name: 'White space',
    type: ['text'],
    val: ['normal', 'pre', 'nowrap', 'pre-wrap', 'pre-line', ...DEFAULT_VALUES.iniInhR]
   },
   {
    name: 'Vertical-align',
    type: ['range', 'text'],
    val: ['baseline', 'sub', 'super', 'text-top', 'text-bottom', 'middle', 'top', 'bottom', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
   }
    ]
 },
 {
  name: 'Responsive',
  val: [
   {
    name: 'Flex',
    type: ['select'],
    val: [
     {
      innerText: 'Flex grow',
      val: DEFAULT_VALUES.iniInhR,
      useRange: true,
     },
     {
      innerText: 'Flex shrink',
      val: DEFAULT_VALUES.iniInhR,
      useRange: true,
     },
     {
      innerText: 'Flex basis',
      val: ['fit-content', 'min-content', 'max-content', 'available', 'content', 'auto'].concat(DEFAULT_VALUES.iniInhR),
      useRange: true
     }
    ]
   },
   {
    name: 'Flex direction',
    type: ['text'],
    val: ['row', 'column', 'row-reverse', 'column-reverse'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Flex flow',
    type: ['select'],
    val: [
     {
      innerText: 'Flex direction',
      val: ['row', 'column', 'row-reverse', 'column-reverse']
     },
     {
      innerText: 'Flex wrap',
      val: ['nowrap', 'wrap', 'wrap-reverse'].concat(DEFAULT_VALUES.iniInhR)
     }
    ]
   },
   {
    name: 'Flex wrap',
    type: ['text'],
    val: ['nowrap', 'wrap', 'wrap-reverse'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Flex grow',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.iniInhR,
    includeRangeAxis: false,
    noUnit: true,
    noAngleIndicator: true
   },
   {
    name: 'Flex shrink',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.iniInhR,
    includeRangeAxis: false,
    noUnit: true,
    noAngleIndicator: true
   },
   {
    name: 'Flex basis',
    type: ['range', 'text'],
    val: ['fit-content', 'min-content', 'max-content', 'available', 'content', 'auto'].concat(DEFAULT_VALUES.iniInhR),
    includeRangeAxis: false,
    noAngleIndicator: true
   },
   {
    name: 'Align content',
    type: ['text'],
    val: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Align items',
    type: ['text'],
    val: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].concat(DEFAULT_VALUES.iniInhR),
   },
   {
    name: 'Align self',
    type: ['text'],
    val: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].concat(DEFAULT_VALUES.auIniInh)
   },
   {
    name: 'Justify content',
    type: ['text'],
    val: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Order',
    type: ['range'],
    noUnit: true,
    noAngleIndicator: true
   }
  ]
 },
 {
  name: 'Background',
  val: [
   {
    name: 'Background',
    type: ['text'],
    val: []
   },
   {
    name: 'Background-attachment',
    type: ['select-add'],
    val: [
     {
      innerText: 'Attachment',
      val: ['scroll', 'fixed', 'local']
     }
    ]
   },
   {
    name: 'Background-blend-mode',
    type: ['select-add'],
    val: [
     {
      innerText: 'Blend mode',
      val: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'color', 'saturation', 'luminosity']
     }
    ]
   },
   {
    name: 'Background-clip',
    type: ['select-add'],
    val: [
     {
      innerText: 'Clip',
      val: ['border-box', 'padding-box', 'content-box']
     }
    ]
   },
   {
    name: 'Background origin',
    type: ['select-add'],
    val: [
     {
      innerText: 'Origin',
      val: ['border-box', 'padding-box', 'content-box']
     }
    ]
   },
   {
    name: 'Background-repeat',
    type: ['select-add'],
    val: [
     {
      innerText: 'Repeat',
      val: ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round']
     }
    ]
   },
   {
    name: 'Background size',
    type: ['range', 'text'],
    val: ['cover', 'contain'].concat(DEFAULT_VALUES.auIniInh),
    noAngleIndicator: true
   }
  ]
 },
 {
  name: 'Typography',
  val: [
   {
    name: 'Font',
    type: ['select'],
    val: [
     {
      innerText: 'Font style',
      val: ['normal', 'italic', 'oblique', ...DEFAULT_VALUES.iniInhR]
     },
     {
      innerText: 'Font-variant-css21',
      val: ['normal', 'small-caps']
     },
     {
      innerText: 'Font weight',
      val: DEFAULT_VALUES.fontWeightValues
     },
     {
      innerText: 'Font stretch',
      val: ['normal', 'condensed', 'ultra-condensed', 'extra-condensed', 'semi-condensed', 'expanded', 'ultra-expanded', 'extra-expanded', 'semi-expanded', ...DEFAULT_VALUES.iniInhR]
     },
     {
      innerText: 'Font size',
      val: DEFAULT_VALUES.fontSizeValues,
      useRange: true
     },
     {
      innerText: 'Line height',
      val: ['normal', ...DEFAULT_VALUES.iniInhR],
      useRange: true
     },
     {
      innerText: 'Font family',
      val: DEFAULT_VALUES.fontsFullValue.map(each => each.name)
     }
    ]
   },
   {
    name: 'Font size',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.fontSizeValues,
    noAngleIndicator: true
   },
   {
    name: 'Font weight',
    type: ['text'],
    val: DEFAULT_VALUES.fontWeightValues
   },
   {
    name: 'Font style',
    type: ['text'],
    val: ['normal', 'italic', 'oblique', ...DEFAULT_VALUES.iniInhR]
   },
   {
    name: 'Font family',
    type: ['text'],
    val: DEFAULT_VALUES.fontsFullValue.map(each => each.name),
    data: 'font-family'
   },
   {
    name: 'Font stretch',
    type: ['text'],
    val: ['normal', 'condensed', 'ultra-condensed', 'extra-condensed', 'semi-condensed', 'expanded', 'ultra-expanded', 'extra-expanded', 'semi-expanded', ...DEFAULT_VALUES.iniInhR]
   },
   {
    name: 'Font size adjust',
    type: ['range', 'text'],
    val: ['none', ...DEFAULT_VALUES.iniInhR],
    noUnit: true,
    noAngleIndicator: true
   },
   {
    name: 'Letter spacing',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
   },
   {
    name: 'Line height',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
   },
   /*
   {
    ''
   },
   {
    ''
   },
   {
    ''
   },*/
  ]
  /*
  Font kerning
  font - optical - sizing
  font - palette
  font - synthesis - small - caps
  font - synthesis - style
  font - synthesis - weight
  font - variant
  font - variant - caps
  font - variant - east - asian
  font - variant - ligatures
  font - variant - numeric
  */
 },
 { name: 'Animation', value: [] },
 { name: 'Transition', value: [] },
 {
  name: 'Spacing',
  val: [
   {
    name: 'Margin',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    includeRangeAxis: true
   },
   {
    name: 'Margin top',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'top'
   },
   {
    name: 'Margin right',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'right'
   },
   {
    name: 'Margin bottom',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'bottom'
   },
   {
    name: 'Margin left',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'left'
    },
   {
    name: 'Padding',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    includeRangeAxis: true,
     },
   {
    name: 'Padding top',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'top'
     },
   {
    name: 'Padding right',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'right'
     },
   {
    name: 'Padding bottom',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'bottom'
     },
   {
    name: 'Padding left',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    angleIndicator: 'left'
     },
   {
    name: 'Gap',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
      },
   {
    name: 'Row gap',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
      },
   {
    name: 'Column gap',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
      },
   {
    name: 'Column width',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.auIniInh],
    noAngleIndicator: true
   },
   {
    name: 'Letter spacing',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
      },
   {
    name: 'Line height',
    type: ['range', 'text'],
    val: ['normal', ...DEFAULT_VALUES.iniInhR],
    noAngleIndicator: true
      }
    ]
 },
 {
  name: 'Position',
  val: [
   {
    name: 'Position',
    type: ['text'],
    val: ['static', 'relative', 'absolute', 'sticky', 'fixed', ...DEFAULT_VALUES.iniInhR]
   },
   {
    name: 'Top',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    noAngleIndicator: true
   },
   {
    name: 'Bottom',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    noAngleIndicator: true
   },
   {
    name: 'Left',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    noAngleIndicator: true
   },
   {
    name: 'Right',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    noAngleIndicator: true
   },
   {
    name: 'Z-index',
    type: ['range', 'text'],
    val: DEFAULT_VALUES.auIniInh,
    noAngleIndicator: true
   }
   ]
 },
 { name: 'Effects', value: [] },
 { name: 'Webkit', value: [] },
 {
  name: 'Others',
  value: [
   {
    name: 'Visibility',
    type: ['text'],
    val: ['visible', 'hidden', 'collapse', ...DEFAULT_VALUES.iniInhR]
  }
  ]
 }
 ];
 export { MAIN_NAVIGATION, attr, tags, styleProps, DEFAULT_VALUES };