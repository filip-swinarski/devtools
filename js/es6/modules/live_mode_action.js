/* live_mode_action.js, v. 0.1.1, 27.09.2017, @ filip-swinarski */

import {renderLiveOverlay} from './render_live_overlay.js';

const liveModeAction = (input) => {
	DT.liveMode = input.checked;

	const overlay = document.querySelector('#tools_overlay');
	const config = JSON.stringify({
		stealBrowserConsole: input.checked,
		liveMode: DT.liveMode
	});

	if (DT.liveMode)
		renderLiveOverlay();
	else if (overlay)
		document.body.removeChild(overlay);

	localStorage.setItem(document.domain, config);

};

export {liveModeAction};
