/* render_console_message.js, v. 0.1.0, 30.03.2017, @ filip-swinarski */

let renderConsoleMessage = (msgArray) => {

    let html = ``;

    if (msgArray[0])
            html += `<div class="console__msg-i"><span class="console__msg-iprompt"></span>${msgArray[0]} </div>`;
    
    html += `<div class="console__msg-r"><span class="console__msg-rprompt"></span>${msgArray[1]}</div>`;

    return html;
}

export {renderConsoleMessage};
