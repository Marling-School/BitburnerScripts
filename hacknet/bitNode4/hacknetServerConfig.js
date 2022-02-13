import { spider } from 'helpers/spider.js';
import { thread_calc } from 'helpers/thread-calc.js';
import { ratiogen } from 'helpers/ratiogen.js';
/** @param {NS} ns **/
export async function main(ns) {
	const serverList = await spider(ns);		
	const scriptList = ["nwo-grow.js"];

	for (let i = 0; i < serverList.length; ++i) {
		if (!serverList[i].includes("home")){
			if (serverList[i].includes("hacknet")){
				ns.killall(serverList[i]);
				for (let j = 0; j < scriptList.length; ++j) {
					let scriptRam = ns.getScriptRam(scriptList[j]);
					await ns.scp(scriptList, serverList[i]);
					ns.exec(scriptList[j], serverList[i], await thread_calc(ns, ns.getServerMaxRam(serverList[i]), scriptRam, await ratiogen(ns, scriptList.length)));
				}
			
			}
		}
	}
}