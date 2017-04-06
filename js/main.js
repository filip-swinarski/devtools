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

},{"./modules/console_listen.js":2,"./modules/dt_console_api.js":4,"./modules/load_styles.js":6,"./modules/render_browser_info.js":7,"./modules/render_console.js":8,"./modules/render_inspector.js":12}],2:[function(require,module,exports){
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
// render_console_output.js, v. 0.1.0, 06.04.2017 @ filip-swinarski

var renderConsoleOutput = function renderConsoleOutput(val) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;


    var output = document.createElement('span');
    var checkStr = Object.prototype.toString.call(val).split(' ')[1];
    var html = '';

    checkStr = checkStr.substring(0, checkStr.length - 1).toLowerCase();
    output.classList.add('console__' + checkStr);

    if (checkStr === 'string' || checkStr === 'number' || checkStr === 'undefined' || checkStr === 'null' || checkStr === 'symbol' || checkStr === 'boolean') {
        html += val;
        output.innerHTML += html;
    } else {

        for (var item in val) {

            var keyClass = checkStr === 'array' ? 'index' : 'key';
            var checkStr2 = Object.prototype.toString.call(val[item]).split(' ')[1];

            checkStr2 = checkStr2.substring(0, checkStr2.length - 1).toLowerCase();

            if (checkStr2 === 'string' || checkStr2 === 'number' || checkStr2 === 'undefined' || checkStr2 === 'null' || checkStr2 === 'symbol' || checkStr2 === 'boolean') {
                html += '<span class="console__' + keyClass + '">' + item + '</span>';
                html += '<span class="console__value">' + val[item] + '</span>';
            } else {
                renderConsoleOutput(val[item], output);
            }
        }
        output.innerHTML += html;
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

    if (elem.id === 'inspector_display') return;

    var wrapper = document.createElement('div');
    var row1 = document.createElement('div');
    var row2 = elem.children.length ? document.createElement('div') : document.createElement('span');

    row1.classList.add('inspector__row');
    row1.classList.add('inspector__row--opening');
    row2.classList.add('inspector__row');
    row2.classList.add('inspector__row--closing');

    var row1ElementTypeSpan = document.createElement('span');
    var row1OpenArrow = document.createElement('span');
    var row1CloseArrow = document.createElement('span');
    var row2ElementTypeSpan = document.createElement('span');
    var row2OpenArrow = document.createElement('span');
    var row2CloseArrow = document.createElement('span');

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

    if (elem.children.length) level += 1;
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

    row2OpenArrow.innerText = '</';
    row2CloseArrow.innerText = '>';
    row2ElementTypeSpan.innerText = elem.localName;
    row2.appendChild(row2OpenArrow);
    row2.appendChild(row2ElementTypeSpan);
    row2.appendChild(row2CloseArrow);

    if (elem.children.length || elem.text && elem.text.length) wrapper.appendChild(row2);else row1.appendChild(row2);

    row1.addEventListener('click', function (e) {
        e.preventDefault();
        row1.classList.toggle('inspector__row--expanded');
        row1.classList.toggle('inspector__row--collapsed');
        row1OpenArrow.classList.toggle('inspector__tag-open--expanded');
        row1OpenArrow.classList.toggle('inspector__tag-open--collapsed');
    }, false);

    row1.addEventListener('click', function (e) {
        e.preventDefault;
        (0, _render_popup.renderPopup)(elem);
    }, false);

    parentEl.appendChild(wrapper);
}; /* render_dom.js, v. 0.1.6, 04.04.2017, @ filip-swinarski */

exports.renderDOM = renderDOM;

},{"./render_popup.js":13}],12:[function(require,module,exports){
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

},{"./render_dom.js":11}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvbWFpbi5qcyIsImpzL2VzNi9tb2R1bGVzL2NvbnNvbGVfbGlzdGVuLmpzIiwianMvZXM2L21vZHVsZXMvY29uc29sZV9sb2cuanMiLCJqcy9lczYvbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyIsImpzL2VzNi9tb2R1bGVzL2dsb2JhbF9ldmFsLmpzIiwianMvZXM2L21vZHVsZXMvbG9hZF9zdHlsZXMuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfYnJvd3Nlcl9pbmZvLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzIiwianMvZXM2L21vZHVsZXMvcmVuZGVyX2RvbS5qcyIsImpzL2VzNi9tb2R1bGVzL3JlbmRlcl9pbnNwZWN0b3IuanMiLCJqcy9lczYvbW9kdWxlcy9yZW5kZXJfcG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUFZLFM7Ozs7QUFQWjs7QUFTQSxJQUFNLE9BQU8sU0FBUyxJQUF0QjtBQUNBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7O0FBRUEsVUFBVSxFQUFWLEdBQWUsV0FBZjtBQUNBLFVBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixPQUF4QjtBQUNBLEtBQUssV0FBTCxDQUFpQixTQUFqQjtBQUNBO0FBQ0EsdUNBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0EsbUNBQWMsU0FBZDtBQUNBLDRDQUFrQixTQUFsQjs7QUFFQSxPQUFPLFNBQVAsR0FBbUIsU0FBbkI7Ozs7Ozs7Ozs7QUNsQkE7O0FBRUE7O0FBQ0E7O0FBTEE7O0FBT0EsSUFBSSxnQkFBZ0Is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WixjQUFpQyxRQUFqQyxvQ0FBd0UsTUFBeEU7QUFDQSxrQkFBVSxXQUFWLENBQXNCLFlBQXRCO0FBQ0g7O0FBRUQsVUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0EseUJBQXFCLFNBQXJCLENBQStCLEdBQS9CLENBQW1DLGdCQUFuQztBQUNBLHlCQUFxQixTQUFyQixDQUErQixHQUEvQixDQUFtQyw0QkFBbkM7QUFDQSxxQkFBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsZ0JBQS9CO0FBQ0EscUJBQWlCLFNBQWpCLENBQTJCLEdBQTNCLENBQStCLHdCQUEvQjtBQUNBLGFBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixjQUF2QjtBQUNBLHdCQUFvQixTQUFwQixHQUFnQyxZQUFoQztBQUNBLG9CQUFnQixTQUFoQixHQUE0QixRQUE1QjtBQUNBLGFBQVMsU0FBVCxHQUFxQixHQUFyQjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQU07QUFDckMsY0FBTSxNQUFOO0FBQ0gsS0FGRCxFQUVHLEtBRkg7O0FBSUEseUJBQXFCLFdBQXJCLENBQWlDLG1CQUFqQztBQUNBLHlCQUFxQixXQUFyQixDQUFpQyxhQUFqQztBQUNBLHFCQUFpQixXQUFqQixDQUE2QixlQUE3QjtBQUNBLHFCQUFpQixXQUFqQixDQUE2QixTQUE3QjtBQUNBLFVBQU0sV0FBTixDQUFrQixRQUFsQjtBQUNBLFVBQU0sV0FBTixDQUFrQixvQkFBbEI7QUFDQSxVQUFNLFdBQU4sQ0FBa0IsZ0JBQWxCO0FBQ0EsY0FBVSxXQUFWLENBQXNCLEtBQXRCO0FBQ0gsQ0EzREQ7O1FBNkRRLFcsR0FBQSxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIG1haW4uanMgMC4xLjEgMzAuMDMuMjAxNyBAIGZpbGlwIHN3aW5hcnNraSAqL1xuXG5pbXBvcnQge2xvYWRTdHlsZXN9IGZyb20gJy4vbW9kdWxlcy9sb2FkX3N0eWxlcy5qcyc7XG5pbXBvcnQge3JlbmRlckluc3BlY3Rvcn0gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9pbnNwZWN0b3IuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlfSBmcm9tICcuL21vZHVsZXMvcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJCcm93c2VySW5mb30gZnJvbSAnLi9tb2R1bGVzL3JlbmRlcl9icm93c2VyX2luZm8uanMnO1xuaW1wb3J0IHtjb25zb2xlTGlzdGVufSBmcm9tICcuL21vZHVsZXMvY29uc29sZV9saXN0ZW4uanMnO1xuaW1wb3J0ICogYXMgRFRDb25zb2xlIGZyb20gJy4vbW9kdWxlcy9kdF9jb25zb2xlX2FwaS5qcyc7XG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmNvbnRhaW5lci5pZCA9ICdkZXZfdG9vbHMnO1xuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xzJyk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5sb2FkU3R5bGVzKCk7XG5yZW5kZXJJbnNwZWN0b3IoYm9keSwgY29udGFpbmVyKTtcbnJlbmRlckNvbnNvbGUoY29udGFpbmVyKTtcbnJlbmRlckJyb3dzZXJJbmZvKGNvbnRhaW5lcik7XG5cbndpbmRvdy5EVENvbnNvbGUgPSBEVENvbnNvbGU7XG4iLCIvKiBjb25zb2xlX2xpc3Rlbi5qcywgdi4gMC4xLjUsIDA2LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZURpc3BsYXl9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtjb25zb2xlSW5wdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGUuanMnO1xuaW1wb3J0IHtyZW5kZXJDb25zb2xlTWVzc2FnZX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZV9tZXNzYWdlLmpzJztcbmltcG9ydCB7Z2xvYmFsRXZhbH0gZnJvbSAnLi9nbG9iYWxfZXZhbC5qcyc7XG5cbmxldCBjb25zb2xlTGlzdGVuID0gKCkgPT4ge1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVycm9yKSA9PiB7XG5cbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGxldCBlcnJvclNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yTGluZU5vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBsZXQgZXJyb3JDb2x1bW5ObyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGV0IGVycm9yUHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19yb3cnKTtcbiAgICAgICAgZXJyb3JQcm9tcHQuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXByb21wdCcpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1yLS1lcnInKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2Vyci1tc2cnKTtcbiAgICAgICAgZXJyb3JTb3VyY2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLXNyYycpO1xuICAgICAgICBlcnJvckxpbmVOby5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19lcnItbGluZW5vJyk7XG4gICAgICAgIGVycm9yQ29sdW1uTm8uY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fZXJyLWNvbHVtbm5vJyk7XG5cbiAgICAgICAgZXJyb3JNZXNzYWdlTXNnLmlubmVySFRNTCArPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBlcnJvclNvdXJjZS5pbm5lckhUTUwgKz0gZXJyb3IuZmlsZW5hbWU7XG4gICAgICAgIGVycm9yTGluZU5vLmlubmVySFRNTCArPSBlcnJvci5saW5lbm87XG4gICAgICAgIGVycm9yQ29sdW1uTm8uaW5uZXJIVE1MICs9IGVycm9yLmNvbHVtbm5vO1xuXG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvclByb21wdCk7XG4gICAgICAgIGVycm9yTWVzc2FnZS5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2VNc2cpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JTb3VyY2UpO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JMaW5lTm8pO1xuICAgICAgICBlcnJvck1lc3NhZ2UuYXBwZW5kQ2hpbGQoZXJyb3JDb2x1bW5Obyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChlcnJvck1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlRGlzcGxheS5hcHBlbmRDaGlsZChyb3cpO1xuICAgIFxuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnNvbGVEaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2xvZycsIChlKSA9PiB7XG5cbiAgICAgICAgbGV0IHJvdyA9IHJlbmRlckNvbnNvbGVNZXNzYWdlKGUuZGV0YWlsKTtcblxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fcm93Jyk7XG4gICAgICAgIGNvbnNvbGVEaXNwbGF5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgY29uc29sZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZ2xvYmFsRXZhbChjb25zb2xlSW5wdXQudmFsdWUpO1xuXG4gICAgICAgICAgICBEVENvbnNvbGUubG9nKHZhbHVlLCBjb25zb2xlSW5wdXQudmFsdWUpO1x0XG4gICAgICAgICAgICBjb25zb2xlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IHtjb25zb2xlTGlzdGVufTtcbiIsIi8qIGNvbnNvbGVfbG9nLmpzLCB2LiAwLjEuMiwgMzAuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtjb25zb2xlRGlzcGxheX0gZnJvbSAnLi9yZW5kZXJfY29uc29sZS5qcyc7XG5cbmxldCBjb25zb2xlTG9nID0gKHN0ciwgdmFsdWUpID0+IHtcblxuICAgIGxldCBsb2cgPSBuZXcgQ3VzdG9tRXZlbnQoJ2xvZycsIHtkZXRhaWw6IFtzdHIsIHZhbHVlXX0pO1xuXG4gICAgY29uc29sZURpc3BsYXkuZGlzcGF0Y2hFdmVudChsb2cpO1xuXG59XG5cbmV4cG9ydCB7Y29uc29sZUxvZ307XG4iLCIvKiBkdF9jb25zb2xlX2FwaS5qcywgdi4gMC4xLjIsIDMwLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxvZ30gZnJvbSAnLi9jb25zb2xlX2xvZy5qcyc7XG5cbmxldCBsb2cgPSAodmFsdWUsIHN0ciA9ICcnKSA9PiB7XG4gICAgY29uc29sZUxvZyhzdHIsIHZhbHVlKTtcbn1cblxuZXhwb3J0IHtsb2d9O1xuIiwiLyogZ2xvYmFsX2V2YWwuanMsIHYuIDAuMS4wLCAzMS4wMy4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG4vLyBldmFsIC0gcnVucyBibG9jayBzY29wZSBkZWNsYXJhdGlvbnMgdmlhIHNjcmlwdCBpbmplY3Rpb25cbi8vIG90aGVyd2lzZSBzdGFuZGFyZCBldmFsIHVzZWQgXG4vLyAtIHRoaW5rIGlmIG5vdCB1c2UgaW5qZWN0aW9uIGV4Y2x1c2l2ZWx5XG4vLyByZXR1cm5zIHZhbHVlXG5jb25zdCBnbG9iYWxFdmFsID0gKHN0cikgPT4ge1xuXG4gICAgJ3VzZSBzdHJpY3QnOyAvLyBwcmV2ZW50IGNyZWF0aW5nIGxvY2FsIHZhcmlhYmxlcyB3aXRoIHN0YW5kYXJkIGV2YWxcbiAgICBcbiAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ2xldCAnKSB8fCBzdHIuc3RhcnRzV2l0aCgnY29uc3QgJykpIHsgLy8gY29kZSBmb3Igc2NyaXB0IGluc2VydGlvblxuXG4gICAgICAgIGxldCBzY3JpcHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R0X3NjcmlwdCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHRfc2NyaXB0JykucmVtb3ZlKClcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuaWQgPSAnZHRfc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmlubmVyVGV4dCA9IHN0cjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyByZXR1cm5zIHVuZGVmaW5lZCB3aGVuIGRlY2xhcmluZyBibG9jayBzY29wZWQgdmFyaWFibGVcbiAgICB9IGVsc2UgeyAvL3N0YW5kYXJkIGV2YWxcbiAgICAgICAgcmV0dXJuICgxLCBldmFsKShzdHIpOyAvLyBpbmRpcmVjdCBjYWxsIHRvIGFjY2VzcyBnbG9iYWwgc2NvcGVcbiAgICB9XG59XG5cbmV4cG9ydCB7Z2xvYmFsRXZhbH07XG4iLCIvKiBsb2FkIF9zdHlsZXMuanMgdi4gMC4xLjIsIDA0LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCBsb2FkU3R5bGVzID0gKCkgPT4ge1xuXG4gICAgbGV0IHN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsZXQgZ29vZ2xlRm9udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIHN0eWxlcy5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgc3R5bGVzLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlcy5tZWRpYSA9ICdzY3JlZW4nO1xuICAgIHN0eWxlcy5ocmVmID0gJy4vY3NzL21haW4uY3NzJztcbiAgICBzdHlsZXMucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIHN0eWxlcy50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZXMubWVkaWEgPSAnc2NyZWVuJztcbiAgICBzdHlsZXMuaHJlZiA9ICdodHRwczovL2dvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U3BhY2UrTW9ubzo0MDAsNzAwJmFtcDtzdWJzZXQ9bGF0aW4tZXh0JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGdvb2dsZUZvbnQpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVzKTtcbn07XG5cbmV4cG9ydCB7bG9hZFN0eWxlc307XG4iLCIvKiByZW5kZXJfYnJvd3Nlcl9pbmZvLmpzLCB2LiAwLjEuMCwgMjkuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxubGV0IHJlbmRlckJyb3dzZXJJbmZvID0gKHBhbmVsKSA9PiB7XG5cbiAgICBjb25zdCBicm93c2VySW5mb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBicm93c2VySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYnJvd3NlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYnJvd3NlcicpO1xuICAgIGJyb3dzZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX3BhbmVsJyk7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Jyb3dzZXJfX2Rpc3BsYXknKTtcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaWQgPSAnYnJvd3Nlcl9kaXNwbGF5JztcbiAgICBicm93c2VySW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChicm93c2VySW5mb0Rpc3BsYXkpO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGJyb3dzZXJJbmZvQ29udGFpbmVyKTtcbiAgICBcbiAgICBicm93c2VySW5mb0Rpc3BsYXkuaW5uZXJIVE1MICs9ICc8ZGl2PkFwcCBuYW1lOiAnICsgbmF2aWdhdG9yLmFwcENvZGVOYW1lICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5BcHAgdmVyc2lvbjogJyArIG5hdmlnYXRvci5hcHBWZXJzaW9uICsgJzwvZGl2Pic7XG4gICAgYnJvd3NlckluZm9EaXNwbGF5LmlubmVySFRNTCArPSAnPGRpdj5QbGF0Zm9ybTogJyArIG5hdmlnYXRvci5wbGF0Zm9ybSArICc8L2Rpdj4nO1xuICAgIGJyb3dzZXJJbmZvRGlzcGxheS5pbm5lckhUTUwgKz0gJzxkaXY+VXNlciBhZ2VudDogJyArIG5hdmlnYXRvci51c2VyQWdlbnQgKyAnPC9kaXY+JztcblxufTtcblxuZXhwb3J0IHtyZW5kZXJCcm93c2VySW5mb307XG4iLCIvKiByZW5kZXJfY29uc29sZS5qcywgdi4gMC4xLjIsIDMwLjAzLjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7Y29uc29sZUxpc3Rlbn0gZnJvbSAnLi9jb25zb2xlX2xpc3Rlbic7XG5cbmNvbnN0IGNvbnNvbGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBjb25zb2xlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuY29uc3QgY29uc29sZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgY29uc29sZUlucHV0UHJvbXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5jb25zb2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGUnKTtcbmNvbnNvbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9vbHNfX3BhbmVsJyk7XG5jb25zb2xlRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19kaXNwbGF5Jyk7XG5jb25zb2xlRGlzcGxheS5pZCA9ICdjb25zb2xlX2Rpc3BsYXknO1xuY29uc29sZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX2lucHV0Jyk7XG5jb25zb2xlSW5wdXQuaWQgPSAnY29uc29sZV9pbnB1dCc7XG5jb25zb2xlSW5wdXQudHlwZSA9ICd0ZXh0JztcbmNvbnNvbGVJbnB1dFByb21wdC5jbGFzc0xpc3QuYWRkKCdjb25zb2xlX19wcm9tcHQnKTtcblxubGV0IHJlbmRlckNvbnNvbGUgPSAocGFuZWwpID0+IHtcblxuICAgIGNvbnNvbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc29sZUlucHV0UHJvbXB0KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVEaXNwbGF5KTtcbiAgICBjb25zb2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnNvbGVJbnB1dCk7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoY29uc29sZUNvbnRhaW5lcik7XG4gICAgY29uc29sZUxpc3RlbigpO1xuXG59XG5cbmV4cG9ydCB7cmVuZGVyQ29uc29sZX07XG5leHBvcnQge2NvbnNvbGVEaXNwbGF5fTtcbmV4cG9ydCB7Y29uc29sZUlucHV0fTtcbiIsIi8qIHJlbmRlcl9jb25zb2xlX21lc3NhZ2UuanMsIHYuIDAuMS4xLCAwNi4wNC4yMDE3LCBAIGZpbGlwLXN3aW5hcnNraSAqL1xuXG5pbXBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9IGZyb20gJy4vcmVuZGVyX2NvbnNvbGVfb3V0cHV0LmpzJztcblxubGV0IHJlbmRlckNvbnNvbGVNZXNzYWdlID0gKG1zZ0FycmF5KSA9PiB7XG5cbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZiAobXNnQXJyYXlbMF0pIHtcblxuICAgICAgICBsZXQgaW5wdXRNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5wdXRNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbnNvbGVfX21zZy1pJyk7XG4gICAgICAgIGlucHV0TWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctaXByb21wdFwiPjwvc3Bhbj4ke21zZ0FycmF5WzBdfSBgO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRNZXNzYWdlKTtcbiAgICB9XG4gICAgXG4gICAgbGV0IHJldHVybk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHJldHVybk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uc29sZV9fbXNnLXInKTtcbiAgICByZXR1cm5NZXNzYWdlLmlubmVySFRNTCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX19tc2ctcnByb21wdFwiPjwvc3Bhbj5gO1xuICAgIHJlbmRlckNvbnNvbGVPdXRwdXQobXNnQXJyYXlbMV0sIHJldHVybk1lc3NhZ2UpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXR1cm5NZXNzYWdlKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnQge3JlbmRlckNvbnNvbGVNZXNzYWdlfTtcbiIsIi8vIHJlbmRlcl9jb25zb2xlX291dHB1dC5qcywgdi4gMC4xLjAsIDA2LjA0LjIwMTcgQCBmaWxpcC1zd2luYXJza2lcblxubGV0IHJlbmRlckNvbnNvbGVPdXRwdXQgPSAodmFsLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSkgPT4ge1xuXG4gICAgbGV0IG91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgY2hlY2tTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zcGxpdCgnICcpWzFdO1xuICAgIGxldCBodG1sID0gJyc7XG5cbiAgICBjaGVja1N0ciA9IGNoZWNrU3RyLnN1YnN0cmluZygwLCBjaGVja1N0ci5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcbiAgICBvdXRwdXQuY2xhc3NMaXN0LmFkZChgY29uc29sZV9fJHtjaGVja1N0cn1gKTtcblxuICAgICBpZiAoY2hlY2tTdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIGNoZWNrU3RyID09PSAnbnVtYmVyJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdudWxsJyB8fFxuICAgICAgICBjaGVja1N0ciA9PT0gJ3N5bWJvbCcgfHxcbiAgICAgICAgY2hlY2tTdHIgPT09ICdib29sZWFuJykge1xuICAgICAgICBodG1sICs9IHZhbDtcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH0gZWxzZSB7XG4gICAgICAgXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gdmFsKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGtleUNsYXNzID0gY2hlY2tTdHIgPT09ICdhcnJheScgPyAnaW5kZXgnIDogJ2tleSc7XG4gICAgICAgICAgICBsZXQgY2hlY2tTdHIyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbFtpdGVtXSkuc3BsaXQoJyAnKVsxXTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjaGVja1N0cjIgPSBjaGVja1N0cjIuc3Vic3RyaW5nKDAsIGNoZWNrU3RyMi5sZW5ndGgtMSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrU3RyMiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgICAgICBjaGVja1N0cjIgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ251bGwnIHx8XG4gICAgICAgICAgICAgICAgY2hlY2tTdHIyID09PSAnc3ltYm9sJyB8fFxuICAgICAgICAgICAgICAgIGNoZWNrU3RyMiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjb25zb2xlX18ke2tleUNsYXNzfVwiPiR7aXRlbX08L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cImNvbnNvbGVfX3ZhbHVlXCI+JHt2YWxbaXRlbV19PC9zcGFuPmA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbmRlckNvbnNvbGVPdXRwdXQodmFsW2l0ZW1dLCBvdXRwdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCArPSBodG1sO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG91dHB1dCk7XG59O1xuXG5leHBvcnQge3JlbmRlckNvbnNvbGVPdXRwdXR9O1xuIiwiLyogcmVuZGVyX2RvbS5qcywgdi4gMC4xLjYsIDA0LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmltcG9ydCB7cmVuZGVyUG9wdXB9IGZyb20gJy4vcmVuZGVyX3BvcHVwLmpzJztcblxubGV0IHJlbmRlckRPTSA9IChlbGVtLCBwYXJlbnRFbCwgbGV2ZWwpID0+IHtcblxuICAgIGlmIChlbGVtLmlkID09PSAnaW5zcGVjdG9yX2Rpc3BsYXknKVxuICAgICAgICByZXR1cm47XG5cbiAgICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCByb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHJvdzIgPSBlbGVtLmNoaWxkcmVuLmxlbmd0aCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3cnKTtcbiAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1vcGVuaW5nJyk7XG4gICAgcm93Mi5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3JvdycpO1xuICAgIHJvdzIuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNsb3NpbmcnKTtcbiAgICBcbiAgICBsZXQgcm93MUVsZW1lbnRUeXBlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MU9wZW5BcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBsZXQgcm93MUNsb3NlQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJFbGVtZW50VHlwZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJPcGVuQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGV0IHJvdzJDbG9zZUFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIFxuICAgIHJvdzFFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctbmFtZScpO1xuICAgIHJvdzJFbGVtZW50VHlwZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctbmFtZScpOyBcbiAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLW9wZW4nKTtcbiAgICByb3cxQ2xvc2VBcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1jbG9zZScpO1xuICAgIHJvdzJPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3BlbicpO1xuICAgIHJvdzJDbG9zZUFycm93LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fdGFnLWNsb3NlJyk7XG4gICAgcm93MU9wZW5BcnJvdy5pbm5lclRleHQgPSAgJzwnO1xuICAgIHJvdzFDbG9zZUFycm93LmlubmVyVGV4dCA9ICAnPic7XG4gICAgcm93MUVsZW1lbnRUeXBlU3Bhbi5pbm5lclRleHQgPSBlbGVtLmxvY2FsTmFtZTtcbiAgICByb3cxLmFwcGVuZENoaWxkKHJvdzFPcGVuQXJyb3cpO1xuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MUVsZW1lbnRUeXBlU3Bhbik7XG4gICAgXG4gICAgaWYgKGVsZW0uYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhdHRyTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBsZXQgYXR0ckVxdWFsU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGxldCBhdHRyVmFsdWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHRyTmFtZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLW5hbWUnKTtcbiAgICAgICAgICAgIGF0dHJWYWx1ZVNwYW4uY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19hdHRyLXZhbHVlJyk7XG4gICAgICAgICAgICBhdHRyTmFtZVNwYW4uaW5uZXJUZXh0ID0gJyAnICsgYXR0ci5sb2NhbE5hbWU7XG4gICAgICAgICAgICBhdHRyRXF1YWxTcGFuLmlubmVyVGV4dCA9ICc9JztcbiAgICAgICAgICAgIGF0dHJWYWx1ZVNwYW4uaW5uZXJUZXh0ID0gJ1wiJyArIGF0dHIudmFsdWUgKyAnXCInO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyTmFtZVNwYW4pO1xuICAgICAgICAgICAgcm93MS5hcHBlbmRDaGlsZChhdHRyRXF1YWxTcGFuKTtcbiAgICAgICAgICAgIHJvdzEuYXBwZW5kQ2hpbGQoYXR0clZhbHVlU3Bhbik7XG4gICAgICAgIH0pO1xuICAgIH1cdFxuICAgIFxuICAgIHJvdzEuYXBwZW5kQ2hpbGQocm93MUNsb3NlQXJyb3cpO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93MSk7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgIFxuICAgIGlmIChlbGVtLnRleHQgJiYgZWxlbS50ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgXG4gICAgICAgIGxldCB0ZXh0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIHRleHRFbC5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX2V4cCcpO1xuICAgICAgICB0ZXh0RWwuaW5uZXJUZXh0ID0gZWxlbS50ZXh0LnRyaW0oKTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0RWwpXG5cbiAgICAgICAgaWYgKGxldmVsIDwgMikge1xuICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdzEuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX19yb3ctLWNvbGxhcHNlZCcpO1xuICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aClcbiAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgW10uc2xpY2UuY2FsbChlbGVtLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyRE9NKGVsLCB3cmFwcGVyLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDIpIHtcbiAgICAgICAgICAgICAgICByb3cxLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fcm93LS1leHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHJvdzFPcGVuQXJyb3cuY2xhc3NMaXN0LmFkZCgnaW5zcGVjdG9yX190YWctb3Blbi0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93MS5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJyk7XG4gICAgICAgICAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QuYWRkKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIHJvdzJPcGVuQXJyb3cuaW5uZXJUZXh0ID0gICc8Lyc7XG4gICAgcm93MkNsb3NlQXJyb3cuaW5uZXJUZXh0ID0gICc+JztcbiAgICByb3cyRWxlbWVudFR5cGVTcGFuLmlubmVyVGV4dCA9IGVsZW0ubG9jYWxOYW1lO1xuICAgIHJvdzIuYXBwZW5kQ2hpbGQocm93Mk9wZW5BcnJvdyk7XG4gICAgcm93Mi5hcHBlbmRDaGlsZChyb3cyRWxlbWVudFR5cGVTcGFuKTtcbiAgICByb3cyLmFwcGVuZENoaWxkKHJvdzJDbG9zZUFycm93KTtcbiAgICBcbiAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggfHwgZWxlbS50ZXh0ICYmIGVsZW0udGV4dC5sZW5ndGgpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocm93Mik7XG4gICAgZWxzZVxuICAgICAgICByb3cxLmFwcGVuZENoaWxkKHJvdzIpO1xuICAgIFxuICAgIHJvdzEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJvdzEuY2xhc3NMaXN0LnRvZ2dsZSgnaW5zcGVjdG9yX19yb3ctLWV4cGFuZGVkJylcbiAgICAgICAgcm93MS5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3Jvdy0tY29sbGFwc2VkJylcbiAgICAgICAgcm93MU9wZW5BcnJvdy5jbGFzc0xpc3QudG9nZ2xlKCdpbnNwZWN0b3JfX3RhZy1vcGVuLS1leHBhbmRlZCcpO1xuICAgICAgICByb3cxT3BlbkFycm93LmNsYXNzTGlzdC50b2dnbGUoJ2luc3BlY3Rvcl9fdGFnLW9wZW4tLWNvbGxhcHNlZCcpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHJvdzEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0O1xuICAgICAgICByZW5kZXJQb3B1cChlbGVtKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgcGFyZW50RWwuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG59XG5leHBvcnQge3JlbmRlckRPTX07XG4iLCIvKiByZW5kZXJfaW5zcGVjdG9yLmpzLCB2LiAwLjEuNCwgMjkuMDMuMjAxNywgQCBmaWxpcC1zd2luYXJza2kgKi9cblxuaW1wb3J0IHtyZW5kZXJET019IGZyb20gJy4vcmVuZGVyX2RvbS5qcyc7XG5cbmxldCByZW5kZXJJbnNwZWN0b3IgPSAoYm9keSwgcGFuZWwpID0+IHtcblxuICAgIGNvbnN0IGluc3BlY3RvckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBpbnNwZWN0b3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgaW5zcGVjdG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luc3BlY3RvcicpO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b29sc19fcGFuZWwnKTtcbiAgICBpbnNwZWN0b3JEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2luc3BlY3Rvcl9fZGlzcGxheScpO1xuICAgIGluc3BlY3RvckRpc3BsYXkuaWQgPSAnaW5zcGVjdG9yX2Rpc3BsYXknO1xuICAgIGluc3BlY3RvckNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnNwZWN0b3JEaXNwbGF5KTtcbiAgICBwYW5lbC5hcHBlbmRDaGlsZChpbnNwZWN0b3JDb250YWluZXIpO1xuICAgIHJlbmRlckRPTShib2R5LCBpbnNwZWN0b3JEaXNwbGF5LCBsZXZlbCk7XG5cbn07XG5cbmV4cG9ydCB7cmVuZGVySW5zcGVjdG9yfTtcbiIsIi8qIHJlbmRlcl9wb3B1cC5qcywgdi4gMC4xLjAsIDA0LjA0LjIwMTcsIEAgZmlsaXAtc3dpbmFyc2tpICovXG5cbmxldCByZW5kZXJQb3B1cCA9IChlbGVtZW50KSA9PiB7XG5cbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rldl90b29scycpO1xuICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBhdHRyaWJ1dGVMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBzdHlsZUxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGF0dHJpYnV0ZUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGxldCBzdHlsZUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGxldCBjbG9zZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgYXR0cmlidXRlTGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBzdHlsZUxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgZmlsdGVyZWRBdHRyaWJ1dGVzID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBhdHRyID0+IGF0dHIubmFtZSAhPT0gJ3N0eWxlJyk7XG4gICAgbGV0IGlubGluZVN0eWxlcyA9IFtdO1xuXG4gICAgaWYgKGVsZW1lbnQuYXR0cmlidXRlcyAmJiBlbGVtZW50LmF0dHJpYnV0ZXMuc3R5bGUpXG4gICAgICAgIGlubGluZVN0eWxlcyA9ICcnLnNwbGl0LmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLnN0eWxlLnZhbHVlLCAnOyAnKTtcblxuICAgIGZvciAobGV0IGF0dHIgaW4gZmlsdGVyZWRBdHRyaWJ1dGVzKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsZXQgbmFtZSA9IGZpbHRlcmVkQXR0cmlidXRlc1thdHRyXS5uYW1lO1xuICAgICAgICBsZXQgdmFsdWUgPSBmaWx0ZXJlZEF0dHJpYnV0ZXNbYXR0cl0udmFsdWU7XG5cbiAgICAgICAgbGlzdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuPiR7bmFtZX08L3NwYW4+PHNwYW4+Ojwvc3Bhbj48c3Bhbj4gJHt2YWx1ZX08L3NwYW4+YDtcbiAgICAgICAgYXR0cmlidXRlTGlzdC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcnVsZSBpbiBpbmxpbmVTdHlsZXMpIHtcbiAgICBcbiAgICAgICAgbGV0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gaW5saW5lU3R5bGVzW3J1bGVdLnNwbGl0KCc6ICcpWzBdO1xuICAgICAgICBsZXQgdmFsdWUgPSBpbmxpbmVTdHlsZXNbcnVsZV0uc3BsaXQoJzogJylbMV07XG5cbiAgICAgICAgbGlzdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuPiR7cHJvcGVydHl9PC9zcGFuPjxzcGFuPjo8L3NwYW4+PHNwYW4+ICR7dmFsdWV9PC9zcGFuPmA7XG4gICAgICAgIHN0eWxlTGlzdC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXAnKTtcbiAgICBhdHRyaWJ1dGVMaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fc2VjdGlvbicpO1xuICAgIGF0dHJpYnV0ZUxpc3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19zZWN0aW9uLS1hdHRyaWJ1dGVzJyk7XG4gICAgc3R5bGVMaXN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdwb3B1cF9fc2VjdGlvbicpO1xuICAgIHN0eWxlTGlzdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wdXBfX3NlY3Rpb24tLXN0eWxlcycpO1xuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX19jbG9zZScpO1xuICAgIGF0dHJpYnV0ZUxpc3RIZWFkZXIuaW5uZXJIVE1MID0gJ0F0dHJpYnV0ZXMnO1xuICAgIHN0eWxlTGlzdEhlYWRlci5pbm5lckhUTUwgPSAnU3R5bGVzJztcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAneCc7XG5cbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgYXR0cmlidXRlTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdEhlYWRlcik7XG4gICAgYXR0cmlidXRlTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdCk7XG4gICAgc3R5bGVMaXN0V3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZUxpc3RIZWFkZXIpO1xuICAgIHN0eWxlTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQoc3R5bGVMaXN0KTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoYXR0cmlidXRlTGlzdFdyYXBwZXIpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHN0eWxlTGlzdFdyYXBwZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3B1cCk7XG59O1xuXG5leHBvcnQge3JlbmRlclBvcHVwfTtcbiJdfQ==
