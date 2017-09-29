/* render_popup.js, v. 0.1.9, 29.09.2017, @ filip-swinarski */

import {renderHtmlLiveDebugger} from './render_html_live_debugger.js';
import {renderInspectorPane} from './render_inspector_pane.js';
import {findElementIndex} from './find_element_index.js';

const renderPopup = (element) => {

	const popup = document.createElement('div');
	const closeBtn =  document.createElement('div');
	const popupWrapper = document.createElement('div');
	const elementRect = element.getBoundingClientRect();
	const htmlDebugger = renderHtmlLiveDebugger(element);
	const position = elementRect.y + popup.clientHeight;
	const index = findElementIndex(element);
	const row = document.querySelectorAll('.inspector__row--opening')[index];

	popup.classList.add('tools_popup');
	popup.id = 'tools_popup';

	if (position < 0)
		popup.style.top = `0px`;
	else if (elementRect.y >= window.innerHeight)
		popup.style.top = `${window.innerHeight - popup.clientHeight}px`;
	else
		popup.style.top = `${position}px`;

	popupWrapper.classList.add('tools_popup__wrapper');
	closeBtn.classList.add('tools_popup__close');
	closeBtn.innerHTML = 'x';

	closeBtn.addEventListener('click', () => {

		const overlay = document.querySelector('#tools_overlay');
		const liveModeInput = document.querySelector('#live_mode_input');
		const config = JSON.stringify({
			stealBrowserConsole: DT.stealBrowserConsole,
			liveMode: false
		});

		localStorage.setItem(document.domain, config);
		overlay.remove();
		liveModeInput.checked = false;
		DT.liveMode = false;
		popup.remove();
	}, false);

	popup.appendChild(closeBtn);
	popup.appendChild(popupWrapper);
	popupWrapper.appendChild(htmlDebugger);
	renderInspectorPane(element, row, popup);
	document.body.appendChild(popup);
};

export {renderPopup};
