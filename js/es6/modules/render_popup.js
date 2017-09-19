/* render_popup.js, v. 0.1.4, 18.09.2017, @ filip-swinarski */

import {renderPopupSection} from './render_popup_section.js';

const renderPopup = (element, row) => {

    const container = document.querySelector('#dev_tools');
    const popup = document.createElement('div');
    const closeBtn =  document.createElement('div');
	const attributeListWrapper = document.createElement('div');
	const styleListWrapper = document.createElement('div');
	const popupWrapper = document.createElement('div');
	const highlightWrapper = document.createElement('div');

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
