import { _, FEATURES } from '../utils.js';
import { MAIN_NAVIGATION } from '../data.js';
import { FaCheck, FaFolder, FaFile, FaChevronDown } from '../react-icons/fa/index.js';

const mainNavsElem = $('#mainNavs');

export default function menubar() {
 projectStructureNav();

 let navUl = '';
 $.each(MAIN_NAVIGATION, function(nav) {
 	navUl +=	`<li class="dropdown inline-block"><span class="inline-block px-3 py-1 rounded" data-button="${nav}">${nav}</span></li>`;
 });
 
 navUl = el('ul', {	id: 'mainNavs', class: 'inline-block py-1 px-0' }).append(navUl);

 mainNavsElem.append(navUl);
	
 function addMenu(nav, ul) {
  $.each(MAIN_NAVIGATION[nav], function(i, each) {
   let li;
   if (each.value) {
    // Nested dropdown
    let dropcnt = el('ul', { class: 'menu' });

    $.each(typeof each.value !== 'function' ? each.value : each.value(), function(ind, e) {
     dropcnt.append(
     	el('li', { class: 'flex-ac', data: { action: e.name }, tabIndex: 1 },
	     	el('span', { class: 'text-center w-8' }, e.icon ? $(e.icon) : ''),
	     	el('span', { textContent: e.name, class: 'truncate flex-grow' }),
	     	each.useCheckbox ? $(FaCheck({
	     		width: '1.5em',
	     		class: 'text-green-500 mark mr-2' + (replaceCaps(replaceSpaces(e.name)) != SPIDER.browser_view ? ' hidden' : '')
	     	})) : ''
     	)
     );
    });
    if (each.useCheckbox) {
     dropcnt.click(function(e) {
      let input = $(e.target).closest('li').find('.mark');
      
	     $('.mark', dropcnt).addClass('hidden');
      
      input.removeClass('hidden');
     });
    }

    let btn = el('div', { class: 'flex' },
     el('span', { class: 'text-center w-8' }, each.icon ? $(each.icon) : ''), el('span', { textContent: each.name, class: 'dropdown-toggle flex-grow' })
    );

    li = el('li', 0, el('div', { class: 'dropend', tabIndex: 1 }, btn, dropcnt));
   } else {
    li = el('li', { data: { action: each.name }, tabIndex: 1 }, el('span', { class: 'text-center inline-block w-8' }, each.icon ? $(each.icon) : ''), elT('span', each.name));
   }
   ul.append(li);
  });

  setTimeout(function() {
  	$(window).bind('click.mynamespace', function(e) {
  		if (!$.contains(ul[0], e.target)) {
    $(window).unbind('click.mynamespace');
    // Fade menu out
    ul.fadeOut(300, function() {
    	ul.remove();
    	ul = null; 
    })
   }
  })}, 0);
 }

 navUl.click(function(e) {
 	let targ = $(e.target);
		
  if (targ.data().button) {
   let ul = el('ul', { class: 'menu', style: { display: 'block' } });
   addMenu(targ.data().button, ul);
   ul.fadeOut(0);
   let parent = targ.parent();
   if (SPIDER.isMobile && e.screenX > 200)	ul.css('right', '0px');
   
   parent.append(ul);
   
   ul.fadeIn(100);
   return;
  }
  
  let li = getParentElem(targ[0], 'li', 'ul|div');
		
  if (li) {
  	li = $(li);
   li = li.data().action;
   FEATURES[li] && FEATURES[li]();
  }
 });
}

function projectStructureNav() {
 let dropdown = $(`<span class="dropdown mr-3 cursor-pointer">
  <svg stroke="currentColor" fill="currentColor" data-action="dropdown" class="text-yellow-600" stroke-width="0" viewBox="0 0 16 16" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z" />
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z" />
   </svg>
  </span>`);

 mainNavsElem.append(dropdown);

 function addMenu(files, ul, first) {
  $.each(files, function(i, each) {
   let li;
   if (each.type === 'folder') {
    let dropcnt = el('ul', { class: 'menu2' });

    let btn = el('div', { class: 'flex' },
     el('span', { class: 'w-6 px-1' }, $(FaFolder())), el('span', { textContent: each.name, class: 'flex-grow' }),
     el('span', { style: { float: 'right', marginRight: '10px' } }, $(FaChevronDown()))
    );

    li = el('li', 0, el('div', { class: 'dropdown' }, btn, dropcnt));

    addMenu(each.content, dropcnt);

   } else {
    li = el('li', { data: { title: each.name, ref: each.ref }, class: 'flex' }, el('span', { class: 'w-6 px-1' }, $(FaFile())), el('span', { class: 'li-w truncate', textContent: each.name }));
   }
   ul.append(li);
  });
  
  if(!first) return;
  
  setTimeout(function() {
  	$(window).bind('click.mynamespace', function(e) {
   if (!$.contains(ul[0], e.target)) {
    $(window).unbind('click.mynamespace');
    // Fade menu out
    ul.fadeOut(400, function() {
    	ul.remove();
   		ul = null;
    });
   }
  })}, 0);
 }

 dropdown.click(function(e) {
  // The arrowSquareDown dropdown icon
  let svgDropdown = getParentElem(e.target, 'svg', 'span');
  if(svgDropdown && svgDropdown.dataset.action) {
   // We added dataset.action to the svgDropdown because without that, 
   // a click on the folder or file icons in any of the lists will return a truthy svgDropdown
   
   let ul = el('ul', { class: 'menu', style: { display: 'block' } });
   addMenu(files, ul, true);
   $(this).append(ul);
  } else {
   let li = getParentElem(e.target, 'li', 'div');
   li && _.FILE_SELECTOR($(li).data().ref);
  }
 });
}