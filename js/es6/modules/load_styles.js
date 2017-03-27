/* load _styles.js v. 0.1.0 27.03.2017 @ filip-swinarski */

let loadStyles = () => {

	let styles = document.createElement('link');

	styles.rel = 'stylesheet';
	styles.type = 'text/css';
	styles.media = 'screen';
	styles.href = './css/main.css';
	document.getElementsByTagName('head')[0].appendChild(styles);
};

export {loadStyles};
