(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _load_styles = require('./modules/load_styles.js');

var _render_inspector = require('./modules/render_inspector.js');

var _render_console = require('./modules/render_console.js');

var _render_browser_info = require('./modules/render_browser_info.js');

var _render_settings = require('./modules/render_settings.js');

var _console_listen = require('./modules/console_listen.js');

var _dt_console_api = require('./modules/dt_console_api.js');

var console = _interopRequireWildcard(_dt_console_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var body = document.body; /* main.js 0.1.3 22.09.2017 @ filip swinarski */

var container = document.createElement('div');
var stealBrowserConsole = false;

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
(0, _load_styles.loadStyles)();
(0, _render_inspector.renderInspector)(body, container);
(0, _render_console.renderConsole)(container);
(0, _render_browser_info.renderBrowserInfo)(container);
(0, _render_settings.renderSettings)(container);

if (localStorage[document.domain]) stealBrowserConsole = JSON.parse(localStorage[document.domain]).stealBrowserConsole;

window.DT = {
	console: console,
	stealBrowserConsole: stealBrowserConsole
};

if (stealBrowserConsole) {
	DT.backup = window.console;
	window.console = DT.console;
}

},{"./modules/console_listen.js":6,"./modules/dt_console_api.js":9,"./modules/load_styles.js":12,"./modules/render_browser_info.js":14,"./modules/render_console.js":15,"./modules/render_inspector.js":21,"./modules/render_settings.js":24}],2:[function(require,module,exports){
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

/* console_listen.js, v. 0.1.6, 22.09.2017, @ filip-swinarski */

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

            DT.console.log(value, _render_console.consoleInput.value);
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

},{"./render_styles.js":26,"./styles.js":28}],13:[function(require,module,exports){
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
   var rowClass = 'browser_display__row';
   var keyClass = 'browser_display__key';

   browserInfoContainer.id = 'browser';
   browserInfoContainer.classList.add('browser');
   browserInfoContainer.classList.add('tools_panel');
   browserInfoDisplay.classList.add('browser__display');
   browserInfoDisplay.id = 'browser_display';
   browserInfoDisplay.classList.add('browser__display--collapsed');
   (0, _render_header.renderHeader)(browserInfoContainer, false);
   browserInfoContainer.appendChild(browserInfoDisplay);
   panel.appendChild(browserInfoContainer);

   browserInfoDisplay.innerHTML += '<div class=' + rowClass + '>\n\t\t<span class=' + keyClass + '>App name</span>: ' + navigator.appCodeName + '\n\t</div>';
   browserInfoDisplay.innerHTML += '<div class=' + rowClass + '>\n\t\t<span class=' + keyClass + '>App version</span>: ' + navigator.appVersion + '\n\t</div>';
   browserInfoDisplay.innerHTML += '<div class=' + rowClass + '>\n\t\t<span class=' + keyClass + '>Platform</span>: ' + navigator.platform + '\n\t</div>';
   browserInfoDisplay.innerHTML += '<div class=' + rowClass + '>\n\t\t<span class=' + keyClass + '>User agent</span>: ' + navigator.userAgent + '\n\t</div>';
   browserInfoDisplay.innerHTML += '<div class=' + rowClass + '>\n\t\t<span class=' + keyClass + '>Window width</span>: ' + window.innerWidth + '\n\t</div>';
   browserInfoDisplay.innerHTML += '<div class=' + rowClass + '>\n\t\t<span class=' + keyClass + '>Window height</span>: ' + window.innerHeight + '\n\t</div>';
}; /* render_browser_info.js, v. 0.1.3, 22.09.2017, @ filip-swinarski */

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

/* render_console_controls.js, v. 0.1.3, 22.09.2017, @ filip-swinarski */

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

		DT.console.log(value, input.value);
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
// render_console_output.js, v. 0.1.3, 2017 @ filip-swinarski

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
exports.renderSettings = undefined;

var _render_header = require('./render_header.js');

var _render_settings_controls = require('./render_settings_controls.js');

/* render_settings.js, v. 0.1.0, 22.09.2017, @ filip-swinarski */

var renderSettings = function renderSettings(panel) {

    var settingsDisplay = document.createElement('div');
    var settingsContainer = document.createElement('div');

    settingsContainer.id = 'settings';
    settingsContainer.classList.add('settings');
    settingsContainer.classList.add('settings__panel');
    settingsDisplay.classList.add('settings__display');
    settingsDisplay.id = 'settings_display';
    settingsDisplay.classList.add('settings__display--collapsed');
    (0, _render_header.renderHeader)(settingsContainer, false);
    settingsContainer.appendChild(settingsDisplay);
    (0, _render_settings_controls.renderSettingsControls)(settingsDisplay);
    panel.appendChild(settingsContainer);
};

exports.renderSettings = renderSettings;

},{"./render_header.js":20,"./render_settings_controls.js":25}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderSettingsControls = undefined;

var _steal_console_action = require('./steal_console_action.js');

var renderSettingsControls = function renderSettingsControls(container) {

	var stealConsoleRow = document.createElement('div');
	var stealConsoleLabel = document.createElement('label');
	var stealConsoleInput = document.createElement('input');

	stealConsoleRow.classList.add('settings_display__row');
	stealConsoleLabel.classList.add('settings_display__label');
	stealConsoleInput.classList.add('settings_display__input');
	stealConsoleInput.type = 'checkbox';
	stealConsoleInput.id = 'steal_browser_console';
	stealConsoleLabel.innerText = 'Steal browser console';
	stealConsoleRow.appendChild(stealConsoleLabel);
	stealConsoleLabel.appendChild(stealConsoleInput);
	container.appendChild(stealConsoleRow);
	stealConsoleInput.addEventListener('change', function () {
		return (0, _steal_console_action.stealConsoleAction)(stealConsoleInput);
	}, false);
}; /* render_settings_controls.js, v. 0.1.0, 22.09.2017, @ filip-swinarski */

exports.renderSettingsControls = renderSettingsControls;

},{"./steal_console_action.js":27}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* steal_console_action.js, v. 0.1.0, 22.09.2017, @ filip-swinarski */

var stealConsoleAction = function stealConsoleAction(input) {

	if (input.checked) {
		DT.backup = window.console;
		window.console = DT.console;
	} else {
		window.console = DT.backup;
		DT.backup = null;
	}

	localStorage.setItem(document.domain, JSON.stringify({ stealBrowserConsole: input.checked }));
	DT.stealBrowserConsole = input.checked;
};

exports.stealConsoleAction = stealConsoleAction;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* styles.js, v. 0.1.7, 22.09.2017, @ filip-swinarski */

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

rules.push(".browser__header {\n\tborder-top: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\tborder-left: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".browser__header--expanded {\n\tborder-bottom: 1px solid #bcbcbc;\n}");

rules.push(".browser__display {\n\tpadding: 10px; overflow: hidden;\n}");

rules.push(".browser__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\theight: 163px;\n\ttransition: height padding-top padding-bottom .5s;\n}");

rules.push(".browser__display--collapsed {\n\theight: 0;\n\ttransition: height pading-top padding-bottom .5s;\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

rules.push(".browser_display__row {\n\tpadding-bottom: 5px;\n}");

rules.push(".browser_display__key {\n    color: #800080;\n}");

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

/* settings */

rules.push(".settings__header {\n\tborder: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".settings__display {\n\tpadding: 10px; overflow: hidden;\n}");

rules.push(".settings__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\tborder-bottom: 1px solid #bcbcbc;\n\theight: 100px;\n\ttransition: height padding-top padding-bottom .5s;\n}");

rules.push(".settings__display--collapsed {\n\theight: 0;\n\ttransition: height pading-top padding-bottom .5s;\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

rules.push(".settings_display__row {\n\tpadding-bottom: 5px;\n}");

rules.push(".settings_display__label {\n\tdisplay: block;\n\tposition: relative;\n}");

rules.push(".settings_display__input {\n\tposition: absolute;\n\tright: 0;\n\ttop: -2px;\n}");

exports.rules = rules;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsb2FkX3N0eWxlcy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9vdXRwdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfZG9tLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2hlYWRlci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3IuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfc2VjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zZXR0aW5ncy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zZXR0aW5nc19jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxzdGVhbF9jb25zb2xlX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBQVksTzs7OztBQUVaLElBQU0sT0FBTyxTQUFTLElBQXRCLEMsQ0FWQTs7QUFXQSxJQUFNLFlBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0EsSUFBSSxzQkFBc0IsS0FBMUI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjtBQUNBLHFDQUFlLFNBQWY7O0FBRUEsSUFBSSxhQUFhLFNBQVMsTUFBdEIsQ0FBSixFQUNDLHNCQUFzQixLQUFLLEtBQUwsQ0FBVyxhQUFhLFNBQVMsTUFBdEIsQ0FBWCxFQUEwQyxtQkFBaEU7O0FBRUQsT0FBTyxFQUFQLEdBQVk7QUFDWCxpQkFEVztBQUVYO0FBRlcsQ0FBWjs7QUFLQSxJQUFJLG1CQUFKLEVBQXlCO0FBQ3hCLElBQUcsTUFBSCxHQUFZLE9BQU8sT0FBbkI7QUFDQSxRQUFPLE9BQVAsR0FBaUIsR0FBRyxP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QSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBOztBQUVBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQTs7QUFFQSxNQUFNLElBQU47O0FBVUEsTUFBTSxJQUFOOztBQWFBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFZQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU1BOztBQUVBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7UUFNUSxLLEdBQUEsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS4zIDIyLjA5LjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtsb2FkU3R5bGVzfSBmcm9tICcuL21vZHVsZXMvbG9hZF9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQnJvd3NlckluZm99IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzJztcbmltcG9ydCB7cmVuZGVyU2V0dGluZ3N9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfc2V0dGluZ3MuanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgY29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHN0ZWFsQnJvd3NlckNvbnNvbGUgPSBmYWxzZTtcblxuY29udGFpbmVyLmlkID0gJ2Rldl90b29scyc7XG5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHMnKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbmxvYWRTdHlsZXMoKTtcbnJlbmRlckluc3BlY3Rvcihib2R5LCBjb250YWluZXIpO1xucmVuZGVyQ29uc29sZShjb250YWluZXIpO1xucmVuZGVyQnJvd3NlckluZm8oY29udGFpbmVyKTtcbnJlbmRlclNldHRpbmdzKGNvbnRhaW5lcik7XG5cbmlmIChsb2NhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXSlcblx0c3RlYWxCcm93c2VyQ29uc29sZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pLnN0ZWFsQnJvd3NlckNvbnNvbGVcblxud2luZG93LkRUID0ge1xuXHRjb25zb2xlLFxuXHRzdGVhbEJyb3dzZXJDb25zb2xlXG59O1xuXG5pZiAoc3RlYWxCcm93c2VyQ29uc29sZSkge1xuXHREVC5iYWNrdXAgPSB3aW5kb3cuY29uc29sZTtcblx0d2luZG93LmNvbnNvbGUgPSBEVC5jb25zb2xlO1xufVxuIiwiLyogYWRkX2J1dHRvbl9hY3Rpb24uanMsIHYuIDAuMS4yLCAyMC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBhZGRCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgbmFtZUxhYmVsLCB2YWx1ZUxhYmVsLCBoZWFkZXIsIHByZWZpeCkgPT4ge1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FwcGx5LS1jb2xsYXBzZWRgKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fY2FuY2VsLS1jb2xsYXBzZWRgKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYXBwbHktLWV4cGFuZGVkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2NhbmNlbC0tZXhwYW5kZWRgKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRoZWFkZXIuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19oZWFkZXItLWV4cGFuZGVkYCk7XG59O1xuXG5leHBvcnQge2FkZEJ1dHRvbkFjdGlvbn07XG5cbiIsIi8qIGFwcGx5X2J1dHRvbl9hY3Rpb24uanMsIHYuIDAuMS40LCAyMS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckF0dHJJbnB1dH0gZnJvbSAnLi9yZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzJztcblxuY29uc3QgYXBwbHlCdXR0b25BY3Rpb24gPSAoZWxlbWVudCwgYWRkQnRuLCBjYW5jZWxCdG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlciwgcHJlZml4KSA9PiB7XG5cblx0Y29uc3Qgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRjb25zdCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCBuYW1lSW5wdXQgPSBuYW1lTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgdmFsdWUgPSB2YWx1ZUlucHV0LnZhbHVlO1xuXHRjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuXHRsZXQgYXR0clZhbHVlRWxlbTtcblx0bGV0IGF0dHJOYW1lRWxlbTtcblxuXHRsaXN0LmlubmVySFRNTCA9ICcnO1xuXHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJz0nO1xuXG5cdGlmIChhZGRCdG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKVxuXHRcdGF0dHJOYW1lRWxlbSA9IFtdLmZpbHRlci5jYWxsKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKSwgKGVsKSA9PiBlbC5pbm5lclRleHQgPT09IG5hbWUpWzBdO1xuXG5cdGlmIChhZGRCdG4uaWQgPT09ICdhZGRfc3R5bGVfYnRuJylcblx0XHRhdHRyTmFtZUVsZW0gPSBbXS5maWx0ZXIuY2FsbChyb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyksIChlbCkgPT4gZWwuaW5uZXJUZXh0ID09PSAnc3R5bGUnKVswXTtcblxuXHRpZiAoYXR0clZhbHVlRWxlbSkge1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBhdHRyTmFtZUVsZW0ubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG5cdH0gZWxzZSB7XG5cdFx0YXR0clZhbHVlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRhdHRyTmFtZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyTmFtZUVsZW0sIHJvdy5sYXN0Q2hpbGQpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoc2VwYXJhdG9yLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKGF0dHJWYWx1ZUVsZW0sIHJvdy5sYXN0Q2hpbGQpO1xuXHR9XG5cblx0aWYgKGFkZEJ0bi5pZCA9PT0gJ2FkZF9hdHRyX2J0bicpIHtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0YXJyID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBhdHRyID0+IGF0dHIubmFtZSAhPT0gJ3N0eWxlJyk7XG5cdFx0W10uZm9yRWFjaC5jYWxsKGFyciwgKGF0dHIpID0+IHtcblx0XHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIGF0dHIubmFtZSwgYXR0ci52YWx1ZSwgcHJlZml4KTtcblx0XHR9KTtcblx0XHRhdHRyTmFtZUVsZW0uaW5uZXJUZXh0ID0gbmFtZTtcblx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHR9XG5cblx0aWYgKGFkZEJ0bi5pZCA9PT0gJ2FkZF9zdHlsZV9idG4nKSB7XG5cdFx0YXR0ck5hbWVFbGVtLmlubmVyVGV4dCA9ICdzdHlsZSc7XG5cdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuXHRcdGFyci5wdXNoKGAke25hbWV9OiAke3ZhbHVlfTtgKTtcblx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCA9ICdcIic7XG5cdFx0W10uZm9yRWFjaC5jYWxsKGFyciwgKHJ1bGUsIGkpID0+IHtcblx0XHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIHJ1bGUuc3BsaXQoJzogJylbMF0sIHJ1bGUuc3BsaXQoJzogJylbMV0ucmVwbGFjZSgnOycsICcnKSwgcHJlZml4KTtcblxuXHRcdFx0aWYoaSAhPT0gMClcblx0XHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJyAnO1xuXG5cdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSBgJHtydWxlLnNwbGl0KCc6ICcpWzBdfTogJHtydWxlLnNwbGl0KCc6ICcpWzFdfWA7XG5cblx0XHRcdGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICc7Jztcblx0XHRcdFx0XG5cdFx0fSk7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJ1wiJztcblx0fVxuXG5cdGF0dHJOYW1lRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRhdHRyVmFsdWVFbGVtLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2hlYWRlci0tZXhwYW5kZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuXHR2YWx1ZUlucHV0LnZhbHVlID0gJyc7XG5cdGFkZEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FwcGx5LS1jb2xsYXBzZWRgKTtcblx0YWRkQnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYXBwbHktLWV4cGFuZGVkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2NhbmNlbC0tY29sbGFwc2VkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2NhbmNlbC0tZXhwYW5kZWRgKTtcbn07XG5cbmV4cG9ydCB7YXBwbHlCdXR0b25BY3Rpb259O1xuIiwiLyogY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMsIHYuIDAuMS4xLCAyMC4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBjYW5jZWxCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgdmFsdWVMYWJlbCwgbmFtZUxhYmVsLCBoZWFkZXIsIHByZWZpeCkgPT4ge1xuXG5cdGNvbnN0IHZhbHVlSW5wdXQgPSB2YWx1ZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGNvbnN0IG5hbWVJbnB1dCA9IG5hbWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0aGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9faGVhZGVyLS1leHBhbmRlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0bmFtZUlucHV0LnZhbHVlID0gJyc7XG5cdHZhbHVlSW5wdXQudmFsdWUgPSAnJztcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYXBwbHktLWV4cGFuZGVkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2NhbmNlbC0tY29sbGFwc2VkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2NhbmNlbC0tZXhwYW5kZWRgKTtcblxufTtcblxuZXhwb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259O1xuIiwiLyogY29uc29sZV9jbGVhci5qcywgdi4gMC4xLjAsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5jb25zdCBjb25zb2xlQ2xlYXIgPSAoKSA9PiB7XG4gICAgY29uc29sZURpc3BsYXkuaW5uZXJIVE1MID0gJyc7XG59XG5cbmV4cG9ydCB7Y29uc29sZUNsZWFyfTtcbiIsIi8qIGNvbnNvbGVfbGlzdGVuLmpzLCB2LiAwLjEuNiwgMjIuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge2NvbnNvbGVJbnB1dH0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMnO1xuaW1wb3J0IHtnbG9iYWxFdmFsfSBmcm9tICcuL2dsb2JhbF9ldmFsLmpzJztcblxuY29uc3QgY29uc29sZUxpc3RlbiA9ICgpID0+IHtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvclNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JMaW5lTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yQ29sdW1uTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yUHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19yb3cnKTtcbiAgICAgICAgZXJyb3JQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXByb21wdCcpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yLS1lcnInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1tc2cnKTtcbiAgICAgICAgZXJyb3JTb3VyY2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXNyYycpO1xuICAgICAgICBlcnJvckxpbmVOby5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbGluZW5vJyk7XG4gICAgICAgIGVycm9yQ29sdW1uTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWNvbHVtbm5vJyk7XG5cbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmlubmVySFRNTCArPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBlcnJvclNvdXJjZS5pbm5lckhUTUwgKz0gZXJyb3IuZmlsZW5hbWU7XG4gICAgICAgIGVycm9yTGluZU5vLmlubmVySFRNTCArPSBlcnJvci5saW5lbm87XG4gICAgICAgIGVycm9yQ29sdW1uTm8uaW5uZXJIVE1MICs9IGVycm9yLmNvbHVtbm5vO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvclByb21wdCk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2VNc2cpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JTb3VyY2UpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JMaW5lTm8pO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JDb2x1bW5Obyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlRGlzcGxheS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIFxuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2xvZycsIChlKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gcmVuZGVyQ29uc29sZU1lc3NhZ2UoZS5kZXRhaWwpO1xuXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19yb3cnKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIFxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBnbG9iYWxFdmFsKGNvbnNvbGVJbnB1dC52YWx1ZSk7XG5cbiAgICAgICAgICAgIERULmNvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMb2cgPSAoc3RyLCB2YWx1ZSkgPT4ge1xuXG4gICAgY29uc3QgbG9nID0gbmV3IEN1c3RvbUV2ZW50KCdsb2cnLCB7ZGV0YWlsOiBbc3RyLCB2YWx1ZV19KTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmRpc3BhdGNoRXZlbnQobG9nKTtcblxufVxuXG5leHBvcnQge2NvbnNvbGVMb2d9O1xuIiwiLyogZG9tX2VsZW1lbnRfbGlzdGVuLmpzLCB2LiAwLjEuMSwgMjAuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3JQYW5lfSBmcm9tICcuL3JlbmRlcl9pbnNwZWN0b3JfcGFuZS5qcyc7XG5cbmNvbnN0IGRvbUVsZW1lbnRMaXN0ZW4gPSAoZWxlbSwgcm93LCBhcnJvdykgPT4ge1xuXG5cdGxldCBzdGFydERhdGU7XG5cdGxldCB0T2JqO1xuXHRsZXQgc3RhcnRYO1xuXHRsZXQgc3RhcnRZO1xuXHRsZXQgZW5kWDtcblx0bGV0IGVuZFk7XG5cdGxldCBkaXN0WDtcblx0bGV0IGRpc3RZO1xuXHRsZXQgbWF4WCA9IDA7XG5cdGxldCBtYXhZID0gMDtcblxuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG5cdFx0c3RhcnREYXRlID0gbmV3IERhdGUoKTtcblx0XHR0T2JqID0gZS50b3VjaGVzWzBdO1xuXHRcdHN0YXJ0WCA9IHRPYmoucGFnZVg7XG5cdFx0c3RhcnRZID0gdE9iai5wYWdlWTtcblx0fSwgZmFsc2UpO1xuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFgpID4gbWF4WClcblx0XHRcdG1heFggPSBNYXRoLmFicyhkaXN0WCk7XG5cdCAgIFxuXHRcdGlmIChNYXRoLmFicyhkaXN0WSkgPiBtYXhZKVxuXHRcdFx0bWF4WSA9IE1hdGguYWJzKGRpc3RZKTtcblx0ICAgXG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcblx0ICAgXG5cdFx0Y29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgZGF0ZUFtcCA9IGVuZERhdGUgLSBzdGFydERhdGU7XG5cdCAgIFxuXHRcdHRPYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXHRcdGVuZFggPSB0T2JqLnBhZ2VYO1xuXHRcdGVuZFkgPSB0T2JqLnBhZ2VZO1xuXHRcdGRpc3RYID0gZW5kWCAtIHN0YXJ0WDtcblx0XHRkaXN0WSA9IGVuZFkgLSBzdGFydFk7XG5cdCAgIFxuXHRcdGlmIChtYXhZIDw9IDMwICYmIG1heFggPD0gMzApIHtcblx0XHQgICBcblx0XHRcdGlmIChkYXRlQW1wIDw9IDIwMCkge1xuXHRcdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKVxuXG5cdFx0XHRcdGlmIChhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJykgfHxcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZW5kZXJJbnNwZWN0b3JQYW5lKGVsZW0sIHJvdyk7XG5cdFx0XHR9XG5cdFx0ICAgXG5cdFx0fVxuXHQgICBcblx0XHRtYXhYID0gMDtcblx0XHRtYXhZID0gMDtcblxuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge2RvbUVsZW1lbnRMaXN0ZW59O1xuIiwiLyogZHRfY29uc29sZV9hcGkuanMsIHYuIDAuMS4zLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVMb2d9IGZyb20gJy4vY29uc29sZV9sb2cuanMnO1xuaW1wb3J0IHtjb25zb2xlQ2xlYXJ9IGZyb20gJy4vY29uc29sZV9jbGVhci5qcyc7XG5cbmNvbnN0IGxvZyA9ICh2YWx1ZSwgc3RyID0gJycpID0+IHtcbiAgICBjb25zb2xlTG9nKHN0ciwgdmFsdWUpO1xufVxuXG5jb25zdCBjbGVhciA9IGNvbnNvbGVDbGVhcjtcblxuZXhwb3J0IHtsb2d9O1xuZXhwb3J0IHtjbGVhcn07XG4iLCIvKiBnbG9iYWxfZXZhbC5qcywgdi4gMC4xLjAsIDMxLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbi8vIGV2YWwgLSBydW5zIGJsb2NrIHNjb3BlIGRlY2xhcmF0aW9ucyB2aWEgc2NyaXB0IGluamVjdGlvblxuLy8gb3RoZXJ3aXNlIHN0YW5kYXJkIGV2YWwgdXNlZCBcbi8vIC0gdGhpbmsgaWYgbm90IHVzZSBpbmplY3Rpb24gZXhjbHVzaXZlbHlcbi8vIHJldHVybnMgdmFsdWVcbmNvbnN0IGdsb2JhbEV2YWwgPSAoc3RyKSA9PiB7XG5cbiAgICAndXNlIHN0cmljdCc7IC8vIHByZXZlbnQgY3JlYXRpbmcgbG9jYWwgdmFyaWFibGVzIHdpdGggc3RhbmRhcmQgZXZhbFxuICAgIFxuICAgIGlmIChzdHIuc3RhcnRzV2l0aCgnbGV0ICcpIHx8IHN0ci5zdGFydHNXaXRoKCdjb25zdCAnKSkgeyAvLyBjb2RlIGZvciBzY3JpcHQgaW5zZXJ0aW9uXG5cbiAgICAgICAgbGV0IHNjcmlwdDtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKS5yZW1vdmUoKVxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5pZCA9ICdkdF9zY3JpcHQnO1xuICAgICAgICBzY3JpcHQuaW5uZXJUZXh0ID0gc3RyO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vIHJldHVybnMgdW5kZWZpbmVkIHdoZW4gZGVjbGFyaW5nIGJsb2NrIHNjb3BlZCB2YXJpYWJsZVxuICAgIH0gZWxzZSB7IC8vc3RhbmRhcmQgZXZhbFxuICAgICAgICByZXR1cm4gKDEsIGV2YWwpKHN0cik7IC8vIGluZGlyZWN0IGNhbGwgdG8gYWNjZXNzIGdsb2JhbCBzY29wZVxuICAgIH1cbn1cblxuZXhwb3J0IHtnbG9iYWxFdmFsfTtcbiIsIi8qIGhpZ2hsaWdodF9ib3hfYWN0aW9uLmpzLCB2LiAwLjEuMiwgMjEuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgaGlnaGxpZ2h0Qm94QWN0aW9uID0gKGVsZW1lbnQsIHJvdykgPT4ge1xuXG5cdGNvbnN0IHJlZ2V4cDEgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiByZ2JcXCgxNzAsIDIyMSwgMjU1XFwpIFxcIWltcG9ydGFudC8pO1xuXHRjb25zdCByZWdleHAyID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogXFwjYWRmIFxcIWltcG9ydGFudC8pO1xuXHRjb25zdCBhdHRyTmFtZSA9ICdkYXRhLWhpZ2hsaWdodCc7XG5cdGxldCBiYWNrZ3JvdW5kQ29sb3IgPSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuXHRpZiAoZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDEpKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gZWxlbWVudC5zdHlsZS5jc3NUZXh0LnJlcGxhY2UocmVnZXhwMSwgJycpO1xuXG5cdFx0aWYgKHJvdy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpICE9PSAnbm8tYmFja2dyb3VuZCcpXG5cdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHJvdy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHRcdGVsc2Vcblx0XHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXG5cdFx0cm93LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdH0gZWxzZSBpZiAoZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDIpKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gZWxlbWVudC5zdHlsZS5jc3NUZXh0LnJlcGxhY2UocmVnZXhwMiwgJycpO1xuXG5cdFx0aWYgKHJvdy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpICE9PSAnbm8tYmFja2dyb3VuZCcpXG5cdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHJvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGlnaGxpZ2h0Jyk7XG5cdFx0ZWxzZVxuXHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQtY29sb3I6ICNhZGYgIWltcG9ydGFudCc7XG5cdFx0cm93LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYmFja2dyb3VuZENvbG9yID8gYmFja2dyb3VuZENvbG9yIDogJ25vLWJhY2tncm91bmQnKTtcblx0fVxuXG59O1xuXG5leHBvcnQge2hpZ2hsaWdodEJveEFjdGlvbn07XG5cbiIsIi8qIGxvYWQgX3N0eWxlcy5qcyB2LiAwLjEuMywgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtydWxlc30gZnJvbSAnLi9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJTdHlsZXN9IGZyb20gJy4vcmVuZGVyX3N0eWxlcy5qcyc7XG5cbmNvbnN0IGxvYWRTdHlsZXMgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBnb29nbGVGb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgZ29vZ2xlRm9udC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgZ29vZ2xlRm9udC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBnb29nbGVGb250Lm1lZGlhID0gJ3NjcmVlbic7XG4gICAgZ29vZ2xlRm9udC5ocmVmID0gJ2h0dHBzOi8vZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1TcGFjZStNb25vOjQwMCw3MDAmYW1wO3N1YnNldD1sYXRpbi1leHQnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZ29vZ2xlRm9udCk7XG5cdHJlbmRlclN0eWxlcyhydWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcywgdi4gMC4xLjIsIDIwLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlckF0dHJJbnB1dCA9IChlbCwgZGlzcGxheSwgcm93LCBuYW1lLCB2YWx1ZSwgcHJlZml4KSA9PiB7XG4gICBcblx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0Y29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgXG5cdGlucHV0LnR5cGUgPSAndGV4dCc7XG5cdGlucHV0LnZhbHVlID0gdmFsdWU7XG5cblx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdGlucHV0LnZhbHVlICs9ICc7JztcblxuXHRsYWJlbC5pbm5lclRleHQgPSBuYW1lO1xuXHRhcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJzonO1xuXHRsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtZWxlbWVudGApO1xuXHRsYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtbGFiZWxgKTtcblx0aW5wdXQuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWlucHV0YCk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG5gKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdHNlcGFyYXRvci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3Qtc2VwYXJhdG9yYCk7XG4gICBcblx0bGFiZWwuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yKTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXHRsYWJlbC5hcHBlbmRDaGlsZChhcHBseUJ0bik7XG5cdGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsKTtcblx0ZGlzcGxheS5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICBcblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgXG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuXHRcdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRcdGNvbnN0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRcdGNvbnN0IGxhYmVscyA9IGRpc3BsYXkucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRcdFtdLmZvckVhY2guY2FsbChsYWJlbHMsIChsYWJlbCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwuZmlyc3RDaGlsZC5kYXRhO1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cblx0XHRcdFx0XHRcdGlmIChpIDwgbGFiZWxzLmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19saXN0LWJ0bi0tZXhwYW5kZWRgKTtcblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXHRcdH1cblxuXHR9LCBmYWxzZSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWV4cGFuZGVkYCk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdH0pO1xuXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4ge1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fbGlzdC1idG4tLWV4cGFuZGVkYCk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdH0pO1xuXG5cdGFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgXG5cdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRjb25zdCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jylcblx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuXHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09IG5hbWUgJiYgZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRsZXQgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1leHBhbmRlZGApO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQXR0cklucHV0fTtcbiIsIi8qIHJlbmRlcl9icm93c2VyX2luZm8uanMsIHYuIDAuMS4zLCAyMi4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxuY29uc3QgcmVuZGVyQnJvd3NlckluZm8gPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGJyb3dzZXJJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJyb3dzZXJJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHJvd0NsYXNzID0gJ2Jyb3dzZXJfZGlzcGxheV9fcm93Jztcblx0Y29uc3Qga2V5Q2xhc3MgPSAnYnJvd3Nlcl9kaXNwbGF5X19rZXknO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuaWQgPSAnYnJvd3Nlcic7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fZGlzcGxheS0tY29sbGFwc2VkJyk7XG4gICAgcmVuZGVySGVhZGVyKGJyb3dzZXJJbmZvQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoYnJvd3NlckluZm9EaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChicm93c2VySW5mb0NvbnRhaW5lcik7XG4gICAgXG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5BcHAgbmFtZTwvc3Bhbj46ICR7bmF2aWdhdG9yLmFwcENvZGVOYW1lfVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+QXBwIHZlcnNpb248L3NwYW4+OiAke25hdmlnYXRvci5hcHBWZXJzaW9ufVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+UGxhdGZvcm08L3NwYW4+OiAke25hdmlnYXRvci5wbGF0Zm9ybX1cblx0PC9kaXY+YDtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSR7cm93Q2xhc3N9PlxuXHRcdDxzcGFuIGNsYXNzPSR7a2V5Q2xhc3N9PlVzZXIgYWdlbnQ8L3NwYW4+OiAke25hdmlnYXRvci51c2VyQWdlbnR9XG5cdDwvZGl2PmA7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5XaW5kb3cgd2lkdGg8L3NwYW4+OiAke3dpbmRvdy5pbm5lcldpZHRofVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+V2luZG93IGhlaWdodDwvc3Bhbj46ICR7d2luZG93LmlubmVySGVpZ2h0fVxuXHQ8L2Rpdj5gO1xufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjUsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZUNvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzJztcblxuY29uc3QgY29uc29sZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5jb25zdCBjb25zb2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXRQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29uc29sZScpO1xuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXknKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVJbnB1dC5pZCA9ICdjb25zb2xlX2lucHV0JztcbmNvbnNvbGVJbnB1dC50eXBlID0gJ3RleHQnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdCcpO1xuY29uc29sZUNvbnRhaW5lci5pZCA9ICdjb25zb2xlJztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCcpO1xuXG5jb25zdCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIHJlbmRlckNvbnNvbGVDb250cm9scyhjb25zb2xlQ29udGFpbmVyLCBjb25zb2xlSW5wdXQpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzLCB2LiAwLjEuMywgMjIuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlQ2xlYXJ9IGZyb20gJy4vY29uc29sZV9jbGVhci5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5jb25zdCBjb25zb2xlQ2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVMb2dCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVDb250cm9sc1BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVDb250cm9scyA9IChjb250YWluZXIsIGlucHV0KSA9PiB7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRyb2xzUGFuZWwpO1xuICAgIGNvbnNvbGVDb250cm9sc1BhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDbGVhckJ0bik7XG4gICAgY29uc29sZUNvbnRyb2xzUGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUxvZ0J0bik7XG5cdGNvbnNvbGVDb250cm9sc1BhbmVsLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tY2xlYXItYnRuJyk7XG5cdGNvbnNvbGVMb2dCdG4uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMtLWJ0bicpO1xuXHRjb25zb2xlTG9nQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1sb2ctYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5pbm5lclRleHQgPSBcIkNsZWFyXCI7XG5cdGNvbnNvbGVMb2dCdG4uaW5uZXJUZXh0ID0gXCJMb2dcIjtcblx0Y29uc29sZUNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY29uc29sZUNsZWFyKCksIGZhbHNlKTtcblx0Y29uc29sZUxvZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGxldCB2YWx1ZSA9IGdsb2JhbEV2YWwoaW5wdXQudmFsdWUpO1xuXG5cdFx0RFQuY29uc29sZS5sb2codmFsdWUsIGlucHV0LnZhbHVlKTtcdFxuXHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdH0sIGZhbHNlKTtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlQ29udHJvbHN9O1xuIiwiLyogcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcywgdi4gMC4xLjEsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9vdXRwdXQuanMnO1xuXG5jb25zdCByZW5kZXJDb25zb2xlTWVzc2FnZSA9IChtc2dBcnJheSkgPT4ge1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pIHtcblxuICAgICAgICBjb25zdCBpbnB1dE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBpbnB1dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLWknKTtcbiAgICAgICAgaW5wdXRNZXNzYWdlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX21zZy1pcHJvbXB0XCI+PC9zcGFuPiR7bXNnQXJyYXlbMF19IGA7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dE1lc3NhZ2UpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZXR1cm5NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICByZXR1cm5NZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgcmV0dXJuTWVzc2FnZS5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLXJwcm9tcHRcIj48L3NwYW4+YDtcbiAgICByZW5kZXJDb25zb2xlT3V0cHV0KG1zZ0FycmF5WzFdLCByZXR1cm5NZXNzYWdlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmV0dXJuTWVzc2FnZSk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX07XG4iLCIvLyByZW5kZXJfY29uc29sZV9vdXRwdXQuanMsIHYuIDAuMS4zLCAyMDE3IEAgZmlsaXAtc3dpbmFyc2tpXG5cbmNvbnN0IHJlbmRlckNvbnNvbGVPdXRwdXQgPSAodmFsLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgaW5kZXgpID0+IHtcblxuICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgY2hlY2tTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zcGxpdCgnICcpWzFdO1xuICAgIGxldCBodG1sID0gJyc7XG5cbiAgICBjaGVja1N0ciA9IGNoZWNrU3RyLnN1YnN0cmluZygwLCBjaGVja1N0ci5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcbiAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtjaGVja1N0cn1gKTtcblx0XG4gICAgaWYgKGNoZWNrU3RyID09PSAnc3RyaW5nJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVsbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdzeW1ib2wnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgaHRtbCArPSBjaGVja1N0ciA9PT0gJ3N0cmluZycgPyBgXCIke3ZhbH1cImAgOiB2YWw7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICB9IGVsc2UgaWYgKGNoZWNrU3RyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09ICdhcnJheScgfHwgY2hlY2tTdHIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdmFsKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qga2V5Q2xhc3MgPSBjaGVja1N0ciA9PT0gJ2FycmF5JyA/ICdpbmRleCcgOiAna2V5JztcbiAgICAgICAgICAgIGxldCBjaGVja1N0cjIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsW2l0ZW1dKS5zcGxpdCgnICcpWzFdO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNoZWNrU3RyMiA9IGNoZWNrU3RyMi5zdWJzdHJpbmcoMCwgY2hlY2tTdHIyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cbiAgICAgICAgICAgIGlmIChjaGVja1N0cjIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudWxsJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdib29sZWFuJykge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyMn1gKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gY2hlY2tTdHIyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsW2l0ZW1dfVwiYCA6IHZhbFtpdGVtXTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKHZhbHVlRWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrU3RyMiA9PT0nZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2tleUNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ29uc29sZU91dHB1dCh2YWxbaXRlbV0sIG91dHB1dCwgaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgPSB2YWw7XG4gICAgfVxuXHRcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG91dHB1dCk7XG59O1xuXG5leHBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjksIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7ZG9tRWxlbWVudExpc3Rlbn0gZnJvbSAnLi9kb21fZWxlbWVudF9saXN0ZW4uanMnO1xuXG5jb25zdCByZW5kZXJET00gPSAoZWxlbSwgcGFyZW50RWwsIGxldmVsKSA9PiB7XG5cbiAgICBpZiAoZWxlbS5pZCA9PT0gJ2Rldl90b29scycpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgcm93MiA9IGVsZW0uY2hpbGRyZW4ubGVuZ3RoID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MUVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cxT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzFDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzJFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93Mk9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cyQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tb3BlbmluZycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jbG9zaW5nJyk7XG4gICAgXG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7IFxuICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzFDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93Mk9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MkNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cxT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPCc7XG4gICAgcm93MUNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MU9wZW5BcnJvdyk7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxRWxlbWVudFR5cGVTcGFuKTtcbiAgICBcbiAgICBpZiAoZWxlbS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYXR0ckVxdWFsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJWYWx1ZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5pbm5lclRleHQgPSBhdHRyLmxvY2FsTmFtZTtcbiAgICAgICAgICAgIGF0dHJFcXVhbFNwYW4uaW5uZXJUZXh0ID0gJz0nO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5pbm5lclRleHQgPSAnXCInICsgYXR0ci52YWx1ZSArICdcIic7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJOYW1lU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJFcXVhbFNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyVmFsdWVTcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVx0XG4gICAgXG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxQ2xvc2VBcnJvdyk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChyb3cxKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZXhwJyk7XG4gICAgXG4gICAgaWYgKGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICAgICAgdGV4dEVsLmlubmVyVGV4dCA9IGVsZW0udGV4dC50cmltKCk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG4gICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyRE9NKGVsLCB3cmFwcGVyLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcblx0ZG9tRWxlbWVudExpc3RlbihlbGVtLCByb3cxLCByb3cxT3BlbkFycm93KTtcbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbn1cbmV4cG9ydCB7cmVuZGVyRE9NfTtcbiIsIi8qIHJlbmRlcl9oZWFkZXIuanMsIHYuIDAuMS4xLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJIZWFkZXIgPSAoY29udGFpbmVyLCBleHBhbmRlZCkgPT4ge1xuICAgXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gY29udGFpbmVyLmlkO1xuICAgXG4gICAgaGVhZGVyLmlkID0gYCR7Y29udGFpbmVyLmlkfV9oZWFkZXJgO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X19oZWFkZXJgKTtcbiAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlYCk7XG4gICAgaGVhZGVyLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7dGl0bGV9X190aXRsZVwiPiR7dGl0bGV9PC9zcGFuPmA7XG4gICBcbiAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tZXhwYW5kZWRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1jb2xsYXBzZWRgKTtcbiAgICB9XG4gICBcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodG9nZ2xlQnRuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgIFxuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gW10uZmlsdGVyLmNhbGwoY29udGFpbmVyLmNoaWxkcmVuLCBlbCA9PiBlbC5pZCAhPT0gYCR7cGFyZW50LmlkfV9faGVhZGVyYCk7XG4gICAgICAgXG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWV4cGFuZGVkYCk7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWNvbGxhcHNlZGApO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tZXhwYW5kZWRgKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tY29sbGFwc2VkYCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVySGVhZGVyfTtcbiIsIi8qIHJlbmRlcl9pbnNwZWN0b3IuanMsIHYuIDAuMS42LCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckRPTX0gZnJvbSAnLi9yZW5kZXJfZG9tLmpzJztcbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5jb25zdCByZW5kZXJJbnNwZWN0b3IgPSAoYm9keSwgcGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGluc3BlY3RvckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBpbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaHRtbEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gICAgbGV0IGxldmVsID0gMDtcblxuICAgIGluc3BlY3RvckNvbnRhaW5lci5pZCA9ICdpbnNwZWN0b3InO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3InKTtcbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfX3BhbmVsJyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2Rpc3BsYXknKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmlkID0gJ2luc3BlY3Rvcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoaW5zcGVjdG9yQ29udGFpbmVyLCB0cnVlKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheS0tZXhwYW5kZWQnKTtcbiAgICBpbnNwZWN0b3JDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yRGlzcGxheSk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yQ29udGFpbmVyKTtcbiAgICByZW5kZXJET00oaHRtbEVsZW0sIGluc3BlY3RvckRpc3BsYXksIGxldmVsKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3J9O1xuIiwiLyogcmVuZGVyX2luc3BlY3Rvcl9wYW5lLmpzLCB2LiAwLjEuNCwgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJTZWN0aW9ufSBmcm9tICcuL3JlbmRlcl9zZWN0aW9uLmpzJztcblxuY29uc3QgcmVuZGVySW5zcGVjdG9yUGFuZSA9IChlbGVtZW50LCByb3cpID0+IHtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnNwZWN0b3InKTtcbiAgICBjb25zdCBpbnNwZWN0b3JQYW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY2xvc2VCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGF0dHJpYnV0ZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHN0eWxlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaW5zcGVjdG9yUGFuZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaGlnaGxpZ2h0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaW5zcGVjdG9yUGFuZS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3ItcGFuZScpO1xuXHRpbnNwZWN0b3JQYW5lV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3ItcGFuZV9fd3JhcHBlcicpO1xuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvci1wYW5lX19jbG9zZScpO1xuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICd4JztcblxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpbnNwZWN0b3JQYW5lLnJlbW92ZSgpO1xuICAgIH0sIGZhbHNlKTtcblxuXHRyZW5kZXJTZWN0aW9uKCdhdHRyX2xpc3QnLCAnaW5zcGVjdG9yLXBhbmUnLCAnQXR0cmlidXRlcycsIGVsZW1lbnQsIHJvdywgYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuXHRyZW5kZXJTZWN0aW9uKCdzdHlsZV9saXN0JywgJ2luc3BlY3Rvci1wYW5lJywgJ0lubGluZSBzdHlsZXMnLCBlbGVtZW50LCByb3csIHN0eWxlTGlzdFdyYXBwZXIpO1xuXHRyZW5kZXJTZWN0aW9uKCdoaWdobGlnaHRfc2VjdGlvbicsICdpbnNwZWN0b3ItcGFuZScsICdIaWdobGlnaHQgZWxlbWVudCcsIGVsZW1lbnQsIHJvdywgaGlnaGxpZ2h0V3JhcHBlcik7XG5cbiAgICBpbnNwZWN0b3JQYW5lLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZVdyYXBwZXIuYXBwZW5kQ2hpbGQoc3R5bGVMaXN0V3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZVdyYXBwZXIuYXBwZW5kQ2hpbGQoaGlnaGxpZ2h0V3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZS5hcHBlbmRDaGlsZChpbnNwZWN0b3JQYW5lV3JhcHBlcik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGluc3BlY3RvclBhbmUpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3JQYW5lfTtcbiIsIi8qIHJlbmRlcl9zZWN0aW9uLmpzLCB2LiAwLjEuMiwgMjEuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5pbXBvcnQge2FkZEJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9hZGRfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2FwcGx5QnV0dG9uQWN0aW9ufSBmcm9tICcuL2FwcGx5X2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259IGZyb20gJy4vY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtoaWdobGlnaHRCb3hBY3Rpb259IGZyb20gJy4vaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJTZWN0aW9uID0gKGlkLCBwcmVmaXgsIHRpdGxlLCBlbGVtZW50LCByb3csIGxpc3RXcmFwcGVyKSA9PiB7XG5cblx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCByZWdleHAxID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogcmdiXFwoMTcwLCAyMjEsIDI1NVxcKSBcXCFpbXBvcnRhbnQvKTtcblx0Y29uc3QgcmVnZXhwMiA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IFxcI2FkZiBcXCFpbXBvcnRhbnQvKTtcblx0bGV0IHNlY3Rpb25OYW1lID0gJyc7XG5cblx0aGVhZGVyLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cHJlZml4fV9faGVhZGxpbmVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXHRsaXN0LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdGApO1xuXG5cdGlmIChpZCA9PT0gJ2F0dHJfbGlzdCcgfHwgaWQgPT09ICdzdHlsZV9saXN0Jykge1xuXG5cdFx0Y29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0Y29uc3QgYWRkQXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjb25zdCBhZGRDYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNvbnN0IHZhbHVlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNvbnN0IG5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0XHRjb25zdCB2YWx1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdGxldCBhcnI7XG5cdFx0XG5cdFx0bGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQobGlzdCk7XG5cblx0XHRpZiAoaWQgPT09ICdhdHRyX2xpc3QnKSB7XG5cdFx0XHRhcnIgPSBbXS5maWx0ZXIuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGF0dHIgPT4gYXR0ci5uYW1lICE9PSAnc3R5bGUnKTtcblx0XHRcdHNlY3Rpb25OYW1lID0gJ2F0dHJpYnV0ZXMnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcnIgPSBbXTtcblx0XHRcdHNlY3Rpb25OYW1lID0gJ3N0eWxlcyc7XG5cdFx0fVxuXG5cdFx0bGlzdC5pZCA9IGlkO1xuXHRcdGFkZEJ0bi5pbm5lclRleHQgPSAnKyc7XG5cdFx0YWRkQnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkYCk7XG5cdFx0YWRkQXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0XHRhZGRDYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XG5cdFx0YWRkQXBwbHlCdG4uaWQgPSBgYWRkXyR7aWQucmVwbGFjZSgnX2xpc3QnLCAnJyl9X2J0bmA7XG5cdFx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseWApO1xuXHRcdGFkZENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2NhbmNlbGApO1xuXHRcdG5hbWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgbmFtZSAnIDogJ2F0dHJpYnV0ZSBuYW1lICc7XG5cdFx0dmFsdWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgdmFsdWUgJyA6ICdhdHRyaWJ1dGUgdmFsdWUgJztcblx0XHRuYW1lSW5wdXQudHlwZSA9ICd0ZXh0Jztcblx0XHRuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtaW5wdXRgKTtcblx0XHR2YWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdFx0dmFsdWVJbnB1dC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1pbnB1dGApO1xuXHRcdGFkZEFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYXBwbHktLWNvbGxhcHNlZGApO1xuXHRcdGFkZENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2NhbmNlbC0tY29sbGFwc2VkYCk7XG5cdFx0bmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRcdHZhbHVlSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEJ0bik7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZENhbmNlbEJ0bik7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEFwcGx5QnRuKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXHRcdHZhbHVlSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh2YWx1ZUlucHV0KTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQobmFtZUlucHV0TGFiZWwpO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZCh2YWx1ZUlucHV0TGFiZWwpO1xuXG5cdFx0aWYgKGlkID09PSAnc3R5bGVfbGlzdCcgJiYgZWxlbWVudC5hdHRyaWJ1dGVzICYmIGVsZW1lbnQuYXR0cmlidXRlcy5zdHlsZSkge1xuXHRcdFx0YXJyID0gJycuc3BsaXQuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUudmFsdWUsICc7ICcpXG5cdFx0XHRhcnIgPSBhcnIubWFwKHJ1bGUgPT4gcnVsZS5yZXBsYWNlKCc7JywgJycpKTtcblxuXHRcdFx0aWYgKHJvdy5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGlnaGxpZ2h0JykpXG5cdFx0XHRcdGFyciA9IGFyci5maWx0ZXIocnVsZSA9PiAhcnVsZS5tYXRjaChyZWdleHAxKSAmJiAhcnVsZS5tYXRjaChyZWdleHAyKSk7XG5cblx0XHR9XG5cblx0XHRmb3IgKGxldCBpdGVtIGluIGFycikge1xuXHRcdFx0XG5cdFx0XHRsZXQgbmFtZTtcblx0XHRcdGxldCB2YWx1ZTtcblxuXHRcdFx0aWYgKGlkID09PSAnc3R5bGVfbGlzdCcpIHtcblx0XHRcdFx0bmFtZSA9IGFycltpdGVtXS5zcGxpdCgnOiAnKVswXTtcblx0XHRcdFx0dmFsdWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuYW1lID0gYXJyW2l0ZW1dLm5hbWU7XG5cdFx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBuYW1lLCB2YWx1ZSwgcHJlZml4KTtcblx0XHR9XG5cblx0XHRhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0YWRkQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIG5hbWVJbnB1dExhYmVsLCB2YWx1ZUlucHV0TGFiZWwsIGhlYWRlciwgcHJlZml4KTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0YWRkQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRhcHBseUJ1dHRvbkFjdGlvbihlbGVtZW50LCBhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCB2YWx1ZUlucHV0TGFiZWwsIG5hbWVJbnB1dExhYmVsLCBhcnIsIGxpc3QsIHJvdywgaGVhZGVyLCBwcmVmaXgpO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRhZGRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRjYW5jZWxCdXR0b25BY3Rpb24oYWRkQXBwbHlCdG4sIGFkZENhbmNlbEJ0biwgdmFsdWVJbnB1dExhYmVsLCBuYW1lSW5wdXRMYWJlbCwgaGVhZGVyLCBwcmVmaXgpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSBlbHNlIGlmIChpZCA9PT0gJ2hpZ2hsaWdodF9zZWN0aW9uJykge1xuXG5cdFx0Y29uc3QgaGlnaGxpZ2h0Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXG5cdFx0c2VjdGlvbk5hbWUgPSAnaGlnaGxpZ2h0Jztcblx0XHRoaWdobGlnaHRDaGVja2JveC50eXBlID0gJ2NoZWNrYm94Jztcblx0XHRoaWdobGlnaHRDaGVja2JveC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2hpZ2hsaWdodGApO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChoaWdobGlnaHRDaGVja2JveCk7XG5cblx0XHRpZiAoZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDEpIHx8IGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAyKSlcblx0XHRcdGhpZ2hsaWdodENoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuXG5cdFx0aGlnaGxpZ2h0Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuXHRcdFx0aGlnaGxpZ2h0Qm94QWN0aW9uKGVsZW1lbnQsIHJvdyk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cblx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9faGVhZGVyYCk7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fc2VjdGlvbmApO1xuXHRsaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX3NlY3Rpb24tLSR7c2VjdGlvbk5hbWV9YCk7XG59O1xuXG5leHBvcnQge3JlbmRlclNlY3Rpb259O1xuIiwiLyogcmVuZGVyX3NldHRpbmdzLmpzLCB2LiAwLjEuMCwgMjIuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5pbXBvcnQge3JlbmRlclNldHRpbmdzQ29udHJvbHN9IGZyb20gJy4vcmVuZGVyX3NldHRpbmdzX2NvbnRyb2xzLmpzJztcblxuY29uc3QgcmVuZGVyU2V0dGluZ3MgPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnN0IHNldHRpbmdzRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHNldHRpbmdzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBzZXR0aW5nc0NvbnRhaW5lci5pZCA9ICdzZXR0aW5ncyc7XG4gICAgc2V0dGluZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MnKTtcbiAgICBzZXR0aW5nc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19fcGFuZWwnKTtcbiAgICBzZXR0aW5nc0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfX2Rpc3BsYXknKTtcbiAgICBzZXR0aW5nc0Rpc3BsYXkuaWQgPSAnc2V0dGluZ3NfZGlzcGxheSc7XG4gICAgc2V0dGluZ3NEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcbiAgICByZW5kZXJIZWFkZXIoc2V0dGluZ3NDb250YWluZXIsIGZhbHNlKTtcbiAgICBzZXR0aW5nc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzZXR0aW5nc0Rpc3BsYXkpO1xuXHRyZW5kZXJTZXR0aW5nc0NvbnRyb2xzKHNldHRpbmdzRGlzcGxheSk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoc2V0dGluZ3NDb250YWluZXIpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJTZXR0aW5nc307XG4iLCIvKiByZW5kZXJfc2V0dGluZ3NfY29udHJvbHMuanMsIHYuIDAuMS4wLCAyMi4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3N0ZWFsQ29uc29sZUFjdGlvbn0gZnJvbSAnLi9zdGVhbF9jb25zb2xlX2FjdGlvbi5qcyc7XG5cbmNvbnN0IHJlbmRlclNldHRpbmdzQ29udHJvbHMgPSAoY29udGFpbmVyKSA9PiB7XG5cblx0Y29uc3Qgc3RlYWxDb25zb2xlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHN0ZWFsQ29uc29sZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0Y29uc3Qgc3RlYWxDb25zb2xlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXG5cdHN0ZWFsQ29uc29sZVJvdy5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19kaXNwbGF5X19yb3cnKTtcblx0c3RlYWxDb25zb2xlTGFiZWwuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfZGlzcGxheV9fbGFiZWwnKTtcblx0c3RlYWxDb25zb2xlSW5wdXQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfZGlzcGxheV9faW5wdXQnKTtcblx0c3RlYWxDb25zb2xlSW5wdXQudHlwZSA9ICdjaGVja2JveCc7XG5cdHN0ZWFsQ29uc29sZUlucHV0LmlkID0gJ3N0ZWFsX2Jyb3dzZXJfY29uc29sZSc7XG5cdHN0ZWFsQ29uc29sZUxhYmVsLmlubmVyVGV4dCA9ICdTdGVhbCBicm93c2VyIGNvbnNvbGUnO1xuXHRzdGVhbENvbnNvbGVSb3cuYXBwZW5kQ2hpbGQoc3RlYWxDb25zb2xlTGFiZWwpO1xuXHRzdGVhbENvbnNvbGVMYWJlbC5hcHBlbmRDaGlsZChzdGVhbENvbnNvbGVJbnB1dCk7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGVhbENvbnNvbGVSb3cpO1xuXHRzdGVhbENvbnNvbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiBzdGVhbENvbnNvbGVBY3Rpb24oc3RlYWxDb25zb2xlSW5wdXQpLCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlclNldHRpbmdzQ29udHJvbHN9O1xuIiwiLyogcmVuZGVyX3N0eWxlcy5qcywgdi4gMC4xLjAsIDE4LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlclN0eWxlcyA9IChydWxlcykgPT4ge1xuXG4gICAgY29uc3Qgc3R5bGVTaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuICAgIHJ1bGVzLmZvckVhY2goKHJ1bGUsIGkpID0+IHtzdHlsZVNoZWV0LnNoZWV0Lmluc2VydFJ1bGUocnVsZSwgaSk7fSk7XG59O1xuXG5leHBvcnQge3JlbmRlclN0eWxlc307XG4iLCIvKiBzdGVhbF9jb25zb2xlX2FjdGlvbi5qcywgdi4gMC4xLjAsIDIyLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHN0ZWFsQ29uc29sZUFjdGlvbiA9IChpbnB1dCkgPT4ge1xuXG5cdGlmIChpbnB1dC5jaGVja2VkKSB7XG5cdFx0RFQuYmFja3VwID0gd2luZG93LmNvbnNvbGU7XG5cdFx0d2luZG93LmNvbnNvbGUgPSBEVC5jb25zb2xlO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jb25zb2xlID0gRFQuYmFja3VwO1xuXHRcdERULmJhY2t1cCA9IG51bGw7XG5cdH1cblxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShkb2N1bWVudC5kb21haW4sIEpTT04uc3RyaW5naWZ5KHtzdGVhbEJyb3dzZXJDb25zb2xlOiBpbnB1dC5jaGVja2VkfSkpXG5cdERULnN0ZWFsQnJvd3NlckNvbnNvbGUgPSBpbnB1dC5jaGVja2VkO1xufTtcblxuZXhwb3J0IHtzdGVhbENvbnNvbGVBY3Rpb259O1xuXG4iLCIvKiBzdHlsZXMuanMsIHYuIDAuMS43LCAyMi4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBydWxlcyA9IFtdO1xuXG4vKiBiYXNlICovXG5cbnJ1bGVzLnB1c2goYC5ib2R5IHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzIHtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRmb250LWZhbWlseTogJ1NwYWNlIE1vbm8nLCBtb25vc3BhY2U7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19fcGFuZWwge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbi8qIGluc3BlY3RvciAqL1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19oZWFkZXIge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXkge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdG92ZXJmbG93OiBhdXRvO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5ID4gLmluc3BlY3Rvcl9fZXhwIHtcblx0ZGlzcGxheTogYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXktLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheS0tY29sbGFwc2VkIHtcblx0aGVpZ2h0OiAwO1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgLjVzO1xuXHRwYWRkaW5nOiAwO1xuXHRtYXJnaW46IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19yb3cge1xuXHR3aGl0ZS1zcGFjZTogbm93cmFwOyBjb2xvcjogIzQ0NDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93OmhvdmVyOjpiZWZvcmUge1xuXHRjb250ZW50OiAnJztcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMjBweDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAwO1xuXHR6LWluZGV4OiAtMTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93LS1vcGVuaW5nIHtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkIH4gLmluc3BlY3Rvcl9fZXhwIHtcblx0ZGlzcGxheTogYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IG5vbmU7XG5cdG1hcmdpbi1sZWZ0OiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3BlbiB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW46OmFmdGVyIHtcblx0Y29udGVudDogJyc7XG5cdGRpc3BsYXk6IG5vbmU7XG5cdGJvcmRlci1sZWZ0OiA2cHggc29saWQgI2JiYjtcblx0Ym9yZGVyLXRvcDogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuXHRib3JkZXItYm90dG9tOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiA1cHg7XG5cdGxlZnQ6IC04cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQ6OmFmdGVyIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHRyYW5zZm9ybTogcm90YXRlKDApO1xuXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQ6OmFmdGVyIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLWNsb3NlOmxhc3QtY2hpbGQge1xuXHRwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctbmFtZSB7XG5cdGNvbG9yOiAjODAwMDgwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19hdHRyLW5hbWUge1xuXHRjb2xvcjogIzAwMDtcblx0cGFkZGluZy1sZWZ0OiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2F0dHItdmFsdWUge1xuXHRjb2xvcjogIzAwZjtcbn1gKTtcblxuLyogY29uc29sZSAqL1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faGVhZGVyIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scy0tYnRuIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1cHg7XG4gICAgcmlnaHQ6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsIG1vbm9zcGFjZTtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWNsZWFyLWJ0biB7XG4gICAgcmlnaHQ6IDZweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1sb2ctYnRuIHtcbiAgICByaWdodDogNjNweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzIHtcbiAgICBkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWV4cGFuZGVkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXkge1xuXHRvdmVyZmxvdzogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXktLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcblx0aGVpZ2h0OiA0MDBweDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0IHtcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDJweCk7XG5cdGhlaWdodDogMzBweDtcblx0bWFyZ2luOiAwO1xuXHRwYWRkaW5nOiAwO1xuXHR0ZXh0LWluZGVudDogMzBweDtcblx0Ym9yZGVyLWJvdHRvbTogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogMzBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xuXHRwYWRkaW5nOiAwO1xuXHRtYXJnaW46IDA7XG5cdGJvcmRlci0tbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdGJvdHRvbTogMDtcblx0d2lkdGg6IDMwcHg7XG5cdGhlaWdodDogMzBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJz4+Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAzcHg7XG5cdGxlZnQ6IDVweDtcblx0aGVpZ2h0OiAxMHB4O1xuXHRjb2xvcjogI2FjYWNhYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3Byb21wdC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pIHtcblx0Y29sb3I6ICNhY2FjYWM7XG5cdHBhZGRpbmc6IDVweCA1cHggNXB4IDI1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctciB7XG5cdGNvbG9yOiAjMDAwO1xuXHRwYWRkaW5nOiA1cHggNXB4IDVweCAyNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXItLWVyciB7XG5cdGNvbG9yOiAjYTkzMjI2O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYmQ4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXJwcm9tcHQge1xuXHR3aWR0aDogMjVweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRjb2xvcjogI2FjYWNhYztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1ycHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPD0nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMjBweDtcblx0dG9wOiAzcHg7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pcHJvbXB0IHtcblx0d2lkdGg6IDI1cHg7IHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1pcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAnPj4nO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMjBweDtcblx0Zm9udC1zaXplOiAxMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZXJyLXByb21wdCB7XG5cdHdpZHRoOiAyNXB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19lcnItcHJvbXB0OjpiZWZvcmUge1xuXHRjb250ZW50OiAneCc7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IC0xN3B4O1xuXHR0b3A6IDA7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX3VuZGVmaW5lZCB7XG5cdGNvbG9yOiAjYWRhZGFkO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbnVtYmVyIHtcblx0Y29sb3I6ICMwMDAwY2M7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19zdHJpbmcge1xuXHRjb2xvcjogI2NjNjYwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Jvb2xlYW4ge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX251bGwge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2tleSB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fa2V5OjphZnRlciB7XG5cdGNvbnRlbnQ6ICc6ICc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbmRleCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX192YWx1ZTpub3QoOmxhc3QtY2hpbGQpOjphZnRlciB7XG5cdGNvbnRlbnQ6ICcsICc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19hcnJheTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnXSc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19hcnJheTo6YmVmb3JlIHtcblx0Y29udGVudDogJ1snO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fb2JqZWN0OjphZnRlciB7XG5cdGNvbnRlbnQ6ICd9Jztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX29iamVjdDo6YmVmb3JlIHtcblx0Y29udGVudDogJ3snO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZi1uYW1lIHtcblx0Y29sb3I6ICMwMDk5ZmY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19mLWtleSB7XG5cdGNvbG9yOiAjODAwMDAwO1xufWApO1xuXG4vKiBicm93c2VyX2luZm8gKi9cblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2hlYWRlciB7XG5cdGJvcmRlci10b3A6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDEwcHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2hlYWRlci0tZXhwYW5kZWQge1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JjYmNiYztcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2Rpc3BsYXkge1xuXHRwYWRkaW5nOiAxMHB4OyBvdmVyZmxvdzogaGlkZGVuO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogMTYzcHg7XG5cdHRyYW5zaXRpb246IGhlaWdodCBwYWRkaW5nLXRvcCBwYWRkaW5nLWJvdHRvbSAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19kaXNwbGF5LS1jb2xsYXBzZWQge1xuXHRoZWlnaHQ6IDA7XG5cdHRyYW5zaXRpb246IGhlaWdodCBwYWRpbmctdG9wIHBhZGRpbmctYm90dG9tIC41cztcblx0cGFkZGluZy10b3A6IDA7XG5cdHBhZGRpbmctYm90dG9tOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfZGlzcGxheV9fcm93IHtcblx0cGFkZGluZy1ib3R0b206IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfZGlzcGxheV9fa2V5IHtcbiAgICBjb2xvcjogIzgwMDA4MDtcbn1gKTtcblxuLyogaW5zcGVjdG9yX3BhbmUgKi9cblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHR3aWR0aDogY2FsYygxMDAlIC0gMnB4KTtcblx0aGVpZ2h0OiA0MDBweDtcblx0dG9wOiAzOXB4O1xuXHRsZWZ0OiAxcHg7XG5cdG92ZXJmbG93LXk6IGF1dG87XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2xvc2Uge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMDtcblx0cmlnaHQ6IDA7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBhZGRpbmc6IDZweCA1cHggN3B4IDVweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRmb250LXNpemU6IDIwcHg7XG5cdHotaW5kZXg6IDE7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fd3JhcHBlciB7XG5cdGhlaWdodDogNDAwcHg7XG5cdG92ZXJmbG93LXg6IGhpZGRlbjtcblx0b3ZlcmZsb3cteTogc2Nyb2xsO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9faGVhZGVyIHtcblx0cGFkZGluZzogMTBweCAxMHB4IDVweCAxMHB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWZlZmVmO1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2VmZWZlZjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19zZWN0aW9uOmZpcnN0LWNoaWxkIC5pbnNwZWN0b3ItcGFuZV9faGVhZGVyIHtcblx0Ym9yZGVyLXRvcDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX3NlY3Rpb246bGFzdC1jaGlsZCAuaW5zcGVjdG9yLXBhbmVfX2hlYWRlcjpsYXN0LWNoaWxkIHtcblx0Ym9yZGVyLWJvdHRvbTogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hlYWRlci0tZXhwYW5kZWQge1xuXHRwYWRkaW5nLWJvdHRvbTogNDBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19oZWFkbGluZSB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FkZCB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Ym94LXNoYWRvdzogbm9uZTtcblx0Ym9yZGVyOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdHBhZGRpbmc6IDA7XG5cdHJpZ2h0OiA1cHg7XG5cdHRvcDogNXB4O1xuXHRmb250LXNpemU6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fc2VjdGlvbjpmaXJzdC1jaGlsZCAuaW5zcGVjdG9yLXBhbmVfX2FkZCB7XG5cdHJpZ2h0OiAzMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FkZC1pbnB1dCB7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogOXB4O1xuXHRmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsbW9ub3NwYWNlO1xuXHRmb250LXNpemU6IDE0cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYWRkLWxhYmVsLS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FkZC1sYWJlbC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcblx0cGFkZGluZy10b3A6IDVweDtcblx0cGFkZGluZy1sZWZ0OiAxMHB4O1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FwcGx5IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0dG9wOiA5NHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2E5MzIyNjtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hcHBseS0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hcHBseS0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2FuY2VsIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogNjVweDtcblx0dG9wOiA5NHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2FjYWNhYztcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRjb2xvcjogIzQ0NDtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19jYW5jZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2FuY2VsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0IHtcblx0bGlzdC1zdHlsZTogbm9uZTtcblx0bWFyZ2luLXRvcDogMDtcblx0bWFyZ2luLWJvdHRvbTogMDtcblx0cGFkZGluZy1sZWZ0OiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtZWxlbWVudCB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWxhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGNvbG9yOiAjODAwMDgwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3Qtc2VwYXJhdG9yIHtcblx0cGFkZGluZy1yaWdodDogNXB4O1xuXHRjb2xvcjogIzAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xuXHRmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsbW9ub3NwYWNlO1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGNvbG9yOiAjMDBmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtaW5wdXQ6Zm9jdXMge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRjb2xvcjogI2ZmZjtcblx0YmFja2dyb3VuZC1jb2xvcjogI2VlZTtcblx0Y29sb3I6ICNmZmY7XG5cdGJveC1zaGFkb3c6IGluc2V0IDAgMCAycHggMXB4ICNmZmY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1idG4ge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiAxMHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2E5MzIyNjtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHR0b3A6IDA7XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtYnRuLS1leHBhbmRlZCB7XG5cdHZpc2liaWxpdHk6IHZpc2libGU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1idG4tLWNvbGxhcHNlZCB7XG5cdHZpc2liaWxpdHk6IGhpZGRlbjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19oaWdobGlnaHQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMTBweDtcblx0cmlnaHQ6IDJweDtcbn1gKTtcblxuLyogc2V0dGluZ3MgKi9cblxucnVsZXMucHVzaChgLnNldHRpbmdzX19oZWFkZXIge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5zZXR0aW5nc19fZGlzcGxheSB7XG5cdHBhZGRpbmc6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5zZXR0aW5nc19fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDEwMHB4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuc2V0dGluZ3NfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xuXHRwYWRkaW5nLXRvcDogMDtcblx0cGFkZGluZy1ib3R0b206IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuc2V0dGluZ3NfZGlzcGxheV9fcm93IHtcblx0cGFkZGluZy1ib3R0b206IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnNldHRpbmdzX2Rpc3BsYXlfX2xhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnNldHRpbmdzX2Rpc3BsYXlfX2lucHV0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMDtcblx0dG9wOiAtMnB4O1xufWApO1xuXG5leHBvcnQge3J1bGVzfTtcbiJdfQ==
