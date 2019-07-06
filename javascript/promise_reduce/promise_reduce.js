/**
 * Analog of the 'reduce' function for an array of asynchronous functions
 *
 * @param  {Array}     asyncFunction  array of Promises
 * @param  {Function}  reduce         reduce-like function with two arguments
 *                                    and returns new value.
 *                                    example:
 *                                       const fn = (memo, value) => memo + value;
 * @param  {*}         initialValue   value for the first run 'reduce' function
 * @return {*}                        the result of all calls 'reduce'
 */
async function promiseReduce(asyncFunctions, reduce, initialValue) {
  let buff = initialValue;
  for (let i = 0; i < asyncFunctions.length; i++) {
      buff = reduce(buff, await asyncFunctions[i]());
  }
  return buff;
}

