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
    const depth = ns.args.length > 1 ? parseInt(ns.args[1]) : 10;
    const graph = new Graph();
    graphSpider(ns, ns.getHostname(), graph, depth);

    const isValidTarget = host => host !== "home" &&
        ns.hasRootAccess(host) &&
        ns.getServerRequiredHackingLevel(host) < ns.getHackingLevel();

    for (let i = 0; i < graph.visitedNodes.length; i++) {
        const host = graph.visitedNodes[i];
        if (isValidTarget(host)) {
            await ns.scp(scriptFile, host);
            const neighbours = graph.getNeighbours(host);
            for (let j = 0; j < neighbours.length; j++) {
                const neighbour = neighbours[j];
                if (isValidTarget(neighbour)) {
                    ns.exec(scriptFile, host, 1, neighbour);
                }
            }
            ns.exec(scriptFile, host, 1, host);
        } else {
            ns.print(`${host} does not have root access`)
        }
    }
}