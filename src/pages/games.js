import React from "react";
import NavBar from "../components/navbar";
import "./games.css"

function Games() {

   

    return (
        <>
        <NavBar/>
        <div>
            <h1>This is our Games list!</h1>
            <ul>
                <li className="gameResults">Game 1</li>
                <li className="gameResults">Game 2</li>
                <li className="gameResults">Game 3</li>
                <li className="gameResults">Game 4</li>
            </ul>
        </div>
        </>
    )
}
 
export default Games;