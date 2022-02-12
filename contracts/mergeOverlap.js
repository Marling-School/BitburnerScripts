/**
 * Solves the coding contract for finding overlapping
 * intervals and merging them into a new list.
 * 
 * @param data, an array of 2-item arrays
 * @returns merged, a new array of 2-item arrays
 */
function mergeOverlap(data) {
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

/** @param {NS} ns **/
export async function main(ns) {
    const filename = ns.args[0];
    const host = ns.args[1];
    const data = ns.codingcontract.getData(filename, host);

    const answer = mergeOverlap(data);

    ns.tprint("Attempting Contract")
    const result = ns.codingcontract.attempt(answer, filename, host);
    ns.tprint("Result " + result);
    ns.tprint(data);
    ns.tprint(answer);
}