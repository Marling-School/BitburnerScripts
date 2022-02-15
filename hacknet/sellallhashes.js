/** @param {NS} ns **/
export async function main(ns) {
	for(let i = 0; i<ns.hacknet.numHashes();++i) {
		ns.hacknet.spendHashes("Sell for Money");
	}
	await ns.sleep(100)
	
}