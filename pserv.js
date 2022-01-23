import { thread_calc } from '/helpers/thread-calc.script';

/** @param {NS} ns **/
export async function main(ns) {
	let scriptlist = ["jg-grow.js", "jg-weaken.js", "early-hack-template.script", "/test/share.js"];
	let scriptram = new Array();
	for (var j = 0; j < scriptlist.length; j++) {
		var servram = ns.getScriptRam(scriptlist[j], "home");
		scriptram.push(servram);
	}

	//const ram = 1048576;
	const ram = 2048;

	//const serv10r = Math.floor(ram * 0.10)
	// Iterator we'll use for our loop
	let i = 0;

	// Continuously try to purchase servers until we've reached the maximum
	// amount of servers
	while (i < ns.getPurchasedServerLimit()) {
		// Check if we have enough money to purchase a server
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

			let servname = ns.purchaseServer("pserv-" + i, ram);
			await ns.scp(scriptlist, "home", servname);
			if (i % 10 === 0) {
				ns.exec(scriptlist[1], servname, thread_calc(ram, scriptram[1], 60));
			} else {
				ns.exec(scriptlist[0], servname, thread_calc(ram, scriptram[0], 60));
			}
			ns.exec(scriptlist[2], servname, thread_calc(ram, scriptram[2], 20));
			ns.exec(scriptlist[2], servname, thread_calc(ram, scriptram[2], 15));

			++i;

		}
		await ns.sleep(1000);
	}



	ns.tprint("Home Servers Purchased.");
	ns.kill("pserv.js", "home");

}