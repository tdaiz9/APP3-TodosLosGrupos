var _= require("underscore");
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) { //Función que lee el archivo.
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/); //Separa el archivo texto por fila.
  return arr;
}

function toNumber(array,i){ //Función que convierte una matriz (matriz de matrices en este caso) de strings en una de números.
  if(array[i]==null){} //Caso base. Si es nulo, se termina la función y retorna null.
  else {
    array[i]= array[i].map(Number); //Toma la primera fila y la convierte en números.
    toNumber(array,i+1); //Se hace lo mismo con la siguiente fila.
  }
  return array; //Retorna el array.
}

function splitrow(data,i) {//Función separa las filas. 
  if (data[i]==null){return}//Caso base. Si es nulo, se termina la función y retorna null.
  else{
    data[i]=data[i].split(" "); //Se separa las filas por espacio.
    splitrow(data,i+1); //Se hace lo mismo con la siguiente fila.
  }
  return toNumber(data,0); //Se retorna la matriz (se pasa de strings a números).
}

function findxy(array , x , y){ //Función que encuentra ciertas coordenadas. Se le da una matriz y dos números (x e y de una coordenada).
  if (!array){return null} //Caso base
  else { 
    return array.find(coordinate => coordinate[0]==y && coordinate[1]==x); //Se busca en la matriz de path (matriz de matrices, donde cada matriz dentro de esta contiene 2 valores, x e y). Retorna null si no se encuentran los valores en orden.
  }
}

function initxy(array, y){ //Función que busca las coordenas iniciales del laberinto (asumiendo que siempre se parte del lado izquierdo y que habrá un 0 en la primera fila).
  let init_path = [];

  if(array[y][0]==1){ //Si en la posición hay un 1, se avanza hacia abajo en la primera fila.
    return initxy(array,y+1);
  }
  else { //Si se encuentra un 0, se inserta en init_path y se termina la recursión.
    init_path.push([0,y]);
  }
  return init_path; //Se retornan las coordenadas iniciales.
}
