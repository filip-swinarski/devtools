(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _load_styles = require('./modules/load_styles.js');

var _render_inspector = require('./modules/render_inspector.js');

var _render_console = require('./modules/render_console.js');

var _render_browser_info = require('./modules/render_browser_info.js');

var _console_listen = require('./modules/console_listen.js');

var _dt_console_api = require('./modules/dt_console_api.js');

var DTConsole = _interopRequireWildcard(_dt_console_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* main.js 0.1.2 19.09.2017 @ filip swinarski */

var body = document.body;
var container = document.createElement('div');

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
(0, _load_styles.loadStyles)();
(0, _render_inspector.renderInspector)(body, container);
(0, _render_console.renderConsole)(container);
(0, _render_browser_info.renderBrowserInfo)(container);

if (window.console) window.DTConsole = DTConsole;else window.console = DTConsole;

},{"./modules/console_listen.js":6,"./modules/dt_console_api.js":9,"./modules/load_styles.js":12,"./modules/render_browser_info.js":14,"./modules/render_console.js":15,"./modules/render_inspector.js":21}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* add_button_action.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

var addButtonAction = function addButtonAction(applyBtn, cancelBtn, nameLabel, valueLabel, header) {
	applyBtn.classList.remove('popup__apply--collapsed');
	cancelBtn.classList.remove('popup__cancel--collapsed');
	nameLabel.classList.remove('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--collapsed');
	applyBtn.classList.add('popup__apply--expanded');
	cancelBtn.classList.add('popup__cancel--expanded');
	nameLabel.classList.add('popup__add-label--expanded');
	valueLabel.classList.add('popup__add-label--expanded');
	header.classList.add('popup__header--expanded');
};

exports.addButtonAction = addButtonAction;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.applyButtonAction = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var applyButtonAction = function applyButtonAction(element, btn, valueLabel, nameLabel, arr, list, row, header) {

	var separator = document.createElement('span');
	var valueInput = valueLabel.querySelector('input');
	var nameInput = nameLabel.querySelector('input');
	var value = valueInput.value;
	var name = nameInput.value;
	var attrValueElem = void 0;
	var attrNameElem = void 0;

	list.innerHTML = '';
	separator.innerText = '=';

	if (btn.id === 'add_attr_btn') attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), function (el) {
		return el.innerText === name;
	})[0];

	if (btn.id === 'add_style_btn') attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), function (el) {
		return el.innerText === 'style';
	})[0];

	if (attrValueElem) {
		attrValueElem = attrNameElem.nextSibling.nextSibling;
	} else {
		attrValueElem = document.createElement('span');
		attrNameElem = document.createElement('span');
		row.insertBefore(attrNameElem, row.lastChild);
		row.insertBefore(separator, row.lastChild);
		row.insertBefore(attrValueElem, row.lastChild);
	}

	if (btn.id === 'add_attr_btn') {
		element.setAttribute(name, value);
		arr = [].filter.call(element.attributes, function (attr) {
			return attr.name !== 'style';
		});
		[].forEach.call(arr, function (attr) {
			(0, _render_attribute_input.renderAttrInput)(element, list, row, attr.name, attr.value);
		});
		attrNameElem.innerText = name;
		attrValueElem.innerText = '"' + value + '"';
	}

	if (btn.id === 'add_style_btn') {
		attrNameElem.innerText = 'style';
		element.style[name] = value;
		arr.push(name + ': ' + value + ';');
		attrValueElem.innerText = '"';
		[].forEach.call(arr, function (rule, i) {
			(0, _render_attribute_input.renderAttrInput)(element, list, row, rule.split(': ')[0], rule.split(': ')[1].replace(';', ''));

			if (i !== 0) attrValueElem.innerText += ' ';

			attrValueElem.innerText += rule.split(': ')[0] + ': ' + rule.split(': ')[1];

			if (i < arr.length - 1) attrValueElem.innerText += ';';
		});
		attrValueElem.innerText += '"';
	}

	attrNameElem.classList.add('inspector__attr-name');
	attrValueElem.classList.add('inspector__attr-value');
	nameLabel.classList.add('popup__add-label--collapsed');
	nameLabel.classList.remove('popup__add-label--expanded');
	header.classList.remove('popup__header--expanded');
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	btn.classList.add('popup__apply--collapsed');
	btn.classList.remove('popup__apply--expanded');
}; /* apply_button_action.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

exports.applyButtonAction = applyButtonAction;

},{"./render_attribute_input.js":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* cancel_button_action.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

var cancelButtonAction = function cancelButtonAction(applyBtn, cancelBtn, valueLabel, nameLabel, header) {

	var valueInput = valueLabel.querySelector('input');
	var nameInput = nameLabel.querySelector('input');

	nameLabel.classList.add('popup__add-label--collapsed');
	nameLabel.classList.remove('popup__add-label--expanded');
	header.classList.remove('popup__header--expanded');
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	applyBtn.classList.add('popup__apply--collapsed');
	applyBtn.classList.remove('popup__apply--expanded');
	cancelBtn.classList.add('popup__cancel--collapsed');
	cancelBtn.classList.remove('popup__cancel--expanded');
};

exports.cancelButtonAction = cancelButtonAction;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleClear = undefined;

var _render_console = require('./render_console.js');

var consoleClear = function consoleClear() {
    _render_console.consoleDisplay.innerHTML = '';
}; /* console_clear.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

exports.consoleClear = consoleClear;

},{"./render_console.js":15}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleListen = undefined;

var _render_console = require('./render_console.js');

var _render_console_message = require('./render_console_message.js');

var _global_eval = require('./global_eval.js');

/* console_listen.js, v. 0.1.5, 19.09.2017, @ filip-swinarski */

var consoleListen = function consoleListen() {

    window.addEventListener('error', function (error) {

        var row = document.createElement('div');
        var errorMessage = document.createElement('div');
        var errorMessageMsg = document.createElement('span');
        var errorSource = document.createElement('span');
        var errorLineNo = document.createElement('span');
        var errorColumnNo = document.createElement('span');
        var errorPrompt = document.createElement('span');

        row.classList.add('console__row');
        errorPrompt.classList.add('console__err-prompt');
        errorMessage.classList.add('console__msg-r');
        errorMessage.classList.add('console__msg-r--err');
        errorMessageMsg.classList.add('console__err-msg');
        errorSource.classList.add('console__err-src');
        errorLineNo.classList.add('console__err-lineno');
        errorColumnNo.classList.add('console__err-columnno');

        errorMessageMsg.innerHTML += error.message;
        errorSource.innerHTML += error.filename;
        errorLineNo.innerHTML += error.lineno;
        errorColumnNo.innerHTML += error.columnno;

        errorMessage.appendChild(errorPrompt);
        errorMessage.appendChild(errorMessageMsg);
        errorMessage.appendChild(errorSource);
        errorMessage.appendChild(errorLineNo);
        errorMessage.appendChild(errorColumnNo);
        row.appendChild(errorMessage);
        _render_console.consoleDisplay.appendChild(row);
    }, false);

    _render_console.consoleDisplay.addEventListener('log', function (e) {

        var row = (0, _render_console_message.renderConsoleMessage)(e.detail);

        row.classList.add('console__row');
        _render_console.consoleDisplay.appendChild(row);
    }, false);

    _render_console.consoleInput.addEventListener('keypress', function (e) {

        if (e.keyCode === 13) {

            var value = (0, _global_eval.globalEval)(_render_console.consoleInput.value);

            DTConsole.log(value, _render_console.consoleInput.value);
            _render_console.consoleInput.value = '';
        }
    });
};

exports.consoleListen = consoleListen;

},{"./global_eval.js":10,"./render_console.js":15,"./render_console_message.js":17}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleLog = undefined;

var _render_console = require('./render_console.js');

var consoleLog = function consoleLog(str, value) {

    var log = new CustomEvent('log', { detail: [str, value] });

    _render_console.consoleDisplay.dispatchEvent(log);
}; /* console_log.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

exports.consoleLog = consoleLog;

},{"./render_console.js":15}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.domElementListen = undefined;

var _render_popup = require('./render_popup.js');

var domElementListen = function domElementListen(elem, row, arrow) {

	var startDate = void 0;
	var tObj = void 0;
	var startX = void 0;
	var startY = void 0;
	var endX = void 0;
	var endY = void 0;
	var distX = void 0;
	var distY = void 0;
	var maxX = 0;
	var maxY = 0;

	row.addEventListener('touchstart', function (e) {
		startDate = new Date();
		tObj = e.touches[0];
		startX = tObj.pageX;
		startY = tObj.pageY;
	}, false);
	row.addEventListener('touchmove', function (e) {
		tObj = e.changedTouches[0];
		endX = tObj.pageX;
		endY = tObj.pageY;
		distX = endX - startX;
		distY = endY - startY;

		if (Math.abs(distX) > maxX) maxX = Math.abs(distX);

		if (Math.abs(distY) > maxY) maxY = Math.abs(distY);
	}, false);
	row.addEventListener('touchend', function (e) {

		var endDate = new Date();
		var dateAmp = endDate - startDate;

		tObj = e.changedTouches[0];
		endX = tObj.pageX;
		endY = tObj.pageY;
		distX = endX - startX;
		distY = endY - startY;

		if (maxY <= 30 && maxX <= 30) {

			if (dateAmp <= 200) {
				row.classList.toggle('inspector__row--expanded');
				row.classList.toggle('inspector__row--collapsed');

				if (arrow.classList.contains('inspector__tag-open--expanded') || arrow.classList.contains('inspector__tag-open--collapsed')) {
					arrow.classList.toggle('inspector__tag-open--expanded');
					arrow.classList.toggle('inspector__tag-open--collapsed');
				}
			} else {
				(0, _render_popup.renderPopup)(elem, row);
			}
		}

		maxX = 0;
		maxY = 0;
	}, false);
}; /* dom_element_listen.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

exports.domElementListen = domElementListen;

},{"./render_popup.js":22}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.log = undefined;

var _console_log = require('./console_log.js');

var _console_clear = require('./console_clear.js');

/* dt_console_api.js, v. 0.1.3, 19.09.2017, @ filip-swinarski */

var log = function log(value) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    (0, _console_log.consoleLog)(str, value);
};

var clear = _console_clear.consoleClear;

exports.log = log;
exports.clear = clear;

},{"./console_clear.js":5,"./console_log.js":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* global_eval.js, v. 0.1.0, 31.03.2017, @ filip-swinarski */

// eval - runs block scope declarations via script injection
// otherwise standard eval used 
// - think if not use injection exclusively
// returns value
var globalEval = function globalEval(str) {

    'use strict'; // prevent creating local variables with standard eval

    if (str.startsWith('let ') || str.startsWith('const ')) {
        // code for script insertion

        var script = void 0;

        if (document.getElementById('dt_script')) {
            document.getElementById('dt_script').remove();
        }

        script = document.createElement('script');
        script.id = 'dt_script';
        script.innerText = str;
        document.head.appendChild(script);
        return undefined; // returns undefined when declaring block scoped variable
    } else {
        //standard eval
        return (1, eval)(str); // indirect call to access global scope
    }
};

exports.globalEval = globalEval;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* highlight_box_action.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

var highlightBoxAction = function highlightBoxAction(element, row) {

	var regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	var regexp2 = new RegExp(/background-color: \#adf \!important/);

	if (element.style.cssText.match(regexp1)) {
		element.style.cssText = element.style.cssText.replace(regexp1, '');
		row.removeAttribute('data-highlight');
	} else if (element.style.cssText.match(regexp2)) {
		element.style.cssText = element.style.cssText.replace(regexp2, '');
		row.removeAttribute('data-highlight');
	} else {
		element.style.cssText += 'background-color: #adf !important';
		row.setAttribute('data-highlight', true);
	}
};

exports.highlightBoxAction = highlightBoxAction;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadStyles = undefined;

var _styles = require('./styles.js');

var _render_styles = require('./render_styles.js');

/* load _styles.js v. 0.1.3, 18.09.2017, @ filip-swinarski */

var loadStyles = function loadStyles() {

    var googleFont = document.createElement('link');

    googleFont.rel = 'stylesheet';
    googleFont.type = 'text/css';
    googleFont.media = 'screen';
    googleFont.href = 'https://googleapis.com/css?family=Space+Mono:400,700&amp;subset=latin-ext';
    document.getElementsByTagName('head')[0].appendChild(googleFont);
    (0, _render_styles.renderStyles)(_styles.rules);
};

exports.loadStyles = loadStyles;

},{"./render_styles.js":24,"./styles.js":25}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_attribute_input.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

var renderAttrInput = function renderAttrInput(el, display, row, name, value) {

	var input = document.createElement('input');
	var label = document.createElement('label');
	var separator = document.createElement('span');
	var applyBtn = document.createElement('button');
	var listElement = document.createElement('li');

	input.type = 'text';
	input.value = value;

	if (display.id == 'style_list') input.value += ';';

	label.innerText = name;
	applyBtn.innerText = 'Apply';
	separator.innerText = ':';
	listElement.classList.add('popup__list-element');
	label.classList.add('popup__list-label');
	input.classList.add('popup__list-input');
	applyBtn.classList.add('popup__list-btn');
	applyBtn.classList.add('popup__list-btn--collapsed');
	separator.classList.add('popup__list-separator');

	label.appendChild(separator);
	label.appendChild(input);
	label.appendChild(applyBtn);
	listElement.appendChild(label);
	display.appendChild(listElement);

	input.addEventListener('keypress', function (e) {

		if (e.keyCode === 13) {

			var rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
			var rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

			if (display.id == 'attr_list') el.attributes[name].value = input.value;

			if (display.id == 'style_list') el.style[name] = input.value.replace(';', '');

			[].forEach.call(rowAttrNameElems, function (attrNameEl, i) {

				if (attrNameEl.innerText === name && display.id == 'attr_list') {
					rowAttrValueElems[i].innerText = '"' + input.value + '"';
					attrNameEl.innerText = name;
				}

				if (attrNameEl.innerText === 'style' && display.id == 'style_list') {

					var labels = display.querySelectorAll('label');
					var _value = '';

					[].forEach.call(labels, function (label, i) {
						_value += label.firstChild.data;
						_value += ': ';
						_value += label.querySelector('input').value;

						if (i < labels.length - 1) _value += ' ';
					});
					rowAttrValueElems[i].innerText = '"' + _value + '"';
				}
			});

			applyBtn.classList.remove('popup__list-btn--expanded');
			applyBtn.classList.add('popup__list-btn--collapsed');
		}
	}, false);

	input.addEventListener('focus', function (e) {
		applyBtn.classList.add('popup__list-btn--expanded');
		applyBtn.classList.remove('popup__list-btn--collapsed');
	});

	input.addEventListener('blur', function (e) {
		applyBtn.classList.remove('popup__list-btn--expanded');
		applyBtn.classList.add('popup__list-btn--collapsed');
	});

	applyBtn.addEventListener('touchstart', function (e) {

		var rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
		var rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

		if (display.id == 'attr_list') el.attributes[name].value = input.value;

		if (display.id == 'style_list') el.style[name] = input.value.replace(';', '');

		[].forEach.call(rowAttrNameElems, function (attrNameEl, i) {

			if (attrNameEl.innerText === name && display.id == 'attr_list') {
				rowAttrValueElems[i].innerText = '"' + input.value + '"';
				attrNameEl.innerText = name;
			}

			if (attrNameEl.innerText === 'style' && display.id == 'style_list') {

				var labels = display.querySelectorAll('label');
				var _value2 = '';

				[].forEach.call(labels, function (label, i) {
					_value2 += label.firstChild.data;
					_value2 += ': ';
					_value2 += label.querySelector('input').value;

					if (i < labels.length - 1) _value2 += ' ';
				});
				rowAttrValueElems[i].innerText = '"' + _value2 + '"';
			}
		});

		applyBtn.classList.remove('popup__list-btn--expanded');
		applyBtn.classList.add('popup__list-btn--collapsed');
	}, false);
};

exports.renderAttrInput = renderAttrInput;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderBrowserInfo = undefined;

var _render_header = require('./render_header.js');

var renderBrowserInfo = function renderBrowserInfo(panel) {

    var browserInfoDisplay = document.createElement('div');
    var browserInfoContainer = document.createElement('div');

    browserInfoContainer.id = 'browser';
    browserInfoContainer.classList.add('browser');
    browserInfoContainer.classList.add('browser__panel');
    browserInfoDisplay.classList.add('browser__display');
    browserInfoDisplay.id = 'browser_display';
    (0, _render_header.renderHeader)(browserInfoContainer, false);
    browserInfoContainer.appendChild(browserInfoDisplay);
    panel.appendChild(browserInfoContainer);

    browserInfoDisplay.innerHTML += '<div>App name: ' + navigator.appCodeName + '</div>';
    browserInfoDisplay.innerHTML += '<div>App version: ' + navigator.appVersion + '</div>';
    browserInfoDisplay.innerHTML += '<div>Platform: ' + navigator.platform + '</div>';
    browserInfoDisplay.innerHTML += '<div>User agent: ' + navigator.userAgent + '</div>';

    browserInfoDisplay.classList.add('browser__display--collapsed');
}; /* render_browser_info.js, v. 0.1.1, 19.04.2017, @ filip-swinarski */

exports.renderBrowserInfo = renderBrowserInfo;

},{"./render_header.js":20}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleInput = exports.consoleDisplay = exports.renderConsole = undefined;

var _console_listen = require('./console_listen');

var _render_header = require('./render_header.js');

var _render_console_controls = require('./render_console_controls.js');

var consoleDisplay = document.createElement('div'); /* render_console.js, v. 0.1.5, 19.09.2017, @ filip-swinarski */

var consoleInput = document.createElement('input');
var consoleContainer = document.createElement('div');
var consoleInputPrompt = document.createElement('span');

consoleContainer.classList.add('console');
consoleContainer.classList.add('tools__panel');
consoleDisplay.classList.add('console__display');
consoleDisplay.classList.add('console__display--collapsed');
consoleDisplay.id = 'console_display';
consoleInput.classList.add('console__input');
consoleInput.classList.add('console__input--collapsed');
consoleInput.id = 'console_input';
consoleInput.type = 'text';
consoleInputPrompt.classList.add('console__prompt');
consoleContainer.id = 'console';
consoleInputPrompt.classList.add('console__prompt--collapsed');

var renderConsole = function renderConsole(panel) {

    (0, _render_header.renderHeader)(consoleContainer, false);
    (0, _render_console_controls.renderConsoleControls)(consoleContainer, consoleInput);
    consoleContainer.appendChild(consoleInputPrompt);
    consoleContainer.appendChild(consoleDisplay);
    consoleContainer.appendChild(consoleInput);
    panel.appendChild(consoleContainer);
    (0, _console_listen.consoleListen)();
};

exports.renderConsole = renderConsole;
exports.consoleDisplay = consoleDisplay;
exports.consoleInput = consoleInput;

},{"./console_listen":6,"./render_console_controls.js":16,"./render_header.js":20}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderConsoleControls = undefined;

var _console_clear = require('./console_clear.js');

var _global_eval = require('./global_eval.js');

/* render_console_controls.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

var consoleClearBtn = document.createElement('button');
var consoleLogBtn = document.createElement('button');
var consoleControlsPanel = document.createElement('div');

var renderConsoleControls = function renderConsoleControls(container, input) {

	container.appendChild(consoleControlsPanel);
	consoleControlsPanel.appendChild(consoleClearBtn);
	consoleControlsPanel.appendChild(consoleLogBtn);
	consoleControlsPanel.classList.add('console__controls');
	consoleClearBtn.classList.add('console__controls--btn');
	consoleClearBtn.classList.add('console__controls--clear-btn');
	consoleLogBtn.classList.add('console__controls--btn');
	consoleLogBtn.classList.add('console__controls--log-btn');
	consoleClearBtn.innerText = "Clear";
	consoleLogBtn.innerText = "Log";
	consoleClearBtn.addEventListener('click', function () {
		return (0, _console_clear.consoleClear)();
	}, false);
	consoleLogBtn.addEventListener('click', function () {

		var value = (0, _global_eval.globalEval)(input.value);

		DTConsole.log(value, input.value);
		input.value = '';
	}, false);
};

exports.renderConsoleControls = renderConsoleControls;

},{"./console_clear.js":5,"./global_eval.js":10}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderConsoleMessage = undefined;

var _render_console_output = require('./render_console_output.js');

var renderConsoleMessage = function renderConsoleMessage(msgArray) {

    var container = document.createElement('div');

    if (msgArray[0]) {

        var inputMessage = document.createElement('div');

        inputMessage.classList.add('console__msg-i');
        inputMessage.innerHTML = '<span class="console__msg-iprompt"></span>' + msgArray[0] + ' ';
        container.appendChild(inputMessage);
    }

    var returnMessage = document.createElement('div');

    returnMessage.classList.add('console__msg-r');
    returnMessage.innerHTML += '<span class="console__msg-rprompt"></span>';
    (0, _render_console_output.renderConsoleOutput)(msgArray[1], returnMessage);
    container.appendChild(returnMessage);
    return container;
}; /* render_console_message.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

exports.renderConsoleMessage = renderConsoleMessage;

},{"./render_console_output.js":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// render_console_output.js, v. 0.1.3, 1111111117 @ filip-swinarski

var renderConsoleOutput = function renderConsoleOutput(val) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
    var index = arguments[2];


    var output = document.createElement('span');
    var checkStr = Object.prototype.toString.call(val).split(' ')[1];
    var html = '';

    checkStr = checkStr.substring(0, checkStr.length - 1).toLowerCase();
    output.classList.add('console__' + checkStr);

    if (checkStr === 'string' || checkStr === 'number' || checkStr === 'undefined' || checkStr === 'null' || checkStr === 'symbol' || checkStr === 'boolean') {
        html += checkStr === 'string' ? '"' + val + '"' : val;
        output.innerHTML += html;
    } else if (checkStr === 'function') {
        html += '<span class="console__f-key">function </span><span class="console__f-name">' + val.name + '()</span>';
        output.innerHTML += html;
    } else if (checkStr === 'array' || checkStr === 'object') {

        for (var item in val) {

            var keyClass = checkStr === 'array' ? 'index' : 'key';
            var checkStr2 = Object.prototype.toString.call(val[item]).split(' ')[1];

            checkStr2 = checkStr2.substring(0, checkStr2.length - 1).toLowerCase();

            if (checkStr2 === 'string' || checkStr2 === 'number' || checkStr2 === 'undefined' || checkStr2 === 'null' || checkStr2 === 'symbol' || checkStr2 === 'boolean') {

                var keyElement = document.createElement('span');
                var valueElement = document.createElement('span');

                keyElement.classList.add('console__' + keyClass);
                keyElement.innerHTML = item;
                valueElement.classList.add('console__value');
                valueElement.classList.add('console__' + checkStr2);
                valueElement.innerHTML = checkStr2 === 'string' ? '"' + val[item] + '"' : val[item];
                output.appendChild(keyElement);
                output.appendChild(valueElement);
            } else if (checkStr2 === 'function') {
                html += '<span class="console__f-key">function </span><span class="console__f-name">' + val.name + '()</span>';
                output.innerHTML += html;
            } else {

                var _keyElement = document.createElement('span');

                _keyElement.classList.add('console__' + keyClass);
                _keyElement.innerHTML = item;
                output.classList.add('console__value');
                output.appendChild(_keyElement);
                renderConsoleOutput(val[item], output, item);
            }
        }
    } else {
        output.innerHTML = val;
    }

    element.appendChild(output);
};

exports.renderConsoleOutput = renderConsoleOutput;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderDOM = undefined;

var _dom_element_listen = require('./dom_element_listen.js');

var renderDOM = function renderDOM(elem, parentEl, level) {

    if (elem.id === 'dev_tools') return;

    var wrapper = document.createElement('div');
    var row1 = document.createElement('div');
    var row2 = elem.children.length ? document.createElement('div') : document.createElement('span');
    var row1ElementTypeSpan = document.createElement('span');
    var row1OpenArrow = document.createElement('span');
    var row1CloseArrow = document.createElement('span');
    var row2ElementTypeSpan = document.createElement('span');
    var row2OpenArrow = document.createElement('span');
    var row2CloseArrow = document.createElement('span');

    row1.classList.add('inspector__row');
    row1.classList.add('inspector__row--opening');
    row2.classList.add('inspector__row');
    row2.classList.add('inspector__row--closing');

    row1ElementTypeSpan.classList.add('inspector__tag-name');
    row2ElementTypeSpan.classList.add('inspector__tag-name');
    row1OpenArrow.classList.add('inspector__tag-open');
    row1CloseArrow.classList.add('inspector__tag-close');
    row2OpenArrow.classList.add('inspector__tag-open');
    row2CloseArrow.classList.add('inspector__tag-close');
    row1OpenArrow.innerText = '<';
    row1CloseArrow.innerText = '>';
    row1ElementTypeSpan.innerText = elem.localName;
    row1.appendChild(row1OpenArrow);
    row1.appendChild(row1ElementTypeSpan);

    if (elem.attributes.length) {
        [].slice.call(elem.attributes).forEach(function (attr) {

            var attrNameSpan = document.createElement('span');
            var attrEqualSpan = document.createElement('span');
            var attrValueSpan = document.createElement('span');

            attrNameSpan.classList.add('inspector__attr-name');
            attrValueSpan.classList.add('inspector__attr-value');
            attrNameSpan.innerText = attr.localName;
            attrEqualSpan.innerText = '=';
            attrValueSpan.innerText = '"' + attr.value + '"';
            row1.appendChild(attrNameSpan);
            row1.appendChild(attrEqualSpan);
            row1.appendChild(attrValueSpan);
        });
    }

    row1.appendChild(row1CloseArrow);
    wrapper.appendChild(row1);
    wrapper.classList.add('inspector__exp');

    if (elem.text && elem.text.length) {

        var textEl = document.createElement('div');

        textEl.classList.add('inspector__exp');
        textEl.innerText = elem.text.trim();
        wrapper.appendChild(textEl);

        if (level < 2) {
            row1.classList.add('inspector__row--expanded');
            row1OpenArrow.classList.add('inspector__tag-open--expanded');
        } else {
            row1.classList.add('inspector__row--collapsed');
            row1OpenArrow.classList.add('inspector__tag-open--collapsed');
        }
    }

    if (elem.children.length) {
        level += 1;
        [].slice.call(elem.children).forEach(function (el) {
            renderDOM(el, wrapper, level);

            if (level < 2) {
                row1.classList.add('inspector__row--expanded');
                row1OpenArrow.classList.add('inspector__tag-open--expanded');
            } else {
                row1.classList.add('inspector__row--collapsed');
                row1OpenArrow.classList.add('inspector__tag-open--collapsed');
            }
        });
    }

    row2OpenArrow.innerText = '</';
    row2CloseArrow.innerText = '>';
    row2ElementTypeSpan.innerText = elem.localName;
    row2.appendChild(row2OpenArrow);
    row2.appendChild(row2ElementTypeSpan);
    row2.appendChild(row2CloseArrow);

    if (elem.children.length || elem.text && elem.text.length) wrapper.appendChild(row2);else row1.appendChild(row2);

    (0, _dom_element_listen.domElementListen)(elem, row1, row1OpenArrow);
    parentEl.appendChild(wrapper);
}; /* render_dom.js, v. 0.1.9, 19.09.2017, @ filip-swinarski */

exports.renderDOM = renderDOM;

},{"./dom_element_listen.js":8}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* render_header.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

var renderHeader = function renderHeader(container, expanded) {

  var header = document.createElement('div');
  var toggleBtn = document.createElement('span');
  var title = container.id;

  header.id = container.id + '_header';
  header.classList.add(container.classList[0] + '__header');
  toggleBtn.classList.add(container.classList[0] + '__toggle');
  header.innerHTML = '<span class="' + title + '__title">' + title + '</span>';

  if (expanded) {
    toggleBtn.classList.add(container.classList[0] + '__toggle--expanded');
  } else {
    toggleBtn.classList.add(container.classList[0] + '__toggle--collapsed');
  }

  header.appendChild(toggleBtn);
  container.appendChild(header);

  header.addEventListener('click', function (e) {

    var children = [].filter.call(container.children, function (el) {
      return el.id !== parent.id + '__header';
    });

    toggleBtn.classList.toggle(container.classList[0] + '__toggle--expanded');
    toggleBtn.classList.toggle(container.classList[0] + '__toggle--collapsed');
    children.forEach(function (el) {
      el.classList.toggle(el.classList[0] + '--expanded');
      el.classList.toggle(el.classList[0] + '--collapsed');
    });
  }, false);
};

exports.renderHeader = renderHeader;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderInspector = undefined;

var _render_dom = require('./render_dom.js');

var _render_header = require('./render_header.js');

/* render_inspector.js, v. 0.1.6, 19.09.2017, @ filip-swinarski */

var renderInspector = function renderInspector(body, panel) {

    var inspectorDisplay = document.createElement('div');
    var inspectorContainer = document.createElement('div');
    var htmlElem = document.querySelector('html');
    var level = 0;

    inspectorContainer.id = 'inspector';
    inspectorContainer.classList.add('inspector');
    inspectorContainer.classList.add('tools__panel');
    inspectorDisplay.classList.add('inspector__display');
    inspectorDisplay.id = 'inspector_display';
    (0, _render_header.renderHeader)(inspectorContainer, true);
    inspectorDisplay.classList.add('inspector__display--expanded');
    inspectorContainer.appendChild(inspectorDisplay);
    panel.appendChild(inspectorContainer);
    (0, _render_dom.renderDOM)(htmlElem, inspectorDisplay, level);
};

exports.renderInspector = renderInspector;

},{"./render_dom.js":19,"./render_header.js":20}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.renderPopup = undefined;

var _render_popup_section = require('./render_popup_section.js');

var renderPopup = function renderPopup(element, row) {

   var container = document.querySelector('#dev_tools');
   var popup = document.createElement('div');
   var closeBtn = document.createElement('div');
   var attributeListWrapper = document.createElement('div');
   var styleListWrapper = document.createElement('div');
   var popupWrapper = document.createElement('div');
   var highlightWrapper = document.createElement('div');

   popup.classList.add('popup');
   popupWrapper.classList.add('popup__wrapper');
   closeBtn.classList.add('popup__close');
   closeBtn.innerHTML = 'x';

   closeBtn.addEventListener('click', function () {
      popup.remove();
   }, false);

   (0, _render_popup_section.renderPopupSection)('attr_list', 'Attributes', element, row, attributeListWrapper);
   (0, _render_popup_section.renderPopupSection)('style_list', 'Inline styles', element, row, styleListWrapper);
   (0, _render_popup_section.renderPopupSection)('highlight_section', 'Highlight element', element, row, highlightWrapper);

   popup.appendChild(closeBtn);
   popupWrapper.appendChild(attributeListWrapper);
   popupWrapper.appendChild(styleListWrapper);
   popupWrapper.appendChild(highlightWrapper);
   popup.appendChild(popupWrapper);
   container.appendChild(popup);
}; /* render_popup.js, v. 0.1.4, 18.09.2017, @ filip-swinarski */

exports.renderPopup = renderPopup;

},{"./render_popup_section.js":23}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderPopupSection = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var _add_button_action = require('./add_button_action.js');

var _apply_button_action = require('./apply_button_action.js');

var _cancel_button_action = require('./cancel_button_action.js');

var _highlight_box_action = require('./highlight_box_action.js');

var renderPopupSection = function renderPopupSection(id, title, element, row, listWrapper) {

	var list = document.createElement('ul');
	var header = document.createElement('div');
	var regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	var regexp2 = new RegExp(/background-color: \#adf \!important/);
	var sectionName = '';

	header.innerHTML = '<span class="popup__headline">' + title + '</span>';

	if (id === 'attr_list' || id === 'style_list') {

		var addBtn = document.createElement('button');
		var addApplyBtn = document.createElement('button');
		var addCancelBtn = document.createElement('button');
		var nameInput = document.createElement('input');
		var valueInput = document.createElement('input');
		var nameInputLabel = document.createElement('label');
		var valueInputLabel = document.createElement('label');
		var arr = void 0;

		if (id === 'attr_list') {
			arr = [].filter.call(element.attributes, function (attr) {
				return attr.name !== 'style';
			});
			sectionName = 'attributes';
		} else {
			arr = [];
			sectionName = 'styles';
		}

		list.id = id;
		addBtn.innerText = '+';
		addBtn.classList.add('popup__add');
		addApplyBtn.innerText = 'Apply';
		addCancelBtn.innerText = 'Cancel';
		addApplyBtn.id = 'add_' + id.replace('_list', '') + '_btn';
		addApplyBtn.classList.add('popup__apply');
		addCancelBtn.classList.add('popup__cancel');
		nameInputLabel.innerText = id === 'style_list' ? 'property name ' : 'attribute name ';
		valueInputLabel.innerText = id === 'style_list' ? 'property value ' : 'attribute value ';
		nameInput.type = 'text';
		nameInput.classList.add('popup__add-input');
		valueInput.type = 'text';
		valueInput.classList.add('popup__add-input');
		addApplyBtn.classList.add('popup__apply--collapsed');
		addCancelBtn.classList.add('popup__cancel--collapsed');
		nameInputLabel.classList.add('popup__add-label--collapsed');
		valueInputLabel.classList.add('popup__add-label--collapsed');
		header.appendChild(addBtn);
		header.appendChild(addCancelBtn);
		header.appendChild(addApplyBtn);
		nameInputLabel.appendChild(nameInput);
		valueInputLabel.appendChild(valueInput);
		header.appendChild(nameInputLabel);
		header.appendChild(valueInputLabel);
		listWrapper.appendChild(list);

		if (id === 'style_list' && element.attributes && element.attributes.style) {
			arr = ''.split.call(element.attributes.style.value, '; ');
			arr = arr.map(function (rule) {
				return rule.replace(';', '');
			});

			if (row.hasAttribute('data-highlight')) arr = arr.filter(function (rule) {
				return !rule.match(regexp1) && !rule.match(regexp2);
			});
		}

		for (var item in arr) {

			var name = void 0;
			var value = void 0;

			if (id === 'style_list') {
				name = arr[item].split(': ')[0];
				value = arr[item].split(': ')[1];
			} else {
				name = arr[item].name;
				value = arr[item].value;
			}

			(0, _render_attribute_input.renderAttrInput)(element, list, row, name, value);
		}

		addBtn.addEventListener('click', function (e) {
			(0, _add_button_action.addButtonAction)(addApplyBtn, addCancelBtn, nameInputLabel, valueInputLabel, header);
		}, false);
		addApplyBtn.addEventListener('click', function () {
			(0, _apply_button_action.applyButtonAction)(element, addApplyBtn, valueInputLabel, nameInputLabel, arr, list, row, header);
		}, false);
		addCancelBtn.addEventListener('click', function () {
			(0, _cancel_button_action.cancelButtonAction)(addApplyBtn, addCancelBtn, valueInputLabel, nameInputLabel, header);
		}, false);
	} else if (id === 'highlight_section') {

		var highlightCheckbox = document.createElement('input');

		sectionName = 'highlight';
		highlightCheckbox.type = 'checkbox';
		highlightCheckbox.classList.add('popup__highlight');
		header.appendChild(highlightCheckbox);

		if (element.style.cssText.match(regexp1) || element.style.cssText.match(regexp2)) highlightCheckbox.checked = true;

		highlightCheckbox.addEventListener('change', function () {
			(0, _highlight_box_action.highlightBoxAction)(element, row);
		}, false);
	}

	header.classList.add('popup__header');
	listWrapper.appendChild(header);
	listWrapper.classList.add('popup__section');
	listWrapper.classList.add('popup__section--' + sectionName);
}; /* render_popup_section.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

exports.renderPopupSection = renderPopupSection;

},{"./add_button_action.js":2,"./apply_button_action.js":3,"./cancel_button_action.js":4,"./highlight_box_action.js":11,"./render_attribute_input.js":13}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_styles.js, v. 0.1.0, 18.09.2017, @ filip-swinarski */

var renderStyles = function renderStyles(rules) {

    var styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    rules.forEach(function (rule, i) {
        styleSheet.sheet.insertRule(rule, i);
    });
};

exports.renderStyles = renderStyles;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* styles.js, v. 0.1.3, 19.09.2017, @ filip-swinarski */

var rules = [];

/* base v. 0.1.6 01.04.2017 @ filip-swinarski */

rules.push(".body {\n\twidth: 100%;\n\theight: 100%;\n}");

rules.push(".tools {\n\tfont-size: 14px;\n\tfont-family: 'Space Mono', monospace;\n\tbackground-color: #fff;\n}");

rules.push(".tools__panel {\n\tposition: relative;\n}");

/* inspector v. 0.1.6 21.04.2017 @ filip-swinarski */

rules.push(".inspector__header {\n\tborder: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".inspector__display {\n\tposition: relative;\n\toverflow: auto;\n}");

rules.push(".inspector__display > .inspector__exp {\n\tdisplay: block;\n}");

rules.push(".inspector__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\tborder-bottom: 1px solid #bcbcbc;\n\theight: 400px;\n\ttransition: height .5s;\n}");

rules.push(".inspector__display--collapsed {\n\theight: 0;\n\ttransition: height .5s;\n\tpadding: 0;\n\tmargin: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

rules.push(".inspector__row {\n\twhite-space: nowrap; color: #444;\n}");

rules.push(".inspector__row:hover::before {\n\tcontent: '';\n\twidth: 100%;\n\theight: 20px;\n\tbackground-color: #efefef;\n\tposition: absolute;\n\tleft: 0;\n\tz-index: -1;\n}");

rules.push(".inspector__row--opening {\n\tcursor: pointer;\n}");

rules.push(".inspector__row--expanded ~ .inspector__exp {\n\tdisplay: block;\n}");

rules.push(".inspector__exp {\n\tdisplay: none;\n\tmargin-left: 20px;\n}");

rules.push(".inspector__tag-open {\n\tposition: relative;\n}");

rules.push(".inspector__tag-open::after {\n\tcontent: '';\n\tdisplay: none;\n\tborder-left: 6px solid #bbb;\n\tborder-top: 4px solid transparent;\n\tborder-bottom: 4px solid transparent;\n\tposition: absolute;\n\ttop: 5px;\n\tleft: -8px;\n}");

rules.push(".inspector__tag-open--collapsed::after {\n\tdisplay: block;\n\ttransform: rotate(0);\n\ttransition: transform .5s;\n}");

rules.push(".inspector__tag-open--expanded::after {\n\tdisplay: block;\n\ttransform: rotate(90deg);\n\ttransition: transform .5s;\n}");

rules.push(".inspector__tag-close:last-child {\n\tpadding-right: 10px;\n}");

rules.push(".inspector__tag-name {\n\tcolor: #800080;\n}");

rules.push(".inspector__attr-name {\n\tcolor: #000;\n\tpadding-left: 5px;\n}");

rules.push(".inspector__attr-value {\n\tcolor: #00f;\n}");

/* console v. 0.1.6 21.04.2017 @ filip-swinarski */

rules.push(".console__header {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".console__controls--btn {\n    position: absolute;\n    top: 5px;\n    right: 10px;\n    background-color: #fff;\n    border: 1px solid #bcbcbc;\n    border-radius: 3px;\n    padding: 4px 8px;\n    font-size: 14px;\n    font-family: \"Space Mono\", monospace;\n\tcursor: pointer;\n}");

rules.push(".console__controls--clear-btn {\n    right: 6px;\n}");

rules.push(".console__controls--log-btn {\n    right: 63px;\n}");

rules.push(".console__controls {\n    display: none;\n}");

rules.push(".console__controls--expanded {\n    display: block;\n}");

rules.push(".console__display {\n\toverflow: auto;\n}");

rules.push(".console__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\tborder-top: 1px solid #bcbcbc;\n\theight: 400px;\n\ttransition: height .5s;\n}");

rules.push(".console__display--collapsed {\n\theight: 0;\n\ttransition: height .5s;\n\tpadding: 0;\n\tmargin: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

rules.push(".console__input {\n\twidth: calc(100% - 2px);\n\theight: 30px;\n\tmargin: 0;\n\tpadding: 0;\n\ttext-indent: 30px;\n\tborder-bottom: 0 none transparent;\n\tborder-top: 1px solid #bcbcbc;\n}");

rules.push(".console__input--expanded {\n\tdisplay: block;\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\theight: 30px;\n}");

rules.push(".console__input--collapsed {\n\tdisplay: none;\n\tpadding: 0;\n\tmargin: 0;\n\tborder--left: 0 none transparent;\n\tborder--right: 0 none transparent;\n}");

rules.push(".console__prompt {\n\tposition: absolute;\n\tleft: 0;\n\tbottom: 0;\n\twidth: 30px;\n\theight: 30px;\n}");

rules.push(".console__prompt::before {\n\tcontent: '>>';\n\tdisplay: block;\n\tposition: absolute;\n\ttop: 3px;\n\tleft: 5px;\n\theight: 10px;\n\tcolor: #acacac;\n}");

rules.push(".console__prompt--expanded {\n\tdisplay: block;\n}");

rules.push(".console__prompt--collapsed {\n\tdisplay: none;\n}");

rules.push(".console__msg-i {\n\tcolor: #acacac;\n\tpadding: 5px 5px 5px 25px;\n}");

rules.push(".console__msg-r {\n\tcolor: #000;\n\tpadding: 5px 5px 5px 25px;\n}");

rules.push(".console__msg-r--err {\n\tcolor: #a93226;\n\tbackground-color: #fadbd8;\n}");

rules.push(".console__msg-rprompt {\n\twidth: 25px;\n\tposition: relative;\n\tcolor: #acacac;\n}");

rules.push(".console__msg-rprompt::before {\n\tcontent: '<=';\n\tdisplay: block;\n\tposition: absolute;\n\tleft: -20px;\n\ttop: 3px;\n\tfont-size: 12px;\n}");

rules.push(".console__msg-iprompt {\n\twidth: 25px; position: relative;\n}");

rules.push(".console__msg-iprompt::before {\n\tcontent: '>>';\n\tdisplay: block;\n\tposition: absolute;\n\tleft: -20px;\n\tfont-size: 12px;\n}");

rules.push(".console__err-prompt {\n\twidth: 25px;\n\tposition: relative;\n}");

rules.push(".console__err-prompt::before {\n\tcontent: 'x';\n\tdisplay: block;\n\tposition: absolute;\n\tleft: -17px;\n\ttop: 0;\n\tfont-size: 12px;\n}");

rules.push(".console__undefined {\n\tcolor: #adadad;\n}");

rules.push(".console__number {\n\tcolor: #0000cc;\n}");

rules.push(".console__string {\n\tcolor: #cc6600;\n}");

rules.push(".console__boolean {\n\tcolor: #800000;\n}");

rules.push(".console__null {\n\tcolor: #800000;\n}");

rules.push(".console__key {\n\tcolor: #800000;\n}");

rules.push(".console__key::after {\n\tcontent: ': ';\n}");

rules.push(".console__index {\n\tdisplay: none;\n}");

rules.push(".console__value:not(:last-child)::after {\n\tcontent: ', ';\n}");

rules.push(".console__array::after {\n\tcontent: ']';\n}");

rules.push(".console__array::before {\n\tcontent: '[';\n}");

rules.push(".console__object::after {\n\tcontent: '}';\n}");

rules.push(".console__object::before {\n\tcontent: '{';\n}");

rules.push(".console__f-name {\n\tcolor: #0099ff;\n}");

rules.push(".console__f-key {\n\tcolor: #800000;\n}");

/* browser_info v. 0.1.2 15.04.2017 @ filip-swinarski */

rules.push(".browser__header {\n\tborder: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".browser__display {\n\tpadding: 10px; overflow: hidden;\n}");

rules.push(".browser__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\theight: 400px;\n\ttransition: height padding-top padding-bottom .5s;\n}");

rules.push(".browser__display--collapsed {\n\theight: 0;\n\ttransition: height pading-top padding-bottom .5s;\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

/* popup v. 0.1.2 05.05.2017 @ filip-swinarski */

rules.push(".popup {\n\tposition: fixed;\n\tbackground-color: #fff;\n\tborder: 1px solid #bcbcbc;\n\twidth: calc(100% - 20px);\n\theight: auto;\n\ttop: 50%;\n\ttransform: translate(0, -50%);\n\tpadding-bottom: 10px;\n}");

rules.push(".popup__close {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #bcbcbc;\n\tborder-left: 1px solid #bcbcbc;\n\tpadding: 2px 6px;\n\tcursor: pointer;\n\tfont-size: 20px;\n}");

rules.push(".popup__wrapper {\n\theight: calc(100vh - 54px);\n\toverflow-x: hidden;\n\toverflow-y: scroll;\n\tmargin-top: 29px;\n\tposition: relative;\n}");

rules.push(".popup__header {\n\tpadding: 10px;\n\tposition: relative;\n}");

rules.push(".popup__header--expanded {\n\tpadding-bottom: 40px;\n}");

rules.push(".popup__headline {\n\tdisplay: block;\n\tpadding-bottom: 5px;\n}");

rules.push(".popup__add {\n\tposition: absolute;\n\t-moz-appearance: none;\n\tbackground-color: transparent;\n\tbox-shadow: none;\n\tborder: 0 none transparent;\n\tpadding: 0;\n\tright: 5px;\n\ttop: 5px;\n\tfont-size: 20px;\n}");

rules.push(".popup__add-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #bcbcbc;\n\tposition: absolute;\n\tright: 9px;\n}");

rules.push(".popup__add-label--collapsed {\n\tdisplay: none;\n}");

rules.push(".popup__add-label--expanded {\n\tdisplay: block;\n\tpadding-top: 5px;\n\tpadding-left: 10px;\n\tpadding-bottom: 5px;\n}");

rules.push(".popup__apply {\n\tposition: absolute;\n\tright: 10px;\n\ttop: 94px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".popup__apply--collapsed {\n\tdisplay: none;\n}");

rules.push(".popup__apply--expanded {\n\tdisplay: inline-block;\n}");

rules.push(".popup__cancel {\n\tposition: absolute;\n\tright: 65px;\n\ttop: 94px;\n\tborder: 0 none transparent;\n\tbackground-color: #acacac;\n\t-moz-appearance: none;\n\tcolor: #444;\n\tpadding: 0 10px 4px;\n}");

rules.push(".popup__cancel--collapsed {\n\tdisplay: none;\n}");

rules.push(".popup__cancel--expanded {\n\tdisplay: inline-block;\n}");

rules.push(".popup__list {\n\tlist-style: none;\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n\tpadding-left: 20px;\n}");

rules.push(".popup__list-element {\n\tposition: relative;\n}");

rules.push(".popup__list-label {\n\tdisplay: block;\n}");

rules.push(".popup__list-separator {\n\tpadding-right: 5px;\n}");

rules.push(".popup__list-input {\n\t-moz-appearance: none; border: 1px solid #fff;\n}");

rules.push(".popup__list-input:focus {\n\tborder: 1px solid #bcbcbc;\n}");

rules.push(".popup__list-btn {\n\tposition: absolute;\n\tright: 10px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\ttop: 0;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".popup__list-btn--expanded {\n\tvisibility: visible;\n}");

rules.push(".popup__list-btn--collapsed {\n\tvisibility: hidden;\n}");

rules.push(".popup__highlight {\n\tposition: absolute;\n\ttop: 10px;\n\tright: 2px;\n}");

exports.rules = rules;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsb2FkX3N0eWxlcy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9vdXRwdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfZG9tLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2hlYWRlci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3IuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXAuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXBfc2VjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxzdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxJQUFJLE9BQU8sT0FBWCxFQUNDLE9BQU8sU0FBUCxHQUFtQixTQUFuQixDQURELEtBR0MsT0FBTyxPQUFQLEdBQWlCLFNBQWpCOzs7Ozs7OztBQ3ZCRDs7QUFFQSxJQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFNBQXRCLEVBQWlDLFVBQWpDLEVBQTZDLE1BQTdDLEVBQXdEO0FBQy9FLFVBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQix5QkFBMUI7QUFDQSxXQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsMEJBQTNCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLDZCQUEzQjtBQUNBLFlBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0Qiw2QkFBNUI7QUFDQSxVQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsd0JBQXZCO0FBQ0EsV0FBVSxTQUFWLENB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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogbWFpbi5qcyAwLjEuMiAxOS4wOS4yMDE3IEAgZmlsaXAgc3dpbmFyc2tpICovXG5cbmltcG9ydCB7bG9hZFN0eWxlc30gZnJvbSAnLi9tb2R1bGVzL2xvYWRfc3R5bGVzLmpzJztcbmltcG9ydCB7cmVuZGVySW5zcGVjdG9yfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2luc3BlY3Rvci5qcyc7XG5pbXBvcnQge3JlbmRlckNvbnNvbGV9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge3JlbmRlckJyb3dzZXJJbmZvfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2Jyb3dzZXJfaW5mby5qcyc7XG5pbXBvcnQge2NvbnNvbGVMaXN0ZW59IGZyb20gJy4vbW9kdWxlcy9jb25zb2xlX2xpc3Rlbi5qcyc7XG5pbXBvcnQgKiBhcyBEVENvbnNvbGUgZnJvbSAnLi9tb2R1bGVzL2R0X2NvbnNvbGVfYXBpLmpzJztcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuY29udGFpbmVyLmlkID0gJ2Rldl90b29scyc7XG5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHMnKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbmxvYWRTdHlsZXMoKTtcbnJlbmRlckluc3BlY3Rvcihib2R5LCBjb250YWluZXIpO1xucmVuZGVyQ29uc29sZShjb250YWluZXIpO1xucmVuZGVyQnJvd3NlckluZm8oY29udGFpbmVyKTtcblxuaWYgKHdpbmRvdy5jb25zb2xlKVxuXHR3aW5kb3cuRFRDb25zb2xlID0gRFRDb25zb2xlO1xuZWxzZVxuXHR3aW5kb3cuY29uc29sZSA9IERUQ29uc29sZTtcbiIsIi8qIGFkZF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgYWRkQnV0dG9uQWN0aW9uID0gKGFwcGx5QnRuLCBjYW5jZWxCdG4sIG5hbWVMYWJlbCwgdmFsdWVMYWJlbCwgaGVhZGVyKSA9PiB7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fY2FuY2VsLS1jb2xsYXBzZWQnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWV4cGFuZGVkJyk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2FuY2VsLS1leHBhbmRlZCcpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcbn07XG5cbmV4cG9ydCB7YWRkQnV0dG9uQWN0aW9ufTtcblxuIiwiLyogYXBwbHlfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjIsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQXR0cklucHV0fSBmcm9tICcuL3JlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMnO1xuXG5jb25zdCBhcHBseUJ1dHRvbkFjdGlvbiA9IChlbGVtZW50LCBidG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcikgPT4ge1xuXG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGNvbnN0IHZhbHVlID0gdmFsdWVJbnB1dC52YWx1ZTtcblx0Y29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcblx0bGV0IGF0dHJWYWx1ZUVsZW07XG5cdGxldCBhdHRyTmFtZUVsZW07XG5cblx0bGlzdC5pbm5lckhUTUwgPSAnJztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc9JztcblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX2F0dHJfYnRuJylcblx0XHRhdHRyTmFtZUVsZW0gPSBbXS5maWx0ZXIuY2FsbChyb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyksIChlbCkgPT4gZWwuaW5uZXJUZXh0ID09PSBuYW1lKVswXTtcblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpXG5cdFx0YXR0ck5hbWVFbGVtID0gW10uZmlsdGVyLmNhbGwocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJylbMF07XG5cblx0aWYgKGF0dHJWYWx1ZUVsZW0pIHtcblx0XHRhdHRyVmFsdWVFbGVtID0gYXR0ck5hbWVFbGVtLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuXHR9IGVsc2Uge1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0ck5hbWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKHNlcGFyYXRvciwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyVmFsdWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0fVxuXG5cdGlmIChidG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKSB7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChhdHRyKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdGF0dHJOYW1lRWxlbS5pbm5lclRleHQgPSBuYW1lO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdH1cblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpIHtcblx0XHRhdHRyTmFtZUVsZW0uaW5uZXJUZXh0ID0gJ3N0eWxlJztcblx0XHRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG5cdFx0YXJyLnB1c2goYCR7bmFtZX06ICR7dmFsdWV9O2ApO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gJ1wiJztcblx0XHRbXS5mb3JFYWNoLmNhbGwoYXJyLCAocnVsZSwgaSkgPT4ge1xuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgcnVsZS5zcGxpdCgnOiAnKVswXSwgcnVsZS5zcGxpdCgnOiAnKVsxXS5yZXBsYWNlKCc7JywgJycpKTtcblxuXHRcdFx0aWYoaSAhPT0gMClcblx0XHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJyAnO1xuXG5cdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSBgJHtydWxlLnNwbGl0KCc6ICcpWzBdfTogJHtydWxlLnNwbGl0KCc6ICcpWzFdfWA7XG5cblx0XHRcdGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICc7Jztcblx0XHRcdFx0XG5cdFx0fSk7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJ1wiJztcblx0fVxuXG5cdGF0dHJOYW1lRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRhdHRyVmFsdWVFbGVtLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRidG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcbn07XG5cbmV4cG9ydCB7YXBwbHlCdXR0b25BY3Rpb259O1xuIiwiLyogY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMsIHYuIDAuMS4wLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBjYW5jZWxCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgdmFsdWVMYWJlbCwgbmFtZUxhYmVsLCBoZWFkZXIpID0+IHtcblxuXHRjb25zdCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCBuYW1lSW5wdXQgPSBuYW1lTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWNvbGxhcHNlZCcpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYXBwbHktLWV4cGFuZGVkJyk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2FuY2VsLS1jb2xsYXBzZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19jYW5jZWwtLWV4cGFuZGVkJyk7XG5cbn07XG5cbmV4cG9ydCB7Y2FuY2VsQnV0dG9uQWN0aW9ufTtcbiIsIi8qIGNvbnNvbGVfY2xlYXIuanMsIHYuIDAuMS4wLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcblxuY29uc3QgY29uc29sZUNsZWFyID0gKCkgPT4ge1xuICAgIGNvbnNvbGVEaXNwbGF5LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQge2NvbnNvbGVDbGVhcn07XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjUsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMaXN0ZW4gPSAoKSA9PiB7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcblxuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZU1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvckNvbHVtbk5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMb2cgPSAoc3RyLCB2YWx1ZSkgPT4ge1xuXG4gICAgY29uc3QgbG9nID0gbmV3IEN1c3RvbUV2ZW50KCdsb2cnLCB7ZGV0YWlsOiBbc3RyLCB2YWx1ZV19KTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmRpc3BhdGNoRXZlbnQobG9nKTtcblxufVxuXG5leHBvcnQge2NvbnNvbGVMb2d9O1xuIiwiLyogZG9tX2VsZW1lbnRfbGlzdGVuLmpzLCB2LiAwLjEuMCwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJQb3B1cH0gZnJvbSAnLi9yZW5kZXJfcG9wdXAuanMnO1xuXG5jb25zdCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRsZXQgc3RhcnREYXRlO1xuXHRsZXQgdE9iajtcblx0bGV0IHN0YXJ0WDtcblx0bGV0IHN0YXJ0WTtcblx0bGV0IGVuZFg7XG5cdGxldCBlbmRZO1xuXHRsZXQgZGlzdFg7XG5cdGxldCBkaXN0WTtcblx0bGV0IG1heFggPSAwO1xuXHRsZXQgbWF4WSA9IDA7XG5cblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuXHRcdHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dE9iaiA9IGUudG91Y2hlc1swXTtcblx0XHRzdGFydFggPSB0T2JqLnBhZ2VYO1xuXHRcdHN0YXJ0WSA9IHRPYmoucGFnZVk7XG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG5cdFx0dE9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0ZW5kWCA9IHRPYmoucGFnZVg7XG5cdFx0ZW5kWSA9IHRPYmoucGFnZVk7XG5cdFx0ZGlzdFggPSBlbmRYIC0gc3RhcnRYO1xuXHRcdGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcblx0ICAgXG5cdFx0aWYgKE1hdGguYWJzKGRpc3RYKSA+IG1heFgpXG5cdFx0XHRtYXhYID0gTWF0aC5hYnMoZGlzdFgpO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFkpID4gbWF4WSlcblx0XHRcdG1heFkgPSBNYXRoLmFicyhkaXN0WSk7XG5cdCAgIFxuXHR9LCBmYWxzZSk7XG5cdHJvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG5cdCAgIFxuXHRcdGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IGRhdGVBbXAgPSBlbmREYXRlIC0gc3RhcnREYXRlO1xuXHQgICBcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAobWF4WSA8PSAzMCAmJiBtYXhYIDw9IDMwKSB7XG5cdFx0ICAgXG5cdFx0XHRpZiAoZGF0ZUFtcCA8PSAyMDApIHtcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpXG5cdFx0XHRcdHJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJylcblxuXHRcdFx0XHRpZiAoYXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpIHx8XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKSkge1xuXHRcdFx0XHRcdGFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVuZGVyUG9wdXAoZWxlbSwgcm93KTtcblx0XHRcdH1cblx0XHQgICBcblx0XHR9XG5cdCAgIFxuXHRcdG1heFggPSAwO1xuXHRcdG1heFkgPSAwO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7ZG9tRWxlbWVudExpc3Rlbn07XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjMsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5pbXBvcnQge2NvbnNvbGVDbGVhcn0gZnJvbSAnLi9jb25zb2xlX2NsZWFyLmpzJztcblxuY29uc3QgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmNvbnN0IGNsZWFyID0gY29uc29sZUNsZWFyO1xuXG5leHBvcnQge2xvZ307XG5leHBvcnQge2NsZWFyfTtcbiIsIi8qIGdsb2JhbF9ldmFsLmpzLCB2LiAwLjEuMCwgMzEuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuLy8gZXZhbCAtIHJ1bnMgYmxvY2sgc2NvcGUgZGVjbGFyYXRpb25zIHZpYSBzY3JpcHQgaW5qZWN0aW9uXG4vLyBvdGhlcndpc2Ugc3RhbmRhcmQgZXZhbCB1c2VkIFxuLy8gLSB0aGluayBpZiBub3QgdXNlIGluamVjdGlvbiBleGNsdXNpdmVseVxuLy8gcmV0dXJucyB2YWx1ZVxuY29uc3QgZ2xvYmFsRXZhbCA9IChzdHIpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JzsgLy8gcHJldmVudCBjcmVhdGluZyBsb2NhbCB2YXJpYWJsZXMgd2l0aCBzdGFuZGFyZCBldmFsXG4gICAgXG4gICAgaWYgKHN0ci5zdGFydHNXaXRoKCdsZXQgJykgfHwgc3RyLnN0YXJ0c1dpdGgoJ2NvbnN0ICcpKSB7IC8vIGNvZGUgZm9yIHNjcmlwdCBpbnNlcnRpb25cblxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpLnJlbW92ZSgpXG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LmlkID0gJ2R0X3NjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gcmV0dXJucyB1bmRlZmluZWQgd2hlbiBkZWNsYXJpbmcgYmxvY2sgc2NvcGVkIHZhcmlhYmxlXG4gICAgfSBlbHNlIHsgLy9zdGFuZGFyZCBldmFsXG4gICAgICAgIHJldHVybiAoMSwgZXZhbCkoc3RyKTsgLy8gaW5kaXJlY3QgY2FsbCB0byBhY2Nlc3MgZ2xvYmFsIHNjb3BlXG4gICAgfVxufVxuXG5leHBvcnQge2dsb2JhbEV2YWx9O1xuIiwiLyogaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMsIHYuIDAuMS4xLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBoaWdobGlnaHRCb3hBY3Rpb24gPSAoZWxlbWVudCwgcm93KSA9PiB7XG5cblx0Y29uc3QgcmVnZXhwMSA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IHJnYlxcKDE3MCwgMjIxLCAyNTVcXCkgXFwhaW1wb3J0YW50Lyk7XG5cdGNvbnN0IHJlZ2V4cDIgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiBcXCNhZGYgXFwhaW1wb3J0YW50Lyk7XG5cblx0aWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAxKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJlZ2V4cDEsICcnKTtcblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAyKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJlZ2V4cDIsICcnKTtcblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZC1jb2xvcjogI2FkZiAhaW1wb3J0YW50Jztcblx0XHRyb3cuc2V0QXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcsIHRydWUpO1xuXHR9XG5cbn07XG5cbmV4cG9ydCB7aGlnaGxpZ2h0Qm94QWN0aW9ufTtcblxuIiwiLyogbG9hZCBfc3R5bGVzLmpzIHYuIDAuMS4zLCAxOC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3J1bGVzfSBmcm9tICcuL3N0eWxlcy5qcyc7XG5pbXBvcnQge3JlbmRlclN0eWxlc30gZnJvbSAnLi9yZW5kZXJfc3R5bGVzLmpzJztcblxuY29uc3QgbG9hZFN0eWxlcyA9ICgpID0+IHtcblxuICAgIGNvbnN0IGdvb2dsZUZvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBnb29nbGVGb250LnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBnb29nbGVGb250LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGdvb2dsZUZvbnQubWVkaWEgPSAnc2NyZWVuJztcbiAgICBnb29nbGVGb250LmhyZWYgPSAnaHR0cHM6Ly9nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNwYWNlK01vbm86NDAwLDcwMCZhbXA7c3Vic2V0PWxhdGluLWV4dCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChnb29nbGVGb250KTtcblx0cmVuZGVyU3R5bGVzKHJ1bGVzKTtcbn07XG5cbmV4cG9ydCB7bG9hZFN0eWxlc307XG4iLCIvKiByZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgcmVuZGVyQXR0cklucHV0ID0gKGVsLCBkaXNwbGF5LCByb3csIG5hbWUsIHZhbHVlKSA9PiB7XG4gICBcblx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0Y29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgXG5cdGlucHV0LnR5cGUgPSAndGV4dCc7XG5cdGlucHV0LnZhbHVlID0gdmFsdWU7XG5cblx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdGlucHV0LnZhbHVlICs9ICc7JztcblxuXHRsYWJlbC5pbm5lclRleHQgPSBuYW1lO1xuXHRhcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJzonO1xuXHRsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1lbGVtZW50Jyk7XG5cdGxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWxhYmVsJyk7XG5cdGlucHV0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWlucHV0Jyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bicpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuXHRzZXBhcmF0b3IuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3Qtc2VwYXJhdG9yJyk7XG4gICBcblx0bGFiZWwuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yKTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXHRsYWJlbC5hcHBlbmRDaGlsZChhcHBseUJ0bik7XG5cdGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsKTtcblx0ZGlzcGxheS5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICBcblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgXG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuXHRcdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRcdGNvbnN0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRcdGNvbnN0IGxhYmVscyA9IGRpc3BsYXkucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRcdFtdLmZvckVhY2guY2FsbChsYWJlbHMsIChsYWJlbCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwuZmlyc3RDaGlsZC5kYXRhO1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cblx0XHRcdFx0XHRcdGlmIChpIDwgbGFiZWxzLmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0XHR9XG5cblx0fSwgZmFsc2UpO1xuXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0fSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdH0pO1xuXG5cdGFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgXG5cdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRjb25zdCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jylcblx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuXHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09IG5hbWUgJiYgZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRsZXQgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblxuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckF0dHJJbnB1dH07XG4iLCIvKiByZW5kZXJfYnJvd3Nlcl9pbmZvLmpzLCB2LiAwLjEuMSwgMTkuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IHJlbmRlckJyb3dzZXJJbmZvID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBicm93c2VySW5mb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBicm93c2VySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuaWQgPSAnYnJvd3Nlcic7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoYnJvd3NlckluZm9Db250YWluZXIsIGZhbHNlKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCBuYW1lOiAnICsgbmF2aWdhdG9yLmFwcENvZGVOYW1lICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgdmVyc2lvbjogJyArIG5hdmlnYXRvci5hcHBWZXJzaW9uICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5QbGF0Zm9ybTogJyArIG5hdmlnYXRvci5wbGF0Zm9ybSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+VXNlciBhZ2VudDogJyArIG5hdmlnYXRvci51c2VyQWdlbnQgKyAnPC9kaXY+JztcblxuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjUsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZUNvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzJztcblxuY29uc3QgY29uc29sZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5jb25zdCBjb25zb2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXRQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29uc29sZScpO1xuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXknKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVJbnB1dC5pZCA9ICdjb25zb2xlX2lucHV0JztcbmNvbnNvbGVJbnB1dC50eXBlID0gJ3RleHQnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdCcpO1xuY29uc29sZUNvbnRhaW5lci5pZCA9ICdjb25zb2xlJztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCcpO1xuXG5jb25zdCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIHJlbmRlckNvbnNvbGVDb250cm9scyhjb25zb2xlQ29udGFpbmVyLCBjb25zb2xlSW5wdXQpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlQ2xlYXJ9IGZyb20gJy4vY29uc29sZV9jbGVhci5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5jb25zdCBjb25zb2xlQ2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVMb2dCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVDb250cm9sc1BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVDb250cm9scyA9IChjb250YWluZXIsIGlucHV0KSA9PiB7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRyb2xzUGFuZWwpO1xuICAgIGNvbnNvbGVDb250cm9sc1BhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDbGVhckJ0bik7XG4gICAgY29uc29sZUNvbnRyb2xzUGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUxvZ0J0bik7XG5cdGNvbnNvbGVDb250cm9sc1BhbmVsLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tY2xlYXItYnRuJyk7XG5cdGNvbnNvbGVMb2dCdG4uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMtLWJ0bicpO1xuXHRjb25zb2xlTG9nQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1sb2ctYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5pbm5lclRleHQgPSBcIkNsZWFyXCI7XG5cdGNvbnNvbGVMb2dCdG4uaW5uZXJUZXh0ID0gXCJMb2dcIjtcblx0Y29uc29sZUNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY29uc29sZUNsZWFyKCksIGZhbHNlKTtcblx0Y29uc29sZUxvZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGxldCB2YWx1ZSA9IGdsb2JhbEV2YWwoaW5wdXQudmFsdWUpO1xuXG5cdFx0RFRDb25zb2xlLmxvZyh2YWx1ZSwgaW5wdXQudmFsdWUpO1x0XG5cdFx0aW5wdXQudmFsdWUgPSAnJztcblx0fSwgZmFsc2UpO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVDb250cm9sc307XG4iLCIvKiByZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJDb25zb2xlT3V0cHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX291dHB1dC5qcyc7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmIChtc2dBcnJheVswXSkge1xuXG4gICAgICAgIGNvbnN0IGlucHV0TWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGlucHV0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctaScpO1xuICAgICAgICBpbnB1dE1lc3NhZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLWlwcm9tcHRcIj48L3NwYW4+JHttc2dBcnJheVswXX0gYDtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0TWVzc2FnZSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJldHVybk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHJldHVybk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICByZXR1cm5NZXNzYWdlLmlubmVySFRNTCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj5gO1xuICAgIHJlbmRlckNvbnNvbGVPdXRwdXQobXNnQXJyYXlbMV0sIHJldHVybk1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXR1cm5NZXNzYWdlKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfTtcbiIsIi8vIHJlbmRlcl9jb25zb2xlX291dHB1dC5qcywgdi4gMC4xLjMsIDExMTExMTExMTcgQCBmaWxpcC1zd2luYXJza2lcblxuY29uc3QgcmVuZGVyQ29uc29sZU91dHB1dCA9ICh2YWwsIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBpbmRleCkgPT4ge1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCBjaGVja1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNwbGl0KCcgJylbMV07XG4gICAgbGV0IGh0bWwgPSAnJztcblxuICAgIGNoZWNrU3RyID0gY2hlY2tTdHIuc3Vic3RyaW5nKDAsIGNoZWNrU3RyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyfWApO1xuXHRcbiAgICBpZiAoY2hlY2tTdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudWxsJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdib29sZWFuJykge1xuICAgICAgICBodG1sICs9IGNoZWNrU3RyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsfVwiYCA6IHZhbDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09J2Z1bmN0aW9uJykge1xuICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgfSBlbHNlIGlmIChjaGVja1N0ciA9PT0gJ2FycmF5JyB8fCBjaGVja1N0ciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiB2YWwpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBrZXlDbGFzcyA9IGNoZWNrU3RyID09PSAnYXJyYXknID8gJ2luZGV4JyA6ICdrZXknO1xuICAgICAgICAgICAgbGV0IGNoZWNrU3RyMiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWxbaXRlbV0pLnNwbGl0KCcgJylbMV07XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY2hlY2tTdHIyID0gY2hlY2tTdHIyLnN1YnN0cmluZygwLCBjaGVja1N0cjIubGVuZ3RoLTEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcblxuICAgICAgICAgICAgaWYgKGNoZWNrU3RyMiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ251bGwnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnc3ltYm9sJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtrZXlDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHIyfWApO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBjaGVja1N0cjIgPT09ICdzdHJpbmcnID8gYFwiJHt2YWxbaXRlbV19XCJgIDogdmFsW2l0ZW1dO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQodmFsdWVFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGNvbnN0IGtleUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZW5kZXJDb25zb2xlT3V0cHV0KHZhbFtpdGVtXSwgb3V0cHV0LCBpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCA9IHZhbDtcbiAgICB9XG5cdFxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3V0cHV0KTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH07XG4iLCIvKiByZW5kZXJfZG9tLmpzLCB2LiAwLjEuOSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtkb21FbGVtZW50TGlzdGVufSBmcm9tICcuL2RvbV9lbGVtZW50X2xpc3Rlbi5qcyc7XG5cbmNvbnN0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuICAgIGlmIChlbGVtLmlkID09PSAnZGV2X3Rvb2xzJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByb3cyID0gZWxlbS5jaGlsZHJlbi5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cxRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzFPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MUNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MkVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cyT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzJDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1vcGVuaW5nJyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNsb3NpbmcnKTtcbiAgICBcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTtcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTsgXG4gICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MUNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cyT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cyQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzFPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8JztcbiAgICByb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxT3BlbkFycm93KTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuICAgIFxuICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBhdHRyTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjb25zdCBhdHRyRXF1YWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmlubmVyVGV4dCA9IGF0dHIubG9jYWxOYW1lO1xuICAgICAgICAgICAgYXR0ckVxdWFsU3Bhbi5pbm5lclRleHQgPSAnPSc7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmlubmVyVGV4dCA9ICdcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ck5hbWVTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ckVxdWFsU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJWYWx1ZVNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XHRcbiAgICBcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFDbG9zZUFycm93KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICBcbiAgICBpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIHRleHRFbC5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgICAgICB0ZXh0RWwuaW5uZXJUZXh0ID0gZWxlbS50ZXh0LnRyaW0oKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0RWwpXG5cbiAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJET00oZWwsIHdyYXBwZXIsIGxldmVsKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJvdzJPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8Lyc7XG4gICAgcm93MkNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93Mk9wZW5BcnJvdyk7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyRWxlbWVudFR5cGVTcGFuKTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJDbG9zZUFycm93KTtcbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggfHwgZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93Mik7XG4gICAgZWxzZVxuICAgICAgICByb3cxLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIFxuXHRkb21FbGVtZW50TGlzdGVuKGVsZW0sIHJvdzEsIHJvdzFPcGVuQXJyb3cpO1xuICAgIHBhcmVudEVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xufVxuZXhwb3J0IHtyZW5kZXJET019O1xuIiwiLyogcmVuZGVyX2hlYWRlci5qcywgdi4gMC4xLjEsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlckhlYWRlciA9IChjb250YWluZXIsIGV4cGFuZGVkKSA9PiB7XG4gICBcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBjb250YWluZXIuaWQ7XG4gICBcbiAgICBoZWFkZXIuaWQgPSBgJHtjb250YWluZXIuaWR9X2hlYWRlcmA7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX2hlYWRlcmApO1xuICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGVgKTtcbiAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHt0aXRsZX1fX3RpdGxlXCI+JHt0aXRsZX08L3NwYW4+YDtcbiAgIFxuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1leHBhbmRlZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWNvbGxhcHNlZGApO1xuICAgIH1cbiAgIFxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0b2dnbGVCdG4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICBcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXS5maWx0ZXIuY2FsbChjb250YWluZXIuY2hpbGRyZW4sIGVsID0+IGVsLmlkICE9PSBgJHtwYXJlbnQuaWR9X19oZWFkZXJgKTtcbiAgICAgICBcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC50b2dnbGUoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tZXhwYW5kZWRgKTtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC50b2dnbGUoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tY29sbGFwc2VkYCk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShgJHtlbC5jbGFzc0xpc3RbMF19LS1leHBhbmRlZGApO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShgJHtlbC5jbGFzc0xpc3RbMF19LS1jb2xsYXBzZWRgKTtcbiAgICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJIZWFkZXJ9O1xuIiwiLyogcmVuZGVyX2luc3BlY3Rvci5qcywgdi4gMC4xLjYsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyRE9NfSBmcm9tICcuL3JlbmRlcl9kb20uanMnO1xuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IHJlbmRlckluc3BlY3RvciA9IChib2R5LCBwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgaW5zcGVjdG9yRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBodG1sRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmlkID0gJ2luc3BlY3Rvcic7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3RvcicpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheScpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuaWQgPSAnaW5zcGVjdG9yX2Rpc3BsYXknO1xuICAgIHJlbmRlckhlYWRlcihpbnNwZWN0b3JDb250YWluZXIsIHRydWUpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCcpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JEaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChpbnNwZWN0b3JDb250YWluZXIpO1xuICAgIHJlbmRlckRPTShodG1sRWxlbSwgaW5zcGVjdG9yRGlzcGxheSwgbGV2ZWwpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckluc3BlY3Rvcn07XG4iLCIvKiByZW5kZXJfcG9wdXAuanMsIHYuIDAuMS40LCAxOC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclBvcHVwU2VjdGlvbn0gZnJvbSAnLi9yZW5kZXJfcG9wdXBfc2VjdGlvbi5qcyc7XG5cbmNvbnN0IHJlbmRlclBvcHVwID0gKGVsZW1lbnQsIHJvdykgPT4ge1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rldl90b29scycpO1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY2xvc2VCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGF0dHJpYnV0ZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHN0eWxlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgcG9wdXBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGhpZ2hsaWdodFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XG5cdHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fd3JhcHBlcicpO1xuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jbG9zZScpO1xuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICd4JztcblxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICB9LCBmYWxzZSk7XG5cblx0cmVuZGVyUG9wdXBTZWN0aW9uKCdhdHRyX2xpc3QnLCAnQXR0cmlidXRlcycsIGVsZW1lbnQsIHJvdywgYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuXHRyZW5kZXJQb3B1cFNlY3Rpb24oJ3N0eWxlX2xpc3QnLCAnSW5saW5lIHN0eWxlcycsIGVsZW1lbnQsIHJvdywgc3R5bGVMaXN0V3JhcHBlcik7XG5cdHJlbmRlclBvcHVwU2VjdGlvbignaGlnaGxpZ2h0X3NlY3Rpb24nLCAnSGlnaGxpZ2h0IGVsZW1lbnQnLCBlbGVtZW50LCByb3csIGhpZ2hsaWdodFdyYXBwZXIpO1xuXG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHN0eWxlTGlzdFdyYXBwZXIpO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChoaWdobGlnaHRXcmFwcGVyKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3B1cCk7XG59O1xuXG5leHBvcnQge3JlbmRlclBvcHVwfTtcbiIsIi8qIHJlbmRlcl9wb3B1cF9zZWN0aW9uLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5pbXBvcnQge2FkZEJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9hZGRfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2FwcGx5QnV0dG9uQWN0aW9ufSBmcm9tICcuL2FwcGx5X2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259IGZyb20gJy4vY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtoaWdobGlnaHRCb3hBY3Rpb259IGZyb20gJy4vaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJQb3B1cFNlY3Rpb24gPSAoaWQsIHRpdGxlLCBlbGVtZW50LCByb3csIGxpc3RXcmFwcGVyKSA9PiB7XG5cblx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCByZWdleHAxID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogcmdiXFwoMTcwLCAyMjEsIDI1NVxcKSBcXCFpbXBvcnRhbnQvKTtcblx0Y29uc3QgcmVnZXhwMiA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IFxcI2FkZiBcXCFpbXBvcnRhbnQvKTtcblx0bGV0IHNlY3Rpb25OYW1lID0gJyc7XG5cblx0aGVhZGVyLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cInBvcHVwX19oZWFkbGluZVwiPiR7dGl0bGV9PC9zcGFuPmA7XG5cblx0aWYgKGlkID09PSAnYXR0cl9saXN0JyB8fCBpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjb25zdCBhZGRBcHBseUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNvbnN0IGFkZENhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0Y29uc3QgdmFsdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0Y29uc3QgbmFtZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdGNvbnN0IHZhbHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdFx0bGV0IGFycjtcblx0XHRcblx0XHRpZiAoaWQgPT09ICdhdHRyX2xpc3QnKSB7XG5cdFx0XHRhcnIgPSBbXS5maWx0ZXIuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGF0dHIgPT4gYXR0ci5uYW1lICE9PSAnc3R5bGUnKTtcblx0XHRcdHNlY3Rpb25OYW1lID0gJ2F0dHJpYnV0ZXMnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcnIgPSBbXTtcblx0XHRcdHNlY3Rpb25OYW1lID0gJ3N0eWxlcyc7XG5cdFx0fVxuXG5cdFx0bGlzdC5pZCA9IGlkO1xuXHRcdGFkZEJ0bi5pbm5lclRleHQgPSAnKyc7XG5cdFx0YWRkQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQnKTtcblx0XHRhZGRBcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRcdGFkZENhbmNlbEJ0bi5pbm5lclRleHQgPSAnQ2FuY2VsJztcblx0XHRhZGRBcHBseUJ0bi5pZCA9IGBhZGRfJHtpZC5yZXBsYWNlKCdfbGlzdCcsICcnKX1fYnRuYDtcblx0XHRhZGRBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHknKTtcblx0XHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NhbmNlbCcpO1xuXHRcdG5hbWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgbmFtZSAnIDogJ2F0dHJpYnV0ZSBuYW1lICc7XG5cdFx0dmFsdWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgdmFsdWUgJyA6ICdhdHRyaWJ1dGUgdmFsdWUgJztcblx0XHRuYW1lSW5wdXQudHlwZSA9ICd0ZXh0Jztcblx0XHRuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1pbnB1dCcpO1xuXHRcdHZhbHVlSW5wdXQudHlwZSA9ICd0ZXh0Jztcblx0XHR2YWx1ZUlucHV0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtaW5wdXQnKTtcblx0XHRhZGRBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWNvbGxhcHNlZCcpO1xuXHRcdGFkZENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2FuY2VsLS1jb2xsYXBzZWQnKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0XHR2YWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEJ0bik7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZENhbmNlbEJ0bik7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEFwcGx5QnRuKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXHRcdHZhbHVlSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh2YWx1ZUlucHV0KTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQobmFtZUlucHV0TGFiZWwpO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZCh2YWx1ZUlucHV0TGFiZWwpO1xuXHRcdGxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cdFx0aWYgKGlkID09PSAnc3R5bGVfbGlzdCcgJiYgZWxlbWVudC5hdHRyaWJ1dGVzICYmIGVsZW1lbnQuYXR0cmlidXRlcy5zdHlsZSkge1xuXHRcdFx0YXJyID0gJycuc3BsaXQuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUudmFsdWUsICc7ICcpXG5cdFx0XHRhcnIgPSBhcnIubWFwKHJ1bGUgPT4gcnVsZS5yZXBsYWNlKCc7JywgJycpKTtcblxuXHRcdFx0aWYgKHJvdy5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGlnaGxpZ2h0JykpXG5cdFx0XHRcdGFyciA9IGFyci5maWx0ZXIocnVsZSA9PiAhcnVsZS5tYXRjaChyZWdleHAxKSAmJiAhcnVsZS5tYXRjaChyZWdleHAyKSk7XG5cblx0XHR9XG5cblx0XHRmb3IgKGxldCBpdGVtIGluIGFycikge1xuXHRcdFx0XG5cdFx0XHRsZXQgbmFtZTtcblx0XHRcdGxldCB2YWx1ZTtcblxuXHRcdFx0aWYgKGlkID09PSAnc3R5bGVfbGlzdCcpIHtcblx0XHRcdFx0bmFtZSA9IGFycltpdGVtXS5zcGxpdCgnOiAnKVswXTtcblx0XHRcdFx0dmFsdWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuYW1lID0gYXJyW2l0ZW1dLm5hbWU7XG5cdFx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0YWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGFkZEJ1dHRvbkFjdGlvbihhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCBuYW1lSW5wdXRMYWJlbCwgdmFsdWVJbnB1dExhYmVsLCBoZWFkZXIpO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRhZGRBcHBseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGFwcGx5QnV0dG9uQWN0aW9uKGVsZW1lbnQsIGFkZEFwcGx5QnRuLCB2YWx1ZUlucHV0TGFiZWwsIG5hbWVJbnB1dExhYmVsLCBhcnIsIGxpc3QsIHJvdywgaGVhZGVyKTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0YWRkQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0Y2FuY2VsQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIHZhbHVlSW5wdXRMYWJlbCwgbmFtZUlucHV0TGFiZWwsIGhlYWRlcik7XG5cdFx0fSwgZmFsc2UpO1xuXHR9IGVsc2UgaWYgKGlkID09PSAnaGlnaGxpZ2h0X3NlY3Rpb24nKSB7XG5cblx0XHRjb25zdCBoaWdobGlnaHRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cblx0XHRzZWN0aW9uTmFtZSA9ICdoaWdobGlnaHQnO1xuXHRcdGhpZ2hsaWdodENoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuXHRcdGhpZ2hsaWdodENoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oaWdobGlnaHQnKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQoaGlnaGxpZ2h0Q2hlY2tib3gpO1xuXG5cdFx0aWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAxKSB8fCBlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMikpXG5cdFx0XHRoaWdobGlnaHRDaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcblxuXHRcdGhpZ2hsaWdodENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcblx0XHRcdGhpZ2hsaWdodEJveEFjdGlvbihlbGVtZW50LCByb3cpO1xuXHRcdH0sIGZhbHNlKTtcblx0fVxuXG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9faGVhZGVyJyk7XG5cdGxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uJyk7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoYHBvcHVwX19zZWN0aW9uLS0ke3NlY3Rpb25OYW1lfWApO1xufTtcblxuZXhwb3J0IHtyZW5kZXJQb3B1cFNlY3Rpb259O1xuIiwiLyogcmVuZGVyX3N0eWxlcy5qcywgdi4gMC4xLjAsIDE4LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlclN0eWxlcyA9IChydWxlcykgPT4ge1xuXG4gICAgY29uc3Qgc3R5bGVTaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuICAgIHJ1bGVzLmZvckVhY2goKHJ1bGUsIGkpID0+IHtzdHlsZVNoZWV0LnNoZWV0Lmluc2VydFJ1bGUocnVsZSwgaSk7fSk7XG59O1xuXG5leHBvcnQge3JlbmRlclN0eWxlc307XG4iLCIvKiBzdHlsZXMuanMsIHYuIDAuMS4zLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBydWxlcyA9IFtdO1xuXG4vKiBiYXNlIHYuIDAuMS42IDAxLjA0LjIwMTcgQCBmaWxpcC1zd2luYXJza2kgKi9cblxucnVsZXMucHVzaChgLmJvZHkge1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAxMDAlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHMge1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGZvbnQtZmFtaWx5OiAnU3BhY2UgTW9ubycsIG1vbm9zcGFjZTtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX19wYW5lbCB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxuLyogaW5zcGVjdG9yIHYuIDAuMS42IDIxLjA0LjIwMTcgQCBmaWxpcC1zd2luYXJza2kgKi9cblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9faGVhZGVyIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5IHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRvdmVyZmxvdzogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheSA+IC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93IHtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDsgY29sb3I6ICM0NDQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdzpob3Zlcjo6YmVmb3JlIHtcblx0Y29udGVudDogJyc7XG5cdHdpZHRoOiAxMDAlO1xuXHRoZWlnaHQ6IDIwcHg7XG5cdGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0ei1pbmRleDogLTE7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdy0tb3BlbmluZyB7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93LS1leHBhbmRlZCB+IC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBub25lO1xuXHRtYXJnaW4tbGVmdDogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4ge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuOjphZnRlciB7XG5cdGNvbnRlbnQ6ICcnO1xuXHRkaXNwbGF5OiBub25lO1xuXHRib3JkZXItbGVmdDogNnB4IHNvbGlkICNiYmI7XG5cdGJvcmRlci10b3A6IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogNXB4O1xuXHRsZWZ0OiAtOHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkOjphZnRlciB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHR0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkOjphZnRlciB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHR0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1jbG9zZTpsYXN0LWNoaWxkIHtcblx0cGFkZGluZy1yaWdodDogMTBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW5hbWUge1xuXHRjb2xvcjogIzgwMDA4MDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fYXR0ci1uYW1lIHtcblx0Y29sb3I6ICMwMDA7XG5cdHBhZGRpbmctbGVmdDogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19hdHRyLXZhbHVlIHtcblx0Y29sb3I6ICMwMGY7XG59YCk7XG5cbi8qIGNvbnNvbGUgdi4gMC4xLjYgMjEuMDQuMjAxNyBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faGVhZGVyIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scy0tYnRuIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1cHg7XG4gICAgcmlnaHQ6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsIG1vbm9zcGFjZTtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWNsZWFyLWJ0biB7XG4gICAgcmlnaHQ6IDZweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1sb2ctYnRuIHtcbiAgICByaWdodDogNjNweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzIHtcbiAgICBkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWV4cGFuZGVkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXkge1xuXHRvdmVyZmxvdzogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXktLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0IHtcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDJweCk7XG5cdGhlaWdodDogMzBweDtcblx0bWFyZ2luOiAwO1xuXHRwYWRkaW5nOiAwO1xuXHR0ZXh0LWluZGVudDogMzBweDtcblx0Ym9yZGVyLWJvdHRvbTogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogMzBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xuXHRwYWRkaW5nOiAwO1xuXHRtYXJnaW46IDA7XG5cdGJvcmRlci0tbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdGJvdHRvbTogMDtcblx0d2lkdGg6IDMwcHg7XG5cdGhlaWdodDogMzBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJz4+Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAzcHg7XG5cdGxlZnQ6IDVweDtcblx0aGVpZ2h0OiAxMHB4O1xuXHRjb2xvcjogI2FjYWNhYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pIHtcblx0Y29sb3I6ICNhY2FjYWM7XG5cdHBhZGRpbmc6IDVweCA1cHggNXB4IDI1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctciB7XG5cdGNvbG9yOiAjMDAwO1xuXHRwYWRkaW5nOiA1cHggNXB4IDVweCAyNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXItLWVyciB7XG5cdGNvbG9yOiAjYTkzMjI2O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYmQ4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXJwcm9tcHQge1xuXHR3aWR0aDogMjVweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRjb2xvcjogI2FjYWNhYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1ycHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPD0nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMjBweDtcblx0dG9wOiAzcHg7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pcHJvbXB0IHtcblx0d2lkdGg6IDI1cHg7IHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPj4nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMjBweDtcblx0Zm9udC1zaXplOiAxMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZXJyLXByb21wdCB7XG5cdHdpZHRoOiAyNXB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19lcnItcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAneCc7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IC0xN3B4O1xuXHR0b3A6IDA7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3VuZGVmaW5lZCB7XG5cdGNvbG9yOiAjYWRhZGFkO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbnVtYmVyIHtcblx0Y29sb3I6ICMwMDAwY2M7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19zdHJpbmcge1xuXHRjb2xvcjogI2NjNjYwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Jvb2xlYW4ge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX251bGwge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2tleSB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fa2V5OjphZnRlciB7XG5cdGNvbnRlbnQ6ICc6ICc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbmRleCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX192YWx1ZTpub3QoOmxhc3QtY2hpbGQpOjphZnRlciB7XG5cdGNvbnRlbnQ6ICcsICc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19hcnJheTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnXSc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19hcnJheTo6YmVmb3JlIHtcblx0Y29udGVudDogJ1snO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fb2JqZWN0OjphZnRlciB7XG5cdGNvbnRlbnQ6ICd9Jztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX29iamVjdDo6YmVmb3JlIHtcblx0Y29udGVudDogJ3snO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZi1uYW1lIHtcblx0Y29sb3I6ICMwMDk5ZmY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19mLWtleSB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG4vKiBicm93c2VyX2luZm8gdi4gMC4xLjIgMTUuMDQuMjAxNyBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9faGVhZGVyIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9fZGlzcGxheSB7XG5cdHBhZGRpbmc6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGRpbmctdG9wIHBhZGRpbmctYm90dG9tIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xuXHRwYWRkaW5nLXRvcDogMDtcblx0cGFkZGluZy1ib3R0b206IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG4vKiBwb3B1cCB2LiAwLjEuMiAwNS4wNS4yMDE3IEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbnJ1bGVzLnB1c2goYC5wb3B1cCB7XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuXHRoZWlnaHQ6IGF1dG87XG5cdHRvcDogNTAlO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNTAlKTtcblx0cGFkZGluZy1ib3R0b206IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fY2xvc2Uge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMDtcblx0cmlnaHQ6IDA7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDJweCA2cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0Zm9udC1zaXplOiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX3dyYXBwZXIge1xuXHRoZWlnaHQ6IGNhbGMoMTAwdmggLSA1NHB4KTtcblx0b3ZlcmZsb3cteDogaGlkZGVuO1xuXHRvdmVyZmxvdy15OiBzY3JvbGw7XG5cdG1hcmdpbi10b3A6IDI5cHg7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19oZWFkZXIge1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9faGVhZGVyLS1leHBhbmRlZCB7XG5cdHBhZGRpbmctYm90dG9tOiA0MHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2hlYWRsaW5lIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fYWRkIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRib3gtc2hhZG93OiBub25lO1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0cGFkZGluZzogMDtcblx0cmlnaHQ6IDVweDtcblx0dG9wOiA1cHg7XG5cdGZvbnQtc2l6ZTogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19hZGQtaW5wdXQge1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDlweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLXRvcDogNXB4O1xuXHRwYWRkaW5nLWxlZnQ6IDEwcHg7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fYXBwbHkge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiAxMHB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2FwcGx5LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19jYW5jZWwge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiA2NXB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYWNhY2FjO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjNDQ0O1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2NhbmNlbC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19jYW5jZWwtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3Qge1xuXHRsaXN0LXN0eWxlOiBub25lO1xuXHRtYXJnaW4tdG9wOiAwO1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRwYWRkaW5nLWxlZnQ6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fbGlzdC1lbGVtZW50IHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtbGFiZWwge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19saXN0LXNlcGFyYXRvciB7XG5cdHBhZGRpbmctcmlnaHQ6IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19saXN0LWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lOyBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtaW5wdXQ6Zm9jdXMge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtYnRuIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0Ym9yZGVyOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJhY2tncm91bmQtY29sb3I6ICNhOTMyMjY7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0dG9wOiAwO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQge1xuXHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQge1xuXHR2aXNpYmlsaXR5OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9faGlnaGxpZ2h0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDEwcHg7XG5cdHJpZ2h0OiAycHg7XG59YCk7XG5cbmV4cG9ydCB7cnVsZXN9O1xuIl19
