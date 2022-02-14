import { graphSpider } from '/helpers/graphSpider.js'
import Graph from '/dataStructures/graph'

/** 
 * Given a host, it attempts to root it and open a backdoor.
 * 
 * @param {string} host
 * @param {NS} ns 
 * **/
function crackOpen(ns, host) {
    ns.print(`Attempting to Crack Open Host ${host}`)

    if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(host)) {
        ns.print(`Cannot hack ${host}, hacking level too low`)
    }

    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(host);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(host);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(host);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(host);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(host);
    }
    try {
        ns.nuke(host);
        ns.tprint(`Gained Root Access to ${host}`)
    }
    catch (err) {
        ns.tprint(`Nuke.exe unsuccessful on ${host}`);
        ns.print("Nuke.exe unsuccessful.");
    }
    /* Delete ln 33 if you {
        a: You do not have Source-File 4
        2: You do not have a minimum on 1TB ram.
        */
    // const ramLeft = ns.getServerMaxRam() - ns.getServerUsedRam();
    // if (ramLeft > 1000000000000) {
    // 	ns.print("Enough RAM to install backdoor")
    // 	//await ns.installBackdoor(host);
    // }
}

/** @param {NS} ns **/
export async function main(ns) {
    const graph = new Graph();
    graphSpider(ns, ns.getHostname(), graph, 10);
    graph.visitedNodes.forEach(host => crackOpen(ns, host));
}