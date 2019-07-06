/**
 * Function of accumulate sum of passed parameters
 *
 * If function run with param -> value is added to current sum
 * If function run without any params -> return current sum
 */
function sum(a) {
	let currentSum = a;
	let f = (...arg) => {
		if (!arg.length) {
			return currentSum;
		}
		currentSum += arg[0];
		return f;
	}
	return f;
}

