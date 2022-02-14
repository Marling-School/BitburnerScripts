class Graph {
    constructor() {
        this.visitedNodes = [];
        this.destinationsBySource = {};
    }

    visitingNode(node) {
        this.visitedNodes.push(node);
        return this;
    }

    nodeVisited(node) {
        return this.visitedNodes.includes(node);
    }

    addLink(from, to) {
        this._addLink(from, to);
        this._addLink(to, from);
        return this;
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