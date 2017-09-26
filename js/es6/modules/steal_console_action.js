/* steal_console_action.js, v. 0.1.1, 26.09.2017, @ filip-swinarski */

const stealConsoleAction = (input) => {

	const config = JSON.stringify({
		stealBrowserConsole: input.checked,
		liveMode: DT.liveMode
	});

	if (input.checked) {
		DT.backup = window.console;
		window.console = DT.console;
	} else {
		window.console = DT.backup;
		DT.backup = null;
	}

	localStorage.setItem(document.domain, config);
	DT.stealBrowserConsole = input.checked;
};

export {stealConsoleAction};

