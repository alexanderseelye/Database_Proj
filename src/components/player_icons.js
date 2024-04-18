import React, {props} from "react";
import "./player_icons.css"

function PlayerIcon(props) {
    return (
        <div className="playerContainer">
            <img src={props.profilepic} alt='' className="pfp"></img>
            <div className="overlay">
                <p>{props.colnames[1]}: {props.points}</p>
                <p>{props.colnames[2]}: {props.rpg}</p>
                <p>{props.colnames[3]}: {props.apg}</p>
                <p>{props.colnames[4]}: {props.games}</p>

            </div>
            <p>{props.name}</p>
            {/* <h2>{props.number}</h2>
            <h2>{props.ppg}</h2> */}
        </div>
    )
}
 
export default PlayerIcon;