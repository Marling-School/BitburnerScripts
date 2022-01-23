import { spider } from 'helpers/spider.js';
/** @param {NS} ns **/
export async function main(ns) {
	let serverList = await spider(ns);
	ns.tprint(serverList);
	for (let i = 0; i < serverList.length; ++i) {
		ns.tprint[serverList[i]];
		ns.sleep(1000);
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
			}
			catch (err) {
				ns.print("Nuke.exe unsuccessful.");
			}
			/* Delete ln 33 if you {
				a: You do not have Source-File 4
				2: You do not have a minimum on 1TB ram.
				*/
			
			await ns.installBackdoor(serverList[i]);
		}
	
		await ns.sleep(0);
	}
}