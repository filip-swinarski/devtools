/* render_styles.js, v. 0.1.0, 18.09.2017, @ filip-swinarski */

const renderStyles = (rules) => {

    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    rules.forEach((rule, i) => {styleSheet.sheet.insertRule(rule, i);});
};

export {renderStyles};
