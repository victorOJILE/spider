import { _, loadFeature } from './utils.js';
import * as fa from './react-icons/fa/index.js';
import {
 AiOutlineLogout,
 AiFillSave,
 AiFillLayout,
 AiOutlineExport,
 AiFillPlusSquare,
 AiOutlineFolderView,
 AiOutlineGlobal,
 AiFillDatabase,
 AiFillQuestionCircle,
 AiOutlineForm,
 AiOutlineCompress,
 AiOutlineExpand,

} from './react-icons/ai/index.js';
import { BsFonts, BsInputCursorText } from './react-icons/bs/index.js'
import { CiLogin, CiLogout } from './react-icons/ci/index.js';

const MAIN_NAVIGATION = {
 "File": [
  {
   name: 'New file',
   icon: fa.FaFileAlt({ width: '1.2em' })
  },
  {
   name: 'New folder',
   icon: fa.FaFolder({ width: '1.2em' }),
  },
  {
   name: 'Save',
   icon: fa.FaSave({ width: '1.2em' })
  },
  {
   name: 'Save as',
   icon: AiFillSave({ width: '1.4em' })
  },
  {
   name: 'Duplicate',
   icon: fa.FaClone({ width: '1.2em' })
  },
  {
   name: 'Delete',
   icon: fa.FaTrashAlt({ width: '1.2em' })
  },
  {
   name: 'View',
   icon: fa.FaMobileAlt({ width: '1.2em' }),
   value: [
    {
     name: 'Fluid view',
     icon: fa.FaSquareFull({ width: '1.2em' })
   	},
    {
     name: 'Mobile view 1',
     icon: fa.FaMobileAlt({ width: '1.2em' })
    },
    {
     name: 'Mobile view 2',
     icon: fa.FaMobileAlt({ width: '1.2em' })
    },
    {
     name: 'Mobile view 3',
     icon: fa.FaMobileAlt({ width: '1.2em' })
    },
    {
     name: 'Tablet view 1',
     icon: fa.FaMobileAlt({ style: 'transform: rotate(-90deg)', width: '1.2em' })
    },
    {
     name: 'Tablet view 2',
     icon: fa.FaTabletAlt({ width: '1.2em' })
    },
    {
     name: 'Laptop view',
     icon: fa.FaLaptop({ width: '1.2em' })
    },
    {
     name: 'Desktop view 1',
     icon: fa.FaDesktop({ width: '1.2em' })
    },
    {
     name: 'Desktop view 2',
     icon: fa.FaDesktop({ width: '1.2em' })
    }
   ],
   useCheckbox: true
  },
  {
   name: 'Export',
   icon: AiOutlineExport({ width: '1.4em' }),
   value: [
    {
     name: 'HTML',
     icon: fa.FaHtml5({ width: '1.2em' }),
    },
    {
     name: 'CSS',
     icon: fa.FaCss3({ width: '1.2em' }),
    },
    {
     name: 'JavaScript',
     icon: fa.FaJs({ width: '1.2em' })
    },
    {
     name: 'React',
     icon: fa.FaReact({ width: '1.2em' })
    },
    {
     name: 'PDF',
     icon: fa.FaFilePdf({ width: '1.2em' })
    }
   ]
  },
  {
   name: 'Log out',
   icon: AiOutlineLogout({ width: '1.4em' })
  }
 ],
 "Edit": [
 	{
   name: "Undo",
   icon: fa.FaUndo({ width: '1.2em' })
  },
  {
   name: "Redo",
   icon: fa.FaRedo({ width: '1.2em' })
  },
  {
   name: "Cut element",
   icon: fa.FaCut({ width: '1.2em' })
  },
  {
   name: "Copy",
   icon: fa.FaCopy({ width: '1.2em' }),
   value: [
    { name: 'Copy element' },
    { name: 'Copy styles' },
    { name: 'Copy ID' }
   ]
  },
  {
   name: "Paste",
   icon: fa.FaPaste({ width: '1.2em' }),
   value: [
    { name: 'Paste element' },
    { name: 'Paste styles' }
   ]
  },
  {
   name: 'Clear styles',
   icon: fa.FaTrashAlt({ width: '1.2em' })
  },
  {
   name: "Remove",
   icon: fa.FaTrash({ width: '1.2em' }),
   value: [
    { name: "Remove Element" },
    { name: "Remove Children" }
   ]
  }],
 "Insert": [
  {
   name: 'Layout',
   icon: AiFillLayout({ width: '1.4em' }),
   value: [
    { name: 'Customize' },
    { name: 'Layout 2X' },
    { name: 'Layout 3X' },
    { name: 'Layout 4X' },
    { name: 'Layout 5X' },
    { name: 'Layout 6X' }
   ]
  },
  {
   name: 'Table',
   icon: fa.FaTable({ width: '1.2em' })
  },
  {
   name: 'Embed external file',
   icon: fa.FaFileImport({ width: '1.2em' })
  },
  {
   name: 'Icons',
   icon: fa.FaIcons({ width: '1.2em' })
  },
  {
   name: 'Button',
   icon: fa.HiCursorClick({ width: '1.4em' })
  },
  {
   name: 'Inputs',
   icon: BsInputCursorText({ width: '1.4em' })
  },
  {
   name: 'Pop up',
   icon: ''
  }
 ],
 "Advanced": [
  {
   name: "Preview",
   icon: fa.FaRegPlayCircle()
  },
  {
   name: "Go live",
   icon: AiOutlineGlobal()
  },
  {
   name: 'Add to snippets',
   icon: AiFillPlusSquare()
  },
  {
   name: "Saved snippets",
   icon: AiFillDatabase(),
   value: [
    {
     name: 'Navbar-1'
    }
   ]
  },
  {
   name: 'Activate fullscreen',
   icon: AiOutlineExpand()
  },
  {
   name: 'Deactivate fullscreen',
   icon: AiOutlineCompress()
  },
  {
   name: 'Theme',
   icon: fa.FaMoon(),
   value: [
    {
     name: 'Dark mode',
     icon: fa.FaMoon()
    },
    {
     name: 'Light mode',
     icon: fa.FaSun()
    }
   ]
  },
  {
   name: 'Help',
   icon: AiFillQuestionCircle()
  }
 ]
};

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
 { class: 1 },
 { id: 2 },
 { contentEditable: attr.condition },
 { role: ['alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox', 'columnheader', 'combobox', 'command', 'complementary', 'composite', 'contentinfo', 'definition', 'dialog', 'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 'img', 'input', 'landmark', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'range', 'region', 'roletype', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'search', 'searchbox', 'section', 'sectionhead', 'select', 'separator', 'slider', 'spinbutton', 'status', 'structure', 'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem', 'widget'] },
 { title: 1 },
 { accessKey: 1 },
 { dir: attr.dir },
 { draggable: attr.condition },
 { dropzone: ['copy', 'move', 'link'] },
 { hidden: attr.condition },
 { lang: 2 },
 { spellcheck: attr.condition },
 { tabindex: 2 },
 { translate: ['yes', 'no'] },
 { ariaActivedescendant: 1 },
 { ariaAtomic: attr.condition },
 { ariaAutoComplete: ['none', 'inline', 'list', 'both'] },
 { ariaBusy: attr.condition },
 { ariaChecked: attr.condition.concat('mixed') },
 { ariaColCount: 2 },
 { ariaColIndex: 2 },
 { ariaColSpan: 2 },
 { ariaControls: 1 },
 { ariaCurrent: attr.condition.concat(['page', 'step', 'location', 'date', 'time']) },
 { ariaDescription: 1 },
 { ariaDetails: 1 },
 { ariaDisabled: attr.condition },
 { ariaErrormessage: 1 },
 { ariaExpanded: attr.condition },
 { ariaFlowto: 1 },
 { ariaHasPopup: attr.condition.concat(['menu', 'listbox', 'tree', 'grid', 'dialog']) },
 { ariaHidden: attr.condition },
 { ariaInvalid: attr.condition.concat(['grammar', 'spelling']) },
 { ariaKeyShortcuts: 1 },
 { ariaLabel: 1 },
 { ariaLabelledby: 1 },
 { ariaLevel: 2 },
 { ariaLive: ['off', 'assertive', 'polite'] },
 { ariaModal: attr.condition },
 { ariaMultiLine: attr.condition },
 { ariaMultiSelectable: attr.condition },
 { ariaOrientation: ['undefined', 'horizontal', 'vertical'] },
 { ariaOwns: 1 },
 { ariaPlaceholder: 1 },
 { ariaPosInSet: 2 },
 { ariaPressed: attr.condition.concat('mixed') },
 { ariaReadOnly: attr.condition },
 { ariaRelevant: ['all', 'text', 'additions', 'additions text', 'removals'] },
 { ariaRequired: attr.condition },
 { ariaRoleDescription: 1 },
 { ariaRowCount: 2 },
 { ariaRowIndex: 2 },
 { ariaRowSpan: 2 },
 { ariaSelected: attr.condition },
 { ariaSetSize: 2 },
 { ariaSort: ['ascending', 'descending', 'other'] },
 { ariaValueMax: 2 },
 { ariaValueMin: 2 },
 { ariaValueNow: 2 },
 { ariaValueText: 1 }
];

const attrCaps = {
  // HTML
  accept: 'accept',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  class: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  data: 'data',
  datetime: 'dateTime',
  default: 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  enterkeyhint: 'enterKeyHint',
  for: 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  height: 'height',
  hidden: 'hidden',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  'http-equiv': 'httpEquiv',
  id: 'id',
  inputmode: 'inputMode',
  integrity: 'integrity',
  label: 'label',
  lang: 'lang',
  list: 'list',
  manifest: 'manifest',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nomodule: 'noModule',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',
  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  in: 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  transform: 'transform',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

attr.mediaAttr = [
 { controls: attr.condition },
 { autoplay: attr.condition },
 { muted: attr.condition },
 { loop: attr.condition },
 { crossorigin: attr.crossorigin },
 { preload: ['none', 'metadata', 'auto'] }
 ];

const CSSPropAbbr = [
 { "background-color": "bg" },
 { width: "w" },
 { "min-width": "min-w" },
 { "max-width": "max-w" },
 { height: "h" },
 { "min-height": "min-h" },
 { "max-height": "max-h" },
 { display: "d" },
 { "flex-direction": "flex" },
 { "grid-template-rows": "grid-temp-rows" },
 { "grid-template-columns": "grid-temp-col" },
 { "grid-template-areas": "grid-temp-areas" },
 { "grid-column-start": "grid-col-start" },
 { "grid-column-end": "grid-col-end" },
 { "grid-auto-columns": "grid-auto-col" },
 { "column-count": "col-count" },
 { "column-width": "col-width" },
 { "column-span": "col-span" },
 { "column-gap": "col-gap" },
 { "column-rule-style": "col-rule-style" },
 { "column-rule-width": "col-rule-width" },
 { "column-rule-color": "col-rule-color" },
 { margin: "m" },
 { "margin-top": "mt" },
 { "margin-right": "mr" },
 { "margin-bottom": "mb" },
 { "margin-left": "ml" },
 { "margin-block-start": "m-block-start" },
 { "margin-block-end": "m-block-end" },
 { "margin-inline-start": "m-inline-start" },
 { "margin-inline-end": "m-inline-end" },
 { padding: "p" },
 { "padding-top": "pt" },
 { "padding-right": "pr" },
 { "padding-bottom": "pb" },
 { "padding-left": "pl" },
 { "padding-block-start": "p-block-start" },
 { "padding-block-end": "p-block-end" },
 { "padding-inline-start": "p-inline-start" },
 { "padding-inline-end": "p-inline-end" },
 { "background-image": "bg-img" },
 { "background-position": "bg-pos" },
 { "background-repeat": "bg-repeat" },
 { "background-size": "bg-size" },
 { "background-origin": "bg-origin" },
 { "background-clip": "bg-clip" },
 { "background-attachment": "bg-attach" },
 { "object-position": "obj-pos" },
 { "object-view-box": "obj-view-box" },
 { "background-blend-mode": "bg-blend-mode" },
 { "font-size": "fs" },
 { "text-transform": "case" },
 { "text-align": "text" },

 { "text-decoration": "text-decor" },
 { "text-decoration-line": "text-decor-line" },
 { "text-decoration-style": "text-decor-style" },
 { "text-decoration-color": "text-decor-color" },
 { "text-decoration-skip-ink": "text-decor-skip-ink" },
 { "font-variant": "font-variant" },
 { "font-variant-caps": "font-var-caps" },
 { "font-variant-east-asian": "font-var-east-asian" },
 { "font-variant-ligatures": "font-var-ligatures" },
 { "font-variant-numeric": "font-var-numeric" },
 { "border-width": "b-w" },
 { "border-style": "b-s" },
 { "border-color": "b-c" },
 { "border-right": "b-right" },
 { "border-right-style": "b-right-style" },
 { "border-right-width": "b-right-width" },
 { "border-right-color": "b-right-color" },
 { "border-bottom": "b-bottom" },
 { "border-bottom-style": "b-bt-style" },
 { "border-bottom-width": "b-bt-width" },
 { "border-bottom-color": "b-bt-color" },
 { "border-left": "b-left" },
 { "border-left-style": "b-left-style" },
 { "border-left-width": "b-left-width" },
 { "border-left-color": "b-left-color" },
 { "border-block-start": "bb-start" },
 { "border-block-start-style": "bb-start-style" },
 { "border-block-start-width": "bb-start-width" },
 { "border-block-start-color": "bb-start-color" },
 { "border-block-end": "bb-end" },
 { "border-block-end-style": "bb-end-style" },
 { "border-block-end-width": "bb-end-width" },
 { "border-block-end-color": "bb-end-color" },
 { "border-inline-start": "b-inline-start" },
 { "border-inline-start-style": "b-inl-start-style" },
 { "border-inline-start-width": "b-inl-start-width" },
 { "border-inline-start-color": "b-inl-start-color" },
 { "border-inline-end": "b-inline-end" },
 { "border-inline-end-style": "b-inl-end-style" },
 { "border-inline-end-width": "b-inl-end-width" },
 { "border-inline-end-color": "b-inl-end-color" },
 { "border-radius": "b-rad" },
 { "border-top-left-radius": "b-top-left-rad" },
 { "border-top-right-radius": "b-top-right-rad" },
 { "border-bottom-left-radius": "b-bt-right-rad" },
 { "border-bottom-right-radius": "b-bt-right-rad" },
 { "border-start-start-radius": "b-start-start-rad" },
 { "border-start-end-radius": "b-start-end-rad" },
 { "border-end-start-radius": "b-end-start-rad" },
 { "border-end-end-radius": "b-end-end-rad" },
 { "border-image-outset": "b-img-outset" },
 { "border-image-repeat": "b-img-repeat" },
 { "border-image-slice": "b-img-slice" },
 { "border-image-source": "b-img-source" },
 { "border-image-width": "b-img-width" },
 { "animation": "anim" },
 { "animation-name": "anim-name" },
 { "animation-delay": "anim-delay" },
 { "animation-duration": "anim" },
 { "animation-direction": "anim-dir" },
 { "animation-iteration-count": "anim-iter" },
 { "animation-timing-function": "anim-timing" },
 { "animation-fill-mode": "anim-fill-mode" },
 { "animation-play-state": "anim-play" },
 { "transition": "trans" },
 { "transition-delay": "trans-delay" },
 { "transition-duration": "trans-duration" },
 { "transition-property": "trans-property" },
 { "transition-timing-function": "trans-timing" },
 { "backdrop-filter": "bd-filter" },
 { "backface-visibility": "bf-visibility" },
 { "border-collapse": "bdr-collapse" },
 { "buffered-rendering": "buffered-rendering" },
 { "color-interpolation": "color-interp" },
 { "color-interpolation-filters": "color-interp-filters" },
 { "color-rendering": "color-rendering" },
 { "contain-intrinsic-block-size": "CIBS" },
 { "contain-intrinsic-height": "CIH" },
 { "contain-intrinsic-inline-size": "CIIS" },
 { "contain-intrinsic-size": "CIS" },
 { "contain-intrinsic-width": "CIW" },
 { "image-orientation": "img-orientation" },
 { "image-rendering": "img-rendering" },
 { "scroll-margin-block-end": "scr-m-block-end" },
 { "scroll-margin-block-start": "scr-m-block-start" },
 { "scroll-margin-inline-end": "scr-m-inline-end" },
 { "scroll-margin-inline-start": "scr-m-inline-start" },
 { "scroll-padding-block-end": "scr-p-block-end" },
 { "scroll-padding-block-start": "scr-p-block-start" },
 { "scroll-padding-inline-end": "scr-p-inline-end" },
 { "scroll-padding-inline-start": "scr-p-inline-start" }
];

const tags = [
 {
  name: 'a',
  attr: [
   { href: 1 },
   { target: attr.link_target },
   { type: attr.media },
   { download: 1 },
   { hreflang: attr.lang },
   { referrerPolicy: attr.referrerpolicy },
   { rel: attr.link_rel },
   { charset: attr.charset },
   { host: 1 },
   { hostname: 1 },
   { hash: 1 },
   { ping: 1 },
   { name: 1 },
   { password: 1 },
   { pathname: 1 },
   { port: 2 },
   { protocol: 2 },
   { rev: 1 }
  ]
 },
 {
  name: 'abbr',
  attr: [{ title: 1 }]
 }, 'address',
 {
  name: 'area',
  attr: [
   { coords: 1 }, { alt: 1 },
   { shape: ['polygon', 'rectangle', 'circle', 'default'] },
   { href: 1 }, { target: 1 },
   { download: attr.condition },
   { ping: 1 }, { rel: attr.link_rel },
   { referrerpolicy: attr.referrerpolicy }
  ]
 },
 {
  name: 'audio',
  attr: attr.mediaAttr
 }, 'article', 'aside', 'b',
 {
  name: 'bdo',
  attr: [{ dir: attr.dir }]
 },
 {
  name: 'bdi',
  attr: [{ dir: attr.dir }]
 },
 {
  name: 'blockquote',
  attr: [{ cite: 1 }]
 }, 'br',
 {
  name: 'button',
  attr: [
   { type: ['button', 'submit', 'reset'] },
   { value: 1 },
   { disabled: attr.condition },
   { name: 2 }, { form: 2 },
   { formAction: 1 },
   { formMethod: attr.methods },
   { formEnctype: attr.enctypes },
   { formNoValidate: attr.condition },
   { formTarget: attr.link_target }
  ]
 },
 'caption', 'cite', 'code',
 {
  name: 'col',
  attr: [{ span: 2 }]
 },
 {
  name: 'colgroup',
  attr: [{ span: 2 }]
 },
 {
  name: 'data',
  attr: [{ value: 2 }]
 }, 'datalist', 'div', 'dd', 'dl', 'dt',
 {
  name: 'del',
  attr: [{ cite: 1 }, { datetime: 1 }]
 },
 {
  name: 'dfn',
  attr: [{ title: 1 }]
 }, 'em',
 {
  name: 'embed',
  attr: [
   { src: 1 }, { type: 1 }, { width: 2 },
   { height: 2 }, { name: 2 }
  ]
 },
 'figure',
 {
  name: 'fieldset',
  attr: [
   { name: 2 },
   { disabled: attr.condition },
   { form: 2 }
  ]
 },
 'figcaption',
 {
  name: 'fieldset',
  attr: ['4.10.15']
 }, 'footer',
 {
  name: 'form',
  attr: [
   { name: 2 },
   { method: attr.methods },
   { action: 1 },
   { enctype: attr.enctypes },
   { target: attr.link_target },
   { autocomplete: attr.switch },
   { noValidate: attr.condition },
   { acceptCharset: attr.charset },
   { rel: attr.link_rel }
  ]
 }, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i',
 {
  name: 'img',
  attr: [
   { alt: 1 },
   { srcset: 1 },
   { width: 2 },
   { height: 2 },
   { sizes: 2 },
   { name: 2 },
   { useMap: 2 },
   { ismap: attr.condition },
   { crossorigin: attr.crossorigin },
   { referrerpolicy: attr.referrerpolicy },
   { fetchpriority: attr.fetchpriority },
   { loading: attr.loading },
   { decoding: ['sync', 'async', 'auto'] }
  ]
 },
 {
  name: 'input',
  attr: [
   { type: attr.input_types },
   { value: 1 },
   { name: 1 },
   { size: 2 },
   { placeholder: 1 },
   { pattern: 1 },
   { checked: attr.condition },
   { disabled: attr.condition },
   { readOnly: attr.condition },
   { required: attr.condition },
   { minLength: 2 },
   { maxLength: 2 },
   { min: 2 }, { max: 2 }, { step: 2 },
   { multiple: attr.condition },
   { autocomplete: attr.switch },
   { dirName: 1 }, { list: 1 },
   { accept: 1 }, { capture: 1 },
   { form: 2 },
   { formAction: 1 },
   { formMethod: attr.methods },
   { formEnctype: attr.enctypes },
   { formNoValidate: attr.condition },
   { formTarget: attr.link_target },
   { src: 1 }, { alt: 1 },
   { width: 2 }, { height: 2 },
   { title: 1 }
  ]
 },
 {
  name: 'ins',
  attr: [{ cite: 1 }, { datetime: 2 }]
 },
 {
  name: 'iframe',
  attr: [
   { name: 2 }, { src: 1 }, { srcdoc: 1 },
   { width: 2 }, { height: 2 },
   { sandbox: attr.sandbox },
   { allow: attr.condition },
   { referrerpolicy: attr.referrerpolicy },
   { allowfullscreen: attr.condition },
   { loading: attr.loading }
  ]
 },
 'kbd',
 {
  name: 'label',
  attr: [{ htmlFor: 1 }]
 }, 'legend',
 {
  name: 'li',
  attr: [{ value: 1 }]
 }, 'main', 'mark',
 {
  name: 'map',
  attr: [{ name: 1 }]
 }, 'menu',
 {
  name: 'meter',
  attr: [{ value: 2 }, { min: 2 }, { max: 2 }, { low: 2 }, { high: 2 }, { optimum: 2 }]
 }, 'nav',
 {
  name: 'object',
  attr: [
   { data: 1 }, { type: 2 },
   { name: 2 }, { width: 2 },
   { height: 2 }, { form: 2 },
   { useMap: 2 }, { border: 2 },
   { code: 1 }, { codeBase: 1 },
   { codeType: 1 }, { declare: 1 },
   { standby: 1 }
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
  attr: [{ disabled: attr.condition }, { label: 1 }]
 },
 {
  name: 'option',
  attr: [{ value: 1 }, { selected: attr.condition }, { disabled: attr.condition }, { label: 1 }]
 },
 {
  name: 'output',
  attr: [{ htmlFor: 2 }, { name: 2 },
   { form: 2 }]
 }, 'p', 'picture', 'pre',
 {
  name: 'progress',
  attr: [{ value: 2 }, { max: 2 }]
 },
 {
  name: 'q',
  attr: [{ cite: 1 }]
 }, 'ruby', 'rt', 'rp', 's', 'samp', 'section',
 {
  name: 'select',
  attr: [
   { name: 2 }, { required: attr.condition }, { multiple: attr.condition }, { disabled: attr.condition }, { size: 2 },
   { autocomplete: attr.switch }, { form: 2 }
  ]
 }, 'small',
 {
  name: 'source',
  attr: [
   { srcset: 1 }, { src: 1 },
   { type: 2 }, { media: attr.media },
   { sizes: 2 }, { width: 2 },
   { height: 2 },
  ]
 }, 'span', 'strong', 'sup', 'sub',
 {
  name: 'textarea',
  attr: [
   { name: 2 }, { placeholder: 1 },
   { rows: 2 }, { cols: 2 },
   { required: attr.condition },
   { disabled: attr.condition },
   { readOnly: attr.condition },
   { minLength: 2 }, { maxLength: 2 },
   { autocomplete: attr.condition },
   { wrap: ['soft', 'hard'] }, { dirName: 1 }
  ]
 },
 {
  name: 'table',
  attr: [{ align: ['top', 'center', 'bottom'] }, { border: 2 }, { cellSpacing: 2 }, { cellPadding: 2 }, { width: 2 }]
 },
 {
  name: 'tbody',
  attr: [{ vAlign: [] }]
 },
 {
  name: 'thead',
  attr: [{ vAlign: [] }]
 },
 {
  name: 'tfoot',
  attr: [{ vAlign: [] }]
 },
 {
  name: 'tr',
  attr: [{ vAlign: [] }]
 },
 {
  name: 'td',
  attr: [{ colspan: 2 }, { rowspan: 2 }, { headers: 2 }, { height: 2 }, { width: 2 }, { vAlign: [] }, { scope: ['row', 'col', 'rowgroup', 'colgroup', 'auto'] }
  ]
 },
 {
  name: 'th',
  attr: [
   { colspan: 2 }, { rowspan: 2 },
   { headers: 2 }, { width: 2 }, { height: 2 },
   { scope: ['row', 'col', 'rowgroup', 'colgroup', 'auto'] }, { abbr: 1 }
  ]
 },
 {
  name: 'time',
  attr: [{ datetime: 1 }]
 },
 {
  name: 'track',
  attr: [
   { src: 1 },
   { kind: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata'] },
   { label: 1 }, { default: attr.condition }, { srclang: 1 }
  ]
 }, 'u',
 {
  name: 'ul',
  attr: [
   { type: ['disc', 'circle', 'square'] }
  ]
 }, 'var',
 {
  name: 'video',
  attr: [
   ...attr.mediaAttr,
   { width: 2 }, { height: 2 },
   { playsinline: attr.condition },
   { poster: 1 }
  ]
 }, 'wbr'
];

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
    val: ['25%', '50%', '75%', '100%'].concat(DEFAULT_VALUES.minMaxFit, DEFAULT_VALUES.auIniInh),
    noAngleIndicator: true
   },
   {
    name: 'Maximum width',
    type: ['range', 'text'],
    val: ['25%', '50%', '75%', '100%', 'none'].concat(DEFAULT_VALUES.minMaxFit, 'fill-available', DEFAULT_VALUES.iniInhR),
    data: 'max-width',
    noAngleIndicator: true
   },
   {
    name: 'Mininum width',
    type: ['range', 'text'],
    val: ['25%', '50%', '75%', '100%', 'none'].concat(DEFAULT_VALUES.minMaxFit, 'fill-available', DEFAULT_VALUES.iniInhR),
    data: 'min-width',
    noAngleIndicator: true
   },
   {
    name: 'Height',
    type: ['range', 'text'],
    val: ['25%', '50%', '75%', '100%'].concat(DEFAULT_VALUES.minMaxFit, DEFAULT_VALUES.auIniInh),
    noAngleIndicator: true
   },
   {
    name: 'Maximum height',
    type: ['range', 'text'],
    val: ['25%', '50%', '75%', '100%', 'none'].concat(DEFAULT_VALUES.minMaxFit, 'fill-available', DEFAULT_VALUES.iniInhR),
    data: 'max-height',
    noAngleIndicator: true
   },
   {
    name: 'Minimum height',
    type: ['range', 'text'],
    val: ['25%', '50%', '75%', '100%', 'none'].concat(DEFAULT_VALUES.minMaxFit, 'fill-available', DEFAULT_VALUES.iniInhR),
    data: 'min-height',
    noAngleIndicator: true
   },
   {
    name: 'Object fit',
    type: ['text'],
    val: ['none', 'contain', 'cover', 'fill', 'scale-down'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Object position',
    // %values \d% \d% - two vals
    // text \d. text \d.
    type: ['range', 'text'],
    val: ['center', 'top', 'right', 'bottom', 'left'].concat(DEFAULT_VALUES.iniInhR),
    includeRangeAxis: true,
    noAngleIndicator: true
   },
   {
    name: 'Overflow',
    type: ['text'],
    // or dual - visible hidden
    val: ['visible', 'hidden', 'scroll', 'clip', 'auto'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'White space',
    type: ['text'],
    val: ['normal', 'pre', 'nowrap', 'pre-wrap', 'pre-line'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Vertical-align',
    type: ['range', 'text'],
    val: ['baseline', 'sub', 'super', 'text-top', 'text-bottom', 'middle', 'top', 'bottom'].concat(DEFAULT_VALUES.iniInhR),
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
    name: 'Background-origin',
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
    name: 'Background-size',
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
      val: ['normal', 'italic', 'oblique'].concat(DEFAULT_VALUES.iniInhR)
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
      val: ['normal', 'condensed', 'ultra-condensed', 'extra-condensed', 'semi-condensed', 'expanded', 'ultra-expanded', 'extra-expanded', 'semi-expanded'].concat(DEFAULT_VALUES.iniInhR)
     },
     {
      innerText: 'Font size',
      val: DEFAULT_VALUES.fontSizeValues,
      useRange: true
     },
     {
      innerText: 'Line height',
      val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
      useRange: true
     },
     {
      innerText: 'Font family',
      val: DEFAULT_VALUES.fontsFullValue.map(each => each.value)
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
    val: ['normal', 'italic', 'oblique'].concat(DEFAULT_VALUES.iniInhR)
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
    val: ['normal', 'condensed', 'ultra-condensed', 'extra-condensed', 'semi-condensed', 'expanded', 'ultra-expanded', 'extra-expanded', 'semi-expanded'].concat(DEFAULT_VALUES.iniInhR)
   },
   {
    name: 'Font size adjust',
    type: ['range', 'text'],
    val: ['none'].concat(DEFAULT_VALUES.iniInhR),
    noUnit: true,
    noAngleIndicator: true
   },
   {
    name: 'Text alignment',
    type: ['text'],
    val: ['start', 'end', 'left', 'right', 'center', 'justify', 'match-parent'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true,
    data: 'text-align'
   },
   {
    name: 'Letter spacing',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true
   },
   {
    name: 'Line height',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true
   },
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
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true
      },
   {
    name: 'Grid row-gap',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true
      },
   {
    name: 'Grid column-gap',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true
      },
   {
    name: 'Column width',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.auIniInh),
    noAngleIndicator: true
   },
   {
    name: 'Letter spacing',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
    noAngleIndicator: true
      },
   {
    name: 'Line height',
    type: ['range', 'text'],
    val: ['normal'].concat(DEFAULT_VALUES.iniInhR),
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
    val: ['static', 'relative', 'absolute', 'sticky', 'fixed'].concat(DEFAULT_VALUES.iniInhR)
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
    noAngleIndicator: true,
    noUnit: true
   }
   ]
 },
 {
  name: 'Lists',
  val: [
   {
    name: 'List style',
    type: ['select'],
    val: [
     {
      innerText: 'List style type',
      val: ['', 'disc', 'circle', 'decimal', 'none', 'decimal-leading-zero', 'square', 'upper-alpha', 'lower-alpha', 'upper-latin', 'lower-latin', 'upper-roman', 'lower-roman', 'lower-greek', 'cjk-ideographic', 'hiragana', 'simp-chinese-formal']
     },
     {
      innerText: 'List style position',
      val: ['', 'inside', 'outside']
     }
    ]
   },
   {
    name: 'List style type',
    type: ['text'],
    val: ['disc', 'circle', 'decimal', 'none', 'decimal-leading-zero', 'square', 'upper-alpha', 'lower-alpha', 'upper-latin', 'lower-latin', 'upper-roman', 'lower-roman', 'lower-greek', 'cjk-ideographic', 'hiragana', 'simp-chinese-formal']
   },
   {
    name: 'List style position',
    type: ['text'],
    val: ['inside', 'outside']
   }
  ]
 },
 { name: 'Effects', value: [] },
 { name: 'Extensions', value: [] },
 {
  name: 'Others',
  val: [
   {
    name: 'Visibility',
    type: ['text'],
    val: ['visible', 'hidden', 'collapse'].concat(DEFAULT_VALUES.iniInhR)
  }
  ]
 }
 ];

const tw_preflight = `
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: theme('borderColor.DEFAULT', currentColor); /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured 'sans' font-family by default.
*/

html {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  tab-size: 4; /* 3 */
  font-family: theme('fontFamily.sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"); /* 4 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from 'html' so users can set them as a class directly on the 'html' element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured 'mono' font family by default.
2. Correct the odd 'em' font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: theme('fontFamily.mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace); /* 1 */
  font-size: 1em; /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent 'sub and 'sup' elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional ':invalid' styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: theme('colors.gray.400', #9ca3af); /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements 'display: block' by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add 'vertical-align: middle' to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
Ensure the default browser behavior of the 'hidden' attribute.
*/

[hidden] {
  display: none;
}

`;

const tools = [
 {
  icon: fa.FaMousePointer({ width: '1.3em' }),
  text: 'Select',
  action() {
  	iframe.style.cursor = 'loading';
   $(projBody).one('click', (e) => _.SELECT_WITH_SELECTOR_TOOL(e.target));
  },
  title: 'Select'
 },
 {
  icon: fa.FaSquare({ width: '1.3em' }),
  text: 'Box',
  title: 'Draw a box or elements sections',
  childrenTools: [
   {
    name: 'Box',
    type: 'div',
    title: 'A simple, non-semantic block element.'
   },
   {
    name: 'Main',
    title: 'Specifies the main content of a document.'
   },
   {
    name: 'Article',
    title: 'A complete, or self-contained, composition in a document, page and that is, in principle, independently distributable or reusable.'
   },
   {
    name: 'Section',
    title: 'A thematic grouping of content.'
   },
   {
    name: 'Navigation',
    type: 'nav',
    title: 'A section of a page that links to other pages or parts within the page'
   },
   {
    name: 'Aside',
    title: 'A section of a page that consists of content that is tangentially related to the content around the aside element which could be considered separate from that content.'
   },
   {
    name: 'Heading group',
    type: 'hgroup',
    title: 'May be used to group headings 1-6 elements with one or more paragraphs containing content representing a subheading alternative title or tagline.'
   },
   {
    name: 'Header',
    title: "Represents a group of introductory and navigational aids.\n\nThis can be used to wrap a section's table of contents, a search form, or any relevant logos."
   },
   {
    name: 'Footer',
    title: 'Contains information about its section such as who wrote it, links to related documents, copyright data, etc.'
   },
   {
    name: 'Address',
    title: 'Represents contact information for its nearest article or document body element ancestor.'
   }
  ]
 },
 {
  icon: BsFonts({ width: '1.8em' }),
  text: 'Text',
  title: 'Insert text',
  childrenTools: [
   {
    name: 'Text',
    type: 'span',
    title: 'Insert inline text'
   },
   {
    name2: 'Heading',
    childrenTools: [
     {
      name: 'Heading 1',
      type: 'h1'
     },
     {
      name: 'Heading 2',
      type: 'h2'
     },
     {
      name: 'Heading 3',
      type: 'h3'
     },
     {
      name: 'Heading 4',
      type: 'h4'
     },
     {
      name: 'Heading 5',
      type: 'h5'
     },
     {
      name: 'Heading 6',
      type: 'h6'
     }
    ]
   },
   {
    name: 'Paragraph',
    type: 'p',
    title: 'Insert paragraph'
   },
   {
    name: 'Small text',
    type: 'small'
   },
   {
    name: 'Emphasized',
    type: 'strong',
    title: 'Bold and emphasized text'
   },
   {
    name: 'Blockquote',
    type: 'q',
    attributes: generateAttributes('blockquote')
   },
   {
    name: 'Cite'
   },
   {
    name: 'Label',
    attributes: generateAttributes('label'),
    title: 'Input element label text'
   },
   {
    name: 'Time',
    attributes: generateAttributes('time')
   },
   {
    name: 'Deleted',
    type: 'del',
    attributes: generateAttributes('del')
   },
   {
    name: 'Newly inserted',
    type: 'ins',
    attributes: generateAttributes('ins')
   },
   {
    name: 'Superscript',
    type: 'sup'
   },
   {
    name: 'Subscript',
    type: 'sub'
   },
   {
    name: 'Abbreviation',
    type: 'abbr',
    attributes: generateAttributes('abbr')
   },
   {
    name: ' Marked',
    type: 'mark'
   },
   {
    name: 'Incorrect',
    type: 's'
   },
  ]
 },
 {
  icon: fa.FaExternalLinkAlt({ width: '1.3em' }),
  text: 'Link',
  id: 'Link',
  type: 'a',
  run: true,
  attributes: generateAttributes('a'),
  title: 'Insert a hyperlink'
 },
 {
  icon: fa.FaWpforms({ width: '1.3em' }),
  text: 'Form',
  title: 'Form and inputs',
  childrenTools: [
   {
    name: 'Form',
    attributes: generateAttributes('form'),
    def: {
     name: '',
     method: 'get',
     action: '',
     autocomplete: 'on'
    },
    title: 'An element for holding user input tags'
   },
   {
    name: 'Input',
    type: 'input',
    def: {
     type: 'text',
     name: '',
     value: ''
    },
    run: true,
    cannotHaveChildren: true,
    attributes: generateAttributes('input'),
    title: 'A typed data field, usually with a form control to allow the user edit the data.'
   },
   {
    name: 'Label',
    attributes: generateAttributes('label'),
    title: 'A label or text describing or referencing inputs and controls.'
   },
   {
    name: 'Textarea',
    attributes: generateAttributes('textarea'),
    title: 'A multi-line plain text edit control.',
   },
   {
    name: 'Select',
    attributes: generateAttributes('select'),
    title: 'A control for selecting values amongst a set of options'
   },
   {
    name: 'Datalist',
    title: 'Predefined options for other controls. If used with an input field (type=text number etc), this would be display a dropdown list of the options as the user types in the field.\n\nBe sure to give this tag an "id" that match the value of the list attribute on an input tag.'
   },
   {
    name: 'Option',
    attributes: generateAttributes('option'),
    title: 'A select or datalist option tag'
   },
   {
    name: 'Option group',
    type: 'optgroup',
    attributes: generateAttributes('optgroup'),
    title: 'Represents a group of option elements with a common label.'
   },
   {
    name: 'Button',
    attributes: generateAttributes('button'),
    title: 'A clickable button for submitting forms'
   },
   {
    name: 'Fieldset',
    attributes: generateAttributes('fieldset'),
    title: 'Group logically related inputs, controls and labels within a form, with a caption.'
   },
   {
    name: 'Legend',
    attributes: generateAttributes(),
    title: 'A caption for the fieldset element'
   },
   {
    name: 'Output',
    attributes: generateAttributes('output'),
    title: 'The result of a calculation performed by the application, or the result of a user action.'
   }
  ]
 },
 {
  icon: fa.FaList({ width: '1.3em' }),
  text: 'List',
  title: 'Create a list of items',
  childrenTools: [
   {
    name: 'Ordered list',
    type: 'ol',
    attributes: generateAttributes('ol'),
    title: 'Create an ordered list of items'
   },
   {
    name: 'Unordered list',
    type: 'ul',
    attributes: generateAttributes('ul'),
    title: 'Create an unordered list of items e.g using bullet'
   },
   {
    name: 'Menu',
    title: 'Represents a toolbar consisting of its contents, in the form of an unordered list of items.\n\nThis is simply a semantic alternative to an unordered list of items each of which represents a command that the user can perform or activate.'
   },
   {
    name: 'List item',
    type: 'li',
    attributes: generateAttributes('li'),
    title: 'A list item'
   },
   {
    name: 'Description list',
    type: 'dl',
    title: 'Consists of zero or more name-value group. e.g one or more "dt" element followed by one or more "dd" element.\n\nName-value groups may be terms and definitions, metadata topics and values, questions and answers, etc.'
   },
   {
    name: 'Description term',
    type: 'dt',
    title: 'Represents the term, or name part of a term-description group in a description list.'
   },
   {
    name: 'Description data',
    type: 'dd',
    title: 'Represents the value part of a term-description group in a description list.'
   },
   {
    name: 'Definiton',
    type: 'dfn',
    attributes: generateAttributes('dfn'),
    title: 'Represents the defining instance of a term.\n\nThe paragraph, description list or section that is the nearest ancestor of the definition element must also contain the definition(s) for the term given by the definition element.'
   }
  ]
 },
 {
  icon: fa.FaTable({ width: '1.3em' }),
  title: 'Create tables',
  text: 'Table',
  childrenTools: [
   {
    name: 'Table',
    attributes: generateAttributes('table'),
    title: 'Table element'
   },
   {
    name: 'Caption',
    title: 'Represents the title of the table it that is its parent'
   },
   {
    name: 'Column group',
    type: 'colgroup',
    attributes: generateAttributes('colgroup'),
    title: "Groups one or more columns in the table that is it's parent"
   },
   {
    name: 'Column',
    type: 'col',
    attributes: generateAttributes('col'),
    title: 'Represents one or more columns in its column group parent element which is also a child of a table element'
   },
   {
    name: 'Table head (thead)',
    type: 'thead',
    title: 'Represents the block of rows that consist of the column labels (headers) for its parent table element'
   },
   {
    name: 'Table body',
    type: 'tbody',
    title: 'Represents a block of rows that consist of a body of data for the parent table element'
   },
   {
    name: 'Table foot',
    type: 'tfoot',
    title: 'Represents the block of rows that consist of the column summaries (footers) for its parent table element'
   },
   {
    name: 'Table row',
    type: 'tr',
    title: 'Represents a row of cells in a table'
   },
   {
    name: 'Table head',
    type: 'th',
    attributes: generateAttributes('th'),
    title: 'Represents the value part of a term-description group in a description list'
   },
   {
    name: 'Table data',
    type: 'td',
    attributes: generateAttributes('td'),
    title: 'Represents a data cell in a table'
   }
  ]
 },
 {
  icon: fa.FaFilter({ width: '1.3em' }),
  text: 'Filters',
  action() {
   alert('Filter');
  },
  title: 'Filters'
 },
 {
  icon: fa.FaImage({ width: '1.3em' }),
  text: 'Image',
  action() {
  	if(ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');

  	loadFeature('components/UPLOAD_IMAGE.js');
  },
  title: 'Insert image',
 },
 {
  icon: fa.FaVolumeUp({ width: '1.3em' }),
  text: 'Audio',
  type: 'audio',
  action() {
  	if(ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');

  	loadFeature('components/UPLOAD_AUDIO.js');
  },
  title: 'Insert audio file'
 },
 {
  icon: fa.FaVideo({ width: '1.3em' }),
  text: 'Video',
  type: 'video',
  action() {
  	if(ACTIVE_ELEM.cannotHaveChildren) return alert('This element cannot have children!');

  	loadFeature('components/UPLOAD_VIDEO.js');
  },
  title: 'Insert video file'
 }
];

export function generateAttributes(elem) {
 if (!elem || typeof elem !== 'string') attr.globalAttr;

 let attributes = tags.find(key => key == elem || key.name == elem);

 if (attributes) {
  if (typeof attributes === 'string') return attr.globalAttr;
  return attributes.attr.concat(attr.globalAttr);
 }
 return attr.globalAttr;
}

export { MAIN_NAVIGATION, attr, tags, styleProps, DEFAULT_VALUES, CSSPropAbbr, tw_preflight, tools, attrCaps };