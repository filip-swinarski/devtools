/* render_console_message.js, v. 0.1.1, 19.09.2017, @ filip-swinarski */

import {renderConsoleOutput} from './render_console_output.js';

const renderConsoleMessage = (msgArray) => {

    const container = document.createElement('div');

    if (msgArray[0]) {

        const inputMessage = document.createElement('div');

        inputMessage.classList.add('console__msg-i');
        inputMessage.innerHTML = `<span class="console__msg-iprompt"></span>${msgArray[0]} `;
        container.appendChild(inputMessage);
    }
    
    const returnMessage = document.createElement('div');

    returnMessage.classList.add('console__msg-r');
    returnMessage.innerHTML += `<span class="console__msg-rprompt"></span>`;
    renderConsoleOutput(msgArray[1], returnMessage);
    container.appendChild(returnMessage);
    return container;
}

export {renderConsoleMessage};
