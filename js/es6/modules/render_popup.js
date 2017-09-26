/* render_popup.js, v. 0.1.6, 26.09.2017, @ filip-swinarski */

import {renderHtmlLiveDebugger} from './render_html_live_debugger.js';

const renderPopup = (element) => {

	const popup = document.createElement('div');
	const closeBtn =  document.createElement('div');
	const popupWrapper = document.createElement('div');
	const elementRect = element.getBoundingClientRect();
	const htmlDebugger = renderHtmlLiveDebugger(element);

	popup.classList.add('tools_popup');
	popup.id = 'tools_live_popup';
	popup.style.top = `${elementRect.y + elementRect.height}px`;
	popupWrapper.classList.add('popup__wrapper');
	closeBtn.classList.add('popup__close');
	closeBtn.innerHTML = 'x';

	closeBtn.addEventListener('click', () => {

		const config = JSON.stringify({
			stealBrowserConsole: DT.stealBrowserConsole,
			liveMode: false
		});

		localStorage.setItem(document.domain, config);
		document.querySelector('#tools_overlay').remove();
		DT.liveMode = false;
		popup.remove();
	}, false);

	popup.appendChild(closeBtn);
	popup.appendChild(popupWrapper);
	popupWrapper.appendChild(htmlDebugger);
	document.body.appendChild(popup);

	// test
	const testDisplay = document.createElement('div');
	testDisplay.innerHTML = ` ${element.nodeName.toLowerCase()}`;
	popupWrapper.appendChild(testDisplay);
};

export {renderPopup};
