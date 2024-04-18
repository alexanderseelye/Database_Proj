import React from "react";
import {useNavigate} from "react-router-dom"
import "./navbar.css"



function NavBar(props) {

    const navigate = useNavigate();

    const GoHome = () => {
        navigate("/home")
    }

    const LogOut = () => {
        navigate("/")
    }

    const GoRoster = () => {
        navigate("/roster")
    }

    const GoStandings = () => {
        navigate("/standings")
    }

    const GoGames = () => {
        navigate("/games")
    }

    return (
        <div className="header">
        <div className="navBar">
            <div style={{display: "flex", flexDirection: "row", float: "left"}}>
            <img src="https://cdn.nba.com/teams/uploads/sites/1610612747/2021/12/lakers_70x70.svg" alt="lakers" className="logo"></img>
            <h1 className="title">Lakers Tracker</h1>
            </div>
            <div className="buttonHolder">
                <ul>
                    <li onClick={GoHome}>
                        <p>HOME</p>
                    </li>
                    <li onClick={GoRoster}>
                        <p>ROSTER</p>
                    </li>
                    <li onClick={GoStandings}>
                        <p>STANDINGS</p>
                    </li>
                    <li onClick={GoGames}>
                        <p>GAMES</p>
                    </li>
                    <li onClick={LogOut}>
                        <p>LOGOUT</p>
                    </li>
                </ul>
            </div>
        </div>
        </div>

    )
}
 
export default NavBar;