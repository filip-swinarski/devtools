/* console_listen.js, v. 0.1.0, 28.03.2017, @ filip-swinarski */

import {consoleDisplay} from './render_console.js';

let consoleListen = () => {

	window.addEventListener('error', (error) => {

		let row = document.createElement('div');
		let errorMessage = document.createElement('span');
		let errorSource = document.createElement('span');
		let errorLineNo = document.createElement('span');
		let errorColumnNo = document.createElement('span');

		row.classList.add('console-row');
		errorMessage.classList.add('console-row');
		errorSource.classList.add('console-source');
		errorLineNo.classList.add('console-lineno');
		errorColumnNo.classList.add('console-columnno');

		errorMessage.innerHTML += error.message;
		errorSource.innerHTML += error.filename;
		errorLineNo.innerHTML += error.lineno;
		errorColumnNo.innerHTML += error.columnno;

		row.appendChild(errorMessage);
		row.appendChild(errorSource);
		row.appendChild(errorLineNo);
		row.appendChild(errorColumnNo);
		consoleDisplay.appendChild(row);
	
	}, false);

	consoleDisplay.addEventListener('log', (e) => {

		let row = document.createElement('div');
		let logMessage = document.createElement('span');

		logMessage.innerHTML += e.detail;

		row.classList.add('console-row');
		logMessage.classList.add('console-message');

		row.appendChild(logMessage);
		consoleDisplay.appendChild(row);

	}, false);

}

export {consoleListen};
