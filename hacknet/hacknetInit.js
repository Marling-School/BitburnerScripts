import { bitNodeCheck } from "helpers.js"
const BIT_NODE = 4
/** @param {NS} ns **/
export async function main(ns) {
	const nwoLvl = ns.getServerRequiredHackingLevel("nwo");
	// We will not buy anything if there's less money than this ammount. 
	const reserveMoney = 500000
	// Number of times to upgrade (shouldn't have to change this)
	const n = 1;

	ns.disableLog("getServerMoneyAvailable");
	if (bitNodeCheck(ns, BIT_NODE)){
		ns.exec("hashControl.js", "home", 1);
	}

	while (ns.getServerMoneyAvailable("home") < ns.hacknet.getPurchaseNodeCost) {
		await ns.sleep(10000);
	}
	// Buy first HacknetNode if there are none
	if (ns.hacknet.numNodes() === 0) {
		ns.hacknet.purchaseNode();
		ns.print("Purchased " + ns.hacknet.getNodeStats((ns.hacknet.numNodes() - 1)).name + " because there was none.");


	}

	// If there are no Hacknet Nodes, we can't do anything, so the script 
	// ends.
	while (ns.hacknet.numNodes() > 0) {
		// If there is not enough money, we wait for it instead of ending 
		// the loop.
		buyNewServer(ns);

		while (ns.getServerMoneyAvailable("home") >= reserveMoney) {
			for (let i = 0; i < ns.hacknet.numNodes(); i++) {
				while (ns.hacknet.getLevelUpgradeCost(i, n) < Infinity && ns.hacknet.upgradeLevel(i, n)) {
					ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " to level " + ns.hacknet.getNodeStats(i).level);
					await ns.sleep(0)
					buyNewServer(ns)
				}
				while (ns.hacknet.getRamUpgradeCost(i, n) < Infinity && ns.hacknet.upgradeRam(i, n)) {
					ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " RAM to " + ns.hacknet.getNodeStats(i).ram);
					await ns.sleep(0)
					buyNewServer(ns)
				}
				while (ns.hacknet.getCoreUpgradeCost(i, n) < Infinity && ns.hacknet.upgradeCore(i, n)) {
					ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " core to " + ns.hacknet.getNodeStats(i).core);
					await ns.sleep(0)
					buyNewServer(ns)
				}
				if (bitNodeCheck(ns, BIT_NODE)) {
					if (ns.getHackingLevel() > nwoLvl)
						while (ns.hacknet.getCacheUpgradeCost(i, n) && (ns.hacknet.getNodeStats(i).cache < 5)) {
							ns.hacknet.upgradeCache(i, n)
							ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " cache to " + ns.hacknet.getNodeStats(i).cache);
							await ns.sleep(0)
							buyNewServer(ns);
						}
				}

			}
			await ns.sleep(0)
		}
		await ns.sleep(0)


	}
	await ns.sleep(0)


}





function buyNewServer(ns) {
	if (ns.getServerMoneyAvailable('home') > ns.hacknet.getPurchaseNodeCost()) {
		ns.hacknet.purchaseNode();
	}
}