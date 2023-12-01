import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import {useState} from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";

function App() {

    const [gameTurns, setGameTurns] = useState([]);

    function deriveActivePlayer(gameTurns) {
        let currentPlayer = 'X';
        if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
            currentPlayer = 'O';
        }
        return currentPlayer;
    }

    const activePlayer = deriveActivePlayer(gameTurns);


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
    return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player name='Player 2' symbol='0' isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard
            onSelectSquare={handleSelectSquare}
            turns={gameTurns}
        />
      </div>
        <Log turns={gameTurns}/>
    </main>
  )
}

export default App
