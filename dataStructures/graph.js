class Graph {
    constructor() {
        this.visitedNodes = [];
        this.destinationsBySource = {};
    }

    visitingNode(node) {
        this.visitedNodes.push(node);
    }

    nodeVisited(node) {
        return this.visitedNodes.includes(node);
    }

    addLink(from, to) {
        this._addLink(from, to);
        this._addLink(to, from);
    }

    _addLink(from, to) {
        let fromList = this.destinationsBySource[from];
        if (fromList === undefined) {
            this.destinationsBySource[from] = fromList = [];
        }

        if (!fromList.includes(to)) {
            fromList.push(to);
        }
    }

    getNeighbours(node) {
        return this.destinationsBySource[node];
    }
}

export default Graph;