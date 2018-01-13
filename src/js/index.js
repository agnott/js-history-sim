const WorldGraph = require('./graphs/WorldGraph');

const world = new WorldGraph(700, 400);

world.addVertex(100);
// world.addEdge(0, 19, 34);
// world.addEdge(0, 23, 34);
// world.addEdge(0, 4, 34);
// world.addEdge(19, 3, 34);

world.connect();

world.draw('graph');

console.log(world.dfs(0, 3));

console.log(world.graph);
