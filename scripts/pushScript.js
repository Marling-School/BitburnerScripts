import {ratioGen, threadCalc, spider } from 'utils.js'
/** @param {NS} ns **/
export async function main(ns) {
	const serverListRaw = await spider(ns);
	const firstArgs = ns.args[0];
	switch (firstArgs) {
		case "help":
			help(ns);
			break;
		case "purchased":
		case "-p":
		case "p":
			await homeServers(ns, serverListRaw);
			break;
		case "internal":
		case "-i":
		case "i":
			await internalServers(ns, serverListRaw);
			break;
		case "external":
		case "-e":
		case "e":
			await externalServers(ns, serverListRaw);
			break;
		case "hacknet":
		case "-h":
		case "h":
			await hackServers(ns, serverListRaw);
			break;
		case "all":
		case "-a":
		case "a":
			await allServers(ns, serverListRaw);
			break;
		default:
			help(ns)
	}
}

async function hackServers(ns, servers) {
	let serverList = servers.filter(s => s.includes("hacknet-node"))
	await push(ns, serverList)
}

async function homeServers(ns, servers) {
	let serverList = servers.filter(s => s.includes("pserv-"))
	await push(ns, serverList)
}

async function internalServers(ns, servers) {
	let serverList = servers.filter(s => s.includes("pserv-") && s.includes("hacknet-node-"))
	await push(ns, serverList)
}

async function externalServers(ns, servers) {
	let serverList = servers.filter(s => s != "home" && !s.includes("hacknet-node-") && !s.includes("pserv-") && ns.hasRootAccess(s))
	await push(ns, serverList)
}

async function allServers(ns, servers) {
	let serverList = servers.filter(s => s != "home" && ns.hasRootAccess(s))
	await push(ns, serverList)
}

function help(ns) {
	ns.tprint("----------------------------------")
	ns.tprint("This script pushes set scripts to others servers.")
	ns.tprint("arguments you can use are:")
	ns.tprint("----------------------------------")
	ns.tprint("purchased: Pushes to your purchased servers only.")
	ns.tprint("external: Pushes to all external servers you have access to.")
	ns.tprint("internal: Pushes to all internal servers. Purchased and Hacknet (BN4)")
	ns.tprint("hacknet: Pushes scripts to hacknet servers only (BN4)")
	ns.tprint("all: Pushes to all servers, both internal and external.")
}
/** @param {NS} ns **/
async function push(ns, serverList) {
	//Depending on target, set scriptlist to push to purchased servers.
	const scriptList = ['grow.js', 'weaken.js'];
	for (let server in serverList) {
		ns.killall(serverList[server]);
		for (let script in scriptList) {
			let scriptRam = ns.getScriptRam(scriptList[script]);
			await ns.scp(scriptList[script], serverList[server]);
			ns.exec(scriptList[script], serverList[server], await threadCalc(ns.getServerMaxRam(serverList[server]), scriptRam, await ratioGen(scriptList.length)));
		}
	}

}