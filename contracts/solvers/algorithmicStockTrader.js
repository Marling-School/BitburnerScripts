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
 * You are given the following array of stock prices (which are numbers) 
 * where the i-th element represents the stock price on day i:

 43,64,3,143,10,32,139,47,91,1,185,52,131,53,199,179

 Determine the maximum possible profit you can earn using at most two transactions. 
 A transaction is defined as buying and then selling one share of the stock. 
 Note that you cannot engage in multiple transactions at once. 
 In other words, you must sell the stock before you buy it again.

 If no profit can be made, then the answer should be 0

 * @param {NS} ns 
 * @param {Array number} data 
 * @returns The profit
 */
export function algorithmicStockTrader2(ns, data) {

    return 1;
}

export function algorithmicStockTrader3(ns, data) {

    return 1;
}