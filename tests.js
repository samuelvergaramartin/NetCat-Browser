const RAM = require('./src/backend/nodejs/socket/core/RAM/RAM');
RAM.set("algo", "valor");
RAM.set("test", "valor2");
let map = RAM.toString();

let it, key, value, array;
it = map.values();
it = map.entries();

for(let i = 0; i < map.size; i++) {
    array = it.next().value;
    key = array[0];
    value = array[1];
    console.log(key);
    console.log(value);
}