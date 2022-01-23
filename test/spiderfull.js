import { spider } from '/helpers/spider.js';
import { fullserverinfo } from '/helpers/fullserverinfo.js';
/** @param {NS} ns **/
export async function main(ns) {
	const serverList = spider();
	const infotest = fullserverinfo(serverList);
	ns.tprint(ns, infotest);
	await ns.sleep(0);

	return;

}