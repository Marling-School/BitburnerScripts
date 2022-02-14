const graph = require('./dataStructures/graph');
const dijkstra = require('./helpers/dijkstras');


const myGraph = new Graph()
    .addLink('S', 'A')
    .addLink('A', 'D')
    .addLink('D', 'H')
    .addLink('S', 'B')
    .addLink('B', 'E')
    .addLink('E', 'F')
    .addLink('F', 'G')
    .addLink('S', 'C')
    .addLink('C', 'F');

const startVertex = 'S';
const endVertex = 'H';
const route = dijkstra(startVertex, endVertex, myGraph);

console.log(`Route from `)
