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

},{"./modules/console_listen.js":5,"./modules/dt_console_api.js":8,"./modules/load_styles.js":10,"./modules/render_browser_info.js":12,"./modules/render_console.js":13,"./modules/render_inspector.js":18}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* add_button_action.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

var addButtonAction = function addButtonAction(btn, nameLabel, valueLabel) {
	btn.classList.remove('popup__apply--collapsed');
	nameLabel.classList.remove('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--collapsed');
	btn.classList.add('popup__apply--expanded');
	nameLabel.classList.add('popup__add-label--expanded');
	valueLabel.classList.add('popup__add-label--expanded');
};

exports.addButtonAction = addButtonAction;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.applyButtonAction = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var applyButtonAction = function applyButtonAction(element, btn, valueLabel, nameLabel, arr, list, row) {

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
	valueLabel.classList.add('popup__add-label--collapsed');
	valueLabel.classList.remove('popup__add-label--expanded');
	nameInput.value = '';
	valueInput.value = '';
	btn.classList.add('popup__apply--collapsed');
	btn.classList.remove('popup__apply--expanded');
}; /* apply_button_action.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

exports.applyButtonAction = applyButtonAction;

},{"./render_attribute_input.js":11}],4:[function(require,module,exports){
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

},{"./render_console.js":13}],5:[function(require,module,exports){
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

},{"./global_eval.js":9,"./render_console.js":13,"./render_console_message.js":14}],6:[function(require,module,exports){
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

},{"./render_console.js":13}],7:[function(require,module,exports){
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

},{"./render_popup.js":19}],8:[function(require,module,exports){
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

},{"./console_clear.js":4,"./console_log.js":6}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* render_attribute_input.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

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

},{}],12:[function(require,module,exports){
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

},{"./render_header.js":17}],13:[function(require,module,exports){
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

},{"./console_listen":5,"./render_header.js":17}],14:[function(require,module,exports){
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

},{"./render_console_output.js":15}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./dom_element_listen.js":7}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./render_dom.js":16,"./render_header.js":17}],19:[function(require,module,exports){
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

    popup.classList.add('popup');
    closeBtn.classList.add('popup__close');
    closeBtn.innerHTML = 'x';

    closeBtn.addEventListener('click', function () {
        popup.remove();
    }, false);

    (0, _render_popup_section.renderPopupSection)('attr_list', 'Attributes', element, row, attributeListWrapper);
    (0, _render_popup_section.renderPopupSection)('style_list', 'Inline styles', element, row, styleListWrapper);

    popup.appendChild(closeBtn);
    popup.appendChild(attributeListWrapper);
    popup.appendChild(styleListWrapper);
    container.appendChild(popup);
}; /* render_popup.js, v. 0.1.2, 21.04.2017, @ filip-swinarski */

exports.renderPopup = renderPopup;

},{"./render_popup_section.js":20}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderPopupSection = undefined;

var _render_attribute_input = require('./render_attribute_input.js');

var _add_button_action = require('./add_button_action.js');

var _apply_button_action = require('./apply_button_action.js');

var renderPopupSection = function renderPopupSection(id, title, element, row, listWrapper) {

	var list = document.createElement('ul');
	var header = document.createElement('div');
	var addBtn = document.createElement('button');
	var addApplyBtn = document.createElement('button');
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
	listWrapper.innerHTML = '<span class="popup__headline">' + title + '</span>';
	addBtn.innerText = '+';
	addBtn.classList.add('popup__add');
	addApplyBtn.innerText = 'Apply';
	addApplyBtn.id = 'add_' + id.replace('_list', '') + '_btn';
	addApplyBtn.classList.add('popup__apply');
	nameInputLabel.innerText = id === 'style_list' ? 'property name ' : 'attribute name ';
	valueInputLabel.innerText = id === 'style_list' ? 'property value ' : 'attribute value ';
	nameInput.type = 'text';
	nameInput.classList.add('popup__add-input');
	valueInput.type = 'text';
	valueInput.classList.add('popup__add-input');
	addApplyBtn.classList.add('popup__apply--collapsed');
	nameInputLabel.classList.add('popup__add-label--collapsed');
	valueInputLabel.classList.add('popup__add-label--collapsed');
	header.appendChild(addBtn);
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
		(0, _add_button_action.addButtonAction)(addApplyBtn, nameInputLabel, valueInputLabel);
	}, false);

	addApplyBtn.addEventListener('click', function () {
		(0, _apply_button_action.applyButtonAction)(element, addApplyBtn, valueInputLabel, nameInputLabel, arr, list, row);
	}, false);
}; /* render_popup_section.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

exports.renderPopupSection = renderPopupSection;

},{"./add_button_action.js":2,"./apply_button_action.js":3,"./render_attribute_input.js":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfY2xlYXIuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxjb25zb2xlX2xpc3Rlbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbG9nLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcZG9tX2VsZW1lbnRfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcZHRfY29uc29sZV9hcGkuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxnbG9iYWxfZXZhbC5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGxvYWRfc3R5bGVzLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9icm93c2VyX2luZm8uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9vdXRwdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfZG9tLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2hlYWRlci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3IuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXAuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXBfc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBp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QS9CLEVBQW9DLElBQXBDLEVBQTBDLEtBQTFDO0FBQ0E7O0FBRUQsUUFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDLENBQUQsRUFBTztBQUN2QywwQ0FBZ0IsV0FBaEIsRUFBNkIsY0FBN0IsRUFBNkMsZUFBN0M7QUFDQSxFQUZELEVBRUcsS0FGSDs7QUFJQSxhQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDM0MsOENBQWtCLE9BQWxCLEVBQTJCLFdBQTNCLEVBQXdDLGVBQXhDLEVBQXlELGNBQXpELEVBQXlFLEdBQXpFLEVBQThFLElBQTlFLEVBQW9GLEdBQXBGO0FBQ0EsRUFGRCxFQUVHLEtBRkg7QUFJQSxDQS9FRCxDLENBUEE7O1FBd0ZRLGtCLEdBQUEsa0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogbWFpbi5qcyAwLjEuMSAzMC4wMy4yMDE3IEAgZmlsaXAgc3dpbmFyc2tpICovXG5cbmltcG9ydCB7bG9hZFN0eWxlc30gZnJvbSAnLi9tb2R1bGVzL2xvYWRfc3R5bGVzLmpzJztcbmltcG9ydCB7cmVuZGVySW5zcGVjdG9yfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2luc3BlY3Rvci5qcyc7XG5pbXBvcnQge3JlbmRlckNvbnNvbGV9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge3JlbmRlckJyb3dzZXJJbmZvfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2Jyb3dzZXJfaW5mby5qcyc7XG5pbXBvcnQge2NvbnNvbGVMaXN0ZW59IGZyb20gJy4vbW9kdWxlcy9jb25zb2xlX2xpc3Rlbi5qcyc7XG5pbXBvcnQgKiBhcyBEVENvbnNvbGUgZnJvbSAnLi9tb2R1bGVzL2R0X2NvbnNvbGVfYXBpLmpzJztcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuY29udGFpbmVyLmlkID0gJ2Rldl90b29scyc7XG5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHMnKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbmxvYWRTdHlsZXMoKTtcbnJlbmRlckluc3BlY3Rvcihib2R5LCBjb250YWluZXIpO1xucmVuZGVyQ29uc29sZShjb250YWluZXIpO1xucmVuZGVyQnJvd3NlckluZm8oY29udGFpbmVyKTtcblxud2luZG93LkRUQ29uc29sZSA9IERUQ29uc29sZTtcbiIsIi8qIGFkZF9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMCwgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IGFkZEJ1dHRvbkFjdGlvbiA9IChidG4sIG5hbWVMYWJlbCwgdmFsdWVMYWJlbCkgPT4ge1xuXHRidG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRidG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1leHBhbmRlZCcpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xufTtcblxuZXhwb3J0IHthZGRCdXR0b25BY3Rpb259O1xuXG4iLCIvKiBhcHBseV9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMCwgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5cbmxldCBhcHBseUJ1dHRvbkFjdGlvbiA9IChlbGVtZW50LCBidG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgYXJyLCBsaXN0LCByb3cpID0+IHtcblxuXHRsZXQgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRsZXQgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0bGV0IG5hbWVJbnB1dCA9IG5hbWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRsZXQgdmFsdWUgPSB2YWx1ZUlucHV0LnZhbHVlO1xuXHRsZXQgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcblx0bGV0IGF0dHJWYWx1ZUVsZW07XG5cdGxldCBhdHRyTmFtZUVsZW07XG5cblx0bGlzdC5pbm5lckhUTUwgPSAnJztcblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX2F0dHJfYnRuJykge1xuXHRcdGF0dHJOYW1lRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRhdHRyVmFsdWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHRhcnIgPSBbXS5maWx0ZXIuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGF0dHIgPT4gYXR0ci5uYW1lICE9PSAnc3R5bGUnKTtcblx0XHRbXS5mb3JFYWNoLmNhbGwoYXJyLCAoYXR0cikgPT4ge1xuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHR9KTtcblx0XHRhdHRyTmFtZUVsZW0uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRhdHRyVmFsdWVFbGVtLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXHRcdGF0dHJOYW1lRWxlbS5pbm5lclRleHQgPSBuYW1lO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdFx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc9Jztcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKGF0dHJOYW1lRWxlbSwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShzZXBhcmF0b3IsIHJvdy5sYXN0Q2hpbGQpO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0clZhbHVlRWxlbSwgcm93Lmxhc3RDaGlsZCk7XG5cdH1cblxuXHRpZiAoYnRuLmlkID09PSAnYWRkX3N0eWxlX2J0bicpIHtcblxuXHRcdGxldCBzdHlsZUVsZW0gPSBbXS5maWx0ZXIuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKSwgKGVsKSA9PiBlbC5pbm5lclRleHQgPT09ICdzdHlsZScpWzBdO1xuXG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpOyBcblx0XHRhdHRyVmFsdWVFbGVtID0gc3R5bGVFbGVtLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuXHRcdGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcblx0XHRhcnIucHVzaChgJHtuYW1lfTogJHt2YWx1ZX07YCk7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSAnXCInO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChydWxlLCBpKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBydWxlLnNwbGl0KCc6ICcpWzBdLCBydWxlLnNwbGl0KCc6ICcpWzFdLnJlcGxhY2UoJzsnLCAnJykpO1xuXG5cdFx0XHRpZihpICE9PSAwKVxuXHRcdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnICc7XG5cblx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9IGAke3J1bGUuc3BsaXQoJzogJylbMF19OiAke3J1bGUuc3BsaXQoJzogJylbMV19YDtcblxuXHRcdFx0aWYgKGkgPCBhcnIubGVuZ3RoIC0gMSlcblx0XHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gJzsnO1xuXHRcdFx0XHRcblx0XHR9KTtcblx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnXCInO1xuXHR9XG5cblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRidG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblxufTtcblxuZXhwb3J0IHthcHBseUJ1dHRvbkFjdGlvbn07XG4iLCIvKiBjb25zb2xlX2NsZWFyLmpzLCB2LiAwLjEuMCwgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlQ2xlYXIgPSAoKSA9PiB7XG4gICAgY29uc29sZURpc3BsYXkuaW5uZXJIVE1MID0gJyc7XG59XG5cbmV4cG9ydCB7Y29uc29sZUNsZWFyfTtcbiIsIi8qIGNvbnNvbGVfbGlzdGVuLmpzLCB2LiAwLjEuNSwgMDYuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge2NvbnNvbGVJbnB1dH0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5pbXBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfSBmcm9tICcuL3JlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMnO1xuaW1wb3J0IHtnbG9iYWxFdmFsfSBmcm9tICcuL2dsb2JhbF9ldmFsLmpzJztcblxubGV0IGNvbnNvbGVMaXN0ZW4gPSAoKSA9PiB7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyb3IpID0+IHtcblxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZU1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yU291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JMaW5lTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvckNvbHVtbk5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JQcm9tcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3JvdycpO1xuICAgICAgICBlcnJvclByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItcHJvbXB0Jyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctcicpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXItLWVycicpO1xuICAgICAgICBlcnJvck1lc3NhZ2VNc2cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLW1zZycpO1xuICAgICAgICBlcnJvclNvdXJjZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItc3JjJyk7XG4gICAgICAgIGVycm9yTGluZU5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1saW5lbm8nKTtcbiAgICAgICAgZXJyb3JDb2x1bW5Oby5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItY29sdW1ubm8nKTtcblxuICAgICAgICBlcnJvck1lc3NhZ2VNc2cuaW5uZXJIVE1MICs9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIGVycm9yU291cmNlLmlubmVySFRNTCArPSBlcnJvci5maWxlbmFtZTtcbiAgICAgICAgZXJyb3JMaW5lTm8uaW5uZXJIVE1MICs9IGVycm9yLmxpbmVubztcbiAgICAgICAgZXJyb3JDb2x1bW5Oby5pbm5lckhUTUwgKz0gZXJyb3IuY29sdW1ubm87XG5cbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yUHJvbXB0KTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZU1zZyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvclNvdXJjZSk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvckxpbmVObyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvckNvbHVtbk5vKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZURpc3BsYXkuYWRkRXZlbnRMaXN0ZW5lcignbG9nJywgKGUpID0+IHtcblxuICAgICAgICBsZXQgcm93ID0gcmVuZGVyQ29uc29sZU1lc3NhZ2UoZS5kZXRhaWwpO1xuXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19yb3cnKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIFxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBnbG9iYWxFdmFsKGNvbnNvbGVJbnB1dC52YWx1ZSk7XG5cbiAgICAgICAgICAgIERUQ29uc29sZS5sb2codmFsdWUsIGNvbnNvbGVJbnB1dC52YWx1ZSk7XHRcbiAgICAgICAgICAgIGNvbnNvbGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufVxuXG5leHBvcnQge2NvbnNvbGVMaXN0ZW59O1xuIiwiLyogY29uc29sZV9sb2cuanMsIHYuIDAuMS4yLCAzMC4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcblxubGV0IGNvbnNvbGVMb2cgPSAoc3RyLCB2YWx1ZSkgPT4ge1xuXG4gICAgbGV0IGxvZyA9IG5ldyBDdXN0b21FdmVudCgnbG9nJywge2RldGFpbDogW3N0ciwgdmFsdWVdfSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5kaXNwYXRjaEV2ZW50KGxvZyk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTG9nfTtcbiIsIi8qIGRvbV9lbGVtZW50X2xpc3Rlbi5qcywgdi4gMC4xLjAsIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyUG9wdXB9IGZyb20gJy4vcmVuZGVyX3BvcHVwLmpzJztcblxubGV0IGRvbUVsZW1lbnRMaXN0ZW4gPSAoZWxlbSwgcm93LCBhcnJvdykgPT4ge1xuXG5cdGxldCBzdGFydERhdGU7XG5cdGxldCB0T2JqO1xuXHRsZXQgc3RhcnRYO1xuXHRsZXQgc3RhcnRZO1xuXHRsZXQgZW5kWDtcblx0bGV0IGVuZFk7XG5cdGxldCBkaXN0WDtcblx0bGV0IGRpc3RZO1xuXHRsZXQgbWF4WCA9IDA7XG5cdGxldCBtYXhZID0gMDtcblxuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG5cdFx0c3RhcnREYXRlID0gbmV3IERhdGUoKTtcblx0XHR0T2JqID0gZS50b3VjaGVzWzBdO1xuXHRcdHN0YXJ0WCA9IHRPYmoucGFnZVg7XG5cdFx0c3RhcnRZID0gdE9iai5wYWdlWTtcblx0fSwgZmFsc2UpO1xuXHRyb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcblx0XHR0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRlbmRYID0gdE9iai5wYWdlWDtcblx0XHRlbmRZID0gdE9iai5wYWdlWTtcblx0XHRkaXN0WCA9IGVuZFggLSBzdGFydFg7XG5cdFx0ZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFgpID4gbWF4WClcblx0XHRcdG1heFggPSBNYXRoLmFicyhkaXN0WCk7XG5cdCAgIFxuXHRcdGlmIChNYXRoLmFicyhkaXN0WSkgPiBtYXhZKVxuXHRcdFx0bWF4WSA9IE1hdGguYWJzKGRpc3RZKTtcblx0ICAgXG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcblx0ICAgXG5cdFx0bGV0IGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdGxldCBkYXRlQW1wID0gZW5kRGF0ZSAtIHN0YXJ0RGF0ZTtcblx0ICAgXG5cdFx0dE9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0ZW5kWCA9IHRPYmoucGFnZVg7XG5cdFx0ZW5kWSA9IHRPYmoucGFnZVk7XG5cdFx0ZGlzdFggPSBlbmRYIC0gc3RhcnRYO1xuXHRcdGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcblx0ICAgXG5cdFx0aWYgKG1heFkgPD0gMzAgJiYgbWF4WCA8PSAzMCkge1xuXHRcdCAgIFxuXHRcdFx0aWYgKGRhdGVBbXAgPD0gMjAwKSB7XG5cdFx0XHRcdHJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKVxuXHRcdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpXG5cblx0XHRcdFx0aWYgKGFycm93LmNsYXNzTGlzdC5jb250YWlucygnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKSB8fFxuXHRcdFx0XHRcdGFycm93LmNsYXNzTGlzdC5jb250YWlucygnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJykpIHtcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuXHRcdFx0XHRcdGFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlbmRlclBvcHVwKGVsZW0sIHJvdyk7XG5cdFx0XHR9XG5cdFx0ICAgXG5cdFx0fVxuXHQgICBcblx0XHRtYXhYID0gMDtcblx0XHRtYXhZID0gMDtcblxuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge2RvbUVsZW1lbnRMaXN0ZW59O1xuIiwiLyogZHRfY29uc29sZV9hcGkuanMsIHYuIDAuMS4zLCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVMb2d9IGZyb20gJy4vY29uc29sZV9sb2cuanMnO1xuaW1wb3J0IHtjb25zb2xlQ2xlYXJ9IGZyb20gJy4vY29uc29sZV9jbGVhci5qcyc7XG5cbmxldCBsb2cgPSAodmFsdWUsIHN0ciA9ICcnKSA9PiB7XG4gICAgY29uc29sZUxvZyhzdHIsIHZhbHVlKTtcbn1cblxubGV0IGNsZWFyID0gY29uc29sZUNsZWFyO1xuXG5leHBvcnQge2xvZ307XG5leHBvcnQge2NsZWFyfTtcbiIsIi8qIGdsb2JhbF9ldmFsLmpzLCB2LiAwLjEuMCwgMzEuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuLy8gZXZhbCAtIHJ1bnMgYmxvY2sgc2NvcGUgZGVjbGFyYXRpb25zIHZpYSBzY3JpcHQgaW5qZWN0aW9uXG4vLyBvdGhlcndpc2Ugc3RhbmRhcmQgZXZhbCB1c2VkIFxuLy8gLSB0aGluayBpZiBub3QgdXNlIGluamVjdGlvbiBleGNsdXNpdmVseVxuLy8gcmV0dXJucyB2YWx1ZVxuY29uc3QgZ2xvYmFsRXZhbCA9IChzdHIpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JzsgLy8gcHJldmVudCBjcmVhdGluZyBsb2NhbCB2YXJpYWJsZXMgd2l0aCBzdGFuZGFyZCBldmFsXG4gICAgXG4gICAgaWYgKHN0ci5zdGFydHNXaXRoKCdsZXQgJykgfHwgc3RyLnN0YXJ0c1dpdGgoJ2NvbnN0ICcpKSB7IC8vIGNvZGUgZm9yIHNjcmlwdCBpbnNlcnRpb25cblxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpLnJlbW92ZSgpXG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LmlkID0gJ2R0X3NjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gcmV0dXJucyB1bmRlZmluZWQgd2hlbiBkZWNsYXJpbmcgYmxvY2sgc2NvcGVkIHZhcmlhYmxlXG4gICAgfSBlbHNlIHsgLy9zdGFuZGFyZCBldmFsXG4gICAgICAgIHJldHVybiAoMSwgZXZhbCkoc3RyKTsgLy8gaW5kaXJlY3QgY2FsbCB0byBhY2Nlc3MgZ2xvYmFsIHNjb3BlXG4gICAgfVxufVxuXG5leHBvcnQge2dsb2JhbEV2YWx9O1xuIiwiLyogbG9hZCBfc3R5bGVzLmpzIHYuIDAuMS4yLCAwNC4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5sZXQgbG9hZFN0eWxlcyA9ICgpID0+IHtcblxuICAgIGxldCBzdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGV0IGdvb2dsZUZvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBzdHlsZXMucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHN0eWxlcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcbiAgICBzdHlsZXMuaHJlZiA9ICcuL2Nzcy9tYWluLmNzcyc7XG4gICAgc3R5bGVzLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBzdHlsZXMudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVzLm1lZGlhID0gJ3NjcmVlbic7XG4gICAgc3R5bGVzLmhyZWYgPSAnaHR0cHM6Ly9nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNwYWNlK01vbm86NDAwLDcwMCZhbXA7c3Vic2V0PWxhdGluLWV4dCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChnb29nbGVGb250KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcywgdi4gMC4xLjAsIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCByZW5kZXJBdHRySW5wdXQgPSAoZWwsIGRpc3BsYXksIHJvdywgbmFtZSwgdmFsdWUpID0+IHtcbiAgIFxuXHRsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRsZXQgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRsZXQgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0bGV0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIFxuXHRpbnB1dC50eXBlID0gJ3RleHQnO1xuXHRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRpbnB1dC52YWx1ZSArPSAnOyc7XG5cblx0bGFiZWwuaW5uZXJUZXh0ID0gbmFtZTtcblx0YXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc6Jztcblx0bGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtZWxlbWVudCcpO1xuXHRsYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1sYWJlbCcpO1xuXHRpbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1pbnB1dCcpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4nKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0c2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LXNlcGFyYXRvcicpO1xuICAgXG5cdGxhYmVsLmFwcGVuZENoaWxkKHNlcGFyYXRvcik7XG5cdGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoYXBwbHlCdG4pO1xuXHRsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbCk7XG5cdGRpc3BsYXkuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpO1xuICAgXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgIFxuXHRcdGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG5cblx0XHRcdGxldCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdFx0bGV0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRcdGxldCBsYWJlbHMgPSBkaXNwbGF5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsJyk7XG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gJyc7XG5cblx0XHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLmZpcnN0Q2hpbGQuZGF0YTtcblx0XHRcdFx0XHRcdHZhbHVlICs9ICc6ICc7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0XHRpZiAoaSA8IGxhYmVscy5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdFx0XHR2YWx1ZSArPSAnICc7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQnKTtcblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdH0pO1xuXG5cdGFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgIFxuXHRcdGxldCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdGxldCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jylcblx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRcdGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuXHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09IG5hbWUgJiYgZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0YXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRsZXQgbGFiZWxzID0gZGlzcGxheS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSAnJztcblxuXHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5maXJzdENoaWxkLmRhdGE7XG5cdFx0XHRcdFx0dmFsdWUgKz0gJzogJztcblx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0aWYgKGkgPCBsYWJlbHMubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHRcdHZhbHVlICs9ICcgJztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJvd0F0dHJWYWx1ZUVsZW1zW2ldLmlubmVyVGV4dCA9IGBcIiR7dmFsdWV9XCJgO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblxuXHR9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckF0dHJJbnB1dH07XG4iLCIvKiByZW5kZXJfYnJvd3Nlcl9pbmZvLmpzLCB2LiAwLjEuMSwgMTUuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmxldCByZW5kZXJCcm93c2VySW5mbyA9IChwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgYnJvd3NlckluZm9EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgYnJvd3NlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmlkID0gJ2Jyb3dzZXInO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXInKTtcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19wYW5lbCcpO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdicm93c2VyX19kaXNwbGF5Jyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlkID0gJ2Jyb3dzZXJfZGlzcGxheSc7XG4gICAgcmVuZGVySGVhZGVyKGJyb3dzZXJJbmZvQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoYnJvd3NlckluZm9EaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChicm93c2VySW5mb0NvbnRhaW5lcik7XG4gICAgXG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgbmFtZTogJyArIG5hdmlnYXRvci5hcHBDb2RlTmFtZSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+QXBwIHZlcnNpb246ICcgKyBuYXZpZ2F0b3IuYXBwVmVyc2lvbiArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+UGxhdGZvcm06ICcgKyBuYXZpZ2F0b3IucGxhdGZvcm0gKyAnPC9kaXY+JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PlVzZXIgYWdlbnQ6ICcgKyBuYXZpZ2F0b3IudXNlckFnZW50ICsgJzwvZGl2Pic7XG5cbiAgICBicm93c2VySW5mb0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fZGlzcGxheS0tY29sbGFwc2VkJyk7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVyQnJvd3NlckluZm99O1xuIiwiLyogcmVuZGVyX2NvbnNvbGUuanMsIHYuIDAuMS4zLCAxNS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVMaXN0ZW59IGZyb20gJy4vY29uc29sZV9saXN0ZW4nO1xuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmNvbnN0IGNvbnNvbGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuY29uc3QgY29uc29sZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0UHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGUnKTtcbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfX3BhbmVsJyk7XG5jb25zb2xlRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19kaXNwbGF5Jyk7XG5jb25zb2xlRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19kaXNwbGF5LS1jb2xsYXBzZWQnKTtcbmNvbnNvbGVEaXNwbGF5LmlkID0gJ2NvbnNvbGVfZGlzcGxheSc7XG5jb25zb2xlSW5wdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9faW5wdXQnKTtcbmNvbnNvbGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19pbnB1dC0tY29sbGFwc2VkJyk7XG5jb25zb2xlSW5wdXQuaWQgPSAnY29uc29sZV9pbnB1dCc7XG5jb25zb2xlSW5wdXQudHlwZSA9ICd0ZXh0JztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQnKTtcbmNvbnNvbGVDb250YWluZXIuaWQgPSAnY29uc29sZSc7XG5jb25zb2xlSW5wdXRQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcHJvbXB0LS1jb2xsYXBzZWQnKTtcblxubGV0IHJlbmRlckNvbnNvbGUgPSAocGFuZWwpID0+IHtcblxuICAgIHJlbmRlckhlYWRlcihjb25zb2xlQ29udGFpbmVyLCBmYWxzZSk7XG4gICAgY29uc29sZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zb2xlSW5wdXRQcm9tcHQpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZURpc3BsYXkpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChjb25zb2xlQ29udGFpbmVyKTtcbiAgICBjb25zb2xlTGlzdGVuKCk7XG5cbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlfTtcbmV4cG9ydCB7Y29uc29sZURpc3BsYXl9O1xuZXhwb3J0IHtjb25zb2xlSW5wdXR9O1xuIiwiLyogcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcywgdi4gMC4xLjEsIDA2LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9vdXRwdXQuanMnO1xuXG5sZXQgcmVuZGVyQ29uc29sZU1lc3NhZ2UgPSAobXNnQXJyYXkpID0+IHtcblxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmIChtc2dBcnJheVswXSkge1xuXG4gICAgICAgIGxldCBpbnB1dE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBpbnB1dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLWknKTtcbiAgICAgICAgaW5wdXRNZXNzYWdlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX21zZy1pcHJvbXB0XCI+PC9zcGFuPiR7bXNnQXJyYXlbMF19IGA7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dE1lc3NhZ2UpO1xuICAgIH1cbiAgICBcbiAgICBsZXQgcmV0dXJuTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgcmV0dXJuTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctcicpO1xuICAgIHJldHVybk1lc3NhZ2UuaW5uZXJIVE1MICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX21zZy1ycHJvbXB0XCI+PC9zcGFuPmA7XG4gICAgcmVuZGVyQ29uc29sZU91dHB1dChtc2dBcnJheVsxXSwgcmV0dXJuTWVzc2FnZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJldHVybk1lc3NhZ2UpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZU1lc3NhZ2V9O1xuIiwiLy8gcmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzLCB2LiAwLjEuMywgMjEuMDQuMjAxNyBAIGZpbGlwLXN3aW5hcnNraVxuXG5sZXQgcmVuZGVyQ29uc29sZU91dHB1dCA9ICh2YWwsIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBpbmRleCkgPT4ge1xuXG4gICAgbGV0IG91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgY2hlY2tTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zcGxpdCgnICcpWzFdO1xuICAgIGxldCBodG1sID0gJyc7XG5cbiAgICBjaGVja1N0ciA9IGNoZWNrU3RyLnN1YnN0cmluZygwLCBjaGVja1N0ci5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcbiAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtjaGVja1N0cn1gKTtcblx0XG4gICAgaWYgKGNoZWNrU3RyID09PSAnc3RyaW5nJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVsbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdzeW1ib2wnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgaHRtbCArPSBjaGVja1N0ciA9PT0gJ3N0cmluZycgPyBgXCIke3ZhbH1cImAgOiB2YWw7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICB9IGVsc2UgaWYgKGNoZWNrU3RyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09ICdhcnJheScgfHwgY2hlY2tTdHIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdmFsKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGtleUNsYXNzID0gY2hlY2tTdHIgPT09ICdhcnJheScgPyAnaW5kZXgnIDogJ2tleSc7XG4gICAgICAgICAgICBsZXQgY2hlY2tTdHIyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbFtpdGVtXSkuc3BsaXQoJyAnKVsxXTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjaGVja1N0cjIgPSBjaGVja1N0cjIuc3Vic3RyaW5nKDAsIGNoZWNrU3RyMi5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdFxuXG4gICAgICAgICAgICBpZiAoY2hlY2tTdHIyID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnbnVsbCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdzeW1ib2wnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnYm9vbGVhbicpIHtcblxuICAgICAgICAgICAgICAgIGxldCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2NoZWNrU3RyMn1gKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gY2hlY2tTdHIyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsW2l0ZW1dfVwiYCA6IHZhbFtpdGVtXTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKHZhbHVlRWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrU3RyMiA9PT0nZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLWtleVwiPmZ1bmN0aW9uIDwvc3Bhbj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX2YtbmFtZVwiPiR7dmFsLm5hbWV9KCk8L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICBsZXQga2V5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtrZXlDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgb3V0cHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKGtleUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJlbmRlckNvbnNvbGVPdXRwdXQodmFsW2l0ZW1dLCBvdXRwdXQsIGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiBcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MID0gdmFsO1xuICAgIH1cblx0XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChvdXRwdXQpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlT3V0cHV0fTtcbiIsIi8qIHJlbmRlcl9kb20uanMsIHYuIDAuMS45LCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2RvbUVsZW1lbnRMaXN0ZW59IGZyb20gJy4vZG9tX2VsZW1lbnRfbGlzdGVuLmpzJztcblxubGV0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuICAgIGlmIChlbGVtLmlkID09PSAnZGV2X3Rvb2xzJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgcm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCByb3cyID0gZWxlbS5jaGlsZHJlbi5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MUVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MU9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MUNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1vcGVuaW5nJyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNsb3NpbmcnKTtcbiAgICBcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTtcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTsgXG4gICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MUNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cyT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cyQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzFPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8JztcbiAgICByb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxT3BlbkFycm93KTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuICAgIFxuICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgbGV0IGF0dHJFcXVhbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBsZXQgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmlubmVyVGV4dCA9IGF0dHIubG9jYWxOYW1lO1xuICAgICAgICAgICAgYXR0ckVxdWFsU3Bhbi5pbm5lclRleHQgPSAnPSc7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmlubmVyVGV4dCA9ICdcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ck5hbWVTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ckVxdWFsU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJWYWx1ZVNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XHRcbiAgICBcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFDbG9zZUFycm93KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICBcbiAgICBpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBsZXQgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICAgICAgdGV4dEVsLmlubmVyVGV4dCA9IGVsZW0udGV4dC50cmltKCk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG4gICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyRE9NKGVsLCB3cmFwcGVyLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcblx0ZG9tRWxlbWVudExpc3RlbihlbGVtLCByb3cxLCByb3cxT3BlbkFycm93KTtcbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbn1cbmV4cG9ydCB7cmVuZGVyRE9NfTtcbiIsIi8qIHJlbmRlcl9oZWFkZXIuanMsIHYuIDAuMS4xLCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG52YXIgcmVuZGVySGVhZGVyID0gKGNvbnRhaW5lciwgZXhwYW5kZWQpID0+IHtcbiAgIFxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCB0aXRsZSA9IGNvbnRhaW5lci5pZDtcbiAgIFxuICAgIGhlYWRlci5pZCA9IGAke2NvbnRhaW5lci5pZH1faGVhZGVyYDtcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9faGVhZGVyYCk7XG4gICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZWApO1xuICAgIGhlYWRlci5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3RpdGxlfV9fdGl0bGVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuICAgXG4gICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWV4cGFuZGVkYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tY29sbGFwc2VkYCk7XG4gICAgfVxuICAgXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRvZ2dsZUJ0bik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICBcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgIFxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXS5maWx0ZXIuY2FsbChjb250YWluZXIuY2hpbGRyZW4sIGVsID0+IGVsLmlkICE9PSBgJHtwYXJlbnQuaWR9X2hlYWRlcmApO1xuICAgICAgIFxuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1leHBhbmRlZGApO1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1jb2xsYXBzZWRgKTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2VsLmNsYXNzTGlzdFswXX0tLWV4cGFuZGVkYCk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2VsLmNsYXNzTGlzdFswXX0tLWNvbGxhcHNlZGApO1xuICAgICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckhlYWRlcn07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yLmpzLCB2LiAwLjEuNiwgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJET019IGZyb20gJy4vcmVuZGVyX2RvbS5qcyc7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxubGV0IHJlbmRlckluc3BlY3RvciA9IChib2R5LCBwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgaW5zcGVjdG9yRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCBodG1sRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmlkID0gJ2luc3BlY3Rvcic7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3RvcicpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheScpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuaWQgPSAnaW5zcGVjdG9yX2Rpc3BsYXknO1xuICAgIHJlbmRlckhlYWRlcihpbnNwZWN0b3JDb250YWluZXIsIHRydWUpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5LS1leHBhbmRlZCcpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JEaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChpbnNwZWN0b3JDb250YWluZXIpO1xuICAgIHJlbmRlckRPTShodG1sRWxlbSwgaW5zcGVjdG9yRGlzcGxheSwgbGV2ZWwpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckluc3BlY3Rvcn07XG4iLCIvKiByZW5kZXJfcG9wdXAuanMsIHYuIDAuMS4yLCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclBvcHVwU2VjdGlvbn0gZnJvbSAnLi9yZW5kZXJfcG9wdXBfc2VjdGlvbi5qcyc7XG5cbmxldCByZW5kZXJQb3B1cCA9IChlbGVtZW50LCByb3cpID0+IHtcblxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV2X3Rvb2xzJyk7XG4gICAgbGV0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGNsb3NlQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsZXQgYXR0cmlidXRlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IHN0eWxlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XG4gICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2Nsb3NlJyk7XG4gICAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJ3gnO1xuXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH0sIGZhbHNlKTtcblxuXHRyZW5kZXJQb3B1cFNlY3Rpb24oJ2F0dHJfbGlzdCcsICdBdHRyaWJ1dGVzJywgZWxlbWVudCwgcm93LCBhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG5cdHJlbmRlclBvcHVwU2VjdGlvbignc3R5bGVfbGlzdCcsICdJbmxpbmUgc3R5bGVzJywgZWxlbWVudCwgcm93LCBzdHlsZUxpc3RXcmFwcGVyKTtcblxuICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoc3R5bGVMaXN0V3JhcHBlcik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyUG9wdXB9O1xuIiwiLyogcmVuZGVyX3BvcHVwX3NlY3Rpb24uanMsIHYuIDAuMS4wLCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckF0dHJJbnB1dH0gZnJvbSAnLi9yZW5kZXJfYXR0cmlidXRlX2lucHV0LmpzJztcbmltcG9ydCB7YWRkQnV0dG9uQWN0aW9ufSBmcm9tICcuL2FkZF9idXR0b25fYWN0aW9uLmpzJztcbmltcG9ydCB7YXBwbHlCdXR0b25BY3Rpb259IGZyb20gJy4vYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyc7XG5cblxubGV0IHJlbmRlclBvcHVwU2VjdGlvbiA9IChpZCwgdGl0bGUsIGVsZW1lbnQsIHJvdywgbGlzdFdyYXBwZXIpID0+IHtcblxuXHRsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRsZXQgYWRkQXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0bGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdGxldCB2YWx1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bGV0IG5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0bGV0IHZhbHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cdGxldCBhcnI7XG5cdGxldCBzZWN0aW9uTmFtZSA9ICcnO1xuXHRcblx0aWYgKGlkID09PSAnYXR0cl9saXN0Jykge1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdHNlY3Rpb25OYW1lID0gJ2F0dHJpYnV0ZXMnO1xuXHR9IGVsc2Uge1xuXHRcdGFyciA9IFtdO1xuXHRcdHNlY3Rpb25OYW1lID0gJ3N0eWxlcyc7XG5cdH1cblxuXHRsaXN0LmlkID0gaWQ7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uJyk7XG5cdGxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoYHBvcHVwX19zZWN0aW9uLS0ke3NlY3Rpb25OYW1lfWApO1xuXHRsaXN0V3JhcHBlci5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJwb3B1cF9faGVhZGxpbmVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuXHRhZGRCdG4uaW5uZXJUZXh0ID0gJysnO1xuXHRhZGRCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZCcpO1xuXHRhZGRBcHBseUJ0bi5pbm5lclRleHQgPSAnQXBwbHknO1xuXHRhZGRBcHBseUJ0bi5pZCA9IGBhZGRfJHtpZC5yZXBsYWNlKCdfbGlzdCcsICcnKX1fYnRuYDtcblx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5Jyk7XG5cdG5hbWVJbnB1dExhYmVsLmlubmVyVGV4dCA9IGlkID09PSAnc3R5bGVfbGlzdCcgPyAncHJvcGVydHkgbmFtZSAnIDogJ2F0dHJpYnV0ZSBuYW1lICc7XG5cdHZhbHVlSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IHZhbHVlICcgOiAnYXR0cmlidXRlIHZhbHVlICc7XG5cdG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xuXHRuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1pbnB1dCcpO1xuXHR2YWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdHZhbHVlSW5wdXQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1pbnB1dCcpO1xuXHRhZGRBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWNvbGxhcHNlZCcpO1xuXHRuYW1lSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKTtcblx0aGVhZGVyLmFwcGVuZENoaWxkKGFkZEFwcGx5QnRuKTtcblx0bmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblx0dmFsdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHZhbHVlSW5wdXQpO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQobmFtZUlucHV0TGFiZWwpO1xuXHRoZWFkZXIuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dExhYmVsKTtcblx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oZWFkZXInKTtcblx0bGlzdC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdCcpO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChsaXN0KTtcblxuXHRpZiAoaWQgPT09ICdzdHlsZV9saXN0JyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMgJiYgZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlKSB7XG5cdFx0YXJyID0gJycuc3BsaXQuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUudmFsdWUsICc7ICcpXG5cdFx0YXJyID0gYXJyLm1hcChydWxlID0+IHJ1bGUucmVwbGFjZSgnOycsICcnKSk7XG5cdH1cblxuXHRmb3IgKGxldCBpdGVtIGluIGFycikge1xuXHRcdFxuXHRcdGxldCBuYW1lO1xuXHRcdGxldCB2YWx1ZTtcblxuXHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cdFx0XHRuYW1lID0gYXJyW2l0ZW1dLnNwbGl0KCc6ICcpWzBdO1xuXHRcdFx0dmFsdWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5hbWUgPSBhcnJbaXRlbV0ubmFtZTtcblx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnZhbHVlO1xuXHRcdH1cblxuXHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIG5hbWUsIHZhbHVlKTtcblx0fVxuXG5cdGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0YWRkQnV0dG9uQWN0aW9uKGFkZEFwcGx5QnRuLCBuYW1lSW5wdXRMYWJlbCwgdmFsdWVJbnB1dExhYmVsKTtcblx0fSwgZmFsc2UpO1xuXG5cdGFkZEFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGFwcGx5QnV0dG9uQWN0aW9uKGVsZW1lbnQsIGFkZEFwcGx5QnRuLCB2YWx1ZUlucHV0TGFiZWwsIG5hbWVJbnB1dExhYmVsLCBhcnIsIGxpc3QsIHJvdyk7XG5cdH0sIGZhbHNlKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJQb3B1cFNlY3Rpb259O1xuIl19
