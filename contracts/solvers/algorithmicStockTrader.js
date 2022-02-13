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

    for (let buy = 0; buy < data.length - 1; buy++) {
        for (let sell = buy + 1; sell < data.length; sell++) {
            profit = Math.max(profit, 0 - data[buy] + data[sell]);
        }
    }

    return profit;
}

/**
 * You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

 93,72,179,191,91,54,192,96,142

 Determine the maximum possible profit you can earn using as many transactions as you'd like. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

 If no profit can be made, then the answer should be 0
 * @param {NS} ns 
 * @param {Array number} data 
 */
export function algorithmicStockTrader2(ns, data) {
    let profits = [];

    let buyingPosition = null;
    let sellingPosition = null;
    let previous = data[0];

    data.forEach(d => {
        if (buyingPosition === null) {
            // No lower bound found yet, set it now
            ns.tprint(`Starting Buying Position ${d}`)
            buyingPosition = d;
        } else {
            if (sellingPosition === null) {
                // No upper bound yet, have we found the floor yet?
                if (d < buyingPosition) {
                    ns.tprint(`New Buying Position ${d}`)
                    // New floor, new buying position
                    buyingPosition = d;
                } else {
                    ns.tprint(`Candidate Selling Position ${d}`)
                    // Candidate selling position
                    sellingPosition = d;
                }
            } else {
                if (d < sellingPosition) {
                    // Should have sold them yesterday
                    ns.tprint(`Buy/Sell Window Found ${buyingPosition} -> ${sellingPosition}`);
                    profits.push(sellingPosition - buyingPosition);
                    buyingPosition = d;
                    sellingPosition = null;
                } else {
                    ns.tprint(`New Selling Position ${d}`)
                    sellingPosition = d;
                }
            }
        }

        previous = d;
    });

    if (sellingPosition !== null && buyingPosition !== null) {
        ns.tprint(`Buy/Sell Window Found ${buyingPosition} -> ${sellingPosition}`);
        profits.push(sellingPosition - buyingPosition);
    } else {
        ns.tprint(`Unterminated Window ${buyingPosition} -> ${sellingPosition}`);
    }

    return profits.reduce((acc, curr) => acc + curr, 0);
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
export function algorithmicStockTrader3(ns, data) {
    const evaluate = (buy1, sell1, buy2, sell2) => 0 - data[buy1] + data[sell1] - data[buy2] + data[sell2];

    let whensBest = {};
    let profit = 0;

    // Brute force all the combinations
    for (let sell2 = 3; sell2 < data.length; sell2++) {
        for (let buy2 = 2; buy2 <= sell2; buy2++) {
            for (let sell1 = 1; sell1 <= buy2; sell1++) {
                for (let buy1 = 0; buy1 < sell1; buy1++) {
                    const thisProfit = evaluate(buy1, sell1, buy2, sell2);
                    if (thisProfit > profit) {
                        whensBest = { buy1, sell1, buy2, sell2 }
                        profit = thisProfit;
                    }
                }
            }
        }
    }

    const { buy1, sell1, buy2, sell2 } = whensBest;
    ns.tprint(`Best Days to Buy/Sell Buy: ${buy1}, Sell ${sell1}, Buy ${buy2}, Sell: ${sell2}`)

    return profit;
}