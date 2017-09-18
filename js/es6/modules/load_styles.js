/* load _styles.js v. 0.1.2, 04.04.2017, @ filip-swinarski */

let loadStyles = () => {

    let styles = document.createElement('link');
    let googleFont = document.createElement('link');

    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = './css/main.css';
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = 'https://googleapis.com/css?family=Space+Mono:400,700&amp;subset=latin-ext';
    document.getElementsByTagName('head')[0].appendChild(googleFont);
    document.getElementsByTagName('head')[0].appendChild(styles);
};

export {loadStyles};
