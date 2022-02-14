function myMoney(ns) {
    return ns.getServerMoneyAvailable("home")
}

/** @param {NS} ns **/
async function waitForMoney(ns, purpose, cost) {
    while (myMoney(ns) < cost) {
        ns.print(`Need \$${cost} to ${purpose}, Have \$${myMoney(ns)}`);
        await ns.sleep(3000);
    }
}
const LEVEL_TARGET = 200;
const RAM_TARGET = 16;
const CORES_TARGET = 8;

async function upgradeNode(ns, index,
    targetLevel = LEVEL_TARGET,
    targetRam = RAM_TARGET,
    targetCores = CORES_TARGET
) {
    while (ns.hacknet.getNodeStats(index).level < targetLevel) {
        await waitForMoney(ns, `Upgrade Level of ${index}`, ns.hacknet.getLevelUpgradeCost(index, 1));
        ns.hacknet.upgradeLevel(index, 1);
    };
    ns.print(`Node ${index} Upgraded to Target Level`);

    while (ns.hacknet.getNodeStats(index).ram < targetRam) {
        await waitForMoney(ns, `Upgrade RAM of ${index}`, ns.hacknet.getRamUpgradeCost(index, 1));
        ns.hacknet.upgradeRam(index, 1);
    };
    ns.print(`Node ${index} Upgraded to Target RAM`);

    while (ns.hacknet.getNodeStats(index).cores < targetCores) {
        await waitForMoney(ns, `Upgrade Cores of ${index}`, ns.hacknet.getCoreUpgradeCost(index, 1));
        ns.hacknet.upgradeCore(index, 1);
    };
    ns.print(`Node ${index} Upgraded to Target Cores`);
}

/** @param {NS} ns **/
async function buildNewNode(ns) {
    await waitForMoney(ns, "Build new Node", ns.hacknet.getPurchaseNodeCost());
    const index = ns.hacknet.purchaseNode();
    await upgradeNode(ns, index);
}

/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
        await upgradeNode(ns, i);
    }

    while (true) {
        await buildNewNode(ns);
    }
}