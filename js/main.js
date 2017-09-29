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

},{"./modules/console_listen.js":6,"./modules/dt_console_api.js":9,"./modules/load_styles.js":15,"./modules/render_browser_info.js":17,"./modules/render_console.js":18,"./modules/render_inspector.js":27,"./modules/render_live_overlay.js":30,"./modules/render_settings.js":34}],2:[function(require,module,exports){
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

},{"./render_attribute_input.js":16}],4:[function(require,module,exports){
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

},{"./render_console.js":18}],6:[function(require,module,exports){
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

},{"./global_eval.js":12,"./render_console.js":18,"./render_console_message.js":20}],7:[function(require,module,exports){
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

},{"./render_console.js":18}],8:[function(require,module,exports){
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

},{"./render_inspector_pane.js":28}],9:[function(require,module,exports){
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
/* find_element_index.js, v. 0.1.0, 29.09.2017, @ filip-swinarski */

var findElementIndex = function findElementIndex(element) {

	var elements = document.querySelectorAll('*');
	var siteElements = [];

	for (var i = 0; i <= elements.length; i++) {

		if (elements[i].id === 'dev_tools') break;

		siteElements.push(elements[i]);
	}

	return siteElements.indexOf(element);
};

exports.findElementIndex = findElementIndex;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* find_element_position.js, v. 0.1.1, 27.09.2017, @ filip-swinarski */

var findElementPosition = function findElementPosition(x, y) {

    var elements = document.querySelectorAll('body, body *');

    elements = Array.from(elements).filter(function (element) {

        var el = element.getBoundingClientRect();

        return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height && !element.classList.contains('tools_overlay');
    });
    return elements[elements.length - 1];
};

exports.findElementPosition = findElementPosition;

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./render_live_overlay.js":30}],15:[function(require,module,exports){
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

},{"./render_styles.js":36,"./styles.js":38}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./render_header.js":24}],18:[function(require,module,exports){
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

},{"./console_listen":6,"./render_console_controls.js":19,"./render_header.js":24}],19:[function(require,module,exports){
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

},{"./console_clear.js":5,"./global_eval.js":12}],20:[function(require,module,exports){
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

},{"./render_console_output.js":21}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_dimensions_section_content.js, v. 0.1.0, 27.09.2017, @ filip-swinarski */

var renderDimensionsSectionContent = function renderDimensionsSectionContent(element, header, prefix, list, listWrapper, sectionName) {

	var widthRow = document.createElement('div');
	var heightRow = document.createElement('div');

	sectionName = 'dimensions';
	widthRow.classList.add(prefix + '__dimensions-row');
	heightRow.classList.add(prefix + '__dimensions-row');
	widthRow.innerHTML = '<span class="' + prefix + '__key">width: </span>\n\t\t<span class="' + prefix + '__value">' + element.clientWidth + 'px</span>';
	heightRow.innerHTML = '<span class="' + prefix + '__key">height: </span>\n\t\t<span class="' + prefix + '__value">' + element.clientHeight + 'px</span>';
	listWrapper.appendChild(widthRow);
	listWrapper.appendChild(heightRow);
};

exports.renderDimensionsSectionContent = renderDimensionsSectionContent;

},{}],23:[function(require,module,exports){
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

},{"./dom_element_listen.js":8}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderHighlightSectionContent = undefined;

var _highlight_box_action = require('./highlight_box_action.js');

var renderHighlightSectionContent = function renderHighlightSectionContent(element, header, row, prefix, list, listWrapper, sectionName, regexp1, regexp2) {

	var highlightCheckbox = document.createElement('input');

	sectionName = 'highlight';
	highlightCheckbox.type = 'checkbox';
	highlightCheckbox.classList.add(prefix + '__highlight');
	header.appendChild(highlightCheckbox);

	if (element.style.cssText.match(regexp1) || element.style.cssText.match(regexp2)) highlightCheckbox.checked = true;

	highlightCheckbox.addEventListener('change', function () {
		(0, _highlight_box_action.highlightBoxAction)(element, row);
	}, false);
}; /* render_section.js, v. 0.1.5, 27.09.2017, @ filip-swinarski */

exports.renderHighlightSectionContent = renderHighlightSectionContent;

},{"./highlight_box_action.js":13}],26:[function(require,module,exports){
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

},{"./render_popup.js":32}],27:[function(require,module,exports){
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

},{"./render_dom.js":23,"./render_header.js":24}],28:[function(require,module,exports){
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

},{"./render_section.js":33}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderListSectionContent = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var _add_button_action = require('./add_button_action.js');

var _apply_button_action = require('./apply_button_action.js');

var _cancel_button_action = require('./cancel_button_action.js');

/* render_section.js, v. 0.1.5, 27.09.2017, @ filip-swinarski */

var renderListSectionContent = function renderListSectionContent(id, element, prefix, row, header, list, listWrapper, sectionName, regexp1, regexp2) {

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

		if (row && row.hasAttribute('data-highlight')) arr = arr.filter(function (rule) {
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
};

exports.renderListSectionContent = renderListSectionContent;

},{"./add_button_action.js":2,"./apply_button_action.js":3,"./cancel_button_action.js":4,"./render_attribute_input.js":16}],30:[function(require,module,exports){
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

},{"./find_element_position.js":11,"./render_popup.js":32}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_nodename_section_content.js, v. 0.1.0, 27.09.2017, @ filip-swinarski */

var renderNodenameSectionContent = function renderNodenameSectionContent(element, header, prefix, list, listWrapper, sectionName) {

	var nodeNameContainer = document.createElement('span');

	nodeNameContainer.innerText = element.nodeName.toLowerCase();
	nodeNameContainer.classList.add(prefix + '__node-name');
	header.appendChild(nodeNameContainer);
};

exports.renderNodenameSectionContent = renderNodenameSectionContent;

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderPopup = undefined;

var _render_html_live_debugger = require('./render_html_live_debugger.js');

var _render_inspector_pane = require('./render_inspector_pane.js');

var _find_element_index = require('./find_element_index.js');

var renderPopup = function renderPopup(element) {

	var popup = document.createElement('div');
	var closeBtn = document.createElement('div');
	var popupWrapper = document.createElement('div');
	var elementRect = element.getBoundingClientRect();
	var htmlDebugger = (0, _render_html_live_debugger.renderHtmlLiveDebugger)(element);
	var position = elementRect.y + popup.clientHeight;
	var index = (0, _find_element_index.findElementIndex)(element);
	var row = document.querySelectorAll('.inspector__row--opening')[index];

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
	(0, _render_inspector_pane.renderInspectorPane)(element, row, popup);
	document.body.appendChild(popup);
}; /* render_popup.js, v. 0.1.9, 29.09.2017, @ filip-swinarski */

exports.renderPopup = renderPopup;

},{"./find_element_index.js":10,"./render_html_live_debugger.js":26,"./render_inspector_pane.js":28}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderSection = undefined;

var _render_list_section_content = require('./render_list_section_content.js');

var _render_highlight_section_content = require('./render_highlight_section_content.js');

var _render_dimensions_section_content = require('./render_dimensions_section_content.js');

var _render_nodename_section_content = require('./render_nodename_section_content.js');

/* render_section.js, v. 0.1.5, 27.09.2017, @ filip-swinarski */

var renderSection = function renderSection(id, prefix, title, element, row, listWrapper) {

	var list = document.createElement('ul');
	var header = document.createElement('div');
	var regexp1 = new RegExp(/background-color: rgb\(170, 221, 255\) \!important/);
	var regexp2 = new RegExp(/background-color: \#adf \!important/);
	var sectionName = '';

	header.innerHTML = '<span class="' + prefix + '__headline">' + title + '</span>';
	listWrapper.appendChild(header);
	list.classList.add(prefix + '__list');

	if (id === 'attr_list' || id === 'style_list') (0, _render_list_section_content.renderListSectionContent)(id, element, prefix, row, header, list, listWrapper, sectionName, regexp1, regexp2);

	if (id === 'highlight_section') (0, _render_highlight_section_content.renderHighlightSectionContent)(element, header, row, prefix, list, listWrapper, sectionName, regexp1, regexp2);

	if (id === 'dimensions_section') (0, _render_dimensions_section_content.renderDimensionsSectionContent)(element, header, prefix, list, listWrapper, sectionName);

	if (id === 'node_name') (0, _render_nodename_section_content.renderNodenameSectionContent)(element, header, prefix, list, listWrapper, sectionName);

	header.classList.add(prefix + '__header');
	listWrapper.classList.add(prefix + '__section');
	listWrapper.classList.add(prefix + '__section--' + sectionName);
};

exports.renderSection = renderSection;

},{"./render_dimensions_section_content.js":22,"./render_highlight_section_content.js":25,"./render_list_section_content.js":29,"./render_nodename_section_content.js":31}],34:[function(require,module,exports){
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

},{"./render_header.js":24,"./render_settings_controls.js":35}],35:[function(require,module,exports){
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

},{"./live_mode_action.js":14,"./steal_console_action.js":37}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* styles.js, v. 0.1.14, 29.09.2017, @ filip-swinarski */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGZpbmRfZWxlbWVudF9pbmRleC5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGZpbmRfZWxlbWVudF9wb3NpdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsaXZlX21vZGVfYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcbG9hZF9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2Jyb3dzZXJfaW5mby5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGVfY29udHJvbHMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2RpbWVuc2lvbnNfc2VjdGlvbl9jb250ZW50LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2RvbS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9oZWFkZXIuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaGlnaGxpZ2h0X3NlY3Rpb25fY29udGVudC5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9odG1sX2xpdmVfZGVidWdnZXIuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaW5zcGVjdG9yLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2luc3BlY3Rvcl9wYW5lLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2xpc3Rfc2VjdGlvbl9jb250ZW50LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2xpdmVfb3ZlcmxheS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9ub2RlbmFtZV9zZWN0aW9uX2NvbnRlbnQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXAuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfc2VjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zZXR0aW5ncy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zZXR0aW5nc19jb250cm9scy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxzdGVhbF9jb25zb2xlX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBQVksTzs7QUFDWjs7OztBQVRBOztBQVdBLElBQU0sT0FB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O0FBU0EsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVFBLE1BQU0sSUFBTjs7QUFVQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFNQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBOztBQUVBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQTs7QUFFQSxNQUFNLElBQU47O0FBVUEsTUFBTSxJQUFOOztBQWFBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQVlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBVUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFRQSxNQUFNLElBQU47O0FBV0EsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBTUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUE7O0FBRUEsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVNBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQU1BOztBQUVBLE1BQU0sSUFBTjs7QUFXQTs7QUFFQSxNQUFNLElBQU47O0FBYUEsTUFBTSxJQUFOOztBQU9BOztBQUVBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBU0EsTUFBTSxJQUFOOztBQUlBOztBQUVBLE1BQU0sSUFBTjs7QUFVQSxNQUFNLElBQU47O0FBYUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFPQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7QUFLQSxNQUFNLElBQU47O0FBWUEsTUFBTSxJQUFOOztBQVVBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBT0EsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU9BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBS0EsTUFBTSxJQUFOOztBQUtBLE1BQU0sSUFBTjs7QUFTQSxNQUFNLElBQU47O0FBUUEsTUFBTSxJQUFOOztBQVdBLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQU1BLE1BQU0sSUFBTjs7QUFJQSxNQUFNLElBQU47O0FBSUEsTUFBTSxJQUFOOztBQUlBLE1BQU0sSUFBTjs7UUFPUSxLLEdBQUEsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS40IDI2LjA5LjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtsb2FkU3R5bGVzfSBmcm9tICcuL21vZHVsZXMvbG9hZF9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQnJvd3NlckluZm99IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzJztcbmltcG9ydCB7cmVuZGVyU2V0dGluZ3N9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfc2V0dGluZ3MuanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgY29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuaW1wb3J0IHtyZW5kZXJMaXZlT3ZlcmxheX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9saXZlX292ZXJsYXkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHN0ZWFsQnJvd3NlckNvbnNvbGUgPSBmYWxzZTtcbmxldCBsaXZlTW9kZSA9IGZhbHNlO1xuXG5jb250YWluZXIuaWQgPSAnZGV2X3Rvb2xzJztcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29scycpO1xuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xubG9hZFN0eWxlcygpO1xucmVuZGVySW5zcGVjdG9yKGJvZHksIGNvbnRhaW5lcik7XG5yZW5kZXJDb25zb2xlKGNvbnRhaW5lcik7XG5yZW5kZXJCcm93c2VySW5mbyhjb250YWluZXIpO1xucmVuZGVyU2V0dGluZ3MoY29udGFpbmVyKTtcblxuaWYgKGxvY2FsU3RvcmFnZVtkb2N1bWVudC5kb21haW5dKSB7XG5cblx0aWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pLnN0ZWFsQnJvd3NlckNvbnNvbGUpXG5cdFx0c3RlYWxCcm93c2VyQ29uc29sZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pLnN0ZWFsQnJvd3NlckNvbnNvbGVcblxuXHRpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXSkubGl2ZU1vZGUpXG5cdFx0bGl2ZU1vZGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtkb2N1bWVudC5kb21haW5dKS5saXZlTW9kZVxuXG59XG5cbndpbmRvdy5EVCA9IHtcblx0Y29uc29sZSxcblx0c3RlYWxCcm93c2VyQ29uc29sZSxcblx0bGl2ZU1vZGVcbn07XG5cbmlmIChzdGVhbEJyb3dzZXJDb25zb2xlKSB7XG5cdERULmJhY2t1cCA9IHdpbmRvdy5jb25zb2xlO1xuXHR3aW5kb3cuY29uc29sZSA9IERULmNvbnNvbGU7XG59XG5cbmlmIChsaXZlTW9kZSlcblx0cmVuZGVyTGl2ZU92ZXJsYXkoKTtcbiIsIi8qIGFkZF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMiwgMjAuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgYWRkQnV0dG9uQWN0aW9uID0gKGFwcGx5QnRuLCBjYW5jZWxCdG4sIG5hbWVMYWJlbCwgdmFsdWVMYWJlbCwgaGVhZGVyLCBwcmVmaXgpID0+IHtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2NhbmNlbC0tY29sbGFwc2VkYCk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FwcGx5LS1leHBhbmRlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWV4cGFuZGVkYCk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tZXhwYW5kZWRgKTtcblx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9faGVhZGVyLS1leHBhbmRlZGApO1xufTtcblxuZXhwb3J0IHthZGRCdXR0b25BY3Rpb259O1xuXG4iLCIvKiBhcHBseV9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuNCwgMjEuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5cbmNvbnN0IGFwcGx5QnV0dG9uQWN0aW9uID0gKGVsZW1lbnQsIGFkZEJ0biwgY2FuY2VsQnRuLCB2YWx1ZUxhYmVsLCBuYW1lTGFiZWwsIGFyciwgbGlzdCwgcm93LCBoZWFkZXIsIHByZWZpeCkgPT4ge1xuXG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGNvbnN0IHZhbHVlID0gdmFsdWVJbnB1dC52YWx1ZTtcblx0Y29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcblx0bGV0IGF0dHJWYWx1ZUVsZW07XG5cdGxldCBhdHRyTmFtZUVsZW07XG5cblx0bGlzdC5pbm5lckhUTUwgPSAnJztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc9JztcblxuXHRpZiAoYWRkQnRuLmlkID09PSAnYWRkX2F0dHJfYnRuJylcblx0XHRhdHRyTmFtZUVsZW0gPSBbXS5maWx0ZXIuY2FsbChyb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyksIChlbCkgPT4gZWwuaW5uZXJUZXh0ID09PSBuYW1lKVswXTtcblxuXHRpZiAoYWRkQnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpXG5cdFx0YXR0ck5hbWVFbGVtID0gW10uZmlsdGVyLmNhbGwocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJylbMF07XG5cblx0aWYgKGF0dHJWYWx1ZUVsZW0pIHtcblx0XHRhdHRyVmFsdWVFbGVtID0gYXR0ck5hbWVFbGVtLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuXHR9IGVsc2Uge1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0ck5hbWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKHNlcGFyYXRvciwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyVmFsdWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0fVxuXG5cdGlmIChhZGRCdG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKSB7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChhdHRyKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUsIHByZWZpeCk7XG5cdFx0fSk7XG5cdFx0YXR0ck5hbWVFbGVtLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0fVxuXG5cdGlmIChhZGRCdG4uaWQgPT09ICdhZGRfc3R5bGVfYnRuJykge1xuXHRcdGF0dHJOYW1lRWxlbS5pbm5lclRleHQgPSAnc3R5bGUnO1xuXHRcdGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcblx0XHRhcnIucHVzaChgJHtuYW1lfTogJHt2YWx1ZX07YCk7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSAnXCInO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChydWxlLCBpKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBydWxlLnNwbGl0KCc6ICcpWzBdLCBydWxlLnNwbGl0KCc6ICcpWzFdLnJlcGxhY2UoJzsnLCAnJyksIHByZWZpeCk7XG5cblx0XHRcdGlmKGkgIT09IDApXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICcgJztcblxuXHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gYCR7cnVsZS5zcGxpdCgnOiAnKVswXX06ICR7cnVsZS5zcGxpdCgnOiAnKVsxXX1gO1xuXG5cdFx0XHRpZiAoaSA8IGFyci5sZW5ndGggLSAxKVxuXHRcdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnOyc7XG5cdFx0XHRcdFxuXHRcdH0pO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICdcIic7XG5cdH1cblxuXHRhdHRyTmFtZUVsZW0uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0YXR0clZhbHVlRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19oZWFkZXItLWV4cGFuZGVkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1leHBhbmRlZGApO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRhZGRCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdGFkZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FwcGx5LS1leHBhbmRlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWNvbGxhcHNlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19jYW5jZWwtLWV4cGFuZGVkYCk7XG59O1xuXG5leHBvcnQge2FwcGx5QnV0dG9uQWN0aW9ufTtcbiIsIi8qIGNhbmNlbF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMSwgMjAuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgY2FuY2VsQnV0dG9uQWN0aW9uID0gKGFwcGx5QnRuLCBjYW5jZWxCdG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgaGVhZGVyLCBwcmVmaXgpID0+IHtcblxuXHRjb25zdCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCBuYW1lSW5wdXQgPSBuYW1lTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWNvbGxhcHNlZGApO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2hlYWRlci0tZXhwYW5kZWRgKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1sYWJlbC0tY29sbGFwc2VkYCk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19hZGQtbGFiZWwtLWV4cGFuZGVkYCk7XG5cdG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuXHR2YWx1ZUlucHV0LnZhbHVlID0gJyc7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYXBwbHktLWNvbGxhcHNlZGApO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2FwcGx5LS1leHBhbmRlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWwtLWNvbGxhcHNlZGApO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19jYW5jZWwtLWV4cGFuZGVkYCk7XG5cbn07XG5cbmV4cG9ydCB7Y2FuY2VsQnV0dG9uQWN0aW9ufTtcbiIsIi8qIGNvbnNvbGVfY2xlYXIuanMsIHYuIDAuMS4wLCAxOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcblxuY29uc3QgY29uc29sZUNsZWFyID0gKCkgPT4ge1xuICAgIGNvbnNvbGVEaXNwbGF5LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQge2NvbnNvbGVDbGVhcn07XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjYsIDIyLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmNvbnN0IGNvbnNvbGVMaXN0ZW4gPSAoKSA9PiB7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcblxuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZU1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvckNvbHVtbk5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVC5jb25zb2xlLmxvZyh2YWx1ZSwgY29uc29sZUlucHV0LnZhbHVlKTtcdFxuICAgICAgICAgICAgY29uc29sZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxpc3Rlbn07XG4iLCIvKiBjb25zb2xlX2xvZy5qcywgdi4gMC4xLjIsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5jb25zdCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGNvbnN0IGxvZyA9IG5ldyBDdXN0b21FdmVudCgnbG9nJywge2RldGFpbDogW3N0ciwgdmFsdWVdfSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5kaXNwYXRjaEV2ZW50KGxvZyk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTG9nfTtcbiIsIi8qIGRvbV9lbGVtZW50X2xpc3Rlbi5qcywgdi4gMC4xLjIsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySW5zcGVjdG9yUGFuZX0gZnJvbSAnLi9yZW5kZXJfaW5zcGVjdG9yX3BhbmUuanMnO1xuXG5jb25zdCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRjb25zdCBpbnNwZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zcGVjdG9yJyk7XG5cdGxldCBzdGFydERhdGU7XG5cdGxldCB0T2JqO1xuXHRsZXQgc3RhcnRYO1xuXHRsZXQgc3RhcnRZO1xuXHRsZXQgZW5kWDtcblx0bGV0IGVuZFk7XG5cdGxldCBkaXN0WDtcblx0bGV0IGRpc3RZO1xuXHRsZXQgbWF4WCA9IDA7XG5cdGxldCBtYXhZID0gMDtcblxuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG5cdFx0c3RhcnREYXRlID0gbmV3IERhdGUoKTtcblx0XHR0T2JqID0gZS50b3VjaGVzWzBdO1xuXHRcdHN0YXJ0WCA9IHRPYmoucGFnZVg7XG5cdFx0c3RhcnRZID0gdE9iai5wYWdlWTtcblx0fSwgZmFsc2UpO1xuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFgpID4gbWF4WClcblx0XHRcdG1heFggPSBNYXRoLmFicyhkaXN0WCk7XG5cdCAgIFxuXHRcdGlmIChNYXRoLmFicyhkaXN0WSkgPiBtYXhZKVxuXHRcdFx0bWF4WSA9IE1hdGguYWJzKGRpc3RZKTtcblx0ICAgXG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcblx0ICAgXG5cdFx0Y29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgZGF0ZUFtcCA9IGVuZERhdGUgLSBzdGFydERhdGU7XG5cdCAgIFxuXHRcdHRPYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXHRcdGVuZFggPSB0T2JqLnBhZ2VYO1xuXHRcdGVuZFkgPSB0T2JqLnBhZ2VZO1xuXHRcdGRpc3RYID0gZW5kWCAtIHN0YXJ0WDtcblx0XHRkaXN0WSA9IGVuZFkgLSBzdGFydFk7XG5cdCAgIFxuXHRcdGlmIChtYXhZIDw9IDMwICYmIG1heFggPD0gMzApIHtcblx0XHQgICBcblx0XHRcdGlmIChkYXRlQW1wIDw9IDIwMCkge1xuXHRcdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKVxuXG5cdFx0XHRcdGlmIChhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJykgfHxcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZW5kZXJJbnNwZWN0b3JQYW5lKGVsZW0sIHJvdywgaW5zcGVjdG9yKTtcblx0XHRcdH1cblx0XHQgICBcblx0XHR9XG5cdCAgIFxuXHRcdG1heFggPSAwO1xuXHRcdG1heFkgPSAwO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7ZG9tRWxlbWVudExpc3Rlbn07XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjMsIDE5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5pbXBvcnQge2NvbnNvbGVDbGVhcn0gZnJvbSAnLi9jb25zb2xlX2NsZWFyLmpzJztcblxuY29uc3QgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmNvbnN0IGNsZWFyID0gY29uc29sZUNsZWFyO1xuXG5leHBvcnQge2xvZ307XG5leHBvcnQge2NsZWFyfTtcbiIsIi8qIGZpbmRfZWxlbWVudF9pbmRleC5qcywgdi4gMC4xLjAsIDI5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IGZpbmRFbGVtZW50SW5kZXggPSAoZWxlbWVudCkgPT4ge1xuXG5cdGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKicpXG5cdGNvbnN0IHNpdGVFbGVtZW50cyA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDw9IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XG5cdFx0aWYgKGVsZW1lbnRzW2ldLmlkID09PSAnZGV2X3Rvb2xzJylcblx0XHRcdGJyZWFrO1xuXHRcdFxuXHRcdHNpdGVFbGVtZW50cy5wdXNoKGVsZW1lbnRzW2ldKTtcblx0fVxuXG5cdHJldHVybiBzaXRlRWxlbWVudHMuaW5kZXhPZihlbGVtZW50KVxuXG59O1xuXG5leHBvcnQge2ZpbmRFbGVtZW50SW5kZXh9O1xuIiwiLyogZmluZF9lbGVtZW50X3Bvc2l0aW9uLmpzLCB2LiAwLjEuMSwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuY29uc3QgZmluZEVsZW1lbnRQb3NpdGlvbiA9ICh4LCB5KSA9PiB7XG5cblx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYm9keSwgYm9keSAqJyk7XG5cbiAgICBlbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudHMpLmZpbHRlcihlbGVtZW50ID0+IHtcblxuICAgICAgICBjb25zdCBlbCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHggPj0gZWwueCAmJiB4IDw9IGVsLnggKyBlbC53aWR0aCAmJiB5ID49IGVsLnlcbiAgICAgICAgICAgICYmIHkgPD0gZWwueSArIGVsLmhlaWdodFxuICAgICAgICAgICAgJiYgIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b29sc19vdmVybGF5Jyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdO1xufTtcblxuZXhwb3J0IHtmaW5kRWxlbWVudFBvc2l0aW9ufTtcbiIsIi8qIGdsb2JhbF9ldmFsLmpzLCB2LiAwLjEuMCwgMzEuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuLy8gZXZhbCAtIHJ1bnMgYmxvY2sgc2NvcGUgZGVjbGFyYXRpb25zIHZpYSBzY3JpcHQgaW5qZWN0aW9uXG4vLyBvdGhlcndpc2Ugc3RhbmRhcmQgZXZhbCB1c2VkIFxuLy8gLSB0aGluayBpZiBub3QgdXNlIGluamVjdGlvbiBleGNsdXNpdmVseVxuLy8gcmV0dXJucyB2YWx1ZVxuY29uc3QgZ2xvYmFsRXZhbCA9IChzdHIpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JzsgLy8gcHJldmVudCBjcmVhdGluZyBsb2NhbCB2YXJpYWJsZXMgd2l0aCBzdGFuZGFyZCBldmFsXG4gICAgXG4gICAgaWYgKHN0ci5zdGFydHNXaXRoKCdsZXQgJykgfHwgc3RyLnN0YXJ0c1dpdGgoJ2NvbnN0ICcpKSB7IC8vIGNvZGUgZm9yIHNjcmlwdCBpbnNlcnRpb25cblxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpLnJlbW92ZSgpXG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LmlkID0gJ2R0X3NjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gcmV0dXJucyB1bmRlZmluZWQgd2hlbiBkZWNsYXJpbmcgYmxvY2sgc2NvcGVkIHZhcmlhYmxlXG4gICAgfSBlbHNlIHsgLy9zdGFuZGFyZCBldmFsXG4gICAgICAgIHJldHVybiAoMSwgZXZhbCkoc3RyKTsgLy8gaW5kaXJlY3QgY2FsbCB0byBhY2Nlc3MgZ2xvYmFsIHNjb3BlXG4gICAgfVxufVxuXG5leHBvcnQge2dsb2JhbEV2YWx9O1xuIiwiLyogaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMsIHYuIDAuMS4yLCAyMS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCBoaWdobGlnaHRCb3hBY3Rpb24gPSAoZWxlbWVudCwgcm93KSA9PiB7XG5cblx0Y29uc3QgcmVnZXhwMSA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IHJnYlxcKDE3MCwgMjIxLCAyNTVcXCkgXFwhaW1wb3J0YW50Lyk7XG5cdGNvbnN0IHJlZ2V4cDIgPSBuZXcgUmVnRXhwKC9iYWNrZ3JvdW5kLWNvbG9yOiBcXCNhZGYgXFwhaW1wb3J0YW50Lyk7XG5cdGNvbnN0IGF0dHJOYW1lID0gJ2RhdGEtaGlnaGxpZ2h0Jztcblx0bGV0IGJhY2tncm91bmRDb2xvciA9IGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG5cdGlmIChlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMSkpIHtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBlbGVtZW50LnN0eWxlLmNzc1RleHQucmVwbGFjZShyZWdleHAxLCAnJyk7XG5cblx0XHRpZiAocm93LmdldEF0dHJpYnV0ZShhdHRyTmFtZSkgIT09ICduby1iYWNrZ3JvdW5kJylcblx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcm93LmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0ZWxzZVxuXHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cblx0XHRyb3cucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcblx0fSBlbHNlIGlmIChlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMikpIHtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBlbGVtZW50LnN0eWxlLmNzc1RleHQucmVwbGFjZShyZWdleHAyLCAnJyk7XG5cblx0XHRpZiAocm93LmdldEF0dHJpYnV0ZShhdHRyTmFtZSkgIT09ICduby1iYWNrZ3JvdW5kJylcblx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcm93LmdldEF0dHJpYnV0ZSgnZGF0YS1oaWdobGlnaHQnKTtcblx0XHRlbHNlXG5cdFx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcblxuXHRcdHJvdy5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZC1jb2xvcjogI2FkZiAhaW1wb3J0YW50Jztcblx0XHRyb3cuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBiYWNrZ3JvdW5kQ29sb3IgPyBiYWNrZ3JvdW5kQ29sb3IgOiAnbm8tYmFja2dyb3VuZCcpO1xuXHR9XG5cbn07XG5cbmV4cG9ydCB7aGlnaGxpZ2h0Qm94QWN0aW9ufTtcblxuIiwiLyogbGl2ZV9tb2RlX2FjdGlvbi5qcywgdi4gMC4xLjEsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyTGl2ZU92ZXJsYXl9IGZyb20gJy4vcmVuZGVyX2xpdmVfb3ZlcmxheS5qcyc7XG5cbmNvbnN0IGxpdmVNb2RlQWN0aW9uID0gKGlucHV0KSA9PiB7XG5cdERULmxpdmVNb2RlID0gaW5wdXQuY2hlY2tlZDtcblxuXHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2xzX292ZXJsYXknKTtcblx0Y29uc3QgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdHN0ZWFsQnJvd3NlckNvbnNvbGU6IGlucHV0LmNoZWNrZWQsXG5cdFx0bGl2ZU1vZGU6IERULmxpdmVNb2RlXG5cdH0pO1xuXG5cdGlmIChEVC5saXZlTW9kZSlcblx0XHRyZW5kZXJMaXZlT3ZlcmxheSgpO1xuXHRlbHNlIGlmIChvdmVybGF5KVxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQob3ZlcmxheSk7XG5cblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oZG9jdW1lbnQuZG9tYWluLCBjb25maWcpO1xuXG59O1xuXG5leHBvcnQge2xpdmVNb2RlQWN0aW9ufTtcbiIsIi8qIGxvYWQgX3N0eWxlcy5qcyB2LiAwLjEuMywgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtydWxlc30gZnJvbSAnLi9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJTdHlsZXN9IGZyb20gJy4vcmVuZGVyX3N0eWxlcy5qcyc7XG5cbmNvbnN0IGxvYWRTdHlsZXMgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBnb29nbGVGb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgZ29vZ2xlRm9udC5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgZ29vZ2xlRm9udC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBnb29nbGVGb250Lm1lZGlhID0gJ3NjcmVlbic7XG4gICAgZ29vZ2xlRm9udC5ocmVmID0gJ2h0dHBzOi8vZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1TcGFjZStNb25vOjQwMCw3MDAmYW1wO3N1YnNldD1sYXRpbi1leHQnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZ29vZ2xlRm9udCk7XG5cdHJlbmRlclN0eWxlcyhydWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcywgdi4gMC4xLjMsIDI1LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlckF0dHJJbnB1dCA9IChlbCwgZGlzcGxheSwgcm93LCBuYW1lLCB2YWx1ZSwgcHJlZml4KSA9PiB7XG4gICBcblx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdGNvbnN0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0Y29uc3QgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0Y29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRsZXQgbGVuZ3RoO1xuICAgXG5cdGlucHV0LnR5cGUgPSAndGV4dCc7XG5cdGlucHV0LnZhbHVlID0gdmFsdWU7XG5cdGxlbmd0aCA9IHZhbHVlLmxlbmd0aCAqIDg7XG5cdGlucHV0LnN0eWxlLndpZHRoID0gYCR7bGVuZ3RofXB4YDtcblxuXHRpZiAoZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpXG5cdFx0aW5wdXQudmFsdWUgKz0gJzsnO1xuXG5cdGxhYmVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdGFwcGx5QnRuLmlubmVyVGV4dCA9ICdBcHBseSc7XG5cdHNlcGFyYXRvci5pbm5lclRleHQgPSAnOic7XG5cdGxpc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1lbGVtZW50YCk7XG5cdGxhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1sYWJlbGApO1xuXHRpbnB1dC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtaW5wdXRgKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bmApO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1jb2xsYXBzZWRgKTtcblx0c2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdC1zZXBhcmF0b3JgKTtcbiAgIFxuXHRsYWJlbC5hcHBlbmRDaGlsZChzZXBhcmF0b3IpO1xuXHRsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG5cdGxhYmVsLmFwcGVuZENoaWxkKGFwcGx5QnRuKTtcblx0bGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXHRkaXNwbGF5LmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KTtcbiAgIFxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICBcblx0XHRpZiAoZS5rZXlDb2RlID09PSAxMykge1xuXG5cdFx0XHRjb25zdCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdFx0Y29uc3Qgcm93QXR0clZhbHVlRWxlbXMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXG5cdFx0XHRpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jylcblx0XHRcdFx0ZWwuYXR0cmlidXRlc1tuYW1lXS52YWx1ZSA9IGlucHV0LnZhbHVlO1xuXG5cdFx0XHRpZiAoZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpXG5cdFx0XHRcdGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuXHRcdFx0W10uZm9yRWFjaC5jYWxsKHJvd0F0dHJOYW1lRWxlbXMsIChhdHRyTmFtZUVsLCBpKSA9PiB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09IG5hbWUgJiYgZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7aW5wdXQudmFsdWV9XCJgO1xuXHRcdFx0XHRcdGF0dHJOYW1lRWwuaW5uZXJUZXh0ID0gbmFtZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJyAmJiBkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jykge1xuXG5cdFx0XHRcdFx0Y29uc3QgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRcdGxldCB2YWx1ZSA9ICcnO1xuXG5cdFx0XHRcdFx0W10uZm9yRWFjaC5jYWxsKGxhYmVscywgKGxhYmVsLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSAnOiAnO1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZTtcblxuXHRcdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdFx0dmFsdWUgKz0gJyAnO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1leHBhbmRlZGApO1xuXHRcdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG5cdFx0bGVuZ3RoID0gaW5wdXQudmFsdWUubGVuZ3RoICogODtcblx0XHRpbnB1dC5zdHlsZS53aWR0aCA9IGAke2xlbmd0aH1weGA7XG5cdH0sIGZhbHNlKTtcblxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tZXhwYW5kZWRgKTtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1jb2xsYXBzZWRgKTtcblx0fSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9X19saXN0LWJ0bi0tZXhwYW5kZWRgKTtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2xpc3QtYnRuLS1jb2xsYXBzZWRgKTtcblx0fSk7XG5cblx0YXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICBcblx0XHRjb25zdCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdGNvbnN0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKVxuXHRcdFx0ZWwuYXR0cmlidXRlc1tuYW1lXS52YWx1ZSA9IGlucHV0LnZhbHVlO1xuXG5cdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0ZWwuc3R5bGVbbmFtZV0gPSBpbnB1dC52YWx1ZS5yZXBsYWNlKCc7JywgJycpO1xuXG5cdFx0W10uZm9yRWFjaC5jYWxsKHJvd0F0dHJOYW1lRWxlbXMsIChhdHRyTmFtZUVsLCBpKSA9PiB7XG5cdFx0XHRcblx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gbmFtZSAmJiBkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKSB7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7aW5wdXQudmFsdWV9XCJgO1xuXHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJyAmJiBkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jykge1xuXG5cdFx0XHRcdGxldCBsYWJlbHMgPSBkaXNwbGF5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsJyk7XG5cdFx0XHRcdGxldCB2YWx1ZSA9ICcnO1xuXG5cdFx0XHRcdFtdLmZvckVhY2guY2FsbChsYWJlbHMsIChsYWJlbCwgaSkgPT4ge1xuXHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLmZpcnN0Q2hpbGQuZGF0YTtcblx0XHRcdFx0XHR2YWx1ZSArPSAnOiAnO1xuXHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAoaSA8IGxhYmVscy5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdFx0dmFsdWUgKz0gJyAnO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fV9fbGlzdC1idG4tLWV4cGFuZGVkYCk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19saXN0LWJ0bi0tY29sbGFwc2VkYCk7XG5cblx0fSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJBdHRySW5wdXR9O1xuIiwiLyogcmVuZGVyX2Jyb3dzZXJfaW5mby5qcywgdi4gMC4xLjMsIDIyLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5jb25zdCByZW5kZXJCcm93c2VySW5mbyA9IChwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgYnJvd3NlckluZm9EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgYnJvd3NlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3Qgcm93Q2xhc3MgPSAnYnJvd3Nlcl9kaXNwbGF5X19yb3cnO1xuXHRjb25zdCBrZXlDbGFzcyA9ICdicm93c2VyX2Rpc3BsYXlfX2tleSc7XG5cbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5pZCA9ICdicm93c2VyJztcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdicm93c2VyJyk7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfcGFuZWwnKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fZGlzcGxheScpO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pZCA9ICdicm93c2VyX2Rpc3BsYXknO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcbiAgICByZW5kZXJIZWFkZXIoYnJvd3NlckluZm9Db250YWluZXIsIGZhbHNlKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSR7cm93Q2xhc3N9PlxuXHRcdDxzcGFuIGNsYXNzPSR7a2V5Q2xhc3N9PkFwcCBuYW1lPC9zcGFuPjogJHtuYXZpZ2F0b3IuYXBwQ29kZU5hbWV9XG5cdDwvZGl2PmA7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5BcHAgdmVyc2lvbjwvc3Bhbj46ICR7bmF2aWdhdG9yLmFwcFZlcnNpb259XG5cdDwvZGl2PmA7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5QbGF0Zm9ybTwvc3Bhbj46ICR7bmF2aWdhdG9yLnBsYXRmb3JtfVxuXHQ8L2Rpdj5gO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9JHtyb3dDbGFzc30+XG5cdFx0PHNwYW4gY2xhc3M9JHtrZXlDbGFzc30+VXNlciBhZ2VudDwvc3Bhbj46ICR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cblx0PC9kaXY+YDtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSR7cm93Q2xhc3N9PlxuXHRcdDxzcGFuIGNsYXNzPSR7a2V5Q2xhc3N9PldpbmRvdyB3aWR0aDwvc3Bhbj46ICR7d2luZG93LmlubmVyV2lkdGh9XG5cdDwvZGl2PmA7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ke3Jvd0NsYXNzfT5cblx0XHQ8c3BhbiBjbGFzcz0ke2tleUNsYXNzfT5XaW5kb3cgaGVpZ2h0PC9zcGFuPjogJHt3aW5kb3cuaW5uZXJIZWlnaHR9XG5cdDwvZGl2PmA7XG59O1xuXG5leHBvcnQge3JlbmRlckJyb3dzZXJJbmZvfTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlLmpzLCB2LiAwLjEuNSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL2NvbnNvbGVfbGlzdGVuJztcbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlQ29udHJvbHN9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfY29udHJvbHMuanMnO1xuXG5jb25zdCBjb25zb2xlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbmNvbnN0IGNvbnNvbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dFByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb25zb2xlJyk7XG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheScpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheS0tY29sbGFwc2VkJyk7XG5jb25zb2xlRGlzcGxheS5pZCA9ICdjb25zb2xlX2Rpc3BsYXknO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0Jyk7XG5jb25zb2xlSW5wdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9faW5wdXQtLWNvbGxhcHNlZCcpO1xuY29uc29sZUlucHV0LmlkID0gJ2NvbnNvbGVfaW5wdXQnO1xuY29uc29sZUlucHV0LnR5cGUgPSAndGV4dCc7XG5jb25zb2xlSW5wdXRQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcHJvbXB0Jyk7XG5jb25zb2xlQ29udGFpbmVyLmlkID0gJ2NvbnNvbGUnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdC0tY29sbGFwc2VkJyk7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGUgPSAocGFuZWwpID0+IHtcblxuICAgIHJlbmRlckhlYWRlcihjb25zb2xlQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgcmVuZGVyQ29uc29sZUNvbnRyb2xzKGNvbnNvbGVDb250YWluZXIsIGNvbnNvbGVJbnB1dCk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlSW5wdXRQcm9tcHQpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZURpc3BsYXkpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChjb25zb2xlQ29udGFpbmVyKTtcbiAgICBjb25zb2xlTGlzdGVuKCk7XG5cbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlfTtcbmV4cG9ydCB7Y29uc29sZURpc3BsYXl9O1xuZXhwb3J0IHtjb25zb2xlSW5wdXR9O1xuIiwiLyogcmVuZGVyX2NvbnNvbGVfY29udHJvbHMuanMsIHYuIDAuMS4zLCAyMi4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVDbGVhcn0gZnJvbSAnLi9jb25zb2xlX2NsZWFyLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmNvbnN0IGNvbnNvbGVDbGVhckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuY29uc3QgY29uc29sZUxvZ0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuY29uc3QgY29uc29sZUNvbnRyb2xzUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuY29uc3QgcmVuZGVyQ29uc29sZUNvbnRyb2xzID0gKGNvbnRhaW5lciwgaW5wdXQpID0+IHtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlQ29udHJvbHNQYW5lbCk7XG4gICAgY29uc29sZUNvbnRyb2xzUGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNsZWFyQnRuKTtcbiAgICBjb25zb2xlQ29udHJvbHNQYW5lbC5hcHBlbmRDaGlsZChjb25zb2xlTG9nQnRuKTtcblx0Y29uc29sZUNvbnRyb2xzUGFuZWwuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMnKTtcblx0Y29uc29sZUNsZWFyQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1idG4nKTtcblx0Y29uc29sZUNsZWFyQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2NvbnRyb2xzLS1jbGVhci1idG4nKTtcblx0Y29uc29sZUxvZ0J0bi5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19jb250cm9scy0tYnRuJyk7XG5cdGNvbnNvbGVMb2dCdG4uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fY29udHJvbHMtLWxvZy1idG4nKTtcblx0Y29uc29sZUNsZWFyQnRuLmlubmVyVGV4dCA9IFwiQ2xlYXJcIjtcblx0Y29uc29sZUxvZ0J0bi5pbm5lclRleHQgPSBcIkxvZ1wiO1xuXHRjb25zb2xlQ2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjb25zb2xlQ2xlYXIoKSwgZmFsc2UpO1xuXHRjb25zb2xlTG9nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG5cdFx0bGV0IHZhbHVlID0gZ2xvYmFsRXZhbChpbnB1dC52YWx1ZSk7XG5cblx0XHREVC5jb25zb2xlLmxvZyh2YWx1ZSwgaW5wdXQudmFsdWUpO1x0XG5cdFx0aW5wdXQudmFsdWUgPSAnJztcblx0fSwgZmFsc2UpO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVDb250cm9sc307XG4iLCIvKiByZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzLCB2LiAwLjEuMSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJDb25zb2xlT3V0cHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX291dHB1dC5qcyc7XG5cbmNvbnN0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmIChtc2dBcnJheVswXSkge1xuXG4gICAgICAgIGNvbnN0IGlucHV0TWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGlucHV0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctaScpO1xuICAgICAgICBpbnB1dE1lc3NhZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLWlwcm9tcHRcIj48L3NwYW4+JHttc2dBcnJheVswXX0gYDtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0TWVzc2FnZSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJldHVybk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHJldHVybk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICByZXR1cm5NZXNzYWdlLmlubmVySFRNTCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj5gO1xuICAgIHJlbmRlckNvbnNvbGVPdXRwdXQobXNnQXJyYXlbMV0sIHJldHVybk1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXR1cm5NZXNzYWdlKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfTtcbiIsIi8vIHJlbmRlcl9jb25zb2xlX291dHB1dC5qcywgdi4gMC4xLjMsIDIwMTcgQCBmaWxpcC1zd2luYXJza2lcblxuY29uc3QgcmVuZGVyQ29uc29sZU91dHB1dCA9ICh2YWwsIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBpbmRleCkgPT4ge1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCBjaGVja1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNwbGl0KCcgJylbMV07XG4gICAgbGV0IGh0bWwgPSAnJztcblxuICAgIGNoZWNrU3RyID0gY2hlY2tTdHIuc3Vic3RyaW5nKDAsIGNoZWNrU3RyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyfWApO1xuXHRcbiAgICBpZiAoY2hlY2tTdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudWxsJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdib29sZWFuJykge1xuICAgICAgICBodG1sICs9IGNoZWNrU3RyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsfVwiYCA6IHZhbDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09J2Z1bmN0aW9uJykge1xuICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgfSBlbHNlIGlmIChjaGVja1N0ciA9PT0gJ2FycmF5JyB8fCBjaGVja1N0ciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiB2YWwpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBrZXlDbGFzcyA9IGNoZWNrU3RyID09PSAnYXJyYXknID8gJ2luZGV4JyA6ICdrZXknO1xuICAgICAgICAgICAgbGV0IGNoZWNrU3RyMiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWxbaXRlbV0pLnNwbGl0KCcgJylbMV07XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY2hlY2tTdHIyID0gY2hlY2tTdHIyLnN1YnN0cmluZygwLCBjaGVja1N0cjIubGVuZ3RoLTEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcblxuICAgICAgICAgICAgaWYgKGNoZWNrU3RyMiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ251bGwnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnc3ltYm9sJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtrZXlDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHIyfWApO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBjaGVja1N0cjIgPT09ICdzdHJpbmcnID8gYFwiJHt2YWxbaXRlbV19XCJgIDogdmFsW2l0ZW1dO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQodmFsdWVFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGNvbnN0IGtleUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZW5kZXJDb25zb2xlT3V0cHV0KHZhbFtpdGVtXSwgb3V0cHV0LCBpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCA9IHZhbDtcbiAgICB9XG5cdFxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3V0cHV0KTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH07XG4iLCIvKiByZW5kZXJfZGltZW5zaW9uc19zZWN0aW9uX2NvbnRlbnQuanMsIHYuIDAuMS4wLCAyNy4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5jb25zdCByZW5kZXJEaW1lbnNpb25zU2VjdGlvbkNvbnRlbnQgPSAoZWxlbWVudCwgaGVhZGVyLCBwcmVmaXgsIGxpc3QsIGxpc3RXcmFwcGVyLCBzZWN0aW9uTmFtZSkgPT4ge1xuXG5cdGNvbnN0IHdpZHRoUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGhlaWdodFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdHNlY3Rpb25OYW1lID0gJ2RpbWVuc2lvbnMnO1xuXHR3aWR0aFJvdy5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2RpbWVuc2lvbnMtcm93YCk7XG5cdGhlaWdodFJvdy5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2RpbWVuc2lvbnMtcm93YCk7XG5cdHdpZHRoUm93LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cHJlZml4fV9fa2V5XCI+d2lkdGg6IDwvc3Bhbj5cblx0XHQ8c3BhbiBjbGFzcz1cIiR7cHJlZml4fV9fdmFsdWVcIj4ke2VsZW1lbnQuY2xpZW50V2lkdGh9cHg8L3NwYW4+YDtcblx0aGVpZ2h0Um93LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cHJlZml4fV9fa2V5XCI+aGVpZ2h0OiA8L3NwYW4+XG5cdFx0PHNwYW4gY2xhc3M9XCIke3ByZWZpeH1fX3ZhbHVlXCI+JHtlbGVtZW50LmNsaWVudEhlaWdodH1weDwvc3Bhbj5gO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh3aWR0aFJvdyk7XG5cdGxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKGhlaWdodFJvdyk7XG59O1xuXG5leHBvcnQge3JlbmRlckRpbWVuc2lvbnNTZWN0aW9uQ29udGVudH07XG4iLCIvKiByZW5kZXJfZG9tLmpzLCB2LiAwLjEuOSwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtkb21FbGVtZW50TGlzdGVufSBmcm9tICcuL2RvbV9lbGVtZW50X2xpc3Rlbi5qcyc7XG5cbmNvbnN0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuICAgIGlmIChlbGVtLmlkID09PSAnZGV2X3Rvb2xzJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByb3cyID0gZWxlbS5jaGlsZHJlbi5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cxRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzFPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MUNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgcm93MkVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCByb3cyT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHJvdzJDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1vcGVuaW5nJyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNsb3NpbmcnKTtcbiAgICBcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTtcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTsgXG4gICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MUNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cyT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cyQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzFPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8JztcbiAgICByb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxT3BlbkFycm93KTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuICAgIFxuICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBhdHRyTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjb25zdCBhdHRyRXF1YWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmlubmVyVGV4dCA9IGF0dHIubG9jYWxOYW1lO1xuICAgICAgICAgICAgYXR0ckVxdWFsU3Bhbi5pbm5lclRleHQgPSAnPSc7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmlubmVyVGV4dCA9ICdcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ck5hbWVTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ckVxdWFsU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJWYWx1ZVNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XHRcbiAgICBcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFDbG9zZUFycm93KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICBcbiAgICBpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIHRleHRFbC5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgICAgICB0ZXh0RWwuaW5uZXJUZXh0ID0gZWxlbS50ZXh0LnRyaW0oKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0RWwpXG5cbiAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJET00oZWwsIHdyYXBwZXIsIGxldmVsKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJvdzJPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8Lyc7XG4gICAgcm93MkNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93Mk9wZW5BcnJvdyk7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyRWxlbWVudFR5cGVTcGFuKTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJDbG9zZUFycm93KTtcbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggfHwgZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93Mik7XG4gICAgZWxzZVxuICAgICAgICByb3cxLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIFxuXHRkb21FbGVtZW50TGlzdGVuKGVsZW0sIHJvdzEsIHJvdzFPcGVuQXJyb3cpO1xuICAgIHBhcmVudEVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xufVxuZXhwb3J0IHtyZW5kZXJET019O1xuIiwiLyogcmVuZGVyX2hlYWRlci5qcywgdi4gMC4xLjIsIDI1LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlckhlYWRlciA9IChjb250YWluZXIsIGV4cGFuZGVkKSA9PiB7XG4gICBcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBjb250YWluZXIuaWQ7XG4gICBcbiAgICBoZWFkZXIuaWQgPSBgJHtjb250YWluZXIuaWR9X2hlYWRlcmA7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX2hlYWRlcmApO1xuICAgIGhlYWRlci5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3RpdGxlfV9fdGl0bGVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuICAgXG4gICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X19oZWFkZXItLWV4cGFuZGVkYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX2hlYWRlci0tY29sbGFwc2VkYCk7XG4gICAgfVxuICAgXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICBcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgIFxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IFtdLmZpbHRlci5jYWxsKGNvbnRhaW5lci5jaGlsZHJlbiwgZWwgPT4gZWwuaWQgIT09IGAke3BhcmVudC5pZH1fX2hlYWRlcmApO1xuICAgICAgIFxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tZXhwYW5kZWRgKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tY29sbGFwc2VkYCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVySGVhZGVyfTtcbiIsIi8qIHJlbmRlcl9zZWN0aW9uLmpzLCB2LiAwLjEuNSwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtoaWdobGlnaHRCb3hBY3Rpb259IGZyb20gJy4vaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJIaWdobGlnaHRTZWN0aW9uQ29udGVudCA9IChlbGVtZW50LCBoZWFkZXIsIHJvdywgcHJlZml4LCBsaXN0LCBsaXN0V3JhcHBlciwgc2VjdGlvbk5hbWUsIHJlZ2V4cDEsIHJlZ2V4cDIpID0+IHtcblxuXHRjb25zdCBoaWdobGlnaHRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cblx0c2VjdGlvbk5hbWUgPSAnaGlnaGxpZ2h0Jztcblx0aGlnaGxpZ2h0Q2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG5cdGhpZ2hsaWdodENoZWNrYm94LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9faGlnaGxpZ2h0YCk7XG5cdGhlYWRlci5hcHBlbmRDaGlsZChoaWdobGlnaHRDaGVja2JveCk7XG5cblx0aWYgKGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleHAxKSB8fCBlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXhwMikpXG5cdFx0aGlnaGxpZ2h0Q2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG5cblx0aGlnaGxpZ2h0Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuXHRcdGhpZ2hsaWdodEJveEFjdGlvbihlbGVtZW50LCByb3cpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckhpZ2hsaWdodFNlY3Rpb25Db250ZW50fTtcbiIsIi8qIHJlbmRlcl9odG1sX2xpdmVfZGVidWdnZXIuanMsIHYuIDAuMS4yLCAyNy4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclBvcHVwfSBmcm9tICcuL3JlbmRlcl9wb3B1cC5qcyc7XG5cbmNvbnN0IHJlbmRlckh0bWxMaXZlRGVidWdnZXIgPSAoZWxlbWVudCkgPT4ge1xuXG5cdGNvbnN0IGh0bWxEZWJ1Z2dlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBuZXh0Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBwcmV2Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBzdGVwSW5Db250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHN0ZXBPdXRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2xzX3BvcHVwJyk7XG5cblx0aHRtbERlYnVnZ2VyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyJyk7XG5cdG5leHRDb250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sJyk7XG5cdHByZXZDb250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sJyk7XG5cdHN0ZXBJbkNvbnRyb2wuY2xhc3NMaXN0LmFkZCgndG9vbHNfZGVidWdnZXJfX2NvbnRyb2wnKTtcblx0c3RlcE91dENvbnRyb2wuY2xhc3NMaXN0LmFkZCgndG9vbHNfZGVidWdnZXJfX2NvbnRyb2wnKTtcblx0aHRtbERlYnVnZ2VyLmFwcGVuZENoaWxkKG5leHRDb250cm9sKTtcblx0aHRtbERlYnVnZ2VyLmFwcGVuZENoaWxkKHByZXZDb250cm9sKTtcblx0aHRtbERlYnVnZ2VyLmFwcGVuZENoaWxkKHN0ZXBJbkNvbnRyb2wpO1xuXHRodG1sRGVidWdnZXIuYXBwZW5kQ2hpbGQoc3RlcE91dENvbnRyb2wpO1xuXHRuZXh0Q29udHJvbC5pbm5lclRleHQgPSAnbmV4dCc7XG5cdHByZXZDb250cm9sLmlubmVyVGV4dCA9ICdwcmV2Jztcblx0c3RlcEluQ29udHJvbC5pbm5lclRleHQgPSAnaW4nO1xuXHRzdGVwT3V0Q29udHJvbC5pbm5lclRleHQgPSAnb3V0JztcblxuXHRpZiAoIWVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKVxuXHRcdG5leHRDb250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sLS1kaXNhYmxlZCcpO1xuXG5cdGlmICghZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKVxuXHRcdHByZXZDb250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sLS1kaXNhYmxlZCcpO1xuXG5cdGlmICghZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZClcblx0XHRzdGVwSW5Db250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sLS1kaXNhYmxlZCcpO1xuXG5cdGlmICghZWxlbWVudC5wYXJlbnRFbGVtZW50KVxuXHRcdHN0ZXBPdXRDb250cm9sLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX2RlYnVnZ2VyX19jb250cm9sLS1kaXNhYmxlZCcpO1xuXG5cdG5leHRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG5cdFx0aWYgKGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbHNfcG9wdXAnKS5yZW1vdmUoKTtcblx0XHRcdHJlbmRlclBvcHVwKGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSwgZmFsc2UpO1xuXHRwcmV2Q29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdGlmIChlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19wb3B1cCcpLnJlbW92ZSgpO1xuXHRcdFx0cmVuZGVyUG9wdXAoZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSwgZmFsc2UpO1xuXHRzdGVwSW5Db250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG5cdFx0aWYgKGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19wb3B1cCcpLnJlbW92ZSgpO1xuXHRcdFx0cmVuZGVyUG9wdXAoZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblx0c3RlcE91dENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cblx0XHRpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbHNfcG9wdXAnKS5yZW1vdmUoKTtcblx0XHRcdHJlbmRlclBvcHVwKGVsZW1lbnQucGFyZW50RWxlbWVudCk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblx0cmV0dXJuIGh0bWxEZWJ1Z2dlcjtcbn07XG5cbmV4cG9ydCB7cmVuZGVySHRtbExpdmVEZWJ1Z2dlcn07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yLmpzLCB2LiAwLjEuNiwgMTkuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJET019IGZyb20gJy4vcmVuZGVyX2RvbS5qcyc7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxuY29uc3QgcmVuZGVySW5zcGVjdG9yID0gKGJvZHksIHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBpbnNwZWN0b3JEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgaW5zcGVjdG9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGh0bWxFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBpbnNwZWN0b3JDb250YWluZXIuaWQgPSAnaW5zcGVjdG9yJztcbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5Jyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5pZCA9ICdpbnNwZWN0b3JfZGlzcGxheSc7XG4gICAgcmVuZGVySGVhZGVyKGluc3BlY3RvckNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2Rpc3BsYXktLWV4cGFuZGVkJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGluc3BlY3RvckRpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGluc3BlY3RvckNvbnRhaW5lcik7XG4gICAgcmVuZGVyRE9NKGh0bWxFbGVtLCBpbnNwZWN0b3JEaXNwbGF5LCBsZXZlbCk7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVySW5zcGVjdG9yfTtcbiIsIi8qIHJlbmRlcl9pbnNwZWN0b3JfcGFuZS5qcywgdi4gMC4xLjYsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyU2VjdGlvbn0gZnJvbSAnLi9yZW5kZXJfc2VjdGlvbi5qcyc7XG5cbmNvbnN0IHJlbmRlckluc3BlY3RvclBhbmUgPSAoZWxlbWVudCwgcm93LCBjb250YWluZXIpID0+IHtcblxuXHRjb25zdCBpZCA9IGNvbnRhaW5lci5pZFxuICAgIGNvbnN0IGluc3BlY3RvclBhbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgYXR0cmlidXRlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3Qgc3R5bGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBpbnNwZWN0b3JQYW5lV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBoaWdobGlnaHRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGRpbWVuc2lvbnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpbnNwZWN0b3JQYW5lLmNsYXNzTGlzdC5hZGQoYCR7aWR9LXBhbmVgKTtcblx0aW5zcGVjdG9yUGFuZVdyYXBwZXIuY2xhc3NMaXN0LmFkZChgJHtpZH0tcGFuZV9fd3JhcHBlcmApO1xuXG5cdGlmIChpZCA9PT0gJ2luc3BlY3RvcicpIHtcblxuXHRcdGNvbnN0IGNsb3NlQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0Y2xvc2VCdG4uY2xhc3NMaXN0LmFkZChgJHtpZH0tcGFuZV9fY2xvc2VgKTtcblx0XHRjbG9zZUJ0bi5pbm5lckhUTUwgPSAneCc7XG5cdFx0aW5zcGVjdG9yUGFuZS5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG5cdFx0Y2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRpbnNwZWN0b3JQYW5lLnJlbW92ZSgpO1xuXHRcdH0sIGZhbHNlKTtcblx0fVxuXHRcblx0aWYgKGlkID09PSAndG9vbHNfcG9wdXAnKVxuXHRcdHJlbmRlclNlY3Rpb24oJ25vZGVfbmFtZScsIGAke2lkfS1wYW5lYCwgJ05vZGUgbmFtZScsIGVsZW1lbnQsIHJvdywgYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuXG5cdHJlbmRlclNlY3Rpb24oJ2F0dHJfbGlzdCcsIGAke2lkfS1wYW5lYCwgJ0F0dHJpYnV0ZXMnLCBlbGVtZW50LCByb3csIGF0dHJpYnV0ZUxpc3RXcmFwcGVyKTtcblx0cmVuZGVyU2VjdGlvbignc3R5bGVfbGlzdCcsIGAke2lkfS1wYW5lYCwgJ0lubGluZSBzdHlsZXMnLCBlbGVtZW50LCByb3csIHN0eWxlTGlzdFdyYXBwZXIpO1xuXG5cdGlmIChpZCA9PT0gJ2luc3BlY3RvcicpXG5cdFx0cmVuZGVyU2VjdGlvbignaGlnaGxpZ2h0X3NlY3Rpb24nLCBgJHtpZH0tcGFuZWAsICdIaWdobGlnaHQgZWxlbWVudCcsIGVsZW1lbnQsIHJvdywgaGlnaGxpZ2h0V3JhcHBlcik7XG5cblx0cmVuZGVyU2VjdGlvbignZGltZW5zaW9uc19zZWN0aW9uJywgYCR7aWR9LXBhbmVgLCAnRGltZW5zaW9ucycsIGVsZW1lbnQsIHJvdywgZGltZW5zaW9uc1dyYXBwZXIpO1xuICAgIGluc3BlY3RvclBhbmVXcmFwcGVyLmFwcGVuZENoaWxkKGF0dHJpYnV0ZUxpc3RXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZUxpc3RXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChoaWdobGlnaHRXcmFwcGVyKTtcbiAgICBpbnNwZWN0b3JQYW5lV3JhcHBlci5hcHBlbmRDaGlsZChkaW1lbnNpb25zV3JhcHBlcik7XG4gICAgaW5zcGVjdG9yUGFuZS5hcHBlbmRDaGlsZChpbnNwZWN0b3JQYW5lV3JhcHBlcik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGluc3BlY3RvclBhbmUpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3JQYW5lfTtcbiIsIi8qIHJlbmRlcl9zZWN0aW9uLmpzLCB2LiAwLjEuNSwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5pbXBvcnQge2FkZEJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9hZGRfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2FwcGx5QnV0dG9uQWN0aW9ufSBmcm9tICcuL2FwcGx5X2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259IGZyb20gJy4vY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMnO1xuXG5jb25zdCByZW5kZXJMaXN0U2VjdGlvbkNvbnRlbnQgPSAoaWQsIGVsZW1lbnQsIHByZWZpeCwgcm93LCBoZWFkZXIsIGxpc3QsIGxpc3RXcmFwcGVyLCBzZWN0aW9uTmFtZSwgcmVnZXhwMSwgcmVnZXhwMikgPT4ge1xuXG5cdGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRjb25zdCBhZGRBcHBseUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRjb25zdCBhZGRDYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0Y29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0Y29uc3QgdmFsdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdGNvbnN0IG5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0Y29uc3QgdmFsdWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0bGV0IGFycjtcblx0XG5cdGxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cdGlmIChpZCA9PT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRhcnIgPSBbXS5maWx0ZXIuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGF0dHIgPT4gYXR0ci5uYW1lICE9PSAnc3R5bGUnKTtcblx0XHRzZWN0aW9uTmFtZSA9ICdhdHRyaWJ1dGVzJztcblx0fSBlbHNlIHtcblx0XHRhcnIgPSBbXTtcblx0XHRzZWN0aW9uTmFtZSA9ICdzdHlsZXMnO1xuXHR9XG5cblx0bGlzdC5pZCA9IGlkO1xuXHRhZGRCdG4uaW5uZXJUZXh0ID0gJysnO1xuXHRhZGRCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGRgKTtcblx0YWRkQXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0YWRkQ2FuY2VsQnRuLmlubmVyVGV4dCA9ICdDYW5jZWwnO1xuXHRhZGRBcHBseUJ0bi5pZCA9IGBhZGRfJHtpZC5yZXBsYWNlKCdfbGlzdCcsICcnKX1fYnRuYDtcblx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseWApO1xuXHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19jYW5jZWxgKTtcblx0bmFtZUlucHV0TGFiZWwuaW5uZXJUZXh0ID0gaWQgPT09ICdzdHlsZV9saXN0JyA/ICdwcm9wZXJ0eSBuYW1lICcgOiAnYXR0cmlidXRlIG5hbWUgJztcblx0dmFsdWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgdmFsdWUgJyA6ICdhdHRyaWJ1dGUgdmFsdWUgJztcblx0bmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2FkZC1pbnB1dGApO1xuXHR2YWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdHZhbHVlSW5wdXQuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hZGQtaW5wdXRgKTtcblx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19hcHBseS0tY29sbGFwc2VkYCk7XG5cdGFkZENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2NhbmNlbC0tY29sbGFwc2VkYCk7XG5cdG5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0dmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fYWRkLWxhYmVsLS1jb2xsYXBzZWRgKTtcblx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEJ0bik7XG5cdGhlYWRlci5hcHBlbmRDaGlsZChhZGRDYW5jZWxCdG4pO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQoYWRkQXBwbHlCdG4pO1xuXHRuYW1lSW5wdXRMYWJlbC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXHR2YWx1ZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dCk7XG5cdGhlYWRlci5hcHBlbmRDaGlsZChuYW1lSW5wdXRMYWJlbCk7XG5cdGhlYWRlci5hcHBlbmRDaGlsZCh2YWx1ZUlucHV0TGFiZWwpO1xuXG5cdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnICYmIGVsZW1lbnQuYXR0cmlidXRlcyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUpIHtcblx0XHRhcnIgPSAnJy5zcGxpdC5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcy5zdHlsZS52YWx1ZSwgJzsgJylcblx0XHRhcnIgPSBhcnIubWFwKHJ1bGUgPT4gcnVsZS5yZXBsYWNlKCc7JywgJycpKTtcblxuXHRcdGlmIChyb3cgJiYgcm93Lmhhc0F0dHJpYnV0ZSgnZGF0YS1oaWdobGlnaHQnKSlcblx0XHRcdGFyciA9IGFyci5maWx0ZXIocnVsZSA9PiAhcnVsZS5tYXRjaChyZWdleHAxKSAmJiAhcnVsZS5tYXRjaChyZWdleHAyKSk7XG5cblx0fVxuXG5cdGZvciAobGV0IGl0ZW0gaW4gYXJyKSB7XG5cdFx0XG5cdFx0bGV0IG5hbWU7XG5cdFx0bGV0IHZhbHVlO1xuXG5cdFx0aWYgKGlkID09PSAnc3R5bGVfbGlzdCcpIHtcblx0XHRcdG5hbWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMF07XG5cdFx0XHR2YWx1ZSA9IGFycltpdGVtXS5zcGxpdCgnOiAnKVsxXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmFtZSA9IGFycltpdGVtXS5uYW1lO1xuXHRcdFx0dmFsdWUgPSBhcnJbaXRlbV0udmFsdWU7XG5cdFx0fVxuXG5cdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgbmFtZSwgdmFsdWUsIHByZWZpeCk7XG5cdH1cblxuXHRhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdGFkZEJ1dHRvbkFjdGlvbihhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCBuYW1lSW5wdXRMYWJlbCwgdmFsdWVJbnB1dExhYmVsLCBoZWFkZXIsIHByZWZpeCk7XG5cdH0sIGZhbHNlKTtcblx0YWRkQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0YXBwbHlCdXR0b25BY3Rpb24oZWxlbWVudCwgYWRkQXBwbHlCdG4sIGFkZENhbmNlbEJ0biwgdmFsdWVJbnB1dExhYmVsLCBuYW1lSW5wdXRMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlciwgcHJlZml4KTtcblx0fSwgZmFsc2UpO1xuXHRhZGRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0Y2FuY2VsQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIHZhbHVlSW5wdXRMYWJlbCwgbmFtZUlucHV0TGFiZWwsIGhlYWRlciwgcHJlZml4KTtcblx0fSwgZmFsc2UpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckxpc3RTZWN0aW9uQ29udGVudH07XG4iLCIvKiByZW5kZXJfbGl2ZV9vdmVybGF5LmpzLCB2LiAwLjEuMSwgMjYuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtmaW5kRWxlbWVudFBvc2l0aW9ufSBmcm9tICcuL2ZpbmRfZWxlbWVudF9wb3NpdGlvbi5qcyc7XG5pbXBvcnQge3JlbmRlclBvcHVwfSBmcm9tICcuL3JlbmRlcl9wb3B1cC5qcyc7XG5cbmNvbnN0IHJlbmRlckxpdmVPdmVybGF5ID0gKCkgPT4ge1xuICAgXG5cdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXHRvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX292ZXJsYXknKTtcblx0b3ZlcmxheS5pZCA9ICd0b29sc19vdmVybGF5Jztcblx0b3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9IGZpbmRFbGVtZW50UG9zaXRpb24oZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuXG5cdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sc19saXZlX3BvcHVwJykpXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbHNfbGl2ZV9wb3B1cCcpLnJlbW92ZSgpO1xuXG5cdFx0cmVuZGVyUG9wdXAoZWxlbWVudCk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyTGl2ZU92ZXJsYXl9O1xuIiwiLyogcmVuZGVyX25vZGVuYW1lX3NlY3Rpb25fY29udGVudC5qcywgdi4gMC4xLjAsIDI3LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlck5vZGVuYW1lU2VjdGlvbkNvbnRlbnQgPSAoZWxlbWVudCwgaGVhZGVyLCBwcmVmaXgsIGxpc3QsIGxpc3RXcmFwcGVyLCBzZWN0aW9uTmFtZSkgPT4ge1xuXG5cdGNvbnN0IG5vZGVOYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5cdG5vZGVOYW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0bm9kZU5hbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19ub2RlLW5hbWVgKTtcblx0aGVhZGVyLmFwcGVuZENoaWxkKG5vZGVOYW1lQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyTm9kZW5hbWVTZWN0aW9uQ29udGVudH07XG4iLCIvKiByZW5kZXJfcG9wdXAuanMsIHYuIDAuMS45LCAyOS4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckh0bWxMaXZlRGVidWdnZXJ9IGZyb20gJy4vcmVuZGVyX2h0bWxfbGl2ZV9kZWJ1Z2dlci5qcyc7XG5pbXBvcnQge3JlbmRlckluc3BlY3RvclBhbmV9IGZyb20gJy4vcmVuZGVyX2luc3BlY3Rvcl9wYW5lLmpzJztcbmltcG9ydCB7ZmluZEVsZW1lbnRJbmRleH0gZnJvbSAnLi9maW5kX2VsZW1lbnRfaW5kZXguanMnO1xuXG5jb25zdCByZW5kZXJQb3B1cCA9IChlbGVtZW50KSA9PiB7XG5cblx0Y29uc3QgcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgY2xvc2VCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IHBvcHVwV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBlbGVtZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGh0bWxEZWJ1Z2dlciA9IHJlbmRlckh0bWxMaXZlRGVidWdnZXIoZWxlbWVudCk7XG5cdGNvbnN0IHBvc2l0aW9uID0gZWxlbWVudFJlY3QueSArIHBvcHVwLmNsaWVudEhlaWdodDtcblx0Y29uc3QgaW5kZXggPSBmaW5kRWxlbWVudEluZGV4KGVsZW1lbnQpO1xuXHRjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19yb3ctLW9wZW5pbmcnKVtpbmRleF07XG5cblx0cG9wdXAuY2xhc3NMaXN0LmFkZCgndG9vbHNfcG9wdXAnKTtcblx0cG9wdXAuaWQgPSAndG9vbHNfcG9wdXAnO1xuXG5cdGlmIChwb3NpdGlvbiA8IDApXG5cdFx0cG9wdXAuc3R5bGUudG9wID0gYDBweGA7XG5cdGVsc2UgaWYgKGVsZW1lbnRSZWN0LnkgPj0gd2luZG93LmlubmVySGVpZ2h0KVxuXHRcdHBvcHVwLnN0eWxlLnRvcCA9IGAke3dpbmRvdy5pbm5lckhlaWdodCAtIHBvcHVwLmNsaWVudEhlaWdodH1weGA7XG5cdGVsc2Vcblx0XHRwb3B1cC5zdHlsZS50b3AgPSBgJHtwb3NpdGlvbn1weGA7XG5cblx0cG9wdXBXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX3BvcHVwX193cmFwcGVyJyk7XG5cdGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX3BvcHVwX19jbG9zZScpO1xuXHRjbG9zZUJ0bi5pbm5lckhUTUwgPSAneCc7XG5cblx0Y2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cblx0XHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2xzX292ZXJsYXknKTtcblx0XHRjb25zdCBsaXZlTW9kZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpdmVfbW9kZV9pbnB1dCcpO1xuXHRcdGNvbnN0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdHN0ZWFsQnJvd3NlckNvbnNvbGU6IERULnN0ZWFsQnJvd3NlckNvbnNvbGUsXG5cdFx0XHRsaXZlTW9kZTogZmFsc2Vcblx0XHR9KTtcblxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRvY3VtZW50LmRvbWFpbiwgY29uZmlnKTtcblx0XHRvdmVybGF5LnJlbW92ZSgpO1xuXHRcdGxpdmVNb2RlSW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdERULmxpdmVNb2RlID0gZmFsc2U7XG5cdFx0cG9wdXAucmVtb3ZlKCk7XG5cdH0sIGZhbHNlKTtcblxuXHRwb3B1cC5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG5cdHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG5cdHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChodG1sRGVidWdnZXIpO1xuXHRyZW5kZXJJbnNwZWN0b3JQYW5lKGVsZW1lbnQsIHJvdywgcG9wdXApO1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyUG9wdXB9O1xuIiwiLyogcmVuZGVyX3NlY3Rpb24uanMsIHYuIDAuMS41LCAyNy4wOS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckxpc3RTZWN0aW9uQ29udGVudH0gZnJvbSAnLi9yZW5kZXJfbGlzdF9zZWN0aW9uX2NvbnRlbnQuanMnO1xuaW1wb3J0IHtyZW5kZXJIaWdobGlnaHRTZWN0aW9uQ29udGVudH0gZnJvbSAnLi9yZW5kZXJfaGlnaGxpZ2h0X3NlY3Rpb25fY29udGVudC5qcyc7XG5pbXBvcnQge3JlbmRlckRpbWVuc2lvbnNTZWN0aW9uQ29udGVudH0gZnJvbSAnLi9yZW5kZXJfZGltZW5zaW9uc19zZWN0aW9uX2NvbnRlbnQuanMnO1xuaW1wb3J0IHtyZW5kZXJOb2RlbmFtZVNlY3Rpb25Db250ZW50fSBmcm9tICcuL3JlbmRlcl9ub2RlbmFtZV9zZWN0aW9uX2NvbnRlbnQuanMnO1xuXG5jb25zdCByZW5kZXJTZWN0aW9uID0gKGlkLCBwcmVmaXgsIHRpdGxlLCBlbGVtZW50LCByb3csIGxpc3RXcmFwcGVyKSA9PiB7XG5cblx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCByZWdleHAxID0gbmV3IFJlZ0V4cCgvYmFja2dyb3VuZC1jb2xvcjogcmdiXFwoMTcwLCAyMjEsIDI1NVxcKSBcXCFpbXBvcnRhbnQvKTtcblx0Y29uc3QgcmVnZXhwMiA9IG5ldyBSZWdFeHAoL2JhY2tncm91bmQtY29sb3I6IFxcI2FkZiBcXCFpbXBvcnRhbnQvKTtcblx0bGV0IHNlY3Rpb25OYW1lID0gJyc7XG5cblx0aGVhZGVyLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cHJlZml4fV9faGVhZGxpbmVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXHRsaXN0LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fV9fbGlzdGApO1xuXG5cdGlmIChpZCA9PT0gJ2F0dHJfbGlzdCcgfHwgaWQgPT09ICdzdHlsZV9saXN0Jylcblx0XHRyZW5kZXJMaXN0U2VjdGlvbkNvbnRlbnQoaWQsIGVsZW1lbnQsIHByZWZpeCwgcm93LCBoZWFkZXIsIGxpc3QsIGxpc3RXcmFwcGVyLCBzZWN0aW9uTmFtZSwgcmVnZXhwMSwgcmVnZXhwMik7XG5cblx0aWYgKGlkID09PSAnaGlnaGxpZ2h0X3NlY3Rpb24nKVxuXHRcdHJlbmRlckhpZ2hsaWdodFNlY3Rpb25Db250ZW50KGVsZW1lbnQsIGhlYWRlciwgcm93LCBwcmVmaXgsIGxpc3QsIGxpc3RXcmFwcGVyLCBzZWN0aW9uTmFtZSwgcmVnZXhwMSwgcmVnZXhwMik7XG5cblx0aWYgKGlkID09PSAnZGltZW5zaW9uc19zZWN0aW9uJylcblx0XHRyZW5kZXJEaW1lbnNpb25zU2VjdGlvbkNvbnRlbnQoZWxlbWVudCwgaGVhZGVyLCBwcmVmaXgsIGxpc3QsIGxpc3RXcmFwcGVyLCBzZWN0aW9uTmFtZSk7XG5cblx0aWYgKGlkID09PSAnbm9kZV9uYW1lJylcblx0XHRyZW5kZXJOb2RlbmFtZVNlY3Rpb25Db250ZW50KGVsZW1lbnQsIGhlYWRlciwgcHJlZml4LCBsaXN0LCBsaXN0V3JhcHBlciwgc2VjdGlvbk5hbWUpO1xuXG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX2hlYWRlcmApO1xuXHRsaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH1fX3NlY3Rpb25gKTtcblx0bGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9X19zZWN0aW9uLS0ke3NlY3Rpb25OYW1lfWApO1xufTtcblxuZXhwb3J0IHtyZW5kZXJTZWN0aW9ufTtcbiIsIi8qIHJlbmRlcl9zZXR0aW5ncy5qcywgdi4gMC4xLjAsIDIyLjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuaW1wb3J0IHtyZW5kZXJTZXR0aW5nc0NvbnRyb2xzfSBmcm9tICcuL3JlbmRlcl9zZXR0aW5nc19jb250cm9scy5qcyc7XG5cbmNvbnN0IHJlbmRlclNldHRpbmdzID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBzZXR0aW5nc0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc2V0dGluZ3NDb250YWluZXIuaWQgPSAnc2V0dGluZ3MnO1xuICAgIHNldHRpbmdzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzJyk7XG4gICAgc2V0dGluZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfX3BhbmVsJyk7XG4gICAgc2V0dGluZ3NEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX19kaXNwbGF5Jyk7XG4gICAgc2V0dGluZ3NEaXNwbGF5LmlkID0gJ3NldHRpbmdzX2Rpc3BsYXknO1xuICAgIHNldHRpbmdzRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19fZGlzcGxheS0tY29sbGFwc2VkJyk7XG4gICAgcmVuZGVySGVhZGVyKHNldHRpbmdzQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgc2V0dGluZ3NDb250YWluZXIuYXBwZW5kQ2hpbGQoc2V0dGluZ3NEaXNwbGF5KTtcblx0cmVuZGVyU2V0dGluZ3NDb250cm9scyhzZXR0aW5nc0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKHNldHRpbmdzQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyU2V0dGluZ3N9O1xuIiwiLyogcmVuZGVyX3NldHRpbmdzX2NvbnRyb2xzLmpzLCB2LiAwLjEuMiwgMjcuMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtzdGVhbENvbnNvbGVBY3Rpb259IGZyb20gJy4vc3RlYWxfY29uc29sZV9hY3Rpb24uanMnO1xuaW1wb3J0IHtsaXZlTW9kZUFjdGlvbn0gZnJvbSAnLi9saXZlX21vZGVfYWN0aW9uLmpzJztcblxuY29uc3QgcmVuZGVyU2V0dGluZ3NDb250cm9scyA9IChjb250YWluZXIpID0+IHtcblxuXHRjb25zdCBzdGVhbENvbnNvbGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3Qgc3RlYWxDb25zb2xlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRjb25zdCBzdGVhbENvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdGNvbnN0IGxpdmVNb2RlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGxpdmVNb2RlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRjb25zdCBsaXZlTW9kZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bGV0IHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXSBcblx0XHQ/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pIDogZmFsc2U7XG5cblx0c3RlYWxDb25zb2xlUm93LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX2Rpc3BsYXlfX3JvdycpO1xuXHRzdGVhbENvbnNvbGVMYWJlbC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19kaXNwbGF5X19sYWJlbCcpO1xuXHRzdGVhbENvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc19kaXNwbGF5X19pbnB1dCcpO1xuXHRzdGVhbENvbnNvbGVJbnB1dC50eXBlID0gJ2NoZWNrYm94Jztcblx0c3RlYWxDb25zb2xlSW5wdXQuaWQgPSAnc3RlYWxfYnJvd3Nlcl9jb25zb2xlX2lucHV0Jztcblx0c3RlYWxDb25zb2xlTGFiZWwuaW5uZXJUZXh0ID0gJ1N0ZWFsIGJyb3dzZXIgY29uc29sZSc7XG5cdHN0ZWFsQ29uc29sZVJvdy5hcHBlbmRDaGlsZChzdGVhbENvbnNvbGVMYWJlbCk7XG5cdHN0ZWFsQ29uc29sZUxhYmVsLmFwcGVuZENoaWxkKHN0ZWFsQ29uc29sZUlucHV0KTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZWFsQ29uc29sZVJvdyk7XG5cblx0aWYgKHN0b3JhZ2UgJiYgc3RvcmFnZS5zdGVhbEJyb3dzZXJDb25zb2xlKVxuXHRcdHN0ZWFsQ29uc29sZUlucHV0LmNoZWNrZWQgPSB0cnVlO1xuXHRlbHNlXG5cdFx0c3RlYWxDb25zb2xlSW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuXG5cdHN0ZWFsQ29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+XG5cdFx0c3RlYWxDb25zb2xlQWN0aW9uKHN0ZWFsQ29uc29sZUlucHV0KSwgZmFsc2UpO1xuXG5cdGxpdmVNb2RlUm93LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX2Rpc3BsYXlfX3JvdycpO1xuXHRsaXZlTW9kZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzX2Rpc3BsYXlfX2xhYmVsJyk7XG5cdGxpdmVNb2RlSW5wdXQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NfZGlzcGxheV9faW5wdXQnKTtcblx0bGl2ZU1vZGVJbnB1dC50eXBlID0gJ2NoZWNrYm94Jztcblx0bGl2ZU1vZGVJbnB1dC5pZCA9ICdsaXZlX21vZGVfaW5wdXQnO1xuXHRsaXZlTW9kZUxhYmVsLmlubmVyVGV4dCA9ICdMaXZlIG1vZGUnO1xuXHRsaXZlTW9kZVJvdy5hcHBlbmRDaGlsZChsaXZlTW9kZUxhYmVsKTtcblx0bGl2ZU1vZGVMYWJlbC5hcHBlbmRDaGlsZChsaXZlTW9kZUlucHV0KTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGxpdmVNb2RlUm93KTtcblxuXHRpZiAoc3RvcmFnZSAmJiBzdG9yYWdlLmxpdmVNb2RlKVxuXHRcdGxpdmVNb2RlSW5wdXQuY2hlY2tlZCA9IHRydWU7XG5cdGVsc2Vcblx0XHRsaXZlTW9kZUlucHV0LmNoZWNrZWQgPSBmYWxzZTtcblxuXHRsaXZlTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IFxuXHRcdGxpdmVNb2RlQWN0aW9uKGxpdmVNb2RlSW5wdXQpLCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlclNldHRpbmdzQ29udHJvbHN9O1xuIiwiLyogcmVuZGVyX3N0eWxlcy5qcywgdi4gMC4xLjAsIDE4LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJlbmRlclN0eWxlcyA9IChydWxlcykgPT4ge1xuXG4gICAgY29uc3Qgc3R5bGVTaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuICAgIHJ1bGVzLmZvckVhY2goKHJ1bGUsIGkpID0+IHtzdHlsZVNoZWV0LnNoZWV0Lmluc2VydFJ1bGUocnVsZSwgaSk7fSk7XG59O1xuXG5leHBvcnQge3JlbmRlclN0eWxlc307XG4iLCIvKiBzdGVhbF9jb25zb2xlX2FjdGlvbi5qcywgdi4gMC4xLjEsIDI2LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHN0ZWFsQ29uc29sZUFjdGlvbiA9IChpbnB1dCkgPT4ge1xuXG5cdGNvbnN0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRzdGVhbEJyb3dzZXJDb25zb2xlOiBpbnB1dC5jaGVja2VkLFxuXHRcdGxpdmVNb2RlOiBEVC5saXZlTW9kZVxuXHR9KTtcblxuXHRpZiAoaW5wdXQuY2hlY2tlZCkge1xuXHRcdERULmJhY2t1cCA9IHdpbmRvdy5jb25zb2xlO1xuXHRcdHdpbmRvdy5jb25zb2xlID0gRFQuY29uc29sZTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY29uc29sZSA9IERULmJhY2t1cDtcblx0XHREVC5iYWNrdXAgPSBudWxsO1xuXHR9XG5cblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oZG9jdW1lbnQuZG9tYWluLCBjb25maWcpO1xuXHREVC5zdGVhbEJyb3dzZXJDb25zb2xlID0gaW5wdXQuY2hlY2tlZDtcbn07XG5cbmV4cG9ydCB7c3RlYWxDb25zb2xlQWN0aW9ufTtcblxuIiwiLyogc3R5bGVzLmpzLCB2LiAwLjEuMTQsIDI5LjA5LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmNvbnN0IHJ1bGVzID0gW107XG5cbi8qIGJhc2UgKi9cblxucnVsZXMucHVzaChgLmJvZHkge1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAxMDAlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHMge1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGZvbnQtZmFtaWx5OiAnU3BhY2UgTW9ubycsIG1vbm9zcGFjZTtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR6LWluZGV4OiA5OTk5OTk5O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfX3BhbmVsIHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG4vKiBpbnNwZWN0b3IgKi9cblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9faGVhZGVyIHtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5IHtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRvdmVyZmxvdzogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fZGlzcGxheSA+IC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IC41cztcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItbGVmdDogMCBub25lIHRyYW5zcGFyZW50O1xuXHRib3JkZXItcmlnaHQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93IHtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDsgY29sb3I6ICM0NDQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdzpob3Zlcjo6YmVmb3JlIHtcblx0Y29udGVudDogJyc7XG5cdHdpZHRoOiAxMDAlO1xuXHRoZWlnaHQ6IDIwcHg7XG5cdGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0ei1pbmRleDogLTE7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3Jvdy0tb3BlbmluZyB7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fcm93LS1leHBhbmRlZCB+IC5pbnNwZWN0b3JfX2V4cCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19leHAge1xuXHRkaXNwbGF5OiBub25lO1xuXHRtYXJnaW4tbGVmdDogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4ge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1vcGVuOjphZnRlciB7XG5cdGNvbnRlbnQ6ICcnO1xuXHRkaXNwbGF5OiBub25lO1xuXHRib3JkZXItbGVmdDogNnB4IHNvbGlkICNiYmI7XG5cdGJvcmRlci10b3A6IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogNXB4O1xuXHRsZWZ0OiAtOHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkOjphZnRlciB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHR0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIC41cztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkOjphZnRlciB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHR0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3JfX3RhZy1jbG9zZTpsYXN0LWNoaWxkIHtcblx0cGFkZGluZy1yaWdodDogMTBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fdGFnLW5hbWUge1xuXHRjb2xvcjogIzgwMDA4MDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvcl9fYXR0ci1uYW1lIHtcblx0Y29sb3I6ICMwMDA7XG5cdHBhZGRpbmctbGVmdDogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yX19hdHRyLXZhbHVlIHtcblx0Y29sb3I6ICMwMGY7XG59YCk7XG5cbi8qIGNvbnNvbGUgKi9cblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2hlYWRlciB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0cGFkZGluZzogMTBweDtcblx0Y3Vyc29yOiBwb2ludGVyO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fY29udHJvbHMtLWJ0biB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC1mYW1pbHk6IFwiU3BhY2UgTW9ub1wiLCBtb25vc3BhY2U7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1jbGVhci1idG4ge1xuICAgIHJpZ2h0OiA2cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scy0tbG9nLWJ0biB7XG4gICAgcmlnaHQ6IDYzcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19jb250cm9scyB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2NvbnRyb2xzLS1leHBhbmRlZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19kaXNwbGF5IHtcblx0b3ZlcmZsb3c6IGF1dG87XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19kaXNwbGF5LS1leHBhbmRlZCB7XG5cdGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19kaXNwbGF5LS1jb2xsYXBzZWQge1xuXHRoZWlnaHQ6IDA7XG5cdHRyYW5zaXRpb246IGhlaWdodCAuNXM7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcblx0Ym9yZGVyLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbnB1dCB7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAycHgpO1xuXHRoZWlnaHQ6IDMwcHg7XG5cdG1hcmdpbjogMDtcblx0cGFkZGluZzogMDtcblx0dGV4dC1pbmRlbnQ6IDMwcHg7XG5cdGJvcmRlci1ib3R0b206IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNiY2JjYmM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbnB1dC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDMwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19pbnB1dC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRib3JkZXItLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLS1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fcHJvbXB0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAwO1xuXHRib3R0b206IDA7XG5cdHdpZHRoOiAzMHB4O1xuXHRoZWlnaHQ6IDMwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQ6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICc+Pic7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogM3B4O1xuXHRsZWZ0OiA1cHg7XG5cdGhlaWdodDogMTBweDtcblx0Y29sb3I6ICNhY2FjYWM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQtLWV4cGFuZGVkIHtcblx0ZGlzcGxheTogYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctaSB7XG5cdGNvbG9yOiAjYWNhY2FjO1xuXHRwYWRkaW5nOiA1cHggNXB4IDVweCAyNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fbXNnLXIge1xuXHRjb2xvcjogIzAwMDtcblx0cGFkZGluZzogNXB4IDVweCA1cHggMjVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1yLS1lcnIge1xuXHRjb2xvcjogI2E5MzIyNjtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZhZGJkODtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX21zZy1ycHJvbXB0IHtcblx0d2lkdGg6IDI1cHg7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0Y29sb3I6ICNhY2FjYWM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctcnByb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJzw9Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogLTIwcHg7XG5cdHRvcDogM3B4O1xuXHRmb250LXNpemU6IDEycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctaXByb21wdCB7XG5cdHdpZHRoOiAyNXB4OyBwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19tc2ctaXByb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJz4+Jztcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogLTIwcHg7XG5cdGZvbnQtc2l6ZTogMTJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2Vyci1wcm9tcHQge1xuXHR3aWR0aDogMjVweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZXJyLXByb21wdDo6YmVmb3JlIHtcblx0Y29udGVudDogJ3gnO1xuXHRkaXNwbGF5OiBibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMTdweDtcblx0dG9wOiAwO1xuXHRmb250LXNpemU6IDEycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX191bmRlZmluZWQge1xuXHRjb2xvcjogI2FkYWRhZDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX251bWJlciB7XG5cdGNvbG9yOiAjMDAwMGNjO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fc3RyaW5nIHtcblx0Y29sb3I6ICNjYzY2MDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19ib29sZWFuIHtcblx0Y29sb3I6ICM4MDAwMDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19udWxsIHtcblx0Y29sb3I6ICM4MDAwMDA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19rZXkge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2tleTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnOiAnO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9faW5kZXgge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fdmFsdWU6bm90KDpsYXN0LWNoaWxkKTo6YWZ0ZXIge1xuXHRjb250ZW50OiAnLCAnO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fYXJyYXk6OmFmdGVyIHtcblx0Y29udGVudDogJ10nO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fYXJyYXk6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICdbJztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX29iamVjdDo6YWZ0ZXIge1xuXHRjb250ZW50OiAnfSc7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5jb25zb2xlX19vYmplY3Q6OmJlZm9yZSB7XG5cdGNvbnRlbnQ6ICd7Jztcbn1gKTtcblxucnVsZXMucHVzaChgLmNvbnNvbGVfX2YtbmFtZSB7XG5cdGNvbG9yOiAjMDA5OWZmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuY29uc29sZV9fZi1rZXkge1xuXHRjb2xvcjogIzgwMDAwMDtcbn1gKTtcblxuLyogYnJvd3Nlcl9pbmZvICovXG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19oZWFkZXIge1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19oZWFkZXItLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNiY2JjYmM7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX19kaXNwbGF5IHtcblx0cGFkZGluZzogMTBweDsgb3ZlcmZsb3c6IGhpZGRlbjtcbn1gKTtcblxucnVsZXMucHVzaChgLmJyb3dzZXJfX2Rpc3BsYXktLWV4cGFuZGVkIHtcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDE2M3B4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuYnJvd3Nlcl9fZGlzcGxheS0tY29sbGFwc2VkIHtcblx0aGVpZ2h0OiAwO1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkaW5nLXRvcCBwYWRkaW5nLWJvdHRvbSAuNXM7XG5cdHBhZGRpbmctdG9wOiAwO1xuXHRwYWRkaW5nLWJvdHRvbTogMDtcblx0Ym9yZGVyLWxlZnQ6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0Ym9yZGVyLXJpZ2h0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX2Rpc3BsYXlfX3JvdyB7XG5cdHBhZGRpbmctYm90dG9tOiA1cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5icm93c2VyX2Rpc3BsYXlfX2tleSB7XG4gICAgY29sb3I6ICM4MDAwODA7XG59YCk7XG5cbi8qIGluc3BlY3Rvcl9wYW5lICovXG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZSB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0d2lkdGg6IGNhbGMoMTAwJSAtIDJweCk7XG5cdGhlaWdodDogNDAwcHg7XG5cdHRvcDogMzlweDtcblx0bGVmdDogMXB4O1xuXHRvdmVyZmxvdy15OiBhdXRvO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2Nsb3NlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDA7XG5cdHJpZ2h0OiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiA2cHggNXB4IDdweCA1cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0Zm9udC1zaXplOiAyMHB4O1xuXHR6LWluZGV4OiAxO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX3dyYXBwZXIge1xuXHRoZWlnaHQ6IDQwMHB4O1xuXHRvdmVyZmxvdy14OiBoaWRkZW47XG5cdG92ZXJmbG93LXk6IHNjcm9sbDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hlYWRlciB7XG5cdHBhZGRpbmc6IDEwcHggMTBweCA1cHggMTBweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VmZWZlZjtcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNlZmVmZWY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fc2VjdGlvbjpmaXJzdC1jaGlsZCAuaW5zcGVjdG9yLXBhbmVfX2hlYWRlciB7XG5cdGJvcmRlci10b3A6IDAgbm9uZSB0cmFuc3BhcmVudDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19oZWFkZXItLWV4cGFuZGVkIHtcblx0cGFkZGluZy1ib3R0b206IDQwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9faGVhZGxpbmUge1xuXHRkaXNwbGF5OiBibG9jaztcblx0cGFkZGluZy1ib3R0b206IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hZGQge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdGJveC1zaGFkb3c6IG5vbmU7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRwYWRkaW5nOiAwO1xuXHRyaWdodDogNXB4O1xuXHR0b3A6IDVweDtcblx0Zm9udC1zaXplOiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX3NlY3Rpb246Zmlyc3QtY2hpbGQgLmluc3BlY3Rvci1wYW5lX19hZGQge1xuXHRyaWdodDogMzJweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hZGQtaW5wdXQge1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDlweDtcblx0Zm9udC1mYW1pbHk6IFwiU3BhY2UgTW9ub1wiLG1vbm9zcGFjZTtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRtaW4td2lkdGg6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fYWRkLWxhYmVsLS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FkZC1sYWJlbC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcblx0cGFkZGluZy10b3A6IDVweDtcblx0cGFkZGluZy1sZWZ0OiAxMHB4O1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2FwcGx5IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0dG9wOiA5NHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2E5MzIyNjtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hcHBseS0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19hcHBseS0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2FuY2VsIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogNjVweDtcblx0dG9wOiA5NHB4O1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2FjYWNhYztcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRjb2xvcjogIzQ0NDtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19jYW5jZWwtLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fY2FuY2VsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0IHtcblx0bGlzdC1zdHlsZTogbm9uZTtcblx0bWFyZ2luLXRvcDogMDtcblx0bWFyZ2luLWJvdHRvbTogMDtcblx0cGFkZGluZy1sZWZ0OiAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3QtZWxlbWVudCB7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWxhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGNvbG9yOiAjODAwMDgwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2xpc3Qtc2VwYXJhdG9yIHtcblx0cGFkZGluZy1yaWdodDogNXB4O1xuXHRjb2xvcjogIzAwMDtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWlucHV0IHtcblx0LW1vei1hcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xuXHRmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsbW9ub3NwYWNlO1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGNvbG9yOiAjMDBmO1xuXHRtaW4td2lkdGg6IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1pbnB1dDpmb2N1cyB7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGNvbG9yOiAjZmZmO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuXHRjb2xvcjogIzQ0NDtcblx0Ym94LXNoYWRvdzogaW5zZXQgMCAwIDJweCAxcHggI2ZmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWJ0biB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDEwcHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdHRvcDogMDtcblx0Y29sb3I6ICNmZmY7XG5cdHBhZGRpbmc6IDAgMTBweCA0cHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fbGlzdC1idG4tLWV4cGFuZGVkIHtcblx0dmlzaWJpbGl0eTogdmlzaWJsZTtcbn1gKTtcblxucnVsZXMucHVzaChgLmluc3BlY3Rvci1wYW5lX19saXN0LWJ0bi0tY29sbGFwc2VkIHtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2hpZ2hsaWdodCB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0dG9wOiAxMHB4O1xuXHRyaWdodDogMnB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuaW5zcGVjdG9yLXBhbmVfX2RpbWVuc2lvbnMtcm93IHtcblx0cGFkZGluZzogNXB4IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fa2V5IHtcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5pbnNwZWN0b3ItcGFuZV9fdmFsdWUge1xuXHRjb2xvcjogIzAwZjtcbn1gKTtcblxuLyogc2V0dGluZ3MgKi9cblxucnVsZXMucHVzaChgLnNldHRpbmdzX19oZWFkZXIge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5zZXR0aW5nc19fZGlzcGxheSB7XG5cdHBhZGRpbmc6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47XG59YCk7XG5cbnJ1bGVzLnB1c2goYC5zZXR0aW5nc19fZGlzcGxheS0tZXhwYW5kZWQge1xuXHRib3JkZXItbGVmdDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRoZWlnaHQ6IDEwMHB4O1xuXHR0cmFuc2l0aW9uOiBoZWlnaHQgcGFkZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xufWApO1xuXG5ydWxlcy5wdXNoKGAuc2V0dGluZ3NfX2Rpc3BsYXktLWNvbGxhcHNlZCB7XG5cdGhlaWdodDogMDtcblx0dHJhbnNpdGlvbjogaGVpZ2h0IHBhZGluZy10b3AgcGFkZGluZy1ib3R0b20gLjVzO1xuXHRwYWRkaW5nLXRvcDogMDtcblx0cGFkZGluZy1ib3R0b206IDA7XG5cdGJvcmRlci1sZWZ0OiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1yaWdodDogMCBub25lIHRyYW5zcGFyZW50O1xufWApO1xuXG5ydWxlcy5wdXNoKGAuc2V0dGluZ3NfZGlzcGxheV9fcm93IHtcblx0cGFkZGluZy1ib3R0b206IDVweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnNldHRpbmdzX2Rpc3BsYXlfX2xhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnNldHRpbmdzX2Rpc3BsYXlfX2lucHV0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMDtcblx0dG9wOiAtMnB4O1xufWApO1xuXG4vKiBvdmVybGF5ICovXG5cbnJ1bGVzLnB1c2goYC50b29sc19vdmVybGF5IHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGJvdHRvbTogMDtcblx0bGVmdDogMDtcblx0cmlnaHQ6IDA7XG5cdHpJbmRleDogOTk5OTk5O1xufWApO1xuXG4vKiBwb3B1cCAqL1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAge1xuXHRwb3NpdGlvbjogZml4ZWQ7XG5cdG1heC13aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAyMHB4KTtcblx0bWluLWhlaWdodDogMTUwcHg7XG5cdHRvcDogMDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLXJhZGl1czogN3B4O1xuXHRib3gtc2hhZG93OiAwIDFweCAzcHggMXB4ICNiY2JjYmM7XG5cdHotaW5kZXg6IDk5OTk5OTk5O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXBfX2Nsb3NlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogN3B4O1xuXHRmb250LXNpemU6IDE4cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxuLyogaHRtbCBsaXZlIGRlYnVnZ2VyICovXG5cbnJ1bGVzLnB1c2goYC50b29sc19kZWJ1Z2dlciB7XG4gICAgcGFkZGluZzogOHB4IDEwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19kZWJ1Z2dlcl9fY29udHJvbCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDAgMTBweCA0cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgY29sb3I6ICMwMDA7XG5cdGN1cnNvcjogcG9pbnRlcjtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX2RlYnVnZ2VyX19jb250cm9sLS1kaXNhYmxlZCB7XG4gICAgY29sb3I6ICNiY2JjYmM7XG59YCk7XG5cbi8qIHBvcHVwIHBhbmUgKi9cblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmUge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdHdpZHRoOiBjYWxjKDEwMCUgLSAycHgpO1xuXHRoZWlnaHQ6IDExMHB4O1xuXHR0b3A6IDM5cHg7XG5cdGxlZnQ6IDFweDtcblx0b3ZlcmZsb3cteTogYXV0bztcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2Nsb3NlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDA7XG5cdHJpZ2h0OiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JjYmNiYztcblx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjYmNiY2JjO1xuXHRwYWRkaW5nOiA2cHggNXB4IDdweCA1cHg7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0Zm9udC1zaXplOiAyMHB4O1xuXHR6LWluZGV4OiAxO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fd3JhcHBlciB7XG5cdGhlaWdodDogYXV0bztcblx0b3ZlcmZsb3cteDogaGlkZGVuO1xuXHRvdmVyZmxvdy15OiBzY3JvbGw7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2hlYWRlciB7XG5cdHBhZGRpbmc6IDEwcHggMTBweCA1cHggMTBweDtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VmZWZlZjtcblx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNlZmVmZWY7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19zZWN0aW9uOmZpcnN0LWNoaWxkIC50b29sc19wb3B1cC1wYW5lX19oZWFkZXIge1xuXHRib3JkZXItdG9wOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19oZWFkZXItLWV4cGFuZGVkIHtcblx0cGFkZGluZy1ib3R0b206IDQwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19oZWFkbGluZSB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYWRkIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRib3gtc2hhZG93OiBub25lO1xuXHRib3JkZXI6IDAgbm9uZSB0cmFuc3BhcmVudDtcblx0cGFkZGluZzogMDtcblx0cmlnaHQ6IDVweDtcblx0dG9wOiA1cHg7XG5cdGZvbnQtc2l6ZTogMjBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2FkZC1pbnB1dCB7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0Ym9yZGVyOiAxcHggc29saWQgI2JjYmNiYztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogOXB4O1xuXHRmb250LWZhbWlseTogXCJTcGFjZSBNb25vXCIsbW9ub3NwYWNlO1xuXHRmb250LXNpemU6IDE0cHg7XG5cdG1pbi13aWR0aDogMTBweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2FkZC1sYWJlbC0tY29sbGFwc2VkIHtcblx0ZGlzcGxheTogbm9uZTtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2FkZC1sYWJlbC0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBibG9jaztcblx0cGFkZGluZy10b3A6IDVweDtcblx0cGFkZGluZy1sZWZ0OiAxMHB4O1xuXHRwYWRkaW5nLWJvdHRvbTogNXB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYXBwbHkge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiAxMHB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYTkzMjI2O1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fYXBwbHktLWNvbGxhcHNlZCB7XG5cdGRpc3BsYXk6IG5vbmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19hcHBseS0tZXhwYW5kZWQge1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19jYW5jZWwge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHJpZ2h0OiA2NXB4O1xuXHR0b3A6IDk0cHg7XG5cdGJvcmRlcjogMCBub25lIHRyYW5zcGFyZW50O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYWNhY2FjO1xuXHQtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG5cdGNvbG9yOiAjNDQ0O1xuXHRwYWRkaW5nOiAwIDEwcHggNHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fY2FuY2VsLS1jb2xsYXBzZWQge1xuXHRkaXNwbGF5OiBub25lO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fY2FuY2VsLS1leHBhbmRlZCB7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2xpc3Qge1xuXHRsaXN0LXN0eWxlOiBub25lO1xuXHRtYXJnaW4tdG9wOiAwO1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRwYWRkaW5nLWxlZnQ6IDIwcHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19saXN0LWVsZW1lbnQge1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19saXN0LWxhYmVsIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGNvbG9yOiAjODAwMDgwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbGlzdC1zZXBhcmF0b3Ige1xuXHRwYWRkaW5nLXJpZ2h0OiA1cHg7XG5cdGNvbG9yOiAjMDAwO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbGlzdC1pbnB1dCB7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0Ym9yZGVyOiAxcHggc29saWQgI2ZmZjtcblx0Zm9udC1mYW1pbHk6IFwiU3BhY2UgTW9ub1wiLG1vbm9zcGFjZTtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRjb2xvcjogIzAwZjtcblx0bWluLXdpZHRoOiAxMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbGlzdC1pbnB1dDpmb2N1cyB7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNiY2JjYmM7XG5cdGNvbG9yOiAjZmZmO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuXHRjb2xvcjogIzQ0NDtcblx0Ym94LXNoYWRvdzogaW5zZXQgMCAwIDJweCAxcHggI2ZmZjtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2xpc3QtYnRuIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRyaWdodDogMTBweDtcblx0Ym9yZGVyOiAwIG5vbmUgdHJhbnNwYXJlbnQ7XG5cdGJhY2tncm91bmQtY29sb3I6ICNhOTMyMjY7XG5cdC1tb3otYXBwZWFyYW5jZTogbm9uZTtcblx0dG9wOiAwO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogMCAxMHB4IDRweDtcbn1gKTtcblxucnVsZXMucHVzaChgLnRvb2xzX3BvcHVwLXBhbmVfX2xpc3QtYnRuLS1leHBhbmRlZCB7XG5cdHZpc2liaWxpdHk6IHZpc2libGU7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19saXN0LWJ0bi0tY29sbGFwc2VkIHtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9faGlnaGxpZ2h0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDEwcHg7XG5cdHJpZ2h0OiAycHg7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX19kaW1lbnNpb25zLXJvdyB7XG5cdHBhZGRpbmc6IDVweCAyMHB4O1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fa2V5IHtcblx0Y29sb3I6ICM4MDAwODA7XG59YCk7XG5cbnJ1bGVzLnB1c2goYC50b29sc19wb3B1cC1wYW5lX192YWx1ZSB7XG5cdGNvbG9yOiAjMDBmO1xufWApO1xuXG5ydWxlcy5wdXNoKGAudG9vbHNfcG9wdXAtcGFuZV9fbm9kZS1uYW1lIHtcblx0Y29sb3I6ICM4MDAwODA7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0cmlnaHQ6IDEwcHg7XG5cdHRvcDogMTBweDtcbn1gKTtcblxuZXhwb3J0IHtydWxlc307XG4iXX0=
