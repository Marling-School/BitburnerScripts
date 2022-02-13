/** @param {NS} ns **/
export async function main(ns) {
	const target = "n00dles";
	const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
	const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

	// Get root access to target server
	ns.nuke(target);
	//infinite loop.
	while(true) {
    	if (ns.getServerSecurityLevel(target) > securityThresh) {
        	// If the server's security level is above our threshold, weaken it
        	ns.weaken(target);
    	} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
        	// If the server's money is less than our threshold, grow it
        	ns.grow(target);
    	} else {
        	// Otherwise, hack it
        	ns.hack(target);
		}
		//Do not remove. Required for async, probably.
		await ns.sleep(0)
	}
}