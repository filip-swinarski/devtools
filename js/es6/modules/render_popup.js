/* render_popup.js, v. 0.1.4, 18.09.2017, @ filip-swinarski */

import {renderPopupSection} from './render_popup_section.js';

let renderPopup = (element, row) => {

    let container = document.querySelector('#dev_tools');
    let popup = document.createElement('div');
    let closeBtn =  document.createElement('div');
	let attributeListWrapper = document.createElement('div');
	let styleListWrapper = document.createElement('div');
	let popupWrapper = document.createElement('div');
	let highlightWrapper = document.createElement('div');

    popup.classList.add('popup');
	popupWrapper.classList.add('popup__wrapper');
    closeBtn.classList.add('popup__close');
    closeBtn.innerHTML = 'x';

    closeBtn.addEventListener('click', () => {
        popup.remove();
    }, false);

	renderPopupSection('attr_list', 'Attributes', element, row, attributeListWrapper);
	renderPopupSection('style_list', 'Inline styles', element, row, styleListWrapper);
	renderPopupSection('highlight_section', 'Highlight element', element, row, highlightWrapper);

    popup.appendChild(closeBtn);
    popupWrapper.appendChild(attributeListWrapper);
    popupWrapper.appendChild(styleListWrapper);
    popupWrapper.appendChild(highlightWrapper);
    popup.appendChild(popupWrapper);
    container.appendChild(popup);
};

export {renderPopup};
