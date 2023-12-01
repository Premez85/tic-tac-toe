import {useState} from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;

    for( const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                {row.map((playerSymbol, colIndex) => <div key={colIndex} className='board-items'>
                    <button
                        onClick={() => onSelectSquare(rowIndex, colIndex)}
                        disabled={playerSymbol !== null}
                    >
                        {playerSymbol}
                    </button>
                </div>)}
            </li>)}
        </ol>
    );
}