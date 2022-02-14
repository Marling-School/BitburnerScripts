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
const DEFAULT_LEVEL_TARGET = 200;
const DEFAULT_RAM_TARGET = 16;
const DEFAULT_CORES_TARGET = 8;

async function upgradeNode(ns, index, targetLevel, targetRam, targetCores) {
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
async function buildNewNode(ns, levelTarget, ramTarget, coresTarget) {
    await waitForMoney(ns, "Build new Node", ns.hacknet.getPurchaseNodeCost());
    const index = ns.hacknet.purchaseNode();
    await upgradeNode(ns, index, levelTarget, ramTarget, coresTarget);
}

/** @param {NS} ns **/
export async function main(ns) {
    let levelTarget = ns.args.length > 0 ? parseInt(ns.args[0]) : DEFAULT_LEVEL_TARGET;
    let ramTarget = ns.args.length > 1 ? parseInt(ns.args[1]) : DEFAULT_RAM_TARGET;
    let coresTarget = ns.args.length > 2 ? parseInt(ns.args[2]) : DEFAULT_CORES_TARGET;

    ns.tprint(`Building a HackNet based on Level ${levelTarget}, RAM: ${ramTarget}, Cores: ${coresTarget}`)

    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
        await upgradeNode(ns, i, levelTarget, ramTarget, coresTarget);
    }

    while (true) {
        await buildNewNode(ns, levelTarget, ramTarget, coresTarget);
    }
}