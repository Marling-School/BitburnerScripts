/**
 * Finds all the prime numbers up to the value given.
 * Uses something like Sieve of Eratosthenes
 * @param {NS} ns
 * @param {number} max
 * @returns {number[]} List of prime numbers
 */
export function getPrimes(ns, max) {
	const primeNumbers = [];

	for (let i = 2; i < max; i++) {
		const isPrime = primeNumbers.find(p => i % p === 0) === undefined;
		if (isPrime) {
			primeNumbers.push(i);
		}
	}

	return primeNumbers;
}

/**
 * Finds the largest prime factor of the given number.
 * @param {NS} ns
 * @param {number} data
 */
export function findLargestPrimeFactor(ns, data) {
	const largestPossible = Math.floor(Math.sqrt(data));
	const primeNumbers = getPrimes(ns, largestPossible);
	const primeFactors = [];

	while (data > 1) {
		const nextFactor = primeNumbers.find(p => data % p === 0);
		if (nextFactor !== undefined) {
			primeFactors.push(nextFactor);
			data /= nextFactor;
		} else {
			// We have hit bedrock
			primeFactors.push(data);
			break;
		}
	}

	return Math.max(...primeFactors);
}

/**
 * Given a list of stock prices.
 * Find the most profit that could be made with a single buy/sell.
 * The purchase must occur before the sale.
 * @param {number[]} The prices
 * @return {number} The max profit
 */
export function algorithmicStockTrader1(data) {
	let profit = 0;

	for (let i = 0; i < data.length; i++) {
		for (let j = i; j < data.length; j++) {
			profit = Math.max(profit, data[j] - data[i]);
		}
	}

	return profit;
}

/**
 * Solves the coding contract for finding overlapping
 * intervals and merging them into a new list.
 * 
 * @param data, an array of 2-item arrays
 * @returns merged, a new array of 2-item arrays
 */
export function mergeOverlap(data) {
	// Sort the items by their 'starting' position
	data.sort(([a], [b]) => a - b)

	// Compose an answer
	const answer = [];

	// Push the first interval on
	answer.push([...data[0]]);
	let i = 1;

	while (i < data.length) {
		// Iterate through each input item
		let nextData = data[i];

		// What is the last interval we added to the result?
		let lastAnswer = answer[answer.length - 1];

		if (nextData[0] <= lastAnswer[1]) {
			// This next interval overlaps
			if (lastAnswer[1] < nextData[1]) {
				// ...and it's endpoint is higher
				lastAnswer[1] = nextData[1];
			}
		} else {
			// This new interval does not overlap
			answer.push([...nextData]);
		}

		i++;
	}

	return answer;
}

const contractSolvers = {
	'Merge Overlapping Intervals': mergeOverlap,
	'Algorithmic Stock Trader I': algorithmicStockTrader1,
	'Find Largest Prime Factor': findLargestPrimeFactor
}

export default contractSolvers;