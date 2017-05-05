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

/* main.js 0.1.1 30.03.2017 @ filip swinarski */

var body = document.body;
var container = document.createElement('div');

container.id = 'dev_tools';
container.classList.add('tools');
body.appendChild(container);
(0, _load_styles.loadStyles)();
(0, _render_inspector.renderInspector)(body, container);
(0, _render_console.renderConsole)(container);
(0, _render_browser_info.renderBrowserInfo)(container);

window.DTConsole = DTConsole;

},{"./modules/console_listen.js":6,"./modules/dt_console_api.js":9,"./modules/load_styles.js":11,"./modules/render_browser_info.js":13,"./modules/render_console.js":14,"./modules/render_inspector.js":19}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* add_button_action.js, v. 0.1.1, 05.05.2017, @ filip-swinarski */

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

	if (btn.id === 'add_attr_btn') {
		attrNameElem = document.createElement('span');
		attrValueElem = document.createElement('span');
		element.setAttribute(name, value);
		arr = [].filter.call(element.attributes, function (attr) {
			return attr.name !== 'style';
		});
		[].forEach.call(arr, function (attr) {
			(0, _render_attribute_input.renderAttrInput)(element, list, row, attr.name, attr.value);
		});
		attrNameElem.classList.add('inspector__attr-name');
		attrValueElem.classList.add('inspector__attr-value');
		attrNameElem.innerText = name;
		attrValueElem.innerText = '"' + value + '"';
		separator.innerText = '=';
		row.insertBefore(attrNameElem, row.lastChild);
		row.insertBefore(separator, row.lastChild);
		row.insertBefore(attrValueElem, row.lastChild);
	}

	if (btn.id === 'add_style_btn') {

		var styleElem = [].filter.call(document.querySelectorAll('.inspector__attr-name'), function (el) {
			return el.innerText === 'style';
		})[0];

		attrNameElem = document.createElement('span');
		attrValueElem = styleElem.nextSibling.nextSibling;
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

	nameLabel.classList.add('popup__add-label--collapsed');
	nameLabel.classList.remove('popup__add-label--expanded');
	header.classList.remove('popup__header--expanded');
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	btn.classList.add('popup__apply--collapsed');
	btn.classList.remove('popup__apply--expanded');
}; /* apply_button_action.js, v. 0.1.1, 05.05.2017, @ filip-swinarski */

exports.applyButtonAction = applyButtonAction;

},{"./render_attribute_input.js":12}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* cancel_button_action.js, v. 0.1.0, 05.05.2017, @ filip-swinarski */

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
}; /* console_clear.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

exports.consoleClear = consoleClear;

},{"./render_console.js":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleListen = undefined;

var _render_console = require('./render_console.js');

var _render_console_message = require('./render_console_message.js');

var _global_eval = require('./global_eval.js');

/* console_listen.js, v. 0.1.5, 06.04.2017, @ filip-swinarski */

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

},{"./global_eval.js":10,"./render_console.js":14,"./render_console_message.js":15}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleLog = undefined;

var _render_console = require('./render_console.js');

var consoleLog = function consoleLog(str, value) {

    var log = new CustomEvent('log', { detail: [str, value] });

    _render_console.consoleDisplay.dispatchEvent(log);
}; /* console_log.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

exports.consoleLog = consoleLog;

},{"./render_console.js":14}],8:[function(require,module,exports){
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
}; /* dom_element_listen.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

exports.domElementListen = domElementListen;

},{"./render_popup.js":20}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.log = undefined;

var _console_log = require('./console_log.js');

var _console_clear = require('./console_clear.js');

/* dt_console_api.js, v. 0.1.3, 21.04.2017, @ filip-swinarski */

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
/* load _styles.js v. 0.1.2, 04.04.2017, @ filip-swinarski */

var loadStyles = function loadStyles() {

    var styles = document.createElement('link');
    var googleFont = document.createElement('link');

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

exports.loadStyles = loadStyles;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_attribute_input.js, v. 0.1.1, 05.05.2017, @ filip-swinarski */

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

	applyBtn.addEventListener('click', function (e) {

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

},{}],13:[function(require,module,exports){
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
}; /* render_browser_info.js, v. 0.1.1, 15.04.2017, @ filip-swinarski */

exports.renderBrowserInfo = renderBrowserInfo;

},{"./render_header.js":18}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleInput = exports.consoleDisplay = exports.renderConsole = undefined;

var _console_listen = require('./console_listen');

var _render_header = require('./render_header.js');

/* render_console.js, v. 0.1.3, 15.04.2017, @ filip-swinarski */

var consoleDisplay = document.createElement('div');
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
    consoleContainer.appendChild(consoleInputPrompt);
    consoleContainer.appendChild(consoleDisplay);
    consoleContainer.appendChild(consoleInput);
    panel.appendChild(consoleContainer);
    (0, _console_listen.consoleListen)();
};

exports.renderConsole = renderConsole;
exports.consoleDisplay = consoleDisplay;
exports.consoleInput = consoleInput;

},{"./console_listen":6,"./render_header.js":18}],15:[function(require,module,exports){
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
}; /* render_console_message.js, v. 0.1.1, 06.04.2017, @ filip-swinarski */

exports.renderConsoleMessage = renderConsoleMessage;

},{"./render_console_output.js":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// render_console_output.js, v. 0.1.3, 21.04.2017 @ filip-swinarski

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

},{}],17:[function(require,module,exports){
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
}; /* render_dom.js, v. 0.1.9, 21.04.2017, @ filip-swinarski */

exports.renderDOM = renderDOM;

},{"./dom_element_listen.js":8}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* render_header.js, v. 0.1.1, 21.04.2017, @ filip-swinarski */

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
      return el.id !== parent.id + '_header';
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

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderInspector = undefined;

var _render_dom = require('./render_dom.js');

var _render_header = require('./render_header.js');

/* render_inspector.js, v. 0.1.6, 21.04.2017, @ filip-swinarski */

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

},{"./render_dom.js":17,"./render_header.js":18}],20:[function(require,module,exports){
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

   popup.classList.add('popup');
   popupWrapper.classList.add('popup__wrapper');
   closeBtn.classList.add('popup__close');
   closeBtn.innerHTML = 'x';

   closeBtn.addEventListener('click', function () {
      popup.remove();
   }, false);

   (0, _render_popup_section.renderPopupSection)('attr_list', 'Attributes', element, row, attributeListWrapper);
   (0, _render_popup_section.renderPopupSection)('style_list', 'Inline styles', element, row, styleListWrapper);

   popup.appendChild(closeBtn);
   popupWrapper.appendChild(attributeListWrapper);
   popupWrapper.appendChild(styleListWrapper);
   popup.appendChild(popupWrapper);
   container.appendChild(popup);
}; /* render_popup.js, v. 0.1.3, 05.05.2017, @ filip-swinarski */

exports.renderPopup = renderPopup;

},{"./render_popup_section.js":21}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderPopupSection = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var _add_button_action = require('./add_button_action.js');

var _apply_button_action = require('./apply_button_action.js');

var _cancel_button_action = require('./cancel_button_action.js');

/* render_popup_section.js, v. 0.1.1, 05.05.2017, @ filip-swinarski */

var renderPopupSection = function renderPopupSection(id, title, element, row, listWrapper) {

	var list = document.createElement('ul');
	var header = document.createElement('div');
	var addBtn = document.createElement('button');
	var addApplyBtn = document.createElement('button');
	var addCancelBtn = document.createElement('button');
	var nameInput = document.createElement('input');
	var valueInput = document.createElement('input');
	var nameInputLabel = document.createElement('label');
	var valueInputLabel = document.createElement('label');
	var arr = void 0;
	var sectionName = '';

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
	listWrapper.classList.add('popup__section');
	listWrapper.classList.add('popup__section--' + sectionName);
	header.innerHTML = '<span class="popup__headline">' + title + '</span>';
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
	header.classList.add('popup__header');
	list.classList.add('popup__list');
	listWrapper.appendChild(header);
	listWrapper.appendChild(list);

	if (id === 'style_list' && element.attributes && element.attributes.style) {
		arr = ''.split.call(element.attributes.style.value, '; ');
		arr = arr.map(function (rule) {
			return rule.replace(';', '');
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
};

exports.renderPopupSection = renderPopupSection;

},{"./add_button_action.js":2,"./apply_button_action.js":3,"./cancel_button_action.js":4,"./render_attribute_input.js":12}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcbG9hZF9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2Jyb3dzZXJfaW5mby5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlX291dHB1dC5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9kb20uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaGVhZGVyLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2luc3BlY3Rvci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9wb3B1cC5qcyIsImpzXFxlczZcXG1vZHVsZXNc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USxrQixHQUFBLGtCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIG1haW4uanMgMC4xLjEgMzAuMDMuMjAxNyBAIGZpbGlwIHN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2xvYWRTdHlsZXN9IGZyb20gJy4vbW9kdWxlcy9sb2FkX3N0eWxlcy5qcyc7XG5pbXBvcnQge3JlbmRlckluc3BlY3Rvcn0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9pbnNwZWN0b3IuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJCcm93c2VySW5mb30gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9icm93c2VyX2luZm8uanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgRFRDb25zb2xlIGZyb20gJy4vbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyc7XG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnRhaW5lci5pZCA9ICdkZXZfdG9vbHMnO1xuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzJyk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5sb2FkU3R5bGVzKCk7XG5yZW5kZXJJbnNwZWN0b3IoYm9keSwgY29udGFpbmVyKTtcbnJlbmRlckNvbnNvbGUoY29udGFpbmVyKTtcbnJlbmRlckJyb3dzZXJJbmZvKGNvbnRhaW5lcik7XG5cbndpbmRvdy5EVENvbnNvbGUgPSBEVENvbnNvbGU7XG4iLCIvKiBhZGRfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjEsIDA1LjA1LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBhZGRCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgbmFtZUxhYmVsLCB2YWx1ZUxhYmVsLCBoZWFkZXIpID0+IHtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19jYW5jZWwtLWNvbGxhcHNlZCcpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jYW5jZWwtLWV4cGFuZGVkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9faGVhZGVyLS1leHBhbmRlZCcpO1xufTtcblxuZXhwb3J0IHthZGRCdXR0b25BY3Rpb259O1xuXG4iLCIvKiBhcHBseV9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMSwgMDUuMDUuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5cbmxldCBhcHBseUJ1dHRvbkFjdGlvbiA9IChlbGVtZW50LCBidG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcikgPT4ge1xuXG5cdGxldCBzZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdGxldCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRsZXQgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGxldCB2YWx1ZSA9IHZhbHVlSW5wdXQudmFsdWU7XG5cdGxldCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuXHRsZXQgYXR0clZhbHVlRWxlbTtcblx0bGV0IGF0dHJOYW1lRWxlbTtcblxuXHRsaXN0LmlubmVySFRNTCA9ICcnO1xuXG5cdGlmIChidG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKSB7XG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChhdHRyKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdGF0dHJOYW1lRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdGF0dHJWYWx1ZUVsZW0uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cdFx0YXR0ck5hbWVFbGVtLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJz0nO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0ck5hbWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKHNlcGFyYXRvciwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyVmFsdWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0fVxuXG5cdGlmIChidG4uaWQgPT09ICdhZGRfc3R5bGVfYnRuJykge1xuXG5cdFx0bGV0IHN0eWxlRWxlbSA9IFtdLmZpbHRlci5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJylbMF07XG5cblx0XHRhdHRyTmFtZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IFxuXHRcdGF0dHJWYWx1ZUVsZW0gPSBzdHlsZUVsZW0ubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG5cdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuXHRcdGFyci5wdXNoKGAke25hbWV9OiAke3ZhbHVlfTtgKTtcblx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCA9ICdcIic7XG5cdFx0W10uZm9yRWFjaC5jYWxsKGFyciwgKHJ1bGUsIGkpID0+IHtcblx0XHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIHJ1bGUuc3BsaXQoJzogJylbMF0sIHJ1bGUuc3BsaXQoJzogJylbMV0ucmVwbGFjZSgnOycsICcnKSk7XG5cblx0XHRcdGlmKGkgIT09IDApXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICcgJztcblxuXHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gYCR7cnVsZS5zcGxpdCgnOiAnKVswXX06ICR7cnVsZS5zcGxpdCgnOiAnKVsxXX1gO1xuXG5cdFx0XHRpZiAoaSA8IGFyci5sZW5ndGggLSAxKVxuXHRcdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnOyc7XG5cdFx0XHRcdFxuXHRcdH0pO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICdcIic7XG5cdH1cblxuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRidG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblxufTtcblxuZXhwb3J0IHthcHBseUJ1dHRvbkFjdGlvbn07XG4iLCIvKiBjYW5jZWxfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjAsIDA1LjA1LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBjYW5jZWxCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgdmFsdWVMYWJlbCwgbmFtZUxhYmVsLCBoZWFkZXIpID0+IHtcblxuXHRsZXQgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0bGV0IG5hbWVJbnB1dCA9IG5hbWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG5cdGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9faGVhZGVyLS1leHBhbmRlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG5cdG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuXHR2YWx1ZUlucHV0LnZhbHVlID0gJyc7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jYW5jZWwtLWNvbGxhcHNlZCcpO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2NhbmNlbC0tZXhwYW5kZWQnKTtcblxufTtcblxuZXhwb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259O1xuIiwiLyogY29uc29sZV9jbGVhci5qcywgdi4gMC4xLjAsIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5sZXQgY29uc29sZUNsZWFyID0gKCkgPT4ge1xuICAgIGNvbnNvbGVEaXNwbGF5LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQge2NvbnNvbGVDbGVhcn07XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjUsIDA2LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmxldCBjb25zb2xlTGlzdGVuID0gKCkgPT4ge1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycm9yKSA9PiB7XG5cbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvclNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JDb2x1bW5ObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yUHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19yb3cnKTtcbiAgICAgICAgZXJyb3JQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXByb21wdCcpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yLS1lcnInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1tc2cnKTtcbiAgICAgICAgZXJyb3JTb3VyY2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXNyYycpO1xuICAgICAgICBlcnJvckxpbmVOby5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbGluZW5vJyk7XG4gICAgICAgIGVycm9yQ29sdW1uTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWNvbHVtbm5vJyk7XG5cbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmlubmVySFRNTCArPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBlcnJvclNvdXJjZS5pbm5lckhUTUwgKz0gZXJyb3IuZmlsZW5hbWU7XG4gICAgICAgIGVycm9yTGluZU5vLmlubmVySFRNTCArPSBlcnJvci5saW5lbm87XG4gICAgICAgIGVycm9yQ29sdW1uTm8uaW5uZXJIVE1MICs9IGVycm9yLmNvbHVtbm5vO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvclByb21wdCk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2VNc2cpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JTb3VyY2UpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JMaW5lTm8pO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JDb2x1bW5Obyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlRGlzcGxheS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIFxuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2xvZycsIChlKSA9PiB7XG5cbiAgICAgICAgbGV0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGxldCBsb2cgPSBuZXcgQ3VzdG9tRXZlbnQoJ2xvZycsIHtkZXRhaWw6IFtzdHIsIHZhbHVlXX0pO1xuXG4gICAgY29uc29sZURpc3BsYXkuZGlzcGF0Y2hFdmVudChsb2cpO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxvZ307XG4iLCIvKiBkb21fZWxlbWVudF9saXN0ZW4uanMsIHYuIDAuMS4wLCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclBvcHVwfSBmcm9tICcuL3JlbmRlcl9wb3B1cC5qcyc7XG5cbmxldCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRsZXQgc3RhcnREYXRlO1xuXHRsZXQgdE9iajtcblx0bGV0IHN0YXJ0WDtcblx0bGV0IHN0YXJ0WTtcblx0bGV0IGVuZFg7XG5cdGxldCBlbmRZO1xuXHRsZXQgZGlzdFg7XG5cdGxldCBkaXN0WTtcblx0bGV0IG1heFggPSAwO1xuXHRsZXQgbWF4WSA9IDA7XG5cblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuXHRcdHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dE9iaiA9IGUudG91Y2hlc1swXTtcblx0XHRzdGFydFggPSB0T2JqLnBhZ2VYO1xuXHRcdHN0YXJ0WSA9IHRPYmoucGFnZVk7XG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG5cdFx0dE9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0ZW5kWCA9IHRPYmoucGFnZVg7XG5cdFx0ZW5kWSA9IHRPYmoucGFnZVk7XG5cdFx0ZGlzdFggPSBlbmRYIC0gc3RhcnRYO1xuXHRcdGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcblx0ICAgXG5cdFx0aWYgKE1hdGguYWJzKGRpc3RYKSA+IG1heFgpXG5cdFx0XHRtYXhYID0gTWF0aC5hYnMoZGlzdFgpO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFkpID4gbWF4WSlcblx0XHRcdG1heFkgPSBNYXRoLmFicyhkaXN0WSk7XG5cdCAgIFxuXHR9LCBmYWxzZSk7XG5cdHJvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG5cdCAgIFxuXHRcdGxldCBlbmREYXRlID0gbmV3IERhdGUoKTtcblx0XHRsZXQgZGF0ZUFtcCA9IGVuZERhdGUgLSBzdGFydERhdGU7XG5cdCAgIFxuXHRcdHRPYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXHRcdGVuZFggPSB0T2JqLnBhZ2VYO1xuXHRcdGVuZFkgPSB0T2JqLnBhZ2VZO1xuXHRcdGRpc3RYID0gZW5kWCAtIHN0YXJ0WDtcblx0XHRkaXN0WSA9IGVuZFkgLSBzdGFydFk7XG5cdCAgIFxuXHRcdGlmIChtYXhZIDw9IDMwICYmIG1heFggPD0gMzApIHtcblx0XHQgICBcblx0XHRcdGlmIChkYXRlQW1wIDw9IDIwMCkge1xuXHRcdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKVxuXG5cdFx0XHRcdGlmIChhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJykgfHxcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZW5kZXJQb3B1cChlbGVtLCByb3cpO1xuXHRcdFx0fVxuXHRcdCAgIFxuXHRcdH1cblx0ICAgXG5cdFx0bWF4WCA9IDA7XG5cdFx0bWF4WSA9IDA7XG5cblx0fSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtkb21FbGVtZW50TGlzdGVufTtcbiIsIi8qIGR0X2NvbnNvbGVfYXBpLmpzLCB2LiAwLjEuMywgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTG9nfSBmcm9tICcuL2NvbnNvbGVfbG9nLmpzJztcbmltcG9ydCB7Y29uc29sZUNsZWFyfSBmcm9tICcuL2NvbnNvbGVfY2xlYXIuanMnO1xuXG5sZXQgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmxldCBjbGVhciA9IGNvbnNvbGVDbGVhcjtcblxuZXhwb3J0IHtsb2d9O1xuZXhwb3J0IHtjbGVhcn07XG4iLCIvKiBnbG9iYWxfZXZhbC5qcywgdi4gMC4xLjAsIDMxLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbi8vIGV2YWwgLSBydW5zIGJsb2NrIHNjb3BlIGRlY2xhcmF0aW9ucyB2aWEgc2NyaXB0IGluamVjdGlvblxuLy8gb3RoZXJ3aXNlIHN0YW5kYXJkIGV2YWwgdXNlZCBcbi8vIC0gdGhpbmsgaWYgbm90IHVzZSBpbmplY3Rpb24gZXhjbHVzaXZlbHlcbi8vIHJldHVybnMgdmFsdWVcbmNvbnN0IGdsb2JhbEV2YWwgPSAoc3RyKSA9PiB7XG5cbiAgICAndXNlIHN0cmljdCc7IC8vIHByZXZlbnQgY3JlYXRpbmcgbG9jYWwgdmFyaWFibGVzIHdpdGggc3RhbmRhcmQgZXZhbFxuICAgIFxuICAgIGlmIChzdHIuc3RhcnRzV2l0aCgnbGV0ICcpIHx8IHN0ci5zdGFydHNXaXRoKCdjb25zdCAnKSkgeyAvLyBjb2RlIGZvciBzY3JpcHQgaW5zZXJ0aW9uXG5cbiAgICAgICAgbGV0IHNjcmlwdDtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKS5yZW1vdmUoKVxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5pZCA9ICdkdF9zY3JpcHQnO1xuICAgICAgICBzY3JpcHQuaW5uZXJUZXh0ID0gc3RyO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vIHJldHVybnMgdW5kZWZpbmVkIHdoZW4gZGVjbGFyaW5nIGJsb2NrIHNjb3BlZCB2YXJpYWJsZVxuICAgIH0gZWxzZSB7IC8vc3RhbmRhcmQgZXZhbFxuICAgICAgICByZXR1cm4gKDEsIGV2YWwpKHN0cik7IC8vIGluZGlyZWN0IGNhbGwgdG8gYWNjZXNzIGdsb2JhbCBzY29wZVxuICAgIH1cbn1cblxuZXhwb3J0IHtnbG9iYWxFdmFsfTtcbiIsIi8qIGxvYWQgX3N0eWxlcy5qcyB2LiAwLjEuMiwgMDQuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IGxvYWRTdHlsZXMgPSAoKSA9PiB7XG5cbiAgICBsZXQgc3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxldCBnb29nbGVGb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgc3R5bGVzLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBzdHlsZXMudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVzLm1lZGlhID0gJ3NjcmVlbic7XG4gICAgc3R5bGVzLmhyZWYgPSAnLi9jc3MvbWFpbi5jc3MnO1xuICAgIHN0eWxlcy5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgc3R5bGVzLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlcy5tZWRpYSA9ICdzY3JlZW4nO1xuICAgIHN0eWxlcy5ocmVmID0gJ2h0dHBzOi8vZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1TcGFjZStNb25vOjQwMCw3MDAmYW1wO3N1YnNldD1sYXRpbi1leHQnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZ29vZ2xlRm9udCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZXMpO1xufTtcblxuZXhwb3J0IHtsb2FkU3R5bGVzfTtcbiIsIi8qIHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMsIHYuIDAuMS4xLCAwNS4wNS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5sZXQgcmVuZGVyQXR0cklucHV0ID0gKGVsLCBkaXNwbGF5LCByb3csIG5hbWUsIHZhbHVlKSA9PiB7XG4gICBcblx0bGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0bGV0IHNlcGFyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0bGV0IGFwcGx5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdGxldCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBcblx0aW5wdXQudHlwZSA9ICd0ZXh0Jztcblx0aW5wdXQudmFsdWUgPSB2YWx1ZTtcblxuXHRpZiAoZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpXG5cdFx0aW5wdXQudmFsdWUgKz0gJzsnO1xuXG5cdGxhYmVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdGFwcGx5QnRuLmlubmVyVGV4dCA9ICdBcHBseSc7XG5cdHNlcGFyYXRvci5pbm5lclRleHQgPSAnOic7XG5cdGxpc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWVsZW1lbnQnKTtcblx0bGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtbGFiZWwnKTtcblx0aW5wdXQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtaW5wdXQnKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuJyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdHNlcGFyYXRvci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1zZXBhcmF0b3InKTtcbiAgIFxuXHRsYWJlbC5hcHBlbmRDaGlsZChzZXBhcmF0b3IpO1xuXHRsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG5cdGxhYmVsLmFwcGVuZENoaWxkKGFwcGx5QnRuKTtcblx0bGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXHRkaXNwbGF5LmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KTtcbiAgIFxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICBcblx0XHRpZiAoZS5rZXlDb2RlID09PSAxMykge1xuXG5cdFx0XHRsZXQgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRcdGxldCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRcdGlmIChkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKVxuXHRcdFx0XHRlbC5hdHRyaWJ1dGVzW25hbWVdLnZhbHVlID0gaW5wdXQudmFsdWU7XG5cblx0XHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdFx0ZWwuc3R5bGVbbmFtZV0gPSBpbnB1dC52YWx1ZS5yZXBsYWNlKCc7JywgJycpO1xuXG5cdFx0XHRbXS5mb3JFYWNoLmNhbGwocm93QXR0ck5hbWVFbGVtcywgKGF0dHJOYW1lRWwsIGkpID0+IHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gbmFtZSAmJiBkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKSB7XG5cdFx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHtpbnB1dC52YWx1ZX1cImA7XG5cdFx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSAnc3R5bGUnICYmIGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRcdFx0XHRsZXQgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRcdGxldCB2YWx1ZSA9ICcnO1xuXG5cdFx0XHRcdFx0W10uZm9yRWFjaC5jYWxsKGxhYmVscywgKGxhYmVsLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSAnOiAnO1xuXHRcdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZTtcblxuXHRcdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdFx0dmFsdWUgKz0gJyAnO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuXHRcdH1cblxuXHR9LCBmYWxzZSk7XG5cblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQnKTtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuXHR9KTtcblxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGUpID0+IHtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0fSk7XG5cblx0YXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgXG5cdFx0bGV0IHJvd0F0dHJOYW1lRWxlbXMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG5cdFx0bGV0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKVxuXHRcdFx0ZWwuYXR0cmlidXRlc1tuYW1lXS52YWx1ZSA9IGlucHV0LnZhbHVlO1xuXG5cdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0ZWwuc3R5bGVbbmFtZV0gPSBpbnB1dC52YWx1ZS5yZXBsYWNlKCc7JywgJycpO1xuXG5cdFx0W10uZm9yRWFjaC5jYWxsKHJvd0F0dHJOYW1lRWxlbXMsIChhdHRyTmFtZUVsLCBpKSA9PiB7XG5cdFx0XHRcblx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gbmFtZSAmJiBkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKSB7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7aW5wdXQudmFsdWV9XCJgO1xuXHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJyAmJiBkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jykge1xuXG5cdFx0XHRcdGxldCBsYWJlbHMgPSBkaXNwbGF5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsJyk7XG5cdFx0XHRcdGxldCB2YWx1ZSA9ICcnO1xuXG5cdFx0XHRcdFtdLmZvckVhY2guY2FsbChsYWJlbHMsIChsYWJlbCwgaSkgPT4ge1xuXHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLmZpcnN0Q2hpbGQuZGF0YTtcblx0XHRcdFx0XHR2YWx1ZSArPSAnOiAnO1xuXHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAoaSA8IGxhYmVscy5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdFx0dmFsdWUgKz0gJyAnO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQnKTtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuXG5cdH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQXR0cklucHV0fTtcbiIsIi8qIHJlbmRlcl9icm93c2VyX2luZm8uanMsIHYuIDAuMS4xLCAxNS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxubGV0IHJlbmRlckJyb3dzZXJJbmZvID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBicm93c2VySW5mb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBicm93c2VySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuaWQgPSAnYnJvd3Nlcic7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoYnJvd3NlckluZm9Db250YWluZXIsIGZhbHNlKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCBuYW1lOiAnICsgbmF2aWdhdG9yLmFwcENvZGVOYW1lICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgdmVyc2lvbjogJyArIG5hdmlnYXRvci5hcHBWZXJzaW9uICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5QbGF0Zm9ybTogJyArIG5hdmlnYXRvci5wbGF0Zm9ybSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+VXNlciBhZ2VudDogJyArIG5hdmlnYXRvci51c2VyQWdlbnQgKyAnPC9kaXY+JztcblxuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjMsIDE1LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxuY29uc3QgY29uc29sZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5jb25zdCBjb25zb2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXRQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29uc29sZScpO1xuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXknKTtcbmNvbnNvbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuY29uc29sZURpc3BsYXkuaWQgPSAnY29uc29sZV9kaXNwbGF5JztcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dCcpO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVJbnB1dC5pZCA9ICdjb25zb2xlX2lucHV0JztcbmNvbnNvbGVJbnB1dC50eXBlID0gJ3RleHQnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdCcpO1xuY29uc29sZUNvbnRhaW5lci5pZCA9ICdjb25zb2xlJztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQtLWNvbGxhcHNlZCcpO1xuXG5sZXQgcmVuZGVyQ29uc29sZSA9IChwYW5lbCkgPT4ge1xuXG4gICAgcmVuZGVySGVhZGVyKGNvbnNvbGVDb250YWluZXIsIGZhbHNlKTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dFByb21wdCk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlRGlzcGxheSk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlSW5wdXQpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGNvbnNvbGVDb250YWluZXIpO1xuICAgIGNvbnNvbGVMaXN0ZW4oKTtcblxufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGV9O1xuZXhwb3J0IHtjb25zb2xlRGlzcGxheX07XG5leHBvcnQge2NvbnNvbGVJbnB1dH07XG4iLCIvKiByZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzLCB2LiAwLjEuMSwgMDYuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJDb25zb2xlT3V0cHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX291dHB1dC5qcyc7XG5cbmxldCByZW5kZXJDb25zb2xlTWVzc2FnZSA9IChtc2dBcnJheSkgPT4ge1xuXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaWYgKG1zZ0FycmF5WzBdKSB7XG5cbiAgICAgICAgbGV0IGlucHV0TWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGlucHV0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctaScpO1xuICAgICAgICBpbnB1dE1lc3NhZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLWlwcm9tcHRcIj48L3NwYW4+JHttc2dBcnJheVswXX0gYDtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0TWVzc2FnZSk7XG4gICAgfVxuICAgIFxuICAgIGxldCByZXR1cm5NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICByZXR1cm5NZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgcmV0dXJuTWVzc2FnZS5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fbXNnLXJwcm9tcHRcIj48L3NwYW4+YDtcbiAgICByZW5kZXJDb25zb2xlT3V0cHV0KG1zZ0FycmF5WzFdLCByZXR1cm5NZXNzYWdlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmV0dXJuTWVzc2FnZSk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX07XG4iLCIvLyByZW5kZXJfY29uc29sZV9vdXRwdXQuanMsIHYuIDAuMS4zLCAyMS4wNC4yMDE3IEAgZmlsaXAtc3dpbmFyc2tpXG5cbmxldCByZW5kZXJDb25zb2xlT3V0cHV0ID0gKHZhbCwgZWxlbWVudCA9IGRvY3VtZW50LmJvZHksIGluZGV4KSA9PiB7XG5cbiAgICBsZXQgb3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCBjaGVja1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNwbGl0KCcgJylbMV07XG4gICAgbGV0IGh0bWwgPSAnJztcblxuICAgIGNoZWNrU3RyID0gY2hlY2tTdHIuc3Vic3RyaW5nKDAsIGNoZWNrU3RyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyfWApO1xuXHRcbiAgICBpZiAoY2hlY2tTdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudWxsJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdib29sZWFuJykge1xuICAgICAgICBodG1sICs9IGNoZWNrU3RyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsfVwiYCA6IHZhbDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09J2Z1bmN0aW9uJykge1xuICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgfSBlbHNlIGlmIChjaGVja1N0ciA9PT0gJ2FycmF5JyB8fCBjaGVja1N0ciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiB2YWwpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQga2V5Q2xhc3MgPSBjaGVja1N0ciA9PT0gJ2FycmF5JyA/ICdpbmRleCcgOiAna2V5JztcbiAgICAgICAgICAgIGxldCBjaGVja1N0cjIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsW2l0ZW1dKS5zcGxpdCgnICcpWzFdO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNoZWNrU3RyMiA9IGNoZWNrU3RyMi5zdWJzdHJpbmcoMCwgY2hlY2tTdHIyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cbiAgICAgICAgICAgIGlmIChjaGVja1N0cjIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudWxsJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdib29sZWFuJykge1xuXG4gICAgICAgICAgICAgICAgbGV0IGtleUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtrZXlDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHIyfWApO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBjaGVja1N0cjIgPT09ICdzdHJpbmcnID8gYFwiJHt2YWxbaXRlbV19XCJgIDogdmFsW2l0ZW1dO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQodmFsdWVFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGxldCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2tleUNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ29uc29sZU91dHB1dCh2YWxbaXRlbV0sIG91dHB1dCwgaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgPSB2YWw7XG4gICAgfVxuXHRcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG91dHB1dCk7XG59O1xuXG5leHBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjksIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7ZG9tRWxlbWVudExpc3Rlbn0gZnJvbSAnLi9kb21fZWxlbWVudF9saXN0ZW4uanMnO1xuXG5sZXQgcmVuZGVyRE9NID0gKGVsZW0sIHBhcmVudEVsLCBsZXZlbCkgPT4ge1xuXG4gICAgaWYgKGVsZW0uaWQgPT09ICdkZXZfdG9vbHMnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCByb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHJvdzIgPSBlbGVtLmNoaWxkcmVuLmxlbmd0aCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cxRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cxT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cxQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MkVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93Mk9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MkNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgXG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLW9wZW5pbmcnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY2xvc2luZycpO1xuICAgIFxuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctbmFtZScpO1xuICAgIHJvdzJFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctbmFtZScpOyBcbiAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cxQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzJPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzJDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93MU9wZW5BcnJvdy5pbm5lclRleHQgPSAgJzwnO1xuICAgIHJvdzFDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFPcGVuQXJyb3cpO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MUVsZW1lbnRUeXBlU3Bhbik7XG4gICAgXG4gICAgaWYgKGVsZW0uYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhdHRyTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBsZXQgYXR0ckVxdWFsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGxldCBhdHRyVmFsdWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHRyTmFtZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcbiAgICAgICAgICAgIGF0dHJWYWx1ZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG4gICAgICAgICAgICBhdHRyTmFtZVNwYW4uaW5uZXJUZXh0ID0gYXR0ci5sb2NhbE5hbWU7XG4gICAgICAgICAgICBhdHRyRXF1YWxTcGFuLmlubmVyVGV4dCA9ICc9JztcbiAgICAgICAgICAgIGF0dHJWYWx1ZVNwYW4uaW5uZXJUZXh0ID0gJ1wiJyArIGF0dHIudmFsdWUgKyAnXCInO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyTmFtZVNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyRXF1YWxTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0clZhbHVlU3Bhbik7XG4gICAgICAgIH0pO1xuICAgIH1cdFxuICAgIFxuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MUNsb3NlQXJyb3cpO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93MSk7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgIFxuICAgIGlmIChlbGVtLnRleHQgJiYgZWxlbS50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgXG4gICAgICAgIGxldCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIHRleHRFbC5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgICAgICB0ZXh0RWwuaW5uZXJUZXh0ID0gZWxlbS50ZXh0LnRyaW0oKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0RWwpXG5cbiAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJET00oZWwsIHdyYXBwZXIsIGxldmVsKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJvdzJPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8Lyc7XG4gICAgcm93MkNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93Mk9wZW5BcnJvdyk7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyRWxlbWVudFR5cGVTcGFuKTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJDbG9zZUFycm93KTtcbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggfHwgZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93Mik7XG4gICAgZWxzZVxuICAgICAgICByb3cxLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIFxuXHRkb21FbGVtZW50TGlzdGVuKGVsZW0sIHJvdzEsIHJvdzFPcGVuQXJyb3cpO1xuICAgIHBhcmVudEVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xufVxuZXhwb3J0IHtyZW5kZXJET019O1xuIiwiLyogcmVuZGVyX2hlYWRlci5qcywgdi4gMC4xLjEsIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbnZhciByZW5kZXJIZWFkZXIgPSAoY29udGFpbmVyLCBleHBhbmRlZCkgPT4ge1xuICAgXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCB0b2dnbGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHRpdGxlID0gY29udGFpbmVyLmlkO1xuICAgXG4gICAgaGVhZGVyLmlkID0gYCR7Y29udGFpbmVyLmlkfV9oZWFkZXJgO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X19oZWFkZXJgKTtcbiAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlYCk7XG4gICAgaGVhZGVyLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7dGl0bGV9X190aXRsZVwiPiR7dGl0bGV9PC9zcGFuPmA7XG4gICBcbiAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tZXhwYW5kZWRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1jb2xsYXBzZWRgKTtcbiAgICB9XG4gICBcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodG9nZ2xlQnRuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgIFxuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IFtdLmZpbHRlci5jYWxsKGNvbnRhaW5lci5jaGlsZHJlbiwgZWwgPT4gZWwuaWQgIT09IGAke3BhcmVudC5pZH1faGVhZGVyYCk7XG4gICAgICAgXG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWV4cGFuZGVkYCk7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWNvbGxhcHNlZGApO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tZXhwYW5kZWRgKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYCR7ZWwuY2xhc3NMaXN0WzBdfS0tY29sbGFwc2VkYCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVySGVhZGVyfTtcbiIsIi8qIHJlbmRlcl9pbnNwZWN0b3IuanMsIHYuIDAuMS42LCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckRPTX0gZnJvbSAnLi9yZW5kZXJfZG9tLmpzJztcbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5sZXQgcmVuZGVySW5zcGVjdG9yID0gKGJvZHksIHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBpbnNwZWN0b3JEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgaW5zcGVjdG9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnN0IGh0bWxFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBpbnNwZWN0b3JDb250YWluZXIuaWQgPSAnaW5zcGVjdG9yJztcbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5Jyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5pZCA9ICdpbnNwZWN0b3JfZGlzcGxheSc7XG4gICAgcmVuZGVySGVhZGVyKGluc3BlY3RvckNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2Rpc3BsYXktLWV4cGFuZGVkJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGluc3BlY3RvckRpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGluc3BlY3RvckNvbnRhaW5lcik7XG4gICAgcmVuZGVyRE9NKGh0bWxFbGVtLCBpbnNwZWN0b3JEaXNwbGF5LCBsZXZlbCk7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVySW5zcGVjdG9yfTtcbiIsIi8qIHJlbmRlcl9wb3B1cC5qcywgdi4gMC4xLjMsIDA1LjA1LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyUG9wdXBTZWN0aW9ufSBmcm9tICcuL3JlbmRlcl9wb3B1cF9zZWN0aW9uLmpzJztcblxubGV0IHJlbmRlclBvcHVwID0gKGVsZW1lbnQsIHJvdykgPT4ge1xuXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXZfdG9vbHMnKTtcbiAgICBsZXQgcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgY2xvc2VCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGxldCBhdHRyaWJ1dGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsZXQgc3R5bGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsZXQgcG9wdXBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xuXHRwb3B1cFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3dyYXBwZXInKTtcbiAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2xvc2UnKTtcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAneCc7XG5cbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgfSwgZmFsc2UpO1xuXG5cdHJlbmRlclBvcHVwU2VjdGlvbignYXR0cl9saXN0JywgJ0F0dHJpYnV0ZXMnLCBlbGVtZW50LCByb3csIGF0dHJpYnV0ZUxpc3RXcmFwcGVyKTtcblx0cmVuZGVyUG9wdXBTZWN0aW9uKCdzdHlsZV9saXN0JywgJ0lubGluZSBzdHlsZXMnLCBlbGVtZW50LCByb3csIHN0eWxlTGlzdFdyYXBwZXIpO1xuXG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHN0eWxlTGlzdFdyYXBwZXIpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHBvcHVwV3JhcHBlcik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyUG9wdXB9O1xuIiwiLyogcmVuZGVyX3BvcHVwX3NlY3Rpb24uanMsIHYuIDAuMS4xLCAwNS4wNS4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckF0dHJJbnB1dH0gZnJvbSAnLi9yZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzJztcbmltcG9ydCB7YWRkQnV0dG9uQWN0aW9ufSBmcm9tICcuL2FkZF9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7YXBwbHlCdXR0b25BY3Rpb259IGZyb20gJy4vYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2NhbmNlbEJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9jYW5jZWxfYnV0dG9uX2FjdGlvbi5qcyc7XG5cbmxldCByZW5kZXJQb3B1cFNlY3Rpb24gPSAoaWQsIHRpdGxlLCBlbGVtZW50LCByb3csIGxpc3RXcmFwcGVyKSA9PiB7XG5cblx0bGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXHRsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGxldCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0bGV0IGFkZEFwcGx5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdGxldCBhZGRDYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0bGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdGxldCB2YWx1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bGV0IG5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0bGV0IHZhbHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdGxldCBhcnI7XG5cdGxldCBzZWN0aW9uTmFtZSA9ICcnO1xuXHRcblx0aWYgKGlkID09PSAnYXR0cl9saXN0Jykge1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdHNlY3Rpb25OYW1lID0gJ2F0dHJpYnV0ZXMnO1xuXHR9IGVsc2Uge1xuXHRcdGFyciA9IFtdO1xuXHRcdHNlY3Rpb25OYW1lID0gJ3N0eWxlcyc7XG5cdH1cblxuXHRsaXN0LmlkID0gaWQ7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uJyk7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoYHBvcHVwX19zZWN0aW9uLS0ke3NlY3Rpb25OYW1lfWApO1xuXHRoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwicG9wdXBfX2hlYWRsaW5lXCI+JHt0aXRsZX08L3NwYW4+YDtcblx0YWRkQnRuLmlubmVyVGV4dCA9ICcrJztcblx0YWRkQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQnKTtcblx0YWRkQXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0YWRkQ2FuY2VsQnRuLmlubmVyVGV4dCA9ICdDYW5jZWwnO1xuXHRhZGRBcHBseUJ0bi5pZCA9IGBhZGRfJHtpZC5yZXBsYWNlKCdfbGlzdCcsICcnKX1fYnRuYDtcblx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5Jyk7XG5cdGFkZENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2FuY2VsJyk7XG5cdG5hbWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgbmFtZSAnIDogJ2F0dHJpYnV0ZSBuYW1lICc7XG5cdHZhbHVlSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IHZhbHVlICcgOiAnYXR0cmlidXRlIHZhbHVlICc7XG5cdG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xuXHRuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1pbnB1dCcpO1xuXHR2YWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdHZhbHVlSW5wdXQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1pbnB1dCcpO1xuXHRhZGRBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWNvbGxhcHNlZCcpO1xuXHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NhbmNlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHR2YWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdGhlYWRlci5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQoYWRkQ2FuY2VsQnRuKTtcblx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEFwcGx5QnRuKTtcblx0bmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblx0dmFsdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHZhbHVlSW5wdXQpO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQobmFtZUlucHV0TGFiZWwpO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dExhYmVsKTtcblx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oZWFkZXInKTtcblx0bGlzdC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdCcpO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChsaXN0KTtcblxuXHRpZiAoaWQgPT09ICdzdHlsZV9saXN0JyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMgJiYgZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlKSB7XG5cdFx0YXJyID0gJycuc3BsaXQuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUudmFsdWUsICc7ICcpXG5cdFx0YXJyID0gYXJyLm1hcChydWxlID0+IHJ1bGUucmVwbGFjZSgnOycsICcnKSk7XG5cdH1cblxuXHRmb3IgKGxldCBpdGVtIGluIGFycikge1xuXHRcdFxuXHRcdGxldCBuYW1lO1xuXHRcdGxldCB2YWx1ZTtcblxuXHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cdFx0XHRuYW1lID0gYXJyW2l0ZW1dLnNwbGl0KCc6ICcpWzBdO1xuXHRcdFx0dmFsdWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5hbWUgPSBhcnJbaXRlbV0ubmFtZTtcblx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnZhbHVlO1xuXHRcdH1cblxuXHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIG5hbWUsIHZhbHVlKTtcblx0fVxuXG5cdGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0YWRkQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIG5hbWVJbnB1dExhYmVsLCB2YWx1ZUlucHV0TGFiZWwsIGhlYWRlcik7XG5cdH0sIGZhbHNlKTtcblxuXHRhZGRBcHBseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRhcHBseUJ1dHRvbkFjdGlvbihlbGVtZW50LCBhZGRBcHBseUJ0biwgdmFsdWVJbnB1dExhYmVsLCBuYW1lSW5wdXRMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcik7XG5cdH0sIGZhbHNlKTtcblxuXHRhZGRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0Y2FuY2VsQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBhZGRDYW5jZWxCdG4sIHZhbHVlSW5wdXRMYWJlbCwgbmFtZUlucHV0TGFiZWwsIGhlYWRlcik7XG5cdH0sIGZhbHNlKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJQb3B1cFNlY3Rpb259O1xuIl19
