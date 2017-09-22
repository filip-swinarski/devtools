/* steal_console_action.js, v. 0.1.0, 22.09.2017, @ filip-swinarski */

const stealConsoleAction = (input) => {

	if (input.checked) {
		DT.backup = window.console;
		window.console = DT.console;
	} else {
		window.console = DT.backup;
		DT.backup = null;
	}

	localStorage.setItem(document.domain, JSON.stringify({stealBrowserConsole: input.checked}))
	DT.stealBrowserConsole = input.checked;
};

export {stealConsoleAction};

