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

var consoleDisplay = document.createElement('div'); /* render_console.js, v. 0.1.4, 19.09.2017, @ filip-swinarski */

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
    (0, _render_console_controls.renderConsoleControls)(consoleContainer);
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

var consoleClearBtn = document.createElement('button'); /* render_console_controls.js, v. 0.1.0, 19.09.2017, @ filip-swinarski */

var consoleControlsPanel = document.createElement('div');

var renderConsoleControls = function renderConsoleControls(container) {

				container.appendChild(consoleControlsPanel);
				consoleControlsPanel.appendChild(consoleClearBtn);
				consoleControlsPanel.classList.add('console__controls');
				consoleClearBtn.classList.add('console__controls--clear-btn');
				consoleClearBtn.innerText = "Clear";
				consoleClearBtn.addEventListener('click', function () {
								return (0, _console_clear.consoleClear)();
				}, false);
};

exports.renderConsoleControls = renderConsoleControls;

},{"./console_clear.js":5}],17:[function(require,module,exports){
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
/* styles.js, v. 0.1.2, 19.09.2017, @ filip-swinarski */

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

rules.push(".console__controls--clear-btn {\n    position: absolute;\n    top: 5px;\n    right: 10px;\n    background-color: #fff;\n    border: 1px solid #bcbcbc;\n    border-radius: 3px;\n    padding: 4px 8px;\n    font-size: 14px;\n    font-family: \"Space Mono\", monospace;\n\tcursor: pointer;\n}");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsb2FkX3N0eWxlcy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9vdXRwdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfZG9tLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2hlYWRlci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3IuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXAuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXBfc2VjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxzdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxJQUFJLE9BQU8sT0FBWCxFQUNDLE9BQU8sU0FBUCxHQUFtQixTQUFuQixDQURELEtBR0MsT0FBTyxPQUFQLEdBQWlCLFNBQWpCOzs7Ozs7OztBQ3ZCRDs7QUFFQSxJQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFNBQXRCLEVBQWlDLFVBQWpDLEVBQTZDLE1BQTdDLEVBQXdEO0FBQy9FLFVBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQix5QkFBMUI7QUFDQSxXQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsMEJBQTNCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLDZCQUEzQjtBQUNBLFlBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0Qiw2QkFBNUI7QUFDQSxVQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsd0JBQXZCO0FBQ0EsV0FBVSxTQUFWLENB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TSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFVQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBTUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUlBOztBQUVBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBYUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBVUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUE7O0FBRUEsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQVNBOztBQUVBLE1BQU0sSUFBTjs7QUFXQSxNQUFNLElBQU47O0FBWUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFZQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O1FBTVEsSyxHQUFBLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogbWFpbi5qcyAwLjEuMiAxOS4wOS4yMDE3IEAgZmlsaXAgc3dpbmFyc2tpICovXG5cbmltcG9ydCB7bG9hZFN0eWxlc30gZnJvbSAnLi9tb2R1bGVzL2xvYWRfc3R5bGVzLmpzJztcbmltcG9ydCB7cmVuZGVySW5zcGVjdG9yfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2luc3BlY3Rvci5qcyc7XG5pbXBvcnQge3JlbmRlckNvbnNvbGV9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge3JlbmRlckJyb3dzZXJJbmZvfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2Jyb3dzZXJfaW5mby5qcyc7XG5pbXBvcnQge2NvbnNvbGVMaXN0ZW59IGZyb20gJy4vbW9kdWxlcy9jb25zb2xlX2xpc3Rlbi5qcyc7XG5pbXBvcnQgKiBhcyBEVENvbnNvbGUgZnJvbSAnLi9tb2R1bGVzL2R0X2NvbnNvbGVfYXBpLmpzJztcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuY29udGFpbmVyLmlkID0gJ2Rldl90b29scyc7XG5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHMnKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbmxvYWRTdHlsZXMoKTtcbnJlbmRlckluc3BlY3Rvcihib2R5LCBjb250YWluZXIpO1xucmVuZGVyQ29uc29sZShjb250YWluZXIpO1xucmVuZGVyQnJvd3NlckluZm8oY29udGFpbmVyKTtcblxuaWYgKHdpbmRvdy5jb25zb2xlKVxuXHR3aW5kb3cuRFRDb25zb2xlID0gRFRDb25zb2xlO1xuZWxzZVxuXHR3aW5kb3cuY29uc29sZSA9IERUQ29uc29sZTtcbiIsIi8qIGFkZF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgYWRkQnV0dG9uQWN0aW9uID0gKGFwcGx5QnRuLCBjYW5jZWxCdG4sIG5hbWVMYWJlbCwgdmFsdWVMYWJlbCwgaGVhZGVyKSA9PiB7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fY2FuY2VsLS1jb2xsYXBzZWQnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWV4cGFuZGVkJyk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2FuY2VsLS1leHBhbmRlZCcpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcbn07XG5cbmV4cG9ydCB7YWRkQnV0dG9uQWN0aW9ufTtcblxuIiwiLyogYXBwbHlfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjIsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQXR0cklucHV0fSBmcm9tICcuL3JlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMnO1xuXG5jb25zdCBhcHBseUJ1dHRvbkFjdGlvbiA9IChlbGVtZW50LCBidG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcikgPT4ge1xuXG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGNvbnN0IHZhbHVlID0gdmFsdWVJbnB1dC52YWx1ZTtcblx0Y29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcblx0bGV0IGF0dHJWYWx1ZUVsZW07XG5cdGxldCBhdHRyTmFtZUVsZW07XG5cblx0bGlzdC5pbm5lckhUTUwgPSAnJztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc9JztcblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX2F0dHJfYnRuJylcblx0XHRhdHRyTmFtZUVsZW0gPSBbXS5maWx0ZXIuY2FsbChyb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyksIChlbCkgPT4gZWwuaW5uZXJUZXh0ID09PSBuYW1lKVswXTtcblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpXG5cdFx0YXR0ck5hbWVFbGVtID0gW10uZmlsdGVyLmNhbGwocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJylbMF07XG5cblx0aWYgKGF0dHJWYWx1ZUVsZW0pIHtcblx0XHRhdHRyVmFsdWVFbGVtID0gYXR0ck5hbWVFbGVtLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuXHR9IGVsc2Uge1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0ck5hbWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKHNlcGFyYXRvciwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyVmFsdWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0fVxuXG5cdGlmIChidG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKSB7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChhdHRyKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdGF0dHJOYW1lRWxlbS5pbm5lclRleHQgPSBuYW1lO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdH1cblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpIHtcblx0XHRhdHRyTmFtZUVsZW0uaW5uZXJUZXh0ID0gJ3N0eWxlJztcblx0XHRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG5cdFx0YXJyLnB1c2goYCR7bmFtZX06ICR7dmFsdWV9O2ApO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gJ1wiJztcblx0XHRbXS5mb3JFYWNoLmNhbGwoYXJyLCAocnVsZSwgaSkgPT4ge1xuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgcnVsZS5zcGxpdCgnOiAnKVswXSwgcnVsZS5zcGxpdCgnOiAnKVsxXS5yZXBsYWNlKCc7JywgJycpKTtcblxuXHRcdFx0aWYoaSAhPT0gMClcblx0XHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJyAnO1xuXG5cdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSBgJHtydWxlLnNwbGl0KCc6ICcpWzBdfTogJHtydWxlLnNwbGl0KCc6ICcpWzFdfWA7XG5cblx0XHRcdGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICc7Jztcblx0XHRcdFx0XG5cdFx0fSk7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJ1wiJztcblx0fVxuXG5cdGF0dHJOYW1lRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRhdHRyVmFsdWVFbGVtLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRidG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcbn07XG5cbmV4cG9ydCB7YXBwbHlCdXR0b25BY3Rpb259O1xuIiwiLyogY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMsIHYuIDAuMS4wLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBjYW5jZWxCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgdmFsdWVMYWJlbCwgbmFtZUxhYmVsLCBoZWFkZXIpID0+IHtcblxuXHRjb25zdCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCBuYW1lSW5wdXQgPSBuYW1lTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWNvbGxhcHNlZCcpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYXBwbHktLWV4cGFuZGVkJyk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2FuY2VsLS1jb2xsYXBzZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19jYW5jZWwtLWV4cGFuZGVkJyk7XG5cbn07XG5cbmV4cG9ydCB7Y2FuY2VsQnV0dG9uQWN0aW9ufTtcbiIsIi8qIGNvbnNvbGVfY2xlYXIuanMsIHYuIDAuMS4wLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcblxuY29uc3QgY29uc29sZUNsZWFyID0gKCkgPT4ge1xuICAgIGNvbnNvbGVEaXNwbGF5LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQge2NvbnNvbGVDbGVhcn07XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjUsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMaXN0ZW4gPSAoKSA9PiB7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcblxuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZU1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvckNvbHVtbk5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMb2cgPSAoc3RyLCB2YWx1ZSkgPT4ge1xuXG4gICAgY29uc3QgbG9nID0gbmV3IEN1c3RvbUV2ZW50KCdsb2cnLCB7ZGV0YWlsOiBbc3RyLCB2YWx1ZV19KTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmRpc3BhdGNoRXZlbnQobG9nKTtcblxufVxuXG5leHBvcnQge2NvbnNvbGVMb2d9O1xuIiwiLyogZG9tX2VsZW1lbnRfbGlzdGVuLmpzLCB2LiAwLjEuMCwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJQb3B1cH0gZnJvbSAnLi9yZW5kZXJfcG9wdXAuanMnO1xuXG5jb25zdCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRsZXQgc3RhcnREYXRlO1xuXHRsZXQgdE9iajtcblx0bGV0IHN0YXJ0WDtcblx0bGV0IHN0YXJ0WTtcblx0bGV0IGVuZFg7XG5cdGxldCBlbmRZO1xuXHRsZXQgZGlzdFg7XG5cdGxldCBkaXN0WTtcblx0bGV0IG1heFggPSAwO1xuXHRsZXQgbWF4WSA9IDA7XG5cblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuXHRcdHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dE9iaiA9IGUudG91Y2hlc1swXTtcblx0XHRzdGFydFggPSB0T2JqLnBhZ2VYO1xuXHRcdHN0YXJ0WSA9IHRPYmoucGFnZVk7XG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG5cdFx0dE9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0ZW5kWCA9IHRPYmoucGFnZVg7XG5cdFx0ZW5kWSA9IHRPYmoucGFnZVk7XG5cdFx0ZGlzdFggPSBlbmRYIC0gc3RhcnRYO1xuXHRcdGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcblx0ICAgXG5cdFx0aWYgKE1hdGguYWJzKGRpc3RYKSA+IG1heFgpXG5cdFx0XHRtYXhYID0gTWF0aC5hYnMoZGlzdFgpO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFkpID4gbWF4WSlcblx0XHRcdG1heFkgPSBNYXRoLmFicyhkaXN0WSk7XG5cdCAgIFxuXHR9LCBmYWxzZSk7XG5cdHJvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG5cdCAgIFxuXHRcdGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IGRhdGVBbXAgPSBlbmREYXRlIC0gc3RhcnREYXRlO1xuXHQgICBcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAobWF4WSA8PSAzMCAmJiBtYXhYIDw9IDMwKSB7XG5cdFx0ICAgXG5cdFx0XHRpZiAoZGF0ZUFtcCA8PSAyMDApIHtcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpXG5cdFx0XHRcdHJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJylcblxuXHRcdFx0XHRpZiAoYXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpIHx8XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKSkge1xuXHRcdFx0XHRcdGFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVuZGVyUG9wdXAoZWxlbSwgcm93KTtcblx0XHRcdH1cblx0XHQgICBcblx0XHR9XG5cdCAgIFxuXHRcdG1heFggPSAwO1xuXHRcdG1heFkgPSAwO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7ZG9tRWxlbWVudExpc3Rlbn07XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjMsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5pbXBvcnQge2NvbnNvbGVDbGVhcn0gZnJvbSAnLi9jb25zb2xlX2NsZWFyLmpzJztcblxuY29uc3QgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmNvbnN0IGNsZWFyID0gY29uc29sZUNsZWFyO1xuXG5leHBvcnQge2xvZ307XG5leHBvcnQge2NsZWFyfTtcbiIsIi8qIGdsb2JhbF9ldmFsLmpzLCB2LiAwLjEuMCwgMzEuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuLy8gZXZhbCAtIHJ1bnMgYmxvY2sgc2NvcGUgZGVjbGFyYXRpb25zIHZpYSBzY3JpcHQgaW5qZWN0aW9uXG4vLyBvdGhlcndpc2Ugc3RhbmRhcmQgZXZhbCB1c2VkIFxuLy8gLSB0aGluayBpZiBub3QgdXNlIGluamVjdGlvbiBleGNsdXNpdmVseVxuLy8gcmV0dXJucyB2YWx1ZVxuY29uc3QgZ2xvYmFsRXZhbCA9IChzdHIpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JzsgLy8gcHJldmVudCBjcmVhdGluZyBsb2NhbCB2YXJpYWJsZXMgd2l0aCBzdGFuZGFyZCBldmFsXG4gICAgXG4gICAgaWYgKHN0ci5zdGFydHNXaXRoKCdsZXQgJykgfHwgc3RyLnN0YXJ0c1dpdGgoJ2NvbnN0ICcpKSB7IC8vIGNvZGUgZm9yIHNjcmlwdCBpbnNlcnRpb25cblxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpLnJlbW92ZSgpXG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LmlkID0gJ2R0X3NjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gcmV0dXJucyB1bmRlZmluZWQgd2hlbiBkZWNsYXJpbmcgYmxvY2sgc2NvcGVkIHZhcmlhYmxlXG4gICAgfSBlbHNlIHsgLy9zdGFuZGFyZCBldmFsXG4gICAgICAgIHJldHVybiAoMSwgZXZhbCkoc3RyKTsgLy8gaW5kaXJlY3QgY2FsbCB0byBhY2Nlc3MgZ2xvYmFsIHNjb3BlXG4gICAgfVxufVxuXG5leHBvcnQge2dsb2JhbEV2YWx9O1xuIiwiLyogaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMsIHYuIDAuMS4xLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBoaWdobGlnaHRCb3hBY3Rpb24gPSAoZWxlbWVudCwgcm93KSA9PiB7XG5cblx0Y29uc3QgcmVnZXhwMSA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IHJnYlxcKDE3MCwgMjIxLCAyNTVcXCkgXFwhaW1wb3J0YW50Lyk7XG5cdGNvbnN0IHJlZ2V4cDIgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiBcXCNhZGYgXFwhaW1wb3J0YW50Lyk7XG5cblx0aWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAxKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJlZ2V4cDEsICcnKTtcblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAyKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJlZ2V4cDIsICcnKTtcblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZC1jb2xvcjogI2FkZiAhaW1wb3J0YW50Jztcblx0XHRyb3cuc2V0QXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcsIHRydWUpO1xuXHR9XG5cbn07XG5cbmV4cG9ydCB7aGlnaGxpZ2h0Qm94QWN0aW9ufTtcblxuIiwiLyogbG9hZCBfc3R5bGVzLmpzIHYuIDAuMS4zLCAxOC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3J1bGVzfSBmcm9tICcuL3N0eWxlcy5qcyc7XG5pbXBvcnQge3JlbmRlclN0eWxlc30gZnJvbSAnLi9yZW5kZXJfc3R5bGVzLmpzJztcblxuY29uc3QgbG9hZFN0eWxlcyA9ICgpID0+IHtcblxuICAgIGNvbnN0IGdvb2dsZUZvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBnb29nbGVGb250LnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBnb29nbGVGb250LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGdvb2dsZUZvbnQubWVkaWEgPSAnc2NyZWVuJztcbiAgICBnb29nbGVGb250LmhyZWYgPSAnaHR0cHM6Ly9nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNwYWNlK01vbm86NDAwLDcwMCZhbXA7c3Vic2V0PWxhdGluLWV4dCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChnb29nbGVGb250KTtcblx0cmVuZGVyU3R5bGVzKHJ1bGVzKTtcbn07XG5cbmV4cG9ydCB7bG9hZFN0eWxlc307XG4iLCIvKiByZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgcmVuZGVyQXR0cklucHV0ID0gKGVsLCBkaXNwbGF5LCByb3csIG5hbWUsIHZhbHVlKSA9PiB7XG4gICBcblx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0Y29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgXG5cdGlucHV0LnR5cGUgPSAndGV4dCc7XG5cdGlucHV0LnZhbHVlID0gdmFsdWU7XG5cblx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdGlucHV0LnZhbHVlICs9ICc7JztcblxuXHRsYWJlbC5pbm5lclRleHQgPSBuYW1lO1xuXHRhcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJzonO1xuXHRsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1lbGVtZW50Jyk7XG5cdGxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWxhYmVsJyk7XG5cdGlucHV0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWlucHV0Jyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bicpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuXHRzZXBhcmF0b3IuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3Qtc2VwYXJhdG9yJyk7XG4gICBcblx0bGFiZWwuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yKTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXHRsYWJlbC5hcHBlbmRDaGlsZChhcHBseUJ0bik7XG5cdGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsKTtcblx0ZGlzcGxheS5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICBcblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgXG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuXHRcdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRcdGNvbnN0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRcdGNvbnN0IGxhYmVscyA9IGRpc3BsYXkucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRcdFtdLmZvckVhY2guY2FsbChsYWJlbHMsIChsYWJlbCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwuZmlyc3RDaGlsZC5kYXRhO1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cblx0XHRcdFx0XHRcdGlmIChpIDwgbGFiZWxzLmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0XHR9XG5cblx0fSwgZmFsc2UpO1xuXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0fSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdH0pO1xuXG5cdGFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgXG5cdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRjb25zdCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jylcblx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuXHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09IG5hbWUgJiYgZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRsZXQgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblxuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckF0dHJJbnB1dH07XG4iLCIvKiByZW5kZXJfYnJvd3Nlcl9pbmZvLmpzLCB2LiAwLjEuMSwgMTkuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IHJlbmRlckJyb3dzZXJJbmZvID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBicm93c2VySW5mb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBicm93c2VySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuaWQgPSAnYnJvd3Nlcic7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoYnJvd3NlckluZm9Db250YWluZXIsIGZhbHNlKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCBuYW1lOiAnICsgbmF2aWdhdG9yLmFwcENvZGVOYW1lICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgdmVyc2lvbjogJyArIG5hdmlnYXRvci5hcHBWZXJzaW9uICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5QbGF0Zm9ybTogJyArIG5hdmlnYXRvci5wbGF0Zm9ybSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+VXNlciBhZ2VudDogJyArIG5hdmlnYXRvci51c2VyQWdlbnQgKyAnPC9kaXY+JztcblxuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjQsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZUNvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzJztcblxuY29uc3QgY29uc29sZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5jb25zdCBjb25zb2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXRQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29uc29sZScpO1xuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXknKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVJbnB1dC5pZCA9ICdjb25zb2xlX2lucHV0JztcbmNvbnNvbGVJbnB1dC50eXBlID0gJ3RleHQnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdCcpO1xuY29uc29sZUNvbnRhaW5lci5pZCA9ICdjb25zb2xlJztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCcpO1xuXG5jb25zdCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIHJlbmRlckNvbnNvbGVDb250cm9scyhjb25zb2xlQ29udGFpbmVyKTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dFByb21wdCk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlRGlzcGxheSk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlSW5wdXQpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDb250YWluZXIpO1xuICAgIGNvbnNvbGVMaXN0ZW4oKTtcblxufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGV9O1xuZXhwb3J0IHtjb25zb2xlRGlzcGxheX07XG5leHBvcnQge2NvbnNvbGVJbnB1dH07XG4iLCIvKiByZW5kZXJfY29uc29sZV9jb250cm9scy5qcywgdi4gMC4xLjAsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUNsZWFyfSBmcm9tICcuL2NvbnNvbGVfY2xlYXIuanMnO1xuXG5jb25zdCBjb25zb2xlQ2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVDb250cm9sc1BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVDb250cm9scyA9IChjb250YWluZXIpID0+IHtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlQ29udHJvbHNQYW5lbCk7XG4gICAgY29uc29sZUNvbnRyb2xzUGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNsZWFyQnRuKTtcblx0Y29uc29sZUNvbnRyb2xzUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMnKTtcblx0Y29uc29sZUNsZWFyQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1jbGVhci1idG4nKTtcblx0Y29uc29sZUNsZWFyQnRuLmlubmVyVGV4dCA9IFwiQ2xlYXJcIjtcblx0Y29uc29sZUNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY29uc29sZUNsZWFyKCksIGZhbHNlKTtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlQ29udHJvbHN9O1xuIiwiLyogcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcywgdi4gMC4xLjEsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9vdXRwdXQuanMnO1xuXG5jb25zdCByZW5kZXJDb25zb2xlTWVzc2FnZSA9IChtc2dBcnJheSkgPT4ge1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pIHtcblxuICAgICAgICBjb25zdCBpbnB1dE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBpbnB1dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLWknKTtcbiAgICAgICAgaW5wdXRNZXNzYWdlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX21zZy1pcHJvbXB0XCI+PC9zcGFuPiR7bXNnQXJyYXlbMF19IGA7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dE1lc3NhZ2UpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZXR1cm5NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICByZXR1cm5NZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgcmV0dXJuTWVzc2FnZS5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLXJwcm9tcHRcIj48L3NwYW4+YDtcbiAgICByZW5kZXJDb25zb2xlT3V0cHV0KG1zZ0FycmF5WzFdLCByZXR1cm5NZXNzYWdlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmV0dXJuTWVzc2FnZSk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX07XG4iLCIvLyByZW5kZXJfY29uc29sZV9vdXRwdXQuanMsIHYuIDAuMS4zLCAxMTExMTExMTE3IEAgZmlsaXAtc3dpbmFyc2tpXG5cbmNvbnN0IHJlbmRlckNvbnNvbGVPdXRwdXQgPSAodmFsLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgaW5kZXgpID0+IHtcblxuICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgY2hlY2tTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zcGxpdCgnICcpWzFdO1xuICAgIGxldCBodG1sID0gJyc7XG5cbiAgICBjaGVja1N0ciA9IGNoZWNrU3RyLnN1YnN0cmluZygwLCBjaGVja1N0ci5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcbiAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtjaGVja1N0cn1gKTtcblx0XG4gICAgaWYgKGNoZWNrU3RyID09PSAnc3RyaW5nJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVsbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdzeW1ib2wnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgaHRtbCArPSBjaGVja1N0ciA9PT0gJ3N0cmluZycgPyBgXCIke3ZhbH1cImAgOiB2YWw7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICB9IGVsc2UgaWYgKGNoZWNrU3RyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09ICdhcnJheScgfHwgY2hlY2tTdHIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdmFsKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qga2V5Q2xhc3MgPSBjaGVja1N0ciA9PT0gJ2FycmF5JyA/ICdpbmRleCcgOiAna2V5JztcbiAgICAgICAgICAgIGxldCBjaGVja1N0cjIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsW2l0ZW1dKS5zcGxpdCgnICcpWzFdO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNoZWNrU3RyMiA9IGNoZWNrU3RyMi5zdWJzdHJpbmcoMCwgY2hlY2tTdHIyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cbiAgICAgICAgICAgIGlmIChjaGVja1N0cjIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudWxsJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdib29sZWFuJykge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyMn1gKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gY2hlY2tTdHIyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsW2l0ZW1dfVwiYCA6IHZhbFtpdGVtXTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKHZhbHVlRWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrU3RyMiA9PT0nZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2tleUNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ29uc29sZU91dHB1dCh2YWxbaXRlbV0sIG91dHB1dCwgaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgPSB2YWw7XG4gICAgfVxuXHRcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG91dHB1dCk7XG59O1xuXG5leHBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjksIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7ZG9tRWxlbWVudExpc3Rlbn0gZnJvbSAnLi9kb21fZWxlbWVudF9saXN0ZW4uanMnO1xuXG5jb25zdCByZW5kZXJET00gPSAoZWxlbSwgcGFyZW50RWwsIGxldmVsKSA9PiB7XG5cbiAgICBpZiAoZWxlbS5pZCA9PT0gJ2Rldl90b29scycpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgcm93MiA9IGVsZW0uY2hpbGRyZW4ubGVuZ3RoID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MUVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cxT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzFDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzJFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93Mk9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cyQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tb3BlbmluZycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jbG9zaW5nJyk7XG4gICAgXG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7IFxuICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzFDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93Mk9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MkNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cxT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPCc7XG4gICAgcm93MUNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MU9wZW5BcnJvdyk7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxRWxlbWVudFR5cGVTcGFuKTtcbiAgICBcbiAgICBpZiAoZWxlbS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYXR0ckVxdWFsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJWYWx1ZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5pbm5lclRleHQgPSBhdHRyLmxvY2FsTmFtZTtcbiAgICAgICAgICAgIGF0dHJFcXVhbFNwYW4uaW5uZXJUZXh0ID0gJz0nO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5pbm5lclRleHQgPSAnXCInICsgYXR0ci52YWx1ZSArICdcIic7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJOYW1lU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJFcXVhbFNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyVmFsdWVTcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVx0XG4gICAgXG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxQ2xvc2VBcnJvdyk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChyb3cxKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZXhwJyk7XG4gICAgXG4gICAgaWYgKGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICAgICAgdGV4dEVsLmlubmVyVGV4dCA9IGVsZW0udGV4dC50cmltKCk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG4gICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyRE9NKGVsLCB3cmFwcGVyLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcblx0ZG9tRWxlbWVudExpc3RlbihlbGVtLCByb3cxLCByb3cxT3BlbkFycm93KTtcbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbn1cbmV4cG9ydCB7cmVuZGVyRE9NfTtcbiIsIi8qIHJlbmRlcl9oZWFkZXIuanMsIHYuIDAuMS4xLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJIZWFkZXIgPSAoY29udGFpbmVyLCBleHBhbmRlZCkgPT4ge1xuICAgXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gY29udGFpbmVyLmlkO1xuICAgXG4gICAgaGVhZGVyLmlkID0gYCR7Y29udGFpbmVyLmlkfV9oZWFkZXJgO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X19oZWFkZXJgKTtcbiAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlYCk7XG4gICAgaGVhZGVyLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7dGl0bGV9X190aXRsZVwiPiR7dGl0bGV9PC9zcGFuPmA7XG4gICBcbiAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tZXhwYW5kZWRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1jb2xsYXBzZWRgKTtcbiAgICB9XG4gICBcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodG9nZ2xlQnRuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgIFxuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gW10uZmlsdGVyLmNhbGwoY29udGFpbmVyLmNoaWxkcmVuLCBlbCA9PiBlbC5pZCAhPT0gYCR7cGFyZW50LmlkfV9faGVhZGVyYCk7XG4gICAgICAgXG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWV4cGFuZGVkYCk7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWNvbGxhcHNlZGApO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tZXhwYW5kZWRgKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tY29sbGFwc2VkYCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVySGVhZGVyfTtcbiIsIi8qIHJlbmRlcl9pbnNwZWN0b3IuanMsIHYuIDAuMS42LCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckRPTX0gZnJvbSAnLi9yZW5kZXJfZG9tLmpzJztcbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5jb25zdCByZW5kZXJJbnNwZWN0b3IgPSAoYm9keSwgcGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGluc3BlY3RvckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBpbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaHRtbEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gICAgbGV0IGxldmVsID0gMDtcblxuICAgIGluc3BlY3RvckNvbnRhaW5lci5pZCA9ICdpbnNwZWN0b3InO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3InKTtcbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfX3BhbmVsJyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2Rpc3BsYXknKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmlkID0gJ2luc3BlY3Rvcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoaW5zcGVjdG9yQ29udGFpbmVyLCB0cnVlKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheS0tZXhwYW5kZWQnKTtcbiAgICBpbnNwZWN0b3JDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yRGlzcGxheSk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yQ29udGFpbmVyKTtcbiAgICByZW5kZXJET00oaHRtbEVsZW0sIGluc3BlY3RvckRpc3BsYXksIGxldmVsKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3J9O1xuIiwiLyogcmVuZGVyX3BvcHVwLmpzLCB2LiAwLjEuNCwgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJQb3B1cFNlY3Rpb259IGZyb20gJy4vcmVuZGVyX3BvcHVwX3NlY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJQb3B1cCA9IChlbGVtZW50LCByb3cpID0+IHtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXZfdG9vbHMnKTtcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNsb3NlQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBhdHRyaWJ1dGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBzdHlsZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHBvcHVwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBoaWdobGlnaHRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xuXHRwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3dyYXBwZXInKTtcbiAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2xvc2UnKTtcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAneCc7XG5cbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgfSwgZmFsc2UpO1xuXG5cdHJlbmRlclBvcHVwU2VjdGlvbignYXR0cl9saXN0JywgJ0F0dHJpYnV0ZXMnLCBlbGVtZW50LCByb3csIGF0dHJpYnV0ZUxpc3RXcmFwcGVyKTtcblx0cmVuZGVyUG9wdXBTZWN0aW9uKCdzdHlsZV9saXN0JywgJ0lubGluZSBzdHlsZXMnLCBlbGVtZW50LCByb3csIHN0eWxlTGlzdFdyYXBwZXIpO1xuXHRyZW5kZXJQb3B1cFNlY3Rpb24oJ2hpZ2hsaWdodF9zZWN0aW9uJywgJ0hpZ2hsaWdodCBlbGVtZW50JywgZWxlbWVudCwgcm93LCBoaWdobGlnaHRXcmFwcGVyKTtcblxuICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZUxpc3RXcmFwcGVyKTtcbiAgICBwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGlnaGxpZ2h0V3JhcHBlcik7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQocG9wdXBXcmFwcGVyKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xufTtcblxuZXhwb3J0IHtyZW5kZXJQb3B1cH07XG4iLCIvKiByZW5kZXJfcG9wdXBfc2VjdGlvbi5qcywgdi4gMC4xLjIsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQXR0cklucHV0fSBmcm9tICcuL3JlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMnO1xuaW1wb3J0IHthZGRCdXR0b25BY3Rpb259IGZyb20gJy4vYWRkX2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHthcHBseUJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9hcHBseV9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7Y2FuY2VsQnV0dG9uQWN0aW9ufSBmcm9tICcuL2NhbmNlbF9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7aGlnaGxpZ2h0Qm94QWN0aW9ufSBmcm9tICcuL2hpZ2hsaWdodF9ib3hfYWN0aW9uLmpzJztcblxuY29uc3QgcmVuZGVyUG9wdXBTZWN0aW9uID0gKGlkLCB0aXRsZSwgZWxlbWVudCwgcm93LCBsaXN0V3JhcHBlcikgPT4ge1xuXG5cdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgcmVnZXhwMSA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IHJnYlxcKDE3MCwgMjIxLCAyNTVcXCkgXFwhaW1wb3J0YW50Lyk7XG5cdGNvbnN0IHJlZ2V4cDIgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiBcXCNhZGYgXFwhaW1wb3J0YW50Lyk7XG5cdGxldCBzZWN0aW9uTmFtZSA9ICcnO1xuXG5cdGhlYWRlci5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJwb3B1cF9faGVhZGxpbmVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuXG5cdGlmIChpZCA9PT0gJ2F0dHJfbGlzdCcgfHwgaWQgPT09ICdzdHlsZV9saXN0Jykge1xuXG5cdFx0Y29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0Y29uc3QgYWRkQXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjb25zdCBhZGRDYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNvbnN0IHZhbHVlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNvbnN0IG5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0XHRjb25zdCB2YWx1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdGxldCBhcnI7XG5cdFx0XG5cdFx0aWYgKGlkID09PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0YXJyID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBhdHRyID0+IGF0dHIubmFtZSAhPT0gJ3N0eWxlJyk7XG5cdFx0XHRzZWN0aW9uTmFtZSA9ICdhdHRyaWJ1dGVzJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJyID0gW107XG5cdFx0XHRzZWN0aW9uTmFtZSA9ICdzdHlsZXMnO1xuXHRcdH1cblxuXHRcdGxpc3QuaWQgPSBpZDtcblx0XHRhZGRCdG4uaW5uZXJUZXh0ID0gJysnO1xuXHRcdGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkJyk7XG5cdFx0YWRkQXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0XHRhZGRDYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XG5cdFx0YWRkQXBwbHlCdG4uaWQgPSBgYWRkXyR7aWQucmVwbGFjZSgnX2xpc3QnLCAnJyl9X2J0bmA7XG5cdFx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5Jyk7XG5cdFx0YWRkQ2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jYW5jZWwnKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IG5hbWUgJyA6ICdhdHRyaWJ1dGUgbmFtZSAnO1xuXHRcdHZhbHVlSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IHZhbHVlICcgOiAnYXR0cmlidXRlIHZhbHVlICc7XG5cdFx0bmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdFx0bmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtaW5wdXQnKTtcblx0XHR2YWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdFx0dmFsdWVJbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWlucHV0Jyk7XG5cdFx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0XHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NhbmNlbC0tY29sbGFwc2VkJyk7XG5cdFx0bmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdFx0dmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRDYW5jZWxCdG4pO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRBcHBseUJ0bik7XG5cdFx0bmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblx0XHR2YWx1ZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dExhYmVsKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dExhYmVsKTtcblx0XHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChsaXN0KTtcblxuXHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnICYmIGVsZW1lbnQuYXR0cmlidXRlcyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUpIHtcblx0XHRcdGFyciA9ICcnLnNwbGl0LmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlLnZhbHVlLCAnOyAnKVxuXHRcdFx0YXJyID0gYXJyLm1hcChydWxlID0+IHJ1bGUucmVwbGFjZSgnOycsICcnKSk7XG5cblx0XHRcdGlmIChyb3cuaGFzQXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpKVxuXHRcdFx0XHRhcnIgPSBhcnIuZmlsdGVyKHJ1bGUgPT4gIXJ1bGUubWF0Y2gocmVnZXhwMSkgJiYgIXJ1bGUubWF0Y2gocmVnZXhwMikpO1xuXG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaXRlbSBpbiBhcnIpIHtcblx0XHRcdFxuXHRcdFx0bGV0IG5hbWU7XG5cdFx0XHRsZXQgdmFsdWU7XG5cblx0XHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cdFx0XHRcdG5hbWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMF07XG5cdFx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnNwbGl0KCc6ICcpWzFdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmFtZSA9IGFycltpdGVtXS5uYW1lO1xuXHRcdFx0XHR2YWx1ZSA9IGFycltpdGVtXS52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgbmFtZSwgdmFsdWUpO1xuXHRcdH1cblxuXHRcdGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRhZGRCdXR0b25BY3Rpb24oYWRkQXBwbHlCdG4sIGFkZENhbmNlbEJ0biwgbmFtZUlucHV0TGFiZWwsIHZhbHVlSW5wdXRMYWJlbCwgaGVhZGVyKTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0YWRkQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRhcHBseUJ1dHRvbkFjdGlvbihlbGVtZW50LCBhZGRBcHBseUJ0biwgdmFsdWVJbnB1dExhYmVsLCBuYW1lSW5wdXRMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcik7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdGFkZENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGNhbmNlbEJ1dHRvbkFjdGlvbihhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCB2YWx1ZUlucHV0TGFiZWwsIG5hbWVJbnB1dExhYmVsLCBoZWFkZXIpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSBlbHNlIGlmIChpZCA9PT0gJ2hpZ2hsaWdodF9zZWN0aW9uJykge1xuXG5cdFx0Y29uc3QgaGlnaGxpZ2h0Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXG5cdFx0c2VjdGlvbk5hbWUgPSAnaGlnaGxpZ2h0Jztcblx0XHRoaWdobGlnaHRDaGVja2JveC50eXBlID0gJ2NoZWNrYm94Jztcblx0XHRoaWdobGlnaHRDaGVja2JveC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9faGlnaGxpZ2h0Jyk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGhpZ2hsaWdodENoZWNrYm94KTtcblxuXHRcdGlmIChlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMSkgfHwgZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDIpKVxuXHRcdFx0aGlnaGxpZ2h0Q2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG5cblx0XHRoaWdobGlnaHRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG5cdFx0XHRoaWdobGlnaHRCb3hBY3Rpb24oZWxlbWVudCwgcm93KTtcblx0XHR9LCBmYWxzZSk7XG5cdH1cblxuXHRoZWFkZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2hlYWRlcicpO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXHRsaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fc2VjdGlvbicpO1xuXHRsaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKGBwb3B1cF9fc2VjdGlvbi0tJHtzZWN0aW9uTmFtZX1gKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyUG9wdXBTZWN0aW9ufTtcbiIsIi8qIHJlbmRlcl9zdHlsZXMuanMsIHYuIDAuMS4wLCAxOC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJTdHlsZXMgPSAocnVsZXMpID0+IHtcblxuICAgIGNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG5cbiAgICBydWxlcy5mb3JFYWNoKChydWxlLCBpKSA9PiB7c3R5bGVTaGVldC5zaGVldC5pbnNlcnRSdWxlKHJ1bGUsIGkpO30pO1xufTtcblxuZXhwb3J0IHtyZW5kZXJTdHlsZXN9O1xuIiwiLyogc3R5bGVzLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgcnVsZXMgPSBbXTtcblxuLyogYmFzZSB2LiAwLjEuNiAwMS4wNC4yMDE3IEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbnJ1bGVzLnB1c2goYC5ib2R5IHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzIHtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRmb250LWZhbWlseTogJ1NwYWNlIE1vbm8nLCBtb25vc3BhY2U7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19fcGFuZWwge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbi8qIGluc3BlY3RvciB2LiAwLjEuNiAyMS4wNC4yMDE3IEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2hlYWRlciB7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDEwcHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheSB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0b3ZlcmZsb3c6IGF1dG87XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXkgPiAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDQwMHB4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5LS1jb2xsYXBzZWQge1xuXHRoZWlnaHQ6IDA7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcblx0Ym9yZGVyLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3JvdyB7XG5cdHdoaXRlLXNwYWNlOiBub3dyYXA7IGNvbG9yOiAjNDQ0O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19yb3c6aG92ZXI6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICcnO1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAyMHB4O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdHotaW5kZXg6IC0xO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19yb3ctLW9wZW5pbmcge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQgfiAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZXhwIHtcblx0ZGlzcGxheTogbm9uZTtcblx0bWFyZ2luLWxlZnQ6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuIHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3Blbjo6YWZ0ZXIge1xuXHRjb250ZW50OiAnJztcblx0ZGlzcGxheTogbm9uZTtcblx0Ym9yZGVyLWxlZnQ6IDZweCBzb2xpZCAjYmJiO1xuXHRib3JkZXItdG9wOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1ib3R0b206IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDVweDtcblx0bGVmdDogLThweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZDo6YWZ0ZXIge1xuXHRkaXNwbGF5OiBibG9jaztcblx0dHJhbnNmb3JtOiByb3RhdGUoMCk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZDo6YWZ0ZXIge1xuXHRkaXNwbGF5OiBibG9jaztcblx0dHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctY2xvc2U6bGFzdC1jaGlsZCB7XG5cdHBhZGRpbmctcmlnaHQ6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1uYW1lIHtcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2F0dHItbmFtZSB7XG5cdGNvbG9yOiAjMDAwO1xuXHRwYWRkaW5nLWxlZnQ6IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fYXR0ci12YWx1ZSB7XG5cdGNvbG9yOiAjMDBmO1xufWApO1xuXG4vKiBjb25zb2xlIHYuIDAuMS42IDIxLjA0LjIwMTcgQCBmaWxpcC1zd2luYXJza2kgKi9cblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2hlYWRlciB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWNsZWFyLWJ0biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC1mYW1pbHk6IFwiU3BhY2UgTW9ub1wiLCBtb25vc3BhY2U7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzIHtcbiAgICBkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWV4cGFuZGVkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXkge1xuXHRvdmVyZmxvdzogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXktLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0IHtcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDJweCk7XG5cdGhlaWdodDogMzBweDtcblx0bWFyZ2luOiAwO1xuXHRwYWRkaW5nOiAwO1xuXHR0ZXh0LWluZGVudDogMzBweDtcblx0Ym9yZGVyLWJvdHRvbTogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogMzBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xuXHRwYWRkaW5nOiAwO1xuXHRtYXJnaW46IDA7XG5cdGJvcmRlci0tbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdGJvdHRvbTogMDtcblx0d2lkdGg6IDMwcHg7XG5cdGhlaWdodDogMzBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJz4+Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAzcHg7XG5cdGxlZnQ6IDVweDtcblx0aGVpZ2h0OiAxMHB4O1xuXHRjb2xvcjogI2FjYWNhYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pIHtcblx0Y29sb3I6ICNhY2FjYWM7XG5cdHBhZGRpbmc6IDVweCA1cHggNXB4IDI1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctciB7XG5cdGNvbG9yOiAjMDAwO1xuXHRwYWRkaW5nOiA1cHggNXB4IDVweCAyNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXItLWVyciB7XG5cdGNvbG9yOiAjYTkzMjI2O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYmQ4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXJwcm9tcHQge1xuXHR3aWR0aDogMjVweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRjb2xvcjogI2FjYWNhYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1ycHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPD0nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMjBweDtcblx0dG9wOiAzcHg7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pcHJvbXB0IHtcblx0d2lkdGg6IDI1cHg7IHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPj4nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMjBweDtcblx0Zm9udC1zaXplOiAxMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZXJyLXByb21wdCB7XG5cdHdpZHRoOiAyNXB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19lcnItcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAneCc7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IC0xN3B4O1xuXHR0b3A6IDA7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3VuZGVmaW5lZCB7XG5cdGNvbG9yOiAjYWRhZGFkO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbnVtYmVyIHtcblx0Y29sb3I6ICMwMDAwY2M7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19zdHJpbmcge1xuXHRjb2xvcjogI2NjNjYwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Jvb2xlYW4ge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX251bGwge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2tleSB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fa2V5OjphZnRlciB7XG5cdGNvbnRlbnQ6ICc6ICc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbmRleCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX192YWx1ZTpub3QoOmxhc3QtY2hpbGQpOjphZnRlciB7XG5cdGNvbnRlbnQ6ICcsICc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19hcnJheTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnXSc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19hcnJheTo6YmVmb3JlIHtcblx0Y29udGVudDogJ1snO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fb2JqZWN0OjphZnRlciB7XG5cdGNvbnRlbnQ6ICd9Jztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX29iamVjdDo6YmVmb3JlIHtcblx0Y29udGVudDogJ3snO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZi1uYW1lIHtcblx0Y29sb3I6ICMwMDk5ZmY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19mLWtleSB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG4vKiBicm93c2VyX2luZm8gdi4gMC4xLjIgMTUuMDQuMjAxNyBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9faGVhZGVyIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9fZGlzcGxheSB7XG5cdHBhZGRpbmc6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGRpbmctdG9wIHBhZGRpbmctYm90dG9tIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xuXHRwYWRkaW5nLXRvcDogMDtcblx0cGFkZGluZy1ib3R0b206IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG4vKiBwb3B1cCB2LiAwLjEuMiAwNS4wNS4yMDE3IEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbnJ1bGVzLnB1c2goYC5wb3B1cCB7XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuXHRoZWlnaHQ6IGF1dG87XG5cdHRvcDogNTAlO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNTAlKTtcblx0cGFkZGluZy1ib3R0b206IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fY2xvc2Uge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMDtcblx0cmlnaHQ6IDA7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDJweCA2cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0Zm9udC1zaXplOiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX3dyYXBwZXIge1xuXHRoZWlnaHQ6IGNhbGMoMTAwdmggLSA1NHB4KTtcblx0b3ZlcmZsb3cteDogaGlkZGVuO1xuXHRvdmVyZmxvdy15OiBzY3JvbGw7XG5cdG1hcmdpbi10b3A6IDI5cHg7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19oZWFkZXIge1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9faGVhZGVyLS1leHBhbmRlZCB7XG5cdHBhZGRpbmctYm90dG9tOiA0MHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2hlYWRsaW5lIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fYWRkIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRib3gtc2hhZG93OiBub25lO1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0cGFkZGluZzogMDtcblx0cmlnaHQ6IDVweDtcblx0dG9wOiA1cHg7XG5cdGZvbnQtc2l6ZTogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19hZGQtaW5wdXQge1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDlweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLXRvcDogNXB4O1xuXHRwYWRkaW5nLWxlZnQ6IDEwcHg7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fYXBwbHkge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiAxMHB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2FwcGx5LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19jYW5jZWwge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiA2NXB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYWNhY2FjO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjNDQ0O1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2NhbmNlbC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19jYW5jZWwtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3Qge1xuXHRsaXN0LXN0eWxlOiBub25lO1xuXHRtYXJnaW4tdG9wOiAwO1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRwYWRkaW5nLWxlZnQ6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9fbGlzdC1lbGVtZW50IHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtbGFiZWwge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19saXN0LXNlcGFyYXRvciB7XG5cdHBhZGRpbmctcmlnaHQ6IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19saXN0LWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lOyBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtaW5wdXQ6Zm9jdXMge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtYnRuIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0Ym9yZGVyOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJhY2tncm91bmQtY29sb3I6ICNhOTMyMjY7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0dG9wOiAwO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnBvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQge1xuXHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAucG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQge1xuXHR2aXNpYmlsaXR5OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5wb3B1cF9faGlnaGxpZ2h0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDEwcHg7XG5cdHJpZ2h0OiAycHg7XG59YCk7XG5cbmV4cG9ydCB7cnVsZXN9O1xuIl19
