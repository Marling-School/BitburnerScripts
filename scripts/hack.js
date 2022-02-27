/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		const target = (ns.hasRootAccess ("nwo") ? "nwo" : (
		ns.hasRootAccess('joesguns') ? 'joesguns' : 'n00dles'))
		(ns.getServerMoneyAvailable(target) > ns.getServerMaxMoney(target) * 0.8 ? await ns.hack(target) : await ns.sleep(0))
	}
}