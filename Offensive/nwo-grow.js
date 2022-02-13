/** @param {NS} ns **/
export async function main(ns) {
	const randint = Math.floor((Math.random() * 1000) + 1);
	while (true) {
		await ns.grow("nwo");
		await ns.sleep(randint);
	}
}