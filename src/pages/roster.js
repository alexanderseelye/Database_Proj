import React, {useState, useEffect} from "react";
import PlayerIcon from "../components/player_icons";
import NavBar from "../components/navbar";
import "./roster.css"

function Roster() {

    const [data, setData] = useState({
        columns: [],
        results: []
    });

    async function getPlayers(){
        fetch("http://127.0.0.1:5000/players").then((res) => res.json()).then((data) => {
        setData({
            columns: data.columns,
            results: data.results
        });        
        console.log(data.columns);
        console.log(data.results);
        })
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore)  getPlayers()
        return () => { ignore = true; }
    }, []);


    return (
        <>
        <NavBar/>
        <div className="main">
            <div className="filterOptions">
                <p>Sort in Ascending Order</p>
                <input type={"checkbox"}></input>
            </div>
            <div className="playerDisplay">
                {data.results.map((record) => {
                    return <PlayerIcon name={record[0]} points={record[1]} rpg={record[2]} apg={record[3]} games={record[4]} profilepic={record[5]} colnames={data.columns}/>
                })}
            </div>
        </div>
        </>
    )
}
 
export default Roster;