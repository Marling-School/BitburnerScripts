let baseConfig = {
    baseLevel: 8,
    baseRam: 2,
    baseCores: 1,
    baseCache: 1,
    upgradeAmnt: 1,
}

/** @param {NS} ns **/
export async function main(ns) {
    ns.tail("/scripts/hacknetBoot.js", "home");

    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");

    while (true) {
        let currentMonies = ns.getServerMoneyAvailable('home');
        let hacknetNodes = ns.hacknet.numNodes();
        let hacknetLimit = {
            targetLevel: Math.round(baseConfig.baseLevel * (hacknetNodes *(hacknetNodes/baseConfig.baseLevel)-12.4)),
            targetRam: Math.round(baseConfig.baseRam ** (hacknetNodes - 2)),
            targetCores: Math.round(baseConfig.baseCores * (hacknetNodes * 3.2)),
            targetCache: Math.round((baseConfig.baseCache * hacknetNodes) / 2)
        }

        while (hacknetNodes === 0) {
            buyNewServer(ns);
            await ns.sleep(10000)
        }

        for (let i = 0; i < hacknetNodes; i++) {
            if (ns.hacknet.getNodeStats(i).level < hacknetLimit.targetLevel) {
                upgLevel(ns, i, baseConfig.upgradeAmnt, currentMonies);
            }
            if (ns.hacknet.getNodeStats(i).ram < hacknetLimit.targetRam) {
                upgRam(ns, i, baseConfig.upgradeAmnt, currentMonies);
            }
            if (ns.hacknet.getNodeStats(i).cores < hacknetLimit.targetCores) {
                upgCores(ns, i, baseConfig.upgradeAmnt, currentMonies);
            }
            if (ns.hacknet.getNodeStats(i).cache < hacknetLimit.targetCache) {
                upgCache(ns, i, baseConfig.upgradeAmnt, currentMonies);
            }
            await hashControl(ns);
            await ns.sleep(0)


        }
        buyNewServer(ns);
    }
}

function buyNewServer(ns) {
    try {
        if (ns.getServerMoneyAvailable('home') > ns.hacknet.getPurchaseNodeCost()) {
            ns.hacknet.purchaseNode();
        }
    }
    catch (err) {

    }
}

function upgLevel(ns, currentNode, amount, currentMonies) {
    if (ns.hacknet.getLevelUpgradeCost(currentNode, amount) < Infinity && currentMonies > ns.hacknet.getLevelUpgradeCost(currentNode, amount)) {
        ns.hacknet.upgradeLevel(currentNode, amount);
        ns.print("Upgraded " + ns.hacknet.getNodeStats(currentNode).name + " Level to " + ns.hacknet.getNodeStats(currentNode).level);
    }
}

function upgRam(ns, currentNode, amount, currentMonies) {
    if (ns.hacknet.getRamUpgradeCost(currentNode, amount) < Infinity && currentMonies > ns.hacknet.getRamUpgradeCost(currentNode, amount)) {
        ns.hacknet.upgradeRam(currentNode, amount);
        ns.print("Upgraded " + ns.hacknet.getNodeStats(currentNode).name + " RAM to " + ns.hacknet.getNodeStats(currentNode).ram);
    }
}

function upgCores(ns, currentNode, amount, currentMonies) {
    if (ns.hacknet.getCoreUpgradeCost(currentNode, amount) < Infinity && currentMonies > ns.hacknet.getCoreUpgradeCost(currentNode, amount)) {
        ns.hacknet.upgradeCore(currentNode, amount);
        ns.print("Upgraded " + ns.hacknet.getNodeStats(currentNode).name + " Core(s) to " + ns.hacknet.getNodeStats(currentNode).cores);
    }
}

function upgCache(ns, currentNode, amount, currentMonies) {
    if (ns.hacknet.getCacheUpgradeCost(currentNode, amount) < Infinity && currentMonies > ns.hacknet.getCacheUpgradeCost(currentNode, amount)) {
        ns.hacknet.upgradeCache(currentNode, amount);
        ns.print("Upgraded " + ns.hacknet.getNodeStats(currentNode).name + " Cache to " + ns.hacknet.getNodeStats(currentNode).cache);
    }
}

async function hashControl(ns) {
    const SLEEP_BASE = 4000;
    const sellHash = "Sell for Money";
    const reduceSec = "Reduce Minimum Security";
    const increaseMax = "Increase Maximum Money";
    const sleepAmt = SLEEP_BASE - (ns.hacknet.hashCost(reduceSec) + ns.hacknet.hashCost(increaseMax)) / 2
    const target = "nwo";

    if (!ns.hasRootAccess(target)) {
        ns.hacknet.spendHashes(sellHash);
    } else {
        if (ns.hacknet.hashCost(reduceSec) < ns.hacknet.numHashes() && ns.getServerMinSecurityLevel(target) > 5) {
            ns.hacknet.spendHashes(reduceSec, target);
        }
        if (ns.hacknet.hashCost(increaseMax) < ns.hacknet.numHashes()) {
            ns.hacknet.spendHashes(increaseMax, target);
        } else {
            ns.hacknet.spendHashes(sellHash);
            await ns.sleep(sleepAmt);
        }

    }
    await ns.sleep(0)
}