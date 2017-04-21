/* render_popup.js, v. 0.1.2, 21.04.2017, @ filip-swinarski */

import {renderPopupSection} from './render_popup_section.js';

let renderPopup = (element, row) => {

    let container = document.querySelector('#dev_tools');
    let popup = document.createElement('div');
    let closeBtn =  document.createElement('div');
	let attributeListWrapper = document.createElement('div');
	let styleListWrapper = document.createElement('div');

    popup.classList.add('popup');
    closeBtn.classList.add('popup__close');
    closeBtn.innerHTML = 'x';

    closeBtn.addEventListener('click', () => {
        popup.remove();
    }, false);

	renderPopupSection('attr_list', 'Attributes', element, row, attributeListWrapper);
	renderPopupSection('style_list', 'Inline styles', element, row, styleListWrapper);

    popup.appendChild(closeBtn);
    popup.appendChild(attributeListWrapper);
    popup.appendChild(styleListWrapper);
    container.appendChild(popup);
};

export {renderPopup};
