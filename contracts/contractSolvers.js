
/**
 * Recursively finds all the possible combinations of the given inputs.
 * 
 * @param {array} inputs 
 * @param {number} lengthOutput 
 * @returns The possible combinations at the given length.
 */
export function getCombinations(inputs, lengthOutput) {
	if (lengthOutput === 0) {
		return []
	}

	if (lengthOutput === 1) {
		return inputs.map(i => [i]);
	}

	const results = [];
	inputs.forEach(input => {
		getCombinations(inputs.filter(i => i !== input), lengthOutput - 1)
			.forEach(c => {
				results.push([
					input,
					...c
				])
			});
	});

	return results;
}

/**
 * Given a list, removes duplicates.
 * 
 * @param {list} theList 
 * @returns A version of the list with the duplicates removed.
 */
export function deduplicateList(theList, comparator = (a, b) => a === b) {
	return theList.filter((a, index) => index === theList.findIndex(b => comparator(a, b)));
}

/**
 * Returns a string with the letters at the given indices removed.
 * 
 * @param {string} data 
 * @param {number[]} indexesToRemove 
 * @returns 
 */
export function getCutString(data, indexesToRemove) {
	return data
		.split("")
		.filter((c, i) => !indexesToRemove.includes(i))
		.join("");
}

/**
 * Given the following string:
	(()(()(())))))(a

	remove the minimum number of invalid parentheses in order to validate the string. If there are multiple minimal ways to validate the string, provide all of the possible results. The answer should be provided as an array of strings. If it is impossible to validate the string the result should be an array with only an empty string.

	IMPORTANT: The string may contain letters, not just parentheses. Examples:
	"()())()" -> [()()(), (())() ]
	"(a)())()" -> [(a)()(), (a())()]
	")( -> [""]
 * @param {*} data 
 * @returns 
 */
export function sanitiseParenthesis(ns, data) {
	let validWays = [];

	const bracketIndexes = data
		.split("")
		.map((s, i) => ({ s, i }))
		.filter(({ s }) => ALL_BRACKETS.includes(s))
		.map(({ i }) => i);

	let i = 0;
	while (i < data.length && validWays.length === 0) {
		validWays = getCombinations(bracketIndexes, i)
			.map(combination => getCutString(data, combination))
			.filter(o => isParenthesisValid(o));
		i++;
	}

	return deduplicateList(validWays);
}

const BRACKET_TYPES = [
	{
		opening: '(',
		closing: ')'
	}, {
		opening: '{',
		closing: '}'
	}, {
		opening: '[',
		closing: ']'
	}
]
const ALL_BRACKETS = BRACKET_TYPES.reduce((acc, curr) => `${acc}${curr.opening}${curr.closing}`, "");
const NO_MATCH = -1;

/**
 * Determines if a string has valid pairs of brackets.
 * 
 * @param {string} data 
 * @returns {boolean} If the given data has valid paired brackets
 */
export function isParenthesisValid(data) {
	let errorFound = false;
	const bracketQueue = [];
	data.split("").forEach(d => {
		const openingIndex = BRACKET_TYPES.findIndex(p => p.opening === d);
		const closingIndex = BRACKET_TYPES.findIndex(p => p.closing === d);
		if (openingIndex !== NO_MATCH) {
			bracketQueue.push(openingIndex)
		} else if (closingIndex !== NO_MATCH) {
			if (bracketQueue.length === 0) {
				errorFound = true;
			} else if (bracketQueue[bracketQueue.length - 1] !== closingIndex) {
				errorFound = true;
			} else {
				bracketQueue.pop();
			}
		}
	})

	if (bracketQueue.length !== 0) {
		errorFound = true;
	}

	return !errorFound;
}

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
 * 
 * @param {NS} ns
 * @param {number[]} The prices
 * @return {number} The max profit
 */
export function algorithmicStockTrader1(ns, data) {
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
 * @param {NS} ns
 * @param data, an array of 2-item arrays
 * @returns merged, a new array of 2-item arrays
 */
export function mergeOverlap(ns, data) {
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
	'Find Largest Prime Factor': findLargestPrimeFactor,
	'Sanitize Parentheses in Expression': sanitiseParenthesis
}

export default contractSolvers;