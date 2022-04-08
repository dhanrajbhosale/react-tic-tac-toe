import React from "react";
import { calculateWinner } from "./calculateWinner";

import { Square } from './Square';

export class Board extends React.Component {
constructor(props){
    super(props);
    this.state={
        squares: Array(9).fill(null),
        isXNext:true,
    }
}

restartGame(){
    this.setState({
        squares: Array(9).fill(null),
        isXNext:true,
    })
}

getNextPalyerLabel(){
    return this.state.isXNext?"X":"O";
}

handleClick(i){
    const squaresCopy = this.state.squares.slice();
    if(calculateWinner(squaresCopy)||squaresCopy[i]) return;
 
    squaresCopy[i]= this.state.isXNext?"X":"O";
    this.setState({
        squares:squaresCopy,
        isXNext: !this.state.isXNext,
    });
}

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={()=> this.handleClick(i)} />;
    }

    render() {
        const winner=calculateWinner(this.state.squares);
        let status;
        if(winner){
            status= "WINNER: "+winner;
        }else if(!this.state.squares.includes(null)){
            status=" It's a TIE !";
        }
        else{
            status = 'Next player: '+this.getNextPalyerLabel();
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div></div>
                <button className="restart" onClick={()=>this.restartGame()}>Restart</button>
            </div>           
            
        );
    }
}

