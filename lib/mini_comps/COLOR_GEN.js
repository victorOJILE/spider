
export default function Color_Gen(callback, config) {
	let output;
	
	const colorList = el('div', { id: 'allColors', class: 'p-1 boundaryBorder overflow-auto h-48', event: {
		click(e) {
			let targ = e.target;
			if (targ.nodeName.toLowerCase() === 'li') {
				targ = $(targ).attr('title');
				
				selectColor.children().first().css('backgroundColor', targ);
				if(config && config.addOutput) output.text(targ);
				
				callback(targ);
			}
		}
	} });
	
	const selectColor = el('div', { class: 'w-8 mr-1' },
		el('div', {
			class: 'h-6 border',
			style: { backgroundColor: 'black' },
			event: {
				click() {
					if (selectColor.children().length > 1) return;
	
					const otherColors = el('ul', { class: 'flex' });
	
					$.each(['white', 'floralwhite', 'ghostwhite', 'whitesmoke', 'azure', 'aliceblue', 'black', 'red', 'green', 'blue', 'crimson'], (ind, each) => {
						let li = el('li', { style: { backgroundColor: each }, title: each });
						if (ind === 6) li.css('border', '1px solid white');
						otherColors.append(li);
					});
	
					colorList.append(otherColors, colorGen(el('div', { class: 'colorsMain' })));
					
					const custom_color = el('input', { type: 'color', value: '', event: {
						input(e) {
							selectColor.children().first().css('backgroundColor', this.value);
							if(config && config.addOutput) output.textContent = this.value;
							
							callback(this.value);
						}
					} });
					
					const rect = selectColor[0].getBoundingClientRect();
					
					const menu = el('div', { class: 'absolute bg-2 w-72', style: { top: rect.bottom + 'px', left: (rect.left - (rect.left/2)) + 'px' } }, custom_color, colorList);
	
					selectColor.append(menu);
					/*
					setTimeout(() => {
						let rect = menu[0].getBoundingClientRect();
						
						while(rect.bottom >= window.outerHeight) {
							menu.css('top', --rect.bottom + 'px');
							rect = menu[0].getBoundingClientRect();
						}
						
						//console.log(rect.bottom, window.outerHeight)
					}, 100);
					*/
					$(window).bind('click.mynamespace', function(e) {
						if (!$.contains(selectColor[0], e.target)) {
							$(window).unbind('click.mynamespace');
							menu.remove();
							colorList.empty();
						}
					});
				}
			}
		})
	);
	
	if (config) {
		if(config.color)	selectColor.children().first().css('backgroundColor', config.color);
		
		if(config.addOutput) {
			output = el('small', { class: 'pl-2', textContent: config.color || '#000000' });
			
			return el('div', { class: 'flex-ac' }, selectColor, output);
		}
	}
	
	return selectColor;
}


function colorGen(colorParent) {
	let code, codes = [
    i => `rgb(${i},${i},${i})`,
    i => `rgb(${i},0,0)`,
    i => `rgb(255,${i},${i})`,
    i => `rgb(0,${i},0)`,
    i => `rgb(${i},255,${i})`,
    i => `rgb(0,0,${i})`,
    i => `rgb(${i},${i},255)`,
    i => `rgb(${i},${i},0)`,
    i => `rgb(255,255,${i})`,
    i => `rgb(${i},0,${i})`,
    i => `rgb(0,${i},${i})`,
    i => `rgb(${i},255,255)`,
    i => `rgb(255,${i},255)`,
    i => `rgb(255,112,${i})`,
    i => `rgb(255,${i},112)`,
    i => `rgb(${i},255,112)`,
    i => `rgb(112,255,${i})`,
    i => `rgb(112,${i},255)`,
    i => `rgb(${i},112,255)`,
    i => `rgb(${i},112,112)`,
    i => `rgb(112,${i},112)`,
    i => `rgb(112,112,${i})`,
    i => `rgb(0,112,${i})`,
    i => `rgb(0,${i},112)`,
    i => `rgb(${i},0,112)`,
    i => `rgb(112,0,${i})`,
    i => `rgb(112,${i},0)`,
    i => `rgb(${i},112,0)`,
   ];

	for (let cd of codes) {
		let ul = el('ul');
		for (let i = 25, j = 0; j < 9; i += 25, j++) {
			code = cd(i);

			ul.append(el('li', { title: code, style: { backgroundColor: code } }));
		}
		colorParent.append(ul);
	}

	return colorParent;
}