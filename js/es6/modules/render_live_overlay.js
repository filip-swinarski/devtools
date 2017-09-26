/* render_live_overlay.js, v. 0.1.0, 26.09.2017, @ filip-swinarski */

import {findElementPosition} from './find_element_position.js';

const renderLiveOverlay = () => {
   
	const overlay = document.createElement('div');

	document.body.appendChild(overlay);
	overlay.classList.add('tools_overlay');
	overlay.id = 'tools_overlay';
	overlay.addEventListener('click', e => {
		findElementPosition(e.clientX, e.clientY);
	}, false);
};

export {renderLiveOverlay};
