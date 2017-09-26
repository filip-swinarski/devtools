/* render_html_live_debugger.js, v. 0.1.0, 26.09.2017, @ filip-swinarski */

import {renderPopup} from './render_popup.js';

const renderHtmlLiveDebugger = (element) => {

	const htmlDebugger = document.createElement('div');
	const nextControl = document.createElement('div');
	const prevControl = document.createElement('div');
	const stepInControl = document.createElement('div');
	const stepOutControl = document.createElement('div');
	const popup = document.querySelector('#tools_live_popup');

	htmlDebugger.classList.add('devtools_live_debugger');
	nextControl.classList.add('devtools_live_debugger__control');
	prevControl.classList.add('devtools_live_debugger__control');
	stepInControl.classList.add('devtools_live_debugger__control');
	stepOutControl.classList.add('devtools_live_debugger__control');
	htmlDebugger.appendChild(nextControl);
	htmlDebugger.appendChild(prevControl);
	htmlDebugger.appendChild(stepInControl);
	htmlDebugger.appendChild(stepOutControl);
	nextControl.innerText = 'next';
	prevControl.innerText = 'prev';
	stepInControl.innerText = 'in';
	stepOutControl.innerText = 'out';

	nextControl.addEventListener('click', () => {

		if (element.nextElementSibling) {
			document.querySelector('#tools_live_popup').remove();
			renderPopup(element.nextElementSibling);
		}

	}, false);
	prevControl.addEventListener('click', () => {

		if (element.previousElementSibling) {
			document.querySelector('#tools_live_popup').remove();
			renderPopup(element.previousElementSibling);
		}

	}, false);
	stepInControl.addEventListener('click', () => {

		if (element.firstElementChild) {
			document.querySelector('#tools_live_popup').remove();
			renderPopup(element.firstElementChild);
		}

	}, false);
	stepOutControl.addEventListener('click', () => {

		if (element.parentElement) {
			document.querySelector('#tools_live_popup').remove();
			renderPopup(element.parentElement);
		}

	}, false);
	return htmlDebugger;
};

export {renderHtmlLiveDebugger};
