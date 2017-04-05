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

},{"./modules/console_listen.js":2,"./modules/dt_console_api.js":4,"./modules/load_styles.js":6,"./modules/render_browser_info.js":7,"./modules/render_console.js":8,"./modules/render_inspector.js":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleListen = undefined;

var _render_console = require('./render_console.js');

var _render_console_message = require('./render_console_message.js');

var _global_eval = require('./global_eval.js');

/* console_listen.js, v. 0.1.4, 31.03.2017, @ filip-swinarski */

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

        var row = document.createElement('div');

        row.innerHTML = (0, _render_console_message.renderConsoleMessage)(e.detail);
        row.classList.add('console__row');
        _render_console.consoleDisplay.appendChild(row);
    }, false);

    _render_console.consoleInput.addEventListener('keypress', function (e) {

        if (e.keyCode === 13) {

            // let value = window.eval(consoleInput.value); // window.eval to work only in global scope
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
/* render_browser_info.js, v. 0.1.0, 29.03.2017, @ filip-swinarski */

var renderBrowserInfo = function renderBrowserInfo(panel) {

    var browserInfoDisplay = document.createElement('div');
    var browserInfoContainer = document.createElement('div');

    browserInfoContainer.classList.add('browser');
    browserInfoContainer.classList.add('browser__panel');
    browserInfoDisplay.classList.add('browser__display');
    browserInfoDisplay.id = 'browser_display';
    browserInfoContainer.appendChild(browserInfoDisplay);
    panel.appendChild(browserInfoContainer);

    browserInfoDisplay.innerHTML += '<div>App name: ' + navigator.appCodeName + '</div>';
    browserInfoDisplay.innerHTML += '<div>App version: ' + navigator.appVersion + '</div>';
    browserInfoDisplay.innerHTML += '<div>Platform: ' + navigator.platform + '</div>';
    browserInfoDisplay.innerHTML += '<div>User agent: ' + navigator.userAgent + '</div>';
};

exports.renderBrowserInfo = renderBrowserInfo;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.consoleInput = exports.consoleDisplay = exports.renderConsole = undefined;

var _console_listen = require('./console_listen');

var consoleDisplay = document.createElement('div'); /* render_console.js, v. 0.1.2, 30.03.2017, @ filip-swinarski */

var consoleInput = document.createElement('input');
var consoleContainer = document.createElement('div');
var consoleInputPrompt = document.createElement('span');

consoleContainer.classList.add('console');
consoleContainer.classList.add('tools__panel');
consoleDisplay.classList.add('console__display');
consoleDisplay.id = 'console_display';
consoleInput.classList.add('console__input');
consoleInput.id = 'console_input';
consoleInput.type = 'text';
consoleInputPrompt.classList.add('console__prompt');

var renderConsole = function renderConsole(panel) {

    consoleContainer.appendChild(consoleInputPrompt);
    consoleContainer.appendChild(consoleDisplay);
    consoleContainer.appendChild(consoleInput);
    panel.appendChild(consoleContainer);
    (0, _console_listen.consoleListen)();
};

exports.renderConsole = renderConsole;
exports.consoleDisplay = consoleDisplay;
exports.consoleInput = consoleInput;

},{"./console_listen":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_console_message.js, v. 0.1.0, 30.03.2017, @ filip-swinarski */

var renderConsoleMessage = function renderConsoleMessage(msgArray) {

    var html = "";

    if (msgArray[0]) html += "<div class=\"console__msg-i\"><span class=\"console__msg-iprompt\"></span>" + msgArray[0] + " </div>";

    html += "<div class=\"console__msg-r\"><span class=\"console__msg-rprompt\"></span>" + msgArray[1] + "</div>";

    return html;
};

exports.renderConsoleMessage = renderConsoleMessage;

},{}],10:[function(require,module,exports){
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
            attrNameSpan.innerText = ' ' + attr.localName;
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

    var timestamp = void 0;

    row1.addEventListener('mousedown', function () {
        timestamp = new Date();
    }, false);

    row1.addEventListener('mouseup', function () {
        if (new Date() - timestamp > 150) {
            (0, _render_popup.renderPopup)(elem);
        } else {
            row1.classList.toggle('inspector__row--expanded');
            row1.classList.toggle('inspector__row--collapsed');

            if (row1OpenArrow.classList.contains('inspector__tag-open--expanded') || row1OpenArrow.classList.contains('inspector__tag-open--collapsed')) {
                row1OpenArrow.classList.toggle('inspector__tag-open--expanded');
                row1OpenArrow.classList.toggle('inspector__tag-open--collapsed');
            }
        }
    }, false);

    parentEl.appendChild(wrapper);
}; /* render_dom.js, v. 0.1.7, 05.04.2017, @ filip-swinarski */

exports.renderDOM = renderDOM;

},{"./render_popup.js":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderInspector = undefined;

var _render_dom = require('./render_dom.js');

var renderInspector = function renderInspector(body, panel) {

    var inspectorDisplay = document.createElement('div');
    var inspectorContainer = document.createElement('div');
    var level = 0;

    inspectorContainer.classList.add('inspector');
    inspectorContainer.classList.add('tools__panel');
    inspectorDisplay.classList.add('inspector__display');
    inspectorDisplay.id = 'inspector_display';
    inspectorContainer.appendChild(inspectorDisplay);
    panel.appendChild(inspectorContainer);
    (0, _render_dom.renderDOM)(body, inspectorDisplay, level);
}; /* render_inspector.js, v. 0.1.4, 29.03.2017, @ filip-swinarski */

exports.renderInspector = renderInspector;

},{"./render_dom.js":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* render_popup.js, v. 0.1.0, 04.04.2017, @ filip-swinarski */

var renderPopup = function renderPopup(element) {

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

    if (element.attributes && element.attributes.style) inlineStyles = ''.split.call(element.attributes.style.value, '; ');

    for (var attr in filteredAttributes) {

        var listElement = document.createElement('li');
        var name = filteredAttributes[attr].name;
        var value = filteredAttributes[attr].value;

        listElement.innerHTML = '<span>' + name + '</span><span>:</span><span> ' + value + '</span>';
        attributeList.appendChild(listElement);
    }

    for (var rule in inlineStyles) {

        var _listElement = document.createElement('li');
        var property = inlineStyles[rule].split(': ')[0];
        var _value = inlineStyles[rule].split(': ')[1];

        _listElement.innerHTML = '<span>' + property + '</span><span>:</span><span> ' + _value + '</span>';
        styleList.appendChild(_listElement);
    }

    popup.classList.add('popup');
    attributeListWrapper.classList.add('popup__section');
    attributeListWrapper.classList.add('popup__section--attributes');
    styleListWrapper.classList.add('popup__section');
    styleListWrapper.classList.add('popup__section--styles');
    closeBtn.classList.add('popup__close');
    attributeListHeader.innerHTML = 'Attributes';
    styleListHeader.innerHTML = 'Styles';
    closeBtn.innerHTML = 'x';

    closeBtn.addEventListener('click', function () {
        popup.remove();
    }, false);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianNcXGVzNlxcbWFpbi5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGNvbnNvbGVfbGlzdGVuLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcY29uc29sZV9sb2cuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxkdF9jb25zb2xlX2FwaS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXGdsb2JhbF9ldmFsLmpzIiwianNcXGVzNlxcbW9kdWxlc1xcbG9hZF9zdHlsZXMuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2NvbnNvbGUuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianNcXGVzNlxcbW9kdWxlc1xccmVuZGVyX2RvbS5qcyIsImpzXFxlczZcXG1vZHVsZXNcXHJlbmRlcl9pbnNwZWN0b3IuanMiLCJqc1xcZXM2XFxtb2R1bGVzXFxyZW5kZXJfcG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsU0FBbkI7Ozs7Ozs7Ozs7QUNs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QVQsQ0FBbUIsR0FBbkIsQ0FBdUIsY0FBdkI7QUFDQSx3QkFBb0IsU0FBcEIsR0FBZ0MsWUFBaEM7QUFDQSxvQkFBZ0IsU0FBaEIsR0FBNEIsUUFBNUI7QUFDQSxhQUFTLFNBQVQsR0FBcUIsR0FBckI7O0FBRUEsYUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFNO0FBQ3JDLGNBQU0sTUFBTjtBQUNILEtBRkQsRUFFRyxLQUZIOztBQUlBLHlCQUFxQixXQUFyQixDQUFpQyxtQkFBakM7QUFDQSx5QkFBcUIsV0FBckIsQ0FBaUMsYUFBakM7QUFDQSxxQkFBaUIsV0FBakIsQ0FBNkIsZUFBN0I7QUFDQSxxQkFBaUIsV0FBakIsQ0FBNkIsU0FBN0I7QUFDQSxVQUFNLFdBQU4sQ0FBa0IsUUFBbEI7QUFDQSxVQUFNLFdBQU4sQ0FBa0Isb0JBQWxCO0FBQ0EsVUFBTSxXQUFOLENBQWtCLGdCQUFsQjtBQUNBLGNBQVUsV0FBVixDQUFzQixLQUF0QjtBQUNILENBM0REOztRQTZEUSxXLEdBQUEsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBtYWluLmpzIDAuMS4xIDMwLjAzLjIwMTcgQCBmaWxpcCBzd2luYXJza2kgKi9cblxuaW1wb3J0IHtsb2FkU3R5bGVzfSBmcm9tICcuL21vZHVsZXMvbG9hZF9zdHlsZXMuanMnO1xuaW1wb3J0IHtyZW5kZXJJbnNwZWN0b3J9IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfaW5zcGVjdG9yLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZX0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQnJvd3NlckluZm99IGZyb20gJy4vbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzJztcbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzJztcbmltcG9ydCAqIGFzIERUQ29uc29sZSBmcm9tICcuL21vZHVsZXMvZHRfY29uc29sZV9hcGkuanMnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5jb250YWluZXIuaWQgPSAnZGV2X3Rvb2xzJztcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29scycpO1xuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xubG9hZFN0eWxlcygpO1xucmVuZGVySW5zcGVjdG9yKGJvZHksIGNvbnRhaW5lcik7XG5yZW5kZXJDb25zb2xlKGNvbnRhaW5lcik7XG5yZW5kZXJCcm93c2VySW5mbyhjb250YWluZXIpO1xuXG53aW5kb3cuRFRDb25zb2xlID0gRFRDb25zb2xlO1xuIiwiLyogY29uc29sZV9saXN0ZW4uanMsIHYuIDAuMS40LCAzMS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2NvbnNvbGVEaXNwbGF5fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7Y29uc29sZUlucHV0fSBmcm9tICcuL3JlbmRlcl9jb25zb2xlLmpzJztcbmltcG9ydCB7cmVuZGVyQ29uc29sZU1lc3NhZ2V9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfbWVzc2FnZS5qcyc7XG5pbXBvcnQge2dsb2JhbEV2YWx9IGZyb20gJy4vZ2xvYmFsX2V2YWwuanMnO1xuXG5sZXQgY29uc29sZUxpc3RlbiA9ICgpID0+IHtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJvcikgPT4ge1xuXG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JTb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvckxpbmVObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yQ29sdW1uTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvclByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGVycm9yUHJvbXB0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1wcm9tcHQnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19tc2ctci0tZXJyJyk7XG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbXNnJyk7XG4gICAgICAgIGVycm9yU291cmNlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1zcmMnKTtcbiAgICAgICAgZXJyb3JMaW5lTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWxpbmVubycpO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1jb2x1bW5ubycpO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZU1zZy5pbm5lckhUTUwgKz0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgZXJyb3JTb3VyY2UuaW5uZXJIVE1MICs9IGVycm9yLmZpbGVuYW1lO1xuICAgICAgICBlcnJvckxpbmVOby5pbm5lckhUTUwgKz0gZXJyb3IubGluZW5vO1xuICAgICAgICBlcnJvckNvbHVtbk5vLmlubmVySFRNTCArPSBlcnJvci5jb2x1bW5ubztcblxuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JQcm9tcHQpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlTXNnKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yU291cmNlKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yTGluZU5vKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmFwcGVuZENoaWxkKGVycm9yQ29sdW1uTm8pO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgY29uc29sZURpc3BsYXkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBjb25zb2xlRGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdsb2cnLCAoZSkgPT4ge1xuXG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICByb3cuaW5uZXJIVE1MID0gcmVuZGVyQ29uc29sZU1lc3NhZ2UoZS5kZXRhaWwpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgLy8gbGV0IHZhbHVlID0gd2luZG93LmV2YWwoY29uc29sZUlucHV0LnZhbHVlKTsgLy8gd2luZG93LmV2YWwgdG8gd29yayBvbmx5IGluIGdsb2JhbCBzY29wZVxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGxldCBsb2cgPSBuZXcgQ3VzdG9tRXZlbnQoJ2xvZycsIHtkZXRhaWw6IFtzdHIsIHZhbHVlXX0pO1xuXG4gICAgY29uc29sZURpc3BsYXkuZGlzcGF0Y2hFdmVudChsb2cpO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxvZ307XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjIsIDMwLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5cbmxldCBsb2cgPSAodmFsdWUsIHN0ciA9ICcnKSA9PiB7XG4gICAgY29uc29sZUxvZyhzdHIsIHZhbHVlKTtcbn1cblxuZXhwb3J0IHtsb2d9O1xuIiwiLyogZ2xvYmFsX2V2YWwuanMsIHYuIDAuMS4wLCAzMS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG4vLyBldmFsIC0gcnVucyBibG9jayBzY29wZSBkZWNsYXJhdGlvbnMgdmlhIHNjcmlwdCBpbmplY3Rpb25cbi8vIG90aGVyd2lzZSBzdGFuZGFyZCBldmFsIHVzZWQgXG4vLyAtIHRoaW5rIGlmIG5vdCB1c2UgaW5qZWN0aW9uIGV4Y2x1c2l2ZWx5XG4vLyByZXR1cm5zIHZhbHVlXG5jb25zdCBnbG9iYWxFdmFsID0gKHN0cikgPT4ge1xuXG4gICAgJ3VzZSBzdHJpY3QnOyAvLyBwcmV2ZW50IGNyZWF0aW5nIGxvY2FsIHZhcmlhYmxlcyB3aXRoIHN0YW5kYXJkIGV2YWxcbiAgICBcbiAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ2xldCAnKSB8fCBzdHIuc3RhcnRzV2l0aCgnY29uc3QgJykpIHsgLy8gY29kZSBmb3Igc2NyaXB0IGluc2VydGlvblxuXG4gICAgICAgIGxldCBzY3JpcHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykucmVtb3ZlKClcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuaWQgPSAnZHRfc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmlubmVyVGV4dCA9IHN0cjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyByZXR1cm5zIHVuZGVmaW5lZCB3aGVuIGRlY2xhcmluZyBibG9jayBzY29wZWQgdmFyaWFibGVcbiAgICB9IGVsc2UgeyAvL3N0YW5kYXJkIGV2YWxcbiAgICAgICAgcmV0dXJuICgxLCBldmFsKShzdHIpOyAvLyBpbmRpcmVjdCBjYWxsIHRvIGFjY2VzcyBnbG9iYWwgc2NvcGVcbiAgICB9XG59XG5cbmV4cG9ydCB7Z2xvYmFsRXZhbH07XG4iLCIvKiBsb2FkIF9zdHlsZXMuanMgdi4gMC4xLjIsIDA0LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBsb2FkU3R5bGVzID0gKCkgPT4ge1xuXG4gICAgbGV0IHN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsZXQgZ29vZ2xlRm9udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIHN0eWxlcy5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgc3R5bGVzLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlcy5tZWRpYSA9ICdzY3JlZW4nO1xuICAgIHN0eWxlcy5ocmVmID0gJy4vY3NzL21haW4uY3NzJztcbiAgICBzdHlsZXMucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHN0eWxlcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcbiAgICBzdHlsZXMuaHJlZiA9ICdodHRwczovL2dvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U3BhY2UrTW9ubzo0MDAsNzAwJmFtcDtzdWJzZXQ9bGF0aW4tZXh0JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGdvb2dsZUZvbnQpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVzKTtcbn07XG5cbmV4cG9ydCB7bG9hZFN0eWxlc307XG4iLCIvKiByZW5kZXJfYnJvd3Nlcl9pbmZvLmpzLCB2LiAwLjEuMCwgMjkuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IHJlbmRlckJyb3dzZXJJbmZvID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBicm93c2VySW5mb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBicm93c2VySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCBuYW1lOiAnICsgbmF2aWdhdG9yLmFwcENvZGVOYW1lICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgdmVyc2lvbjogJyArIG5hdmlnYXRvci5hcHBWZXJzaW9uICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5QbGF0Zm9ybTogJyArIG5hdmlnYXRvci5wbGF0Zm9ybSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+VXNlciBhZ2VudDogJyArIG5hdmlnYXRvci51c2VyQWdlbnQgKyAnPC9kaXY+JztcblxufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjIsIDMwLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5cbmNvbnN0IGNvbnNvbGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuY29uc3QgY29uc29sZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0UHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGUnKTtcbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfX3BhbmVsJyk7XG5jb25zb2xlRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19kaXNwbGF5Jyk7XG5jb25zb2xlRGlzcGxheS5pZCA9ICdjb25zb2xlX2Rpc3BsYXknO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0Jyk7XG5jb25zb2xlSW5wdXQuaWQgPSAnY29uc29sZV9pbnB1dCc7XG5jb25zb2xlSW5wdXQudHlwZSA9ICd0ZXh0JztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQnKTtcblxubGV0IHJlbmRlckNvbnNvbGUgPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMsIHYuIDAuMS4wLCAzMC4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5sZXQgcmVuZGVyQ29uc29sZU1lc3NhZ2UgPSAobXNnQXJyYXkpID0+IHtcblxuICAgIGxldCBodG1sID0gYGA7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiY29uc29sZV9fbXNnLWlcIj48c3BhbiBjbGFzcz1cImNvbnNvbGVfX21zZy1pcHJvbXB0XCI+PC9zcGFuPiR7bXNnQXJyYXlbMF19IDwvZGl2PmA7XG4gICAgXG4gICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImNvbnNvbGVfX21zZy1yXCI+PHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj4ke21zZ0FycmF5WzFdfTwvZGl2PmA7XG5cbiAgICByZXR1cm4gaHRtbDtcbn1cblxuZXhwb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX07XG4iLCIvKiByZW5kZXJfZG9tLmpzLCB2LiAwLjEuNywgMDUuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJQb3B1cH0gZnJvbSAnLi9yZW5kZXJfcG9wdXAuanMnO1xuXG5sZXQgcmVuZGVyRE9NID0gKGVsZW0sIHBhcmVudEVsLCBsZXZlbCkgPT4ge1xuXG4gICAgaWYgKGVsZW0uaWQgPT09ICdkZXZfdG9vbHMnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCByb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHJvdzIgPSBlbGVtLmNoaWxkcmVuLmxlbmd0aCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cxRWxlbWVudFR5cGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cxT3BlbkFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxldCByb3cxQ2xvc2VBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MkVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93Mk9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MkNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgXG4gICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLW9wZW5pbmcnKTtcbiAgICByb3cyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93Jyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY2xvc2luZycpO1xuICAgIFxuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctbmFtZScpO1xuICAgIHJvdzJFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctbmFtZScpOyBcbiAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cxQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzJPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzJDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93MU9wZW5BcnJvdy5pbm5lclRleHQgPSAgJzwnO1xuICAgIHJvdzFDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFPcGVuQXJyb3cpO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MUVsZW1lbnRUeXBlU3Bhbik7XG4gICAgXG4gICAgaWYgKGVsZW0uYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhdHRyTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBsZXQgYXR0ckVxdWFsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGxldCBhdHRyVmFsdWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHRyTmFtZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcbiAgICAgICAgICAgIGF0dHJWYWx1ZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG4gICAgICAgICAgICBhdHRyTmFtZVNwYW4uaW5uZXJUZXh0ID0gJyAnICsgYXR0ci5sb2NhbE5hbWU7XG4gICAgICAgICAgICBhdHRyRXF1YWxTcGFuLmlubmVyVGV4dCA9ICc9JztcbiAgICAgICAgICAgIGF0dHJWYWx1ZVNwYW4uaW5uZXJUZXh0ID0gJ1wiJyArIGF0dHIudmFsdWUgKyAnXCInO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyTmFtZVNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyRXF1YWxTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0clZhbHVlU3Bhbik7XG4gICAgICAgIH0pO1xuICAgIH1cdFxuICAgIFxuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MUNsb3NlQXJyb3cpO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93MSk7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgIFxuICAgIGlmIChlbGVtLnRleHQgJiYgZWxlbS50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgXG4gICAgICAgIGxldCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIHRleHRFbC5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgICAgICB0ZXh0RWwuaW5uZXJUZXh0ID0gZWxlbS50ZXh0LnRyaW0oKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0RWwpXG5cbiAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBsZXZlbCArPSAxO1xuICAgICAgICBbXS5zbGljZS5jYWxsKGVsZW0uY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJET00oZWwsIHdyYXBwZXIsIGxldmVsKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXHR9XG5cbiAgICByb3cyT3BlbkFycm93LmlubmVyVGV4dCA9ICAnPC8nO1xuICAgIHJvdzJDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MkVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJPcGVuQXJyb3cpO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93MkVsZW1lbnRUeXBlU3Bhbik7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyQ2xvc2VBcnJvdyk7XG4gICAgXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIHx8IGVsZW0udGV4dCAmJiBlbGVtLnRleHQubGVuZ3RoKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIGVsc2VcbiAgICAgICAgcm93MS5hcHBlbmRDaGlsZChyb3cyKTtcbiAgICBcblx0bGV0IHRpbWVzdGFtcDtcblxuXHRyb3cxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcblx0XHR0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xuXHR9LCBmYWxzZSk7XG5cblx0cm93MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuXHRcdGlmIChuZXcgRGF0ZSgpIC0gdGltZXN0YW1wID4gMTUwKSB7XG5cdFx0XHRyZW5kZXJQb3B1cChlbGVtKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm93MS5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKVxuXHRcdFx0cm93MS5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJylcblxuXHRcdFx0aWYgKHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpIHx8XG5cdFx0XHRcdHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKSkge1xuXHRcdFx0XHRyb3cxT3BlbkFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWV4cGFuZGVkJyk7XG5cdFx0XHRcdHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX190YWctb3Blbi0tY29sbGFwc2VkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG5cbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcbn1cbmV4cG9ydCB7cmVuZGVyRE9NfTtcbiIsIi8qIHJlbmRlcl9pbnNwZWN0b3IuanMsIHYuIDAuMS40LCAyOS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckRPTX0gZnJvbSAnLi9yZW5kZXJfZG9tLmpzJztcblxubGV0IHJlbmRlckluc3BlY3RvciA9IChib2R5LCBwYW5lbCkgPT4ge1xuXG4gICAgY29uc3QgaW5zcGVjdG9yRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGluc3BlY3RvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBpbnNwZWN0b3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yJyk7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzX19wYW5lbCcpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19kaXNwbGF5Jyk7XG4gICAgaW5zcGVjdG9yRGlzcGxheS5pZCA9ICdpbnNwZWN0b3JfZGlzcGxheSc7XG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGluc3BlY3RvckRpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGluc3BlY3RvckNvbnRhaW5lcik7XG4gICAgcmVuZGVyRE9NKGJvZHksIGluc3BlY3RvckRpc3BsYXksIGxldmVsKTtcblxufTtcblxuZXhwb3J0IHtyZW5kZXJJbnNwZWN0b3J9O1xuIiwiLyogcmVuZGVyX3BvcHVwLmpzLCB2LiAwLjEuMCwgMDQuMDQuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IHJlbmRlclBvcHVwID0gKGVsZW1lbnQpID0+IHtcblxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV2X3Rvb2xzJyk7XG4gICAgbGV0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGF0dHJpYnV0ZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHN0eWxlTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgYXR0cmlidXRlTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbGV0IHN0eWxlTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbGV0IGNsb3NlQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBhdHRyaWJ1dGVMaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHN0eWxlTGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBmaWx0ZXJlZEF0dHJpYnV0ZXMgPSBbXS5maWx0ZXIuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGF0dHIgPT4gYXR0ci5uYW1lICE9PSAnc3R5bGUnKTtcbiAgICBsZXQgaW5saW5lU3R5bGVzID0gW107XG5cbiAgICBpZiAoZWxlbWVudC5hdHRyaWJ1dGVzICYmIGVsZW1lbnQuYXR0cmlidXRlcy5zdHlsZSlcbiAgICAgICAgaW5saW5lU3R5bGVzID0gJycuc3BsaXQuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUudmFsdWUsICc7ICcpO1xuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBmaWx0ZXJlZEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxldCBuYW1lID0gZmlsdGVyZWRBdHRyaWJ1dGVzW2F0dHJdLm5hbWU7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZpbHRlcmVkQXR0cmlidXRlc1thdHRyXS52YWx1ZTtcblxuICAgICAgICBsaXN0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4+JHtuYW1lfTwvc3Bhbj48c3Bhbj46PC9zcGFuPjxzcGFuPiAke3ZhbHVlfTwvc3Bhbj5gO1xuICAgICAgICBhdHRyaWJ1dGVMaXN0LmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBydWxlIGluIGlubGluZVN0eWxlcykge1xuICAgIFxuICAgICAgICBsZXQgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsZXQgcHJvcGVydHkgPSBpbmxpbmVTdHlsZXNbcnVsZV0uc3BsaXQoJzogJylbMF07XG4gICAgICAgIGxldCB2YWx1ZSA9IGlubGluZVN0eWxlc1tydWxlXS5zcGxpdCgnOiAnKVsxXTtcblxuICAgICAgICBsaXN0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4+JHtwcm9wZXJ0eX08L3NwYW4+PHNwYW4+Ojwvc3Bhbj48c3Bhbj4gJHt2YWx1ZX08L3NwYW4+YDtcbiAgICAgICAgc3R5bGVMaXN0LmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cCcpO1xuICAgIGF0dHJpYnV0ZUxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uJyk7XG4gICAgYXR0cmlidXRlTGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3NlY3Rpb24tLWF0dHJpYnV0ZXMnKTtcbiAgICBzdHlsZUxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uJyk7XG4gICAgc3R5bGVMaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fc2VjdGlvbi0tc3R5bGVzJyk7XG4gICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgncG9wdXBfX2Nsb3NlJyk7XG4gICAgYXR0cmlidXRlTGlzdEhlYWRlci5pbm5lckhUTUwgPSAnQXR0cmlidXRlcyc7XG4gICAgc3R5bGVMaXN0SGVhZGVyLmlubmVySFRNTCA9ICdTdHlsZXMnO1xuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICd4JztcblxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBhdHRyaWJ1dGVMaXN0V3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0SGVhZGVyKTtcbiAgICBhdHRyaWJ1dGVMaXN0V3JhcHBlci5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0KTtcbiAgICBzdHlsZUxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHN0eWxlTGlzdEhlYWRlcik7XG4gICAgc3R5bGVMaXN0V3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZUxpc3QpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChhdHRyaWJ1dGVMaXN0V3JhcHBlcik7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoc3R5bGVMaXN0V3JhcHBlcik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcbn07XG5cbmV4cG9ydCB7cmVuZGVyUG9wdXB9O1xuIl19
