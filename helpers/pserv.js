import { thread_calc } from 'helpers/thread-calc.js';
import {ratiogen } from 'helpers/ratiogen.js';

/** @param {NS} ns **/
export async function main(ns) {
	const nwoLvl = ns.getServerRequiredHackingLevel('nwo');
	//Check to hacking level of nwo. If our level is too low to attack, set target to joesguns.
	const target = (ns.getHackingLevel() < nwoLvl ? "joesguns" : "nwo");
	//Depending on target, set scriptlist to push to purchased servers.
	const scriptList = [`${target}-grow.js`, `${target}-weaken.js`];
	let scriptRam = new Array();
	//Get ram usage of each script in our scriptlist. Used later to get thread amount.
	for (let j = 0; j < scriptList.length; j++) {
		let servRam = ns.getScriptRam(scriptList[j], "home");
		scriptRam.push(servRam);
	}

	//const ram = 1048576128/64;
	const ram = 64;

	

	// Iterator we'll use for our loop
	let i = 0;

	// Continuously try to purchase servers until we've reached the maximum
	// amount of servers
	while (i < ns.getPurchasedServerLimit()) {
		// Check if we have enough money to purchase a server
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

			let servName = ns.purchaseServer("pserv-" + i, ram);
			await ns.scp(scriptList, "home", servName);
			if (i % 10 === 0) {
				ns.exec(scriptList[1], servName, await thread_calc(ns,ram, scriptRam[1], 80));
				ns.exec(scriptList[0], servName, await thread_calc(ns,ram, scriptRam[0], 20));
			} else {
				ns.exec(scriptList[0], servName, await thread_calc(ns,ram, scriptRam[0], 80));
				ns.exec(scriptList[1], servName, await thread_calc(ns,ram, scriptRam[1], 20));
			}

			++i;

		}
		await ns.sleep(10000);
	}


	ns.toast("Home servers purchased","success",2000)
	ns.kill("pserv.js", "home");

}