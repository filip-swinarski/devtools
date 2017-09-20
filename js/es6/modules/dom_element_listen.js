/* dom_element_listen.js, v. 0.1.1, 20.09.2017, @ filip-swinarski */

import {renderInspectorPane} from './render_inspector_pane.js';

const domElementListen = (elem, row, arrow) => {

	let startDate;
	let tObj;
	let startX;
	let startY;
	let endX;
	let endY;
	let distX;
	let distY;
	let maxX = 0;
	let maxY = 0;

	row.addEventListener('touchstart', (e) => {
		startDate = new Date();
		tObj = e.touches[0];
		startX = tObj.pageX;
		startY = tObj.pageY;
	}, false);
	row.addEventListener('touchmove', (e) => {
		tObj = e.changedTouches[0];
		endX = tObj.pageX;
		endY = tObj.pageY;
		distX = endX - startX;
		distY = endY - startY;
	   
		if (Math.abs(distX) > maxX)
			maxX = Math.abs(distX);
	   
		if (Math.abs(distY) > maxY)
			maxY = Math.abs(distY);
	   
	}, false);
	row.addEventListener('touchend', (e) => {
	   
		const endDate = new Date();
		const dateAmp = endDate - startDate;
	   
		tObj = e.changedTouches[0];
		endX = tObj.pageX;
		endY = tObj.pageY;
		distX = endX - startX;
		distY = endY - startY;
	   
		if (maxY <= 30 && maxX <= 30) {
		   
			if (dateAmp <= 200) {
				row.classList.toggle('inspector__row--expanded')
				row.classList.toggle('inspector__row--collapsed')

				if (arrow.classList.contains('inspector__tag-open--expanded') ||
					arrow.classList.contains('inspector__tag-open--collapsed')) {
					arrow.classList.toggle('inspector__tag-open--expanded');
					arrow.classList.toggle('inspector__tag-open--collapsed');
				}

			} else {
				renderInspectorPane(elem, row);
			}
		   
		}
	   
		maxX = 0;
		maxY = 0;

	}, false);
};

export {domElementListen};
