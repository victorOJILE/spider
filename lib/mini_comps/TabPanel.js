import { _ } from '../utils.js';

/**
 Create a tab with buttons
 
 * @function Tabpanel
 * @param {object} config
 * @param {object} config.tabProps
 
 * @param {array} config.tabs - Tab buttons innerTexts
 
 * @param {HTMLElement} config.section
 
 * @param {string} config.clickUpdCls - Active tab button background color
 
 * @param {array} config.tabsBtnCls - Class names to be added to all tab buttons
 
 * @param {string} config.activeTab - Default active tab button textContent
 
 * @param {function} config.callback
 
*/
export default function TabPanel(config) {
	let tab = el('nav', { ...config.tabProps });
	_.UPDATE_CLASS_ON_SELECT({ className: config.clickUpdCls, parent: tab }, undefined, function(btn) { config.callback(btn) });

	$.each(config.tabs, (ind, each) => {
		tab.append(el('button', {
			innerHTML: each,
			class: config.tabsBtnCls.concat(ind === config.activeTab ? [config.clickUpdCls] : [])
		}));
	});

	return el('div', 0, tab, config.section);
}