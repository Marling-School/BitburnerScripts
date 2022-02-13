import { algorithmicStockTrader1 } from "./algorithmicStockTrader";
import { findLargestPrimeFactor } from "./findLargestPrimeFactor";
import { mergeOverlap } from "./mergeOverlap";
import { sanitiseParenthesis } from "./sanitiseParenthesis";

const contractSolvers = {
	'Merge Overlapping Intervals': mergeOverlap,
	'Algorithmic Stock Trader I': algorithmicStockTrader1,
	'Find Largest Prime Factor': findLargestPrimeFactor,
	'Sanitize Parentheses in Expression': sanitiseParenthesis
}

export default contractSolvers;