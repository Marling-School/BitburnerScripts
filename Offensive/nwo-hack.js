/** @param {NS} ns **/
export async function main(ns) {
	//ns.disableLog("getServerMaxMoney");
	while (true) {
		const randint = Math.floor((Math.random() * 1000) + 1);
		let target = "nwo"
		if (ns.getServerMoneyAvailable(target) > ns.getServerMaxMoney(target)*0.20) {
			await ns.hack("nwo");
		}
		await ns.sleep(randint);
		}
}