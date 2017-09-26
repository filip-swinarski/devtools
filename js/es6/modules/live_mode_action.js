/* live_mode_action.js, v. 0.1.0, 26.09.2017, @ filip-swinarski */

import {renderLiveOverlay} from './render_live_overlay.js';

const liveModeAction = (input) => {
	DT.liveMode = input.checked;

	const config = JSON.stringify({
		stealBrowserConsole: input.checked,
		liveMode: DT.liveMode
	});

	if (DT.liveMode)
		renderLiveOverlay();
	else
		document.body
			.removeChild(document.querySelector('#tools_overlay'));

	localStorage.setItem(document.domain, config);

};

export {liveModeAction};
