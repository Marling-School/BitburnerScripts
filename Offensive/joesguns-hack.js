/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		(ns.getServerMoneyAvailable("joesguns") > ns.getServerMaxMoney("joesguns") * 0.5 ? await ns.hack("joesguns") : await ns.sleep(0))
		await ns.s
	}
}