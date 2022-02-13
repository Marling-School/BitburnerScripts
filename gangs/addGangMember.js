import {nameGen} from "/helpers/nameGen.js" 

/** @param {NS} ns **/
export async function main(ns) {
	while(true){
		const gangMembers = ns.gang.getMemberNames();

		if (ns.gang.canRecruitMember){
			let gName = ns.gang.recruitMember(await nameGen())
			ns.gang.setMemberTask(gName,"Train Combat")
		}
		await ns.sleep(10000)
	}

}