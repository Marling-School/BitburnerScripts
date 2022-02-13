import { spider } from 'helpers/spider.js';
/** @param {NS} ns **/
export async function main(ns) {
	let serverList = await spider(ns);
	for (let i = 0; i < serverList.length; ++i) {
		ns.tprint[serverList[i]];
		if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(serverList[i])) {
			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(serverList[i]);
			}
			if (ns.fileExists("FTPCrack.exe", "home")) {
				ns.ftpcrack(serverList[i]);
			}
			if (ns.fileExists("relaySMTP.exe", "home")) {
				ns.relaysmtp(serverList[i]);
			}
			if (ns.fileExists("HTTPWorm.exe", "home")) {
				ns.httpworm(serverList[i]);
			}
			if (ns.fileExists("SQLInject.exe", "home")) {
				ns.sqlinject(serverList[i]);
			}
			try {
				ns.nuke(serverList[i]);
				//Delete/comment ln 28 {
				//a: You do not have Source-File 4
				//2: You do not have a **MINIMUM** on 64gb ram on 'home'.
				//await ns.installBackdoor(serverList);
			}
			catch (err) {
				ns.print("Nuke.exe unsuccessful.");
			}

		}
	
	}
}