import {useState} from "react";

export default function Player({name, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlaerNane] = useState(name)
    function toggle () {
            setIsEditing((edite) => !edite);
    }

    const handleChangeName = (event) => setPlaerNane(event.target.value);
    return (
        <li className={isActive? 'active': undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input type="text" placeholder={playerName} onChange={handleChangeName}/>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggle}>{isEditing? 'Save': 'Edit'}</button>
        </li>
    );
}