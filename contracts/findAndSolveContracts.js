import { graphSpider } from '/helpers/graphSpider'
import solvers from '/contracts/solvers/index.js'
import Graph from '/dataStructures/graph.js';

/** @param {NS} ns **/
export async function main(ns) {
    const graph = new Graph();
    const contracts = [];

    graphSpider(ns, ns.getHostname(), graph, 7);
    for (let i = 0; i < graph.visitedNodes.length; i++) {
        const host = graph.visitedNodes[i];
        const hostContracts = ns.ls(host, '.cct');
        for (let j = 0; j < hostContracts.length; j++) {
            const contract = hostContracts[j];
            const type = ns.codingcontract.getContractType(contract, host);
            contracts.push({ type, host, contract })
        }
    }

    contracts.forEach(({ type, host, contract }) => {
        ns.tprint(`Found ${type} in ${contract} on ${host}`);

        const solver = solvers[type];
        if (!!solver) {
            ns.tprint("Solver Found");
            const data = ns.codingcontract.getData(contract, host);
            const answer = solver(ns, data);
            const result = ns.codingcontract.attempt(answer, contract, host);
            ns.tprint(`Contract Attempted with Result ${result}`)
        } else {
            ns.tprint("No solution for contract type");
        }
    })
}