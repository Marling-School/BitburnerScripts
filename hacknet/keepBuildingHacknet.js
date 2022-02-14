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
const LEVEL_TARGET = 80;
const LEVEL_INCREMENT = 5;
const RAM_TARGET = 16;
const RAM_INCREMENT = 2;
const CORES_TARGET = 8;
const CORES_INCREMENT = 1;

async function upgradeNode(ns, index) {
    while (ns.hacknet.getNodeStats(index).level < LEVEL_TARGET) {
        await waitForMoney(ns, `Upgrade Level of ${index}`, ns.hacknet.getLevelUpgradeCost(index, LEVEL_INCREMENT));
        ns.hacknet.upgradeLevel(index, LEVEL_INCREMENT);
    };
    ns.print(`Node ${index} Upgraded to Target Level`);

    while (ns.hacknet.getNodeStats(index).ram < RAM_TARGET) {
        await waitForMoney(ns, `Upgrade RAM of ${index}`, ns.hacknet.getRamUpgradeCost(index, RAM_INCREMENT));
        ns.hacknet.upgradeRam(index, RAM_INCREMENT);
    };
    ns.print(`Node ${index} Upgraded to Target RAM`);

    while (ns.hacknet.getNodeStats(index).cores < CORES_TARGET) {
        await waitForMoney(ns, `Upgrade Cores of ${index}`, ns.hacknet.getCoreUpgradeCost(index, CORES_INCREMENT));
        ns.hacknet.upgradeCore(index, CORES_INCREMENT);
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
    while (true) {
        for (let i = 0; i < ns.hacknet.numNodes(); i++) {
            await upgradeNode(ns, i);
        }

        await buildNewNode(ns);
    }
}