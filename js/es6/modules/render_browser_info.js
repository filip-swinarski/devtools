/* render_browser_info.js, v. 0.1.3, 22.09.2017, @ filip-swinarski */

import {renderHeader} from './render_header.js';

const renderBrowserInfo = (panel) => {

    const browserInfoDisplay = document.createElement('div');
    const browserInfoContainer = document.createElement('div');
	const rowClass = 'browser_display__row';
	const keyClass = 'browser_display__key';

    browserInfoContainer.id = 'browser';
    browserInfoContainer.classList.add('browser');
    browserInfoContainer.classList.add('tools_panel');
    browserInfoDisplay.classList.add('browser__display');
    browserInfoDisplay.id = 'browser_display';
    browserInfoDisplay.classList.add('browser__display--collapsed');
    renderHeader(browserInfoContainer, false);
    browserInfoContainer.appendChild(browserInfoDisplay);
    panel.appendChild(browserInfoContainer);
    
    browserInfoDisplay.innerHTML += `<div class=${rowClass}>
		<span class=${keyClass}>App name</span>: ${navigator.appCodeName}
	</div>`;
    browserInfoDisplay.innerHTML += `<div class=${rowClass}>
		<span class=${keyClass}>App version</span>: ${navigator.appVersion}
	</div>`;
    browserInfoDisplay.innerHTML += `<div class=${rowClass}>
		<span class=${keyClass}>Platform</span>: ${navigator.platform}
	</div>`;
    browserInfoDisplay.innerHTML += `<div class=${rowClass}>
		<span class=${keyClass}>User agent</span>: ${navigator.userAgent}
	</div>`;
    browserInfoDisplay.innerHTML += `<div class=${rowClass}>
		<span class=${keyClass}>Window width</span>: ${window.innerWidth}
	</div>`;
    browserInfoDisplay.innerHTML += `<div class=${rowClass}>
		<span class=${keyClass}>Window height</span>: ${window.innerHeight}
	</div>`;
};

export {renderBrowserInfo};
