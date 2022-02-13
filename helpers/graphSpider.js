import Graph from "/dataStructures/graph";

/** 
 * Recursive function for finding as many hosts as possible
 * @param {NS} ns 
 * @param {string} Host
 * @param {Graph} graph
 * @param {servers} a list of servers
 * **/
export function graphSpider(ns, host, graph, maxDepth = 1) {
    if (maxDepth === 0) return;

    const neighbours = ns.scan(host);

    neighbours.forEach(neighbour => {
        graph.addLink(host, neighbour);

        if (!graph.nodeVisited(neighbour)) {
            graph.visitingNode(neighbour);
            graphSpider(ns, neighbour, graph, maxDepth - 1);
        }
    })
}

/** @param {NS} ns **/
export async function main(ns) {
    const maxDepth = ns.args[0] || 4;
    const thisHost = ns.getHostname();
    const graph = new Graph();
    ns.tprint(`Spidering Servers from ${thisHost} with max depth: ${maxDepth}`)
    graphSpider(ns, thisHost, graph, maxDepth);

    ns.tprint("Found Servers\n\t" + graph.visitedNodes.join('\n\t'));
}