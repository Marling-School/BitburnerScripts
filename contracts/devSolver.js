import { algorithmicStockTrader2 as underTest } from '/contracts/solvers/algorithmicStockTrader';

/** @param {NS} ns **/
export async function main(ns) {
    const contract = ns.args[0];
    const host = ns.args[1];
    const shouldAttempt = ns.args[2];

    const data = ns.codingcontract.getData(contract, host);

    ns.tprint(ns.codingcontract.getContractType(contract, host));
    ns.tprint(ns.codingcontract.getDescription(contract, host));
    ns.tprint(data);
    const answer = underTest(ns, data);
    ns.tprint(`Answer ${answer}`);

    if (shouldAttempt !== undefined) {
        ns.tprint("Submitting the Answer")
        const result = ns.codingcontract.attempt(answer, contract, host);
        ns.tprint("Result was " + result);
    }
}