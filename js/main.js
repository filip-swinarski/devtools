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

},{"./modules/console_listen.js":2,"./modules/dt_console_api.js":4,"./modules/load_styles.js":6,"./modules/render_browser_info.js":7,"./modules/render_console.js":8,"./modules/render_inspector.js":13}],2:[function(require,module,exports){
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

},{"./global_eval.js":5,"./render_console.js":8,"./render_console_message.js":9}],3:[function(require,module,exports){
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

},{"./render_console.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = undefined;

var _console_log = require('./console_log.js');

var log = function log(value) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    (0, _console_log.consoleLog)(str, value);
}; /* dt_console_api.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

exports.log = log;

},{"./console_log.js":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
}; /* render_browser_info.js, v. 0.1.0, 29.03.2017, @ filip-swinarski */

exports.renderBrowserInfo = renderBrowserInfo;

},{"./render_header.js":12}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleInput = exports.consoleDisplay = exports.renderConsole = undefined;

var _console_listen = require('./console_listen');

var _render_header = require('./render_header.js');

/* render_console.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

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

},{"./console_listen":2,"./render_header.js":12}],9:[function(require,module,exports){
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

},{"./render_console_output.js":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// render_console_output.js, v. 0.1.1, 07.04.2017 @ filip-swinarski

var renderConsoleOutput = function renderConsoleOutput(val) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
    var index = arguments[2];


    var output = document.createElement('span');
    var checkStr = Object.prototype.toString.call(val).split(' ')[1];
    var html = '';

    checkStr = checkStr.substring(0, checkStr.length - 1).toLowerCase();
    output.classList.add('console__' + checkStr);
    console.log(checkStr);

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

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderDOM = undefined;

var _render_popup = require('./render_popup.js');

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

    row1.addEventListener('touchstart', function (e) {
        startDate = new Date();
        tObj = e.touches[0];
        startX = tObj.pageX;
        startY = tObj.pageY;
    }, false);
    row1.addEventListener('touchmove', function (e) {
        tObj = e.changedTouches[0];
        endX = tObj.pageX;
        endY = tObj.pageY;
        distX = endX - startX;
        distY = endY - startY;

        if (Math.abs(distX) > maxX) maxX = Math.abs(distX);

        if (Math.abs(distY) > maxY) maxY = Math.abs(distY);
    }, false);
    row1.addEventListener('touchend', function (e) {

        var endDate = new Date();
        var dateAmp = endDate - startDate;

        tObj = e.changedTouches[0];
        endX = tObj.pageX;
        endY = tObj.pageY;
        distX = endX - startX;
        distY = endY - startY;

        if (maxY <= 30 && maxX <= 30) {

            if (dateAmp <= 200) {
                row1.classList.toggle('inspector__row--expanded');
                row1.classList.toggle('inspector__row--collapsed');

                if (row1OpenArrow.classList.contains('inspector__tag-open--expanded') || row1OpenArrow.classList.contains('inspector__tag-open--collapsed')) {
                    row1OpenArrow.classList.toggle('inspector__tag-open--expanded');
                    row1OpenArrow.classList.toggle('inspector__tag-open--collapsed');
                }
            } else {
                (0, _render_popup.renderPopup)(elem, row1);
            }
        } else {
            row1.remove();
            row2.remove();
            elem.remove();
        }

        maxX = 0;
        maxY = 0;
    }, false);

    parentEl.appendChild(wrapper);
}; /* render_dom.js, v. 0.1.7, 05.04.2017, @ filip-swinarski */

exports.renderDOM = renderDOM;

},{"./render_popup.js":14}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* render_header.js, v. 0.1.0, 14.04.2017, @ filip-swinarski */

var renderHeader = function renderHeader(container, expanded) {

  var header = document.createElement('div');
  var toggleBtn = document.createElement('span');
  var title = container.id;

  header.id = parent.id + '_header';
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderInspector = undefined;

var _render_dom = require('./render_dom.js');

var _render_header = require('./render_header.js');

/* render_inspector.js, v. 0.1.4, 29.03.2017, @ filip-swinarski */

var renderInspector = function renderInspector(body, panel) {

    var inspectorDisplay = document.createElement('div');
    var inspectorContainer = document.createElement('div');
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
    (0, _render_dom.renderDOM)(body, inspectorDisplay, level);
};

exports.renderInspector = renderInspector;

},{"./render_dom.js":11,"./render_header.js":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_popup.js, v. 0.1.1, 15.04.2017, @ filip-swinarski */

var renderPopup = function renderPopup(element, row) {

    var container = document.querySelector('#dev_tools');
    var popup = document.createElement('div');
    var attributeListWrapper = document.createElement('div');
    var styleListWrapper = document.createElement('div');
    var attributeList = document.createElement('ul');
    var styleList = document.createElement('ul');
    var closeBtn = document.createElement('div');
    var attributeListHeader = document.createElement('div');
    var styleListHeader = document.createElement('div');
    var filteredAttributes = [].filter.call(element.attributes, function (attr) {
        return attr.name !== 'style';
    });
    var inlineStyles = [];
    var addAttrBtn = document.createElement('button');
    var addAttrApplyBtn = document.createElement('button');
    var attrNameInput = document.createElement('input');
    var attrValueInput = document.createElement('input');
    var attrNameInputLabel = document.createElement('label');
    var attrValueInputLabel = document.createElement('label');
    var addStyleBtn = document.createElement('button');
    var addStyleApplyBtn = document.createElement('button');
    var styleNameInput = document.createElement('input');
    var styleValueInput = document.createElement('input');
    var styleNameInputLabel = document.createElement('label');
    var styleValueInputLabel = document.createElement('label');

    var renderAttrInput = function renderAttrInput(el, display, row, name, value) {

        var input = document.createElement('input');
        var label = document.createElement('label');
        var separator = document.createElement('span');
        var applyBtn = document.createElement('button');
        var listElement = document.createElement('li');

        input.type = 'text';
        input.value = value;
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

                if (display.id == 'attr_list') el.attributes[name].value = input.value;

                if (display.id == 'style_list') el.style[name] = input.value.replace(';', '');

                var rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
                var rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

                [].forEach.call(rowAttrNameElems, function (attrNameEl, i) {

                    if (attrNameEl.innerText === name) {
                        rowAttrValueElems[i].innerText = input.value;
                        attrNameEl.innerText = name;
                    }
                });
            }
        }, false);

        input.addEventListener('focus', function (e) {
            applyBtn.classList.add('popup__list-btn--expanded');
            applyBtn.classList.remove('popup__list-btn--collapsed');
        });

        applyBtn.addEventListener('click', function (e) {

            if (display.id == 'attr_list') el.attributes[name].value = input.value;

            if (display.id == 'style_list') el.style[name] = input.value.replace(';', '');

            var rowAttrNameElems = row.querySelectorAll('.inspector__attr-name');
            var rowAttrValueElems = row.querySelectorAll('.inspector__attr-value');

            applyBtn.classList.remove('popup__list-btn--expanded');
            applyBtn.classList.add('popup__list-btn--collapsed');
            [].forEach.call(rowAttrNameElems, function (attrNameEl, i) {

                if (attrNameEl.innerText === name) {
                    rowAttrValueElems[i].innerText = input.value;
                    attrNameEl.innerText = name;
                }
            });
        }, false);
    };

    styleList.id = 'style_list';
    attributeList.id = 'attr_list';
    popup.classList.add('popup');
    attributeListWrapper.classList.add('popup__section');
    attributeListWrapper.classList.add('popup__section--attributes');
    styleListWrapper.classList.add('popup__section');
    styleListWrapper.classList.add('popup__section--styles');
    closeBtn.classList.add('popup__close');
    attributeListHeader.innerHTML = '<span class="popup__headline">Attributes</span>';
    styleListHeader.innerHTML = '<span class="popup__headline">Inline styles</span>';
    closeBtn.innerHTML = 'x';

    addAttrBtn.innerText = '+';
    addAttrBtn.classList.add("popup__add");
    addAttrApplyBtn.innerText = 'Apply';
    attrNameInputLabel.innerText = 'attribute name ';
    attrValueInputLabel.innerText = 'attribute value ';
    addAttrApplyBtn.classList.add('popup__apply');
    attrNameInput.type = 'text';
    attrNameInput.classList.add('popup__add-input');
    attrValueInput.type = 'text';
    attrValueInput.classList.add('popup__add-input');
    addAttrApplyBtn.classList.add('popup__apply--collapsed');
    attrNameInputLabel.classList.add('popup__add-label--collapsed');
    attrValueInputLabel.classList.add('popup__add-label--collapsed');
    attributeListHeader.appendChild(addAttrBtn);
    attributeListHeader.appendChild(addAttrApplyBtn);
    attrValueInputLabel.appendChild(attrValueInput);
    attrNameInputLabel.appendChild(attrNameInput);
    attributeListHeader.appendChild(attrNameInputLabel);
    attributeListHeader.appendChild(attrValueInputLabel);

    addStyleBtn.innerText = '+';
    addStyleBtn.classList.add('popup__add');
    addStyleApplyBtn.innerText = 'Apply';
    addStyleApplyBtn.classList.add('popup__apply');
    styleNameInputLabel.innerText = 'property name ';
    styleValueInputLabel.innerText = 'property value ';
    styleNameInput.type = 'text';
    styleNameInput.classList.add('popup__add-input');
    styleValueInput.type = 'text';
    styleValueInput.classList.add('popup__add-input');
    addStyleApplyBtn.classList.add('popup__apply--collapsed');
    styleNameInputLabel.classList.add('popup__add-label--collapsed');
    styleValueInputLabel.classList.add('popup__add-label--collapsed');
    styleListHeader.appendChild(addStyleBtn);
    styleListHeader.appendChild(addStyleApplyBtn);
    styleNameInputLabel.appendChild(styleNameInput);
    styleValueInputLabel.appendChild(styleValueInput);
    styleListHeader.appendChild(styleNameInputLabel);
    styleListHeader.appendChild(styleValueInputLabel);

    if (element.attributes && element.attributes.style) inlineStyles = ''.split.call(element.attributes.style.value, '; ');

    for (var attr in filteredAttributes) {

        var name = filteredAttributes[attr].name;
        var value = filteredAttributes[attr].value;

        renderAttrInput(element, attributeList, row, name, value);
    }

    for (var rule in inlineStyles) {

        var _name = inlineStyles[rule].split(': ')[0];
        var _value = inlineStyles[rule].split(': ')[1];

        renderAttrInput(element, styleList, row, _name, _value);
    }

    closeBtn.addEventListener('click', function () {
        popup.remove();
    }, false);

    addAttrBtn.addEventListener('click', function (e) {
        addAttrApplyBtn.classList.remove('popup__apply--collapsed');
        attrNameInputLabel.classList.remove('popup__add-label--collapsed');
        attrValueInputLabel.classList.remove('popup__add-label--collapsed');
        addAttrApplyBtn.classList.add('popup__apply--expanded');
        attrNameInputLabel.classList.add('popup__add-label--expanded');
        attrValueInputLabel.classList.add('popup__add-label--expanded');
    }, false);

    addStyleBtn.addEventListener('click', function (e) {
        addStyleApplyBtn.classList.remove('popup__apply--collapsed');
        styleNameInputLabel.classList.remove('popup__add-label--collapsed');
        styleValueInputLabel.classList.remove('popup__add-label--collapsed');
        addStyleApplyBtn.classList.add('popup__apply--expanded');
        styleNameInputLabel.classList.add('popup__add-label--expanded');
        styleValueInputLabel.classList.add('popup__add-label--expanded');
    }, false);

    addAttrApplyBtn.addEventListener('click', function () {

        var value = attrValueInput.value;
        var name = attrNameInput.value;

        element.setAttribute(name, value);
        filteredAttributes = [].filter.call(element.attributes, function (attr) {
            return attr.name !== 'style';
        });
        attributeList.innerHTML = '';
        attrNameInputLabel.classList.add('popup__add-label--collapsed');
        attrNameInputLabel.classList.remove('popup__add-label--expanded');
        attrValueInputLabel.classList.add('popup__add-label--collapsed');
        attrValueInputLabel.classList.remove('popup__add-label--expanded');
        attrNameInput.value = '';
        attrValueInput.value = '';
        addAttrApplyBtn.classList.add('popup__apply--collapsed');
        addAttrApplyBtn.classList.remove('popup__apply--expanded');
        [].forEach.call(filteredAttributes, function (attr) {
            renderAttrInput(element, attributeList, row, attr.name, attr.value);
        });
    }, false);

    addStyleApplyBtn.addEventListener('click', function () {

        var value = styleValueInput.value;
        var name = styleNameInput.value;

        inlineStyles.push(name + ': ' + value + ';');
        element.style[name] = value;
        styleList.innerHTML = '';
        styleNameInputLabel.classList.add('popup__add-label--collapsed');
        styleNameInputLabel.classList.remove('popup__add-label--expanded');
        styleValueInputLabel.classList.add('popup__add-label--collapsed');
        styleValueInputLabel.classList.remove('popup__add-label--expanded');
        styleNameInput.value = '';
        styleValueInput.value = '';
        addStyleApplyBtn.classList.add('popup__apply--collapsed');
        addStyleApplyBtn.classList.remove('popup__apply--expanded');
        [].forEach.call(inlineStyles, function (rule) {
            renderAttrInput(element, styleList, row, rule.split(': ')[0], rule.split(': ')[1]);
        });
    }, false);

    attributeListHeader.classList.add('popup__header');
    styleListHeader.classList.add('popup__header');
    attributeList.classList.add('popup__list');
    styleList.classList.add('popup__list');
    attributeListWrapper.appendChild(attributeListHeader);
    attributeListWrapper.appendChild(attributeList);
    styleListWrapper.appendChild(styleListHeader);
    styleListWrapper.appendChild(styleList);
    popup.appendChild(closeBtn);
    popup.appendChild(attributeListWrapper);
    popup.appendChild(styleListWrapper);
    container.appendChild(popup);
};

exports.renderPopup = renderPopup;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvbWFpbi5qcyIsImpzL2VzNi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzIiwianMvZXM2L21vZHVsZXMvY29uc29sZV9sb2cuanMiLCJqcy9lczYvbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyIsImpzL2VzNi9tb2R1bGVzL2dsb2JhbF9ldmFsLmpzIiwianMvZXM2L21vZHVsZXMvbG9hZF9zdHlsZXMuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2RvbS5qcyIsImpzL2VzNi9tb2R1bGVzL3JlbmRlcl9oZWFkZXIuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX3BvcHVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFBWSxTOzs7O0FBUFo7O0FBU0EsSUFBTSxPQUFPLFNBQVMsSUFBdEI7QUFDQSxJQUFNLFlBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWxCOztBQUVBLFVBQVUsRUFBVixHQUFlLFdBQWY7QUFDQSxVQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsT0FBeEI7QUFDQSxLQUFLLFdBQUwsQ0FBaUIsU0FBakI7QUFDQTtBQUNBLHVDQUFnQixJQUFoQixFQUFzQixTQUF0QjtBQUNBLG1DQUFjLFNBQWQ7QUFDQSw0Q0FBa0IsU0FBbEI7O0FBRUEsT0FBTyxTQUFQLEdBQW1CLFNBQW5COzs7Ozs7Ozs7O0FDbEJBOztB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QUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0IsWUFBaEIsRUFBOEIsVUFBQyxJQUFELEVBQVU7QUFDcEMsNEJBQWdCLE9BQWhCLEVBQXlCLFNBQXpCLEVBQW9DLEdBQXBDLEVBQXlDLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsQ0FBakIsQ0FBekMsRUFBOEQsS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixDQUFqQixDQUE5RDtBQUNILFNBRkQ7QUFHSCxLQW5CRCxFQW1CRyxLQW5CSDs7QUFxQkEsd0JBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLGVBQWxDO0FBQ0Esb0JBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLGVBQTlCO0FBQ0Esa0JBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixhQUE1QjtBQUNBLGNBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixhQUF4QjtBQUNBLHlCQUFxQixXQUFyQixDQUFpQyxtQkFBakM7QUFDQSx5QkFBcUIsV0FBckIsQ0FBaUMsYUFBakM7QUFDQSxxQkFBaUIsV0FBakIsQ0FBNkIsZUFBN0I7QUFDQSxxQkFBaUIsV0FBakIsQ0FBNkIsU0FBN0I7QUFDQSxVQUFNLFdBQU4sQ0FBa0IsUUFBbEI7QUFDQSxVQUFNLFdBQU4sQ0FBa0Isb0JBQWxCO0FBQ0EsVUFBTSxXQUFOLENBQWtCLGdCQUFsQjtBQUNBLGNBQVUsV0FBVixDQUFzQixLQUF0QjtBQUNILENBOVBEOztRQWdRUSxXLEdBQUEsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS4xIDMwLjAzLjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtsb2FkU3R5bGVzfSBmcm9tICcuL21vZHVsZXMvbG9hZF9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQnJvd3NlckluZm99IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzJztcbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzJztcbmltcG9ydCAqIGFzIERUQ29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5jb250YWluZXIuaWQgPSAnZGV2X3Rvb2xzJztcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29scycpO1xuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xubG9hZFN0eWxlcygpO1xucmVuZGVySW5zcGVjdG9yKGJvZHksIGNvbnRhaW5lcik7XG5yZW5kZXJDb25zb2xlKGNvbnRhaW5lcik7XG5yZW5kZXJCcm93c2VySW5mbyhjb250YWluZXIpO1xuXG53aW5kb3cuRFRDb25zb2xlID0gRFRDb25zb2xlO1xuIiwiLyogY29uc29sZV9saXN0ZW4uanMsIHYuIDAuMS41LCAwNi4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7Y29uc29sZUlucHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZU1lc3NhZ2V9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5sZXQgY29uc29sZUxpc3RlbiA9ICgpID0+IHtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xuXG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvckxpbmVObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yQ29sdW1uTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGxldCByb3cgPSByZW5kZXJDb25zb2xlTWVzc2FnZShlLmRldGFpbCk7XG5cbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3JvdycpO1xuICAgICAgICBjb25zb2xlRGlzcGxheS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnNvbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGdsb2JhbEV2YWwoY29uc29sZUlucHV0LnZhbHVlKTtcblxuICAgICAgICAgICAgRFRDb25zb2xlLmxvZyh2YWx1ZSwgY29uc29sZUlucHV0LnZhbHVlKTtcdFxuICAgICAgICAgICAgY29uc29sZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxpc3Rlbn07XG4iLCIvKiBjb25zb2xlX2xvZy5qcywgdi4gMC4xLjIsIDMwLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuXG5sZXQgY29uc29sZUxvZyA9IChzdHIsIHZhbHVlKSA9PiB7XG5cbiAgICBsZXQgbG9nID0gbmV3IEN1c3RvbUV2ZW50KCdsb2cnLCB7ZGV0YWlsOiBbc3RyLCB2YWx1ZV19KTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmRpc3BhdGNoRXZlbnQobG9nKTtcblxufVxuXG5leHBvcnQge2NvbnNvbGVMb2d9O1xuIiwiLyogZHRfY29uc29sZV9hcGkuanMsIHYuIDAuMS4yLCAzMC4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVMb2d9IGZyb20gJy4vY29uc29sZV9sb2cuanMnO1xuXG5sZXQgbG9nID0gKHZhbHVlLCBzdHIgPSAnJykgPT4ge1xuICAgIGNvbnNvbGVMb2coc3RyLCB2YWx1ZSk7XG59XG5cbmV4cG9ydCB7bG9nfTtcbiIsIi8qIGdsb2JhbF9ldmFsLmpzLCB2LiAwLjEuMCwgMzEuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuLy8gZXZhbCAtIHJ1bnMgYmxvY2sgc2NvcGUgZGVjbGFyYXRpb25zIHZpYSBzY3JpcHQgaW5qZWN0aW9uXG4vLyBvdGhlcndpc2Ugc3RhbmRhcmQgZXZhbCB1c2VkIFxuLy8gLSB0aGluayBpZiBub3QgdXNlIGluamVjdGlvbiBleGNsdXNpdmVseVxuLy8gcmV0dXJucyB2YWx1ZVxuY29uc3QgZ2xvYmFsRXZhbCA9IChzdHIpID0+IHtcblxuICAgICd1c2Ugc3RyaWN0JzsgLy8gcHJldmVudCBjcmVhdGluZyBsb2NhbCB2YXJpYWJsZXMgd2l0aCBzdGFuZGFyZCBldmFsXG4gICAgXG4gICAgaWYgKHN0ci5zdGFydHNXaXRoKCdsZXQgJykgfHwgc3RyLnN0YXJ0c1dpdGgoJ2NvbnN0ICcpKSB7IC8vIGNvZGUgZm9yIHNjcmlwdCBpbnNlcnRpb25cblxuICAgICAgICBsZXQgc2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdF9zY3JpcHQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpLnJlbW92ZSgpXG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LmlkID0gJ2R0X3NjcmlwdCc7XG4gICAgICAgIHNjcmlwdC5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gcmV0dXJucyB1bmRlZmluZWQgd2hlbiBkZWNsYXJpbmcgYmxvY2sgc2NvcGVkIHZhcmlhYmxlXG4gICAgfSBlbHNlIHsgLy9zdGFuZGFyZCBldmFsXG4gICAgICAgIHJldHVybiAoMSwgZXZhbCkoc3RyKTsgLy8gaW5kaXJlY3QgY2FsbCB0byBhY2Nlc3MgZ2xvYmFsIHNjb3BlXG4gICAgfVxufVxuXG5leHBvcnQge2dsb2JhbEV2YWx9O1xuIiwiLyogbG9hZCBfc3R5bGVzLmpzIHYuIDAuMS4yLCAwNC4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5sZXQgbG9hZFN0eWxlcyA9ICgpID0+IHtcblxuICAgIGxldCBzdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGV0IGdvb2dsZUZvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBzdHlsZXMucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHN0eWxlcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcbiAgICBzdHlsZXMuaHJlZiA9ICcuL2Nzcy9tYWluLmNzcyc7XG4gICAgc3R5bGVzLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBzdHlsZXMudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVzLm1lZGlhID0gJ3NjcmVlbic7XG4gICAgc3R5bGVzLmhyZWYgPSAnaHR0cHM6Ly9nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNwYWNlK01vbm86NDAwLDcwMCZhbXA7c3Vic2V0PWxhdGluLWV4dCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChnb29nbGVGb250KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlcyk7XG59O1xuXG5leHBvcnQge2xvYWRTdHlsZXN9O1xuIiwiLyogcmVuZGVyX2Jyb3dzZXJfaW5mby5qcywgdi4gMC4xLjAsIDI5LjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5sZXQgcmVuZGVyQnJvd3NlckluZm8gPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGJyb3dzZXJJbmZvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJyb3dzZXJJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5pZCA9ICdicm93c2VyJztcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdicm93c2VyJyk7XG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fcGFuZWwnKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYnJvd3Nlcl9fZGlzcGxheScpO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pZCA9ICdicm93c2VyX2Rpc3BsYXknO1xuICAgIHJlbmRlckhlYWRlcihicm93c2VySW5mb0NvbnRhaW5lciwgZmFsc2UpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvRGlzcGxheSk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoYnJvd3NlckluZm9Db250YWluZXIpO1xuICAgIFxuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+QXBwIG5hbWU6ICcgKyBuYXZpZ2F0b3IuYXBwQ29kZU5hbWUgKyAnPC9kaXY+JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCB2ZXJzaW9uOiAnICsgbmF2aWdhdG9yLmFwcFZlcnNpb24gKyAnPC9kaXY+JztcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PlBsYXRmb3JtOiAnICsgbmF2aWdhdG9yLnBsYXRmb3JtICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5Vc2VyIGFnZW50OiAnICsgbmF2aWdhdG9yLnVzZXJBZ2VudCArICc8L2Rpdj4nO1xuXG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXktLWNvbGxhcHNlZCcpO1xuXG59O1xuXG5leHBvcnQge3JlbmRlckJyb3dzZXJJbmZvfTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlLmpzLCB2LiAwLjEuMiwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL2NvbnNvbGVfbGlzdGVuJztcbmltcG9ydCB7cmVuZGVySGVhZGVyfSBmcm9tICcuL3JlbmRlcl9oZWFkZXIuanMnO1xuXG5jb25zdCBjb25zb2xlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbmNvbnN0IGNvbnNvbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGNvbnNvbGVJbnB1dFByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuY29uc29sZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb25zb2xlJyk7XG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheScpO1xuY29uc29sZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZGlzcGxheS0tY29sbGFwc2VkJyk7XG5jb25zb2xlRGlzcGxheS5pZCA9ICdjb25zb2xlX2Rpc3BsYXknO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0Jyk7XG5jb25zb2xlSW5wdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9faW5wdXQtLWNvbGxhcHNlZCcpO1xuY29uc29sZUlucHV0LmlkID0gJ2NvbnNvbGVfaW5wdXQnO1xuY29uc29sZUlucHV0LnR5cGUgPSAndGV4dCc7XG5jb25zb2xlSW5wdXRQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcHJvbXB0Jyk7XG5jb25zb2xlQ29udGFpbmVyLmlkID0gJ2NvbnNvbGUnO1xuY29uc29sZUlucHV0UHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3Byb21wdC0tY29sbGFwc2VkJyk7XG5cbmxldCByZW5kZXJDb25zb2xlID0gKHBhbmVsKSA9PiB7XG5cbiAgICByZW5kZXJIZWFkZXIoY29uc29sZUNvbnRhaW5lciwgZmFsc2UpO1xuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMsIHYuIDAuMS4xLCAwNi4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzJztcblxubGV0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pIHtcblxuICAgICAgICBsZXQgaW5wdXRNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5wdXRNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1pJyk7XG4gICAgICAgIGlucHV0TWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctaXByb21wdFwiPjwvc3Bhbj4ke21zZ0FycmF5WzBdfSBgO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRNZXNzYWdlKTtcbiAgICB9XG4gICAgXG4gICAgbGV0IHJldHVybk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHJldHVybk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICByZXR1cm5NZXNzYWdlLmlubmVySFRNTCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj5gO1xuICAgIHJlbmRlckNvbnNvbGVPdXRwdXQobXNnQXJyYXlbMV0sIHJldHVybk1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXR1cm5NZXNzYWdlKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfTtcbiIsIi8vIHJlbmRlcl9jb25zb2xlX291dHB1dC5qcywgdi4gMC4xLjEsIDA3LjA0LjIwMTcgQCBmaWxpcC1zd2luYXJza2lcblxubGV0IHJlbmRlckNvbnNvbGVPdXRwdXQgPSAodmFsLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgaW5kZXgpID0+IHtcblxuICAgIGxldCBvdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IGNoZWNrU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc3BsaXQoJyAnKVsxXTtcbiAgICBsZXQgaHRtbCA9ICcnO1xuXG4gICAgY2hlY2tTdHIgPSBjaGVja1N0ci5zdWJzdHJpbmcoMCwgY2hlY2tTdHIubGVuZ3RoLTEpLnRvTG93ZXJDYXNlKCk7XG4gICAgb3V0cHV0LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHJ9YCk7XG4gICAgY29uc29sZS5sb2coY2hlY2tTdHIpO1xuXHRcbiAgICBpZiAoY2hlY2tTdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudWxsJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdib29sZWFuJykge1xuICAgICAgICBodG1sICs9IGNoZWNrU3RyID09PSAnc3RyaW5nJyA/IGBcIiR7dmFsfVwiYCA6IHZhbDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIgPT09J2Z1bmN0aW9uJykge1xuICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgfSBlbHNlIGlmIChjaGVja1N0ciA9PT0gJ2FycmF5JyB8fCBjaGVja1N0ciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiB2YWwpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQga2V5Q2xhc3MgPSBjaGVja1N0ciA9PT0gJ2FycmF5JyA/ICdpbmRleCcgOiAna2V5JztcbiAgICAgICAgICAgIGxldCBjaGVja1N0cjIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsW2l0ZW1dKS5zcGxpdCgnICcpWzFdO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNoZWNrU3RyMiA9IGNoZWNrU3RyMi5zdWJzdHJpbmcoMCwgY2hlY2tTdHIyLmxlbmd0aC0xKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cbiAgICAgICAgICAgIGlmIChjaGVja1N0cjIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudWxsJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdib29sZWFuJykge1xuXG4gICAgICAgICAgICAgICAgbGV0IGtleUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtrZXlDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBrZXlFbGVtZW50LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgdmFsdWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNvbnNvbGVfXyR7Y2hlY2tTdHIyfWApO1xuICAgICAgICAgICAgICAgIHZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBjaGVja1N0cjIgPT09ICdzdHJpbmcnID8gYFwiJHt2YWxbaXRlbV19XCJgIDogdmFsW2l0ZW1dO1xuICAgICAgICAgICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChrZXlFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQodmFsdWVFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdHIyID09PSdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX2Yta2V5XCI+ZnVuY3Rpb24gPC9zcGFuPjxzcGFuIGNsYXNzPVwiY29uc29sZV9fZi1uYW1lXCI+JHt2YWwubmFtZX0oKTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgIG91dHB1dC5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFxuICAgICAgICAgICAgICAgIGxldCBrZXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAga2V5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjb25zb2xlX18ke2tleUNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGtleUVsZW1lbnQuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoa2V5RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ29uc29sZU91dHB1dCh2YWxbaXRlbV0sIG91dHB1dCwgaXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5pbm5lckhUTUwgPSB2YWw7XG4gICAgfVxuXHRcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG91dHB1dCk7XG59O1xuXG5leHBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjcsIDA1LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyUG9wdXB9IGZyb20gJy4vcmVuZGVyX3BvcHVwLmpzJztcblxubGV0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuICAgIGlmIChlbGVtLmlkID09PSAnZGV2X3Rvb2xzJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgcm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCByb3cyID0gZWxlbS5jaGlsZHJlbi5sZW5ndGggPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MUVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MU9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MUNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1vcGVuaW5nJyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNsb3NpbmcnKTtcbiAgICBcbiAgICByb3cxRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTtcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW5hbWUnKTsgXG4gICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuJyk7XG4gICAgcm93MUNsb3NlQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctY2xvc2UnKTtcbiAgICByb3cyT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cyQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzFPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8JztcbiAgICByb3cxQ2xvc2VBcnJvdy5pbm5lclRleHQgPSAgJz4nO1xuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uaW5uZXJUZXh0ID0gZWxlbS5sb2NhbE5hbWU7XG4gICAgcm93MS5hcHBlbmRDaGlsZChyb3cxT3BlbkFycm93KTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFFbGVtZW50VHlwZVNwYW4pO1xuICAgIFxuICAgIGlmIChlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZWxlbS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgYXR0ck5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgbGV0IGF0dHJFcXVhbFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBsZXQgYXR0clZhbHVlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci1uYW1lJyk7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fYXR0ci12YWx1ZScpO1xuICAgICAgICAgICAgYXR0ck5hbWVTcGFuLmlubmVyVGV4dCA9IGF0dHIubG9jYWxOYW1lO1xuICAgICAgICAgICAgYXR0ckVxdWFsU3Bhbi5pbm5lclRleHQgPSAnPSc7XG4gICAgICAgICAgICBhdHRyVmFsdWVTcGFuLmlubmVyVGV4dCA9ICdcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ck5hbWVTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0ckVxdWFsU3Bhbik7XG4gICAgICAgICAgICByb3cxLmFwcGVuZENoaWxkKGF0dHJWYWx1ZVNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XHRcbiAgICBcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFDbG9zZUFycm93KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICBcbiAgICBpZiAoZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICBsZXQgdGV4dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19leHAnKTtcbiAgICAgICAgdGV4dEVsLmlubmVyVGV4dCA9IGVsZW0udGV4dC50cmltKCk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEVsKVxuXG4gICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyRE9NKGVsLCB3cmFwcGVyLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcbiAgICBsZXQgc3RhcnREYXRlO1xuICAgIGxldCB0T2JqO1xuICAgIGxldCBzdGFydFg7XG4gICAgbGV0IHN0YXJ0WTtcbiAgICBsZXQgZW5kWDtcbiAgICBsZXQgZW5kWTtcbiAgICBsZXQgZGlzdFg7XG4gICAgbGV0IGRpc3RZO1xuICAgIGxldCBtYXhYID0gMDtcbiAgICBsZXQgbWF4WSA9IDA7XG5cbiAgICByb3cxLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0T2JqID0gZS50b3VjaGVzWzBdO1xuICAgICAgICBzdGFydFggPSB0T2JqLnBhZ2VYO1xuICAgICAgICBzdGFydFkgPSB0T2JqLnBhZ2VZO1xuICAgIH0sIGZhbHNlKTtcbiAgICByb3cxLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG4gICAgICAgIHRPYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICBlbmRYID0gdE9iai5wYWdlWDtcbiAgICAgICAgZW5kWSA9IHRPYmoucGFnZVk7XG4gICAgICAgIGRpc3RYID0gZW5kWCAtIHN0YXJ0WDtcbiAgICAgICAgZGlzdFkgPSBlbmRZIC0gc3RhcnRZO1xuICAgICAgIFxuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdFgpID4gbWF4WClcbiAgICAgICAgICAgIG1heFggPSBNYXRoLmFicyhkaXN0WCk7XG4gICAgICAgXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0WSkgPiBtYXhZKVxuICAgICAgICAgICAgbWF4WSA9IE1hdGguYWJzKGRpc3RZKTtcbiAgICAgICBcbiAgICB9LCBmYWxzZSk7XG4gICAgcm93MS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGxldCBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGRhdGVBbXAgPSBlbmREYXRlIC0gc3RhcnREYXRlO1xuICAgICAgIFxuICAgICAgICB0T2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgZW5kWCA9IHRPYmoucGFnZVg7XG4gICAgICAgIGVuZFkgPSB0T2JqLnBhZ2VZO1xuICAgICAgICBkaXN0WCA9IGVuZFggLSBzdGFydFg7XG4gICAgICAgIGRpc3RZID0gZW5kWSAtIHN0YXJ0WTtcbiAgICAgICBcbiAgICAgICAgaWYgKG1heFkgPD0gMzAgJiYgbWF4WCA8PSAzMCkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRlQW1wIDw9IDIwMCkge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKVxuXG4gICAgICAgICAgICAgICAgaWYgKHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpIHx8XG4gICAgICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbmRlclBvcHVwKGVsZW0sIHJvdzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEucmVtb3ZlKCk7XG4gICAgICAgICAgICByb3cyLnJlbW92ZSgpO1xuICAgICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBtYXhYID0gMDtcbiAgICAgICAgbWF4WSA9IDA7XG5cbiAgICB9LCBmYWxzZSk7XG5cbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbn1cbmV4cG9ydCB7cmVuZGVyRE9NfTtcbiIsIi8qIHJlbmRlcl9oZWFkZXIuanMsIHYuIDAuMS4wLCAxNC4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG52YXIgcmVuZGVySGVhZGVyID0gKGNvbnRhaW5lciwgZXhwYW5kZWQpID0+IHtcbiAgIFxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCB0aXRsZSA9IGNvbnRhaW5lci5pZDtcbiAgIFxuICAgIGhlYWRlci5pZCA9IGAke3BhcmVudC5pZH1faGVhZGVyYDtcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9faGVhZGVyYCk7XG4gICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZWApO1xuICAgIGhlYWRlci5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3RpdGxlfV9fdGl0bGVcIj4ke3RpdGxlfTwvc3Bhbj5gO1xuICAgXG4gICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5jbGFzc0xpc3QuYWRkKGAke2NvbnRhaW5lci5jbGFzc0xpc3RbMF19X190b2dnbGUtLWV4cGFuZGVkYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlQnRuLmNsYXNzTGlzdC5hZGQoYCR7Y29udGFpbmVyLmNsYXNzTGlzdFswXX1fX3RvZ2dsZS0tY29sbGFwc2VkYCk7XG4gICAgfVxuICAgXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRvZ2dsZUJ0bik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICBcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgIFxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXS5maWx0ZXIuY2FsbChjb250YWluZXIuY2hpbGRyZW4sIGVsID0+IGVsLmlkICE9PSBgJHtwYXJlbnQuaWR9X2hlYWRlcmApO1xuICAgICAgIFxuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1leHBhbmRlZGApO1xuICAgICAgICB0b2dnbGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShgJHtjb250YWluZXIuY2xhc3NMaXN0WzBdfV9fdG9nZ2xlLS1jb2xsYXBzZWRgKTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2VsLmNsYXNzTGlzdFswXX0tLWV4cGFuZGVkYCk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGAke2VsLmNsYXNzTGlzdFswXX0tLWNvbGxhcHNlZGApO1xuICAgICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5leHBvcnQge3JlbmRlckhlYWRlcn07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yLmpzLCB2LiAwLjEuNCwgMjkuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJET019IGZyb20gJy4vcmVuZGVyX2RvbS5qcyc7XG5pbXBvcnQge3JlbmRlckhlYWRlcn0gZnJvbSAnLi9yZW5kZXJfaGVhZGVyLmpzJztcblxubGV0IHJlbmRlckluc3BlY3RvciA9IChib2R5LCBwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgaW5zcGVjdG9yRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBpbnNwZWN0b3JDb250YWluZXIuaWQgPSAnaW5zcGVjdG9yJztcbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5Jyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5pZCA9ICdpbnNwZWN0b3JfZGlzcGxheSc7XG4gICAgcmVuZGVySGVhZGVyKGluc3BlY3RvckNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2Rpc3BsYXktLWV4cGFuZGVkJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGluc3BlY3RvckRpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGluc3BlY3RvckNvbnRhaW5lcik7XG4gICAgcmVuZGVyRE9NKGJvZHksIGluc3BlY3RvckRpc3BsYXksIGxldmVsKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3J9O1xuIiwiLyogcmVuZGVyX3BvcHVwLmpzLCB2LiAwLjEuMSwgMTUuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IHJlbmRlclBvcHVwID0gKGVsZW1lbnQsIHJvdykgPT4ge1xuXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXZfdG9vbHMnKTtcbiAgICBsZXQgcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgYXR0cmlidXRlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgc3R5bGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBhdHRyaWJ1dGVMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBsZXQgc3R5bGVMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBsZXQgY2xvc2VCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGF0dHJpYnV0ZUxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgc3R5bGVMaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGZpbHRlcmVkQXR0cmlidXRlcyA9IFtdLmZpbHRlci5jYWxsKGVsZW1lbnQuYXR0cmlidXRlcywgYXR0ciA9PiBhdHRyLm5hbWUgIT09ICdzdHlsZScpO1xuICAgIGxldCBpbmxpbmVTdHlsZXMgPSBbXTtcbiAgICBsZXQgYWRkQXR0ckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxldCBhZGRBdHRyQXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsZXQgYXR0ck5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IGF0dHJWYWx1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsZXQgYXR0ck5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsZXQgYXR0clZhbHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGV0IGFkZFN0eWxlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbGV0IGFkZFN0eWxlQXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsZXQgc3R5bGVOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCBzdHlsZVZhbHVlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCBzdHlsZU5hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsZXQgc3R5bGVWYWx1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXG4gICAgbGV0IHJlbmRlckF0dHJJbnB1dCA9IChlbCwgZGlzcGxheSwgcm93LCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgIFxuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsZXQgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgYXBwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbGV0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICBcbiAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gbmFtZTtcbiAgICAgICAgYXBwbHlCdG4uaW5uZXJUZXh0ID0gJ0FwcGx5JztcbiAgICAgICAgc2VwYXJhdG9yLmlubmVyVGV4dCA9ICc6JztcbiAgICAgICAgbGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtZWxlbWVudCcpO1xuICAgICAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1sYWJlbCcpO1xuICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1pbnB1dCcpO1xuICAgICAgICBhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4nKTtcbiAgICAgICAgYXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgc2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0LXNlcGFyYXRvcicpO1xuICAgICAgIFxuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChzZXBhcmF0b3IpO1xuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGFwcGx5QnRuKTtcbiAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBkaXNwbGF5LmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KTtcbiAgICAgICBcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgIFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkaXNwbGF5LmlkID09ICdhdHRyX2xpc3QnKVxuICAgICAgICAgICAgICAgICAgICBlbC5hdHRyaWJ1dGVzW25hbWVdLnZhbHVlID0gaW5wdXQudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzcGxheS5pZCA9PSAnc3R5bGVfbGlzdCcpXG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlW25hbWVdID0gaW5wdXQudmFsdWUucmVwbGFjZSgnOycsICcnKTtcblxuICAgICAgICAgICAgICAgIGxldCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuICAgICAgICAgICAgICAgIGxldCByb3dBdHRyVmFsdWVFbGVtcyA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCcuaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwocm93QXR0ck5hbWVFbGVtcywgKGF0dHJOYW1lRWwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93QXR0clZhbHVlRWxlbXNbaV0uaW5uZXJUZXh0ID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZUVsLmlubmVyVGV4dCA9IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB7XG4gICAgICAgICAgICBhcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fbGlzdC1idG4tLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICBhcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fbGlzdC1idG4tLWNvbGxhcHNlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcHBseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgXG4gICAgICAgICAgICBpZiAoZGlzcGxheS5pZCA9PSAnYXR0cl9saXN0JylcbiAgICAgICAgICAgICAgICBlbC5hdHRyaWJ1dGVzW25hbWVdLnZhbHVlID0gaW5wdXQudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChkaXNwbGF5LmlkID09ICdzdHlsZV9saXN0JylcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVtuYW1lXSA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJzsnLCAnJyk7XG5cbiAgICAgICAgICAgIGxldCByb3dBdHRyTmFtZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItbmFtZScpO1xuICAgICAgICAgICAgbGV0IHJvd0F0dHJWYWx1ZUVsZW1zID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnNwZWN0b3JfX2F0dHItdmFsdWUnKTtcblxuICAgICAgICAgICAgYXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2xpc3QtYnRuLS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgYXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2xpc3QtYnRuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChyb3dBdHRyTmFtZUVsZW1zLCAoYXR0ck5hbWVFbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChhdHRyTmFtZUVsLmlubmVyVGV4dCA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByb3dBdHRyVmFsdWVFbGVtc1tpXS5pbm5lclRleHQgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWVFbC5pbm5lclRleHQgPSBuYW1lO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH07XG5cbiAgICBzdHlsZUxpc3QuaWQgPSAnc3R5bGVfbGlzdCc7XG4gICAgYXR0cmlidXRlTGlzdC5pZCA9ICdhdHRyX2xpc3QnO1xuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJyk7XG4gICAgYXR0cmlidXRlTGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3NlY3Rpb24nKTtcbiAgICBhdHRyaWJ1dGVMaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fc2VjdGlvbi0tYXR0cmlidXRlcycpO1xuICAgIHN0eWxlTGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3NlY3Rpb24nKTtcbiAgICBzdHlsZUxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uLS1zdHlsZXMnKTtcbiAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fY2xvc2UnKTtcbiAgICBhdHRyaWJ1dGVMaXN0SGVhZGVyLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInBvcHVwX19oZWFkbGluZVwiPkF0dHJpYnV0ZXM8L3NwYW4+JztcbiAgICBzdHlsZUxpc3RIZWFkZXIuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwicG9wdXBfX2hlYWRsaW5lXCI+SW5saW5lIHN0eWxlczwvc3Bhbj4nO1xuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICd4JztcblxuICAgIGFkZEF0dHJCdG4uaW5uZXJUZXh0ID0gJysnO1xuICAgIGFkZEF0dHJCdG4uY2xhc3NMaXN0LmFkZChcInBvcHVwX19hZGRcIik7XG4gICAgYWRkQXR0ckFwcGx5QnRuLmlubmVyVGV4dCA9ICdBcHBseSc7XG4gICAgYXR0ck5hbWVJbnB1dExhYmVsLmlubmVyVGV4dCA9ICdhdHRyaWJ1dGUgbmFtZSAnO1xuICAgIGF0dHJWYWx1ZUlucHV0TGFiZWwuaW5uZXJUZXh0ID0gJ2F0dHJpYnV0ZSB2YWx1ZSAnO1xuICAgIGFkZEF0dHJBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHknKTtcbiAgICBhdHRyTmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgYXR0ck5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWlucHV0Jyk7XG4gICAgYXR0clZhbHVlSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBhdHRyVmFsdWVJbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWlucHV0Jyk7XG4gICAgYWRkQXR0ckFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG4gICAgYXR0ck5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuICAgIGF0dHJWYWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG4gICAgYXR0cmlidXRlTGlzdEhlYWRlci5hcHBlbmRDaGlsZChhZGRBdHRyQnRuKTtcbiAgICBhdHRyaWJ1dGVMaXN0SGVhZGVyLmFwcGVuZENoaWxkKGFkZEF0dHJBcHBseUJ0bik7XG4gICAgYXR0clZhbHVlSW5wdXRMYWJlbC5hcHBlbmRDaGlsZChhdHRyVmFsdWVJbnB1dCk7XG4gICAgYXR0ck5hbWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKGF0dHJOYW1lSW5wdXQpO1xuICAgIGF0dHJpYnV0ZUxpc3RIZWFkZXIuYXBwZW5kQ2hpbGQoYXR0ck5hbWVJbnB1dExhYmVsKTtcbiAgICBhdHRyaWJ1dGVMaXN0SGVhZGVyLmFwcGVuZENoaWxkKGF0dHJWYWx1ZUlucHV0TGFiZWwpO1xuXG4gICAgYWRkU3R5bGVCdG4uaW5uZXJUZXh0ID0gJysnO1xuICAgIGFkZFN0eWxlQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQnKTtcbiAgICBhZGRTdHlsZUFwcGx5QnRuLmlubmVyVGV4dCA9ICdBcHBseSc7XG4gICAgYWRkU3R5bGVBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHknKTtcbiAgICBzdHlsZU5hbWVJbnB1dExhYmVsLmlubmVyVGV4dCA9ICdwcm9wZXJ0eSBuYW1lICc7XG4gICAgc3R5bGVWYWx1ZUlucHV0TGFiZWwuaW5uZXJUZXh0ID0gJ3Byb3BlcnR5IHZhbHVlICc7XG4gICAgc3R5bGVOYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBzdHlsZU5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWlucHV0Jyk7XG4gICAgc3R5bGVWYWx1ZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgc3R5bGVWYWx1ZUlucHV0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hZGQtaW5wdXQnKTtcbiAgICBhZGRTdHlsZUFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG4gICAgc3R5bGVOYW1lSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcbiAgICBzdHlsZVZhbHVlSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcbiAgICBzdHlsZUxpc3RIZWFkZXIuYXBwZW5kQ2hpbGQoYWRkU3R5bGVCdG4pO1xuICAgIHN0eWxlTGlzdEhlYWRlci5hcHBlbmRDaGlsZChhZGRTdHlsZUFwcGx5QnRuKTtcbiAgICBzdHlsZU5hbWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHN0eWxlTmFtZUlucHV0KTtcbiAgICBzdHlsZVZhbHVlSW5wdXRMYWJlbC5hcHBlbmRDaGlsZChzdHlsZVZhbHVlSW5wdXQpO1xuICAgIHN0eWxlTGlzdEhlYWRlci5hcHBlbmRDaGlsZChzdHlsZU5hbWVJbnB1dExhYmVsKTtcbiAgICBzdHlsZUxpc3RIZWFkZXIuYXBwZW5kQ2hpbGQoc3R5bGVWYWx1ZUlucHV0TGFiZWwpO1xuXG4gICAgaWYgKGVsZW1lbnQuYXR0cmlidXRlcyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUpXG4gICAgICAgIGlubGluZVN0eWxlcyA9ICcnLnNwbGl0LmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlLnZhbHVlLCAnOyAnKTtcblxuICAgIGZvciAobGV0IGF0dHIgaW4gZmlsdGVyZWRBdHRyaWJ1dGVzKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmFtZSA9IGZpbHRlcmVkQXR0cmlidXRlc1thdHRyXS5uYW1lO1xuICAgICAgICBsZXQgdmFsdWUgPSBmaWx0ZXJlZEF0dHJpYnV0ZXNbYXR0cl0udmFsdWU7XG5cbiAgICAgICAgcmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIGF0dHJpYnV0ZUxpc3QsIHJvdywgbmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHJ1bGUgaW4gaW5saW5lU3R5bGVzKSB7XG4gICAgXG4gICAgICAgIGxldCBuYW1lID0gaW5saW5lU3R5bGVzW3J1bGVdLnNwbGl0KCc6ICcpWzBdO1xuICAgICAgICBsZXQgdmFsdWUgPSBpbmxpbmVTdHlsZXNbcnVsZV0uc3BsaXQoJzogJylbMV07XG5cbiAgICAgICAgcmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIHN0eWxlTGlzdCwgcm93LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGFkZEF0dHJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBhZGRBdHRyQXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgYXR0ck5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuICAgICAgICBhdHRyVmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuICAgICAgICBhZGRBdHRyQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1leHBhbmRlZCcpO1xuICAgICAgICBhdHRyTmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcbiAgICAgICAgYXR0clZhbHVlSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1leHBhbmRlZCcpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGFkZFN0eWxlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgYWRkU3R5bGVBcHBseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYXBwbHktLWNvbGxhcHNlZCcpO1xuICAgICAgICBzdHlsZU5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWNvbGxhcHNlZCcpO1xuICAgICAgICBzdHlsZVZhbHVlSW5wdXRMYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgYWRkU3R5bGVBcHBseUJ0bi5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYXBwbHktLWV4cGFuZGVkJyk7XG4gICAgICAgIHN0eWxlTmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcbiAgICAgICAgc3R5bGVWYWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBhZGRBdHRyQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGxldCB2YWx1ZSA9IGF0dHJWYWx1ZUlucHV0LnZhbHVlO1xuICAgICAgICBsZXQgbmFtZSA9IGF0dHJOYW1lSW5wdXQudmFsdWU7XG4gICAgICAgXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgZmlsdGVyZWRBdHRyaWJ1dGVzID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBhdHRyID0+IGF0dHIubmFtZSAhPT0gJ3N0eWxlJyk7XG4gICAgICAgIGF0dHJpYnV0ZUxpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGF0dHJOYW1lSW5wdXRMYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fYWRkLWxhYmVsLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgYXR0ck5hbWVJbnB1dExhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG4gICAgICAgIGF0dHJWYWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG4gICAgICAgIGF0dHJWYWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcbiAgICAgICAgYXR0ck5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBhdHRyVmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBhZGRBdHRyQXBwbHlCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FwcGx5LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgYWRkQXR0ckFwcGx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hcHBseS0tZXhwYW5kZWQnKTtcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKGZpbHRlcmVkQXR0cmlidXRlcywgKGF0dHIpID0+IHtcbiAgICAgICAgICAgIHJlbmRlckF0dHJJbnB1dChlbGVtZW50LCBhdHRyaWJ1dGVMaXN0LCByb3csIGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGFkZFN0eWxlQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGxldCB2YWx1ZSA9IHN0eWxlVmFsdWVJbnB1dC52YWx1ZTtcbiAgICAgICAgbGV0IG5hbWUgPSBzdHlsZU5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIGlubGluZVN0eWxlcy5wdXNoKGAke25hbWV9OiAke3ZhbHVlfTtgKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICBzdHlsZUxpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHN0eWxlTmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG4gICAgICAgIHN0eWxlTmFtZUlucHV0TGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FkZC1sYWJlbC0tZXhwYW5kZWQnKTtcbiAgICAgICAgc3R5bGVWYWx1ZUlucHV0TGFiZWwuY2xhc3NMaXN0LmFkZCgncG9wdXBfX2FkZC1sYWJlbC0tY29sbGFwc2VkJyk7XG4gICAgICAgIHN0eWxlVmFsdWVJbnB1dExhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX19hZGQtbGFiZWwtLWV4cGFuZGVkJyk7XG4gICAgICAgIHN0eWxlTmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIHN0eWxlVmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBhZGRTdHlsZUFwcGx5QnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19hcHBseS0tY29sbGFwc2VkJyk7XG4gICAgICAgIGFkZFN0eWxlQXBwbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfX2FwcGx5LS1leHBhbmRlZCcpO1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoaW5saW5lU3R5bGVzLCAocnVsZSkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyQXR0cklucHV0KGVsZW1lbnQsIHN0eWxlTGlzdCwgcm93LCBydWxlLnNwbGl0KCc6ICcpWzBdLCBydWxlLnNwbGl0KCc6ICcpWzFdKTtcbiAgICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgYXR0cmlidXRlTGlzdEhlYWRlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9faGVhZGVyJyk7XG4gICAgc3R5bGVMaXN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19oZWFkZXInKTtcbiAgICBhdHRyaWJ1dGVMaXN0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0Jyk7XG4gICAgc3R5bGVMaXN0LmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19saXN0Jyk7XG4gICAgYXR0cmlidXRlTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdEhlYWRlcik7XG4gICAgYXR0cmlidXRlTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdCk7XG4gICAgc3R5bGVMaXN0V3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZUxpc3RIZWFkZXIpO1xuICAgIHN0eWxlTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoc3R5bGVMaXN0KTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHN0eWxlTGlzdFdyYXBwZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3B1cCk7XG59O1xuXG5leHBvcnQge3JlbmRlclBvcHVwfTtcbiJdfQ==
