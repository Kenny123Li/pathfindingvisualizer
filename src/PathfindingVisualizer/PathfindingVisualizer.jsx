import { render } from '@testing-library/react';
import React from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css';
import { dijkstra, getShortestPath } from '../PathfindingAlgorithms/dijkstra';

export default class PathfindingVisualizer extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            nodes: [],
            clicktype: "none",
            mouse_press: false
        };
    }
    
    componentDidMount(){
        const nodes = initialize_grid();
        this.setState({nodes});
    }

    clickstart(){
        this.state.clicktype = "start_Node";
        console.log(this.state.clicktype);
    }

    clickend(){
        this.state.clicktype = "finish_Node";
        console.log(this.state.clicktype);
    }

    clickwalls(){
        this.state.clicktype = "wall_Node";
        console.log(this.state.clicktype);
    }

    handleMouseDown(row, col) {
        // const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        // this.setState({grid: newGrid, mouse_press: true});
        const element = document.getElementById(`node-${row}-${col}`);

        //there should only be one start point
        if(document.getElementsByClassName('start_Node').length!==0 && this.state.clicktype==='start_Node'){
            // console.log("two starts detected");
            const prev_start = document.getElementsByClassName('start_Node');
            console.log(prev_start);
            prev_start[0].classList.remove('start_Node');
        }

        element.classList.add(this.state.clicktype);
        this.setState({mouse_press: true});

        // console.log(element.classList.contains("wall_Node"));
        console.log("down");
        // console.log(`node-${row}-${col}`);
        // console.log(element.classList);
    }
    
    handleMouseEnter(row, col) {
        // if (!this.state.mouse_press) return;
        // const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        // this.setState({grid: newGrid});
        if (!this.state.mouse_press||this.state.clicktype!=="wall_Node") return;
        const element = document.getElementById(`node-${row}-${col}`);
        element.classList.add(this.state.clicktype);

        // console.log(`node-${row}-${col}`);
        // console.log(element.classList);
    }

    handleMouseUp() {
        // this.setState({mouse_press: false});
        this.setState({mouse_press: false}, () => {
            console.log(this.state.mouse_press);
        });
        console.log("up");
    }

    click(){

    }

    animateDijkstra(visitedNodesInOrder, shortestPath){
        for(let i=0; i<=visitedNodesInOrder.length; i++){
            if(i===visitedNodesInOrder.length){
                setTimeout(()=> {
                    this.animateShortestPath(shortestPath);
                }, 5*i);
                return;
            }

            setTimeout(()=> {
                const node = visitedNodesInOrder[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if(!element.classList.contains('finish_Node') && !element.classList.contains('start_Node')){
                    element.classList.add("node-visited");
                }
            }, i*5)
        }
    }

    animateShortestPath(shortestPath){
        for(let i=0; i<shortestPath.length; i++){
            setTimeout(()=> {
                const node = shortestPath[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);

                if(!element.classList.contains('finish_Node') && !element.classList.contains('start_Node')){
                    element.classList.add("node-shortest-path");
                }

            }, i*20)
        }
        return;
    }

    dijkstra(){
        const grid = this.state.nodes;
        const startNode = document.getElementsByClassName('start_Node');
        const finishNode = document.getElementsByClassName('finish_Node');
        const gridStartNode = grid[startNode[0].getAttribute("row")][startNode[0].getAttribute("col")];
        const gridFinishNode = grid[finishNode[0].getAttribute("row")][finishNode[0].getAttribute("col")];

        if(startNode.length===0){
            console.log("Put a start node anywhere");
            return;
        }

        const visitedNodesInOrder = dijkstra(grid, gridStartNode, gridFinishNode);
        const shortestPath = getShortestPath(gridFinishNode);
        this.animateDijkstra(visitedNodesInOrder, shortestPath);
    }

    reset(){
        const walls = document.getElementsByClassName('wall_Node');
        while(walls.length!==0){
            walls[0].classList.remove('wall_Node');
        }
        
        const start = document.getElementsByClassName('start_Node');
        while(start.length!==0){
            start[0].classList.remove('start_Node');
        }

        const finish = document.getElementsByClassName('finish_Node');
        while(finish.length!==0){
            finish[0].classList.remove('finish_Node');
        }

        const visited = document.getElementsByClassName('node-visited');
        while(visited.length!==0){
            visited[0].classList.remove('node-visited');
        }

        const short = document.getElementsByClassName('node-shortest-path');
        while(short.length!==0){
            short[0].classList.remove('node-shortest-path');
        }

        const nodes = initialize_grid();
        this.setState({nodes});
    }

    render(){
        const{nodes} = this.state;
        
        return (
            <div>
                <div>
                    <button class = 'myButton' onClick={() => this.reset()}>Reset</button>
                    <button class = 'myButton' onClick={() => this.clickwalls()}>Walls</button>
                    <button class = 'myButton' onClick={() => this.clickstart()}>Start Point(s)</button>
                    <button class = 'myButton' onClick={() => this.clickend()}>End Point</button>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Algorithms</button>
                    <div class="dropdown-content">
                        <button onClick={() => this.dijkstra()}>Visualize Dijkstra's Algorithm</button>
                    </div>
                </div>
                <div className = "grid">
                    {nodes.map((row, row_index) => {
                        return(
                            <div key={row_index}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col} = node;
                                    return(
                                        <Node
                                        key = {nodeIdx}
                                        col = {col}
                                        row = {row}
                                        id = {`node-${row}-${col}`}
                                        onMouseDown = {(row, col)=> this.handleMouseDown(row, col)}
                                        onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp = {()=> this.handleMouseUp()}></Node>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

const initialize_grid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
  }
  return grid;
}

const createNode = (row, col) =>{
    return {
        row,
        col,
        distance: Infinity,
        isVisited: false,
        prev_Node: null,
    }
}

