/**
 * Given a list of stock prices.
 * Find the most profit that could be made with a single buy/sell.
 * The purchase must occur before the sale.
 * 
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