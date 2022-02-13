import { spider } from 'helpers/spider.js';
import { thread_calc } from 'helpers/thread-calc.script';

/* TODO
Refactor targets and scriptList to external file and import. Used everywhere.


*/
/** @param {NS} ns **/
export async function main(ns) {
	const serverList = await spider(ns);
	const nwoLvl = ns.getServerRequiredHackingLevel('nwo')
	const target = (ns.getHackingLevel() < nwoLvl ? "joesguns" : "nwo");
	//Depending on target, set scriptlist to push to purchased servers.
	const scriptList = [`${target}-grow.js`, `${target}-weaken.js`];

	for (let i = 0; i < serverList.length; ++i) {
		if (serverList[i] != "home"){
			ns.killall(serverList[i]);
			for (let j = 0; j < scriptList.length; ++j) {
				await ns.scp(scriptList, serverList[i]);
				ns.exec(scriptList[j], serverList[i], thread_calc(ns.getServerMaxRam(serverList[i]), ns.getScriptRam(scriptList[j]), 24));
			}
		}
	}
}