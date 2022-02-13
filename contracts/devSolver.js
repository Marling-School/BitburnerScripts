import solvers from '/contracts/solvers/index.js'

/** @param {NS} ns **/
export async function main(ns) {
    const contract = ns.args[0];
    const host = ns.args[1];
    const shouldAttempt = ns.args[2];

    const type = ns.codingcontract.getContractType(contract, host);
    const data = ns.codingcontract.getData(contract, host);

    const solver = solvers[type];
    if (!!solver) {
        ns.tprint("Solver Found");

        ns.tprint(ns.codingcontract.getContractType(contract, host));
        ns.tprint(ns.codingcontract.getDescription(contract, host));
        ns.tprint(data);
        const answer = solver(ns, data);
        ns.tprint(`Answer ${answer}`);

        if (shouldAttempt !== undefined) {
            ns.tprint("Submitting the Answer")
            const result = ns.codingcontract.attempt(answer, contract, host);
            ns.tprint("Result was " + result);
        }
    } else {
        ns.tprint("No solver even exists for this type")
    }
}