/*MIT License
numero_to_word
Copyright (c) 2022 Richard Jesus Aguirre Perez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
import {
    NumeroALetras,
    setSingular,
    setPlural,
    getSingular,
    setCentsPlural,
    setCentsSingular
} from './numero_to_word/index.js';

//craate module with static class named numero_to_word with export default NumeroALetras



var numero_to_word = function (num = null) {
    var _value = null;
    //void principal
    let data = NumeroALetras(num).trim();
    _value = data;
    //chain voids
    return {

        FemaleValue: function () {
            if (_value == 'UN '+ getSingular())
                _value = 'UNA ' + getSingular();
            return this;
        },
        Capitalize: function () {

            _value = capitalizeFirstLetter(_value);;
            return this;
        },
        Config: {
            _setSingular: function (singular) {
                setSingular(singular);
            },
            _setPlural: function (plural) {
                setPlural(plural);
            },
            _setCentsSingular: function (singular) {
                setCentsSingular(singular);
            },
            _setCentsPlural: function (plural) {
                setCentsPlural(plural);
            }
        },
        clearConfig: function () {
            setSingular('');
            setPlural('');
            setCentsSingular('');
            setCentsPlural('');
        },
        toString: function () { //resulted 

            return Sanitizer(_value);
        }


    }
}


function Sanitizer(value) {
    return value.replace('  ', ' ');
}


function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default numero_to_word;