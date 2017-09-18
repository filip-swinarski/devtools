/* global_eval.js, v. 0.1.0, 31.03.2017, @ filip-swinarski */

// eval - runs block scope declarations via script injection
// otherwise standard eval used 
// - think if not use injection exclusively
// returns value
const globalEval = (str) => {

    'use strict'; // prevent creating local variables with standard eval
    
    if (str.startsWith('let ') || str.startsWith('const ')) { // code for script insertion

        let script;
        
        if (document.getElementById('dt_script')) {
            document.getElementById('dt_script').remove()
        } 
        
        script = document.createElement('script');
        script.id = 'dt_script';
        script.innerText = str;
        document.head.appendChild(script);
        return undefined; // returns undefined when declaring block scoped variable
    } else { //standard eval
        return (1, eval)(str); // indirect call to access global scope
    }
}

export {globalEval};
