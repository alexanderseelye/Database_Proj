import React from "react";
import NavBar from "../components/navbar";
import "./homepage.css"

function Home() {

   

    return (
        <>
        <NavBar/>
        <div>
            <div>
                <h1 className="welcome">-----Welcome-----</h1>
            </div>
            <div className="body">
                <h3>
                    This is our team's final project for KU's EECS 447 Database class. 
                    Our team consists of three members; Jack Ford, Harun Khan, and Alexander Seelye.
                    For the project we have created a website that allows users to see various attribute of the Los Angeles Lakers NBA team.
                    These include a roster of players which is filterable by different player metrics, the standing of the team compared to others in the league, and a list of games both old and upcoming.
                    Alongside the upcoming games, we have visualized data that can be used to loosley predict the Lakers' odds of winning.
                </h3>
            </div>
        </div>
        </>
    )
}
 
export default Home;