/** @param {NS} ns **/
export async function main(ns) {
	// We will not buy anything if there's less money than this ammount. 
	const reserveMoney = 50000
	// Number of times to upgrade (shouldn't have to change this)
	const n = 1;

	ns.disableLog("getServerMoneyAvailable");
	ns.exec("hashControl.js", "home", 1);

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
				}
				buyNewServer(ns)
				await ns.sleep(10)
				while (ns.hacknet.getRamUpgradeCost(i, n) < Infinity && ns.hacknet.upgradeRam(i, n)) {
					ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " RAM to " + ns.hacknet.getNodeStats(i).ram);
					await ns.sleep(10)
					buyNewServer(ns)

				}
				while (ns.hacknet.getCoreUpgradeCost(i, n) < Infinity && ns.hacknet.upgradeCore(i, n)) {
					ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " core to " + ns.hacknet.getNodeStats(i).core);
					await ns.sleep(10)
					buyNewServer(ns)
				}
				if (ns.fileExists("sqlinject.exe")) {
					if (ns.hacknet.getNodeStats(i).cache < 4) {
						while (ns.hacknet.getCacheUpgradeCost(i, n) && ns.hacknet.upgradeCache(i, n)
						) {
							ns.print("Upgraded " + ns.hacknet.getNodeStats(i).name + " cache to " + ns.hacknet.getNodeStats(i).cache);
							await ns.sleep(10)
							buyNewServer(ns);
						}
					}
				}
			}
			await ns.sleep(10)

		}
		await ns.sleep(10)


	}
	await ns.sleep(10)


}

function buyNewServer(ns) {
	if (ns.getServerMoneyAvailable('home') > ns.hacknet.getPurchaseNodeCost()) {
		ns.hacknet.purchaseNode();
	}
}