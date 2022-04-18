(function (){
    const aluraKeys = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat',
    };

    function cipher(str, dict) {
        const regex = new RegExp(Object.keys(dict).join('|'), 'gi');
        return str.replace(regex, (match) => dict[match]);
    }

    function decipher(str, dict){
        const regex = new RegExp(Object.values(dict).join('|'), 'gi');
        return str.replace(regex, (match) => Object.keys(dict).find(key => dict[key] === match));
    }

    function classManagerOutput(toRemove, toAdd, className){
        toRemove.classList.remove(className);
        toAdd.classList.add(className);
    }

    function ButtonManager(state){
        const xButtons = document.querySelectorAll('.input-text-btns div button');
        if(state === 'add'){
            xButtons.forEach(button => button.setAttribute('disabled', true));
        }else if(state === 'remove'){
            xButtons.forEach(button => button.removeAttribute('disabled'));
        }
    }

    function validateText(e){
        const regex = new RegExp('[A-ZÀ-ú]', 'g');
        if(regex.test(e.target.value)){
            ButtonManager('add');
        }
        else{
            ButtonManager('remove');
        }
    }

    function cleanTextArea(element){
        element.value = '';
    }

    window.onload = () => {
        //DOM

        //Buttons
        const cryptBtn = document.getElementById('crypt-btn');
        const decryptBtn = document.getElementById('decrypt-btn');
        const copyBtn = document.getElementById('copy-btn');
        //Text Areas
        const textToManipulate = document.getElementById('text-to-manipulate');
        const outputText = document.getElementById('output-text');
        //
        const text = document.getElementById('text');
        const noText = document.getElementById('no-text');

        //Events

        textToManipulate.addEventListener('input', validateText);
        textToManipulate.addEventListener('paste', validateText);

        cryptBtn.addEventListener('click', () => {
            if(textToManipulate.value.length > 0){
                let result = cipher(textToManipulate.value, aluraKeys);
                classManagerOutput(text, noText, 'hidden');
                outputText.value = result;
                cleanTextArea(textToManipulate);
            }
        });

        decryptBtn.addEventListener('click', () => {
            if(textToManipulate.value.length > 0){
                let result = decipher(textToManipulate.value, aluraKeys);
                classManagerOutput(text, noText, 'hidden');
                outputText.value = result;
                cleanTextArea(textToManipulate);
            }
        });

        copyBtn.addEventListener('click', () => {
            outputText.select();
            document.execCommand('copy');
        });
    }
})()