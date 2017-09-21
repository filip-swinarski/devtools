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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* add_button_action.js, v. 0.1.2, 20.09.2017, @ filip-swinarski */

var addButtonAction = function addButtonAction(applyBtn, cancelBtn, nameLabel, valueLabel, header, prefix) {
	applyBtn.classList.remove(prefix + "__apply--collapsed");
	cancelBtn.classList.remove(prefix + "__cancel--collapsed");
	nameLabel.classList.remove(prefix + "__add-label--collapsed");
	valueLabel.classList.remove(prefix + "__add-label--collapsed");
	applyBtn.classList.add(prefix + "__apply--expanded");
	cancelBtn.classList.add(prefix + "__cancel--expanded");
	nameLabel.classList.add(prefix + "__add-label--expanded");
	valueLabel.classList.add(prefix + "__add-label--expanded");
	header.classList.add(prefix + "__header--expanded");
};

exports.addButtonAction = addButtonAction;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.applyButtonAction = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var applyButtonAction = function applyButtonAction(element, addBtn, cancelBtn, valueLabel, nameLabel, arr, list, row, header, prefix) {

	var separator = document.createElement('span');
	var valueInput = valueLabel.querySelector('input');
	var nameInput = nameLabel.querySelector('input');
	var value = valueInput.value;
	var name = nameInput.value;
	var attrValueElem = void 0;
	var attrNameElem = void 0;

	list.innerHTML = '';
	separator.innerText = '=';

	if (addBtn.id === 'add_attr_btn') attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), function (el) {
		return el.innerText === name;
	})[0];

	if (addBtn.id === 'add_style_btn') attrNameElem = [].filter.call(row.querySelectorAll('.inspector__attr-name'), function (el) {
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

	if (addBtn.id === 'add_attr_btn') {
		element.setAttribute(name, value);
		arr = [].filter.call(element.attributes, function (attr) {
			return attr.name !== 'style';
		});
		[].forEach.call(arr, function (attr) {
			(0, _render_attribute_input.renderAttrInput)(element, list, row, attr.name, attr.value, prefix);
		});
		attrNameElem.innerText = name;
		attrValueElem.innerText = '"' + value + '"';
	}

	if (addBtn.id === 'add_style_btn') {
		attrNameElem.innerText = 'style';
		element.style[name] = value;
		arr.push(name + ': ' + value + ';');
		attrValueElem.innerText = '"';
		[].forEach.call(arr, function (rule, i) {
			(0, _render_attribute_input.renderAttrInput)(element, list, row, rule.split(': ')[0], rule.split(': ')[1].replace(';', ''), prefix);

			if (i !== 0) attrValueElem.innerText += ' ';

			attrValueElem.innerText += rule.split(': ')[0] + ': ' + rule.split(': ')[1];

			if (i < arr.length - 1) attrValueElem.innerText += ';';
		});
		attrValueElem.innerText += '"';
	}

	attrNameElem.classList.add('inspector__attr-name');
	attrValueElem.classList.add('inspector__attr-value');
	nameLabel.classList.add(prefix + '__add-label--collapsed');
	nameLabel.classList.remove(prefix + '__add-label--expanded');
	header.classList.remove(prefix + '__header--expanded');
	valueLabel.classList.add(prefix + '__add-label--collapsed');
	valueLabel.classList.remove(prefix + '__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	addBtn.classList.add(prefix + '__apply--collapsed');
	addBtn.classList.remove(prefix + '__apply--expanded');
	cancelBtn.classList.add(prefix + '__cancel--collapsed');
	cancelBtn.classList.remove(prefix + '__cancel--expanded');
}; /* apply_button_action.js, v. 0.1.4, 21.09.2017, @ filip-swinarski */

exports.applyButtonAction = applyButtonAction;

},{"./render_attribute_input.js":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* cancel_button_action.js, v. 0.1.1, 20.09.2017, @ filip-swinarski */

var cancelButtonAction = function cancelButtonAction(applyBtn, cancelBtn, valueLabel, nameLabel, header, prefix) {

	var valueInput = valueLabel.querySelector('input');
	var nameInput = nameLabel.querySelector('input');

	nameLabel.classList.add(prefix + '__add-label--collapsed');
	nameLabel.classList.remove(prefix + '__add-label--expanded');
	header.classList.remove(prefix + '__header--expanded');
	valueLabel.classList.add(prefix + '__add-label--collapsed');
	valueLabel.classList.remove(prefix + '__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	applyBtn.classList.add(prefix + '__apply--collapsed');
	applyBtn.classList.remove(prefix + '__apply--expanded');
	cancelBtn.classList.add(prefix + '__cancel--collapsed');
	cancelBtn.classList.remove(prefix + '__cancel--expanded');
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

var _render_inspector_pane = require('./render_inspector_pane.js');

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
				(0, _render_inspector_pane.renderInspectorPane)(elem, row);
			}
		}

		maxX = 0;
		maxY = 0;
	}, false);
}; /* dom_element_listen.js, v. 0.1.1, 20.09.2017, @ filip-swinarski */

exports.domElementListen = domElementListen;

},{"./render_inspector_pane.js":22}],9:[function(require,module,exports){
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
/* highlight_box_action.js, v. 0.1.2, 21.09.2017, @ filip-swinarski */

var highlightBoxAction = function highlightBoxAction(element, row) {

	var regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	var regexp2 = new RegExp(/background-color: \#adf \!important/);
	var attrName = 'data-highlight';
	var backgroundColor = element.style.backgroundColor;

	if (element.style.cssText.match(regexp1)) {
		element.style.cssText = element.style.cssText.replace(regexp1, '');

		if (row.getAttribute(attrName) !== 'no-background') element.style.backgroundColor = row.getAttribute(attrName);else element.removeAttribute('style');

		row.removeAttribute(attrName);
	} else if (element.style.cssText.match(regexp2)) {
		element.style.cssText = element.style.cssText.replace(regexp2, '');

		if (row.getAttribute(attrName) !== 'no-background') element.style.backgroundColor = row.getAttribute('data-highlight');else element.removeAttribute('style');

		row.removeAttribute(attrName);
	} else {
		element.style.cssText += 'background-color: #adf !important';
		row.setAttribute(attrName, backgroundColor ? backgroundColor : 'no-background');
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
/* render_attribute_input.js, v. 0.1.2, 20.09.2017, @ filip-swinarski */

var renderAttrInput = function renderAttrInput(el, display, row, name, value, prefix) {

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
	listElement.classList.add(prefix + '__list-element');
	label.classList.add(prefix + '__list-label');
	input.classList.add(prefix + '__list-input');
	applyBtn.classList.add(prefix + '__list-btn');
	applyBtn.classList.add(prefix + '__list-btn--collapsed');
	separator.classList.add(prefix + '__list-separator');

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

			applyBtn.classList.remove(prefix + '__list-btn--expanded');
			applyBtn.classList.add(prefix + '__list-btn--collapsed');
		}
	}, false);

	input.addEventListener('focus', function (e) {
		applyBtn.classList.add(prefix + '__list-btn--expanded');
		applyBtn.classList.remove(prefix + '__list-btn--collapsed');
	});

	input.addEventListener('blur', function (e) {
		applyBtn.classList.remove(prefix + '__list-btn--expanded');
		applyBtn.classList.add(prefix + '__list-btn--collapsed');
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

		applyBtn.classList.remove(prefix + '__list-btn--expanded');
		applyBtn.classList.add(prefix + '__list-btn--collapsed');
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
exports.renderInspectorPane = undefined;

var _render_section = require('./render_section.js');

var renderInspectorPane = function renderInspectorPane(element, row) {

   var container = document.querySelector('#inspector');
   var inspectorPane = document.createElement('div');
   var closeBtn = document.createElement('div');
   var attributeListWrapper = document.createElement('div');
   var styleListWrapper = document.createElement('div');
   var inspectorPaneWrapper = document.createElement('div');
   var highlightWrapper = document.createElement('div');

   inspectorPane.classList.add('inspector-pane');
   inspectorPaneWrapper.classList.add('inspector-pane__wrapper');
   closeBtn.classList.add('inspector-pane__close');
   closeBtn.innerHTML = 'x';

   closeBtn.addEventListener('click', function () {
      inspectorPane.remove();
   }, false);

   (0, _render_section.renderSection)('attr_list', 'inspector-pane', 'Attributes', element, row, attributeListWrapper);
   (0, _render_section.renderSection)('style_list', 'inspector-pane', 'Inline styles', element, row, styleListWrapper);
   (0, _render_section.renderSection)('highlight_section', 'inspector-pane', 'Highlight element', element, row, highlightWrapper);

   inspectorPane.appendChild(closeBtn);
   inspectorPaneWrapper.appendChild(attributeListWrapper);
   inspectorPaneWrapper.appendChild(styleListWrapper);
   inspectorPaneWrapper.appendChild(highlightWrapper);
   inspectorPane.appendChild(inspectorPaneWrapper);
   container.appendChild(inspectorPane);
}; /* render_inspector_pane.js, v. 0.1.4, 18.09.2017, @ filip-swinarski */

exports.renderInspectorPane = renderInspectorPane;

},{"./render_section.js":23}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderSection = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var _add_button_action = require('./add_button_action.js');

var _apply_button_action = require('./apply_button_action.js');

var _cancel_button_action = require('./cancel_button_action.js');

var _highlight_box_action = require('./highlight_box_action.js');

var renderSection = function renderSection(id, prefix, title, element, row, listWrapper) {

	var list = document.createElement('ul');
	var header = document.createElement('div');
	var regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	var regexp2 = new RegExp(/background-color: \#adf \!important/);
	var sectionName = '';

	header.innerHTML = '<span class="' + prefix + '__headline">' + title + '</span>';
	listWrapper.appendChild(header);
	list.classList.add(prefix + '__list');

	if (id === 'attr_list' || id === 'style_list') {

		var addBtn = document.createElement('button');
		var addApplyBtn = document.createElement('button');
		var addCancelBtn = document.createElement('button');
		var nameInput = document.createElement('input');
		var valueInput = document.createElement('input');
		var nameInputLabel = document.createElement('label');
		var valueInputLabel = document.createElement('label');
		var arr = void 0;

		listWrapper.appendChild(list);

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
		addBtn.classList.add(prefix + '__add');
		addApplyBtn.innerText = 'Apply';
		addCancelBtn.innerText = 'Cancel';
		addApplyBtn.id = 'add_' + id.replace('_list', '') + '_btn';
		addApplyBtn.classList.add(prefix + '__apply');
		addCancelBtn.classList.add(prefix + '__cancel');
		nameInputLabel.innerText = id === 'style_list' ? 'property name ' : 'attribute name ';
		valueInputLabel.innerText = id === 'style_list' ? 'property value ' : 'attribute value ';
		nameInput.type = 'text';
		nameInput.classList.add(prefix + '__add-input');
		valueInput.type = 'text';
		valueInput.classList.add(prefix + '__add-input');
		addApplyBtn.classList.add(prefix + '__apply--collapsed');
		addCancelBtn.classList.add(prefix + '__cancel--collapsed');
		nameInputLabel.classList.add(prefix + '__add-label--collapsed');
		valueInputLabel.classList.add(prefix + '__add-label--collapsed');
		header.appendChild(addBtn);
		header.appendChild(addCancelBtn);
		header.appendChild(addApplyBtn);
		nameInputLabel.appendChild(nameInput);
		valueInputLabel.appendChild(valueInput);
		header.appendChild(nameInputLabel);
		header.appendChild(valueInputLabel);

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

			(0, _render_attribute_input.renderAttrInput)(element, list, row, name, value, prefix);
		}

		addBtn.addEventListener('click', function (e) {
			(0, _add_button_action.addButtonAction)(addApplyBtn, addCancelBtn, nameInputLabel, valueInputLabel, header, prefix);
		}, false);
		addApplyBtn.addEventListener('click', function () {
			(0, _apply_button_action.applyButtonAction)(element, addApplyBtn, addCancelBtn, valueInputLabel, nameInputLabel, arr, list, row, header, prefix);
		}, false);
		addCancelBtn.addEventListener('click', function () {
			(0, _cancel_button_action.cancelButtonAction)(addApplyBtn, addCancelBtn, valueInputLabel, nameInputLabel, header, prefix);
		}, false);
	} else if (id === 'highlight_section') {

		var highlightCheckbox = document.createElement('input');

		sectionName = 'highlight';
		highlightCheckbox.type = 'checkbox';
		highlightCheckbox.classList.add(prefix + '__highlight');
		header.appendChild(highlightCheckbox);

		if (element.style.cssText.match(regexp1) || element.style.cssText.match(regexp2)) highlightCheckbox.checked = true;

		highlightCheckbox.addEventListener('change', function () {
			(0, _highlight_box_action.highlightBoxAction)(element, row);
		}, false);
	}

	header.classList.add(prefix + '__header');
	listWrapper.classList.add(prefix + '__section');
	listWrapper.classList.add(prefix + '__section--' + sectionName);
}; /* render_section.js, v. 0.1.2, 21.09.2017, @ filip-swinarski */

exports.renderSection = renderSection;

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
/* styles.js, v. 0.1.6, 21.09.2017, @ filip-swinarski */

var rules = [];

/* base */

rules.push(".body {\n\twidth: 100%;\n\theight: 100%;\n}");

rules.push(".tools {\n\tfont-size: 14px;\n\tfont-family: 'Space Mono', monospace;\n\tbackground-color: #fff;\n}");

rules.push(".tools__panel {\n\tposition: relative;\n}");

/* inspector */

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

/* console */

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

/* browser_info */

rules.push(".browser__header {\n\tborder: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".browser__display {\n\tpadding: 10px; overflow: hidden;\n}");

rules.push(".browser__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\theight: 400px;\n\ttransition: height padding-top padding-bottom .5s;\n}");

rules.push(".browser__display--collapsed {\n\theight: 0;\n\ttransition: height pading-top padding-bottom .5s;\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

/* inspector_pane */

rules.push(".inspector-pane {\n\tposition: absolute;\n\tbackground-color: #fff;\n\twidth: calc(100% - 2px);\n\theight: 400px;\n\ttop: 39px;\n\tleft: 1px;\n\toverflow-y: auto;\n}");

rules.push(".inspector-pane__close {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #bcbcbc;\n\tborder-left: 1px solid #bcbcbc;\n\tpadding: 6px 5px 7px 5px;\n\tcursor: pointer;\n\tfont-size: 20px;\n\tz-index: 1;\n}");

rules.push(".inspector-pane__wrapper {\n\theight: 400px;\n\toverflow-x: hidden;\n\toverflow-y: scroll;\n\tposition: relative;\n}");

rules.push(".inspector-pane__header {\n\tpadding: 10px 10px 5px 10px;\n\tposition: relative;\n\tborder-bottom: 1px solid #efefef;\n\tborder-top: 1px solid #efefef;\n}");

rules.push(".inspector-pane__section:first-child .inspector-pane__header {\n\tborder-top: 0 none transparent;\n}");

rules.push(".inspector-pane__section:last-child .inspector-pane__header:last-child {\n\tborder-bottom: 0 none transparent;\n}");

rules.push(".inspector-pane__header--expanded {\n\tpadding-bottom: 40px;\n}");

rules.push(".inspector-pane__headline {\n\tdisplay: block;\n\tpadding-bottom: 5px;\n}");

rules.push(".inspector-pane__add {\n\tposition: absolute;\n\t-moz-appearance: none;\n\tbackground-color: transparent;\n\tbox-shadow: none;\n\tborder: 0 none transparent;\n\tpadding: 0;\n\tright: 5px;\n\ttop: 5px;\n\tfont-size: 20px;\n}");

rules.push(".inspector-pane__section:first-child .inspector-pane__add {\n\tright: 32px;\n}");

rules.push(".inspector-pane__add-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #bcbcbc;\n\tposition: absolute;\n\tright: 9px;\n\tfont-family: \"Space Mono\",monospace;\n\tfont-size: 14px;\n}");

rules.push(".inspector-pane__add-label--collapsed {\n\tdisplay: none;\n}");

rules.push(".inspector-pane__add-label--expanded {\n\tdisplay: block;\n\tpadding-top: 5px;\n\tpadding-left: 10px;\n\tpadding-bottom: 5px;\n}");

rules.push(".inspector-pane__apply {\n\tposition: absolute;\n\tright: 10px;\n\ttop: 94px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".inspector-pane__apply--collapsed {\n\tdisplay: none;\n}");

rules.push(".inspector-pane__apply--expanded {\n\tdisplay: inline-block;\n}");

rules.push(".inspector-pane__cancel {\n\tposition: absolute;\n\tright: 65px;\n\ttop: 94px;\n\tborder: 0 none transparent;\n\tbackground-color: #acacac;\n\t-moz-appearance: none;\n\tcolor: #444;\n\tpadding: 0 10px 4px;\n}");

rules.push(".inspector-pane__cancel--collapsed {\n\tdisplay: none;\n}");

rules.push(".inspector-pane__cancel--expanded {\n\tdisplay: inline-block;\n}");

rules.push(".inspector-pane__list {\n\tlist-style: none;\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n\tpadding-left: 20px;\n}");

rules.push(".inspector-pane__list-element {\n\tposition: relative;\n}");

rules.push(".inspector-pane__list-label {\n\tdisplay: block;\n\tcolor: #800080;\n}");

rules.push(".inspector-pane__list-separator {\n\tpadding-right: 5px;\n\tcolor: #000;\n}");

rules.push(".inspector-pane__list-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #fff;\n\tfont-family: \"Space Mono\",monospace;\n\tfont-size: 14px;\n\tcolor: #00f;\n}");

rules.push(".inspector-pane__list-input:focus {\n\tborder: 1px solid #bcbcbc;\n\tcolor: #fff;\n\tbackground-color: #eee;\n\tcolor: #fff;\n\tbox-shadow: inset 0 0 2px 1px #fff;\n}");

rules.push(".inspector-pane__list-btn {\n\tposition: absolute;\n\tright: 10px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\ttop: 0;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".inspector-pane__list-btn--expanded {\n\tvisibility: visible;\n}");

rules.push(".inspector-pane__list-btn--collapsed {\n\tvisibility: hidden;\n}");

rules.push(".inspector-pane__highlight {\n\tposition: absolute;\n\ttop: 10px;\n\tright: 2px;\n}");

exports.rules = rules;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsb2FkX3N0eWxlcy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9vdXRwdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfZG9tLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2hlYWRlci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3IuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfc2VjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxzdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxJQUFJLE9BQU8sT0FBWCxFQUNDLE9BQU8sU0FBUCxHQUFtQixTQUFuQixDQURELEtBR0MsT0FBTyxPQUFQLEdBQWlCLFNBQWpCOzs7Ozs7OztBQ3ZCRDs7QUFFQSxJQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFNBQXRCLEVBQWlDLFVBQWpDLEVBQTZDLE1BQTdDLEVBQXFELE1BQXJELEVBQWdFO0FBQ3ZGLFVBQVMsU0FBVCxDQUFtQixNQUFuQixDQUE2QixNQUE3QjtBQUNBLFdBQVUsU0FBVixDQUFvQixNQUFwQixDQUE4QixNQUE5QjtBQUNBLFdBQVUsU0FBVixDQUFvQixNQUFwQixDQUE4QixNQUE5QjtBQUNBLFlBQVcsU0FBWCxDQUFxQixNQUFyQixDQUErQixNQUEvQjtBQUNBLFVBQVMsU0FBVCxDQUFtQixHQUFuQixDQUEwQixNQUExQjtBQUNBLFdB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UVEsWSxHQUFBLFk7Ozs7Ozs7O0FDVlI7O0FBRUEsSUFBTSxRQUFRLEVBQWQ7O0FBRUE7O0FBRUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBSUE7O0FBRUEsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBSUE7O0FBRUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFhQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFVQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBOztBQUVBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFTQTs7QUFFQSxNQUFNLElBQU47O0FBVUEsTUFBTSxJQUFOOztBQWFBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFZQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztRQU1RLEssR0FBQSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIG1haW4uanMgMC4xLjIgMTkuMDkuMjAxNyBAIGZpbGlwIHN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2xvYWRTdHlsZXN9IGZyb20gJy4vbW9kdWxlcy9sb2FkX3N0eWxlcy5qcyc7XG5pbXBvcnQge3JlbmRlckluc3BlY3Rvcn0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9pbnNwZWN0b3IuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJCcm93c2VySW5mb30gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9icm93c2VyX2luZm8uanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgRFRDb25zb2xlIGZyb20gJy4vbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyc7XG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnRhaW5lci5pZCA9ICdkZXZfdG9vbHMnO1xuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzJyk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5sb2FkU3R5bGVzKCk7XG5yZW5kZXJJbnNwZWN0b3IoYm9keSwgY29udGFpbmVyKTtcbnJlbmRlckNvbnNvbGUoY29udGFpbmVyKTtcbnJlbmRlckJyb3dzZXJJbmZvKGNvbnRhaW5lcik7XG5cbmlmICh3aW5kb3cuY29uc29sZSlcblx0d2luZG93LkRUQ29uc29sZSA9IERUQ29uc29sZTtcbmVsc2Vcblx0d2luZG93LmNvbnNvbGUgPSBEVENvbnNvbGU7XG4iLCIvKiBhZGRfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjIsIDIwLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IGFkZEJ1dHRvbkFjdGlvbiA9IChhcHBseUJ0biwgY2FuY2VsQnRuLCBuYW1lTGFiZWwsIHZhbHVlTGFiZWwsIGhlYWRlciwgcHJlZml4KSA9PiB7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYXBwbHktLWNvbGxhcHNlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19jYW5jZWwtLWNvbGxhcHNlZGApO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseS0tZXhwYW5kZWRgKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fY2FuY2VsLS1leHBhbmRlZGApO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2hlYWRlci0tZXhwYW5kZWRgKTtcbn07XG5cbmV4cG9ydCB7YWRkQnV0dG9uQWN0aW9ufTtcblxuIiwiLyogYXBwbHlfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjQsIDIxLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQXR0cklucHV0fSBmcm9tICcuL3JlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMnO1xuXG5jb25zdCBhcHBseUJ1dHRvbkFjdGlvbiA9IChlbGVtZW50LCBhZGRCdG4sIGNhbmNlbEJ0biwgdmFsdWVMYWJlbCwgbmFtZUxhYmVsLCBhcnIsIGxpc3QsIHJvdywgaGVhZGVyLCBwcmVmaXgpID0+IHtcblxuXHRjb25zdCBzZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdGNvbnN0IHZhbHVlSW5wdXQgPSB2YWx1ZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGNvbnN0IG5hbWVJbnB1dCA9IG5hbWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCB2YWx1ZSA9IHZhbHVlSW5wdXQudmFsdWU7XG5cdGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XG5cdGxldCBhdHRyVmFsdWVFbGVtO1xuXHRsZXQgYXR0ck5hbWVFbGVtO1xuXG5cdGxpc3QuaW5uZXJIVE1MID0gJyc7XG5cdHNlcGFyYXRvci5pbm5lclRleHQgPSAnPSc7XG5cblx0aWYgKGFkZEJ0bi5pZCA9PT0gJ2FkZF9hdHRyX2J0bicpXG5cdFx0YXR0ck5hbWVFbGVtID0gW10uZmlsdGVyLmNhbGwocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gbmFtZSlbMF07XG5cblx0aWYgKGFkZEJ0bi5pZCA9PT0gJ2FkZF9zdHlsZV9idG4nKVxuXHRcdGF0dHJOYW1lRWxlbSA9IFtdLmZpbHRlci5jYWxsKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKSwgKGVsKSA9PiBlbC5pbm5lclRleHQgPT09ICdzdHlsZScpWzBdO1xuXG5cdGlmIChhdHRyVmFsdWVFbGVtKSB7XG5cdFx0YXR0clZhbHVlRWxlbSA9IGF0dHJOYW1lRWxlbS5uZXh0U2libGluZy5uZXh0U2libGluZztcblx0fSBlbHNlIHtcblx0XHRhdHRyVmFsdWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGF0dHJOYW1lRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKGF0dHJOYW1lRWxlbSwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShzZXBhcmF0b3IsIHJvdy5sYXN0Q2hpbGQpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0clZhbHVlRWxlbSwgcm93Lmxhc3RDaGlsZCk7XG5cdH1cblxuXHRpZiAoYWRkQnRuLmlkID09PSAnYWRkX2F0dHJfYnRuJykge1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHRhcnIgPSBbXS5maWx0ZXIuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGF0dHIgPT4gYXR0ci5uYW1lICE9PSAnc3R5bGUnKTtcblx0XHRbXS5mb3JFYWNoLmNhbGwoYXJyLCAoYXR0cikgPT4ge1xuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgYXR0ci5uYW1lLCBhdHRyLnZhbHVlLCBwcmVmaXgpO1xuXHRcdH0pO1xuXHRcdGF0dHJOYW1lRWxlbS5pbm5lclRleHQgPSBuYW1lO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdH1cblxuXHRpZiAoYWRkQnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpIHtcblx0XHRhdHRyTmFtZUVsZW0uaW5uZXJUZXh0ID0gJ3N0eWxlJztcblx0XHRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG5cdFx0YXJyLnB1c2goYCR7bmFtZX06ICR7dmFsdWV9O2ApO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gJ1wiJztcblx0XHRbXS5mb3JFYWNoLmNhbGwoYXJyLCAocnVsZSwgaSkgPT4ge1xuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgcnVsZS5zcGxpdCgnOiAnKVswXSwgcnVsZS5zcGxpdCgnOiAnKVsxXS5yZXBsYWNlKCc7JywgJycpLCBwcmVmaXgpO1xuXG5cdFx0XHRpZihpICE9PSAwKVxuXHRcdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnICc7XG5cblx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9IGAke3J1bGUuc3BsaXQoJzogJylbMF19OiAke3J1bGUuc3BsaXQoJzogJylbMV19YDtcblxuXHRcdFx0aWYgKGkgPCBhcnIubGVuZ3RoIC0gMSlcblx0XHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJzsnO1xuXHRcdFx0XHRcblx0XHR9KTtcblx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnXCInO1xuXHR9XG5cblx0YXR0ck5hbWVFbGVtLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG5cdGF0dHJWYWx1ZUVsZW0uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0aGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9faGVhZGVyLS1leHBhbmRlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0bmFtZUlucHV0LnZhbHVlID0gJyc7XG5cdHZhbHVlSW5wdXQudmFsdWUgPSAnJztcblx0YWRkQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYXBwbHktLWNvbGxhcHNlZGApO1xuXHRhZGRCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hcHBseS0tZXhwYW5kZWRgKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fY2FuY2VsLS1jb2xsYXBzZWRgKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fY2FuY2VsLS1leHBhbmRlZGApO1xufTtcblxuZXhwb3J0IHthcHBseUJ1dHRvbkFjdGlvbn07XG4iLCIvKiBjYW5jZWxfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjEsIDIwLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IGNhbmNlbEJ1dHRvbkFjdGlvbiA9IChhcHBseUJ0biwgY2FuY2VsQnRuLCB2YWx1ZUxhYmVsLCBuYW1lTGFiZWwsIGhlYWRlciwgcHJlZml4KSA9PiB7XG5cblx0Y29uc3QgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19oZWFkZXItLWV4cGFuZGVkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FwcGx5LS1jb2xsYXBzZWRgKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hcHBseS0tZXhwYW5kZWRgKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fY2FuY2VsLS1jb2xsYXBzZWRgKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fY2FuY2VsLS1leHBhbmRlZGApO1xuXG59O1xuXG5leHBvcnQge2NhbmNlbEJ1dHRvbkFjdGlvbn07XG4iLCIvKiBjb25zb2xlX2NsZWFyLmpzLCB2LiAwLjEuMCwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmNvbnN0IGNvbnNvbGVDbGVhciA9ICgpID0+IHtcbiAgICBjb25zb2xlRGlzcGxheS5pbm5lckhUTUwgPSAnJztcbn1cblxuZXhwb3J0IHtjb25zb2xlQ2xlYXJ9O1xuIiwiLyogY29uc29sZV9saXN0ZW4uanMsIHYuIDAuMS41LCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7Y29uc29sZUlucHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZU1lc3NhZ2V9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5jb25zdCBjb25zb2xlTGlzdGVuID0gKCkgPT4ge1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycm9yKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yU291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvckxpbmVObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JDb2x1bW5ObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3JvdycpO1xuICAgICAgICBlcnJvclByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItcHJvbXB0Jyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctcicpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXItLWVycicpO1xuICAgICAgICBlcnJvck1lc3NhZ2VNc2cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLW1zZycpO1xuICAgICAgICBlcnJvclNvdXJjZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItc3JjJyk7XG4gICAgICAgIGVycm9yTGluZU5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1saW5lbm8nKTtcbiAgICAgICAgZXJyb3JDb2x1bW5Oby5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItY29sdW1ubm8nKTtcblxuICAgICAgICBlcnJvck1lc3NhZ2VNc2cuaW5uZXJIVE1MICs9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIGVycm9yU291cmNlLmlubmVySFRNTCArPSBlcnJvci5maWxlbmFtZTtcbiAgICAgICAgZXJyb3JMaW5lTm8uaW5uZXJIVE1MICs9IGVycm9yLmxpbmVubztcbiAgICAgICAgZXJyb3JDb2x1bW5Oby5pbm5lckhUTUwgKz0gZXJyb3IuY29sdW1ubm87XG5cbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yUHJvbXB0KTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZU1zZyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvclNvdXJjZSk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvckxpbmVObyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvckNvbHVtbk5vKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZURpc3BsYXkuYWRkRXZlbnRMaXN0ZW5lcignbG9nJywgKGUpID0+IHtcblxuICAgICAgICBjb25zdCByb3cgPSByZW5kZXJDb25zb2xlTWVzc2FnZShlLmRldGFpbCk7XG5cbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3JvdycpO1xuICAgICAgICBjb25zb2xlRGlzcGxheS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnNvbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGdsb2JhbEV2YWwoY29uc29sZUlucHV0LnZhbHVlKTtcblxuICAgICAgICAgICAgRFRDb25zb2xlLmxvZyh2YWx1ZSwgY29uc29sZUlucHV0LnZhbHVlKTtcdFxuICAgICAgICAgICAgY29uc29sZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxpc3Rlbn07XG4iLCIvKiBjb25zb2xlX2xvZy5qcywgdi4gMC4xLjIsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5jb25zdCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGNvbnN0IGxvZyA9IG5ldyBDdXN0b21FdmVudCgnbG9nJywge2RldGFpbDogW3N0ciwgdmFsdWVdfSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5kaXNwYXRjaEV2ZW50KGxvZyk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTG9nfTtcbiIsIi8qIGRvbV9lbGVtZW50X2xpc3Rlbi5qcywgdi4gMC4xLjEsIDIwLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySW5zcGVjdG9yUGFuZX0gZnJvbSAnLi9yZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMnO1xuXG5jb25zdCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRsZXQgc3RhcnREYXRlO1xuXHRsZXQgdE9iajtcblx0bGV0IHN0YXJ0WDtcblx0bGV0IHN0YXJ0WTtcblx0bGV0IGVuZFg7XG5cdGxldCBlbmRZO1xuXHRsZXQgZGlzdFg7XG5cdGxldCBkaXN0WTtcblx0bGV0IG1heFggPSAwO1xuXHRsZXQgbWF4WSA9IDA7XG5cblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuXHRcdHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dE9iaiA9IGUudG91Y2hlc1swXTtcblx0XHRzdGFydFggPSB0T2JqLnBhZ2VYO1xuXHRcdHN0YXJ0WSA9IHRPYmoucGFnZVk7XG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG5cdFx0dE9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0ZW5kWCA9IHRPYmoucGFnZVg7XG5cdFx0ZW5kWSA9IHRPYmoucGFnZVk7XG5cdFx0ZGlzdFggPSBlbmRYIC0gc3RhcnRYO1xuXHRcdGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcblx0ICAgXG5cdFx0aWYgKE1hdGguYWJzKGRpc3RYKSA+IG1heFgpXG5cdFx0XHRtYXhYID0gTWF0aC5hYnMoZGlzdFgpO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFkpID4gbWF4WSlcblx0XHRcdG1heFkgPSBNYXRoLmFicyhkaXN0WSk7XG5cdCAgIFxuXHR9LCBmYWxzZSk7XG5cdHJvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG5cdCAgIFxuXHRcdGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IGRhdGVBbXAgPSBlbmREYXRlIC0gc3RhcnREYXRlO1xuXHQgICBcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAobWF4WSA8PSAzMCAmJiBtYXhYIDw9IDMwKSB7XG5cdFx0ICAgXG5cdFx0XHRpZiAoZGF0ZUFtcCA8PSAyMDApIHtcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpXG5cdFx0XHRcdHJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJylcblxuXHRcdFx0XHRpZiAoYXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpIHx8XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKSkge1xuXHRcdFx0XHRcdGFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVuZGVySW5zcGVjdG9yUGFuZShlbGVtLCByb3cpO1xuXHRcdFx0fVxuXHRcdCAgIFxuXHRcdH1cblx0ICAgXG5cdFx0bWF4WCA9IDA7XG5cdFx0bWF4WSA9IDA7XG5cblx0fSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtkb21FbGVtZW50TGlzdGVufTtcbiIsIi8qIGR0X2NvbnNvbGVfYXBpLmpzLCB2LiAwLjEuMywgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTG9nfSBmcm9tICcuL2NvbnNvbGVfbG9nLmpzJztcbmltcG9ydCB7Y29uc29sZUNsZWFyfSBmcm9tICcuL2NvbnNvbGVfY2xlYXIuanMnO1xuXG5jb25zdCBsb2cgPSAodmFsdWUsIHN0ciA9ICcnKSA9PiB7XG4gICAgY29uc29sZUxvZyhzdHIsIHZhbHVlKTtcbn1cblxuY29uc3QgY2xlYXIgPSBjb25zb2xlQ2xlYXI7XG5cbmV4cG9ydCB7bG9nfTtcbmV4cG9ydCB7Y2xlYXJ9O1xuIiwiLyogZ2xvYmFsX2V2YWwuanMsIHYuIDAuMS4wLCAzMS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG4vLyBldmFsIC0gcnVucyBibG9jayBzY29wZSBkZWNsYXJhdGlvbnMgdmlhIHNjcmlwdCBpbmplY3Rpb25cbi8vIG90aGVyd2lzZSBzdGFuZGFyZCBldmFsIHVzZWQgXG4vLyAtIHRoaW5rIGlmIG5vdCB1c2UgaW5qZWN0aW9uIGV4Y2x1c2l2ZWx5XG4vLyByZXR1cm5zIHZhbHVlXG5jb25zdCBnbG9iYWxFdmFsID0gKHN0cikgPT4ge1xuXG4gICAgJ3VzZSBzdHJpY3QnOyAvLyBwcmV2ZW50IGNyZWF0aW5nIGxvY2FsIHZhcmlhYmxlcyB3aXRoIHN0YW5kYXJkIGV2YWxcbiAgICBcbiAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ2xldCAnKSB8fCBzdHIuc3RhcnRzV2l0aCgnY29uc3QgJykpIHsgLy8gY29kZSBmb3Igc2NyaXB0IGluc2VydGlvblxuXG4gICAgICAgIGxldCBzY3JpcHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykucmVtb3ZlKClcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuaWQgPSAnZHRfc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmlubmVyVGV4dCA9IHN0cjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyByZXR1cm5zIHVuZGVmaW5lZCB3aGVuIGRlY2xhcmluZyBibG9jayBzY29wZWQgdmFyaWFibGVcbiAgICB9IGVsc2UgeyAvL3N0YW5kYXJkIGV2YWxcbiAgICAgICAgcmV0dXJuICgxLCBldmFsKShzdHIpOyAvLyBpbmRpcmVjdCBjYWxsIHRvIGFjY2VzcyBnbG9iYWwgc2NvcGVcbiAgICB9XG59XG5cbmV4cG9ydCB7Z2xvYmFsRXZhbH07XG4iLCIvKiBoaWdobGlnaHRfYm94X2FjdGlvbi5qcywgdi4gMC4xLjIsIDIxLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IGhpZ2hsaWdodEJveEFjdGlvbiA9IChlbGVtZW50LCByb3cpID0+IHtcblxuXHRjb25zdCByZWdleHAxID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogcmdiXFwoMTcwLCAyMjEsIDI1NVxcKSBcXCFpbXBvcnRhbnQvKTtcblx0Y29uc3QgcmVnZXhwMiA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IFxcI2FkZiBcXCFpbXBvcnRhbnQvKTtcblx0Y29uc3QgYXR0ck5hbWUgPSAnZGF0YS1oaWdobGlnaHQnO1xuXHRsZXQgYmFja2dyb3VuZENvbG9yID0gZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cblx0aWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAxKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJlZ2V4cDEsICcnKTtcblxuXHRcdGlmIChyb3cuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSAhPT0gJ25vLWJhY2tncm91bmQnKVxuXHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSByb3cuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcblx0XHRlbHNlXG5cdFx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcblxuXHRcdHJvdy5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAyKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJlZ2V4cDIsICcnKTtcblxuXHRcdGlmIChyb3cuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSAhPT0gJ25vLWJhY2tncm91bmQnKVxuXHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSByb3cuZ2V0QXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpO1xuXHRcdGVsc2Vcblx0XHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXG5cdFx0cm93LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kLWNvbG9yOiAjYWRmICFpbXBvcnRhbnQnO1xuXHRcdHJvdy5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGJhY2tncm91bmRDb2xvciA/IGJhY2tncm91bmRDb2xvciA6ICduby1iYWNrZ3JvdW5kJyk7XG5cdH1cblxufTtcblxuZXhwb3J0IHtoaWdobGlnaHRCb3hBY3Rpb259O1xuXG4iLCIvKiBsb2FkIF9zdHlsZXMuanMgdi4gMC4xLjMsIDE4LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cnVsZXN9IGZyb20gJy4vc3R5bGVzLmpzJztcbmltcG9ydCB7cmVuZGVyU3R5bGVzfSBmcm9tICcuL3JlbmRlcl9zdHlsZXMuanMnO1xuXG5jb25zdCBsb2FkU3R5bGVzID0gKCkgPT4ge1xuXG4gICAgY29uc3QgZ29vZ2xlRm9udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGdvb2dsZUZvbnQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGdvb2dsZUZvbnQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgZ29vZ2xlRm9udC5tZWRpYSA9ICdzY3JlZW4nO1xuICAgIGdvb2dsZUZvbnQuaHJlZiA9ICdodHRwczovL2dvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U3BhY2UrTW9ubzo0MDAsNzAwJmFtcDtzdWJzZXQ9bGF0aW4tZXh0JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGdvb2dsZUZvbnQpO1xuXHRyZW5kZXJTdHlsZXMocnVsZXMpO1xufTtcblxuZXhwb3J0IHtsb2FkU3R5bGVzfTtcbiIsIi8qIHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMsIHYuIDAuMS4yLCAyMC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJBdHRySW5wdXQgPSAoZWwsIGRpc3BsYXksIHJvdywgbmFtZSwgdmFsdWUsIHByZWZpeCkgPT4ge1xuICAgXG5cdGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0Y29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRjb25zdCBzZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdGNvbnN0IGFwcGx5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIFxuXHRpbnB1dC50eXBlID0gJ3RleHQnO1xuXHRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRpbnB1dC52YWx1ZSArPSAnOyc7XG5cblx0bGFiZWwuaW5uZXJUZXh0ID0gbmFtZTtcblx0YXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc6Jztcblx0bGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWVsZW1lbnRgKTtcblx0bGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWxhYmVsYCk7XG5cdGlucHV0LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1pbnB1dGApO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtYnRuYCk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXHRzZXBhcmF0b3IuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LXNlcGFyYXRvcmApO1xuICAgXG5cdGxhYmVsLmFwcGVuZENoaWxkKHNlcGFyYXRvcik7XG5cdGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoYXBwbHlCdG4pO1xuXHRsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbCk7XG5cdGRpc3BsYXkuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpO1xuICAgXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgIFxuXHRcdGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG5cblx0XHRcdGNvbnN0IHJvd0F0dHJOYW1lRWxlbXMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG5cdFx0XHRjb25zdCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRcdGlmIChkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKVxuXHRcdFx0XHRlbC5hdHRyaWJ1dGVzW25hbWVdLnZhbHVlID0gaW5wdXQudmFsdWU7XG5cblx0XHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdFx0ZWwuc3R5bGVbbmFtZV0gPSBpbnB1dC52YWx1ZS5yZXBsYWNlKCc7JywgJycpO1xuXG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwocm93QXR0ck5hbWVFbGVtcywgKGF0dHJOYW1lRWwsIGkpID0+IHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gbmFtZSAmJiBkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKSB7XG5cdFx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHtpbnB1dC52YWx1ZX1cImA7XG5cdFx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSAnc3R5bGUnICYmIGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRcdFx0XHRjb25zdCBsYWJlbHMgPSBkaXNwbGF5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsJyk7XG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gJyc7XG5cblx0XHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLmZpcnN0Q2hpbGQuZGF0YTtcblx0XHRcdFx0XHRcdHZhbHVlICs9ICc6ICc7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0XHRpZiAoaSA8IGxhYmVscy5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdFx0XHR2YWx1ZSArPSAnICc7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fbGlzdC1idG4tLWV4cGFuZGVkYCk7XG5cdFx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1jb2xsYXBzZWRgKTtcblx0XHR9XG5cblx0fSwgZmFsc2UpO1xuXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1leHBhbmRlZGApO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXHR9KTtcblxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGUpID0+IHtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1leHBhbmRlZGApO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXHR9KTtcblxuXHRhcHBseUJ0bi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgIFxuXHRcdGNvbnN0IHJvd0F0dHJOYW1lRWxlbXMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG5cdFx0Y29uc3Qgcm93QXR0clZhbHVlRWxlbXMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXG5cdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRlbC5hdHRyaWJ1dGVzW25hbWVdLnZhbHVlID0gaW5wdXQudmFsdWU7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpXG5cdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRbXS5mb3JFYWNoLmNhbGwocm93QXR0ck5hbWVFbGVtcywgKGF0dHJOYW1lRWwsIGkpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHtpbnB1dC52YWx1ZX1cImA7XG5cdFx0XHRcdGF0dHJOYW1lRWwuaW5uZXJUZXh0ID0gbmFtZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSAnc3R5bGUnICYmIGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRcdFx0bGV0IGxhYmVscyA9IGRpc3BsYXkucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcblx0XHRcdFx0bGV0IHZhbHVlID0gJyc7XG5cblx0XHRcdFx0W10uZm9yRWFjaC5jYWxsKGxhYmVscywgKGxhYmVsLCBpKSA9PiB7XG5cdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwuZmlyc3RDaGlsZC5kYXRhO1xuXHRcdFx0XHRcdHZhbHVlICs9ICc6ICc7XG5cdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZTtcblxuXHRcdFx0XHRcdGlmIChpIDwgbGFiZWxzLmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0XHR2YWx1ZSArPSAnICc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19saXN0LWJ0bi0tZXhwYW5kZWRgKTtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1jb2xsYXBzZWRgKTtcblxuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckF0dHJJbnB1dH07XG4iLCIvKiByZW5kZXJfYnJvd3Nlcl9pbmZvLmpzLCB2LiAwLjEuMSwgMTkuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IHJlbmRlckJyb3dzZXJJbmZvID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBicm93c2VySW5mb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBicm93c2VySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuaWQgPSAnYnJvd3Nlcic7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoYnJvd3NlckluZm9Db250YWluZXIsIGZhbHNlKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCBuYW1lOiAnICsgbmF2aWdhdG9yLmFwcENvZGVOYW1lICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgdmVyc2lvbjogJyArIG5hdmlnYXRvci5hcHBWZXJzaW9uICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5QbGF0Zm9ybTogJyArIG5hdmlnYXRvci5wbGF0Zm9ybSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+VXNlciBhZ2VudDogJyArIG5hdmlnYXRvci51c2VyQWdlbnQgKyAnPC9kaXY+JztcblxuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjUsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZUNvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzJztcblxuY29uc3QgY29uc29sZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5jb25zdCBjb25zb2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXRQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29uc29sZScpO1xuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXknKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVJbnB1dC5pZCA9ICdjb25zb2xlX2lucHV0JztcbmNvbnNvbGVJbnB1dC50eXBlID0gJ3RleHQnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdCcpO1xuY29uc29sZUNvbnRhaW5lci5pZCA9ICdjb25zb2xlJztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCcpO1xuXG5jb25zdCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIHJlbmRlckNvbnNvbGVDb250cm9scyhjb25zb2xlQ29udGFpbmVyLCBjb25zb2xlSW5wdXQpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlQ2xlYXJ9IGZyb20gJy4vY29uc29sZV9jbGVhci5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5jb25zdCBjb25zb2xlQ2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVMb2dCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVDb250cm9sc1BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVDb250cm9scyA9IChjb250YWluZXIsIGlucHV0KSA9PiB7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRyb2xzUGFuZWwpO1xuICAgIGNvbnNvbGVDb250cm9sc1BhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDbGVhckJ0bik7XG4gICAgY29uc29sZUNvbnRyb2xzUGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUxvZ0J0bik7XG5cdGNvbnNvbGVDb250cm9sc1BhbmVsLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tY2xlYXItYnRuJyk7XG5cdGNvbnNvbGVMb2dCdG4uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMtLWJ0bicpO1xuXHRjb25zb2xlTG9nQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1sb2ctYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5pbm5lclRleHQgPSBcIkNsZWFyXCI7XG5cdGNvbnNvbGVMb2dCdG4uaW5uZXJUZXh0ID0gXCJMb2dcIjtcblx0Y29uc29sZUNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY29uc29sZUNsZWFyKCksIGZhbHNlKTtcblx0Y29uc29sZUxvZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGxldCB2YWx1ZSA9IGdsb2JhbEV2YWwoaW5wdXQudmFsdWUpO1xuXG5cdFx0RFRDb25zb2xlLmxvZyh2YWx1ZSwgaW5wdXQudmFsdWUpO1x0XG5cdFx0aW5wdXQudmFsdWUgPSAnJztcblx0fSwgZmFsc2UpO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVDb250cm9sc307XG4iLCIvKiByZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJDb25zb2xlT3V0cHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX291dHB1dC5qcyc7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmIChtc2dBcnJheVswXSkge1xuXG4gICAgICAgIGNvbnN0IGlucHV0TWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGlucHV0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctaScpO1xuICAgICAgICBpbnB1dE1lc3NhZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLWlwcm9tcHRcIj48L3NwYW4+JHttc2dBcnJheVswXX0gYDtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0TWVzc2FnZSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJldHVybk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHJldHVybk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICByZXR1cm5NZXNzYWdlLmlubmVySFRNTCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj5gO1xuICAgIHJlbmRlckNvbnNvbGVPdXRwdXQobXNnQXJyYXlbMV0sIHJldHVybk1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXR1cm5NZXNzYWdlKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfTtcbiIsIi8vIHJlbmRlcl9jb25zb2xlX291dHB1dC5qcywgdi4gMC4xLjMsIDExMTExMTExMTcgQCBmaWxpcC1zd2luYXJza2lcblxuY29uc3QgcmVuZGVyQ29uc29sZU91dHB1dCA9ICh2YWwsIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBpbmRleCkgPT4ge1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCBjaGVja1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNwbGl0KCcgJylbMV07XG4gICAgbGV0IGh0bWwgPSAnJztcblxuICAgIGNoZWNrU3RyID0gY2hlY2tTdHIuc3Vic3RyaW5nKDAsIGNoZWNrU3RyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyfWApO1xuXHRcbiAgICBpZiAoY2hlY2tTdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudWxsJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdib29sZWFuJykge1xuICAgICAgICBodG1sICs9IGNoZWNrU3RyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsfVwiYCA6IHZhbDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09J2Z1bmN0aW9uJykge1xuICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgfSBlbHNlIGlmIChjaGVja1N0ciA9PT0gJ2FycmF5JyB8fCBjaGVja1N0ciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiB2YWwpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBrZXlDbGFzcyA9IGNoZWNrU3RyID09PSAnYXJyYXknID8gJ2luZGV4JyA6ICdrZXknO1xuICAgICAgICAgICAgbGV0IGNoZWNrU3RyMiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWxbaXRlbV0pLnNwbGl0KCcgJylbMV07XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY2hlY2tTdHIyID0gY2hlY2tTdHIyLnN1YnN0cmluZygwLCBjaGVja1N0cjIubGVuZ3RoLTEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcblxuICAgICAgICAgICAgaWYgKGNoZWNrU3RyMiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ251bGwnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnc3ltYm9sJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtrZXlDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHIyfWApO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBjaGVja1N0cjIgPT09ICdzdHJpbmcnID8gYFwiJHt2YWxbaXRlbV19XCJgIDogdmFsW2l0ZW1dO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQodmFsdWVFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGNvbnN0IGtleUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZW5kZXJDb25zb2xlT3V0cHV0KHZhbFtpdGVtXSwgb3V0cHV0LCBpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCA9IHZhbDtcbiAgICB9XG5cdFxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3V0cHV0KTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH07XG4iLCIvKiByZW5kZXJfZG9tLmpzLCB2LiAwLjEuOSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtkb21FbGVtZW50TGlzdGVufSBmcm9tICcuL2RvbV9lbGVtZW50X2xpc3Rlbi5qcyc7XG5cbmNvbnN0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuICAgIGlmIChlbGVtLmlkID09PSAnZGV2X3Rvb2xzJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByb3cyID0gZWxlbS5jaGlsZHJlbi5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cxRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzFPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MUNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MkVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cyT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzJDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1vcGVuaW5nJyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNsb3NpbmcnKTtcbiAgICBcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTtcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTsgXG4gICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MUNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cyT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cyQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzFPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8JztcbiAgICByb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxT3BlbkFycm93KTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuICAgIFxuICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBhdHRyTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjb25zdCBhdHRyRXF1YWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmlubmVyVGV4dCA9IGF0dHIubG9jYWxOYW1lO1xuICAgICAgICAgICAgYXR0ckVxdWFsU3Bhbi5pbm5lclRleHQgPSAnPSc7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmlubmVyVGV4dCA9ICdcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ck5hbWVTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ckVxdWFsU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJWYWx1ZVNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XHRcbiAgICBcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFDbG9zZUFycm93KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICBcbiAgICBpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIHRleHRFbC5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgICAgICB0ZXh0RWwuaW5uZXJUZXh0ID0gZWxlbS50ZXh0LnRyaW0oKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0RWwpXG5cbiAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJET00oZWwsIHdyYXBwZXIsIGxldmVsKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJvdzJPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8Lyc7XG4gICAgcm93MkNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93Mk9wZW5BcnJvdyk7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyRWxlbWVudFR5cGVTcGFuKTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJDbG9zZUFycm93KTtcbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggfHwgZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93Mik7XG4gICAgZWxzZVxuICAgICAgICByb3cxLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIFxuXHRkb21FbGVtZW50TGlzdGVuKGVsZW0sIHJvdzEsIHJvdzFPcGVuQXJyb3cpO1xuICAgIHBhcmVudEVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xufVxuZXhwb3J0IHtyZW5kZXJET019O1xuIiwiLyogcmVuZGVyX2hlYWRlci5qcywgdi4gMC4xLjEsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlckhlYWRlciA9IChjb250YWluZXIsIGV4cGFuZGVkKSA9PiB7XG4gICBcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBjb250YWluZXIuaWQ7XG4gICBcbiAgICBoZWFkZXIuaWQgPSBgJHtjb250YWluZXIuaWR9X2hlYWRlcmA7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX2hlYWRlcmApO1xuICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGVgKTtcbiAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHt0aXRsZX1fX3RpdGxlXCI+JHt0aXRsZX08L3NwYW4+YDtcbiAgIFxuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1leHBhbmRlZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWNvbGxhcHNlZGApO1xuICAgIH1cbiAgIFxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0b2dnbGVCdG4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICBcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXS5maWx0ZXIuY2FsbChjb250YWluZXIuY2hpbGRyZW4sIGVsID0+IGVsLmlkICE9PSBgJHtwYXJlbnQuaWR9X19oZWFkZXJgKTtcbiAgICAgICBcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC50b2dnbGUoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tZXhwYW5kZWRgKTtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC50b2dnbGUoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tY29sbGFwc2VkYCk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShgJHtlbC5jbGFzc0xpc3RbMF19LS1leHBhbmRlZGApO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShgJHtlbC5jbGFzc0xpc3RbMF19LS1jb2xsYXBzZWRgKTtcbiAgICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJIZWFkZXJ9O1xuIiwiLyogcmVuZGVyX2luc3BlY3Rvci5qcywgdi4gMC4xLjYsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyRE9NfSBmcm9tICcuL3JlbmRlcl9kb20uanMnO1xuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IHJlbmRlckluc3BlY3RvciA9IChib2R5LCBwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgaW5zcGVjdG9yRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBodG1sRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmlkID0gJ2luc3BlY3Rvcic7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3RvcicpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheScpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuaWQgPSAnaW5zcGVjdG9yX2Rpc3BsYXknO1xuICAgIHJlbmRlckhlYWRlcihpbnNwZWN0b3JDb250YWluZXIsIHRydWUpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCcpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JEaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChpbnNwZWN0b3JDb250YWluZXIpO1xuICAgIHJlbmRlckRPTShodG1sRWxlbSwgaW5zcGVjdG9yRGlzcGxheSwgbGV2ZWwpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckluc3BlY3Rvcn07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMsIHYuIDAuMS40LCAxOC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclNlY3Rpb259IGZyb20gJy4vcmVuZGVyX3NlY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJJbnNwZWN0b3JQYW5lID0gKGVsZW1lbnQsIHJvdykgPT4ge1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3BlY3RvcicpO1xuICAgIGNvbnN0IGluc3BlY3RvclBhbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjbG9zZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgYXR0cmlidXRlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3Qgc3R5bGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBpbnNwZWN0b3JQYW5lV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBoaWdobGlnaHRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpbnNwZWN0b3JQYW5lLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvci1wYW5lJyk7XG5cdGluc3BlY3RvclBhbmVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvci1wYW5lX193cmFwcGVyJyk7XG4gICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yLXBhbmVfX2Nsb3NlJyk7XG4gICAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJ3gnO1xuXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGluc3BlY3RvclBhbmUucmVtb3ZlKCk7XG4gICAgfSwgZmFsc2UpO1xuXG5cdHJlbmRlclNlY3Rpb24oJ2F0dHJfbGlzdCcsICdpbnNwZWN0b3ItcGFuZScsICdBdHRyaWJ1dGVzJywgZWxlbWVudCwgcm93LCBhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG5cdHJlbmRlclNlY3Rpb24oJ3N0eWxlX2xpc3QnLCAnaW5zcGVjdG9yLXBhbmUnLCAnSW5saW5lIHN0eWxlcycsIGVsZW1lbnQsIHJvdywgc3R5bGVMaXN0V3JhcHBlcik7XG5cdHJlbmRlclNlY3Rpb24oJ2hpZ2hsaWdodF9zZWN0aW9uJywgJ2luc3BlY3Rvci1wYW5lJywgJ0hpZ2hsaWdodCBlbGVtZW50JywgZWxlbWVudCwgcm93LCBoaWdobGlnaHRXcmFwcGVyKTtcblxuICAgIGluc3BlY3RvclBhbmUuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIGluc3BlY3RvclBhbmVXcmFwcGVyLmFwcGVuZENoaWxkKGF0dHJpYnV0ZUxpc3RXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZUxpc3RXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChoaWdobGlnaHRXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lLmFwcGVuZENoaWxkKGluc3BlY3RvclBhbmVXcmFwcGVyKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yUGFuZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckluc3BlY3RvclBhbmV9O1xuIiwiLyogcmVuZGVyX3NlY3Rpb24uanMsIHYuIDAuMS4yLCAyMS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckF0dHJJbnB1dH0gZnJvbSAnLi9yZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzJztcbmltcG9ydCB7YWRkQnV0dG9uQWN0aW9ufSBmcm9tICcuL2FkZF9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7YXBwbHlCdXR0b25BY3Rpb259IGZyb20gJy4vYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2NhbmNlbEJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9jYW5jZWxfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2hpZ2hsaWdodEJveEFjdGlvbn0gZnJvbSAnLi9oaWdobGlnaHRfYm94X2FjdGlvbi5qcyc7XG5cbmNvbnN0IHJlbmRlclNlY3Rpb24gPSAoaWQsIHByZWZpeCwgdGl0bGUsIGVsZW1lbnQsIHJvdywgbGlzdFdyYXBwZXIpID0+IHtcblxuXHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHJlZ2V4cDEgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiByZ2JcXCgxNzAsIDIyMSwgMjU1XFwpIFxcIWltcG9ydGFudC8pO1xuXHRjb25zdCByZWdleHAyID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogXFwjYWRmIFxcIWltcG9ydGFudC8pO1xuXHRsZXQgc2VjdGlvbk5hbWUgPSAnJztcblxuXHRoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtwcmVmaXh9X19oZWFkbGluZVwiPiR7dGl0bGV9PC9zcGFuPmA7XG5cdGxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cdGxpc3QuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0YCk7XG5cblx0aWYgKGlkID09PSAnYXR0cl9saXN0JyB8fCBpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjb25zdCBhZGRBcHBseUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNvbnN0IGFkZENhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0Y29uc3QgdmFsdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0Y29uc3QgbmFtZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdGNvbnN0IHZhbHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdFx0bGV0IGFycjtcblx0XHRcblx0XHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChsaXN0KTtcblxuXHRcdGlmIChpZCA9PT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFx0c2VjdGlvbk5hbWUgPSAnYXR0cmlidXRlcyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFyciA9IFtdO1xuXHRcdFx0c2VjdGlvbk5hbWUgPSAnc3R5bGVzJztcblx0XHR9XG5cblx0XHRsaXN0LmlkID0gaWQ7XG5cdFx0YWRkQnRuLmlubmVyVGV4dCA9ICcrJztcblx0XHRhZGRCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGRgKTtcblx0XHRhZGRBcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRcdGFkZENhbmNlbEJ0bi5pbm5lclRleHQgPSAnQ2FuY2VsJztcblx0XHRhZGRBcHBseUJ0bi5pZCA9IGBhZGRfJHtpZC5yZXBsYWNlKCdfbGlzdCcsICcnKX1fYnRuYDtcblx0XHRhZGRBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FwcGx5YCk7XG5cdFx0YWRkQ2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fY2FuY2VsYCk7XG5cdFx0bmFtZUlucHV0TGFiZWwuaW5uZXJUZXh0ID0gaWQgPT09ICdzdHlsZV9saXN0JyA/ICdwcm9wZXJ0eSBuYW1lICcgOiAnYXR0cmlidXRlIG5hbWUgJztcblx0XHR2YWx1ZUlucHV0TGFiZWwuaW5uZXJUZXh0ID0gaWQgPT09ICdzdHlsZV9saXN0JyA/ICdwcm9wZXJ0eSB2YWx1ZSAnIDogJ2F0dHJpYnV0ZSB2YWx1ZSAnO1xuXHRcdG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xuXHRcdG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1pbnB1dGApO1xuXHRcdHZhbHVlSW5wdXQudHlwZSA9ICd0ZXh0Jztcblx0XHR2YWx1ZUlucHV0LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWlucHV0YCk7XG5cdFx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdFx0YWRkQ2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fY2FuY2VsLS1jb2xsYXBzZWRgKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdFx0dmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQoYWRkQ2FuY2VsQnRuKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQoYWRkQXBwbHlCdG4pO1xuXHRcdG5hbWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG5cdFx0dmFsdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHZhbHVlSW5wdXQpO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChuYW1lSW5wdXRMYWJlbCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKHZhbHVlSW5wdXRMYWJlbCk7XG5cblx0XHRpZiAoaWQgPT09ICdzdHlsZV9saXN0JyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMgJiYgZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlKSB7XG5cdFx0XHRhcnIgPSAnJy5zcGxpdC5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcy5zdHlsZS52YWx1ZSwgJzsgJylcblx0XHRcdGFyciA9IGFyci5tYXAocnVsZSA9PiBydWxlLnJlcGxhY2UoJzsnLCAnJykpO1xuXG5cdFx0XHRpZiAocm93Lmhhc0F0dHJpYnV0ZSgnZGF0YS1oaWdobGlnaHQnKSlcblx0XHRcdFx0YXJyID0gYXJyLmZpbHRlcihydWxlID0+ICFydWxlLm1hdGNoKHJlZ2V4cDEpICYmICFydWxlLm1hdGNoKHJlZ2V4cDIpKTtcblxuXHRcdH1cblxuXHRcdGZvciAobGV0IGl0ZW0gaW4gYXJyKSB7XG5cdFx0XHRcblx0XHRcdGxldCBuYW1lO1xuXHRcdFx0bGV0IHZhbHVlO1xuXG5cdFx0XHRpZiAoaWQgPT09ICdzdHlsZV9saXN0Jykge1xuXHRcdFx0XHRuYW1lID0gYXJyW2l0ZW1dLnNwbGl0KCc6ICcpWzBdO1xuXHRcdFx0XHR2YWx1ZSA9IGFycltpdGVtXS5zcGxpdCgnOiAnKVsxXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5hbWUgPSBhcnJbaXRlbV0ubmFtZTtcblx0XHRcdFx0dmFsdWUgPSBhcnJbaXRlbV0udmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIG5hbWUsIHZhbHVlLCBwcmVmaXgpO1xuXHRcdH1cblxuXHRcdGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRhZGRCdXR0b25BY3Rpb24oYWRkQXBwbHlCdG4sIGFkZENhbmNlbEJ0biwgbmFtZUlucHV0TGFiZWwsIHZhbHVlSW5wdXRMYWJlbCwgaGVhZGVyLCBwcmVmaXgpO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRhZGRBcHBseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGFwcGx5QnV0dG9uQWN0aW9uKGVsZW1lbnQsIGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIHZhbHVlSW5wdXRMYWJlbCwgbmFtZUlucHV0TGFiZWwsIGFyciwgbGlzdCwgcm93LCBoZWFkZXIsIHByZWZpeCk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdGFkZENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGNhbmNlbEJ1dHRvbkFjdGlvbihhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCB2YWx1ZUlucHV0TGFiZWwsIG5hbWVJbnB1dExhYmVsLCBoZWFkZXIsIHByZWZpeCk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9IGVsc2UgaWYgKGlkID09PSAnaGlnaGxpZ2h0X3NlY3Rpb24nKSB7XG5cblx0XHRjb25zdCBoaWdobGlnaHRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cblx0XHRzZWN0aW9uTmFtZSA9ICdoaWdobGlnaHQnO1xuXHRcdGhpZ2hsaWdodENoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuXHRcdGhpZ2hsaWdodENoZWNrYm94LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9faGlnaGxpZ2h0YCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGhpZ2hsaWdodENoZWNrYm94KTtcblxuXHRcdGlmIChlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMSkgfHwgZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDIpKVxuXHRcdFx0aGlnaGxpZ2h0Q2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG5cblx0XHRoaWdobGlnaHRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG5cdFx0XHRoaWdobGlnaHRCb3hBY3Rpb24oZWxlbWVudCwgcm93KTtcblx0XHR9LCBmYWxzZSk7XG5cdH1cblxuXHRoZWFkZXIuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19oZWFkZXJgKTtcblx0bGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19zZWN0aW9uYCk7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fc2VjdGlvbi0tJHtzZWN0aW9uTmFtZX1gKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyU2VjdGlvbn07XG4iLCIvKiByZW5kZXJfc3R5bGVzLmpzLCB2LiAwLjEuMCwgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgcmVuZGVyU3R5bGVzID0gKHJ1bGVzKSA9PiB7XG5cbiAgICBjb25zdCBzdHlsZVNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xuXG4gICAgcnVsZXMuZm9yRWFjaCgocnVsZSwgaSkgPT4ge3N0eWxlU2hlZXQuc2hlZXQuaW5zZXJ0UnVsZShydWxlLCBpKTt9KTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyU3R5bGVzfTtcbiIsIi8qIHN0eWxlcy5qcywgdi4gMC4xLjYsIDIxLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJ1bGVzID0gW107XG5cbi8qIGJhc2UgKi9cblxucnVsZXMucHVzaChgLmJvZHkge1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAxMDAlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHMge1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGZvbnQtZmFtaWx5OiAnU3BhY2UgTW9ubycsIG1vbm9zcGFjZTtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX19wYW5lbCB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxuLyogaW5zcGVjdG9yICovXG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2hlYWRlciB7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDEwcHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheSB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0b3ZlcmZsb3c6IGF1dG87XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXkgPiAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDQwMHB4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5LS1jb2xsYXBzZWQge1xuXHRoZWlnaHQ6IDA7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcblx0Ym9yZGVyLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3JvdyB7XG5cdHdoaXRlLXNwYWNlOiBub3dyYXA7IGNvbG9yOiAjNDQ0O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19yb3c6aG92ZXI6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICcnO1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAyMHB4O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdHotaW5kZXg6IC0xO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19yb3ctLW9wZW5pbmcge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQgfiAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZXhwIHtcblx0ZGlzcGxheTogbm9uZTtcblx0bWFyZ2luLWxlZnQ6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuIHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3Blbjo6YWZ0ZXIge1xuXHRjb250ZW50OiAnJztcblx0ZGlzcGxheTogbm9uZTtcblx0Ym9yZGVyLWxlZnQ6IDZweCBzb2xpZCAjYmJiO1xuXHRib3JkZXItdG9wOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1ib3R0b206IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDVweDtcblx0bGVmdDogLThweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZDo6YWZ0ZXIge1xuXHRkaXNwbGF5OiBibG9jaztcblx0dHJhbnNmb3JtOiByb3RhdGUoMCk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZDo6YWZ0ZXIge1xuXHRkaXNwbGF5OiBibG9jaztcblx0dHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctY2xvc2U6bGFzdC1jaGlsZCB7XG5cdHBhZGRpbmctcmlnaHQ6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1uYW1lIHtcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2F0dHItbmFtZSB7XG5cdGNvbG9yOiAjMDAwO1xuXHRwYWRkaW5nLWxlZnQ6IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fYXR0ci12YWx1ZSB7XG5cdGNvbG9yOiAjMDBmO1xufWApO1xuXG4vKiBjb25zb2xlICovXG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19oZWFkZXIge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDEwcHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1idG4ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDVweDtcbiAgICByaWdodDogMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtZmFtaWx5OiBcIlNwYWNlIE1vbm9cIiwgbW9ub3NwYWNlO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scy0tY2xlYXItYnRuIHtcbiAgICByaWdodDogNnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWxvZy1idG4ge1xuICAgIHJpZ2h0OiA2M3B4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scy0tZXhwYW5kZWQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZGlzcGxheSB7XG5cdG92ZXJmbG93OiBhdXRvO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci10b3A6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDQwMHB4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZGlzcGxheS0tY29sbGFwc2VkIHtcblx0aGVpZ2h0OiAwO1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgLjVzO1xuXHRwYWRkaW5nOiAwO1xuXHRtYXJnaW46IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faW5wdXQge1xuXHR3aWR0aDogY2FsYygxMDAlIC0gMnB4KTtcblx0aGVpZ2h0OiAzMHB4O1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmc6IDA7XG5cdHRleHQtaW5kZW50OiAzMHB4O1xuXHRib3JkZXItYm90dG9tOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci10b3A6IDFweCBzb2xpZCAjYmNiY2JjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faW5wdXQtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiAzMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faW5wdXQtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcblx0Ym9yZGVyLS1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci0tcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdCB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0Ym90dG9tOiAwO1xuXHR3aWR0aDogMzBweDtcblx0aGVpZ2h0OiAzMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPj4nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDNweDtcblx0bGVmdDogNXB4O1xuXHRoZWlnaHQ6IDEwcHg7XG5cdGNvbG9yOiAjYWNhY2FjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fcHJvbXB0LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fcHJvbXB0LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLWkge1xuXHRjb2xvcjogI2FjYWNhYztcblx0cGFkZGluZzogNXB4IDVweCA1cHggMjVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1yIHtcblx0Y29sb3I6ICMwMDA7XG5cdHBhZGRpbmc6IDVweCA1cHggNXB4IDI1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctci0tZXJyIHtcblx0Y29sb3I6ICNhOTMyMjY7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmYWRiZDg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctcnByb21wdCB7XG5cdHdpZHRoOiAyNXB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGNvbG9yOiAjYWNhY2FjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXJwcm9tcHQ6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICc8PSc7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IC0yMHB4O1xuXHR0b3A6IDNweDtcblx0Zm9udC1zaXplOiAxMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLWlwcm9tcHQge1xuXHR3aWR0aDogMjVweDsgcG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLWlwcm9tcHQ6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICc+Pic7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IC0yMHB4O1xuXHRmb250LXNpemU6IDEycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19lcnItcHJvbXB0IHtcblx0d2lkdGg6IDI1cHg7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Vyci1wcm9tcHQ6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICd4Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogLTE3cHg7XG5cdHRvcDogMDtcblx0Zm9udC1zaXplOiAxMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fdW5kZWZpbmVkIHtcblx0Y29sb3I6ICNhZGFkYWQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19udW1iZXIge1xuXHRjb2xvcjogIzAwMDBjYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3N0cmluZyB7XG5cdGNvbG9yOiAjY2M2NjAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fYm9vbGVhbiB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbnVsbCB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fa2V5IHtcblx0Y29sb3I6ICM4MDAwMDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19rZXk6OmFmdGVyIHtcblx0Y29udGVudDogJzogJztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2luZGV4IHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3ZhbHVlOm5vdCg6bGFzdC1jaGlsZCk6OmFmdGVyIHtcblx0Y29udGVudDogJywgJztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2FycmF5OjphZnRlciB7XG5cdGNvbnRlbnQ6ICddJztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2FycmF5OjpiZWZvcmUge1xuXHRjb250ZW50OiAnWyc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19vYmplY3Q6OmFmdGVyIHtcblx0Y29udGVudDogJ30nO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fb2JqZWN0OjpiZWZvcmUge1xuXHRjb250ZW50OiAneyc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19mLW5hbWUge1xuXHRjb2xvcjogIzAwOTlmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Yta2V5IHtcblx0Y29sb3I6ICM4MDAwMDA7XG59YCk7XG5cbi8qIGJyb3dzZXJfaW5mbyAqL1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9faGVhZGVyIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9fZGlzcGxheSB7XG5cdHBhZGRpbmc6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGRpbmctdG9wIHBhZGRpbmctYm90dG9tIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xuXHRwYWRkaW5nLXRvcDogMDtcblx0cGFkZGluZy1ib3R0b206IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG4vKiBpbnNwZWN0b3JfcGFuZSAqL1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmUge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAycHgpO1xuXHRoZWlnaHQ6IDQwMHB4O1xuXHR0b3A6IDM5cHg7XG5cdGxlZnQ6IDFweDtcblx0b3ZlcmZsb3cteTogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19jbG9zZSB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAwO1xuXHRyaWdodDogMDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogNnB4IDVweCA3cHggNXB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdGZvbnQtc2l6ZTogMjBweDtcblx0ei1pbmRleDogMTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX193cmFwcGVyIHtcblx0aGVpZ2h0OiA0MDBweDtcblx0b3ZlcmZsb3cteDogaGlkZGVuO1xuXHRvdmVyZmxvdy15OiBzY3JvbGw7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19oZWFkZXIge1xuXHRwYWRkaW5nOiAxMHB4IDEwcHggNXB4IDEwcHg7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZmVmZWY7XG5cdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWZlZmVmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX3NlY3Rpb246Zmlyc3QtY2hpbGQgLmluc3BlY3Rvci1wYW5lX19oZWFkZXIge1xuXHRib3JkZXItdG9wOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fc2VjdGlvbjpsYXN0LWNoaWxkIC5pbnNwZWN0b3ItcGFuZV9faGVhZGVyOmxhc3QtY2hpbGQge1xuXHRib3JkZXItYm90dG9tOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9faGVhZGVyLS1leHBhbmRlZCB7XG5cdHBhZGRpbmctYm90dG9tOiA0MHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hlYWRsaW5lIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYWRkIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRib3gtc2hhZG93OiBub25lO1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0cGFkZGluZzogMDtcblx0cmlnaHQ6IDVweDtcblx0dG9wOiA1cHg7XG5cdGZvbnQtc2l6ZTogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19zZWN0aW9uOmZpcnN0LWNoaWxkIC5pbnNwZWN0b3ItcGFuZV9fYWRkIHtcblx0cmlnaHQ6IDMycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYWRkLWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiA5cHg7XG5cdGZvbnQtZmFtaWx5OiBcIlNwYWNlIE1vbm9cIixtb25vc3BhY2U7XG5cdGZvbnQtc2l6ZTogMTRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hZGQtbGFiZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYWRkLWxhYmVsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLXRvcDogNXB4O1xuXHRwYWRkaW5nLWxlZnQ6IDEwcHg7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYXBwbHkge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiAxMHB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FwcGx5LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FwcGx5LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19jYW5jZWwge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiA2NXB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYWNhY2FjO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjNDQ0O1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2NhbmNlbC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19jYW5jZWwtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3Qge1xuXHRsaXN0LXN0eWxlOiBub25lO1xuXHRtYXJnaW4tdG9wOiAwO1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRwYWRkaW5nLWxlZnQ6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1lbGVtZW50IHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtbGFiZWwge1xuXHRkaXNwbGF5OiBibG9jaztcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1zZXBhcmF0b3Ige1xuXHRwYWRkaW5nLXJpZ2h0OiA1cHg7XG5cdGNvbG9yOiAjMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtaW5wdXQge1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNmZmY7XG5cdGZvbnQtZmFtaWx5OiBcIlNwYWNlIE1vbm9cIixtb25vc3BhY2U7XG5cdGZvbnQtc2l6ZTogMTRweDtcblx0Y29sb3I6ICMwMGY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1pbnB1dDpmb2N1cyB7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGNvbG9yOiAjZmZmO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuXHRjb2xvcjogI2ZmZjtcblx0Ym94LXNoYWRvdzogaW5zZXQgMCAwIDJweCAxcHggI2ZmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWJ0biB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDEwcHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdHRvcDogMDtcblx0Y29sb3I6ICNmZmY7XG5cdHBhZGRpbmc6IDAgMTBweCA0cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1idG4tLWV4cGFuZGVkIHtcblx0dmlzaWJpbGl0eTogdmlzaWJsZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWJ0bi0tY29sbGFwc2VkIHtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hpZ2hsaWdodCB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAxMHB4O1xuXHRyaWdodDogMnB4O1xufWApO1xuXG5leHBvcnQge3J1bGVzfTtcbiJdfQ==
