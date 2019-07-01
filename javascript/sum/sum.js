/**
 * Function of accumulate sum of passed parameters
 *
 * If function run with param -> value is added to current sum
 * If function run without any params -> return current sum
 */
function sum(a) {
  let currentSum = a;

  function f(b) {
    if (!arguments.length) {
      return currentSum;
    }
    currentSum += b;
    return f;
  }
  return f;
}
