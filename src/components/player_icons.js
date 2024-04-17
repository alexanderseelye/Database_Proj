import React, {props} from "react";
import "./player_icons.css"

function PlayerIcon(props) {
    return (
        <div className="playerContainer">
            <img src={props.profilepic} alt='' className="pfp"></img>
            <div className="overlay">
                <p>{props.colnames[1]}: {props.number}</p>
                <p>{props.colnames[2]}: {props.ppg}</p>
            </div>
            <p>{props.name}</p>
            {/* <h2>{props.number}</h2>
            <h2>{props.ppg}</h2> */}
        </div>
    )
}
 
export default PlayerIcon;