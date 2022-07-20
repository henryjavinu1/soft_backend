import numero_to_word from '../index.js';
import numbers from '../index.js';

numbers().Config._setSingular('DOLAR');
numbers().Config._setPlural('DOLARES');
numbers().Config._setCentsSingular('CENTAVO');
numbers().Config._setCentsPlural('CENTAVOS');

//returns CIENTO VEINTITRES DOLARES CON CUATRO CENTAVOS
console.log(numbers(123.04).toString());


//returns Un millon quinientos mil cuatrocientos cincuenta dolares con cuatro centavos
console.log (numbers(1500450.04).Capitalize().toString());


//returns UN DOLAR CON CINCUENTA CENTAVOS
console.log(numbers(1.5).toString());




numbers().Config._setSingular('vez al día');
numbers().Config._setPlural('veces al día');
//Configuración veces 
//returns Una vez al día
console.log(numbers(1).FemaleValue().Capitalize().toString());



numbers().Config._setSingular('hora al día');
numbers().Config._setPlural('horas al día');
//Configuración horas
//returns Veinticuatro horas al día
console.log(numbers(24).Capitalize().toString());







