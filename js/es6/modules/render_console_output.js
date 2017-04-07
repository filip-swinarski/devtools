// render_console_output.js, v. 0.1.1, 07.04.2017 @ filip-swinarski

let renderConsoleOutput = (val, element = document.body, index) => {

    let output = document.createElement('span');
    let checkStr = Object.prototype.toString.call(val).split(' ')[1];
    let html = '';

    checkStr = checkStr.substring(0, checkStr.length-1).toLowerCase();
    output.classList.add(`console__${checkStr}`);
	
	if (checkStr === 'string' ||
        checkStr === 'number' ||
        checkStr === 'undefined' ||
        checkStr === 'null' ||
        checkStr === 'symbol' ||
        checkStr === 'boolean') {
		html += checkStr === 'string' ? `"${val}"` : val;
        output.innerHTML += html;
    } else if (checkStr ==='function') {
		html += `<span class="console__f-key">function </span><span class="console__f-name">${val.name}()</span>`;
        output.innerHTML += html;
    } else {
       
        for (let item in val) {
           
            let keyClass = checkStr === 'array' ? 'index' : 'key';
            let checkStr2 = Object.prototype.toString.call(val[item]).split(' ')[1];
           
            checkStr2 = checkStr2.substring(0, checkStr2.length-1).toLowerCase();
			

            if (checkStr2 === 'string' ||
                checkStr2 === 'number' ||
                checkStr2 === 'undefined' ||
                checkStr2 === 'null' ||
                checkStr2 === 'symbol' ||
                checkStr2 === 'boolean') {

				let keyElement = document.createElement('span');
				let valueElement = document.createElement('span');

                keyElement.classList.add(`console__${keyClass}`);
				keyElement.innerHTML = item;
				valueElement.classList.add('console__value');
				valueElement.classList.add(`console__${checkStr2}`);
				valueElement.innerHTML = checkStr2 === 'string' ? `"${val[item]}"` : val[item];
				output.appendChild(keyElement);
				output.appendChild(valueElement);
			} else if (checkStr2 ==='function') {
				html += `<span class="console__f-key">function </span><span class="console__f-name">${val.name}()</span>`;
				output.innerHTML += html;
            } else {
				
				let keyElement = document.createElement('span');
					
				keyElement.classList.add(`console_${keyClass}`);
				keyElement.innerHTML = item;
				output.classList.add('console__value');
				output.appendChild(keyElement);
                renderConsoleOutput(val[item], output, item);
            }

        }
 
    }
	
	element.appendChild(output);
};

export {renderConsoleOutput};
