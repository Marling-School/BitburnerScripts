/** @param {NS} ns **/
export async function main(ns) {
	const nwoLvl = ns.getServerRequiredHackingLevel("nwo");
	while (true) {
		const target = (ns.getHackingLevel() < nwoLvl ? "joesguns" : "nwo");

		if (!ns.fileExists("sqlinject.exe")) {
			ns.hacknet.spendHashes("Sell for Money")
		}

		if (ns.fileExists("sqlinject.exe")) {
			if (ns.hacknet.hashCost("Reduce Minimum Security") < ns.hacknet.numHashes() && ns.getServerMinSecurityLevel(target) > 20) {
				ns.hacknet.spendHashes("Reduce Minimum Security", target);
			}
			if (ns.hacknet.hashCost("Increase Maximum Money") < ns.hacknet.numHashes()) {
				ns.hacknet.spendHashes("Increase Maximum Money", target);
			} else {
				ns.hacknet.spendHashes("Sell for Money")
				await ns.sleep(4000)
			}
		}
		await ns.sleep(0)
	}



}