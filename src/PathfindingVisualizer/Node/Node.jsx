import React from 'react';

import './Node.css';

export default class Node extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        const{
            row,
            col,
            onMouseDown,
            onMouseEnter,
            onMouseUp
        } = this.props;

        return (
        <div className = "Node"
                row = {row}
                col = {col}
                id = {`node-${row}-${col}`}
                className = {`Node`}
                onMouseDown={()=>onMouseDown(row, col)}
                onMouseEnter={()=>onMouseEnter(row, col)}
                onMouseUp={()=>onMouseUp()}></div>
        );
    }
}