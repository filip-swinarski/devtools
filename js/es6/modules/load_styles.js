/* load _styles.js v. 0.1.3, 18.09.2017, @ filip-swinarski */

import {rules} from './styles.js';
import {renderStyles} from './render_styles.js';

const loadStyles = () => {

    const googleFont = document.createElement('link');

    googleFont.rel = 'stylesheet';
    googleFont.type = 'text/css';
    googleFont.media = 'screen';
    googleFont.href = 'https://googleapis.com/css?family=Space+Mono:400,700&amp;subset=latin-ext';
    document.getElementsByTagName('head')[0].appendChild(googleFont);
	renderStyles(rules);
};

export {loadStyles};
