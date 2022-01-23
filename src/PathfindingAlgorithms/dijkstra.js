export function dijkstra(nodes, startNode, finishNode){
    const visitedNodes = [];
    startNode.distance = 0;

    const unvisitedNodes = getAllNodes(nodes);

    while(unvisitedNodes.length!==0){
        //visit node with shortest distance
        sortNodesByDistance(unvisitedNodes);

        const closestrowcol = unvisitedNodes.shift();
        const closestNode = document.getElementById(`node-${closestrowcol.row}-${closestrowcol.col}`);

        if(closestNode.classList.contains("wall_Node")){
            continue;
        }

        if(closestrowcol.distance===Infinity){
            return visitedNodes;
        }

        closestrowcol.isVisited = true;
        visitedNodes.push(closestrowcol);

        if (closestNode.classList.contains("finish_Node")){
            return visitedNodes;
        } 

        updateUnvisitedNeighbors(closestrowcol, nodes);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;//right now have unweighted graph
      neighbor.prev_Node = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


export function getShortestPath(finishNode){
    const shortestPath = [];
    let currentNode = finishNode;
    // console.log('next print is classlist');
    // console.log(currentNode);
    while(currentNode!==null){
        shortestPath.unshift(currentNode);
        currentNode = currentNode.prev_Node;
    }
    return shortestPath;
}
  


export function astar(nodes, startNode, finishNode){
    const visitedNodes = [];
    const openList = [];
    const closedList = [];

    openList.push(startNode);
    const grid = getAllNodes(nodes);

    while (openList.length!==0){

    }

    return visitedNodes;
}

function findSucc(node, grid){
    const successors = [];

    const {row, col} = node;

    //upper left
    if(row>0 && col>0) successors.push(grid[row-1][col-1]);
    //upper middle
    if(row>0) successors.push(grid[row-1][col]);
    //upper right
    if(row<20 && col>0) successors.push(grid[row+1][col-1]);
    if(row>0 && col>0) successors.push(grid[row-1][col-1]);
    if(row>0 && col>0) successors.push(grid[row-1][col-1]);
    if(row>0 && col>0) successors.push(grid[row-1][col-1]);
    if(row>0 && col>0) successors.push(grid[row-1][col-1]);
    //lower right
    if(row<20 && col<50) successors.push(grid[row+1][col+1]);

    return successors;
}