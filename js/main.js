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

},{"./modules/console_listen.js":6,"./modules/dt_console_api.js":9,"./modules/load_styles.js":12,"./modules/render_browser_info.js":14,"./modules/render_console.js":15,"./modules/render_inspector.js":20}],2:[function(require,module,exports){
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

},{"./render_attribute_input.js":13}],4:[function(require,module,exports){
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

},{"./render_console.js":15}],6:[function(require,module,exports){
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

},{"./global_eval.js":10,"./render_console.js":15,"./render_console_message.js":16}],7:[function(require,module,exports){
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
}; /* dom_element_listen.js, v. 0.1.0, 21.04.2017, @ filip-swinarski */

exports.domElementListen = domElementListen;

},{"./render_popup.js":21}],9:[function(require,module,exports){
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
/* highlight_box_action.js, v. 0.1.0, 18.09.2017, @ filip-swinarski */

var highlightBoxAction = function highlightBoxAction(element) {

	if (element.style.cssText.match(/background-color: rgb\(170, 221, 255\) \!important/)) {
		element.style.cssText = element.style.cssText.replace(/background-color: rgb\(170, 221, 255\) \!important/, '');
	} else if (element.style.cssText.match(/background-color: \#adf \!important/)) {
		element.style.cssText = element.style.cssText.replace(/background-color: \#adf \!important/, '');
	} else {
		element.style.cssText += 'background-color: #adf !important';
	}
};

exports.highlightBoxAction = highlightBoxAction;

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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
}; /* render_browser_info.js, v. 0.1.1, 15.04.2017, @ filip-swinarski */

exports.renderBrowserInfo = renderBrowserInfo;

},{"./render_header.js":19}],15:[function(require,module,exports){
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

},{"./console_listen":6,"./render_header.js":19}],16:[function(require,module,exports){
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

},{"./render_console_output.js":17}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./dom_element_listen.js":8}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./render_dom.js":18,"./render_header.js":19}],21:[function(require,module,exports){
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

},{"./render_popup_section.js":22}],22:[function(require,module,exports){
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
	var sectionName = '';

	header.innerHTML = '<span class="popup__headline">' + title + '</span>';
	header.classList.add('popup__header');
	listWrapper.appendChild(header);
	listWrapper.classList.add('popup__section');
	listWrapper.classList.add('popup__section--' + sectionName);

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

		if (element.style.cssText.match(/background-color: rgb\(170, 221, 255\) \!important/) || element.style.cssText.match(/background-color: \#adf \!important/)) highlightCheckbox.checked = true;

		highlightCheckbox.addEventListener('change', function () {
			(0, _highlight_box_action.highlightBoxAction)(element);
		}, false);
	}
}; /* render_popup_section.js, v. 0.1.2, 18.09.2017, @ filip-swinarski */

exports.renderPopupSection = renderPopupSection;

},{"./add_button_action.js":2,"./apply_button_action.js":3,"./cancel_button_action.js":4,"./highlight_box_action.js":11,"./render_attribute_input.js":13}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGFkZF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcYXBwbHlfYnV0dG9uX2FjdGlvbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNhbmNlbF9idXR0b25fYWN0aW9uLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9jbGVhci5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkb21fZWxlbWVudF9saXN0ZW4uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxsb2FkX3N0eWxlcy5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9hdHRyaWJ1dGVfaW5wdXQuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2RvbS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9oZWFkZXIuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfaW5zcGVjdG9yLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX3BvcHVwLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX3BvcHVwX3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsU0FBbkI7Ozs7Ozs7O0FDcEJBOztBQUVBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsU0FBdEIsRUFBaUMsVUFBakMsRUFBNkMsTUFBN0MsRUFBd0Q7QUFDN0UsVUFBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLHlCQUExQjtBQUNBLFdBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQiwwQkFBM0I7QUFDQSxXQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsNkJBQTNCO0FBQ0EsWUFBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLDZCQUE1QjtBQUNBLFVBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1Qix3QkFBdkI7QUFDQSxXQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IseUJBQXhCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLDRCQUF4QjtBQUNBLFlBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5Qiw0QkFBekI7QUFDQSxRQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIseUJBQXJCO0FBQ0EsQ0FWRDs7UUFZUSxlLEdBQUEsZTs7Ozs7Ozs7OztBQ1pSOztBQUVBLElBQUksb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFDLE9BQUQsRUFBVSxHQUFWLEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUFzQyxHQUF0QyxFQUEyQyxJQUEzQyxFQUFpRCxHQUFqRCxFQUFzRCxNQUF0RCxFQUFpRTs7QUFFeEYsS0FBSSxZQUFZLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFoQjtBQUNBLEtBQUksYUFBYSxXQUFXLGFBQVgsQ0FBeUIsT0FBekIsQ0FBakI7QUFDQSxLQUFJLFlBQVksVUFBVSxhQUFWLENBQXdCLE9BQXhCLENBQWhCO0FBQ0EsS0FBSSxRQUFRLFdBQVcsS0FBdkI7QUFDQSxLQUFJLE9BQU8sVUFBVSxLQUFyQjtBQUNBLEtBQUksc0JBQUo7QUFDQSxLQUFJLHFCQUFKOztBQUVBLE1BQUssU0FBTCxHQUFpQixFQUFqQjs7QUFFQSxLQUFJLElBQUksRUFBSixLQUFXLGNBQWYsRUFBK0I7QUFDOUIsaUJBQWUsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWY7QUFDQSxrQkFBZ0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWhCO0FBQ0EsVUFBUSxZQUFSLENBQXFCLElBQXJCLEVBQTJCLEtBQTNCO0FBQ0EsUUFBTSxHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQWUsUUFBUSxVQUF2QixFQUFtQztBQUFBLFVBQVEsS0FBSyxJQUFMLEtBQWMsT0FBdEI7QUFBQSxHQUFuQyxDQUFOO0FBQ0EsS0FBRyxPQUFILENBQVcsSUFBWCxDQUFnQixHQUFoQixFQUFxQixVQUFDLElBQUQsRUFBVTtBQUM5QixnREFBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsR0FBL0IsRUFBb0MsS0FBSyxJQUF6QyxFQUErQyxLQUFLLEtBQXBEO0FBQ0EsR0FGRDtBQUdBLGVBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixzQkFBM0I7QUFDQSxnQkFBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLHVCQUE1QjtBQUNBLGVBQWEsU0FBYixHQUF5QixJQUF6QjtBQUNBLGdCQUFjLFNBQWQsU0FBOEIsS0FBOUI7QUFDQSxZQUFVLFNBQVYsR0FBc0IsR0FBdEI7QUFDQSxNQUFJLFlBQUosQ0FBaUIsWUFBakIsRUFBK0IsSUFBSSxTQUFuQztBQUNBLE1BQUksWUFBSixDQUFpQixTQUFqQixFQUE0QixJQUFJLFNBQWhDO0FBQ0EsTUFBSSxZQUFKLENBQWlCLGFBQWpCLEVBQWdDLElBQUksU0FBcEM7QUFDQTs7QUFFRCxLQUFJLElBQUksRUFBSixLQUFXLGVBQWYsRUFBZ0M7O0FBRS9CLE1BQUksWUFBWSxHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQWUsU0FBUyxnQkFBVCxDQUEwQix1QkFBMUIsQ0FBZixFQUFtRSxVQUFDLEVBQUQ7QUFBQSxVQUFRLEdBQUcsU0FBSCxLQUFpQixPQUF6QjtBQUFBLEdBQW5FLEVBQXFHLENBQXJHLENBQWhCOztBQUVBLGlCQUFlLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0Esa0JBQWdCLFVBQVUsV0FBVixDQUFzQixXQUF0QztBQUNBLFVBQVEsS0FBUixDQUFjLElBQWQsSUFBc0IsS0FBdEI7QUFDQSxNQUFJLElBQUosQ0FBWSxJQUFaLFVBQXFCLEtBQXJCO0FBQ0EsZ0JBQWMsU0FBZCxHQUEwQixHQUExQjtBQUNBLEtBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0IsR0FBaEIsRUFBcUIsVUFBQyxJQUFELEVBQU8sQ0FBUCxFQUFhO0FBQ2pDLGdEQUFnQixPQUFoQixFQUF5QixJQUF6QixFQUErQixHQUEvQixFQUFvQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLENBQWpCLENBQXBDLEVBQXlELEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsQ0FBakIsRUFBb0IsT0FBcEIsQ0FBNEIsR0FBNUIsRUFBaUMsRUFBakMsQ0FBekQ7O0FBRUEsT0FBRyxNQUFNLENBQVQsRUFDQyxjQUFjLFNBQWQsSUFBMkIsR0FBM0I7O0FBRUQsaUJBQWMsU0FBZCxJQUE4QixLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLENBQWpCLENBQTlCLFVBQXNELEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsQ0FBakIsQ0FBdEQ7O0FBRUEsT0FBSSxJQUFJLElBQUksTUFBSixHQUFhLENBQXJCLEVBQ0MsY0FBYyxTQUFkLElBQTJCLEdBQTNCO0FBRUQsR0FYRDtBQVlBLGdCQUFjLFNBQWQsSUFBMkIsR0FBM0I7QUFDQTs7QUFFRCxXQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsNkJBQXhCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLDRCQUEzQjtBQUNBLFFBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3Qix5QkFBeEI7QUFDQSxZQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsNkJBQXpCO0FBQ0EsWUFBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLDRCQUE1QjtBQUNBLFdBQVUsS0FBVixHQUFrQixFQUFsQjtBQUNBLFlBQVcsS0FBWCxHQUFtQixFQUFuQjtBQUNBLEtBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IseUJBQWxCO0FBQ0EsS0FBSSxTQUFKLENBQWMsTUFBZCxDQUFxQix3QkFBckI7QUFFQSxDQWhFRCxDLENBSkE7O1FBc0VRLGlCLEdBQUEsaUI7Ozs7Ozs7O0FDdEVSOztBQUVBLElBQUkscUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFVBQXRCLEVBQWtDLFNBQWxDLEVBQTZDLE1BQTdDLEVBQXdEOztBQUVoRixLQUFJLGFBQWEsV0FBVyxhQUFYLENBQXlCLE9BQXpCLENBQWpCO0FBQ0EsS0FBSSxZQUFZLFVBQVUsYUFBVixDQUF3QixPQUF4QixDQUFoQjs7QUFFQSxXQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsNkJBQXhCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLDRCQUEzQjtBQUNBLFFBQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3Qix5QkFBeEI7QUFDQSxZQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsNkJBQXpCO0FBQ0EsWUFBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLDRCQUE1QjtBQUNBLFdBQVUsS0FBVixHQUFrQixFQUFsQjtBQUNBLFlBQVcsS0FBWCxHQUFtQixFQUFuQjtBQUNBLFVBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1Qix5QkFBdkI7QUFDQSxVQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsd0JBQTFCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLDBCQUF4QjtBQUNBLFdBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQix5QkFBM0I7QUFFQSxDQWpCRDs7UUFtQlEsa0IsR0FBQSxrQjs7Ozs7Ozs7OztBQ25CUjs7QUFFQSxJQUFJLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDckIsbUNBQWUsU0FBZixHQUEyQixFQUEzQjtBQUNILENBRkQsQyxDQUpBOztRQVFRLFksR0FBQSxZOzs7Ozs7Ozs7O0FDTlI7O0FBRUE7O0FBQ0E7O0FBTEE7O0FBT0EsSUFBSSxnQkFBZ0IsU0FBaEIsYUFBZ0IsR0FBTTs7QUFFdEIsV0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDLEtBQUQsRUFBVzs7QUFFeEMsWUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsWUFBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLFlBQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUF0QjtBQUNBLFlBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbEI7QUFDQSxZQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWxCO0FBQ0EsWUFBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCO0FBQ0EsWUFBSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFsQjs7QUFFQSxZQUFJLFNBQUosQ0FBYyxHQUFkLENBQWtCLGNBQWxCO0FBQ0Esb0JBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxxQkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLGdCQUEzQjtBQUNBLHFCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIscUJBQTNCO0FBQ0Esd0JBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLGtCQUE5QjtBQUNBLG9CQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsa0JBQTFCO0FBQ0Esb0JBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxzQkFBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLHVCQUE1Qjs7QUFFQSx3QkFBZ0IsU0FBaEIsSUFBNkIsTUFBTSxPQUFuQztBQUNBLG9CQUFZLFNBQVosSUFBeUIsTUFBTSxRQUEvQjtBQUNBLG9CQUFZLFNBQVosSUFBeUIsTUFBTSxNQUEvQjtBQUNBLHNCQUFjLFNBQWQsSUFBMkIsTUFBTSxRQUFqQzs7QUFFQSxxQkFBYSxXQUFiLENBQXlCLFdBQXpCO0FBQ0EscUJBQWEsV0FBYixDQUF5QixlQUF6QjtBQUNBLHFCQUFhLFdBQWIsQ0FBeUIsV0FBekI7QUFDQSxxQkFBYSxXQUFiLENBQXlCLFdBQXpCO0FBQ0EscUJBQWEsV0FBYixDQUF5QixhQUF6QjtBQUNBLFlBQUksV0FBSixDQUFnQixZQUFoQjtBQUNBLHVDQUFlLFdBQWYsQ0FBMkIsR0FBM0I7QUFFSCxLQWhDRCxFQWdDRyxLQWhDSDs7QUFrQ0EsbUNBQWUsZ0JBQWYsQ0FBZ0MsS0FBaEMsRUFBdUMsVUFBQyxDQUFELEVBQU87O0FBRTFDLFlBQUksTUFBTSxrREFBcUIsRUFBRSxNQUF2QixDQUFWOztBQUVBLFlBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsY0FBbEI7QUFDQSx1Q0FBZSxXQUFmLENBQTJCLEdBQTNCO0FBQ0gsS0FORCxFQU1HLEtBTkg7O0FBUUEsaUNBQWEsZ0JBQWIsQ0FBOEIsVUFBOUIsRUFBMEMsVUFBQyxDQUFELEVBQU87O0FBRTdDLFlBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7O0FBRWxCLGdCQUFJLFFBQVEsNkJBQVcsNkJBQWEsS0FBeEIsQ0FBWjs7QUFFQSxzQkFBVSxHQUFWLENBQWMsS0FBZCxFQUFxQiw2QkFBYSxLQUFsQztBQUNBLHlDQUFhLEtBQWIsR0FBcUIsRUFBckI7QUFDSDtBQUVKLEtBVkQ7QUFZSCxDQXhERDs7UUEwRFEsYSxHQUFBLGE7Ozs7Ozs7Ozs7QUMvRFI7O0FBRUEsSUFBSSxhQUFhLFNBQWIsVUFBYSxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCOztBQUU3QixRQUFJLE1BQU0sSUFBSSxXQUFKLENBQWdCLEtBQWhCLEVBQXVCLEVBQUMsUUFBUSxDQUFDLEdBQUQsRUFBTSxLQUFOLENBQVQsRUFBdkIsQ0FBVjs7QUFFQSxtQ0FBZSxhQUFmLENBQTZCLEdBQTdCO0FBRUgsQ0FORCxDLENBSkE7O1FBWVEsVSxHQUFBLFU7Ozs7Ozs7Ozs7QUNWUjs7QUFFQSxJQUFJLG1CQUFtQixTQUFuQixnQkFBbUIsQ0FBQyxJQUFELEVBQU8sR0FBUCxFQUFZLEtBQVosRUFBc0I7O0FBRTVDLEtBQUksa0JBQUo7QUFDQSxLQUFJLGFBQUo7QUFDQSxLQUFJLGVBQUo7QUFDQSxLQUFJLGVBQUo7QUFDQSxLQUFJLGFBQUo7QUFDQSxLQUFJLGFBQUo7QUFDQSxLQUFJLGNBQUo7QUFDQSxLQUFJLGNBQUo7QUFDQSxLQUFJLE9BQU8sQ0FBWDtBQUNBLEtBQUksT0FBTyxDQUFYOztBQUVBLEtBQUksZ0JBQUosQ0FBcUIsWUFBckIsRUFBbUMsVUFBQyxDQUFELEVBQU87QUFDekMsY0FBWSxJQUFJLElBQUosRUFBWjtBQUNBLFNBQU8sRUFBRSxPQUFGLENBQVUsQ0FBVixDQUFQO0FBQ0EsV0FBUyxLQUFLLEtBQWQ7QUFDQSxXQUFTLEtBQUssS0FBZDtBQUNBLEVBTEQsRUFLRyxLQUxIO0FBTUEsS0FBSSxnQkFBSixDQUFxQixXQUFyQixFQUFrQyxVQUFDLENBQUQsRUFBTztBQUN4QyxTQUFPLEVBQUUsY0FBRixDQUFpQixDQUFqQixDQUFQO0FBQ0EsU0FBTyxLQUFLLEtBQVo7QUFDQSxTQUFPLEtBQUssS0FBWjtBQUNBLFVBQVEsT0FBTyxNQUFmO0FBQ0EsVUFBUSxPQUFPLE1BQWY7O0FBRUEsTUFBSSxLQUFLLEdBQUwsQ0FBUyxLQUFULElBQWtCLElBQXRCLEVBQ0MsT0FBTyxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQVA7O0FBRUQsTUFBSSxLQUFLLEdBQUwsQ0FBUyxLQUFULElBQWtCLElBQXRCLEVBQ0MsT0FBTyxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQVA7QUFFRCxFQWJELEVBYUcsS0FiSDtBQWNBLEtBQUksZ0JBQUosQ0FBcUIsVUFBckIsRUFBaUMsVUFBQyxDQUFELEVBQU87O0FBRXZDLE1BQUksVUFBVSxJQUFJLElBQUosRUFBZDtBQUNBLE1BQUksVUFBVSxVQUFVLFNBQXhCOztBQUVBLFNBQU8sRUFBRSxjQUFGLENBQWlCLENBQWpCLENBQVA7QUFDQSxTQUFPLEtBQUssS0FBWjtBQUNBLFNBQU8sS0FBSyxLQUFaO0FBQ0EsVUFBUSxPQUFPLE1BQWY7QUFDQSxVQUFRLE9BQU8sTUFBZjs7QUFFQSxNQUFJLFFBQVEsRUFBUixJQUFjLFFBQVEsRUFBMUIsRUFBOEI7O0FBRTdCLE9BQUksV0FBVyxHQUFmLEVBQW9CO0FBQ25CLFFBQUksU0FBSixDQUFjLE1BQWQsQ0FBcUIsMEJBQXJCO0FBQ0EsUUFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQiwyQkFBckI7O0FBRUEsUUFBSSxNQUFNLFNBQU4sQ0FBZ0IsUUFBaEIsQ0FBeUIsK0JBQXpCLEtBQ0gsTUFBTSxTQUFOLENBQWdCLFFBQWhCLENBQXlCLGdDQUF6QixDQURELEVBQzZEO0FBQzVELFdBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QiwrQkFBdkI7QUFDQSxXQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsZ0NBQXZCO0FBQ0E7QUFFRCxJQVZELE1BVU87QUFDTixtQ0FBWSxJQUFaLEVBQWtCLEdBQWxCO0FBQ0E7QUFFRDs7QUFFRCxTQUFPLENBQVA7QUFDQSxTQUFPLENBQVA7QUFFQSxFQWhDRCxFQWdDRyxLQWhDSDtBQWlDQSxDQWxFRCxDLENBSkE7O1FBd0VRLGdCLEdBQUEsZ0I7Ozs7Ozs7Ozs7QUN0RVI7O0FBQ0E7O0FBSEE7O0FBS0EsSUFBSSxNQUFNLFNBQU4sR0FBTSxDQUFDLEtBQUQsRUFBcUI7QUFBQSxRQUFiLEdBQWEsdUVBQVAsRUFBTzs7QUFDM0IsaUNBQVcsR0FBWCxFQUFnQixLQUFoQjtBQUNILENBRkQ7O0FBSUEsSUFBSSxtQ0FBSjs7UUFFUSxHLEdBQUEsRztRQUNBLEssR0FBQSxLOzs7Ozs7OztBQ1pSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTSxhQUFhLFNBQWIsVUFBYSxDQUFDLEdBQUQsRUFBUzs7QUFFeEIsaUJBRndCLENBRVY7O0FBRWQsUUFBSSxJQUFJLFVBQUosQ0FBZSxNQUFmLEtBQTBCLElBQUksVUFBSixDQUFlLFFBQWYsQ0FBOUIsRUFBd0Q7QUFBRTs7QUFFdEQsWUFBSSxlQUFKOztBQUVBLFlBQUksU0FBUyxjQUFULENBQXdCLFdBQXhCLENBQUosRUFBMEM7QUFDdEMscUJBQVMsY0FBVCxDQUF3QixXQUF4QixFQUFxQyxNQUFyQztBQUNIOztBQUVELGlCQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFUO0FBQ0EsZUFBTyxFQUFQLEdBQVksV0FBWjtBQUNBLGVBQU8sU0FBUCxHQUFtQixHQUFuQjtBQUNBLGlCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQTFCO0FBQ0EsZUFBTyxTQUFQLENBWm9ELENBWWxDO0FBQ3JCLEtBYkQsTUFhTztBQUFFO0FBQ0wsZUFBTyxDQUFDLEdBQUcsSUFBSixFQUFVLEdBQVYsQ0FBUCxDQURHLENBQ29CO0FBQzFCO0FBQ0osQ0FwQkQ7O1FBc0JRLFUsR0FBQSxVOzs7Ozs7OztBQzVCUjs7QUFFQSxJQUFJLHFCQUFxQixTQUFyQixrQkFBcUIsVUFBVzs7QUFFbkMsS0FBSSxRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLEtBQXRCLENBQTRCLG9EQUE1QixDQUFKLEVBQXVGO0FBQ3RGLFVBQVEsS0FBUixDQUFjLE9BQWQsR0FDQyxRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLE9BQXRCLENBQThCLG9EQUE5QixFQUFvRixFQUFwRixDQUREO0FBRUEsRUFIRCxNQUdPLElBQUksUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixLQUF0QixDQUE0QixxQ0FBNUIsQ0FBSixFQUF3RTtBQUM5RSxVQUFRLEtBQVIsQ0FBYyxPQUFkLEdBQ0MsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixPQUF0QixDQUE4QixxQ0FBOUIsRUFBcUUsRUFBckUsQ0FERDtBQUVBLEVBSE0sTUFHQTtBQUNOLFVBQVEsS0FBUixDQUFjLE9BQWQsSUFBeUIsbUNBQXpCO0FBQ0E7QUFFRCxDQVpEOztRQWNRLGtCLEdBQUEsa0I7Ozs7Ozs7O0FDaEJSOztBQUVBLElBQUksYUFBYSxTQUFiLFVBQWEsR0FBTTs7QUFFbkIsUUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBQ0EsUUFBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFqQjs7QUFFQSxXQUFPLEdBQVAsR0FBYSxZQUFiO0FBQ0EsV0FBTyxJQUFQLEdBQWMsVUFBZDtBQUNBLFdBQU8sS0FBUCxHQUFlLFFBQWY7QUFDQSxXQUFPLElBQVAsR0FBYyxnQkFBZDtBQUNBLFdBQU8sR0FBUCxHQUFhLFlBQWI7QUFDQSxXQUFPLElBQVAsR0FBYyxVQUFkO0FBQ0EsV0FBTyxLQUFQLEdBQWUsUUFBZjtBQUNBLFdBQU8sSUFBUCxHQUFjLDJFQUFkO0FBQ0EsYUFBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5QyxXQUF6QyxDQUFxRCxVQUFyRDtBQUNBLGFBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUMsV0FBekMsQ0FBcUQsTUFBckQ7QUFDSCxDQWZEOztRQWlCUSxVLEdBQUEsVTs7Ozs7Ozs7QUNuQlI7O0FBRUEsSUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUIsS0FBekIsRUFBbUM7O0FBRXhELEtBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBLEtBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBLEtBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBaEI7QUFDQSxLQUFJLFdBQVcsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxLQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWxCOztBQUVBLE9BQU0sSUFBTixHQUFhLE1BQWI7QUFDQSxPQUFNLEtBQU4sR0FBYyxLQUFkOztBQUVBLEtBQUksUUFBUSxFQUFSLElBQWMsWUFBbEIsRUFDQyxNQUFNLEtBQU4sSUFBZSxHQUFmOztBQUVELE9BQU0sU0FBTixHQUFrQixJQUFsQjtBQUNBLFVBQVMsU0FBVCxHQUFxQixPQUFyQjtBQUNBLFdBQVUsU0FBVixHQUFzQixHQUF0QjtBQUNBLGFBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixxQkFBMUI7QUFDQSxPQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsbUJBQXBCO0FBQ0EsT0FBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLG1CQUFwQjtBQUNBLFVBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixpQkFBdkI7QUFDQSxVQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsNEJBQXZCO0FBQ0EsV0FBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLHVCQUF4Qjs7QUFFQSxPQUFNLFdBQU4sQ0FBa0IsU0FBbEI7QUFDQSxPQUFNLFdBQU4sQ0FBa0IsS0FBbEI7QUFDQSxPQUFNLFdBQU4sQ0FBa0IsUUFBbEI7QUFDQSxhQUFZLFdBQVosQ0FBd0IsS0FBeEI7QUFDQSxTQUFRLFdBQVIsQ0FBb0IsV0FBcEI7O0FBRUEsT0FBTSxnQkFBTixDQUF1QixVQUF2QixFQUFtQyxVQUFDLENBQUQsRUFBTzs7QUFFekMsTUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjs7QUFFckIsT0FBSSxtQkFBbUIsSUFBSSxnQkFBSixDQUFxQix1QkFBckIsQ0FBdkI7QUFDQSxPQUFJLG9CQUFvQixJQUFJLGdCQUFKLENBQXFCLHdCQUFyQixDQUF4Qjs7QUFFQSxPQUFJLFFBQVEsRUFBUixJQUFjLFdBQWxCLEVBQ0MsR0FBRyxVQUFILENBQWMsSUFBZCxFQUFvQixLQUFwQixHQUE0QixNQUFNLEtBQWxDOztBQUVELE9BQUksUUFBUSxFQUFSLElBQWMsWUFBbEIsRUFDQyxHQUFHLEtBQUgsQ0FBUyxJQUFULElBQWlCLE1BQU0sS0FBTixDQUFZLE9BQVosQ0FBb0IsR0FBcEIsRUFBeUIsRUFBekIsQ0FBakI7O0FBRUQsTUFBRyxPQUFILENBQVcsSUFBWCxDQUFnQixnQkFBaEIsRUFBa0MsVUFBQyxVQUFELEVBQWEsQ0FBYixFQUFtQjs7QUFFcEQsUUFBSSxXQUFXLFNBQVgsS0FBeUIsSUFBekIsSUFBaUMsUUFBUSxFQUFSLElBQWMsV0FBbkQsRUFBZ0U7QUFDL0QsdUJBQWtCLENBQWxCLEVBQXFCLFNBQXJCLFNBQXFDLE1BQU0sS0FBM0M7QUFDQSxnQkFBVyxTQUFYLEdBQXVCLElBQXZCO0FBQ0E7O0FBRUQsUUFBSSxXQUFXLFNBQVgsS0FBeUIsT0FBekIsSUFBb0MsUUFBUSxFQUFSLElBQWMsWUFBdEQsRUFBb0U7O0FBRW5FLFNBQUksU0FBUyxRQUFRLGdCQUFSLENBQXlCLE9BQXpCLENBQWI7QUFDQSxTQUFJLFNBQVEsRUFBWjs7QUFFQSxRQUFHLE9BQUgsQ0FBVyxJQUFYLENBQWdCLE1BQWhCLEVBQXdCLFVBQUMsS0FBRCxFQUFRLENBQVIsRUFBYztBQUNyQyxnQkFBUyxNQUFNLFVBQU4sQ0FBaUIsSUFBMUI7QUFDQSxnQkFBUyxJQUFUO0FBQ0EsZ0JBQVMsTUFBTSxhQUFOLENBQW9CLE9BQXBCLEVBQTZCLEtBQXRDOztBQUVBLFVBQUksSUFBSSxPQUFPLE1BQVAsR0FBZ0IsQ0FBeEIsRUFDQyxVQUFTLEdBQVQ7QUFDRCxNQVBEO0FBUUEsdUJBQWtCLENBQWxCLEVBQXFCLFNBQXJCLFNBQXFDLE1BQXJDO0FBQ0E7QUFFRCxJQXZCRDs7QUF5QkEsWUFBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLDJCQUExQjtBQUNBLFlBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1Qiw0QkFBdkI7QUFDQTtBQUVELEVBMUNELEVBMENHLEtBMUNIOztBQTRDQSxPQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3RDLFdBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QiwyQkFBdkI7QUFDQSxXQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsNEJBQTFCO0FBQ0EsRUFIRDs7QUFLQSxPQUFNLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFdBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQiwyQkFBMUI7QUFDQSxXQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsNEJBQXZCO0FBQ0EsRUFIRDs7QUFLQSxVQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQUMsQ0FBRCxFQUFPOztBQUV6QyxNQUFJLG1CQUFtQixJQUFJLGdCQUFKLENBQXFCLHVCQUFyQixDQUF2QjtBQUNBLE1BQUksb0JBQW9CLElBQUksZ0JBQUosQ0FBcUIsd0JBQXJCLENBQXhCOztBQUVBLE1BQUksUUFBUSxFQUFSLElBQWMsV0FBbEIsRUFDQyxHQUFHLFVBQUgsQ0FBYyxJQUFkLEVBQW9CLEtBQXBCLEdBQTRCLE1BQU0sS0FBbEM7O0FBRUQsTUFBSSxRQUFRLEVBQVIsSUFBYyxZQUFsQixFQUNDLEdBQUcsS0FBSCxDQUFTLElBQVQsSUFBaUIsTUFBTSxLQUFOLENBQVksT0FBWixDQUFvQixHQUFwQixFQUF5QixFQUF6QixDQUFqQjs7QUFFRCxLQUFHLE9BQUgsQ0FBVyxJQUFYLENBQWdCLGdCQUFoQixFQUFrQyxVQUFDLFVBQUQsRUFBYSxDQUFiLEVBQW1COztBQUVwRCxPQUFJLFdBQVcsU0FBWCxLQUF5QixJQUF6QixJQUFpQyxRQUFRLEVBQVIsSUFBYyxXQUFuRCxFQUFnRTtBQUMvRCxzQkFBa0IsQ0FBbEIsRUFBcUIsU0FBckIsU0FBcUMsTUFBTSxLQUEzQztBQUNBLGVBQVcsU0FBWCxHQUF1QixJQUF2QjtBQUNBOztBQUVELE9BQUksV0FBVyxTQUFYLEtBQXlCLE9BQXpCLElBQW9DLFFBQVEsRUFBUixJQUFjLFlBQXRELEVBQW9FOztBQUVuRSxRQUFJLFNBQVMsUUFBUSxnQkFBUixDQUF5QixPQUF6QixDQUFiO0FBQ0EsUUFBSSxVQUFRLEVBQVo7O0FBRUEsT0FBRyxPQUFILENBQVcsSUFBWCxDQUFnQixNQUFoQixFQUF3QixVQUFDLEtBQUQsRUFBUSxDQUFSLEVBQWM7QUFDckMsZ0JBQVMsTUFBTSxVQUFOLENBQWlCLElBQTFCO0FBQ0EsZ0JBQVMsSUFBVDtBQUNBLGdCQUFTLE1BQU0sYUFBTixDQUFvQixPQUFwQixFQUE2QixLQUF0Qzs7QUFFQSxTQUFJLElBQUksT0FBTyxNQUFQLEdBQWdCLENBQXhCLEVBQ0MsV0FBUyxHQUFUO0FBQ0QsS0FQRDtBQVFBLHNCQUFrQixDQUFsQixFQUFxQixTQUFyQixTQUFxQyxPQUFyQztBQUNBO0FBRUQsR0F2QkQ7O0FBeUJBLFdBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQiwyQkFBMUI7QUFDQSxXQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsNEJBQXZCO0FBRUEsRUF2Q0QsRUF1Q0csS0F2Q0g7QUF3Q0EsQ0E1SEQ7O1FBOEhRLGUsR0FBQSxlOzs7Ozs7Ozs7O0FDOUhSOztBQUVBLElBQUksb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFDLEtBQUQsRUFBVzs7QUFFL0IsUUFBTSxxQkFBcUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQTNCO0FBQ0EsUUFBTSx1QkFBdUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQTdCOztBQUVBLHlCQUFxQixFQUFyQixHQUEwQixTQUExQjtBQUNBLHlCQUFxQixTQUFyQixDQUErQixHQUEvQixDQUFtQyxTQUFuQztBQUNBLHlCQUFxQixTQUFyQixDQUErQixHQUEvQixDQUFtQyxnQkFBbkM7QUFDQSx1QkFBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsa0JBQWpDO0FBQ0EsdUJBQW1CLEVBQW5CLEdBQXdCLGlCQUF4QjtBQUNBLHFDQUFhLG9CQUFiLEVBQW1DLEtBQW5DO0FBQ0EseUJBQXFCLFdBQXJCLENBQWlDLGtCQUFqQztBQUNBLFVBQU0sV0FBTixDQUFrQixvQkFBbEI7O0FBRUEsdUJBQW1CLFNBQW5CLElBQWdDLG9CQUFvQixVQUFVLFdBQTlCLEdBQTRDLFFBQTVFO0FBQ0EsdUJBQW1CLFNBQW5CLElBQWdDLHVCQUF1QixVQUFVLFVBQWpDLEdBQThDLFFBQTlFO0FBQ0EsdUJBQW1CLFNBQW5CLElBQWdDLG9CQUFvQixVQUFVLFFBQTlCLEdBQXlDLFFBQXpFO0FBQ0EsdUJBQW1CLFNBQW5CLElBQWdDLHNCQUFzQixVQUFVLFNBQWhDLEdBQTRDLFFBQTVFOztBQUVBLHVCQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyw2QkFBakM7QUFFSCxDQXJCRCxDLENBSkE7O1FBMkJRLGlCLEdBQUEsaUI7Ozs7Ozs7Ozs7QUN6QlI7O0FBQ0E7O0FBSEE7O0FBS0EsSUFBTSxpQkFBaUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0EsSUFBTSxlQUFlLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFyQjtBQUNBLElBQU0sbUJBQW1CLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF6QjtBQUNBLElBQU0scUJBQXFCLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUEzQjs7QUFFQSxpQkFBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsU0FBL0I7QUFDQSxpQkFBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsY0FBL0I7QUFDQSxlQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsa0JBQTdCO0FBQ0EsZUFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLDZCQUE3QjtBQUNBLGVBQWUsRUFBZixHQUFvQixpQkFBcEI7QUFDQSxhQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsZ0JBQTNCO0FBQ0EsYUFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLDJCQUEzQjtBQUNBLGFBQWEsRUFBYixHQUFrQixlQUFsQjtBQUNBLGFBQWEsSUFBYixHQUFvQixNQUFwQjtBQUNBLG1CQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxpQkFBakM7QUFDQSxpQkFBaUIsRUFBakIsR0FBc0IsU0FBdEI7QUFDQSxtQkFBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsNEJBQWpDOztBQUVBLElBQUksZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsS0FBRCxFQUFXOztBQUUzQixxQ0FBYSxnQkFBYixFQUErQixLQUEvQjtBQUNBLHFCQUFpQixXQUFqQixDQUE2QixrQkFBN0I7QUFDQSxxQkFBaUIsV0FBakIsQ0FBNkIsY0FBN0I7QUFDQSxxQkFBaUIsV0FBakIsQ0FBNkIsWUFBN0I7QUFDQSxVQUFNLFdBQU4sQ0FBa0IsZ0JBQWxCO0FBQ0E7QUFFSCxDQVREOztRQVdRLGEsR0FBQSxhO1FBQ0EsYyxHQUFBLGM7UUFDQSxZLEdBQUEsWTs7Ozs7Ozs7OztBQ2xDUjs7QUFFQSxJQUFJLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBQyxRQUFELEVBQWM7O0FBRXJDLFFBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7O0FBRUEsUUFBSSxTQUFTLENBQVQsQ0FBSixFQUFpQjs7QUFFYixZQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5COztBQUVBLHFCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsZ0JBQTNCO0FBQ0EscUJBQWEsU0FBYixrREFBc0UsU0FBUyxDQUFULENBQXRFO0FBQ0Esa0JBQVUsV0FBVixDQUFzQixZQUF0QjtBQUNIOztBQUVELFFBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFwQjs7QUFFQSxrQkFBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLGdCQUE1QjtBQUNBLGtCQUFjLFNBQWQ7QUFDQSxvREFBb0IsU0FBUyxDQUFULENBQXBCLEVBQWlDLGFBQWpDO0FBQ0EsY0FBVSxXQUFWLENBQXNCLGFBQXRCO0FBQ0EsV0FBTyxTQUFQO0FBQ0gsQ0FwQkQsQyxDQUpBOztRQTBCUSxvQixHQUFBLG9COzs7Ozs7OztBQzFCUjs7QUFFQSxJQUFJLHNCQUFzQixTQUF0QixtQkFBc0IsQ0FBQyxHQUFELEVBQXlDO0FBQUEsUUFBbkMsT0FBbUMsdUVBQXpCLFNBQVMsSUFBZ0I7QUFBQSxRQUFWLEtBQVU7OztBQUUvRCxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxRQUFJLFdBQVcsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQS9CLEVBQW9DLEtBQXBDLENBQTBDLEdBQTFDLEVBQStDLENBQS9DLENBQWY7QUFDQSxRQUFJLE9BQU8sRUFBWDs7QUFFQSxlQUFXLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFzQixTQUFTLE1BQVQsR0FBZ0IsQ0FBdEMsRUFBeUMsV0FBekMsRUFBWDtBQUNBLFdBQU8sU0FBUCxDQUFpQixHQUFqQixlQUFpQyxRQUFqQzs7QUFFQSxRQUFJLGFBQWEsUUFBYixJQUNBLGFBQWEsUUFEYixJQUVBLGFBQWEsV0FGYixJQUdBLGFBQWEsTUFIYixJQUlBLGFBQWEsUUFKYixJQUtBLGFBQWEsU0FMakIsRUFLNEI7QUFDeEIsZ0JBQVEsYUFBYSxRQUFiLFNBQTRCLEdBQTVCLFNBQXFDLEdBQTdDO0FBQ0EsZUFBTyxTQUFQLElBQW9CLElBQXBCO0FBQ0gsS0FSRCxNQVFPLElBQUksYUFBWSxVQUFoQixFQUE0QjtBQUMvQixnR0FBc0YsSUFBSSxJQUExRjtBQUNBLGVBQU8sU0FBUCxJQUFvQixJQUFwQjtBQUNILEtBSE0sTUFHQSxJQUFJLGFBQWEsT0FBYixJQUF3QixhQUFhLFFBQXpDLEVBQW1EOztBQUV0RCxhQUFLLElBQUksSUFBVCxJQUFpQixHQUFqQixFQUFzQjs7QUFFbEIsZ0JBQUksV0FBVyxhQUFhLE9BQWIsR0FBdUIsT0FBdkIsR0FBaUMsS0FBaEQ7QUFDQSxnQkFBSSxZQUFZLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixJQUFJLElBQUosQ0FBL0IsRUFBMEMsS0FBMUMsQ0FBZ0QsR0FBaEQsRUFBcUQsQ0FBckQsQ0FBaEI7O0FBRUEsd0JBQVksVUFBVSxTQUFWLENBQW9CLENBQXBCLEVBQXVCLFVBQVUsTUFBVixHQUFpQixDQUF4QyxFQUEyQyxXQUEzQyxFQUFaOztBQUdBLGdCQUFJLGNBQWMsUUFBZCxJQUNBLGNBQWMsUUFEZCxJQUVBLGNBQWMsV0FGZCxJQUdBLGNBQWMsTUFIZCxJQUlBLGNBQWMsUUFKZCxJQUtBLGNBQWMsU0FMbEIsRUFLNkI7O0FBRXpCLG9CQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWpCO0FBQ0Esb0JBQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbkI7O0FBRUEsMkJBQVcsU0FBWCxDQUFxQixHQUFyQixlQUFxQyxRQUFyQztBQUNBLDJCQUFXLFNBQVgsR0FBdUIsSUFBdkI7QUFDQSw2QkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLGdCQUEzQjtBQUNBLDZCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsZUFBdUMsU0FBdkM7QUFDQSw2QkFBYSxTQUFiLEdBQXlCLGNBQWMsUUFBZCxTQUE2QixJQUFJLElBQUosQ0FBN0IsU0FBNEMsSUFBSSxJQUFKLENBQXJFO0FBQ0EsdUJBQU8sV0FBUCxDQUFtQixVQUFuQjtBQUNBLHVCQUFPLFdBQVAsQ0FBbUIsWUFBbkI7QUFDSCxhQWpCRCxNQWlCTyxJQUFJLGNBQWEsVUFBakIsRUFBNkI7QUFDaEMsd0dBQXNGLElBQUksSUFBMUY7QUFDQSx1QkFBTyxTQUFQLElBQW9CLElBQXBCO0FBQ0gsYUFITSxNQUdBOztBQUVILG9CQUFJLGNBQWEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWpCOztBQUVBLDRCQUFXLFNBQVgsQ0FBcUIsR0FBckIsZUFBcUMsUUFBckM7QUFDQSw0QkFBVyxTQUFYLEdBQXVCLElBQXZCO0FBQ0EsdUJBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixnQkFBckI7QUFDQSx1QkFBTyxXQUFQLENBQW1CLFdBQW5CO0FBQ0Esb0NBQW9CLElBQUksSUFBSixDQUFwQixFQUErQixNQUEvQixFQUF1QyxJQUF2QztBQUNIO0FBRUo7QUFFSixLQTNDTSxNQTJDQTtBQUNILGVBQU8sU0FBUCxHQUFtQixHQUFuQjtBQUNIOztBQUVELFlBQVEsV0FBUixDQUFvQixNQUFwQjtBQUNILENBcEVEOztRQXNFUSxtQixHQUFBLG1COzs7Ozs7Ozs7O0FDdEVSOztBQUVBLElBQUksWUFBWSxTQUFaLFNBQVksQ0FBQyxJQUFELEVBQU8sUUFBUCxFQUFpQixLQUFqQixFQUEyQjs7QUFFdkMsUUFBSSxLQUFLLEVBQUwsS0FBWSxXQUFoQixFQUNJOztBQUVKLFFBQUksVUFBVSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLFFBQUksT0FBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF2QixHQUF1RCxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbEU7QUFDQSxRQUFJLHNCQUFzQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBMUI7QUFDQSxRQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7QUFDQSxRQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7QUFDQSxRQUFJLHNCQUFzQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBMUI7QUFDQSxRQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7QUFDQSxRQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7O0FBRUEsU0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixnQkFBbkI7QUFDQSxTQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLHlCQUFuQjtBQUNBLFNBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsZ0JBQW5CO0FBQ0EsU0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQix5QkFBbkI7O0FBRUEsd0JBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLHFCQUFsQztBQUNBLHdCQUFvQixTQUFwQixDQUE4QixHQUE5QixDQUFrQyxxQkFBbEM7QUFDQSxrQkFBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLHFCQUE1QjtBQUNBLG1CQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsc0JBQTdCO0FBQ0Esa0JBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixxQkFBNUI7QUFDQSxtQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLHNCQUE3QjtBQUNBLGtCQUFjLFNBQWQsR0FBMkIsR0FBM0I7QUFDQSxtQkFBZSxTQUFmLEdBQTRCLEdBQTVCO0FBQ0Esd0JBQW9CLFNBQXBCLEdBQWdDLEtBQUssU0FBckM7QUFDQSxTQUFLLFdBQUwsQ0FBaUIsYUFBakI7QUFDQSxTQUFLLFdBQUwsQ0FBaUIsbUJBQWpCOztBQUVBLFFBQUksS0FBSyxVQUFMLENBQWdCLE1BQXBCLEVBQTRCO0FBQ3hCLFdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxLQUFLLFVBQW5CLEVBQStCLE9BQS9CLENBQXVDLFVBQUMsSUFBRCxFQUFVOztBQUU3QyxnQkFBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFuQjtBQUNBLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7QUFDQSxnQkFBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQXBCOztBQUVBLHlCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsc0JBQTNCO0FBQ0EsMEJBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0Qix1QkFBNUI7QUFDQSx5QkFBYSxTQUFiLEdBQXlCLEtBQUssU0FBOUI7QUFDQSwwQkFBYyxTQUFkLEdBQTBCLEdBQTFCO0FBQ0EsMEJBQWMsU0FBZCxHQUEwQixNQUFNLEtBQUssS0FBWCxHQUFtQixHQUE3QztBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsWUFBakI7QUFDQSxpQkFBSyxXQUFMLENBQWlCLGFBQWpCO0FBQ0EsaUJBQUssV0FBTCxDQUFpQixhQUFqQjtBQUNILFNBZEQ7QUFlSDs7QUFFRCxTQUFLLFdBQUwsQ0FBaUIsY0FBakI7QUFDQSxZQUFRLFdBQVIsQ0FBb0IsSUFBcEI7QUFDQSxZQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsZ0JBQXRCOztBQUVBLFFBQUksS0FBSyxJQUFMLElBQWEsS0FBSyxJQUFMLENBQVUsTUFBM0IsRUFBbUM7O0FBRS9CLFlBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjs7QUFFQSxlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsZ0JBQXJCO0FBQ0EsZUFBTyxTQUFQLEdBQW1CLEtBQUssSUFBTCxDQUFVLElBQVYsRUFBbkI7QUFDQSxnQkFBUSxXQUFSLENBQW9CLE1BQXBCOztBQUVBLFlBQUksUUFBUSxDQUFaLEVBQWU7QUFDWCxpQkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQiwwQkFBbkI7QUFDQSwwQkFBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLCtCQUE1QjtBQUNILFNBSEQsTUFHTztBQUNILGlCQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLDJCQUFuQjtBQUNBLDBCQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsZ0NBQTVCO0FBQ0g7QUFFSjs7QUFFRCxRQUFJLEtBQUssUUFBTCxDQUFjLE1BQWxCLEVBQTBCO0FBQ3RCLGlCQUFTLENBQVQ7QUFDQSxXQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsS0FBSyxRQUFuQixFQUE2QixPQUE3QixDQUFxQyxVQUFDLEVBQUQsRUFBUTtBQUN6QyxzQkFBVSxFQUFWLEVBQWMsT0FBZCxFQUF1QixLQUF2Qjs7QUFFQSxnQkFBSSxRQUFRLENBQVosRUFBZTtBQUNYLHFCQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLDBCQUFuQjtBQUNBLDhCQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsK0JBQTVCO0FBQ0gsYUFIRCxNQUdPO0FBQ0gscUJBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsMkJBQW5CO0FBQ0EsOEJBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixnQ0FBNUI7QUFDSDtBQUVKLFNBWEQ7QUFZSDs7QUFFRCxrQkFBYyxTQUFkLEdBQTJCLElBQTNCO0FBQ0EsbUJBQWUsU0FBZixHQUE0QixHQUE1QjtBQUNBLHdCQUFvQixTQUFwQixHQUFnQyxLQUFLLFNBQXJDO0FBQ0EsU0FBSyxXQUFMLENBQWlCLGFBQWpCO0FBQ0EsU0FBSyxXQUFMLENBQWlCLG1CQUFqQjtBQUNBLFNBQUssV0FBTCxDQUFpQixjQUFqQjs7QUFFQSxRQUFJLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBd0IsS0FBSyxJQUFMLElBQWEsS0FBSyxJQUFMLENBQVUsTUFBbkQsRUFDSSxRQUFRLFdBQVIsQ0FBb0IsSUFBcEIsRUFESixLQUdJLEtBQUssV0FBTCxDQUFpQixJQUFqQjs7QUFFUCw4Q0FBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsYUFBN0I7QUFDRyxhQUFTLFdBQVQsQ0FBcUIsT0FBckI7QUFDSCxDQXRHRCxDLENBSkE7O1FBMkdRLFMsR0FBQSxTOzs7Ozs7OztBQzNHUjs7QUFFQSxJQUFJLGVBQWUsU0FBZixZQUFlLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBeUI7O0FBRXhDLE1BQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBLE1BQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBaEI7QUFDQSxNQUFJLFFBQVEsVUFBVSxFQUF0Qjs7QUFFQSxTQUFPLEVBQVAsR0FBZSxVQUFVLEVBQXpCO0FBQ0EsU0FBTyxTQUFQLENBQWlCLEdBQWpCLENBQXdCLFVBQVUsU0FBVixDQUFvQixDQUFwQixDQUF4QjtBQUNBLFlBQVUsU0FBVixDQUFvQixHQUFwQixDQUEyQixVQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsQ0FBM0I7QUFDQSxTQUFPLFNBQVAscUJBQW1DLEtBQW5DLGlCQUFvRCxLQUFwRDs7QUFFQSxNQUFJLFFBQUosRUFBYztBQUNWLGNBQVUsU0FBVixDQUFvQixHQUFwQixDQUEyQixVQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsQ0FBM0I7QUFDSCxHQUZELE1BRU87QUFDSCxjQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBMkIsVUFBVSxTQUFWLENBQW9CLENBQXBCLENBQTNCO0FBQ0g7O0FBRUQsU0FBTyxXQUFQLENBQW1CLFNBQW5CO0FBQ0EsWUFBVSxXQUFWLENBQXNCLE1BQXRCOztBQUVBLFNBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBQyxDQUFELEVBQU87O0FBRXBDLFFBQUksV0FBVyxHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQWUsVUFBVSxRQUF6QixFQUFtQztBQUFBLGFBQU0sR0FBRyxFQUFILEtBQWEsT0FBTyxFQUFwQixZQUFOO0FBQUEsS0FBbkMsQ0FBZjs7QUFFQSxjQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBOEIsVUFBVSxTQUFWLENBQW9CLENBQXBCLENBQTlCO0FBQ0EsY0FBVSxTQUFWLENBQW9CLE1BQXBCLENBQThCLFVBQVUsU0FBVixDQUFvQixDQUFwQixDQUE5QjtBQUNBLGFBQVMsT0FBVCxDQUFpQixjQUFNO0FBQ25CLFNBQUcsU0FBSCxDQUFhLE1BQWIsQ0FBdUIsR0FBRyxTQUFILENBQWEsQ0FBYixDQUF2QjtBQUNBLFNBQUcsU0FBSCxDQUFhLE1BQWIsQ0FBdUIsR0FBRyxTQUFILENBQWEsQ0FBYixDQUF2QjtBQUNILEtBSEQ7QUFJSCxHQVZELEVBVUcsS0FWSDtBQVdILENBL0JEOztRQWlDUSxZLEdBQUEsWTs7Ozs7Ozs7OztBQ2pDUjs7QUFDQTs7QUFIQTs7QUFLQSxJQUFJLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCOztBQUVuQyxRQUFNLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7QUFDQSxRQUFNLHFCQUFxQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBM0I7QUFDSCxRQUFNLFdBQVcsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWpCO0FBQ0csUUFBSSxRQUFRLENBQVo7O0FBRUEsdUJBQW1CLEVBQW5CLEdBQXdCLFdBQXhCO0FBQ0EsdUJBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLFdBQWpDO0FBQ0EsdUJBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLGNBQWpDO0FBQ0EscUJBQWlCLFNBQWpCLENBQTJCLEdBQTNCLENBQStCLG9CQUEvQjtBQUNBLHFCQUFpQixFQUFqQixHQUFzQixtQkFBdEI7QUFDQSxxQ0FBYSxrQkFBYixFQUFpQyxJQUFqQztBQUNBLHFCQUFpQixTQUFqQixDQUEyQixHQUEzQixDQUErQiw4QkFBL0I7QUFDQSx1QkFBbUIsV0FBbkIsQ0FBK0IsZ0JBQS9CO0FBQ0EsVUFBTSxXQUFOLENBQWtCLGtCQUFsQjtBQUNBLCtCQUFVLFFBQVYsRUFBb0IsZ0JBQXBCLEVBQXNDLEtBQXRDO0FBRUgsQ0FsQkQ7O1FBb0JRLGUsR0FBQSxlOzs7Ozs7Ozs7O0FDdkJSOztBQUVBLElBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxPQUFELEVBQVUsR0FBVixFQUFrQjs7QUFFaEMsT0FBSSxZQUFZLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFoQjtBQUNBLE9BQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLE9BQUksV0FBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDSCxPQUFJLHVCQUF1QixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBM0I7QUFDQSxPQUFJLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQSxPQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EsT0FBSSxtQkFBbUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCOztBQUVHLFNBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixPQUFwQjtBQUNILGdCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsZ0JBQTNCO0FBQ0csWUFBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLGNBQXZCO0FBQ0EsWUFBUyxTQUFULEdBQXFCLEdBQXJCOztBQUVBLFlBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBTTtBQUNyQyxZQUFNLE1BQU47QUFDSCxJQUZELEVBRUcsS0FGSDs7QUFJSCxpREFBbUIsV0FBbkIsRUFBZ0MsWUFBaEMsRUFBOEMsT0FBOUMsRUFBdUQsR0FBdkQsRUFBNEQsb0JBQTVEO0FBQ0EsaURBQW1CLFlBQW5CLEVBQWlDLGVBQWpDLEVBQWtELE9BQWxELEVBQTJELEdBQTNELEVBQWdFLGdCQUFoRTtBQUNBLGlEQUFtQixtQkFBbkIsRUFBd0MsbUJBQXhDLEVBQTZELE9BQTdELEVBQXNFLEdBQXRFLEVBQTJFLGdCQUEzRTs7QUFFRyxTQUFNLFdBQU4sQ0FBa0IsUUFBbEI7QUFDQSxnQkFBYSxXQUFiLENBQXlCLG9CQUF6QjtBQUNBLGdCQUFhLFdBQWIsQ0FBeUIsZ0JBQXpCO0FBQ0EsZ0JBQWEsV0FBYixDQUF5QixnQkFBekI7QUFDQSxTQUFNLFdBQU4sQ0FBa0IsWUFBbEI7QUFDQSxhQUFVLFdBQVYsQ0FBc0IsS0FBdEI7QUFDSCxDQTdCRCxDLENBSkE7O1FBbUNRLFcsR0FBQSxXOzs7Ozs7Ozs7O0FDakNSOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQUkscUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksT0FBWixFQUFxQixHQUFyQixFQUEwQixXQUExQixFQUEwQzs7QUFFbEUsS0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0EsS0FBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsS0FBSSxjQUFjLEVBQWxCOztBQUVBLFFBQU8sU0FBUCxzQ0FBb0QsS0FBcEQ7QUFDQSxRQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsZUFBckI7QUFDQSxhQUFZLFdBQVosQ0FBd0IsTUFBeEI7QUFDQSxhQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsZ0JBQTFCO0FBQ0EsYUFBWSxTQUFaLENBQXNCLEdBQXRCLHNCQUE2QyxXQUE3Qzs7QUFFQSxLQUFJLE9BQU8sV0FBUCxJQUFzQixPQUFPLFlBQWpDLEVBQStDOztBQUU5QyxNQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWxCO0FBQ0EsTUFBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFuQjtBQUNBLE1BQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7QUFDQSxNQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWpCO0FBQ0EsTUFBSSxpQkFBaUIsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQXJCO0FBQ0EsTUFBSSxrQkFBa0IsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0FBQ0EsTUFBSSxZQUFKOztBQUVBLE1BQUksT0FBTyxXQUFYLEVBQXdCO0FBQ3ZCLFNBQU0sR0FBRyxNQUFILENBQVUsSUFBVixDQUFlLFFBQVEsVUFBdkIsRUFBbUM7QUFBQSxXQUFRLEtBQUssSUFBTCxLQUFjLE9BQXRCO0FBQUEsSUFBbkMsQ0FBTjtBQUNBLGlCQUFjLFlBQWQ7QUFDQSxHQUhELE1BR087QUFDTixTQUFNLEVBQU47QUFDQSxpQkFBYyxRQUFkO0FBQ0E7O0FBRUQsT0FBSyxFQUFMLEdBQVUsRUFBVjtBQUNBLFNBQU8sU0FBUCxHQUFtQixHQUFuQjtBQUNBLFNBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixZQUFyQjtBQUNBLGNBQVksU0FBWixHQUF3QixPQUF4QjtBQUNBLGVBQWEsU0FBYixHQUF5QixRQUF6QjtBQUNBLGNBQVksRUFBWixZQUF3QixHQUFHLE9BQUgsQ0FBVyxPQUFYLEVBQW9CLEVBQXBCLENBQXhCO0FBQ0EsY0FBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLGNBQTFCO0FBQ0EsZUFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLGVBQTNCO0FBQ0EsaUJBQWUsU0FBZixHQUEyQixPQUFPLFlBQVAsR0FBc0IsZ0JBQXRCLEdBQXlDLGlCQUFwRTtBQUNBLGtCQUFnQixTQUFoQixHQUE0QixPQUFPLFlBQVAsR0FBc0IsaUJBQXRCLEdBQTBDLGtCQUF0RTtBQUNBLFlBQVUsSUFBVixHQUFpQixNQUFqQjtBQUNBLFlBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixrQkFBeEI7QUFDQSxhQUFXLElBQVgsR0FBa0IsTUFBbEI7QUFDQSxhQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsa0JBQXpCO0FBQ0EsY0FBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLHlCQUExQjtBQUNBLGVBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQiwwQkFBM0I7QUFDQSxpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLDZCQUE3QjtBQUNBLGtCQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4Qiw2QkFBOUI7QUFDQSxTQUFPLFdBQVAsQ0FBbUIsTUFBbkI7QUFDQSxTQUFPLFdBQVAsQ0FBbUIsWUFBbkI7QUFDQSxTQUFPLFdBQVAsQ0FBbUIsV0FBbkI7QUFDQSxpQkFBZSxXQUFmLENBQTJCLFNBQTNCO0FBQ0Esa0JBQWdCLFdBQWhCLENBQTRCLFVBQTVCO0FBQ0EsU0FBTyxXQUFQLENBQW1CLGNBQW5CO0FBQ0EsU0FBTyxXQUFQLENBQW1CLGVBQW5CO0FBQ0EsY0FBWSxXQUFaLENBQXdCLElBQXhCOztBQUVBLE1BQUksT0FBTyxZQUFQLElBQXVCLFFBQVEsVUFBL0IsSUFBNkMsUUFBUSxVQUFSLENBQW1CLEtBQXBFLEVBQTJFO0FBQzFFLFNBQU0sR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFFBQVEsVUFBUixDQUFtQixLQUFuQixDQUF5QixLQUF2QyxFQUE4QyxJQUE5QyxDQUFOO0FBQ0EsU0FBTSxJQUFJLEdBQUosQ0FBUTtBQUFBLFdBQVEsS0FBSyxPQUFMLENBQWEsR0FBYixFQUFrQixFQUFsQixDQUFSO0FBQUEsSUFBUixDQUFOO0FBQ0E7O0FBRUQsT0FBSyxJQUFJLElBQVQsSUFBaUIsR0FBakIsRUFBc0I7O0FBRXJCLE9BQUksYUFBSjtBQUNBLE9BQUksY0FBSjs7QUFFQSxPQUFJLE9BQU8sWUFBWCxFQUF5QjtBQUN4QixXQUFPLElBQUksSUFBSixFQUFVLEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0IsQ0FBdEIsQ0FBUDtBQUNBLFlBQVEsSUFBSSxJQUFKLEVBQVUsS0FBVixDQUFnQixJQUFoQixFQUFzQixDQUF0QixDQUFSO0FBQ0EsSUFIRCxNQUdPO0FBQ04sV0FBTyxJQUFJLElBQUosRUFBVSxJQUFqQjtBQUNBLFlBQVEsSUFBSSxJQUFKLEVBQVUsS0FBbEI7QUFDQTs7QUFFRCxnREFBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsR0FBL0IsRUFBb0MsSUFBcEMsRUFBMEMsS0FBMUM7QUFDQTs7QUFFRCxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZDLDJDQUFnQixXQUFoQixFQUE2QixZQUE3QixFQUEyQyxjQUEzQyxFQUEyRCxlQUEzRCxFQUE0RSxNQUE1RTtBQUNBLEdBRkQsRUFFRyxLQUZIO0FBR0EsY0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzNDLCtDQUFrQixPQUFsQixFQUEyQixXQUEzQixFQUF3QyxlQUF4QyxFQUF5RCxjQUF6RCxFQUF5RSxHQUF6RSxFQUE4RSxJQUE5RSxFQUFvRixHQUFwRixFQUF5RixNQUF6RjtBQUNBLEdBRkQsRUFFRyxLQUZIO0FBR0EsZUFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxZQUFNO0FBQzVDLGlEQUFtQixXQUFuQixFQUFnQyxZQUFoQyxFQUE4QyxlQUE5QyxFQUErRCxjQUEvRCxFQUErRSxNQUEvRTtBQUNBLEdBRkQsRUFFRyxLQUZIO0FBR0EsRUE1RUQsTUE0RU8sSUFBSSxPQUFPLG1CQUFYLEVBQWdDOztBQUV0QyxNQUFJLG9CQUFvQixTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBeEI7O0FBRUEsZ0JBQWMsV0FBZDtBQUNBLG9CQUFrQixJQUFsQixHQUF5QixVQUF6QjtBQUNBLG9CQUFrQixTQUFsQixDQUE0QixHQUE1QixDQUFnQyxrQkFBaEM7QUFDQSxTQUFPLFdBQVAsQ0FBbUIsaUJBQW5COztBQUVBLE1BQUksUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixLQUF0QixDQUE0QixvREFBNUIsS0FDQSxRQUFRLEtBQVIsQ0FBYyxPQUFkLENBQXNCLEtBQXRCLENBQTRCLHFDQUE1QixDQURKLEVBRUMsa0JBQWtCLE9BQWxCLEdBQTRCLElBQTVCOztBQUVELG9CQUFrQixnQkFBbEIsQ0FBbUMsUUFBbkMsRUFBNkMsWUFBTTtBQUNsRCxpREFBbUIsT0FBbkI7QUFDQSxHQUZELEVBRUcsS0FGSDtBQUdBO0FBRUQsQ0ExR0QsQyxDQVJBOztRQW9IUSxrQixHQUFBLGtCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIG1haW4uanMgMC4xLjEgMzAuMDMuMjAxNyBAIGZpbGlwIHN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2xvYWRTdHlsZXN9IGZyb20gJy4vbW9kdWxlcy9sb2FkX3N0eWxlcy5qcyc7XG5pbXBvcnQge3JlbmRlckluc3BlY3Rvcn0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9pbnNwZWN0b3IuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJCcm93c2VySW5mb30gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9icm93c2VyX2luZm8uanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgRFRDb25zb2xlIGZyb20gJy4vbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyc7XG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnRhaW5lci5pZCA9ICdkZXZfdG9vbHMnO1xuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzJyk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5sb2FkU3R5bGVzKCk7XG5yZW5kZXJJbnNwZWN0b3IoYm9keSwgY29udGFpbmVyKTtcbnJlbmRlckNvbnNvbGUoY29udGFpbmVyKTtcbnJlbmRlckJyb3dzZXJJbmZvKGNvbnRhaW5lcik7XG5cbndpbmRvdy5EVENvbnNvbGUgPSBEVENvbnNvbGU7XG4iLCIvKiBhZGRfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjEsIDA1LjA1LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBhZGRCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgbmFtZUxhYmVsLCB2YWx1ZUxhYmVsLCBoZWFkZXIpID0+IHtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19jYW5jZWwtLWNvbGxhcHNlZCcpO1xuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdHZhbHVlTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jYW5jZWwtLWV4cGFuZGVkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9faGVhZGVyLS1leHBhbmRlZCcpO1xufTtcblxuZXhwb3J0IHthZGRCdXR0b25BY3Rpb259O1xuXG4iLCIvKiBhcHBseV9idXR0b25fYWN0aW9uLmpzLCB2LiAwLjEuMSwgMDUuMDUuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5cbmxldCBhcHBseUJ1dHRvbkFjdGlvbiA9IChlbGVtZW50LCBidG4sIHZhbHVlTGFiZWwsIG5hbWVMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcikgPT4ge1xuXG5cdGxldCBzZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdGxldCB2YWx1ZUlucHV0ID0gdmFsdWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRsZXQgbmFtZUlucHV0ID0gbmFtZUxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cdGxldCB2YWx1ZSA9IHZhbHVlSW5wdXQudmFsdWU7XG5cdGxldCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuXHRsZXQgYXR0clZhbHVlRWxlbTtcblx0bGV0IGF0dHJOYW1lRWxlbTtcblxuXHRsaXN0LmlubmVySFRNTCA9ICcnO1xuXG5cdGlmIChidG4uaWQgPT09ICdhZGRfYXR0cl9idG4nKSB7XG5cdFx0YXR0ck5hbWVFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGF0dHJWYWx1ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdGFyciA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuXHRcdFtdLmZvckVhY2guY2FsbChhcnIsIChhdHRyKSA9PiB7XG5cdFx0XHRyZW5kZXJBdHRySW5wdXQoZWxlbWVudCwgbGlzdCwgcm93LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdGF0dHJOYW1lRWxlbS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdGF0dHJWYWx1ZUVsZW0uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cdFx0YXR0ck5hbWVFbGVtLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRzZXBhcmF0b3IuaW5uZXJUZXh0ID0gJz0nO1xuXHRcdHJvdy5pbnNlcnRCZWZvcmUoYXR0ck5hbWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0XHRyb3cuaW5zZXJ0QmVmb3JlKHNlcGFyYXRvciwgcm93Lmxhc3RDaGlsZCk7XG5cdFx0cm93Lmluc2VydEJlZm9yZShhdHRyVmFsdWVFbGVtLCByb3cubGFzdENoaWxkKTtcblx0fVxuXG5cdGlmIChidG4uaWQgPT09ICdhZGRfc3R5bGVfYnRuJykge1xuXG5cdFx0bGV0IHN0eWxlRWxlbSA9IFtdLmZpbHRlci5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpLCAoZWwpID0+IGVsLmlubmVyVGV4dCA9PT0gJ3N0eWxlJylbMF07XG5cblx0XHRhdHRyTmFtZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IFxuXHRcdGF0dHJWYWx1ZUVsZW0gPSBzdHlsZUVsZW0ubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG5cdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuXHRcdGFyci5wdXNoKGAke25hbWV9OiAke3ZhbHVlfTtgKTtcblx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCA9ICdcIic7XG5cdFx0W10uZm9yRWFjaC5jYWxsKGFyciwgKHJ1bGUsIGkpID0+IHtcblx0XHRcdHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBsaXN0LCByb3csIHJ1bGUuc3BsaXQoJzogJylbMF0sIHJ1bGUuc3BsaXQoJzogJylbMV0ucmVwbGFjZSgnOycsICcnKSk7XG5cblx0XHRcdGlmKGkgIT09IDApXG5cdFx0XHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICcgJztcblxuXHRcdFx0YXR0clZhbHVlRWxlbS5pbm5lclRleHQgKz0gYCR7cnVsZS5zcGxpdCgnOiAnKVswXX06ICR7cnVsZS5zcGxpdCgnOiAnKVsxXX1gO1xuXG5cdFx0XHRpZiAoaSA8IGFyci5sZW5ndGggLSAxKVxuXHRcdFx0XHRhdHRyVmFsdWVFbGVtLmlubmVyVGV4dCArPSAnOyc7XG5cdFx0XHRcdFxuXHRcdH0pO1xuXHRcdGF0dHJWYWx1ZUVsZW0uaW5uZXJUZXh0ICs9ICdcIic7XG5cdH1cblxuXHRuYW1lTGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2hlYWRlci0tZXhwYW5kZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0dmFsdWVMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuXHRuYW1lSW5wdXQudmFsdWUgPSAnJztcblx0dmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuXHRidG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblxufTtcblxuZXhwb3J0IHthcHBseUJ1dHRvbkFjdGlvbn07XG4iLCIvKiBjYW5jZWxfYnV0dG9uX2FjdGlvbi5qcywgdi4gMC4xLjAsIDA1LjA1LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBjYW5jZWxCdXR0b25BY3Rpb24gPSAoYXBwbHlCdG4sIGNhbmNlbEJ0biwgdmFsdWVMYWJlbCwgbmFtZUxhYmVsLCBoZWFkZXIpID0+IHtcblxuXHRsZXQgdmFsdWVJbnB1dCA9IHZhbHVlTGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0bGV0IG5hbWVJbnB1dCA9IG5hbWVMYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG5cdG5hbWVMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcblx0bmFtZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG5cdGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9faGVhZGVyLS1leHBhbmRlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHR2YWx1ZUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG5cdG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuXHR2YWx1ZUlucHV0LnZhbHVlID0gJyc7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG5cdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcblx0Y2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jYW5jZWwtLWNvbGxhcHNlZCcpO1xuXHRjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2NhbmNlbC0tZXhwYW5kZWQnKTtcblxufTtcblxuZXhwb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259O1xuIiwiLyogY29uc29sZV9jbGVhci5qcywgdi4gMC4xLjAsIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5sZXQgY29uc29sZUNsZWFyID0gKCkgPT4ge1xuICAgIGNvbnNvbGVEaXNwbGF5LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQge2NvbnNvbGVDbGVhcn07XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjUsIDA2LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmxldCBjb25zb2xlTGlzdGVuID0gKCkgPT4ge1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycm9yKSA9PiB7XG5cbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvclNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JDb2x1bW5ObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yUHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19yb3cnKTtcbiAgICAgICAgZXJyb3JQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXByb21wdCcpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yLS1lcnInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1tc2cnKTtcbiAgICAgICAgZXJyb3JTb3VyY2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXNyYycpO1xuICAgICAgICBlcnJvckxpbmVOby5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbGluZW5vJyk7XG4gICAgICAgIGVycm9yQ29sdW1uTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWNvbHVtbm5vJyk7XG5cbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmlubmVySFRNTCArPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBlcnJvclNvdXJjZS5pbm5lckhUTUwgKz0gZXJyb3IuZmlsZW5hbWU7XG4gICAgICAgIGVycm9yTGluZU5vLmlubmVySFRNTCArPSBlcnJvci5saW5lbm87XG4gICAgICAgIGVycm9yQ29sdW1uTm8uaW5uZXJIVE1MICs9IGVycm9yLmNvbHVtbm5vO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvclByb21wdCk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2VNc2cpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JTb3VyY2UpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JMaW5lTm8pO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JDb2x1bW5Obyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlRGlzcGxheS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIFxuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2xvZycsIChlKSA9PiB7XG5cbiAgICAgICAgbGV0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGxldCBsb2cgPSBuZXcgQ3VzdG9tRXZlbnQoJ2xvZycsIHtkZXRhaWw6IFtzdHIsIHZhbHVlXX0pO1xuXG4gICAgY29uc29sZURpc3BsYXkuZGlzcGF0Y2hFdmVudChsb2cpO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxvZ307XG4iLCIvKiBkb21fZWxlbWVudF9saXN0ZW4uanMsIHYuIDAuMS4wLCAyMS4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlclBvcHVwfSBmcm9tICcuL3JlbmRlcl9wb3B1cC5qcyc7XG5cbmxldCBkb21FbGVtZW50TGlzdGVuID0gKGVsZW0sIHJvdywgYXJyb3cpID0+IHtcblxuXHRsZXQgc3RhcnREYXRlO1xuXHRsZXQgdE9iajtcblx0bGV0IHN0YXJ0WDtcblx0bGV0IHN0YXJ0WTtcblx0bGV0IGVuZFg7XG5cdGxldCBlbmRZO1xuXHRsZXQgZGlzdFg7XG5cdGxldCBkaXN0WTtcblx0bGV0IG1heFggPSAwO1xuXHRsZXQgbWF4WSA9IDA7XG5cblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuXHRcdHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0dE9iaiA9IGUudG91Y2hlc1swXTtcblx0XHRzdGFydFggPSB0T2JqLnBhZ2VYO1xuXHRcdHN0YXJ0WSA9IHRPYmoucGFnZVk7XG5cdH0sIGZhbHNlKTtcblx0cm93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG5cdFx0dE9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0ZW5kWCA9IHRPYmoucGFnZVg7XG5cdFx0ZW5kWSA9IHRPYmoucGFnZVk7XG5cdFx0ZGlzdFggPSBlbmRYIC0gc3RhcnRYO1xuXHRcdGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcblx0ICAgXG5cdFx0aWYgKE1hdGguYWJzKGRpc3RYKSA+IG1heFgpXG5cdFx0XHRtYXhYID0gTWF0aC5hYnMoZGlzdFgpO1xuXHQgICBcblx0XHRpZiAoTWF0aC5hYnMoZGlzdFkpID4gbWF4WSlcblx0XHRcdG1heFkgPSBNYXRoLmFicyhkaXN0WSk7XG5cdCAgIFxuXHR9LCBmYWxzZSk7XG5cdHJvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG5cdCAgIFxuXHRcdGxldCBlbmREYXRlID0gbmV3IERhdGUoKTtcblx0XHRsZXQgZGF0ZUFtcCA9IGVuZERhdGUgLSBzdGFydERhdGU7XG5cdCAgIFxuXHRcdHRPYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXHRcdGVuZFggPSB0T2JqLnBhZ2VYO1xuXHRcdGVuZFkgPSB0T2JqLnBhZ2VZO1xuXHRcdGRpc3RYID0gZW5kWCAtIHN0YXJ0WDtcblx0XHRkaXN0WSA9IGVuZFkgLSBzdGFydFk7XG5cdCAgIFxuXHRcdGlmIChtYXhZIDw9IDMwICYmIG1heFggPD0gMzApIHtcblx0XHQgICBcblx0XHRcdGlmIChkYXRlQW1wIDw9IDIwMCkge1xuXHRcdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcblx0XHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKVxuXG5cdFx0XHRcdGlmIChhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJykgfHxcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpKSB7XG5cdFx0XHRcdFx0YXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcblx0XHRcdFx0XHRhcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZW5kZXJQb3B1cChlbGVtLCByb3cpO1xuXHRcdFx0fVxuXHRcdCAgIFxuXHRcdH1cblx0ICAgXG5cdFx0bWF4WCA9IDA7XG5cdFx0bWF4WSA9IDA7XG5cblx0fSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtkb21FbGVtZW50TGlzdGVufTtcbiIsIi8qIGR0X2NvbnNvbGVfYXBpLmpzLCB2LiAwLjEuMywgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTG9nfSBmcm9tICcuL2NvbnNvbGVfbG9nLmpzJztcbmltcG9ydCB7Y29uc29sZUNsZWFyfSBmcm9tICcuL2NvbnNvbGVfY2xlYXIuanMnO1xuXG5sZXQgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmxldCBjbGVhciA9IGNvbnNvbGVDbGVhcjtcblxuZXhwb3J0IHtsb2d9O1xuZXhwb3J0IHtjbGVhcn07XG4iLCIvKiBnbG9iYWxfZXZhbC5qcywgdi4gMC4xLjAsIDMxLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbi8vIGV2YWwgLSBydW5zIGJsb2NrIHNjb3BlIGRlY2xhcmF0aW9ucyB2aWEgc2NyaXB0IGluamVjdGlvblxuLy8gb3RoZXJ3aXNlIHN0YW5kYXJkIGV2YWwgdXNlZCBcbi8vIC0gdGhpbmsgaWYgbm90IHVzZSBpbmplY3Rpb24gZXhjbHVzaXZlbHlcbi8vIHJldHVybnMgdmFsdWVcbmNvbnN0IGdsb2JhbEV2YWwgPSAoc3RyKSA9PiB7XG5cbiAgICAndXNlIHN0cmljdCc7IC8vIHByZXZlbnQgY3JlYXRpbmcgbG9jYWwgdmFyaWFibGVzIHdpdGggc3RhbmRhcmQgZXZhbFxuICAgIFxuICAgIGlmIChzdHIuc3RhcnRzV2l0aCgnbGV0ICcpIHx8IHN0ci5zdGFydHNXaXRoKCdjb25zdCAnKSkgeyAvLyBjb2RlIGZvciBzY3JpcHQgaW5zZXJ0aW9uXG5cbiAgICAgICAgbGV0IHNjcmlwdDtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKS5yZW1vdmUoKVxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5pZCA9ICdkdF9zY3JpcHQnO1xuICAgICAgICBzY3JpcHQuaW5uZXJUZXh0ID0gc3RyO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vIHJldHVybnMgdW5kZWZpbmVkIHdoZW4gZGVjbGFyaW5nIGJsb2NrIHNjb3BlZCB2YXJpYWJsZVxuICAgIH0gZWxzZSB7IC8vc3RhbmRhcmQgZXZhbFxuICAgICAgICByZXR1cm4gKDEsIGV2YWwpKHN0cik7IC8vIGluZGlyZWN0IGNhbGwgdG8gYWNjZXNzIGdsb2JhbCBzY29wZVxuICAgIH1cbn1cblxuZXhwb3J0IHtnbG9iYWxFdmFsfTtcbiIsIi8qIGhpZ2hsaWdodF9ib3hfYWN0aW9uLmpzLCB2LiAwLjEuMCwgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IGhpZ2hsaWdodEJveEFjdGlvbiA9IGVsZW1lbnQgPT4ge1xuXG5cdGlmIChlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2goL2JhY2tncm91bmQtY29sb3I6IHJnYlxcKDE3MCwgMjIxLCAyNTVcXCkgXFwhaW1wb3J0YW50LykpIHtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcblx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKC9iYWNrZ3JvdW5kLWNvbG9yOiByZ2JcXCgxNzAsIDIyMSwgMjU1XFwpIFxcIWltcG9ydGFudC8sICcnKTtcblx0fSBlbHNlIGlmIChlbGVtZW50LnN0eWxlLmNzc1RleHQubWF0Y2goL2JhY2tncm91bmQtY29sb3I6IFxcI2FkZiBcXCFpbXBvcnRhbnQvKSkge1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0LnJlcGxhY2UoL2JhY2tncm91bmQtY29sb3I6IFxcI2FkZiBcXCFpbXBvcnRhbnQvLCAnJyk7XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kLWNvbG9yOiAjYWRmICFpbXBvcnRhbnQnO1xuXHR9XG5cbn07XG5cbmV4cG9ydCB7aGlnaGxpZ2h0Qm94QWN0aW9ufTtcblxuIiwiLyogbG9hZCBfc3R5bGVzLmpzIHYuIDAuMS4yLCAwNC4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5sZXQgbG9hZFN0eWxlcyA9ICgpID0+IHtcblxuICAgIGxldCBzdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGV0IGdvb2dsZUZvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBzdHlsZXMucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHN0eWxlcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcbiAgICBzdHlsZXMuaHJlZiA9ICcuL2Nzcy9tYWluLmNzcyc7XG4gICAgc3R5bGVzLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBzdHlsZXMudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVzLm1lZGlhID0gJ3NjcmVlbic7XG4gICAgc3R5bGVzLmhyZWYgPSAnaHR0cHM6Ly9nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNwYWNlK01vbm86NDAwLDcwMCZhbXA7c3Vic2V0PWxhdGluLWV4dCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChnb29nbGVGb250KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcywgdi4gMC4xLjEsIDA1LjA1LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCByZW5kZXJBdHRySW5wdXQgPSAoZWwsIGRpc3BsYXksIHJvdywgbmFtZSwgdmFsdWUpID0+IHtcbiAgIFxuXHRsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRsZXQgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRsZXQgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0bGV0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIFxuXHRpbnB1dC50eXBlID0gJ3RleHQnO1xuXHRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0Jylcblx0XHRpbnB1dC52YWx1ZSArPSAnOyc7XG5cblx0bGFiZWwuaW5uZXJUZXh0ID0gbmFtZTtcblx0YXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0c2VwYXJhdG9yLmlubmVyVGV4dCA9ICc6Jztcblx0bGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtZWxlbWVudCcpO1xuXHRsYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1sYWJlbCcpO1xuXHRpbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1pbnB1dCcpO1xuXHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4nKTtcblx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcblx0c2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LXNlcGFyYXRvcicpO1xuICAgXG5cdGxhYmVsLmFwcGVuZENoaWxkKHNlcGFyYXRvcik7XG5cdGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcblx0bGFiZWwuYXBwZW5kQ2hpbGQoYXBwbHlCdG4pO1xuXHRsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbCk7XG5cdGRpc3BsYXkuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpO1xuICAgXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgIFxuXHRcdGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG5cblx0XHRcdGxldCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuXHRcdFx0bGV0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRcdGVsLmF0dHJpYnV0ZXNbbmFtZV0udmFsdWUgPSBpbnB1dC52YWx1ZTtcblxuXHRcdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKVxuXHRcdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRcdFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke2lucHV0LnZhbHVlfVwiYDtcblx0XHRcdFx0XHRhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXR0ck5hbWVFbC5pbm5lclRleHQgPT09ICdzdHlsZScgJiYgZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpIHtcblxuXHRcdFx0XHRcdGxldCBsYWJlbHMgPSBkaXNwbGF5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsJyk7XG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gJyc7XG5cblx0XHRcdFx0XHRbXS5mb3JFYWNoLmNhbGwobGFiZWxzLCAobGFiZWwsIGkpID0+IHtcblx0XHRcdFx0XHRcdHZhbHVlICs9IGxhYmVsLmZpcnN0Q2hpbGQuZGF0YTtcblx0XHRcdFx0XHRcdHZhbHVlICs9ICc6ICc7XG5cdFx0XHRcdFx0XHR2YWx1ZSArPSBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG5cdFx0XHRcdFx0XHRpZiAoaSA8IGxhYmVscy5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdFx0XHR2YWx1ZSArPSAnICc7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHt2YWx1ZX1cImA7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQnKTtcblx0XHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdFx0fVxuXG5cdH0sIGZhbHNlKTtcblxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB7XG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cdH0pO1xuXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4ge1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19saXN0LWJ0bi0tZXhwYW5kZWQnKTtcblx0XHRhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuXHR9KTtcblxuXHRhcHBseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICBcblx0XHRsZXQgcm93QXR0ck5hbWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcblx0XHRsZXQgcm93QXR0clZhbHVlRWxlbXMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgnLmluc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuXG5cdFx0aWYgKGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpXG5cdFx0XHRlbC5hdHRyaWJ1dGVzW25hbWVdLnZhbHVlID0gaW5wdXQudmFsdWU7XG5cblx0XHRpZiAoZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpXG5cdFx0XHRlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cblx0XHRbXS5mb3JFYWNoLmNhbGwocm93QXR0ck5hbWVFbGVtcywgKGF0dHJOYW1lRWwsIGkpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSBuYW1lICYmIGRpc3BsYXkuaWQgPT0gJ2F0dHJfbGlzdCcpIHtcblx0XHRcdFx0cm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gYFwiJHtpbnB1dC52YWx1ZX1cImA7XG5cdFx0XHRcdGF0dHJOYW1lRWwuaW5uZXJUZXh0ID0gbmFtZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF0dHJOYW1lRWwuaW5uZXJUZXh0ID09PSAnc3R5bGUnICYmIGRpc3BsYXkuaWQgPT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRcdFx0bGV0IGxhYmVscyA9IGRpc3BsYXkucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcblx0XHRcdFx0bGV0IHZhbHVlID0gJyc7XG5cblx0XHRcdFx0W10uZm9yRWFjaC5jYWxsKGxhYmVscywgKGxhYmVsLCBpKSA9PiB7XG5cdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwuZmlyc3RDaGlsZC5kYXRhO1xuXHRcdFx0XHRcdHZhbHVlICs9ICc6ICc7XG5cdFx0XHRcdFx0dmFsdWUgKz0gbGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZTtcblxuXHRcdFx0XHRcdGlmIChpIDwgbGFiZWxzLmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0XHR2YWx1ZSArPSAnICc7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBgXCIke3ZhbHVlfVwiYDtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdFx0YXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuXHRcdGFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LWJ0bi0tY29sbGFwc2VkJyk7XG5cblx0fSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJBdHRySW5wdXR9O1xuIiwiLyogcmVuZGVyX2Jyb3dzZXJfaW5mby5qcywgdi4gMC4xLjEsIDE1LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5sZXQgcmVuZGVyQnJvd3NlckluZm8gPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGJyb3dzZXJJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJyb3dzZXJJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5pZCA9ICdicm93c2VyJztcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdicm93c2VyJyk7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fcGFuZWwnKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fZGlzcGxheScpO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pZCA9ICdicm93c2VyX2Rpc3BsYXknO1xuICAgIHJlbmRlckhlYWRlcihicm93c2VySW5mb0NvbnRhaW5lciwgZmFsc2UpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvRGlzcGxheSk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoYnJvd3NlckluZm9Db250YWluZXIpO1xuICAgIFxuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+QXBwIG5hbWU6ICcgKyBuYXZpZ2F0b3IuYXBwQ29kZU5hbWUgKyAnPC9kaXY+JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCB2ZXJzaW9uOiAnICsgbmF2aWdhdG9yLmFwcFZlcnNpb24gKyAnPC9kaXY+JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PlBsYXRmb3JtOiAnICsgbmF2aWdhdG9yLnBsYXRmb3JtICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5Vc2VyIGFnZW50OiAnICsgbmF2aWdhdG9yLnVzZXJBZ2VudCArICc8L2Rpdj4nO1xuXG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckJyb3dzZXJJbmZvfTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlLmpzLCB2LiAwLjEuMywgMTUuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL2NvbnNvbGVfbGlzdGVuJztcbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5jb25zdCBjb25zb2xlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbmNvbnN0IGNvbnNvbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dFByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb25zb2xlJyk7XG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheScpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheS0tY29sbGFwc2VkJyk7XG5jb25zb2xlRGlzcGxheS5pZCA9ICdjb25zb2xlX2Rpc3BsYXknO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0Jyk7XG5jb25zb2xlSW5wdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9faW5wdXQtLWNvbGxhcHNlZCcpO1xuY29uc29sZUlucHV0LmlkID0gJ2NvbnNvbGVfaW5wdXQnO1xuY29uc29sZUlucHV0LnR5cGUgPSAndGV4dCc7XG5jb25zb2xlSW5wdXRQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcHJvbXB0Jyk7XG5jb25zb2xlQ29udGFpbmVyLmlkID0gJ2NvbnNvbGUnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdC0tY29sbGFwc2VkJyk7XG5cbmxldCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMsIHYuIDAuMS4xLCAwNi4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzJztcblxubGV0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pIHtcblxuICAgICAgICBsZXQgaW5wdXRNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5wdXRNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1pJyk7XG4gICAgICAgIGlucHV0TWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctaXByb21wdFwiPjwvc3Bhbj4ke21zZ0FycmF5WzBdfSBgO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRNZXNzYWdlKTtcbiAgICB9XG4gICAgXG4gICAgbGV0IHJldHVybk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHJldHVybk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICByZXR1cm5NZXNzYWdlLmlubmVySFRNTCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj5gO1xuICAgIHJlbmRlckNvbnNvbGVPdXRwdXQobXNnQXJyYXlbMV0sIHJldHVybk1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXR1cm5NZXNzYWdlKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfTtcbiIsIi8vIHJlbmRlcl9jb25zb2xlX291dHB1dC5qcywgdi4gMC4xLjMsIDIxLjA0LjIwMTcgQCBmaWxpcC1zd2luYXJza2lcblxubGV0IHJlbmRlckNvbnNvbGVPdXRwdXQgPSAodmFsLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgaW5kZXgpID0+IHtcblxuICAgIGxldCBvdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IGNoZWNrU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc3BsaXQoJyAnKVsxXTtcbiAgICBsZXQgaHRtbCA9ICcnO1xuXG4gICAgY2hlY2tTdHIgPSBjaGVja1N0ci5zdWJzdHJpbmcoMCwgY2hlY2tTdHIubGVuZ3RoLTEpLnRvTG93ZXJDYXNlKCk7XG4gICAgb3V0cHV0LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHJ9YCk7XG5cdFxuICAgIGlmIChjaGVja1N0ciA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudW1iZXInIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ251bGwnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnc3ltYm9sJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGh0bWwgKz0gY2hlY2tTdHIgPT09ICdzdHJpbmcnID8gYFwiJHt2YWx9XCJgIDogdmFsO1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgfSBlbHNlIGlmIChjaGVja1N0ciA9PT0nZnVuY3Rpb24nKSB7XG4gICAgICAgIGh0bWwgKz0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1rZXlcIj5mdW5jdGlvbiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLW5hbWVcIj4ke3ZhbC5uYW1lfSgpPC9zcGFuPmA7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICB9IGVsc2UgaWYgKGNoZWNrU3RyID09PSAnYXJyYXknIHx8IGNoZWNrU3RyID09PSAnb2JqZWN0Jykge1xuICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpdGVtIGluIHZhbCkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBrZXlDbGFzcyA9IGNoZWNrU3RyID09PSAnYXJyYXknID8gJ2luZGV4JyA6ICdrZXknO1xuICAgICAgICAgICAgbGV0IGNoZWNrU3RyMiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWxbaXRlbV0pLnNwbGl0KCcgJylbMV07XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY2hlY2tTdHIyID0gY2hlY2tTdHIyLnN1YnN0cmluZygwLCBjaGVja1N0cjIubGVuZ3RoLTEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcblxuICAgICAgICAgICAgaWYgKGNoZWNrU3RyMiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ251bGwnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnc3ltYm9sJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQga2V5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2tleUNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgICAgICAgICAgICB2YWx1ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtjaGVja1N0cjJ9YCk7XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmlubmVySFRNTCA9IGNoZWNrU3RyMiA9PT0gJ3N0cmluZycgPyBgXCIke3ZhbFtpdGVtXX1cImAgOiB2YWxbaXRlbV07XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKGtleUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZCh2YWx1ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGVja1N0cjIgPT09J2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1rZXlcIj5mdW5jdGlvbiA8L3NwYW4+PHNwYW4gY2xhc3M9XCJjb25zb2xlX19mLW5hbWVcIj4ke3ZhbC5uYW1lfSgpPC9zcGFuPmA7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICAgICAgfSBlbHNlIHtcblx0XHRcdFx0XG4gICAgICAgICAgICAgICAgbGV0IGtleUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7a2V5Q2xhc3N9YCk7XG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIG91dHB1dC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZW5kZXJDb25zb2xlT3V0cHV0KHZhbFtpdGVtXSwgb3V0cHV0LCBpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gXG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCA9IHZhbDtcbiAgICB9XG5cdFxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3V0cHV0KTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZU91dHB1dH07XG4iLCIvKiByZW5kZXJfZG9tLmpzLCB2LiAwLjEuOSwgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtkb21FbGVtZW50TGlzdGVufSBmcm9tICcuL2RvbV9lbGVtZW50X2xpc3Rlbi5qcyc7XG5cbmxldCByZW5kZXJET00gPSAoZWxlbSwgcGFyZW50RWwsIGxldmVsKSA9PiB7XG5cbiAgICBpZiAoZWxlbS5pZCA9PT0gJ2Rldl90b29scycpXG4gICAgICAgIHJldHVybjtcblxuICAgIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgcm93MiA9IGVsZW0uY2hpbGRyZW4ubGVuZ3RoID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzFFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzFPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzFDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cyRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cyT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cyQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tb3BlbmluZycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jbG9zaW5nJyk7XG4gICAgXG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1uYW1lJyk7IFxuICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzFDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93Mk9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MkNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cxT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPCc7XG4gICAgcm93MUNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MU9wZW5BcnJvdyk7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxRWxlbWVudFR5cGVTcGFuKTtcbiAgICBcbiAgICBpZiAoZWxlbS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGF0dHJOYW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGxldCBhdHRyRXF1YWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgbGV0IGF0dHJWYWx1ZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcbiAgICAgICAgICAgIGF0dHJOYW1lU3Bhbi5pbm5lclRleHQgPSBhdHRyLmxvY2FsTmFtZTtcbiAgICAgICAgICAgIGF0dHJFcXVhbFNwYW4uaW5uZXJUZXh0ID0gJz0nO1xuICAgICAgICAgICAgYXR0clZhbHVlU3Bhbi5pbm5lclRleHQgPSAnXCInICsgYXR0ci52YWx1ZSArICdcIic7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJOYW1lU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJFcXVhbFNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyVmFsdWVTcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVx0XG4gICAgXG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxQ2xvc2VBcnJvdyk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChyb3cxKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZXhwJyk7XG4gICAgXG4gICAgaWYgKGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IHRleHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBcbiAgICAgICAgdGV4dEVsLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZXhwJyk7XG4gICAgICAgIHRleHRFbC5pbm5lclRleHQgPSBlbGVtLnRleHQudHJpbSgpO1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRleHRFbClcblxuICAgICAgICBpZiAobGV2ZWwgPCAyKSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGxldmVsICs9IDE7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIHJlbmRlckRPTShlbCwgd3JhcHBlciwgbGV2ZWwpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPCAyKSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcm93Mk9wZW5BcnJvdy5pbm5lclRleHQgPSAgJzwvJztcbiAgICByb3cyQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzJFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyT3BlbkFycm93KTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJFbGVtZW50VHlwZVNwYW4pO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkNsb3NlQXJyb3cpO1xuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCB8fCBlbGVtLnRleHQgJiYgZWxlbS50ZXh0Lmxlbmd0aClcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBlbHNlXG4gICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93Mik7XG4gICAgXG5cdGRvbUVsZW1lbnRMaXN0ZW4oZWxlbSwgcm93MSwgcm93MU9wZW5BcnJvdyk7XG4gICAgcGFyZW50RWwuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG59XG5leHBvcnQge3JlbmRlckRPTX07XG4iLCIvKiByZW5kZXJfaGVhZGVyLmpzLCB2LiAwLjEuMSwgMjEuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxudmFyIHJlbmRlckhlYWRlciA9IChjb250YWluZXIsIGV4cGFuZGVkKSA9PiB7XG4gICBcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHRvZ2dsZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgdGl0bGUgPSBjb250YWluZXIuaWQ7XG4gICBcbiAgICBoZWFkZXIuaWQgPSBgJHtjb250YWluZXIuaWR9X2hlYWRlcmA7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX2hlYWRlcmApO1xuICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGVgKTtcbiAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHt0aXRsZX1fX3RpdGxlXCI+JHt0aXRsZX08L3NwYW4+YDtcbiAgIFxuICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1leHBhbmRlZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWNvbGxhcHNlZGApO1xuICAgIH1cbiAgIFxuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0b2dnbGVCdG4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgXG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICBcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW10uZmlsdGVyLmNhbGwoY29udGFpbmVyLmNoaWxkcmVuLCBlbCA9PiBlbC5pZCAhPT0gYCR7cGFyZW50LmlkfV9oZWFkZXJgKTtcbiAgICAgICBcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC50b2dnbGUoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tZXhwYW5kZWRgKTtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC50b2dnbGUoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tY29sbGFwc2VkYCk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShgJHtlbC5jbGFzc0xpc3RbMF19LS1leHBhbmRlZGApO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShgJHtlbC5jbGFzc0xpc3RbMF19LS1jb2xsYXBzZWRgKTtcbiAgICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHtyZW5kZXJIZWFkZXJ9O1xuIiwiLyogcmVuZGVyX2luc3BlY3Rvci5qcywgdi4gMC4xLjYsIDIxLjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyRE9NfSBmcm9tICcuL3JlbmRlcl9kb20uanMnO1xuaW1wb3J0IHtyZW5kZXJIZWFkZXJ9IGZyb20gJy4vcmVuZGVyX2hlYWRlci5qcyc7XG5cbmxldCByZW5kZXJJbnNwZWN0b3IgPSAoYm9keSwgcGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGluc3BlY3RvckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBpbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgaHRtbEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gICAgbGV0IGxldmVsID0gMDtcblxuICAgIGluc3BlY3RvckNvbnRhaW5lci5pZCA9ICdpbnNwZWN0b3InO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3InKTtcbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfX3BhbmVsJyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2Rpc3BsYXknKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmlkID0gJ2luc3BlY3Rvcl9kaXNwbGF5JztcbiAgICByZW5kZXJIZWFkZXIoaW5zcGVjdG9yQ29udGFpbmVyLCB0cnVlKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheS0tZXhwYW5kZWQnKTtcbiAgICBpbnNwZWN0b3JDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yRGlzcGxheSk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoaW5zcGVjdG9yQ29udGFpbmVyKTtcbiAgICByZW5kZXJET00oaHRtbEVsZW0sIGluc3BlY3RvckRpc3BsYXksIGxldmVsKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3J9O1xuIiwiLyogcmVuZGVyX3BvcHVwLmpzLCB2LiAwLjEuNCwgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJQb3B1cFNlY3Rpb259IGZyb20gJy4vcmVuZGVyX3BvcHVwX3NlY3Rpb24uanMnO1xuXG5sZXQgcmVuZGVyUG9wdXAgPSAoZWxlbWVudCwgcm93KSA9PiB7XG5cbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rldl90b29scycpO1xuICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBjbG9zZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IGF0dHJpYnV0ZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGxldCBzdHlsZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGxldCBwb3B1cFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bGV0IGhpZ2hsaWdodFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XG5cdHBvcHVwV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fd3JhcHBlcicpO1xuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jbG9zZScpO1xuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICd4JztcblxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICB9LCBmYWxzZSk7XG5cblx0cmVuZGVyUG9wdXBTZWN0aW9uKCdhdHRyX2xpc3QnLCAnQXR0cmlidXRlcycsIGVsZW1lbnQsIHJvdywgYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuXHRyZW5kZXJQb3B1cFNlY3Rpb24oJ3N0eWxlX2xpc3QnLCAnSW5saW5lIHN0eWxlcycsIGVsZW1lbnQsIHJvdywgc3R5bGVMaXN0V3JhcHBlcik7XG5cdHJlbmRlclBvcHVwU2VjdGlvbignaGlnaGxpZ2h0X3NlY3Rpb24nLCAnSGlnaGxpZ2h0IGVsZW1lbnQnLCBlbGVtZW50LCByb3csIGhpZ2hsaWdodFdyYXBwZXIpO1xuXG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgcG9wdXBXcmFwcGVyLmFwcGVuZENoaWxkKHN0eWxlTGlzdFdyYXBwZXIpO1xuICAgIHBvcHVwV3JhcHBlci5hcHBlbmRDaGlsZChoaWdobGlnaHRXcmFwcGVyKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwb3B1cFdyYXBwZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3B1cCk7XG59O1xuXG5leHBvcnQge3JlbmRlclBvcHVwfTtcbiIsIi8qIHJlbmRlcl9wb3B1cF9zZWN0aW9uLmpzLCB2LiAwLjEuMiwgMTguMDkuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJBdHRySW5wdXR9IGZyb20gJy4vcmVuZGVyX2F0dHJpYnV0ZV9pbnB1dC5qcyc7XG5pbXBvcnQge2FkZEJ1dHRvbkFjdGlvbn0gZnJvbSAnLi9hZGRfYnV0dG9uX2FjdGlvbi5qcyc7XG5pbXBvcnQge2FwcGx5QnV0dG9uQWN0aW9ufSBmcm9tICcuL2FwcGx5X2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtjYW5jZWxCdXR0b25BY3Rpb259IGZyb20gJy4vY2FuY2VsX2J1dHRvbl9hY3Rpb24uanMnO1xuaW1wb3J0IHtoaWdobGlnaHRCb3hBY3Rpb259IGZyb20gJy4vaGlnaGxpZ2h0X2JveF9hY3Rpb24uanMnO1xuXG5sZXQgcmVuZGVyUG9wdXBTZWN0aW9uID0gKGlkLCB0aXRsZSwgZWxlbWVudCwgcm93LCBsaXN0V3JhcHBlcikgPT4ge1xuXG5cdGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblx0bGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsZXQgc2VjdGlvbk5hbWUgPSAnJztcblxuXHRoZWFkZXIuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwicG9wdXBfX2hlYWRsaW5lXCI+JHt0aXRsZX08L3NwYW4+YDtcblx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oZWFkZXInKTtcblx0bGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblx0bGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3NlY3Rpb24nKTtcblx0bGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZChgcG9wdXBfX3NlY3Rpb24tLSR7c2VjdGlvbk5hbWV9YCk7XG5cblx0aWYgKGlkID09PSAnYXR0cl9saXN0JyB8fCBpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cblx0XHRsZXQgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0bGV0IGFkZEFwcGx5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0bGV0IGFkZENhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGxldCB2YWx1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRsZXQgbmFtZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdGxldCB2YWx1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdGxldCBhcnI7XG5cdFx0XG5cdFx0aWYgKGlkID09PSAnYXR0cl9saXN0Jykge1xuXHRcdFx0YXJyID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBhdHRyID0+IGF0dHIubmFtZSAhPT0gJ3N0eWxlJyk7XG5cdFx0XHRzZWN0aW9uTmFtZSA9ICdhdHRyaWJ1dGVzJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJyID0gW107XG5cdFx0XHRzZWN0aW9uTmFtZSA9ICdzdHlsZXMnO1xuXHRcdH1cblxuXHRcdGxpc3QuaWQgPSBpZDtcblx0XHRhZGRCdG4uaW5uZXJUZXh0ID0gJysnO1xuXHRcdGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkJyk7XG5cdFx0YWRkQXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5Jztcblx0XHRhZGRDYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XG5cdFx0YWRkQXBwbHlCdG4uaWQgPSBgYWRkXyR7aWQucmVwbGFjZSgnX2xpc3QnLCAnJyl9X2J0bmA7XG5cdFx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5Jyk7XG5cdFx0YWRkQ2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jYW5jZWwnKTtcblx0XHRuYW1lSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IG5hbWUgJyA6ICdhdHRyaWJ1dGUgbmFtZSAnO1xuXHRcdHZhbHVlSW5wdXRMYWJlbC5pbm5lclRleHQgPSBpZCA9PT0gJ3N0eWxlX2xpc3QnID8gJ3Byb3BlcnR5IHZhbHVlICcgOiAnYXR0cmlidXRlIHZhbHVlICc7XG5cdFx0bmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdFx0bmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtaW5wdXQnKTtcblx0XHR2YWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG5cdFx0dmFsdWVJbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWlucHV0Jyk7XG5cdFx0YWRkQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcblx0XHRhZGRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2NhbmNlbC0tY29sbGFwc2VkJyk7XG5cdFx0bmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG5cdFx0dmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRDYW5jZWxCdG4pO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChhZGRBcHBseUJ0bik7XG5cdFx0bmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblx0XHR2YWx1ZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dCk7XG5cdFx0aGVhZGVyLmFwcGVuZENoaWxkKG5hbWVJbnB1dExhYmVsKTtcblx0XHRoZWFkZXIuYXBwZW5kQ2hpbGQodmFsdWVJbnB1dExhYmVsKTtcblx0XHRsaXN0V3JhcHBlci5hcHBlbmRDaGlsZChsaXN0KTtcblxuXHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnICYmIGVsZW1lbnQuYXR0cmlidXRlcyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUpIHtcblx0XHRcdGFyciA9ICcnLnNwbGl0LmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlLnZhbHVlLCAnOyAnKVxuXHRcdFx0YXJyID0gYXJyLm1hcChydWxlID0+IHJ1bGUucmVwbGFjZSgnOycsICcnKSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaXRlbSBpbiBhcnIpIHtcblx0XHRcdFxuXHRcdFx0bGV0IG5hbWU7XG5cdFx0XHRsZXQgdmFsdWU7XG5cblx0XHRcdGlmIChpZCA9PT0gJ3N0eWxlX2xpc3QnKSB7XG5cdFx0XHRcdG5hbWUgPSBhcnJbaXRlbV0uc3BsaXQoJzogJylbMF07XG5cdFx0XHRcdHZhbHVlID0gYXJyW2l0ZW1dLnNwbGl0KCc6ICcpWzFdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmFtZSA9IGFycltpdGVtXS5uYW1lO1xuXHRcdFx0XHR2YWx1ZSA9IGFycltpdGVtXS52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGxpc3QsIHJvdywgbmFtZSwgdmFsdWUpO1xuXHRcdH1cblxuXHRcdGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRhZGRCdXR0b25BY3Rpb24oYWRkQXBwbHlCdG4sIGFkZENhbmNlbEJ0biwgbmFtZUlucHV0TGFiZWwsIHZhbHVlSW5wdXRMYWJlbCwgaGVhZGVyKTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0YWRkQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRhcHBseUJ1dHRvbkFjdGlvbihlbGVtZW50LCBhZGRBcHBseUJ0biwgdmFsdWVJbnB1dExhYmVsLCBuYW1lSW5wdXRMYWJlbCwgYXJyLCBsaXN0LCByb3csIGhlYWRlcik7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdGFkZENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGNhbmNlbEJ1dHRvbkFjdGlvbihhZGRBcHBseUJ0biwgYWRkQ2FuY2VsQnRuLCB2YWx1ZUlucHV0TGFiZWwsIG5hbWVJbnB1dExhYmVsLCBoZWFkZXIpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSBlbHNlIGlmIChpZCA9PT0gJ2hpZ2hsaWdodF9zZWN0aW9uJykge1xuXG5cdFx0bGV0IGhpZ2hsaWdodENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblxuXHRcdHNlY3Rpb25OYW1lID0gJ2hpZ2hsaWdodCc7XG5cdFx0aGlnaGxpZ2h0Q2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG5cdFx0aGlnaGxpZ2h0Q2hlY2tib3guY2xhc3NMaXN0LmFkZCgncG9wdXBfX2hpZ2hsaWdodCcpO1xuXHRcdGhlYWRlci5hcHBlbmRDaGlsZChoaWdobGlnaHRDaGVja2JveCk7XG5cblx0XHRpZiAoZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKC9iYWNrZ3JvdW5kLWNvbG9yOiByZ2JcXCgxNzAsIDIyMSwgMjU1XFwpIFxcIWltcG9ydGFudC8pIFxuXHRcdFx0fHwgZWxlbWVudC5zdHlsZS5jc3NUZXh0Lm1hdGNoKC9iYWNrZ3JvdW5kLWNvbG9yOiBcXCNhZGYgXFwhaW1wb3J0YW50LykpXG5cdFx0XHRoaWdobGlnaHRDaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcblxuXHRcdGhpZ2hsaWdodENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcblx0XHRcdGhpZ2hsaWdodEJveEFjdGlvbihlbGVtZW50KTtcblx0XHR9LCBmYWxzZSk7XG5cdH1cblxufTtcblxuZXhwb3J0IHtyZW5kZXJQb3B1cFNlY3Rpb259O1xuIl19
