import React, {useState, useEffect} from "react";
import PlayerIcon from "../components/player_icons";
import NavBar from "../components/navbar";
import "./roster.css"

function Roster() {

    const IP = "http://127.0.0.1:5000"
    
    const [data, setData] = useState({
        columns: [],
        results: []
    });

    const [currfilter, setcurrfilter] = useState("");
    const [ptscondition, setptscondition] = useState("");
    const [rebcondition, setrebcondition] = useState("");
    const [astcondition, setastcondition] = useState("");
    const [gamecondition, setgamecondition] = useState("");
    
    const [initialquery, setinitialquery] = useState("SELECT name, pts, truereb, ast, gamesplayed, pfp FROM lakersplayers WHERE season = 2024 and pfp IS NOT NULL ")

    async function getPlayers(query){
        fetch(IP + "/players", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                command: query
            })
        }).then((res) => res.json()).then((data) => {
        setData({
            columns: data.columns,
            results: data.results
        });        
        console.log(data.columns);
        console.log(data.results);
        })
    }

    const handleDropdownChange = (e) => {
        setcurrfilter(e.target.value);
        return
    }

    const handlePTSChange = (e) => {
        if (e.target.value === "") return;
        setptscondition("AND pts > " + e.target.value + " ");
        return
    }

    const handleREBChange = (e) => {
        if (e.target.value === "") return;
        setrebcondition("AND truereb > " + e.target.value + " ");
        return
    }

    const handleASTChange = (e) => {
        if (e.target.value === "") return;
        setastcondition("AND ast > " + e.target.value + " ");
        return
    }

    const handleGAMEChange = (e) => {
        if (e.target.value === "") return;
        setgamecondition("AND gamesplayed > " + e.target.value + " ");
        return
    }

    const applyFilters = () => {
        getPlayers(initialquery + ptscondition + rebcondition + astcondition + gamecondition + currfilter);
        return
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore)  getPlayers(initialquery)
        return () => { ignore = true; }
    }, []);


    return (
        <>
        <NavBar/>
        <div className="main">
            <div className="filterOptions">
                <h2>Filtering Options</h2>
                <select id="filterDropDown" className="dropDownBox" onChange={handleDropdownChange}>
                    <option value={""}>None</option>
                    <option value={"ORDER BY pts ASC"}>Points Ascending</option>
                    <option value={"ORDER BY pts DESC"}>Points Descending</option>
                    <option value={"ORDER BY truereb ASC"}>Rebounds Ascending</option>
                    <option value={"ORDER BY truereb DESC"}>Rebound Descending</option>
                    <option value={"ORDER BY ast ASC"}>Assists Ascending</option>
                    <option value={"ORDER BY ast DESC"}>Assists Descending</option>
                    <option value={"ORDER BY gamesplayed ASC"}>Gamed Played Ascending</option>
                    <option value={"ORDER BY gamesplayed DESC"}>Games Played Descending</option>
                </select>
                <p>Minimum Points</p>
                <input type={"number"} defaultValue={0} onChange={handlePTSChange}></input>
                <p>Minimum Rebounds</p>
                <input type={"number"} defaultValue={0} onChange={handleREBChange}></input>
                <p>Minimum Assists</p>
                <input type={"number"} defaultValue={0} onChange={handleASTChange}></input>
                <p>Minimum Games Played</p>
                <input type={"number"} defaultValue={0} onChange={handleGAMEChange}></input>
                <br></br>
                <button className="applyFilterButton" onClick={applyFilters}>Apply Filters</button>
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