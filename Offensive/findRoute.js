import { graphSpider } from '/helpers/graphSpider.js'
import Graph from '/dataStructures/graph';

/** @param {NS} ns **/
export async function main(ns) {
    const depth = ns.args.length > 0 ? parseInt(ns.args[0]) : 10;
    const graph = new Graph();
    graphSpider(ns, ns.getHostname(), graph, depth);
}