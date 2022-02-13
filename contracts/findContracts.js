import { spider } from '../helpers/utilities.js'
import contractSolvers from './contractSolvers.js'

/** @param {NS} ns **/
export async function main(ns) {
    const hosts = [];
    const contracts = [];

    spider(ns, ns.getHostname(), hosts, 7);
    for (let i = 0; i < hosts.length; i++) {
        const host = hosts[i];
        const hostContracts = ns.ls(host, '.cct');
        for (let j = 0; j < hostContracts.length; j++) {
            const contract = hostContracts[j];
            const type = ns.codingcontract.getContractType(contract, host);
            contracts.push({ type, host, contract })
        }
    }

    contracts.forEach(({ type, host, contract }) => {
        ns.tprint(`Found ${type} in ${contract} on ${host}`);

        const solver = contractSolvers[type];
        if (!!solver) {
            ns.tprint("Solver Found");
            const data = ns.codingcontract.getData(contract, host);
            const answer = solver(data);

            ns.tprint("Attempting Contract")
            const result = ns.codingcontract.attempt(answer, contract, host);
            ns.tprint(`Contract Result ${result}`)
        } else {
            ns.tprint("No solution for contract type");
        }
    })
}