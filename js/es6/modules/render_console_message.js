/* render_console_message.js, v. 0.1.1, 06.04.2017, @ filip-swinarski */

import {renderConsoleOutput} from './render_console_output.js';

let renderConsoleMessage = (msgArray) => {

    let container = document.createElement('div');

    if (msgArray[0]) {

        let inputMessage = document.createElement('div');

        inputMessage.classList.add('console__msg-i');
        inputMessage.innerHTML = `<span class="console__msg-iprompt"></span>${msgArray[0]} `;
        container.appendChild(inputMessage);
    }
    
    let returnMessage = document.createElement('div');

    returnMessage.classList.add('console__msg-r');
    returnMessage.innerHTML += `<span class="console__msg-rprompt"></span>`;
    renderConsoleOutput(msgArray[1], returnMessage);
    container.appendChild(returnMessage);
    return container;
}

export {renderConsoleMessage};
