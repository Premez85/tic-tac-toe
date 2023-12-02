import {useState} from "react";


export default function GameBoard({ onSelectSquare, board }) {

    return (
        <ol id='game-board'>
            {board.map((row, rowIndex) => <li key={rowIndex}>
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