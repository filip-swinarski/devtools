/* render_live_overlay.js, v. 0.1.1, 26.09.2017, @ filip-swinarski */

import {findElementPosition} from './find_element_position.js';
import {renderPopup} from './render_popup.js';

const renderLiveOverlay = () => {
   
	const overlay = document.createElement('div');

	document.body.appendChild(overlay);
	overlay.classList.add('tools_overlay');
	overlay.id = 'tools_overlay';
	overlay.addEventListener('click', e => {

		const element = findElementPosition(e.clientX, e.clientY);

		if (document.querySelector('#tools_live_popup'))
			document.querySelector('#tools_live_popup').remove();

		renderPopup(element);
	}, false);
};

export {renderLiveOverlay};
