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

var _render_live_overlay = require('./modules/render_live_overlay.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* main.js 0.1.4 26.09.2017 @ filip swinarski */

var body = document.body;
var container = document.createElement('div');
var stealBrowserConsole = false;
var liveMode = false;

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
(0, _load_styles.loadStyles)();
(0, _render_inspector.renderInspector)(body, container);
(0, _render_console.renderConsole)(container);
(0, _render_browser_info.renderBrowserInfo)(container);
(0, _render_settings.renderSettings)(container);

if (localStorage[document.domain]) {

	if (JSON.parse(localStorage[document.domain]).stealBrowserConsole) stealBrowserConsole = JSON.parse(localStorage[document.domain]).stealBrowserConsole;

	if (JSON.parse(localStorage[document.domain]).liveMode) liveMode = JSON.parse(localStorage[document.domain]).liveMode;
}

window.DT = {
	console: console,
	stealBrowserConsole: stealBrowserConsole,
	liveMode: liveMode
};

if (stealBrowserConsole) {
	DT.backup = window.console;
	window.console = DT.console;
}

if (liveMode) (0, _render_live_overlay.renderLiveOverlay)();

},{"./modules/console_listen.js":6,"./modules/dt_console_api.js":9,"./modules/load_styles.js":14,"./modules/render_browser_info.js":16,"./modules/render_console.js":17,"./modules/render_inspector.js":24,"./modules/render_live_overlay.js":26,"./modules/render_settings.js":29}],2:[function(require,module,exports){
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

},{"./render_attribute_input.js":15}],4:[function(require,module,exports){
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

},{"./render_console.js":17}],6:[function(require,module,exports){
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

},{"./global_eval.js":11,"./render_console.js":17,"./render_console_message.js":19}],7:[function(require,module,exports){
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

},{"./render_console.js":17}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.domElementListen = undefined;

var _render_inspector_pane = require('./render_inspector_pane.js');

var domElementListen = function domElementListen(elem, row, arrow) {

	var inspector = document.querySelector('#inspector');
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
				(0, _render_inspector_pane.renderInspectorPane)(elem, row, inspector);
			}
		}

		maxX = 0;
		maxY = 0;
	}, false);
}; /* dom_element_listen.js, v. 0.1.2, 27.09.2017, @ filip-swinarski */

exports.domElementListen = domElementListen;

},{"./render_inspector_pane.js":25}],9:[function(require,module,exports){
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
/* find_element_position.js, v. 0.1.0, 26.09.2017, @ filip-swinarski */

var findElementPosition = function findElementPosition(x, y) {

    var elements = document.querySelectorAll('body, body *');

    elements = Array.from(elements).filter(function (element) {

        var el = element.getBoundingClientRect();

        return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height && !element.classList.contains('tools_overlay');
    });
    console.log(elements[elements.length - 1]);

    return elements[elements.length - 1];
};

exports.findElementPosition = findElementPosition;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.liveModeAction = undefined;

var _render_live_overlay = require('./render_live_overlay.js');

var liveModeAction = function liveModeAction(input) {
	DT.liveMode = input.checked;

	var overlay = document.querySelector('#tools_overlay');
	var config = JSON.stringify({
		stealBrowserConsole: input.checked,
		liveMode: DT.liveMode
	});

	if (DT.liveMode) (0, _render_live_overlay.renderLiveOverlay)();else if (overlay) document.body.removeChild(overlay);

	localStorage.setItem(document.domain, config);
}; /* live_mode_action.js, v. 0.1.1, 27.09.2017, @ filip-swinarski */

exports.liveModeAction = liveModeAction;

},{"./render_live_overlay.js":26}],14:[function(require,module,exports){
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

},{"./render_styles.js":31,"./styles.js":33}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_attribute_input.js, v. 0.1.3, 25.09.2017, @ filip-swinarski */

var renderAttrInput = function renderAttrInput(el, display, row, name, value, prefix) {

	var input = document.createElement('input');
	var label = document.createElement('label');
	var separator = document.createElement('span');
	var applyBtn = document.createElement('button');
	var listElement = document.createElement('li');
	var length = void 0;

	input.type = 'text';
	input.value = value;
	length = value.length * 8;
	input.style.width = length + 'px';

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

	input.addEventListener('keyup', function (e) {
		length = input.value.length * 8;
		input.style.width = length + 'px';
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

},{}],16:[function(require,module,exports){
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

},{"./render_header.js":22}],17:[function(require,module,exports){
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

},{"./console_listen":6,"./render_console_controls.js":18,"./render_header.js":22}],18:[function(require,module,exports){
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

},{"./console_clear.js":5,"./global_eval.js":11}],19:[function(require,module,exports){
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

},{"./render_console_output.js":20}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"./dom_element_listen.js":8}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* render_header.js, v. 0.1.2, 25.09.2017, @ filip-swinarski */

var renderHeader = function renderHeader(container, expanded) {

  var header = document.createElement('div');
  var toggleBtn = document.createElement('span');
  var title = container.id;

  header.id = container.id + '_header';
  header.classList.add(container.classList[0] + '__header');
  header.innerHTML = '<span class="' + title + '__title">' + title + '</span>';

  if (expanded) {
    header.classList.add(container.classList[0] + '__header--expanded');
  } else {
    header.classList.add(container.classList[0] + '__header--collapsed');
  }

  container.appendChild(header);

  header.addEventListener('click', function (e) {

    var children = [].filter.call(container.children, function (el) {
      return el.id !== parent.id + '__header';
    });

    children.forEach(function (el) {
      el.classList.toggle(el.classList[0] + '--expanded');
      el.classList.toggle(el.classList[0] + '--collapsed');
    });
  }, false);
};

exports.renderHeader = renderHeader;

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderHtmlLiveDebugger = undefined;

var _render_popup = require('./render_popup.js');

var renderHtmlLiveDebugger = function renderHtmlLiveDebugger(element) {

	var htmlDebugger = document.createElement('div');
	var nextControl = document.createElement('div');
	var prevControl = document.createElement('div');
	var stepInControl = document.createElement('div');
	var stepOutControl = document.createElement('div');
	var popup = document.querySelector('#tools_popup');

	htmlDebugger.classList.add('tools_debugger');
	nextControl.classList.add('tools_debugger__control');
	prevControl.classList.add('tools_debugger__control');
	stepInControl.classList.add('tools_debugger__control');
	stepOutControl.classList.add('tools_debugger__control');
	htmlDebugger.appendChild(nextControl);
	htmlDebugger.appendChild(prevControl);
	htmlDebugger.appendChild(stepInControl);
	htmlDebugger.appendChild(stepOutControl);
	nextControl.innerText = 'next';
	prevControl.innerText = 'prev';
	stepInControl.innerText = 'in';
	stepOutControl.innerText = 'out';

	if (!element.nextElementSibling) nextControl.classList.add('tools_debugger__control--disabled');

	if (!element.previousElementSibling) prevControl.classList.add('tools_debugger__control--disabled');

	if (!element.firstElementChild) stepInControl.classList.add('tools_debugger__control--disabled');

	if (!element.parentElement) stepOutControl.classList.add('tools_debugger__control--disabled');

	nextControl.addEventListener('click', function () {

		if (element.nextElementSibling) {
			document.querySelector('#tools_popup').remove();
			(0, _render_popup.renderPopup)(element.nextElementSibling);
		}
	}, false);
	prevControl.addEventListener('click', function () {

		if (element.previousElementSibling) {
			document.querySelector('#tools_popup').remove();
			(0, _render_popup.renderPopup)(element.previousElementSibling);
		}
	}, false);
	stepInControl.addEventListener('click', function () {

		if (element.firstElementChild) {
			document.querySelector('#tools_popup').remove();
			(0, _render_popup.renderPopup)(element.firstElementChild);
		}
	}, false);
	stepOutControl.addEventListener('click', function () {

		if (element.parentElement) {
			document.querySelector('#tools_popup').remove();
			(0, _render_popup.renderPopup)(element.parentElement);
		}
	}, false);
	return htmlDebugger;
}; /* render_html_live_debugger.js, v. 0.1.2, 27.09.2017, @ filip-swinarski */

exports.renderHtmlLiveDebugger = renderHtmlLiveDebugger;

},{"./render_popup.js":27}],24:[function(require,module,exports){
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

},{"./render_dom.js":21,"./render_header.js":22}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderInspectorPane = undefined;

var _render_section = require('./render_section.js');

var renderInspectorPane = function renderInspectorPane(element, row, container) {

	var id = container.id;
	var inspectorPane = document.createElement('div');
	var attributeListWrapper = document.createElement('div');
	var styleListWrapper = document.createElement('div');
	var inspectorPaneWrapper = document.createElement('div');
	var highlightWrapper = document.createElement('div');
	var dimensionsWrapper = document.createElement('div');

	inspectorPane.classList.add(id + '-pane');
	inspectorPaneWrapper.classList.add(id + '-pane__wrapper');

	if (id === 'inspector') {

		var closeBtn = document.createElement('div');

		closeBtn.classList.add(id + '-pane__close');
		closeBtn.innerHTML = 'x';
		inspectorPane.appendChild(closeBtn);
		closeBtn.addEventListener('click', function () {
			inspectorPane.remove();
		}, false);
	}

	if (id === 'tools_popup') (0, _render_section.renderSection)('node_name', id + '-pane', 'Node name', element, row, attributeListWrapper);

	(0, _render_section.renderSection)('attr_list', id + '-pane', 'Attributes', element, row, attributeListWrapper);
	(0, _render_section.renderSection)('style_list', id + '-pane', 'Inline styles', element, row, styleListWrapper);

	if (id === 'inspector') (0, _render_section.renderSection)('highlight_section', id + '-pane', 'Highlight element', element, row, highlightWrapper);

	(0, _render_section.renderSection)('dimensions_section', id + '-pane', 'Dimensions', element, row, dimensionsWrapper);
	inspectorPaneWrapper.appendChild(attributeListWrapper);
	inspectorPaneWrapper.appendChild(styleListWrapper);
	inspectorPaneWrapper.appendChild(highlightWrapper);
	inspectorPaneWrapper.appendChild(dimensionsWrapper);
	inspectorPane.appendChild(inspectorPaneWrapper);
	container.appendChild(inspectorPane);
}; /* render_inspector_pane.js, v. 0.1.6, 27.09.2017, @ filip-swinarski */

exports.renderInspectorPane = renderInspectorPane;

},{"./render_section.js":28}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderLiveOverlay = undefined;

var _find_element_position = require('./find_element_position.js');

var _render_popup = require('./render_popup.js');

/* render_live_overlay.js, v. 0.1.1, 26.09.2017, @ filip-swinarski */

var renderLiveOverlay = function renderLiveOverlay() {

	var overlay = document.createElement('div');

	document.body.appendChild(overlay);
	overlay.classList.add('tools_overlay');
	overlay.id = 'tools_overlay';
	overlay.addEventListener('click', function (e) {

		var element = (0, _find_element_position.findElementPosition)(e.clientX, e.clientY);

		if (document.querySelector('#tools_live_popup')) document.querySelector('#tools_live_popup').remove();

		(0, _render_popup.renderPopup)(element);
	}, false);
};

exports.renderLiveOverlay = renderLiveOverlay;

},{"./find_element_position.js":10,"./render_popup.js":27}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderPopup = undefined;

var _render_html_live_debugger = require('./render_html_live_debugger.js');

var _render_inspector_pane = require('./render_inspector_pane.js');

/* render_popup.js, v. 0.1.8, 27.09.2017, @ filip-swinarski */

var renderPopup = function renderPopup(element) {

	var popup = document.createElement('div');
	var closeBtn = document.createElement('div');
	var popupWrapper = document.createElement('div');
	var elementRect = element.getBoundingClientRect();
	var htmlDebugger = (0, _render_html_live_debugger.renderHtmlLiveDebugger)(element);
	var position = elementRect.y + popup.clientHeight;

	popup.classList.add('tools_popup');
	popup.id = 'tools_popup';

	if (position < 0) popup.style.top = '0px';else if (elementRect.y >= window.innerHeight) popup.style.top = window.innerHeight - popup.clientHeight + 'px';else popup.style.top = position + 'px';

	popupWrapper.classList.add('tools_popup__wrapper');
	closeBtn.classList.add('tools_popup__close');
	closeBtn.innerHTML = 'x';

	closeBtn.addEventListener('click', function () {

		var overlay = document.querySelector('#tools_overlay');
		var liveModeInput = document.querySelector('#live_mode_input');
		var config = JSON.stringify({
			stealBrowserConsole: DT.stealBrowserConsole,
			liveMode: false
		});

		localStorage.setItem(document.domain, config);
		overlay.remove();
		liveModeInput.checked = false;
		DT.liveMode = false;
		popup.remove();
	}, false);

	popup.appendChild(closeBtn);
	popup.appendChild(popupWrapper);
	popupWrapper.appendChild(htmlDebugger);
	(0, _render_inspector_pane.renderInspectorPane)(element, null, popup);
	document.body.appendChild(popup);
};

exports.renderPopup = renderPopup;

},{"./render_html_live_debugger.js":23,"./render_inspector_pane.js":25}],28:[function(require,module,exports){
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
	} else if (id === 'dimensions_section') {

		var widthRow = document.createElement('div');
		var heightRow = document.createElement('div');

		sectionName = 'dimensions';
		widthRow.classList.add(prefix + '__dimensions-row');
		heightRow.classList.add(prefix + '__dimensions-row');
		widthRow.innerHTML = '<span class="' + prefix + '__key">width: </span>\n\t\t\t<span class="' + prefix + '__value">' + element.clientWidth + 'px</span>';
		heightRow.innerHTML = '<span class="' + prefix + '__key">height: </span>\n\t\t\t<span class="' + prefix + '__value">' + element.clientHeight + 'px</span>';
		listWrapper.appendChild(widthRow);
		listWrapper.appendChild(heightRow);
	} else if (id === 'node_name') {

		var nodeNameContainer = document.createElement('span');

		nodeNameContainer.innerText = element.nodeName.toLowerCase();
		nodeNameContainer.classList.add(prefix + '__node-name');
		header.appendChild(nodeNameContainer);
	}

	header.classList.add(prefix + '__header');
	listWrapper.classList.add(prefix + '__section');
	listWrapper.classList.add(prefix + '__section--' + sectionName);
}; /* render_section.js, v. 0.1.4, 27.09.2017, @ filip-swinarski */

exports.renderSection = renderSection;

},{"./add_button_action.js":2,"./apply_button_action.js":3,"./cancel_button_action.js":4,"./highlight_box_action.js":12,"./render_attribute_input.js":15}],29:[function(require,module,exports){
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

},{"./render_header.js":22,"./render_settings_controls.js":30}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderSettingsControls = undefined;

var _steal_console_action = require('./steal_console_action.js');

var _live_mode_action = require('./live_mode_action.js');

/* render_settings_controls.js, v. 0.1.2, 27.09.2017, @ filip-swinarski */

var renderSettingsControls = function renderSettingsControls(container) {

	var stealConsoleRow = document.createElement('div');
	var stealConsoleLabel = document.createElement('label');
	var stealConsoleInput = document.createElement('input');
	var liveModeRow = document.createElement('div');
	var liveModeLabel = document.createElement('label');
	var liveModeInput = document.createElement('input');
	var storage = localStorage[document.domain] ? JSON.parse(localStorage[document.domain]) : false;

	stealConsoleRow.classList.add('settings_display__row');
	stealConsoleLabel.classList.add('settings_display__label');
	stealConsoleInput.classList.add('settings_display__input');
	stealConsoleInput.type = 'checkbox';
	stealConsoleInput.id = 'steal_browser_console_input';
	stealConsoleLabel.innerText = 'Steal browser console';
	stealConsoleRow.appendChild(stealConsoleLabel);
	stealConsoleLabel.appendChild(stealConsoleInput);
	container.appendChild(stealConsoleRow);

	if (storage && storage.stealBrowserConsole) stealConsoleInput.checked = true;else stealConsoleInput.checked = false;

	stealConsoleInput.addEventListener('change', function () {
		return (0, _steal_console_action.stealConsoleAction)(stealConsoleInput);
	}, false);

	liveModeRow.classList.add('settings_display__row');
	liveModeLabel.classList.add('settings_display__label');
	liveModeInput.classList.add('settings_display__input');
	liveModeInput.type = 'checkbox';
	liveModeInput.id = 'live_mode_input';
	liveModeLabel.innerText = 'Live mode';
	liveModeRow.appendChild(liveModeLabel);
	liveModeLabel.appendChild(liveModeInput);
	container.appendChild(liveModeRow);

	if (storage && storage.liveMode) liveModeInput.checked = true;else liveModeInput.checked = false;

	liveModeInput.addEventListener('change', function () {
		return (0, _live_mode_action.liveModeAction)(liveModeInput);
	}, false);
};

exports.renderSettingsControls = renderSettingsControls;

},{"./live_mode_action.js":13,"./steal_console_action.js":32}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* steal_console_action.js, v. 0.1.1, 26.09.2017, @ filip-swinarski */

var stealConsoleAction = function stealConsoleAction(input) {

	var config = JSON.stringify({
		stealBrowserConsole: input.checked,
		liveMode: DT.liveMode
	});

	if (input.checked) {
		DT.backup = window.console;
		window.console = DT.console;
	} else {
		window.console = DT.backup;
		DT.backup = null;
	}

	localStorage.setItem(document.domain, config);
	DT.stealBrowserConsole = input.checked;
};

exports.stealConsoleAction = stealConsoleAction;

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* styles.js, v. 0.1.13, 27.09.2017, @ filip-swinarski */

var rules = [];

/* base */

rules.push(".body {\n\twidth: 100%;\n\theight: 100%;\n}");

rules.push(".tools {\n\tfont-size: 14px;\n\tfont-family: 'Space Mono', monospace;\n\tbackground-color: #fff;\n\tposition: relative;\n\tz-index: 9999999;\n}");

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

rules.push(".inspector-pane__header--expanded {\n\tpadding-bottom: 40px;\n}");

rules.push(".inspector-pane__headline {\n\tdisplay: block;\n\tpadding-bottom: 5px;\n}");

rules.push(".inspector-pane__add {\n\tposition: absolute;\n\t-moz-appearance: none;\n\tbackground-color: transparent;\n\tbox-shadow: none;\n\tborder: 0 none transparent;\n\tpadding: 0;\n\tright: 5px;\n\ttop: 5px;\n\tfont-size: 20px;\n}");

rules.push(".inspector-pane__section:first-child .inspector-pane__add {\n\tright: 32px;\n}");

rules.push(".inspector-pane__add-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #bcbcbc;\n\tposition: absolute;\n\tright: 9px;\n\tfont-family: \"Space Mono\",monospace;\n\tfont-size: 14px;\n\tmin-width: 10px;\n}");

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

rules.push(".inspector-pane__list-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #fff;\n\tfont-family: \"Space Mono\",monospace;\n\tfont-size: 14px;\n\tcolor: #00f;\n\tmin-width: 10px;\n}");

rules.push(".inspector-pane__list-input:focus {\n\tborder: 1px solid #bcbcbc;\n\tcolor: #fff;\n\tbackground-color: #eee;\n\tcolor: #444;\n\tbox-shadow: inset 0 0 2px 1px #fff;\n}");

rules.push(".inspector-pane__list-btn {\n\tposition: absolute;\n\tright: 10px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\ttop: 0;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".inspector-pane__list-btn--expanded {\n\tvisibility: visible;\n}");

rules.push(".inspector-pane__list-btn--collapsed {\n\tvisibility: hidden;\n}");

rules.push(".inspector-pane__highlight {\n\tposition: absolute;\n\ttop: 10px;\n\tright: 2px;\n}");

rules.push(".inspector-pane__dimensions-row {\n\tpadding: 5px 20px;\n}");

rules.push(".inspector-pane__key {\n\tcolor: #800080;\n}");

rules.push(".inspector-pane__value {\n\tcolor: #00f;\n}");

/* settings */

rules.push(".settings__header {\n\tborder: 1px solid #bcbcbc;\n\tpadding: 10px;\n\tcursor: pointer;\n}");

rules.push(".settings__display {\n\tpadding: 10px; overflow: hidden;\n}");

rules.push(".settings__display--expanded {\n\tborder-left: 1px solid #bcbcbc;\n\tborder-right: 1px solid #bcbcbc;\n\tborder-bottom: 1px solid #bcbcbc;\n\theight: 100px;\n\ttransition: height padding-top padding-bottom .5s;\n}");

rules.push(".settings__display--collapsed {\n\theight: 0;\n\ttransition: height pading-top padding-bottom .5s;\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tborder-left: 0 none transparent;\n\tborder-right: 0 none transparent;\n}");

rules.push(".settings_display__row {\n\tpadding-bottom: 5px;\n}");

rules.push(".settings_display__label {\n\tdisplay: block;\n\tposition: relative;\n}");

rules.push(".settings_display__input {\n\tposition: absolute;\n\tright: 0;\n\ttop: -2px;\n}");

/* overlay */

rules.push(".tools_overlay {\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tzIndex: 999999;\n}");

/* popup */

rules.push(".tools_popup {\n\tposition: fixed;\n\tmax-width: calc(100% - 20px);\n\twidth: calc(100% - 20px);\n\tmin-height: 150px;\n\ttop: 0;\n\tbackground-color: #fff;\n\tborder: 1px solid #bcbcbc;\n\tborder-radius: 7px;\n\tbox-shadow: 0 1px 3px 1px #bcbcbc;\n\tz-index: 99999999;\n}");

rules.push(".tools_popup__close {\n\tposition: absolute;\n\tright: 7px;\n\tfont-size: 18px;\n\tcursor: pointer;\n}");

/* html live debugger */

rules.push(".tools_debugger {\n    padding: 8px 10px;\n}");

rules.push(".tools_debugger__control {\n    display: inline-block;\n    padding: 0 10px 4px;\n    border: 1px solid #bcbcbc;\n    border-radius: 4px;\n    color: #000;\n\tcursor: pointer;\n}");

rules.push(".tools_debugger__control--disabled {\n    color: #bcbcbc;\n}");

/* popup pane */

rules.push(".tools_popup-pane {\n\tposition: absolute;\n\tbackground-color: #fff;\n\twidth: calc(100% - 2px);\n\theight: 110px;\n\ttop: 39px;\n\tleft: 1px;\n\toverflow-y: auto;\n}");

rules.push(".tools_popup-pane__close {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #bcbcbc;\n\tborder-left: 1px solid #bcbcbc;\n\tpadding: 6px 5px 7px 5px;\n\tcursor: pointer;\n\tfont-size: 20px;\n\tz-index: 1;\n}");

rules.push(".tools_popup-pane__wrapper {\n\theight: auto;\n\toverflow-x: hidden;\n\toverflow-y: scroll;\n\tposition: relative;\n}");

rules.push(".tools_popup-pane__header {\n\tpadding: 10px 10px 5px 10px;\n\tposition: relative;\n\tborder-bottom: 1px solid #efefef;\n\tborder-top: 1px solid #efefef;\n}");

rules.push(".tools_popup-pane__section:first-child .tools_popup-pane__header {\n\tborder-top: 0 none transparent;\n}");

rules.push(".tools_popup-pane__header--expanded {\n\tpadding-bottom: 40px;\n}");

rules.push(".tools_popup-pane__headline {\n\tdisplay: block;\n\tpadding-bottom: 5px;\n}");

rules.push(".tools_popup-pane__add {\n\tposition: absolute;\n\t-moz-appearance: none;\n\tbackground-color: transparent;\n\tbox-shadow: none;\n\tborder: 0 none transparent;\n\tpadding: 0;\n\tright: 5px;\n\ttop: 5px;\n\tfont-size: 20px;\n}");

rules.push(".tools_popup-pane__section:first-child .tools_popup-pane__add {\n\tright: 32px;\n}");

rules.push(".tools_popup-pane__add-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #bcbcbc;\n\tposition: absolute;\n\tright: 9px;\n\tfont-family: \"Space Mono\",monospace;\n\tfont-size: 14px;\n\tmin-width: 10px;\n}");

rules.push(".tools_popup-pane__add-label--collapsed {\n\tdisplay: none;\n}");

rules.push(".tools_popup-pane__add-label--expanded {\n\tdisplay: block;\n\tpadding-top: 5px;\n\tpadding-left: 10px;\n\tpadding-bottom: 5px;\n}");

rules.push(".tools_popup-pane__apply {\n\tposition: absolute;\n\tright: 10px;\n\ttop: 94px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".tools_popup-pane__apply--collapsed {\n\tdisplay: none;\n}");

rules.push(".tools_popup-pane__apply--expanded {\n\tdisplay: inline-block;\n}");

rules.push(".tools_popup-pane__cancel {\n\tposition: absolute;\n\tright: 65px;\n\ttop: 94px;\n\tborder: 0 none transparent;\n\tbackground-color: #acacac;\n\t-moz-appearance: none;\n\tcolor: #444;\n\tpadding: 0 10px 4px;\n}");

rules.push(".tools_popup-pane__cancel--collapsed {\n\tdisplay: none;\n}");

rules.push(".tools_popup-pane__cancel--expanded {\n\tdisplay: inline-block;\n}");

rules.push(".tools_popup-pane__list {\n\tlist-style: none;\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n\tpadding-left: 20px;\n}");

rules.push(".tools_popup-pane__list-element {\n\tposition: relative;\n}");

rules.push(".tools_popup-pane__list-label {\n\tdisplay: block;\n\tcolor: #800080;\n}");

rules.push(".tools_popup-pane__list-separator {\n\tpadding-right: 5px;\n\tcolor: #000;\n}");

rules.push(".tools_popup-pane__list-input {\n\t-moz-appearance: none;\n\tborder: 1px solid #fff;\n\tfont-family: \"Space Mono\",monospace;\n\tfont-size: 14px;\n\tcolor: #00f;\n\tmin-width: 10px;\n}");

rules.push(".tools_popup-pane__list-input:focus {\n\tborder: 1px solid #bcbcbc;\n\tcolor: #fff;\n\tbackground-color: #eee;\n\tcolor: #444;\n\tbox-shadow: inset 0 0 2px 1px #fff;\n}");

rules.push(".tools_popup-pane__list-btn {\n\tposition: absolute;\n\tright: 10px;\n\tborder: 0 none transparent;\n\tbackground-color: #a93226;\n\t-moz-appearance: none;\n\ttop: 0;\n\tcolor: #fff;\n\tpadding: 0 10px 4px;\n}");

rules.push(".tools_popup-pane__list-btn--expanded {\n\tvisibility: visible;\n}");

rules.push(".tools_popup-pane__list-btn--collapsed {\n\tvisibility: hidden;\n}");

rules.push(".tools_popup-pane__highlight {\n\tposition: absolute;\n\ttop: 10px;\n\tright: 2px;\n}");

rules.push(".tools_popup-pane__dimensions-row {\n\tpadding: 5px 20px;\n}");

rules.push(".tools_popup-pane__key {\n\tcolor: #800080;\n}");

rules.push(".tools_popup-pane__value {\n\tcolor: #00f;\n}");

rules.push(".tools_popup-pane__node-name {\n\tcolor: #800080;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 10px;\n}");

exports.rules = rules;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGZpbmRfZWxlbWVudF9wb3NpdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsaXZlX21vZGVfYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcbG9hZF9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2Jyb3dzZXJfaW5mby5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGVfY29udHJvbHMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2RvbS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9oZWFkZXIuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaHRtbF9saXZlX2RlYnVnZ2VyLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2luc3BlY3Rvci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3JfcGFuZS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9saXZlX292ZXJsYXkuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXAuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfc2VjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zZXR0aW5ncy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zZXR0aW5nc19jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxzdGVhbF9jb25zb2xlX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBQVksTzs7QUFDWjs7OztBQVRBOztBQVdBLElBQU0sT0FBTyxTQUFTLElBQXRCO0FBQ0EsSUFBTSxZQUFZLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBLElBQUksc0JBQXNCLEtBQTFCO0FBQ0EsSUFBSSxXQUFXLEtBQWY7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjtB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OztBQWFBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBVUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUE7O0FBRUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBOztBQUVBLE1BQU0sSUFBTjs7QUFVQSxNQUFNLElBQU47O0FBYUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBWUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFVQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFXQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFXQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFXQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQTs7QUFFQSxNQUFNLElBQU47O0FBTUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBTUE7O0FBRUEsTUFBTSxJQUFOOztBQVdBOztBQUVBLE1BQU0sSUFBTjs7QUFhQSxNQUFNLElBQU47O0FBT0E7O0FBRUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBSUE7O0FBRUEsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFhQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFZQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7UUFPUSxLLEdBQUEsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS40IDI2LjA5LjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtsb2FkU3R5bGVzfSBmcm9tICcuL21vZHVsZXMvbG9hZF9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQnJvd3NlckluZm99IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzJztcbmltcG9ydCB7cmVuZGVyU2V0dGluZ3N9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfc2V0dGluZ3MuanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgY29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuaW1wb3J0IHtyZW5kZXJMaXZlT3ZlcmxheX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9saXZlX292ZXJsYXkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHN0ZWFsQnJvd3NlckNvbnNvbGUgPSBmYWxzZTtcbmxldCBsaXZlTW9kZSA9IGZhbHNlO1xuXG5jb250YWluZXIuaWQgPSAnZGV2X3Rvb2xzJztcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29scycpO1xuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xubG9hZFN0eWxlcygpO1xucmVuZGVySW5zcGVjdG9yKGJvZHksIGNvbnRhaW5lcik7XG5yZW5kZXJDb25zb2xlKGNvbnRhaW5lcik7XG5yZW5kZXJCcm93c2VySW5mbyhjb250YWluZXIpO1xucmVuZGVyU2V0dGluZ3MoY29udGFpbmVyKTtcblxuaWYgKGxvY2FsU3RvcmFnZVtkb2N1bWVudC5kb21haW5dKSB7XG5cblx0aWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pLnN0ZWFsQnJvd3NlckNvbnNvbGUpXG5cdFx0c3RlYWxCcm93c2VyQ29uc29sZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pLnN0ZWFsQnJvd3NlckNvbnNvbGVcblxuXHRpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXSkubGl2ZU1vZGUpXG5cdFx0bGl2ZU1vZGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtkb2N1bWVudC5kb21haW5dKS5saXZlTW9kZVxuXG59XG5cbndpbmRvdy5EVCA9IHtcblx0Y29uc29sZSxcblx0c3RlYWxCcm93c2VyQ29uc29sZSxcblx0bGl2ZU1vZGVcbn07XG5cbmlmIChzdGVhbEJyb3dzZXJDb25zb2xlKSB7XG5cdERULmJhY2t1cCA9IHdpbmRvdy5jb25zb2xlO1xuXHR3aW5kb3cuY29uc29sZSA9IERULmNvbnNvbGU7XG59XG5cbmlmIChsaXZlTW9kZSlcblx0cmVuZGVyTGl2ZU92ZXJsYXkoKTtcbiIsIi8qIGFkZF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMiwgMjAuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgYWRkQnV0dG9uQWN0aW9uID0gKGFwcGx5QnRuLCBjYW5jZWxCdG4sIG5hbWVMYWJlbCwgdmFsdWVMYWJlbCwgaGVhZGVyLCBwcmVmaXgpID0+IHtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2NhbmNlbC0tY29sbGFwc2VkYCk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FwcGx5LS1leHBhbmRlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWV4cGFuZGVkYCk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9faGVhZGVyLS1leHBhbmRlZGApO1xufTtcblxuZXhwb3J0IHthZGRCdXR0b25BY3Rpb259O1xuXG4iLCIvKiBhcHBseV9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuNCwgMjEuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5cbmNvbnN0IGFwcGx5QnV0dG9uQWN0aW9uID0gKGVsZW1lbnQsIGFkZEJ0biwgY2FuY2VsQnRuLCB2YWx1ZUxhYmVsLCBuYW1lTGFiZWwsIGFyciwgbGlzdCwgcm93LCBoZWFkZXIsIHByZWZpeCkgPT4ge1xuXG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGNvbnN0IHZhbHVlID0gdmFsdWVJbnB1dC52YWx1ZTtcblx0Y29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcblx0bGV0IGF0dHJWYWx1ZUVsZW07XG5cdGxldCBhdHRyTmFtZUVsZW07XG5cblx0bGlzdC5pbm5lckhUTUwgPSAnJztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc9JztcblxuXHRpZiAoYWRkQnRuLmlkID09PSAnYWRkX2F0dHJfYnRuJylcblx0XHRhdHRyTmFtZUVsZW0gPSBbXS5maWx0ZXIuY2FsbChyb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyksIChlbCkgPT4gZWwuaW5uZXJUZXh0ID09PSBuYW1lKVswXTtcblxuXHRpZiAoYWRkQnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpXG5cdFx0YXR0ck5hbWVFbGVtID0gW10uZmlsdGVyLmNhbGwocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJylbMF07XG5cblx0aWYgKGF0dHJWYWx1ZUVsZW0pIHtcblx0XHRhdHRyVmFsdWVFbGVtID0gYXR0ck5hbWVFbGVtLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuXHR9IGVsc2Uge1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0ck5hbWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKHNlcGFyYXRvciwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyVmFsdWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0fVxuXG5cdGlmIChhZGRCdG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKSB7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChhdHRyKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUsIHByZWZpeCk7XG5cdFx0fSk7XG5cdFx0YXR0ck5hbWVFbGVtLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0fVxuXG5cdGlmIChhZGRCdG4uaWQgPT09ICdhZGRfc3R5bGVfYnRuJykge1xuXHRcdGF0dHJOYW1lRWxlbS5pbm5lclRleHQgPSAnc3R5bGUnO1xuXHRcdGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcblx0XHRhcnIucHVzaChgJHtuYW1lfTogJHt2YWx1ZX07YCk7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSAnXCInO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChydWxlLCBpKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBydWxlLnNwbGl0KCc6ICcpWzBdLCBydWxlLnNwbGl0KCc6ICcpWzFdLnJlcGxhY2UoJzsnLCAnJyksIHByZWZpeCk7XG5cblx0XHRcdGlmKGkgIT09IDApXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICcgJztcblxuXHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gYCR7cnVsZS5zcGxpdCgnOiAnKVswXX06ICR7cnVsZS5zcGxpdCgnOiAnKVsxXX1gO1xuXG5cdFx0XHRpZiAoaSA8IGFyci5sZW5ndGggLSAxKVxuXHRcdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnOyc7XG5cdFx0XHRcdFxuXHRcdH0pO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICdcIic7XG5cdH1cblxuXHRhdHRyTmFtZUVsZW0uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0YXR0clZhbHVlRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19oZWFkZXItLWV4cGFuZGVkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRhZGRCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdGFkZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FwcGx5LS1leHBhbmRlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWNvbGxhcHNlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19jYW5jZWwtLWV4cGFuZGVkYCk7XG59O1xuXG5leHBvcnQge2FwcGx5QnV0dG9uQWN0aW9ufTtcbiIsIi8qIGNhbmNlbF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMSwgMjAuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgY2FuY2VsQnV0dG9uQWN0aW9uID0gKGFwcGx5QnRuLCBjYW5jZWxCdG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgaGVhZGVyLCBwcmVmaXgpID0+IHtcblxuXHRjb25zdCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCBuYW1lSW5wdXQgPSBuYW1lTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2hlYWRlci0tZXhwYW5kZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuXHR2YWx1ZUlucHV0LnZhbHVlID0gJyc7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYXBwbHktLWNvbGxhcHNlZGApO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FwcGx5LS1leHBhbmRlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWNvbGxhcHNlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19jYW5jZWwtLWV4cGFuZGVkYCk7XG5cbn07XG5cbmV4cG9ydCB7Y2FuY2VsQnV0dG9uQWN0aW9ufTtcbiIsIi8qIGNvbnNvbGVfY2xlYXIuanMsIHYuIDAuMS4wLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcblxuY29uc3QgY29uc29sZUNsZWFyID0gKCkgPT4ge1xuICAgIGNvbnNvbGVEaXNwbGF5LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQge2NvbnNvbGVDbGVhcn07XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjYsIDIyLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMaXN0ZW4gPSAoKSA9PiB7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcblxuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZU1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvckNvbHVtbk5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVC5jb25zb2xlLmxvZyh2YWx1ZSwgY29uc29sZUlucHV0LnZhbHVlKTtcdFxuICAgICAgICAgICAgY29uc29sZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxpc3Rlbn07XG4iLCIvKiBjb25zb2xlX2xvZy5qcywgdi4gMC4xLjIsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5jb25zdCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGNvbnN0IGxvZyA9IG5ldyBDdXN0b21FdmVudCgnbG9nJywge2RldGFpbDogW3N0ciwgdmFsdWVdfSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5kaXNwYXRjaEV2ZW50KGxvZyk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTG9nfTtcbiIsIi8qIGRvbV9lbGVtZW50X2xpc3Rlbi5qcywgdi4gMC4xLjIsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySW5zcGVjdG9yUGFuZX0gZnJvbSAnLi9yZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMnO1xuXG5jb25zdCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRjb25zdCBpbnNwZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zcGVjdG9yJyk7XG5cdGxldCBzdGFydERhdGU7XG5cdGxldCB0T2JqO1xuXHRsZXQgc3RhcnRYO1xuXHRsZXQgc3RhcnRZO1xuXHRsZXQgZW5kWDtcblx0bGV0IGVuZFk7XG5cdGxldCBkaXN0WDtcblx0bGV0IGRpc3RZO1xuXHRsZXQgbWF4WCA9IDA7XG5cdGxldCBtYXhZID0gMDtcblxuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG5cdFx0c3RhcnREYXRlID0gbmV3IERhdGUoKTtcblx0XHR0T2JqID0gZS50b3VjaGVzWzBdO1xuXHRcdHN0YXJ0WCA9IHRPYmoucGFnZVg7XG5cdFx0c3RhcnRZID0gdE9iai5wYWdlWTtcblx0fSwgZmFsc2UpO1xuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFgpID4gbWF4WClcblx0XHRcdG1heFggPSBNYXRoLmFicyhkaXN0WCk7XG5cdCAgIFxuXHRcdGlmIChNYXRoLmFicyhkaXN0WSkgPiBtYXhZKVxuXHRcdFx0bWF4WSA9IE1hdGguYWJzKGRpc3RZKTtcblx0ICAgXG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcblx0ICAgXG5cdFx0Y29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgZGF0ZUFtcCA9IGVuZERhdGUgLSBzdGFydERhdGU7XG5cdCAgIFxuXHRcdHRPYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXHRcdGVuZFggPSB0T2JqLnBhZ2VYO1xuXHRcdGVuZFkgPSB0T2JqLnBhZ2VZO1xuXHRcdGRpc3RYID0gZW5kWCAtIHN0YXJ0WDtcblx0XHRkaXN0WSA9IGVuZFkgLSBzdGFydFk7XG5cdCAgIFxuXHRcdGlmIChtYXhZIDw9IDMwICYmIG1heFggPD0gMzApIHtcblx0XHQgICBcblx0XHRcdGlmIChkYXRlQW1wIDw9IDIwMCkge1xuXHRcdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKVxuXG5cdFx0XHRcdGlmIChhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJykgfHxcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZW5kZXJJbnNwZWN0b3JQYW5lKGVsZW0sIHJvdywgaW5zcGVjdG9yKTtcblx0XHRcdH1cblx0XHQgICBcblx0XHR9XG5cdCAgIFxuXHRcdG1heFggPSAwO1xuXHRcdG1heFkgPSAwO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7ZG9tRWxlbWVudExpc3Rlbn07XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjMsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5pbXBvcnQge2NvbnNvbGVDbGVhcn0gZnJvbSAnLi9jb25zb2xlX2NsZWFyLmpzJztcblxuY29uc3QgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmNvbnN0IGNsZWFyID0gY29uc29sZUNsZWFyO1xuXG5leHBvcnQge2xvZ307XG5leHBvcnQge2NsZWFyfTtcbiIsIi8qIGZpbmRfZWxlbWVudF9wb3NpdGlvbi5qcywgdi4gMC4xLjAsIDI2LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IGZpbmRFbGVtZW50UG9zaXRpb24gPSAoeCwgeSkgPT4ge1xuXG5cdGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JvZHksIGJvZHkgKicpO1xuXG4gICAgZWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5maWx0ZXIoZWxlbWVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgZWwgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB4ID49IGVsLnggJiYgeCA8PSBlbC54ICsgZWwud2lkdGggJiYgeSA+PSBlbC55XG4gICAgICAgICAgICAmJiB5IDw9IGVsLnkgKyBlbC5oZWlnaHRcbiAgICAgICAgICAgICYmICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndG9vbHNfb3ZlcmxheScpO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdKTtcblxuICAgIHJldHVybiBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXTtcbn07XG5cbmV4cG9ydCB7ZmluZEVsZW1lbnRQb3NpdGlvbn07XG4iLCIvKiBnbG9iYWxfZXZhbC5qcywgdi4gMC4xLjAsIDMxLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbi8vIGV2YWwgLSBydW5zIGJsb2NrIHNjb3BlIGRlY2xhcmF0aW9ucyB2aWEgc2NyaXB0IGluamVjdGlvblxuLy8gb3RoZXJ3aXNlIHN0YW5kYXJkIGV2YWwgdXNlZCBcbi8vIC0gdGhpbmsgaWYgbm90IHVzZSBpbmplY3Rpb24gZXhjbHVzaXZlbHlcbi8vIHJldHVybnMgdmFsdWVcbmNvbnN0IGdsb2JhbEV2YWwgPSAoc3RyKSA9PiB7XG5cbiAgICAndXNlIHN0cmljdCc7IC8vIHByZXZlbnQgY3JlYXRpbmcgbG9jYWwgdmFyaWFibGVzIHdpdGggc3RhbmRhcmQgZXZhbFxuICAgIFxuICAgIGlmIChzdHIuc3RhcnRzV2l0aCgnbGV0ICcpIHx8IHN0ci5zdGFydHNXaXRoKCdjb25zdCAnKSkgeyAvLyBjb2RlIGZvciBzY3JpcHQgaW5zZXJ0aW9uXG5cbiAgICAgICAgbGV0IHNjcmlwdDtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKS5yZW1vdmUoKVxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5pZCA9ICdkdF9zY3JpcHQnO1xuICAgICAgICBzY3JpcHQuaW5uZXJUZXh0ID0gc3RyO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vIHJldHVybnMgdW5kZWZpbmVkIHdoZW4gZGVjbGFyaW5nIGJsb2NrIHNjb3BlZCB2YXJpYWJsZVxuICAgIH0gZWxzZSB7IC8vc3RhbmRhcmQgZXZhbFxuICAgICAgICByZXR1cm4gKDEsIGV2YWwpKHN0cik7IC8vIGluZGlyZWN0IGNhbGwgdG8gYWNjZXNzIGdsb2JhbCBzY29wZVxuICAgIH1cbn1cblxuZXhwb3J0IHtnbG9iYWxFdmFsfTtcbiIsIi8qIGhpZ2hsaWdodF9ib3hfYWN0aW9uLmpzLCB2LiAwLjEuMiwgMjEuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgaGlnaGxpZ2h0Qm94QWN0aW9uID0gKGVsZW1lbnQsIHJvdykgPT4ge1xuXG5cdGNvbnN0IHJlZ2V4cDEgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiByZ2JcXCgxNzAsIDIyMSwgMjU1XFwpIFxcIWltcG9ydGFudC8pO1xuXHRjb25zdCByZWdleHAyID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogXFwjYWRmIFxcIWltcG9ydGFudC8pO1xuXHRjb25zdCBhdHRyTmFtZSA9ICdkYXRhLWhpZ2hsaWdodCc7XG5cdGxldCBiYWNrZ3JvdW5kQ29sb3IgPSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuXHRpZiAoZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDEpKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gZWxlbWVudC5zdHlsZS5jc3NUZXh0LnJlcGxhY2UocmVnZXhwMSwgJycpO1xuXG5cdFx0aWYgKHJvdy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpICE9PSAnbm8tYmFja2dyb3VuZCcpXG5cdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHJvdy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHRcdGVsc2Vcblx0XHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXG5cdFx0cm93LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdH0gZWxzZSBpZiAoZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4cDIpKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gZWxlbWVudC5zdHlsZS5jc3NUZXh0LnJlcGxhY2UocmVnZXhwMiwgJycpO1xuXG5cdFx0aWYgKHJvdy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpICE9PSAnbm8tYmFja2dyb3VuZCcpXG5cdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHJvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGlnaGxpZ2h0Jyk7XG5cdFx0ZWxzZVxuXHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQtY29sb3I6ICNhZGYgIWltcG9ydGFudCc7XG5cdFx0cm93LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYmFja2dyb3VuZENvbG9yID8gYmFja2dyb3VuZENvbG9yIDogJ25vLWJhY2tncm91bmQnKTtcblx0fVxuXG59O1xuXG5leHBvcnQge2hpZ2hsaWdodEJveEFjdGlvbn07XG5cbiIsIi8qIGxpdmVfbW9kZV9hY3Rpb24uanMsIHYuIDAuMS4xLCAyNy4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckxpdmVPdmVybGF5fSBmcm9tICcuL3JlbmRlcl9saXZlX292ZXJsYXkuanMnO1xuXG5jb25zdCBsaXZlTW9kZUFjdGlvbiA9IChpbnB1dCkgPT4ge1xuXHREVC5saXZlTW9kZSA9IGlucHV0LmNoZWNrZWQ7XG5cblx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19vdmVybGF5Jyk7XG5cdGNvbnN0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRzdGVhbEJyb3dzZXJDb25zb2xlOiBpbnB1dC5jaGVja2VkLFxuXHRcdGxpdmVNb2RlOiBEVC5saXZlTW9kZVxuXHR9KTtcblxuXHRpZiAoRFQubGl2ZU1vZGUpXG5cdFx0cmVuZGVyTGl2ZU92ZXJsYXkoKTtcblx0ZWxzZSBpZiAob3ZlcmxheSlcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRvY3VtZW50LmRvbWFpbiwgY29uZmlnKTtcblxufTtcblxuZXhwb3J0IHtsaXZlTW9kZUFjdGlvbn07XG4iLCIvKiBsb2FkIF9zdHlsZXMuanMgdi4gMC4xLjMsIDE4LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cnVsZXN9IGZyb20gJy4vc3R5bGVzLmpzJztcbmltcG9ydCB7cmVuZGVyU3R5bGVzfSBmcm9tICcuL3JlbmRlcl9zdHlsZXMuanMnO1xuXG5jb25zdCBsb2FkU3R5bGVzID0gKCkgPT4ge1xuXG4gICAgY29uc3QgZ29vZ2xlRm9udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGdvb2dsZUZvbnQucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGdvb2dsZUZvbnQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgZ29vZ2xlRm9udC5tZWRpYSA9ICdzY3JlZW4nO1xuICAgIGdvb2dsZUZvbnQuaHJlZiA9ICdodHRwczovL2dvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U3BhY2UrTW9ubzo0MDAsNzAwJmFtcDtzdWJzZXQ9bGF0aW4tZXh0JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGdvb2dsZUZvbnQpO1xuXHRyZW5kZXJTdHlsZXMocnVsZXMpO1xufTtcblxuZXhwb3J0IHtsb2FkU3R5bGVzfTtcbiIsIi8qIHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMsIHYuIDAuMS4zLCAyNS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJBdHRySW5wdXQgPSAoZWwsIGRpc3BsYXksIHJvdywgbmFtZSwgdmFsdWUsIHByZWZpeCkgPT4ge1xuICAgXG5cdGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0Y29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRjb25zdCBzZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdGNvbnN0IGFwcGx5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0bGV0IGxlbmd0aDtcbiAgIFxuXHRpbnB1dC50eXBlID0gJ3RleHQnO1xuXHRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXHRsZW5ndGggPSB2YWx1ZS5sZW5ndGggKiA4O1xuXHRpbnB1dC5zdHlsZS53aWR0aCA9IGAke2xlbmd0aH1weGA7XG5cblx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdGlucHV0LnZhbHVlICs9ICc7JztcblxuXHRsYWJlbC5pbm5lclRleHQgPSBuYW1lO1xuXHRhcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJzonO1xuXHRsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtZWxlbWVudGApO1xuXHRsYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtbGFiZWxgKTtcblx0aW5wdXQuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWlucHV0YCk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG5gKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdHNlcGFyYXRvci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3Qtc2VwYXJhdG9yYCk7XG4gICBcblx0bGFiZWwuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yKTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXHRsYWJlbC5hcHBlbmRDaGlsZChhcHBseUJ0bik7XG5cdGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsKTtcblx0ZGlzcGxheS5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICBcblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgXG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuXHRcdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRcdGNvbnN0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRcdGNvbnN0IGxhYmVscyA9IGRpc3BsYXkucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRcdFtdLmZvckVhY2guY2FsbChsYWJlbHMsIChsYWJlbCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwuZmlyc3RDaGlsZC5kYXRhO1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cblx0XHRcdFx0XHRcdGlmIChpIDwgbGFiZWxzLmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19saXN0LWJ0bi0tZXhwYW5kZWRgKTtcblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXHRcdH1cblxuXHR9LCBmYWxzZSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuXHRcdGxlbmd0aCA9IGlucHV0LnZhbHVlLmxlbmd0aCAqIDg7XG5cdFx0aW5wdXQuc3R5bGUud2lkdGggPSBgJHtsZW5ndGh9cHhgO1xuXHR9LCBmYWxzZSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWV4cGFuZGVkYCk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdH0pO1xuXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4ge1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fbGlzdC1idG4tLWV4cGFuZGVkYCk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdH0pO1xuXG5cdGFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgXG5cdFx0Y29uc3Qgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRjb25zdCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jylcblx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuXHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09IG5hbWUgJiYgZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRsZXQgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1leHBhbmRlZGApO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1idG4tLWNvbGxhcHNlZGApO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQXR0cklucHV0fTtcbiIsIi8qIHJlbmRlcl9icm93c2VyX2luZm8uanMsIHYuIDAuMS4zLCAyMi4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxuY29uc3QgcmVuZGVyQnJvd3NlckluZm8gPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGJyb3dzZXJJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJyb3dzZXJJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHJvd0NsYXNzID0gJ2Jyb3dzZXJfZGlzcGxheV9fcm93Jztcblx0Y29uc3Qga2V5Q2xhc3MgPSAnYnJvd3Nlcl9kaXNwbGF5X19rZXknO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuaWQgPSAnYnJvd3Nlcic7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fZGlzcGxheS0tY29sbGFwc2VkJyk7XG4gICAgcmVuZGVySGVhZGVyKGJyb3dzZXJJbmZvQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoYnJvd3NlckluZm9EaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChicm93c2VySW5mb0NvbnRhaW5lcik7XG4gICAgXG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5BcHAgbmFtZTwvc3Bhbj46ICR7bmF2aWdhdG9yLmFwcENvZGVOYW1lfVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+QXBwIHZlcnNpb248L3NwYW4+OiAke25hdmlnYXRvci5hcHBWZXJzaW9ufVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+UGxhdGZvcm08L3NwYW4+OiAke25hdmlnYXRvci5wbGF0Zm9ybX1cblx0PC9kaXY+YDtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSR7cm93Q2xhc3N9PlxuXHRcdDxzcGFuIGNsYXNzPSR7a2V5Q2xhc3N9PlVzZXIgYWdlbnQ8L3NwYW4+OiAke25hdmlnYXRvci51c2VyQWdlbnR9XG5cdDwvZGl2PmA7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5XaW5kb3cgd2lkdGg8L3NwYW4+OiAke3dpbmRvdy5pbm5lcldpZHRofVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+V2luZG93IGhlaWdodDwvc3Bhbj46ICR7d2luZG93LmlubmVySGVpZ2h0fVxuXHQ8L2Rpdj5gO1xufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjUsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZUNvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzJztcblxuY29uc3QgY29uc29sZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5jb25zdCBjb25zb2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXRQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29uc29sZScpO1xuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXknKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVJbnB1dC5pZCA9ICdjb25zb2xlX2lucHV0JztcbmNvbnNvbGVJbnB1dC50eXBlID0gJ3RleHQnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdCcpO1xuY29uc29sZUNvbnRhaW5lci5pZCA9ICdjb25zb2xlJztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCcpO1xuXG5jb25zdCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIHJlbmRlckNvbnNvbGVDb250cm9scyhjb25zb2xlQ29udGFpbmVyLCBjb25zb2xlSW5wdXQpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX2NvbnRyb2xzLmpzLCB2LiAwLjEuMywgMjIuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlQ2xlYXJ9IGZyb20gJy4vY29uc29sZV9jbGVhci5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5jb25zdCBjb25zb2xlQ2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVMb2dCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGNvbnNvbGVDb250cm9sc1BhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVDb250cm9scyA9IChjb250YWluZXIsIGlucHV0KSA9PiB7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRyb2xzUGFuZWwpO1xuICAgIGNvbnNvbGVDb250cm9sc1BhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDbGVhckJ0bik7XG4gICAgY29uc29sZUNvbnRyb2xzUGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUxvZ0J0bik7XG5cdGNvbnNvbGVDb250cm9sc1BhbmVsLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tY2xlYXItYnRuJyk7XG5cdGNvbnNvbGVMb2dCdG4uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMtLWJ0bicpO1xuXHRjb25zb2xlTG9nQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1sb2ctYnRuJyk7XG5cdGNvbnNvbGVDbGVhckJ0bi5pbm5lclRleHQgPSBcIkNsZWFyXCI7XG5cdGNvbnNvbGVMb2dCdG4uaW5uZXJUZXh0ID0gXCJMb2dcIjtcblx0Y29uc29sZUNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY29uc29sZUNsZWFyKCksIGZhbHNlKTtcblx0Y29uc29sZUxvZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGxldCB2YWx1ZSA9IGdsb2JhbEV2YWwoaW5wdXQudmFsdWUpO1xuXG5cdFx0RFQuY29uc29sZS5sb2codmFsdWUsIGlucHV0LnZhbHVlKTtcdFxuXHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdH0sIGZhbHNlKTtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlQ29udHJvbHN9O1xuIiwiLyogcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcywgdi4gMC4xLjEsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9vdXRwdXQuanMnO1xuXG5jb25zdCByZW5kZXJDb25zb2xlTWVzc2FnZSA9IChtc2dBcnJheSkgPT4ge1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pIHtcblxuICAgICAgICBjb25zdCBpbnB1dE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBpbnB1dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLWknKTtcbiAgICAgICAgaW5wdXRNZXNzYWdlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX21zZy1pcHJvbXB0XCI+PC9zcGFuPiR7bXNnQXJyYXlbMF19IGA7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dE1lc3NhZ2UpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZXR1cm5NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICByZXR1cm5NZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgcmV0dXJuTWVzc2FnZS5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLXJwcm9tcHRcIj48L3NwYW4+YDtcbiAgICByZW5kZXJDb25zb2xlT3V0cHV0KG1zZ0FycmF5WzFdLCByZXR1cm5NZXNzYWdlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmV0dXJuTWVzc2FnZSk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX07XG4iLCIvLyByZW5kZXJfY29uc29sZV9vdXRwdXQuanMsIHYuIDAuMS4zLCAyMDE3IEAgZmlsaXAtc3dpbmFyc2tpXG5cbmNvbnN0IHJlbmRlckNvbnNvbGVPdXRwdXQgPSAodmFsLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgaW5kZXgpID0+IHtcblxuICAgIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgY2hlY2tTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zcGxpdCgnICcpWzFdO1xuICAgIGxldCBodG1sID0gJyc7XG5cbiAgICBjaGVja1N0ciA9IGNoZWNrU3RyLnN1YnN0cmluZygwLCBjaGVja1N0ci5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcbiAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtjaGVja1N0cn1gKTtcblx0XG4gICAgaWYgKGNoZWNrU3RyID09PSAnc3RyaW5nJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVsbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdzeW1ib2wnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgaHRtbCArPSBjaGVja1N0ciA9PT0gJ3N0cmluZycgPyBgXCIke3ZhbH1cImAgOiB2YWw7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICB9IGVsc2UgaWYgKGNoZWNrU3RyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09ICdhcnJheScgfHwgY2hlY2tTdHIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdmFsKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qga2V5Q2xhc3MgPSBjaGVja1N0ciA9PT0gJ2FycmF5JyA/ICdpbmRleCcgOiAna2V5JztcbiAgICAgICAgICAgIGxldCBjaGVja1N0cjIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsW2l0ZW1dKS5zcGxpdCgnICcpWzFdO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNoZWNrU3RyMiA9IGNoZWNrU3RyMi5zdWJzdHJpbmcoMCwgY2hlY2tTdHIyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cbiAgICAgICAgICAgIGlmIChjaGVja1N0cjIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudWxsJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdib29sZWFuJykge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyMn1gKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gY2hlY2tTdHIyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsW2l0ZW1dfVwiYCA6IHZhbFtpdGVtXTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKHZhbHVlRWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrU3RyMiA9PT0nZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2tleUNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ29uc29sZU91dHB1dCh2YWxbaXRlbV0sIG91dHB1dCwgaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgPSB2YWw7XG4gICAgfVxuXHRcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG91dHB1dCk7XG59O1xuXG5leHBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjksIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7ZG9tRWxlbWVudExpc3Rlbn0gZnJvbSAnLi9kb21fZWxlbWVudF9saXN0ZW4uanMnO1xuXG5jb25zdCByZW5kZXJET00gPSAoZWxlbSwgcGFyZW50RWwsIGxldmVsKSA9PiB7XG5cbiAgICBpZiAoZWxlbS5pZCA9PT0gJ2Rldl90b29scycpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgcm93MiA9IGVsZW0uY2hpbGRyZW4ubGVuZ3RoID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MUVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cxT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzFDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzJFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93Mk9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cyQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tb3BlbmluZycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jbG9zaW5nJyk7XG4gICAgXG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7IFxuICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzFDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93Mk9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MkNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cxT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPCc7XG4gICAgcm93MUNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MU9wZW5BcnJvdyk7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxRWxlbWVudFR5cGVTcGFuKTtcbiAgICBcbiAgICBpZiAoZWxlbS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYXR0ckVxdWFsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJWYWx1ZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5pbm5lclRleHQgPSBhdHRyLmxvY2FsTmFtZTtcbiAgICAgICAgICAgIGF0dHJFcXVhbFNwYW4uaW5uZXJUZXh0ID0gJz0nO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5pbm5lclRleHQgPSAnXCInICsgYXR0ci52YWx1ZSArICdcIic7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJOYW1lU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJFcXVhbFNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyVmFsdWVTcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVx0XG4gICAgXG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxQ2xvc2VBcnJvdyk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChyb3cxKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZXhwJyk7XG4gICAgXG4gICAgaWYgKGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICAgICAgdGV4dEVsLmlubmVyVGV4dCA9IGVsZW0udGV4dC50cmltKCk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG4gICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyRE9NKGVsLCB3cmFwcGVyLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcblx0ZG9tRWxlbWVudExpc3RlbihlbGVtLCByb3cxLCByb3cxT3BlbkFycm93KTtcbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbn1cbmV4cG9ydCB7cmVuZGVyRE9NfTtcbiIsIi8qIHJlbmRlcl9oZWFkZXIuanMsIHYuIDAuMS4yLCAyNS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJIZWFkZXIgPSAoY29udGFpbmVyLCBleHBhbmRlZCkgPT4ge1xuICAgXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRpdGxlID0gY29udGFpbmVyLmlkO1xuICAgXG4gICAgaGVhZGVyLmlkID0gYCR7Y29udGFpbmVyLmlkfV9oZWFkZXJgO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X19oZWFkZXJgKTtcbiAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHt0aXRsZX1fX3RpdGxlXCI+JHt0aXRsZX08L3NwYW4+YDtcbiAgIFxuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9faGVhZGVyLS1leHBhbmRlZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X19oZWFkZXItLWNvbGxhcHNlZGApO1xuICAgIH1cbiAgIFxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICBcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXS5maWx0ZXIuY2FsbChjb250YWluZXIuY2hpbGRyZW4sIGVsID0+IGVsLmlkICE9PSBgJHtwYXJlbnQuaWR9X19oZWFkZXJgKTtcbiAgICAgICBcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2VsLmNsYXNzTGlzdFswXX0tLWV4cGFuZGVkYCk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2VsLmNsYXNzTGlzdFswXX0tLWNvbGxhcHNlZGApO1xuICAgICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckhlYWRlcn07XG4iLCIvKiByZW5kZXJfaHRtbF9saXZlX2RlYnVnZ2VyLmpzLCB2LiAwLjEuMiwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJQb3B1cH0gZnJvbSAnLi9yZW5kZXJfcG9wdXAuanMnO1xuXG5jb25zdCByZW5kZXJIdG1sTGl2ZURlYnVnZ2VyID0gKGVsZW1lbnQpID0+IHtcblxuXHRjb25zdCBodG1sRGVidWdnZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgbmV4dENvbnRyb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgcHJldkNvbnRyb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3Qgc3RlcEluQ29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBzdGVwT3V0Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19wb3B1cCcpO1xuXG5cdGh0bWxEZWJ1Z2dlci5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcicpO1xuXHRuZXh0Q29udHJvbC5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcl9fY29udHJvbCcpO1xuXHRwcmV2Q29udHJvbC5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcl9fY29udHJvbCcpO1xuXHRzdGVwSW5Db250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sJyk7XG5cdHN0ZXBPdXRDb250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sJyk7XG5cdGh0bWxEZWJ1Z2dlci5hcHBlbmRDaGlsZChuZXh0Q29udHJvbCk7XG5cdGh0bWxEZWJ1Z2dlci5hcHBlbmRDaGlsZChwcmV2Q29udHJvbCk7XG5cdGh0bWxEZWJ1Z2dlci5hcHBlbmRDaGlsZChzdGVwSW5Db250cm9sKTtcblx0aHRtbERlYnVnZ2VyLmFwcGVuZENoaWxkKHN0ZXBPdXRDb250cm9sKTtcblx0bmV4dENvbnRyb2wuaW5uZXJUZXh0ID0gJ25leHQnO1xuXHRwcmV2Q29udHJvbC5pbm5lclRleHQgPSAncHJldic7XG5cdHN0ZXBJbkNvbnRyb2wuaW5uZXJUZXh0ID0gJ2luJztcblx0c3RlcE91dENvbnRyb2wuaW5uZXJUZXh0ID0gJ291dCc7XG5cblx0aWYgKCFlbGVtZW50Lm5leHRFbGVtZW50U2libGluZylcblx0XHRuZXh0Q29udHJvbC5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcl9fY29udHJvbC0tZGlzYWJsZWQnKTtcblxuXHRpZiAoIWVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZylcblx0XHRwcmV2Q29udHJvbC5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcl9fY29udHJvbC0tZGlzYWJsZWQnKTtcblxuXHRpZiAoIWVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpXG5cdFx0c3RlcEluQ29udHJvbC5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcl9fY29udHJvbC0tZGlzYWJsZWQnKTtcblxuXHRpZiAoIWVsZW1lbnQucGFyZW50RWxlbWVudClcblx0XHRzdGVwT3V0Q29udHJvbC5jbGFzc0xpc3QuYWRkKCd0b29sc19kZWJ1Z2dlcl9fY29udHJvbC0tZGlzYWJsZWQnKTtcblxuXHRuZXh0Q29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGlmIChlbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2xzX3BvcHVwJykucmVtb3ZlKCk7XG5cdFx0XHRyZW5kZXJQb3B1cChlbGVtZW50Lm5leHRFbGVtZW50U2libGluZyk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblx0cHJldkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cblx0XHRpZiAoZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbHNfcG9wdXAnKS5yZW1vdmUoKTtcblx0XHRcdHJlbmRlclBvcHVwKGVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblx0c3RlcEluQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGlmIChlbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKSB7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbHNfcG9wdXAnKS5yZW1vdmUoKTtcblx0XHRcdHJlbmRlclBvcHVwKGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXHRcdH1cblxuXHR9LCBmYWxzZSk7XG5cdHN0ZXBPdXRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG5cdFx0aWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2xzX3BvcHVwJykucmVtb3ZlKCk7XG5cdFx0XHRyZW5kZXJQb3B1cChlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuXHRcdH1cblxuXHR9LCBmYWxzZSk7XG5cdHJldHVybiBodG1sRGVidWdnZXI7XG59O1xuXG5leHBvcnQge3JlbmRlckh0bWxMaXZlRGVidWdnZXJ9O1xuIiwiLyogcmVuZGVyX2luc3BlY3Rvci5qcywgdi4gMC4xLjYsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyRE9NfSBmcm9tICcuL3JlbmRlcl9kb20uanMnO1xuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IHJlbmRlckluc3BlY3RvciA9IChib2R5LCBwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgaW5zcGVjdG9yRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBodG1sRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmlkID0gJ2luc3BlY3Rvcic7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3RvcicpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheScpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuaWQgPSAnaW5zcGVjdG9yX2Rpc3BsYXknO1xuICAgIHJlbmRlckhlYWRlcihpbnNwZWN0b3JDb250YWluZXIsIHRydWUpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCcpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JEaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChpbnNwZWN0b3JDb250YWluZXIpO1xuICAgIHJlbmRlckRPTShodG1sRWxlbSwgaW5zcGVjdG9yRGlzcGxheSwgbGV2ZWwpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckluc3BlY3Rvcn07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMsIHYuIDAuMS42LCAyNy4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclNlY3Rpb259IGZyb20gJy4vcmVuZGVyX3NlY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJJbnNwZWN0b3JQYW5lID0gKGVsZW1lbnQsIHJvdywgY29udGFpbmVyKSA9PiB7XG5cblx0Y29uc3QgaWQgPSBjb250YWluZXIuaWRcbiAgICBjb25zdCBpbnNwZWN0b3JQYW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGF0dHJpYnV0ZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHN0eWxlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaW5zcGVjdG9yUGFuZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaGlnaGxpZ2h0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBkaW1lbnNpb25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaW5zcGVjdG9yUGFuZS5jbGFzc0xpc3QuYWRkKGAke2lkfS1wYW5lYCk7XG5cdGluc3BlY3RvclBhbmVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7aWR9LXBhbmVfX3dyYXBwZXJgKTtcblxuXHRpZiAoaWQgPT09ICdpbnNwZWN0b3InKSB7XG5cblx0XHRjb25zdCBjbG9zZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoYCR7aWR9LXBhbmVfX2Nsb3NlYCk7XG5cdFx0Y2xvc2VCdG4uaW5uZXJIVE1MID0gJ3gnO1xuXHRcdGluc3BlY3RvclBhbmUuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuXHRcdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0aW5zcGVjdG9yUGFuZS5yZW1vdmUoKTtcblx0XHR9LCBmYWxzZSk7XG5cdH1cblx0XG5cdGlmIChpZCA9PT0gJ3Rvb2xzX3BvcHVwJylcblx0XHRyZW5kZXJTZWN0aW9uKCdub2RlX25hbWUnLCBgJHtpZH0tcGFuZWAsICdOb2RlIG5hbWUnLCBlbGVtZW50LCByb3csIGF0dHJpYnV0ZUxpc3RXcmFwcGVyKTtcblxuXHRyZW5kZXJTZWN0aW9uKCdhdHRyX2xpc3QnLCBgJHtpZH0tcGFuZWAsICdBdHRyaWJ1dGVzJywgZWxlbWVudCwgcm93LCBhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG5cdHJlbmRlclNlY3Rpb24oJ3N0eWxlX2xpc3QnLCBgJHtpZH0tcGFuZWAsICdJbmxpbmUgc3R5bGVzJywgZWxlbWVudCwgcm93LCBzdHlsZUxpc3RXcmFwcGVyKTtcblxuXHRpZiAoaWQgPT09ICdpbnNwZWN0b3InKVxuXHRcdHJlbmRlclNlY3Rpb24oJ2hpZ2hsaWdodF9zZWN0aW9uJywgYCR7aWR9LXBhbmVgLCAnSGlnaGxpZ2h0IGVsZW1lbnQnLCBlbGVtZW50LCByb3csIGhpZ2hsaWdodFdyYXBwZXIpO1xuXG5cdHJlbmRlclNlY3Rpb24oJ2RpbWVuc2lvbnNfc2VjdGlvbicsIGAke2lkfS1wYW5lYCwgJ0RpbWVuc2lvbnMnLCBlbGVtZW50LCByb3csIGRpbWVuc2lvbnNXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZVdyYXBwZXIuYXBwZW5kQ2hpbGQoc3R5bGVMaXN0V3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZVdyYXBwZXIuYXBwZW5kQ2hpbGQoaGlnaGxpZ2h0V3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZVdyYXBwZXIuYXBwZW5kQ2hpbGQoZGltZW5zaW9uc1dyYXBwZXIpO1xuICAgIGluc3BlY3RvclBhbmUuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yUGFuZVdyYXBwZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JQYW5lKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVySW5zcGVjdG9yUGFuZX07XG4iLCIvKiByZW5kZXJfbGl2ZV9vdmVybGF5LmpzLCB2LiAwLjEuMSwgMjYuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtmaW5kRWxlbWVudFBvc2l0aW9ufSBmcm9tICcuL2ZpbmRfZWxlbWVudF9wb3NpdGlvbi5qcyc7XG5pbXBvcnQge3JlbmRlclBvcHVwfSBmcm9tICcuL3JlbmRlcl9wb3B1cC5qcyc7XG5cbmNvbnN0IHJlbmRlckxpdmVPdmVybGF5ID0gKCkgPT4ge1xuICAgXG5cdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXHRvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX292ZXJsYXknKTtcblx0b3ZlcmxheS5pZCA9ICd0b29sc19vdmVybGF5Jztcblx0b3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9IGZpbmRFbGVtZW50UG9zaXRpb24oZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuXG5cdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19saXZlX3BvcHVwJykpXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbHNfbGl2ZV9wb3B1cCcpLnJlbW92ZSgpO1xuXG5cdFx0cmVuZGVyUG9wdXAoZWxlbWVudCk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyTGl2ZU92ZXJsYXl9O1xuIiwiLyogcmVuZGVyX3BvcHVwLmpzLCB2LiAwLjEuOCwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJIdG1sTGl2ZURlYnVnZ2VyfSBmcm9tICcuL3JlbmRlcl9odG1sX2xpdmVfZGVidWdnZXIuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3JQYW5lfSBmcm9tICcuL3JlbmRlcl9pbnNwZWN0b3JfcGFuZS5qcyc7XG5cbmNvbnN0IHJlbmRlclBvcHVwID0gKGVsZW1lbnQpID0+IHtcblxuXHRjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBjbG9zZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgcG9wdXBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaHRtbERlYnVnZ2VyID0gcmVuZGVySHRtbExpdmVEZWJ1Z2dlcihlbGVtZW50KTtcblx0Y29uc3QgcG9zaXRpb24gPSBlbGVtZW50UmVjdC55ICsgcG9wdXAuY2xpZW50SGVpZ2h0O1xuXG5cdHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX3BvcHVwJyk7XG5cdHBvcHVwLmlkID0gJ3Rvb2xzX3BvcHVwJztcblxuXHRpZiAocG9zaXRpb24gPCAwKVxuXHRcdHBvcHVwLnN0eWxlLnRvcCA9IGAwcHhgO1xuXHRlbHNlIGlmIChlbGVtZW50UmVjdC55ID49IHdpbmRvdy5pbm5lckhlaWdodClcblx0XHRwb3B1cC5zdHlsZS50b3AgPSBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLSBwb3B1cC5jbGllbnRIZWlnaHR9cHhgO1xuXHRlbHNlXG5cdFx0cG9wdXAuc3R5bGUudG9wID0gYCR7cG9zaXRpb259cHhgO1xuXG5cdHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd0b29sc19wb3B1cF9fd3JhcHBlcicpO1xuXHRjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCd0b29sc19wb3B1cF9fY2xvc2UnKTtcblx0Y2xvc2VCdG4uaW5uZXJIVE1MID0gJ3gnO1xuXG5cdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG5cdFx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19vdmVybGF5Jyk7XG5cdFx0Y29uc3QgbGl2ZU1vZGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXZlX21vZGVfaW5wdXQnKTtcblx0XHRjb25zdCBjb25maWcgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRzdGVhbEJyb3dzZXJDb25zb2xlOiBEVC5zdGVhbEJyb3dzZXJDb25zb2xlLFxuXHRcdFx0bGl2ZU1vZGU6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShkb2N1bWVudC5kb21haW4sIGNvbmZpZyk7XG5cdFx0b3ZlcmxheS5yZW1vdmUoKTtcblx0XHRsaXZlTW9kZUlucHV0LmNoZWNrZWQgPSBmYWxzZTtcblx0XHREVC5saXZlTW9kZSA9IGZhbHNlO1xuXHRcdHBvcHVwLnJlbW92ZSgpO1xuXHR9LCBmYWxzZSk7XG5cblx0cG9wdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuXHRwb3B1cC5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuXHRwb3B1cFdyYXBwZXIuYXBwZW5kQ2hpbGQoaHRtbERlYnVnZ2VyKTtcblx0cmVuZGVySW5zcGVjdG9yUGFuZShlbGVtZW50LCBudWxsLCBwb3B1cCk7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXApO1xufTtcblxuZXhwb3J0IHtyZW5kZXJQb3B1cH07XG4iLCIvKiByZW5kZXJfc2VjdGlvbi5qcywgdi4gMC4xLjQsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQXR0cklucHV0fSBmcm9tICcuL3JlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMnO1xuaW1wb3J0IHthZGRCdXR0b25BY3Rpb259IGZyb20gJy4vYWRkX2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHthcHBseUJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9hcHBseV9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7Y2FuY2VsQnV0dG9uQWN0aW9ufSBmcm9tICcuL2NhbmNlbF9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7aGlnaGxpZ2h0Qm94QWN0aW9ufSBmcm9tICcuL2hpZ2hsaWdodF9ib3hfYWN0aW9uLmpzJztcblxuY29uc3QgcmVuZGVyU2VjdGlvbiA9IChpZCwgcHJlZml4LCB0aXRsZSwgZWxlbWVudCwgcm93LCBsaXN0V3JhcHBlcikgPT4ge1xuXG5cdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgcmVnZXhwMSA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IHJnYlxcKDE3MCwgMjIxLCAyNTVcXCkgXFwhaW1wb3J0YW50Lyk7XG5cdGNvbnN0IHJlZ2V4cDIgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiBcXCNhZGYgXFwhaW1wb3J0YW50Lyk7XG5cdGxldCBzZWN0aW9uTmFtZSA9ICcnO1xuXG5cdGhlYWRlci5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3ByZWZpeH1fX2hlYWRsaW5lXCI+JHt0aXRsZX08L3NwYW4+YDtcblx0bGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblx0bGlzdC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3RgKTtcblxuXHRpZiAoaWQgPT09ICdhdHRyX2xpc3QnIHx8IGlkID09PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNvbnN0IGFkZEFwcGx5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0Y29uc3QgYWRkQ2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0Y29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRjb25zdCB2YWx1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRjb25zdCBuYW1lSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdFx0Y29uc3QgdmFsdWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0XHRsZXQgYXJyO1xuXHRcdFxuXHRcdGxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cdFx0aWYgKGlkID09PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0YXJyID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBhdHRyID0+IGF0dHIubmFtZSAhPT0gJ3N0eWxlJyk7XG5cdFx0XHRzZWN0aW9uTmFtZSA9ICdhdHRyaWJ1dGVzJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJyID0gW107XG5cdFx0XHRzZWN0aW9uTmFtZSA9ICdzdHlsZXMnO1xuXHRcdH1cblxuXHRcdGxpc3QuaWQgPSBpZDtcblx0XHRhZGRCdG4uaW5uZXJUZXh0ID0gJysnO1xuXHRcdGFkZEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZGApO1xuXHRcdGFkZEFwcGx5QnRuLmlubmVyVGV4dCA9ICdBcHBseSc7XG5cdFx0YWRkQ2FuY2VsQnRuLmlubmVyVGV4dCA9ICdDYW5jZWwnO1xuXHRcdGFkZEFwcGx5QnRuLmlkID0gYGFkZF8ke2lkLnJlcGxhY2UoJ19saXN0JywgJycpfV9idG5gO1xuXHRcdGFkZEFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYXBwbHlgKTtcblx0XHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWxgKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IG5hbWUgJyA6ICdhdHRyaWJ1dGUgbmFtZSAnO1xuXHRcdHZhbHVlSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IHZhbHVlICcgOiAnYXR0cmlidXRlIHZhbHVlICc7XG5cdFx0bmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdFx0bmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWlucHV0YCk7XG5cdFx0dmFsdWVJbnB1dC50eXBlID0gJ3RleHQnO1xuXHRcdHZhbHVlSW5wdXQuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtaW5wdXRgKTtcblx0XHRhZGRBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FwcGx5LS1jb2xsYXBzZWRgKTtcblx0XHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWNvbGxhcHNlZGApO1xuXHRcdG5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0XHR2YWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRDYW5jZWxCdG4pO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRBcHBseUJ0bik7XG5cdFx0bmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblx0XHR2YWx1ZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dExhYmVsKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dExhYmVsKTtcblxuXHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnICYmIGVsZW1lbnQuYXR0cmlidXRlcyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUpIHtcblx0XHRcdGFyciA9ICcnLnNwbGl0LmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlLnZhbHVlLCAnOyAnKVxuXHRcdFx0YXJyID0gYXJyLm1hcChydWxlID0+IHJ1bGUucmVwbGFjZSgnOycsICcnKSk7XG5cblx0XHRcdGlmIChyb3cuaGFzQXR0cmlidXRlKCdkYXRhLWhpZ2hsaWdodCcpKVxuXHRcdFx0XHRhcnIgPSBhcnIuZmlsdGVyKHJ1bGUgPT4gIXJ1bGUubWF0Y2gocmVnZXhwMSkgJiYgIXJ1bGUubWF0Y2gocmVnZXhwMikpO1xuXG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaXRlbSBpbiBhcnIpIHtcblx0XHRcdFxuXHRcdFx0bGV0IG5hbWU7XG5cdFx0XHRsZXQgdmFsdWU7XG5cblx0XHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cdFx0XHRcdG5hbWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMF07XG5cdFx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnNwbGl0KCc6ICcpWzFdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmFtZSA9IGFycltpdGVtXS5uYW1lO1xuXHRcdFx0XHR2YWx1ZSA9IGFycltpdGVtXS52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgbmFtZSwgdmFsdWUsIHByZWZpeCk7XG5cdFx0fVxuXG5cdFx0YWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGFkZEJ1dHRvbkFjdGlvbihhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCBuYW1lSW5wdXRMYWJlbCwgdmFsdWVJbnB1dExhYmVsLCBoZWFkZXIsIHByZWZpeCk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdGFkZEFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0YXBwbHlCdXR0b25BY3Rpb24oZWxlbWVudCwgYWRkQXBwbHlCdG4sIGFkZENhbmNlbEJ0biwgdmFsdWVJbnB1dExhYmVsLCBuYW1lSW5wdXRMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlciwgcHJlZml4KTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0YWRkQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0Y2FuY2VsQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIHZhbHVlSW5wdXRMYWJlbCwgbmFtZUlucHV0TGFiZWwsIGhlYWRlciwgcHJlZml4KTtcblx0XHR9LCBmYWxzZSk7XG5cdH0gZWxzZSBpZiAoaWQgPT09ICdoaWdobGlnaHRfc2VjdGlvbicpIHtcblxuXHRcdGNvbnN0IGhpZ2hsaWdodENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblxuXHRcdHNlY3Rpb25OYW1lID0gJ2hpZ2hsaWdodCc7XG5cdFx0aGlnaGxpZ2h0Q2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG5cdFx0aGlnaGxpZ2h0Q2hlY2tib3guY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19oaWdobGlnaHRgKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQoaGlnaGxpZ2h0Q2hlY2tib3gpO1xuXG5cdFx0aWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAxKSB8fCBlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMikpXG5cdFx0XHRoaWdobGlnaHRDaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcblxuXHRcdGhpZ2hsaWdodENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcblx0XHRcdGhpZ2hsaWdodEJveEFjdGlvbihlbGVtZW50LCByb3cpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSBlbHNlIGlmIChpZCA9PT0gJ2RpbWVuc2lvbnNfc2VjdGlvbicpIHtcblxuXHRcdGNvbnN0IHdpZHRoUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29uc3QgaGVpZ2h0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRzZWN0aW9uTmFtZSA9ICdkaW1lbnNpb25zJztcblx0XHR3aWR0aFJvdy5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2RpbWVuc2lvbnMtcm93YCk7XG5cdFx0aGVpZ2h0Um93LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fZGltZW5zaW9ucy1yb3dgKTtcblx0XHR3aWR0aFJvdy5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3ByZWZpeH1fX2tleVwiPndpZHRoOiA8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cIiR7cHJlZml4fV9fdmFsdWVcIj4ke2VsZW1lbnQuY2xpZW50V2lkdGh9cHg8L3NwYW4+YDtcblx0XHRoZWlnaHRSb3cuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtwcmVmaXh9X19rZXlcIj5oZWlnaHQ6IDwvc3Bhbj5cblx0XHRcdDxzcGFuIGNsYXNzPVwiJHtwcmVmaXh9X192YWx1ZVwiPiR7ZWxlbWVudC5jbGllbnRIZWlnaHR9cHg8L3NwYW4+YDtcblx0XHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh3aWR0aFJvdyk7XG5cdFx0bGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVpZ2h0Um93KTtcblx0fSBlbHNlIGlmIChpZCA9PT0gJ25vZGVfbmFtZScpIHtcblxuXHRcdGNvbnN0IG5vZGVOYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5cdFx0bm9kZU5hbWVDb250YWluZXIuaW5uZXJUZXh0ID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdG5vZGVOYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbm9kZS1uYW1lYCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKG5vZGVOYW1lQ29udGFpbmVyKTtcblx0fVxuXG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2hlYWRlcmApO1xuXHRsaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX3NlY3Rpb25gKTtcblx0bGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19zZWN0aW9uLS0ke3NlY3Rpb25OYW1lfWApO1xufTtcblxuZXhwb3J0IHtyZW5kZXJTZWN0aW9ufTtcbiIsIi8qIHJlbmRlcl9zZXR0aW5ncy5qcywgdi4gMC4xLjAsIDIyLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuaW1wb3J0IHtyZW5kZXJTZXR0aW5nc0NvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9zZXR0aW5nc19jb250cm9scy5qcyc7XG5cbmNvbnN0IHJlbmRlclNldHRpbmdzID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBzZXR0aW5nc0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc2V0dGluZ3NDb250YWluZXIuaWQgPSAnc2V0dGluZ3MnO1xuICAgIHNldHRpbmdzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzJyk7XG4gICAgc2V0dGluZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfX3BhbmVsJyk7XG4gICAgc2V0dGluZ3NEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX19kaXNwbGF5Jyk7XG4gICAgc2V0dGluZ3NEaXNwbGF5LmlkID0gJ3NldHRpbmdzX2Rpc3BsYXknO1xuICAgIHNldHRpbmdzRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19fZGlzcGxheS0tY29sbGFwc2VkJyk7XG4gICAgcmVuZGVySGVhZGVyKHNldHRpbmdzQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgc2V0dGluZ3NDb250YWluZXIuYXBwZW5kQ2hpbGQoc2V0dGluZ3NEaXNwbGF5KTtcblx0cmVuZGVyU2V0dGluZ3NDb250cm9scyhzZXR0aW5nc0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKHNldHRpbmdzQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyU2V0dGluZ3N9O1xuIiwiLyogcmVuZGVyX3NldHRpbmdzX2NvbnRyb2xzLmpzLCB2LiAwLjEuMiwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtzdGVhbENvbnNvbGVBY3Rpb259IGZyb20gJy4vc3RlYWxfY29uc29sZV9hY3Rpb24uanMnO1xuaW1wb3J0IHtsaXZlTW9kZUFjdGlvbn0gZnJvbSAnLi9saXZlX21vZGVfYWN0aW9uLmpzJztcblxuY29uc3QgcmVuZGVyU2V0dGluZ3NDb250cm9scyA9IChjb250YWluZXIpID0+IHtcblxuXHRjb25zdCBzdGVhbENvbnNvbGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3Qgc3RlYWxDb25zb2xlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRjb25zdCBzdGVhbENvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdGNvbnN0IGxpdmVNb2RlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGxpdmVNb2RlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRjb25zdCBsaXZlTW9kZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bGV0IHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXSBcblx0XHQ/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pIDogZmFsc2U7XG5cblx0c3RlYWxDb25zb2xlUm93LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX2Rpc3BsYXlfX3JvdycpO1xuXHRzdGVhbENvbnNvbGVMYWJlbC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19kaXNwbGF5X19sYWJlbCcpO1xuXHRzdGVhbENvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19kaXNwbGF5X19pbnB1dCcpO1xuXHRzdGVhbENvbnNvbGVJbnB1dC50eXBlID0gJ2NoZWNrYm94Jztcblx0c3RlYWxDb25zb2xlSW5wdXQuaWQgPSAnc3RlYWxfYnJvd3Nlcl9jb25zb2xlX2lucHV0Jztcblx0c3RlYWxDb25zb2xlTGFiZWwuaW5uZXJUZXh0ID0gJ1N0ZWFsIGJyb3dzZXIgY29uc29sZSc7XG5cdHN0ZWFsQ29uc29sZVJvdy5hcHBlbmRDaGlsZChzdGVhbENvbnNvbGVMYWJlbCk7XG5cdHN0ZWFsQ29uc29sZUxhYmVsLmFwcGVuZENoaWxkKHN0ZWFsQ29uc29sZUlucHV0KTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZWFsQ29uc29sZVJvdyk7XG5cblx0aWYgKHN0b3JhZ2UgJiYgc3RvcmFnZS5zdGVhbEJyb3dzZXJDb25zb2xlKVxuXHRcdHN0ZWFsQ29uc29sZUlucHV0LmNoZWNrZWQgPSB0cnVlO1xuXHRlbHNlXG5cdFx0c3RlYWxDb25zb2xlSW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuXG5cdHN0ZWFsQ29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+XG5cdFx0c3RlYWxDb25zb2xlQWN0aW9uKHN0ZWFsQ29uc29sZUlucHV0KSwgZmFsc2UpO1xuXG5cdGxpdmVNb2RlUm93LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX2Rpc3BsYXlfX3JvdycpO1xuXHRsaXZlTW9kZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX2Rpc3BsYXlfX2xhYmVsJyk7XG5cdGxpdmVNb2RlSW5wdXQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfZGlzcGxheV9faW5wdXQnKTtcblx0bGl2ZU1vZGVJbnB1dC50eXBlID0gJ2NoZWNrYm94Jztcblx0bGl2ZU1vZGVJbnB1dC5pZCA9ICdsaXZlX21vZGVfaW5wdXQnO1xuXHRsaXZlTW9kZUxhYmVsLmlubmVyVGV4dCA9ICdMaXZlIG1vZGUnO1xuXHRsaXZlTW9kZVJvdy5hcHBlbmRDaGlsZChsaXZlTW9kZUxhYmVsKTtcblx0bGl2ZU1vZGVMYWJlbC5hcHBlbmRDaGlsZChsaXZlTW9kZUlucHV0KTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGxpdmVNb2RlUm93KTtcblxuXHRpZiAoc3RvcmFnZSAmJiBzdG9yYWdlLmxpdmVNb2RlKVxuXHRcdGxpdmVNb2RlSW5wdXQuY2hlY2tlZCA9IHRydWU7XG5cdGVsc2Vcblx0XHRsaXZlTW9kZUlucHV0LmNoZWNrZWQgPSBmYWxzZTtcblxuXHRsaXZlTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IFxuXHRcdGxpdmVNb2RlQWN0aW9uKGxpdmVNb2RlSW5wdXQpLCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlclNldHRpbmdzQ29udHJvbHN9O1xuIiwiLyogcmVuZGVyX3N0eWxlcy5qcywgdi4gMC4xLjAsIDE4LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlclN0eWxlcyA9IChydWxlcykgPT4ge1xuXG4gICAgY29uc3Qgc3R5bGVTaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuICAgIHJ1bGVzLmZvckVhY2goKHJ1bGUsIGkpID0+IHtzdHlsZVNoZWV0LnNoZWV0Lmluc2VydFJ1bGUocnVsZSwgaSk7fSk7XG59O1xuXG5leHBvcnQge3JlbmRlclN0eWxlc307XG4iLCIvKiBzdGVhbF9jb25zb2xlX2FjdGlvbi5qcywgdi4gMC4xLjEsIDI2LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHN0ZWFsQ29uc29sZUFjdGlvbiA9IChpbnB1dCkgPT4ge1xuXG5cdGNvbnN0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRzdGVhbEJyb3dzZXJDb25zb2xlOiBpbnB1dC5jaGVja2VkLFxuXHRcdGxpdmVNb2RlOiBEVC5saXZlTW9kZVxuXHR9KTtcblxuXHRpZiAoaW5wdXQuY2hlY2tlZCkge1xuXHRcdERULmJhY2t1cCA9IHdpbmRvdy5jb25zb2xlO1xuXHRcdHdpbmRvdy5jb25zb2xlID0gRFQuY29uc29sZTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY29uc29sZSA9IERULmJhY2t1cDtcblx0XHREVC5iYWNrdXAgPSBudWxsO1xuXHR9XG5cblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oZG9jdW1lbnQuZG9tYWluLCBjb25maWcpO1xuXHREVC5zdGVhbEJyb3dzZXJDb25zb2xlID0gaW5wdXQuY2hlY2tlZDtcbn07XG5cbmV4cG9ydCB7c3RlYWxDb25zb2xlQWN0aW9ufTtcblxuIiwiLyogc3R5bGVzLmpzLCB2LiAwLjEuMTMsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJ1bGVzID0gW107XG5cbi8qIGJhc2UgKi9cblxucnVsZXMucHVzaChgLmJvZHkge1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAxMDAlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHMge1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGZvbnQtZmFtaWx5OiAnU3BhY2UgTW9ubycsIG1vbm9zcGFjZTtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR6LWluZGV4OiA5OTk5OTk5O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfX3BhbmVsIHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG4vKiBpbnNwZWN0b3IgKi9cblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9faGVhZGVyIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5IHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRvdmVyZmxvdzogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheSA+IC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93IHtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDsgY29sb3I6ICM0NDQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdzpob3Zlcjo6YmVmb3JlIHtcblx0Y29udGVudDogJyc7XG5cdHdpZHRoOiAxMDAlO1xuXHRoZWlnaHQ6IDIwcHg7XG5cdGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0ei1pbmRleDogLTE7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdy0tb3BlbmluZyB7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93LS1leHBhbmRlZCB+IC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBub25lO1xuXHRtYXJnaW4tbGVmdDogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4ge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuOjphZnRlciB7XG5cdGNvbnRlbnQ6ICcnO1xuXHRkaXNwbGF5OiBub25lO1xuXHRib3JkZXItbGVmdDogNnB4IHNvbGlkICNiYmI7XG5cdGJvcmRlci10b3A6IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogNXB4O1xuXHRsZWZ0OiAtOHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkOjphZnRlciB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHR0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkOjphZnRlciB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHR0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1jbG9zZTpsYXN0LWNoaWxkIHtcblx0cGFkZGluZy1yaWdodDogMTBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW5hbWUge1xuXHRjb2xvcjogIzgwMDA4MDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fYXR0ci1uYW1lIHtcblx0Y29sb3I6ICMwMDA7XG5cdHBhZGRpbmctbGVmdDogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19hdHRyLXZhbHVlIHtcblx0Y29sb3I6ICMwMGY7XG59YCk7XG5cbi8qIGNvbnNvbGUgKi9cblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2hlYWRlciB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWJ0biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC1mYW1pbHk6IFwiU3BhY2UgTW9ub1wiLCBtb25vc3BhY2U7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1jbGVhci1idG4ge1xuICAgIHJpZ2h0OiA2cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scy0tbG9nLWJ0biB7XG4gICAgcmlnaHQ6IDYzcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scyB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1leHBhbmRlZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19kaXNwbGF5IHtcblx0b3ZlcmZsb3c6IGF1dG87XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19kaXNwbGF5LS1jb2xsYXBzZWQge1xuXHRoZWlnaHQ6IDA7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcblx0Ym9yZGVyLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbnB1dCB7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAycHgpO1xuXHRoZWlnaHQ6IDMwcHg7XG5cdG1hcmdpbjogMDtcblx0cGFkZGluZzogMDtcblx0dGV4dC1pbmRlbnQ6IDMwcHg7XG5cdGJvcmRlci1ib3R0b206IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNiY2JjYmM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbnB1dC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDMwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbnB1dC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLS1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fcHJvbXB0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAwO1xuXHRib3R0b206IDA7XG5cdHdpZHRoOiAzMHB4O1xuXHRoZWlnaHQ6IDMwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQ6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICc+Pic7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogM3B4O1xuXHRsZWZ0OiA1cHg7XG5cdGhlaWdodDogMTBweDtcblx0Y29sb3I6ICNhY2FjYWM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctaSB7XG5cdGNvbG9yOiAjYWNhY2FjO1xuXHRwYWRkaW5nOiA1cHggNXB4IDVweCAyNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXIge1xuXHRjb2xvcjogIzAwMDtcblx0cGFkZGluZzogNXB4IDVweCA1cHggMjVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1yLS1lcnIge1xuXHRjb2xvcjogI2E5MzIyNjtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZhZGJkODtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1ycHJvbXB0IHtcblx0d2lkdGg6IDI1cHg7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0Y29sb3I6ICNhY2FjYWM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctcnByb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJzw9Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogLTIwcHg7XG5cdHRvcDogM3B4O1xuXHRmb250LXNpemU6IDEycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctaXByb21wdCB7XG5cdHdpZHRoOiAyNXB4OyBwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctaXByb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJz4+Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogLTIwcHg7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Vyci1wcm9tcHQge1xuXHR3aWR0aDogMjVweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZXJyLXByb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJ3gnO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMTdweDtcblx0dG9wOiAwO1xuXHRmb250LXNpemU6IDEycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX191bmRlZmluZWQge1xuXHRjb2xvcjogI2FkYWRhZDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX251bWJlciB7XG5cdGNvbG9yOiAjMDAwMGNjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fc3RyaW5nIHtcblx0Y29sb3I6ICNjYzY2MDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19ib29sZWFuIHtcblx0Y29sb3I6ICM4MDAwMDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19udWxsIHtcblx0Y29sb3I6ICM4MDAwMDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19rZXkge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2tleTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnOiAnO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faW5kZXgge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fdmFsdWU6bm90KDpsYXN0LWNoaWxkKTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnLCAnO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fYXJyYXk6OmFmdGVyIHtcblx0Y29udGVudDogJ10nO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fYXJyYXk6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICdbJztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX29iamVjdDo6YWZ0ZXIge1xuXHRjb250ZW50OiAnfSc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19vYmplY3Q6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICd7Jztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2YtbmFtZSB7XG5cdGNvbG9yOiAjMDA5OWZmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZi1rZXkge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxuLyogYnJvd3Nlcl9pbmZvICovXG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19oZWFkZXIge1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19oZWFkZXItLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiY2JjYmM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19kaXNwbGF5IHtcblx0cGFkZGluZzogMTBweDsgb3ZlcmZsb3c6IGhpZGRlbjtcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2Rpc3BsYXktLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDE2M3B4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9fZGlzcGxheS0tY29sbGFwc2VkIHtcblx0aGVpZ2h0OiAwO1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkaW5nLXRvcCBwYWRkaW5nLWJvdHRvbSAuNXM7XG5cdHBhZGRpbmctdG9wOiAwO1xuXHRwYWRkaW5nLWJvdHRvbTogMDtcblx0Ym9yZGVyLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX2Rpc3BsYXlfX3JvdyB7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX2Rpc3BsYXlfX2tleSB7XG4gICAgY29sb3I6ICM4MDAwODA7XG59YCk7XG5cbi8qIGluc3BlY3Rvcl9wYW5lICovXG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZSB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDJweCk7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRvcDogMzlweDtcblx0bGVmdDogMXB4O1xuXHRvdmVyZmxvdy15OiBhdXRvO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2Nsb3NlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDA7XG5cdHJpZ2h0OiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiA2cHggNXB4IDdweCA1cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0Zm9udC1zaXplOiAyMHB4O1xuXHR6LWluZGV4OiAxO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX3dyYXBwZXIge1xuXHRoZWlnaHQ6IDQwMHB4O1xuXHRvdmVyZmxvdy14OiBoaWRkZW47XG5cdG92ZXJmbG93LXk6IHNjcm9sbDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hlYWRlciB7XG5cdHBhZGRpbmc6IDEwcHggMTBweCA1cHggMTBweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VmZWZlZjtcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNlZmVmZWY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fc2VjdGlvbjpmaXJzdC1jaGlsZCAuaW5zcGVjdG9yLXBhbmVfX2hlYWRlciB7XG5cdGJvcmRlci10b3A6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19oZWFkZXItLWV4cGFuZGVkIHtcblx0cGFkZGluZy1ib3R0b206IDQwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9faGVhZGxpbmUge1xuXHRkaXNwbGF5OiBibG9jaztcblx0cGFkZGluZy1ib3R0b206IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hZGQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdGJveC1zaGFkb3c6IG5vbmU7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRwYWRkaW5nOiAwO1xuXHRyaWdodDogNXB4O1xuXHR0b3A6IDVweDtcblx0Zm9udC1zaXplOiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX3NlY3Rpb246Zmlyc3QtY2hpbGQgLmluc3BlY3Rvci1wYW5lX19hZGQge1xuXHRyaWdodDogMzJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hZGQtaW5wdXQge1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDlweDtcblx0Zm9udC1mYW1pbHk6IFwiU3BhY2UgTW9ub1wiLG1vbm9zcGFjZTtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRtaW4td2lkdGg6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYWRkLWxhYmVsLS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FkZC1sYWJlbC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcblx0cGFkZGluZy10b3A6IDVweDtcblx0cGFkZGluZy1sZWZ0OiAxMHB4O1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FwcGx5IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0dG9wOiA5NHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2E5MzIyNjtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hcHBseS0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hcHBseS0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2FuY2VsIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogNjVweDtcblx0dG9wOiA5NHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2FjYWNhYztcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRjb2xvcjogIzQ0NDtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19jYW5jZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2FuY2VsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0IHtcblx0bGlzdC1zdHlsZTogbm9uZTtcblx0bWFyZ2luLXRvcDogMDtcblx0bWFyZ2luLWJvdHRvbTogMDtcblx0cGFkZGluZy1sZWZ0OiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtZWxlbWVudCB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWxhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGNvbG9yOiAjODAwMDgwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3Qtc2VwYXJhdG9yIHtcblx0cGFkZGluZy1yaWdodDogNXB4O1xuXHRjb2xvcjogIzAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xuXHRmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsbW9ub3NwYWNlO1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGNvbG9yOiAjMDBmO1xuXHRtaW4td2lkdGg6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1pbnB1dDpmb2N1cyB7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGNvbG9yOiAjZmZmO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuXHRjb2xvcjogIzQ0NDtcblx0Ym94LXNoYWRvdzogaW5zZXQgMCAwIDJweCAxcHggI2ZmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWJ0biB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDEwcHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdHRvcDogMDtcblx0Y29sb3I6ICNmZmY7XG5cdHBhZGRpbmc6IDAgMTBweCA0cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1idG4tLWV4cGFuZGVkIHtcblx0dmlzaWJpbGl0eTogdmlzaWJsZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWJ0bi0tY29sbGFwc2VkIHtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hpZ2hsaWdodCB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAxMHB4O1xuXHRyaWdodDogMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2RpbWVuc2lvbnMtcm93IHtcblx0cGFkZGluZzogNXB4IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fa2V5IHtcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fdmFsdWUge1xuXHRjb2xvcjogIzAwZjtcbn1gKTtcblxuLyogc2V0dGluZ3MgKi9cblxucnVsZXMucHVzaChgLnNldHRpbmdzX19oZWFkZXIge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5zZXR0aW5nc19fZGlzcGxheSB7XG5cdHBhZGRpbmc6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5zZXR0aW5nc19fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDEwMHB4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuc2V0dGluZ3NfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xuXHRwYWRkaW5nLXRvcDogMDtcblx0cGFkZGluZy1ib3R0b206IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuc2V0dGluZ3NfZGlzcGxheV9fcm93IHtcblx0cGFkZGluZy1ib3R0b206IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnNldHRpbmdzX2Rpc3BsYXlfX2xhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnNldHRpbmdzX2Rpc3BsYXlfX2lucHV0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMDtcblx0dG9wOiAtMnB4O1xufWApO1xuXG4vKiBvdmVybGF5ICovXG5cbnJ1bGVzLnB1c2goYC50b29sc19vdmVybGF5IHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGJvdHRvbTogMDtcblx0bGVmdDogMDtcblx0cmlnaHQ6IDA7XG5cdHpJbmRleDogOTk5OTk5O1xufWApO1xuXG4vKiBwb3B1cCAqL1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAge1xuXHRwb3NpdGlvbjogZml4ZWQ7XG5cdG1heC13aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAyMHB4KTtcblx0bWluLWhlaWdodDogMTUwcHg7XG5cdHRvcDogMDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJhZGl1czogN3B4O1xuXHRib3gtc2hhZG93OiAwIDFweCAzcHggMXB4ICNiY2JjYmM7XG5cdHotaW5kZXg6IDk5OTk5OTk5O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXBfX2Nsb3NlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogN3B4O1xuXHRmb250LXNpemU6IDE4cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxuLyogaHRtbCBsaXZlIGRlYnVnZ2VyICovXG5cbnJ1bGVzLnB1c2goYC50b29sc19kZWJ1Z2dlciB7XG4gICAgcGFkZGluZzogOHB4IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19kZWJ1Z2dlcl9fY29udHJvbCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDAgMTBweCA0cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgY29sb3I6ICMwMDA7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX2RlYnVnZ2VyX19jb250cm9sLS1kaXNhYmxlZCB7XG4gICAgY29sb3I6ICNiY2JjYmM7XG59YCk7XG5cbi8qIHBvcHVwIHBhbmUgKi9cblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmUge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAycHgpO1xuXHRoZWlnaHQ6IDExMHB4O1xuXHR0b3A6IDM5cHg7XG5cdGxlZnQ6IDFweDtcblx0b3ZlcmZsb3cteTogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2Nsb3NlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDA7XG5cdHJpZ2h0OiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiA2cHggNXB4IDdweCA1cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0Zm9udC1zaXplOiAyMHB4O1xuXHR6LWluZGV4OiAxO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fd3JhcHBlciB7XG5cdGhlaWdodDogYXV0bztcblx0b3ZlcmZsb3cteDogaGlkZGVuO1xuXHRvdmVyZmxvdy15OiBzY3JvbGw7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2hlYWRlciB7XG5cdHBhZGRpbmc6IDEwcHggMTBweCA1cHggMTBweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VmZWZlZjtcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNlZmVmZWY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19zZWN0aW9uOmZpcnN0LWNoaWxkIC50b29sc19wb3B1cC1wYW5lX19oZWFkZXIge1xuXHRib3JkZXItdG9wOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19oZWFkZXItLWV4cGFuZGVkIHtcblx0cGFkZGluZy1ib3R0b206IDQwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19oZWFkbGluZSB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYWRkIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRib3gtc2hhZG93OiBub25lO1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0cGFkZGluZzogMDtcblx0cmlnaHQ6IDVweDtcblx0dG9wOiA1cHg7XG5cdGZvbnQtc2l6ZTogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX3NlY3Rpb246Zmlyc3QtY2hpbGQgLnRvb2xzX3BvcHVwLXBhbmVfX2FkZCB7XG5cdHJpZ2h0OiAzMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYWRkLWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiA5cHg7XG5cdGZvbnQtZmFtaWx5OiBcIlNwYWNlIE1vbm9cIixtb25vc3BhY2U7XG5cdGZvbnQtc2l6ZTogMTRweDtcblx0bWluLXdpZHRoOiAxMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYWRkLWxhYmVsLS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYWRkLWxhYmVsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLXRvcDogNXB4O1xuXHRwYWRkaW5nLWxlZnQ6IDEwcHg7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19hcHBseSB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDEwcHg7XG5cdHRvcDogOTRweDtcblx0Ym9yZGVyOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJhY2tncm91bmQtY29sb3I6ICNhOTMyMjY7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0Y29sb3I6ICNmZmY7XG5cdHBhZGRpbmc6IDAgMTBweCA0cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19hcHBseS0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2FwcGx5LS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2NhbmNlbCB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDY1cHg7XG5cdHRvcDogOTRweDtcblx0Ym9yZGVyOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJhY2tncm91bmQtY29sb3I6ICNhY2FjYWM7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0Y29sb3I6ICM0NDQ7XG5cdHBhZGRpbmc6IDAgMTBweCA0cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19jYW5jZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19jYW5jZWwtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbGlzdCB7XG5cdGxpc3Qtc3R5bGU6IG5vbmU7XG5cdG1hcmdpbi10b3A6IDA7XG5cdG1hcmdpbi1ib3R0b206IDA7XG5cdHBhZGRpbmctbGVmdDogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2xpc3QtZWxlbWVudCB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2xpc3QtbGFiZWwge1xuXHRkaXNwbGF5OiBibG9jaztcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19saXN0LXNlcGFyYXRvciB7XG5cdHBhZGRpbmctcmlnaHQ6IDVweDtcblx0Y29sb3I6ICMwMDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19saXN0LWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xuXHRmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsbW9ub3NwYWNlO1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGNvbG9yOiAjMDBmO1xuXHRtaW4td2lkdGg6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19saXN0LWlucHV0OmZvY3VzIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0Y29sb3I6ICNmZmY7XG5cdGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG5cdGNvbG9yOiAjNDQ0O1xuXHRib3gtc2hhZG93OiBpbnNldCAwIDAgMnB4IDFweCAjZmZmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbGlzdC1idG4ge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiAxMHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2E5MzIyNjtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHR0b3A6IDA7XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbGlzdC1idG4tLWV4cGFuZGVkIHtcblx0dmlzaWJpbGl0eTogdmlzaWJsZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2xpc3QtYnRuLS1jb2xsYXBzZWQge1xuXHR2aXNpYmlsaXR5OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19oaWdobGlnaHQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMTBweDtcblx0cmlnaHQ6IDJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2RpbWVuc2lvbnMtcm93IHtcblx0cGFkZGluZzogNXB4IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19rZXkge1xuXHRjb2xvcjogIzgwMDA4MDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX3ZhbHVlIHtcblx0Y29sb3I6ICMwMGY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19ub2RlLW5hbWUge1xuXHRjb2xvcjogIzgwMDA4MDtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0dG9wOiAxMHB4O1xufWApO1xuXG5leHBvcnQge3J1bGVzfTtcbiJdfQ==
