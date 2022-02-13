import {
	algorithmicStockTrader1,
	algorithmicStockTrader2,
	algorithmicStockTrader3
} from "/contracts/solvers/algorithmicStockTrader";
import { findLargestPrimeFactor } from "/contracts/solvers/findLargestPrimeFactor";
import { mergeOverlap } from "/contracts/solvers/mergeOverlap";
import { sanitiseParenthesis } from "/contracts/solvers/sanitiseParenthesis";
import { subArrayWithMaxSum } from "/contracts/solvers/subArrayWithMaxSum";

const contractSolvers = {
	'Merge Overlapping Intervals': mergeOverlap,
	'Algorithmic Stock Trader I': algorithmicStockTrader1,
	'Algorithmic Stock Trader II': algorithmicStockTrader2,
	'Algorithmic Stock Trader III': algorithmicStockTrader3,
	'Find Largest Prime Factor': findLargestPrimeFactor,
	'Sanitize Parentheses in Expression': sanitiseParenthesis,
	'Subarray with Maximum Sum': subArrayWithMaxSum
}

export default contractSolvers;