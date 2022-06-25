var _= require("underscore");
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) { //Función que lee el archivo.
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/); //Separa el archivo texto por fila.
  return arr;
}
