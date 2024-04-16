import React, {props} from "react";

function PlayerIcon(props) {
    return (
        <div className="playerContainer">
            <img src={props.profilepic}></img>
            <h1>{props.name}</h1>
            <h2>{props.number}</h2>
            <h2>{props.ppg}</h2>
        </div>
    )
}
 
export default PlayerIcon;