import { spider } from '../helpers/utilities.js'
import { mergeOverlap } from './contracts.js'

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

        switch (type) {
            case 'Merge Overlapping Intervals': {
                const data = ns.codingcontract.getData(contract, host);

                const answer = mergeOverlap(data);

                ns.tprint("Attempting Contract")
                const result = ns.codingcontract.attempt(answer, contract, host);
                ns.tprint(`Contract Result ${result}`)
                break;
            }
        }
    })
}