/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		const target = (ns.hasRootAccess ("nwo") ? "nwo" : (ns.hasRootAccess('joesguns') ? 'joesguns' : 'n00dles'))
		await ns.grow(target);
	}
}