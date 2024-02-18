import { _ } from '../utils.js';
import GENERATE_GRID_MAKER from './GENERATE_GRID_MAKER.js';
import CREATE_SELECT_WITH_LABEL from '../snippets/CREATE_SELECT_WITH_LABEL.js';
import CREATE_RANGE_COMP from '../snippets/CREATE_RANGE_COMP.js';
import {
	FaInfoCircle
} from '../react-icons/fa/index.js';

export default function Table() {
	this.__proto__ = new Dialogue('Table');

	this.name = 'Table';
	this.removeSpacing = false;
	this.removeBorders = false;
	this.cellAlign = 'middle';

	const outerThis = this;

	// this.callback is called when the user clicks the ok button
	// It is used in the inherited class "Dialogue"

	this.__proto__.callback = function() {
		let GRID_VALUE = outerThis.myContext.GRID_VALUE;
		if (GRID_VALUE.length == 1 && !GRID_VALUE[0].length && !outerThis.rowcount)	return;

		let elemObj = function(obj) {
			return $.extend({
				props: { innerHTML: '', style: {}, class: [], responsive: resp() },
				ref: '',
				id: generateId(),
				children: [],
				selected: false,
				open: true
			}, obj);
		};

		let table = elemObj({
			type: 'table',
			name: 'Table'
		});
		table.props.width = '100%';

		let hasCaption = false;
		if (outerThis.caption && $.trim(outerThis.caption.trim)) {
			hasCaption = true;
			let capt = elemObj({
				type: 'caption',
				name: 'Caption'
			});
			capt.props.innerHTML = outerThis.caption;
			table.children.push(capt);
		}

		if (!outerThis.removeSpacing) {
			const rowGap = outerThis.myContext.rowGap;
			const columnGap = outerThis.myContext.columnGap;
			let spacing = [columnGap || '0px', rowGap || '0px'];
			if (spacing.every(each => each === '0px')) {
				table.props.style.borderCollapse = 'collapse';
			} else {
				// if the row and column spacing are the same, use the table's cellspacing attribute instead

				if (spacing.every(each => each === spacing[0])) {
					table.props.cellSpacing = spacing[0];
				} else {
					table.props.style.borderCollapse = 'seperate';
					table.props.style.borderSpacing = spacing.join(' ');
				}
			}
		} else {
			table.props.style.borderCollapse = 'collapse';
		}

		if (outerThis.tableBorder) {
			table.props.border = outerThis.tableBorder;
		}

		if (outerThis.cellsPadding) {
			table.props.cellPadding = outerThis.cellsPadding;
		}
		
		let thead, tbody;
		thead = elemObj({
			type: 'thead',
			name: 'Table head'
		});
		tbody = elemObj({
			type: 'tbody',
			name: 'Table body'
		});

		thead.props.vAlign = outerThis.cellAlign;
		tbody.props.vAlign = outerThis.cellAlign;

		// if the user fills in the row and col counts input field

		if (outerThis.rowcount) {
			// addToRow var to tell whether to add row to thead or tbody
			let addToRow = hasCaption ? 1 : 0;
			if (outerThis.rowcount == 1) {
				table.children.push(tbody);
			} else {
				table.children.push(thead, tbody);
			}

			while (outerThis.rowcount) {
				let tr = elemObj({
					type: 'tr',
					name: 'Table row'
				});
				tr.props.style.height = '1.5rem'

				for (let i = 0; i < outerThis.colcount; i++) {
					const isThead = addToRow == (hasCaption ? 1 : 0);
					const td = elemObj({
						type: isThead ? 'th' : 'td',
						name: isThead ? 'Table head' : 'Table data'
					});
					if (!outerThis.removeBorders) td.props.style.border = '1px solid';

					if (isThead && outerThis.equalCols) {
						td.props.width = 100 / outerThis.colcount + '%';
					}

					// if the user wishes to remove cells border and also wants to set table border width

					// Since setting table border width will also give borders to the cells

					// we simply set the cells border to none

					if (outerThis.removeBorders && outerThis.tableBorder) {
						td.props.style.border = 'none';
					}
					tr.children.push(td);
				}

				table.children[addToRow].children.push(tr);

				// addToRow can exceed 2, and we can only have thead and tbody after caption

				addToRow < (hasCaption ? 2 : 1) && addToRow++;

				outerThis.rowcount--;
			}
		} else {
			// if the user empties the row and col inputs and did not select any using the generator, GRID_VALUE.length = 0 (false)

			if (!GRID_VALUE.length) return;

			iter(GRID_VALUE, array => array.sort((a, b) => a.startIndex - b.startIndex));

			let tableRows = outerThis.myContext.gridTemplateRows;
			let tableData = outerThis.myContext.gridTemplateColumns;

			let rowcount = tableRows.length,
				rowflag = hasCaption ? 1 : 0,
				lastTr;
			if (rowcount == 1) {
				table.children.push(tbody);
			} else {
				table.children.push(thead, tbody);
			}

			iter(GRID_VALUE, function(row, rowIndex) {
				let tr = elemObj({
					type: 'tr',
					name: 'Table row'
				});

				tr.props.style.height = '1.5rem';
				if (tableRows[rowIndex] !== 'auto') {
					tr.props.style.height = tableRows[rowIndex];
				}

				for (let i = 0; i < row.length; i++) {
					if (row[i].merged) {
						lastTr.children[row[i].startIndex].props.rowSpan = 2;
						i++;
						continue;
					}

					const td = elemObj({
						type: rowflag == (hasCaption ? 1 : 0) && rowcount > 1 ? 'th' : 'td',
						name: rowflag == (hasCaption ? 1 : 0) && rowcount > 1 ? 'Table head' : 'Table data'
					});
					if (!outerThis.removeBorders) {
						td.props.style.border = '1px solid';
					}
					/*
					 If the user wishes to remove cells border and also wants to set table border width
					
					 Since setting table border width will also give borders to the cells
					
					 we simply set the cells border to none
					*/
					if (outerThis.removeBorders && outerThis.tableBorder) {
						td.props.style.border = 'none';
					}

					if (tableData[i] !== 'auto') {
						td.props.style.width = tableData[i];
					}

					if (row[i].selected.length > 1) {
						td.props.colSpan = row[i].selected.length;
					}

					tr.children.push(td);
				}
				lastTr = tr;

				table.children[rowflag].children.push(tr);

				// rowflag can exceed 2, and we can only have thead and tbody after caption

				rowflag < (hasCaption ? 2 : 1) && rowflag++;
			});
		}

		_.INSERT_NEW_ELEMENT(table);
	}

	const mainComp = el('main', { class: 'propsFormatDiv p-2 bg-2' });
	mainComp.append(el('h2', { class: 'text-xl', textContent: `Insert table` }));

	const label = function(text, obj = {}, children) {
		return el('label', { textContent: text, ...obj }, children || '');
	}

	const caption = el('div', { class: 'my-3 mx-1' },
		label('Add a caption', { htmlFor: 'caption', class: 'block mb-1' }),
		el('textarea', {
			class: 'form-control w-full',
			id: 'caption',
			event: {
				change() {
					outerThis.caption = $(this).val();
				}
			}
		})
	);

	const rowColCount = el('div', { class: 'flex-ajsb mx-2 mt-1 mb-5' },
		el('label', { textContent: 'Row count: ', htmlFor: 'rowcount', class: 'flex-ac' }, el('input', {
			type: 'number',
			id: 'rowcount',
			class: 'form-control w-1/2 ml-2 text-center',
			event: {
				change() {
					outerThis.rowcount = $(this).val();
				}
			}
		})),
		el('label', { textContent: 'Column count:', htmlFor: 'colcount', class: 'flex-ac' }, el('input', {
			type: 'number',
			id: 'colcount',
			class: 'form-control w-1/2 ml-2 text-center',
			event: {
				change() {
					outerThis.colcount = $(this).val();
				}
			}
		}))
	);

	const tableComp = GENERATE_GRID_MAKER('mobile');
	mainComp.append(caption, rowColCount, tableComp[0]);

	this.__proto__.myContext = tableComp[1].mobile;

	const cellsPadding = el('div', { class: 'flex al-cent jc-sb' },
		label('Cells inner space:'),
		new CREATE_RANGE_COMP({}, '', function(val) { return outerThis.cellsPadding = val }));

	const tableBorder = el('div', { class: 'flex al-cent jc-sb' },
		label('Table border:'),
		new CREATE_RANGE_COMP({}, '', function(val) { return outerThis.tableBorder = val }));

	const checkableOption = function(text, id, callback) {
		return el('div', { class: 'form-check p-0 my-2 flex-ac' },
			el('input', {
				type: 'checkbox',
				class: 'mr-3',
				id,
				event: {
					change: callback
				}
			}),
			label(text, { htmlFor: id })
		);
	};

	const removeSpacing = checkableOption('Remove outer cell spaces', 'defaultSpacing', function() {
		outerThis.removeSpacing = !outerThis.removeSpacing;
	});

	const removeBorders = checkableOption('Remove cell borders', 'defaultBorders', function() {
		outerThis.removeBorders = !outerThis.removeBorders;
	});

	const align = CREATE_SELECT_WITH_LABEL({
		innerText: 'Align cell data (Y)',
		id: 'align',
		selectProps: {
			attributes: { class: 'w-1/2 form-select', id: 'align' },
			options: [
       '', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'super', 'sub', 'baseline'
      ],
			selected: 'middle',
			changeCallback(e) {
				outerThis.cellAlign = $(e.target).val();
			}
		}
	});

	const equalCols = checkableOption('Maintain equal columns', 'equalCols', function() {
		outerThis.equalCols = !outerThis.equalCols;
	});

	align.addClass('my-3', 'mr-2');

	mainComp.append(
		el('hr'), cellsPadding, tableBorder, removeSpacing, removeBorders, equalCols,
		el('small', { class: 'text-yellow-400 flex w-3/4' }, $(FaInfoCircle({ class: 'mr-2', width: '1.8em' })), "If you are using the selector interface, this option won't have effect on your table cells!"), align
	);

	this.newDialog(mainComp);

	return this.closeProperty;
}