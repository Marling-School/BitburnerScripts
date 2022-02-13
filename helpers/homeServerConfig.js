import { thread_calc } from 'helpers/thread-calc.js';
/** @param {NS} ns **/
export async function main(ns) {
	const nwoLvl = ns.getServerRequiredHackingLevel('nwo')
	const target = (ns.getHackingLevel() < nwoLvl ? "joesguns" : "nwo");
	//Depending on target, set scriptlist to push to purchased servers.
	const scriptList = [`${target}-grow.js`, `${target}-weaken.js`];
	let scriptRam = new Array();
	//Get ram usage of each script in our scriptlist. Used later to get thread amount.
	for (let i = 0; i < scriptList.length; i++) {
		let servRam = ns.getScriptRam(scriptList[i], "home");
		scriptRam.push(servRam);
	}
	const serversPurchased = ns.getPurchasedServers();

	for (let j = 0; j < (serversPurchased.length); ++j) {
		let servName = serversPurchased[j];
		let servRam = ns.getServerMaxRam(servName);
		ns.killall(servName);

		await ns.scp(scriptList, "home", servName);
		if (j % 10 === 0) {
			ns.exec(scriptList[1], servName, await thread_calc(ns, servRam, scriptRam[1], 80));
			ns.exec(scriptList[0], servName, await thread_calc(ns, servRam, scriptRam[0], 20));
		} else {
			ns.exec(scriptList[0], servName, await thread_calc(ns, servRam, scriptRam[0], 80));
			ns.exec(scriptList[1], servName, await thread_calc(ns, servRam, scriptRam[1], 20));
		}
	}
	ns.toast("Home server reconfiguration: Complete","success",2000)
}