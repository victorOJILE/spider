export default function CreateNewFolder() {
	this.__proto__ = new Dialogue('New folder');

	const dialogueSection = el('section', {
		class: 'p-2 newFDialog bg-2',
		style: {
			height: '350px',
			overflow: 'auto'
		}
	});

	const outerThis = this;

	this.newDialog(dialogueSection);

	this.myContext.folder = 'parent';

	this.__proto__.callback = function() {
		let { name, folder } = this.myContext;
		if (!name) return;

		let newFolder = {
			name,
			type: 'folder',
			content: [
				{
					name: 'File 1',
					type: 'file',
					content: NewFile('File 1')
			 }
			]
		}

		if (folder === 'parent') {
			let search = getFileOrFolder(SPIDER.opened_file);
			search[3].push(newFolder);
		} else {
			currentFolder.content.push(newFolder);
		}

		updateFileOrFolderRef(files);
	}

	let folderName = el('div', { class: 'pt-3' },
		el('label', { htmlFor: 'name', class: 'pb-1', textContent: 'Folder name:' }),
		el('textarea', {
			class: 'form-control w-full',
			id: 'name',
			rows: 3,
			event: {
				change: function(e) { outerThis.myContext.name = $(this).val() }
			}
		})
	);

	let parentFolder = el('input', {
		class: 'mr-1',
		type: 'radio',
		id: 'folderPar',
		checked: true,
		event: {
			change: function() {
				outerThis.myContext.folder = 'parent';
				currentFolder.prop('checked', false);
			}
		}
	});

	let currentFolder = el('input', {
		type: 'radio',
		class: 'mr-1',
		id: 'folderCur',
		event: {
			change: function() {
				outerThis.myContext.folder = 'current';
				parentFolder.prop('checked', false);
			}
		}
	});

	dialogueSection.append(
		folderName,
		el('label', { htmlFor: 'folderPar', class: 'pt-3 flex-ac' },
			parentFolder,
			'Add to parent folder'
		),
		el('label', { htmlFor: 'folderCur', class: 'pt-3 flex-ac' },
			currentFolder,
			'Add to current folder'
		)
	);

	return this.closeProperty;
}