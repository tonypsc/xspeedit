/**
 * Creates optimized package list, using a greedy algorithm
 * @param {string} inputArray
 * @param {number} boxsize
 * @returns {string} slash delimited string one for each box
 */
function packageOptimized(inputLine, boxsize) {
  // convert input string to a reverse ordered integer array
  // order affects result
  inputArray = inputLine
    .split("")
    .map((el) => parseInt(el))
    .sort((a, b) => b - a);

  let result = "";

  // go throw all the elements in array
  while (inputArray.length > 0) {
    let sizeFilled = inputArray[0]; // set box filled size to the array element
    result += inputArray[0];
    inputArray.splice(0, 1); // delete element from array

    let j = 0;
    // go throw the elements left in the array
    while (j < inputArray.length) {
      // compare filled size + element size with the size of the box (10)
      if (sizeFilled + inputArray[j] <= boxsize) {
        // less or equals  box size, fits in the box
        sizeFilled += inputArray[j]; // recalculate filled size
        result += inputArray[j]; // add element to result
        inputArray.splice(j, 1); // delete element from array
        if (sizeFilled === 10) break; // if box is full, break inner while, for performance sake
      } else {
        //exceeds box size, increment counter
        j++;
      }
    }

    result += "/"; // add slash at the end of each box
  }

  return result.substring(0, result.length - 1); // removes unnecesary ending slash
}

/**
 * Creates package list, with no optimization
 * @param {string} inputArray
 * @param {number} boxsize
 * @returns {string} slash delimited string one for each box
 */
function package(inputLine, boxsize) {
  // convert input string to a reverse ordered integer array
  inputArray = inputLine.split("").map((el) => parseInt(el));

  let result = "";
  let filledSize = 0;

  // go throw all the elements in array
  while (inputArray.length > 0) {
    // filled size + element size exceeds box size
    if (filledSize + inputArray[0] > boxsize) {
      filledSize = 0; // reset box filled size
      result += "/";
    }

    // filled size + element fits in the box
    if (filledSize + inputArray[0] <= boxsize) {
      filledSize += inputArray[0]; // update new filled size
      result += inputArray[0]; // update result
      inputArray.splice(0, 1); // delete array element
    }
  }

  return result;
}

const inputString = "163841689525773";
const BOXSIZE = 10;
const packaged = package(inputString, BOXSIZE);
const optimized = packageOptimized(inputString, BOXSIZE);

console.log("original:", inputString);
console.log("---------------");
console.log("packaged:", packaged);
console.log("boxes:", packaged.split("/").length);
console.log("---------------");
console.log("optimized:", optimized);
console.log("boxes:", optimized.split("/").length);
