import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import {useState} from "react";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveWinner(gameBoard, players) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const fistSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if(fistSquareSymbol &&
            fistSquareSymbol === secondSquareSymbol &&
            fistSquareSymbol === thirdSquareSymbol) {
            winner = players[fistSquareSymbol];
        }
    }

    return winner;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];

    for( const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {

    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([]);

    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);

    const activePlayer = deriveActivePlayer(gameTurns);
    const hasDraw = gameTurns.length === 9 && !winner;
    function handleSelectSquare(rowIndex, colIndex) {
        const currentPlayer = deriveActivePlayer(gameTurns);
        setGameTurns(prevTurns => {
            const updateTurns = [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns
            ];
            return updateTurns;
        });
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function handlePlayersNameChange (symbol, newName) {
        setPlayers(prevPlayer => {
            return {
                ...players,
                [symbol]: newName
            }
        })
    }
    return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayersNameChange}/>
          <Player name={PLAYERS.O} symbol='0' isActive={activePlayer === 'O'} onChangeName={handlePlayersNameChange}/>
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard
            onSelectSquare={handleSelectSquare}
            turns={gameTurns}
            board={gameBoard}
        />
      </div>
        <Log turns={gameTurns}/>
    </main>
  )
}

export default App
