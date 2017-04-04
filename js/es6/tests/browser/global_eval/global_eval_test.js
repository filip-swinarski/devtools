// global_eval_test.js, v. 0.1.0, 04.04.2017 @ filip-swinarski

const assert = chai.assert;

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

describe('global eval var declarations', () => {
    
    it('should create global variable', () => {
        let str = 'var myVariable = 2;';
        globalEval(str);
        assert(window.myVariable === 2, 'does not create global variable')
    });

});
