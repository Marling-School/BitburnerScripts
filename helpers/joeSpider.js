
/** 
 * Recursive function for finding as many hosts as possible
 * @param {NS} ns 
 * @param {string} Host
 * @param {servers} a list of servers
 * **/
function spider(ns, host, servers, maxDepth = 1) {
    if (maxDepth === 0) return;

    const neighbours = ns.scan(host);

    neighbours.forEach(neighbour => {
        if (!servers.includes(neighbour)) {
            servers.push(neighbour);
            spider(ns, neighbour, servers, maxDepth - 1);
        }
    })
}

/** @param {NS} ns **/
export async function main(ns) {
    const maxDepth = ns.args[0] || 4;
    const thisHost = ns.getHostname();
    const servers = [];
    ns.tprint(`Spidering Servers from ${thisHost} with max depth: ${maxDepth}`)
    spider(ns, thisHost, servers, maxDepth);

    ns.tprint("Found Servers\n\t" + servers.join('\n\t'));
}