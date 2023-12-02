import {useState} from "react";

export default function Player({name, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name)
    function handleEditingClick () {
            setIsEditing((editing) => !editing);
            onChangeName(symbol, playerName);
    }

    const handleChangeName = (event) => setPlayerName(event.target.value);
    return (
        <li className={isActive? 'active': undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input type="text" placeholder={playerName} onChange={handleChangeName}/>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditingClick}>{isEditing? 'Save': 'Edit'}</button>
        </li>
    );
}