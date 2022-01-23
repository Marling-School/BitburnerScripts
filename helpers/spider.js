/** @param {NS} ns **/
export async function spider(ns) {
	// Return an array of all identifiable servers
	// Create a serversSeen array, containing only 'home' for now
	let serversSeen = ['home'];
	// For every server we've seen so far, do a scan
	for (let i = 0; i < serversSeen.length; i++) {
		let thisScan = ns.scan(serversSeen[i]);
		// Loop through results of the scan, and add any new servers
		for (let j = 0; j < thisScan.length; j++) {
			// If this server isn't in serversSeen, add it
			if (serversSeen.indexOf(thisScan[j]) === -1) {
				serversSeen.push(thisScan[j]);
			}
		}
	}
	return (ns, serversSeen);
}