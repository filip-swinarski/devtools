/* render_browser_info.js, v. 0.1.0, 29.03.2017, @ filip-swinarski */

let renderBrowserInfo = (panel) => {

    const browserInfoDisplay = document.createElement('div');
    const browserInfoContainer = document.createElement('div');

    browserInfoContainer.classList.add('browser');
    browserInfoContainer.classList.add('browser__panel');
    browserInfoDisplay.classList.add('browser__display');
    browserInfoDisplay.id = 'browser_display';
    browserInfoContainer.appendChild(browserInfoDisplay);
    panel.appendChild(browserInfoContainer);
    
    browserInfoDisplay.innerHTML += '<div>App name: ' + navigator.appCodeName + '</div>';
    browserInfoDisplay.innerHTML += '<div>App version: ' + navigator.appVersion + '</div>';
    browserInfoDisplay.innerHTML += '<div>Platform: ' + navigator.platform + '</div>';
    browserInfoDisplay.innerHTML += '<div>User agent: ' + navigator.userAgent + '</div>';

};

export {renderBrowserInfo};
