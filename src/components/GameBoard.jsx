import {useState} from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, celIndex) {
        setGameBoard((prevGameBoard)=> {
            const newBoard = [...prevGameBoard.map(val => [...val])];
            newBoard[rowIndex][celIndex] = activePlayerSymbol;
            return newBoard;
        });
        onSelectSquare();
    }
    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                {row.map((playerSymbol, celIndex) => <li key={celIndex} className='board-items'>
                    <button onClick={() => handleSelectSquare(rowIndex, celIndex)}>{playerSymbol}</button>
                </li>)}
            </li>)}
        </ol>
    );
}