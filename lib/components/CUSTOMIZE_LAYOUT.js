import { _ } from '../utils.js';
import GENERATE_GRID_MAKER from './GENERATE_GRID_MAKER.js';
import CLICK_DROPDOWN from '../snippets/CLICK_DROPDOWN.js';

export default function CUSTOMIZE_LAYOUT() {
	this.__proto__ = new Dialogue('Customize Layout');

	let mainComp = el('main', { class: 'propsFormatDiv p-2 bg-2' },
		el('h2', { class: 'my-3 font-bold text-lg', textContent: `Dynamic Layout settings` })
	);
	
	const outerThis = this;
	
	// .newDialog() was inherited from the extended Dialogue class
	this.newDialog(mainComp);

	setTimeout(function() {
		const compsArray = [
			{
				unit: 'mobile',
				element: 'Mobile view'
				},
			{
				unit: 'mobile_lsc',
				element: 'Mobile landscape view'
				},
			{
				unit: 'tablet',
				element: 'Tablet view'
				},
			{
				unit: 'laptop',
				element: 'Laptop view'
				},
			{
				unit: 'desk1',
				element: 'Desktop view 1'
				},
			{
				unit: 'desk2',
				element: 'Desktop view 2'
				}
			];

		outerThis.viewComps = compsArray.reduce((acc, obj, i, ) => {
			let returnValue = GENERATE_GRID_MAKER(obj.unit);

			mainComp.append(
				CLICK_DROPDOWN(obj.element,
					el('div', { class: 'p-2 mt-1 text-black-50 border' }, returnValue[0]),
					i == 0)
			);

			acc.push(returnValue[1]);

			return acc;
		}, []);
	}, 100);

	this.__proto__.callback = function() {
		const ctx = outerThis.myContext;
		iter(outerThis.viewComps, obj => $.extend(ctx, obj));

		let elemObj = ACTIVE_ELEM;

		// if the selected element has children
		let oldChildren = elemObj.children;

		if (oldChildren.length) {
			let className = elemObj.props.class;

			let hasGridClass = className.find(cls => cls == 'grid') || elemObj.props.style.display == 'grid';
			let hasFlexClass = className.find(cls => cls == 'row') || elemObj.props.style.display === 'flex';

			if (hasGridClass) {
				iter(elemObj.children, child => {
					let props = child.props;

					for (let key in props.style) key == 'gridArea' && delete props.style[key];

					for (let view in props.responsive) {
						for (let style in props.responsive[view]) {
							style == 'gridArea' && delete props.responsive[view][style];
						}
					}
				});
			}

			if (hasFlexClass) { // if the selected element is a flex parent

				let removeProperties = ['flex', 'flexBasis', 'flexShrink', 'flexGrow', 'alignItems', 'justifyContent']
				iter(elemObj.children, child => {
					let filteredClass = $.grep(child.props.class, cls => !cls.match(/col|order/));
					let props = child.props;

					props.class = filteredClass;

					iter(removeProperties, prop => prop in props.style && delete props.style[prop]);

					for (let view in props.responsive) {
						iter(removeProperties, prop => prop in props.responsive[view] && delete props.responsive[view][prop]);
					}
				});
			}

			if (className.length) { // remove flex or grid
				elemObj.props.class = $.grep(className, cls => cls !== 'row' && cls !== 'grid');
			}
		}

		let oldTemplateRows, oldTemplateColumns, oldAreas, oldRowGap, oldColumnGap, addedGrid = false;

		let views = {
			mobile: 'mobile-view3',
			mobile_lsc: 'tablet-view1',
			tablet: 'tablet-view2',
			laptop: 'laptop-view',
			desk1: 'desktop-view1',
			desk2: 'desktop-view2'
		}

		elemObj.props.style.display = 'grid';

		for (let key in ctx) {
			let GRID_VALUE = ctx[key].GRID_VALUE;
			if (GRID_VALUE.length == 1 && !GRID_VALUE[0].length) {
				continue;
			}

			// Sort grid columns in case the user didn't select them in the right order e.g selecting from index 5 to 10 before selecting 0 to 4

			iter(GRID_VALUE, array => array.sort((a, b) => a.startIndex - b.startIndex));

			let gridTemplateRows = ctx[key].gridTemplateRows;
			let gridTemplateColumns = ctx[key].gridTemplateColumns;

			let areas = (function() {
				let alphabets = [],
					currentRow, currentAlpha = 0,
					incr = 0;
				let area = [];
				for (let i = 65; i < 91; i++) alphabets.push(String.fromCodePoint(i));
				let prevRow;
				iter(GRID_VALUE, (row, rowIndex) => {
					let newArray = Array.from({ length: gridTemplateColumns.length }, () => '.');
					area.push(newArray);
					// currentAlpha is equal to the default value at first then later the incremented value when processing a new row

					currentAlpha = currentAlpha;

					iter(row, (div, boxIndex) => {
						let alpha;
						if (rowIndex) { // if we have multiple rows and currently on the 2>= row

							if (div.merged) {
								alpha = area[rowIndex - 1][div.startIndex];
								currentAlpha--;
							}
						}
						iter(div.selected, box => area[rowIndex][box] = alpha || alphabets[currentAlpha]);
						currentAlpha++;
					});
				});
				area = area.map(each => `"${each.join('')}"`).join('');
				return area;
			})();

			const templateColumns = gridTemplateColumns.every(e => e == 'auto') ? `repeat(${gridTemplateColumns.length}, 1fr)` : gridTemplateColumns.join(' ');

			const templateRows = gridTemplateRows.every(e => e == 'auto') ? `repeat(${GRID_VALUE.length}, 1fr)` : gridTemplateRows.join(' ');

			const rowGap = ctx[key].rowGap;
			const columnGap = ctx[key].columnGap;

			let alphas = $.grep(Array.from(new Set(areas)), e => e.match(/\w/));
			let addTo;

			function gapsAdder() {
				if (columnGap && oldColumnGap !== columnGap) addTo.gridColumnGap = columnGap;
				if (rowGap && oldRowGap !== rowGap) addTo.gridRowGap = rowGap;
			}

			if (key == 'mobile') {
				addTo = elemObj.props.style;
				addTo.gridTemplateColumns = templateColumns;
				templateRows && (addTo.gridTemplateRows = templateRows);
				addTo.gridTemplateAreas = Array.from(areas).join(' ');
				gapsAdder();
			} else {
				addTo = elemObj.props.responsive[views[key]];
				oldTemplateColumns !== templateColumns && (addTo.gridTemplateColumns = templateColumns);
				templateRows && oldTemplateRows !== templateRows && (addTo.gridTemplateRows = templateRows);
				areas = Array.from(areas).join(' ');
				oldAreas !== areas && (addTo.gridTemplateAreas = areas);
				gapsAdder();
			}

			iter(alphas, (val, index) => {
				if (elemObj.children.length) {
					if (oldChildren[index]) {
						if (key == 'mobile') {
							elemObj.children[index].props.style.gridArea = val;
						} else {
							// we swapped the view name here with the views object above
							elemObj.children[index].props.responsive[views[key]].gridArea = val;
						}
					} else {
						let style = {
							borderWidth: '1px',
							borderStyle: 'solid',
							borderColor: 'black'
						};
						let responsive = resp();

						if (key == 'mobile') {
							style.gridArea = val;
						} else {
							// we swapped the view name here with the views object above
							responsive[views[key]].gridArea = val;
						}
						
						_.INSERT_NEW_ELEMENT({
							type: 'div',
							name: 'Box',
							props: {
								innerHTML: '',
								class: [],
								style,
								responsive
							}
						});
					}
				} else {
					let responsive = resp();
					// If addedGrid is true, it means we already added the divs.
					// Now, we simply edit the responsive style
					if (addedGrid) {
						elemObj.children[index].props.responsive[views[key]].gridArea = val;
					} else {
						responsive[views[key]].gridArea = val;
						
						_.INSERT_NEW_ELEMENT({
							type: 'div',
							name: 'Box',
							props: {
								innerHTML: '',
								class: [],
								style: {
									borderWidth: '1px',
									borderStyle: 'solid',
									borderColor: 'black',
									gridArea: val
								},
								responsive
							}
						});
					}
				}
			});

			oldTemplateColumns = templateColumns;
			oldTemplateRows = templateRows;
			oldAreas = areas;
			oldRowGap = rowGap;
			oldColumnGap = columnGap;

			addedGrid = true;
		}
		_.UPDATE_DOM_ELEMENT();
	}
	
	return this.closeProperty;
}