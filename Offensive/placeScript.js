import { graphSpider } from '/helpers/graphSpider.js'
import Graph from '/dataStructures/graph';

/**
 * A function that attempts to place a script on all servers it can find.
 * 
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} script
 */

/** @param {NS} ns **/
export async function main(ns) {
    const scriptFile = ns.args[0];
    const graph = new Graph();
    graphSpider(ns, ns.getHostname(), graph, 7);

    for (let i = 0; i < graph.visitedNodes.length; i++) {
        const host = graph.visitedNodes[i];
        if (ns.hasRootAccess(host) && ns.getServerRequiredHackingLevel(host) < ns.getHackingLevel()) {
            await ns.scp(scriptFile, host);
            ns.exec(scriptFile, host, 1, host);
        } else {
            ns.print(`${host} does not have root access`)
        }
    }
}